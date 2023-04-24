import React, { useContext, useEffect, useState } from 'react'
// import Callaxios from './Callaxios'
// import { Simplecontext } from './Simplecontext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { BiSearch,BiAddToQueue,BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
// import Scripts from './Scripts';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import DataTable from 'react-data-table-component';
import Callaxios from './Callaxios';
// import Select from 'react-select';
// import { Simplecontext } from './Simplecontext';
// import { Link } from 'react-router-dom';

export default function Frameprice() {
//   const { framedata,Getframe } = useContext(Simplecontext)
    const [modal,setmodal]=useState(false)
    const [framepricedata,setframepricedata]=useState([])
    const [selectframeprice,setselectframeprice]=useState('')
    const [size,setsize]=useState('')
    const [frame,setframe]=useState('')
    const [price,setprice]=useState('')
    const [pricelist,setpricelist]=useState()
    const [noofphoto,setnoofphoto]=useState('')
    const [searchvalue,setsearchvalue]=useState('')
    const [orientation,setorientation]=useState('')
    // console.log("pricelist",pricelist)
    useEffect(() => {
      GetFrameprice()
      window.scrollTo(0,0);
        // accesscheck()
        // Scripts()
    }, [])
    const notify = (msg) => toast.success(msg, {
        position: "top-left",
        theme: "dark",
        });
    const notifyerror = (msg) => toast.error(msg, {
        position: "top-left",
        theme: "dark",
        });
    const GetFrameprice =async()=>{
      try {
        let data = await Callaxios("get","frame/frameprice/")
        console.log("framepricedata",data)
        if (data.status===200){
          setframepricedata(data.data)
        }
      } catch (error) { 
        notifyerror("Something went wrong")
        
      }
    }
    const Postframeprice=async(e)=>{
      console.log("ok")
      e.preventDefault()
      try {
        let body
        let msg
    
        if (selectframeprice){
          body = {
            frame:frame,
            orientation:orientation,
            price :pricelist,
            id:selectframeprice.id,
          }
          msg = "Successfuly updated"
        }else{
          body ={
            frame:frame,
            orientation:orientation,
            price :pricelist,
          }
          msg = "Successfuly added"
        }
         
        let data = await Callaxios("post","frame/frameprice/",body)
        console.log("data",data)
        if (data.data.Status===200){
          notify(msg)
          GetFrameprice()
          setmodal(!modal)
        }
      } catch (error) {
        console.log(error)
      }
    }
    const deletetask = async(itmid)=>{
        
        try {
          let data =await Callaxios("delete",`frame/frameprice/`,{"id":itmid})
          if (data.data.Status===200){
            notify("Deleted Successfully")
            GetFrameprice()
          }
        } catch (error) {
          notifyerror("Something went wrong")
        }    
    }
    const setallnull=()=>{
      setselectframeprice('')
      setsize('')
      setframe('')
      setprice('')
      setnoofphoto('')
      setpricelist()
    }
    const Setvalues=(itm)=>{
      setallnull() 
      setframe(itm.frame)
      setorientation(itm.orientation)
      
      setselectframeprice(itm)
      setsize(itm.frame_type)
      setpricelist(itm.price)
      setmodal(!modal) 
    }
    
    
    const submitdelete = (itemid) => {
        confirmAlert({
            title: "Confirmation",
            message: `Are you sure to delete this ?`,
            buttons: [
            {
                label: "Yes",           
                onClick:()=>deletetask(itemid),
            },
            {
                label: "No"
                // onClick: () => alert("Click No")
            } 
            ],
            
        });
        };
        const pricelisthandler=()=>{
          let sellprice = pricelist
          if (noofphoto){
            if (size){
              if (price){
                // let array =[]
                // sellprice.split(",").forEach(element => {
                //   array.push(element.split("-")[0])
                // });
                // console.log("array",array)
                // if (noofphoto in array){
                //   notifyerror("Already added")
                //   return
                // }
                let list=''
                let pp_ls =noofphoto+"-"+size+"-"+price 
                if (pricelist){
                  list = sellprice.concat(",",pp_ls)
                }else{
                  list = pp_ls
                }
                setpricelist(list)
                setprice('')
                setnoofphoto('')
                setsize('')
              }else{
                notifyerror("Price is empty")
                return
              }
            }else{
              notifyerror("Size is empty")
              return
            }
          }else{
            notifyerror("Select No of Photos")
            return
          }
        }
        const deletelisthandle=(k)=>{
          let array =[]
          let string = pricelist
          // let slice = string.slice(k,1)
          string.split(',').forEach(element=>
              array.push(element)
          )
          array.splice(k,1)
          setpricelist(array.toString())
        }
        const rowNumber = (row) => framepricedata.filter(t=>t.frame.toUpperCase().includes(searchvalue.toUpperCase())).indexOf(row) + 1;
        const columns =[
    
          {
            name: <div>#</div>,
            selector: (row) =>rowNumber(row),
            width:"50px",
          },
          {
            name:"Frame",
            selector : (itm)=><div>{itm.frame}</div>,
            // width:"20%",
          },
          {
            name:"Orientation",
            selector : (itm)=><div className='d-flex-col'>
              {itm.orientation}
            </div>,
          
          },
          {
            name:"Price",
            selector : (itm)=><div className='d-flex-col'>
              <b>Noof Photo-Size-Price</b>
              {itm.price.split(',').map((ptitm,pk)=>(            
              <ul key={pk}> 
                <li>{ptitm}</li>
              </ul>
            ))}</div>,
          
          },
          {
            name:"Action",
            selector : (itm)=><div className='d-flex'><div>
            <button onClick={()=>Setvalues(itm)} className='btn btn-warning btn-xs '><BiEdit size={15} /></button>
            </div>
            <div className='ml-5' style={{marginLeft:"2px"}}>
            <button  onClick={()=>submitdelete(itm.id)} className='btn btn-danger btn-xs' ><RiDeleteBin6Line size={15} /></button>
          </div></div>,
          },
          
          
        ]
         
          const customStyles = {
            cells: {
              style: {
                border: "0.5px solid #f5f2f2 ",
                
              },
            },
            
            headCells: {
              style: {
                minHeight: '40px',
                border:"0.5px solid #e8e2e2 ",
                borderTopWidth: '1.5px'
              },
            
            },
            filter:{
              style:{
                border:"1px solid gray",
              }
            }
         
          };
  return (
    <div className='page-wrapper p-3 mt-5'>
       <ToastContainer/>
      <div className="row">
  <div className="col-md-12 grid-margin stretch-card">
    <div className="card">
      <div className="card-body">
        <div className='row ' >
          <div className='col-6' >
        <h6 className="card-title text-start text-bold">Frame type</h6>
        <div className='text-start'><button onClick={()=>setmodal(!modal) &setallnull()} className='btn btn-success btn-sm' ><BiAddToQueue size={20}/>Add</button></div>
        </div>
        <div className='col-6'>
        <form className="search-form ml-auto">
          <div className="input-group">
            <div className="input-group-text">
              <BiSearch/>
            </div>
            <input onChange={(e)=>setsearchvalue(e.target.value)}  type="text" className="form-control" id="navbarForm" placeholder="Search here..." />
          </div>
        </form>
        </div>
        </div>

        <div className="table-responsive pt-3">
        <DataTable
            pagination
            // highlightOnHover
            columns={columns}
            data={framepricedata.filter(t=>t.frame.toUpperCase().includes(searchvalue.toUpperCase()))}               
            defaultSortField="_id"
            defaultSortAsc={false}               
            paginationRowsPerPageOptions={[10,20,50,100]}
            // fixedHeader
            // fixedHeaderScrollHeight='63vh'
            // className="tablereact  tablereact "
            customStyles={customStyles}
        />
          
        </div>
      </div>
    </div>
  </div>
</div>

  <div className="modal " id="exampleModalCenter" tabIndex={1} aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog" style={modal===true ? {display: 'block', paddingRight: 17}:{display:'none'}}>
  <div className="modal-dialog modal-dialog-centered modal-lg box-shadow-blank" >
    <div className="modal-content"><div className="modal-header">
      <h5 className="modal-title" id="exampleModalCenterTitle">Frame Type</h5>
      <button onClick={()=>setmodal(!modal)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="btn-close" />
      </div>
      <form className="forms-sample" onSubmit={(e)=>Postframeprice(e)} >
        <div className="modal-body">
            <div className='row text-start'>          
                <div className="mb-3  col-6">
                    <label htmlFor="select" className="form-label ">Frames <b>*</b> </label>
                    <select required onChange={(e)=>setframe(e.target.value)} value={frame} className="form-select" >
                          <option hidden value='' >Select frame</option>
                          <option  value='print' >print</option>
                          <option value="miniframe" >Mini Frame</option>
                          <option  value="college" >College</option>
                          <option  value="canvas" >canvas</option>                        
                        </select>                                        
                </div>
                {frame==="college"||frame==="canvas"?
                <div className="mb-3  col-6" >
                    <label htmlFor="select"  className="form-label ">Orientation <b>*</b> </label>
                    <select required  onChange={(e)=>setorientation(e.target.value)} value={orientation} className="form-select" id="exampleFormControlSelect1">
                          <option hidden value='' >Select Orientation</option>
                          <option  value="landscape" >Landscape</option>
                          <option value="portait" >portait</option>
                          <option  vlaue ="square" >square</option>
                                                
                        </select>                 
                        
                </div>
                :null}
                {frame? 
                <div className='border border-solid py-2 row' >
                    <div className='col-12 col-md-6'>
                <div className="mb-3   col-12">
                    <label htmlFor="select" className="form-label ">NO of photos <b>*</b> </label>
                    <select onChange={(e)=>setnoofphoto(e.target.value)} value={noofphoto} className="form-select" id="exampleFormControlSelect1">
                          <option hidden>Select no of photos</option>
                          {frame==="miniframe"||frame==="canvas"||frame==="print"?<option>1</option>:null}
                          {frame==="college"?orientation==="landscape"||orientation==="portait"?<option   >2</option>:null:null}
                          {frame==="college"?orientation==="landscape"||orientation==="portait"?<option   >3</option>:null:null}
                          {frame==="college"?orientation==="landscape"||orientation==="portait"||orientation==="square"?<option   >4</option>:null:null}
                          {frame==="college"?orientation==="square"?<option   >9</option>:null:null}
                          {frame==="college"?orientation==="square"?<option   >12</option>:null:null}
                         
                                                
                        </select>                 
                        
                </div>
                <div className="mb-3 col-12">
                    <label htmlFor="userEmail" className="form-label ">Size <b>*</b> </label>
                    <input onChange={(e)=>setsize(e.target.value)} value={size} type="text"   className="form-control" placeholder="Size"  />
                </div>
                <div className="mb-3 col-12">
                    <label htmlFor="userEmail" className="form-label ">Price <b>*</b> </label>
                    <input onChange={(e)=>setprice(e.target.value)} value={price} type="text"   className="form-control" placeholder="Price"  />
                </div>
                <div className='text-end'>
                <button onClick={()=>pricelisthandler()} type='button' className='btn btn-primary '>Add</button>
                </div>
                </div>
                <div className='col-12 col-md-6'>
                  <b style={pricelist?{display:"block"}:{display:'none'}}>Noof Photos-size-price</b>
                  {pricelist?pricelist.split(',').map((itm,k)=>(
                    <ul key={k}>
                    <li>{itm} &nbsp; <RiDeleteBin6Line  onClick={()=>deletelisthandle(k)} className='deletebutton'/></li>
                  </ul>
                  )):null}
                    
                </div>
                </div>
                :null}
            </div>
        <div />
        </div>
        <div className="modal-footer">
          <button onClick={()=>setmodal(!modal) } type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
      </div>
    </div>
  </div>
    </div>
  )
}
