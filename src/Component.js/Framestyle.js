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
import Select from 'react-select';
import { Simplecontext } from './Simplecontext';
import { Link } from 'react-router-dom';

export default function Framestyle() {
  const { framedata,Getframe } = useContext(Simplecontext)
    const [modal,setmodal]=useState(false)
    const [framethemedata,setframethemedata]=useState([])
    const [selecttheme,setselecttheme]=useState('')
    const [themetype,setthemetype]=useState('')
    const [frame,setframe]=useState('')
    const [price,settprice]=useState('')
    const [searchvalue,setsearchvalue]=useState('')
    
    useEffect(() => {
      Getframetheme()
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
    const Getframetheme =async()=>{
      try {
        let data = await Callaxios("get","frame/frametype/")
        // console.log("dataframesytle",data)
        if (data.status===200){
          setframethemedata(data.data)
        }
      } catch (error) { 
        notifyerror("Something went wrong")
        
      }
    }
    const Postframetype=async(e)=>{
      e.preventDefault()
      try {
        let body
        let msg
        let framelist =[]
        if (frame[0].value){
          frame.forEach(element => {
            framelist.push(element.value)
          });
        }
        if (selecttheme){
          body = {
            frame_type:themetype,
            frameid:framelist,
            price:price,
            id:selecttheme.id,
          }
          msg = "Successfuly updated"
        }else{
          body ={
            frame_type:themetype,
            frameid:framelist,
            price:price,
          }
          msg = "Successfuly added"
        }
         
        let data = await Callaxios("post","frame/frametype/",body)
        if (data.data.Status===200){
          notify(msg)
          Getframetheme()
          setmodal(!modal)
        }
      } catch (error) {
        
      }
    }
    const deletetask = async(itmid)=>{
        
        try {
          let data =await Callaxios("delete",`frame/frametype/`,{"id":itmid})
          if (data.data.Status===200){
            notify("Deleted Successfully")
            Getframetheme()
          }
        } catch (error) {
          notifyerror("Something went wrong")
        }    
    }
    const setallnull=()=>{
      setselecttheme('')
      setthemetype('')
      setframe('')
      settprice('')
    }
    const Setvalues=(itm)=>{
      setallnull() 
      setselecttheme(itm)
      setthemetype(itm.frame_type)
      sortarr(itm)
      settprice(itm.price)
      setmodal(!modal) 
    }
    const sortarr=(frame_array)=>{
      if (frame_array.frame.length){
        const list_item=[]
        frame_array.frame.forEach(element => {
          list_item.push( {label:element.framename, value: element.id} ,)
        });
        // console.log("listvalue",list_item)
        setframe(()=>[...list_item])
      }
      
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
        const rowNumber = (row) => framethemedata.filter(t=>t.frame_type.toUpperCase().includes(searchvalue.toUpperCase())).indexOf(row) + 1;
        const columns =[
    
          {
            name: <div>#</div>,
            selector: (row) =>rowNumber(row),
            width:"50px",
          },
          {
            name:"Frame type",
            selector : (itm)=><div>{itm.frame_type}</div>,
            // width:"20%",
          },
          {
            name:"Frames",
            selector : (itm)=><div className='d-flex-col'>
              {itm.frame? itm.frame.map((frameitm,fk)=>(
                <ul key={fk}>
                  <li>{frameitm.framename}</li>
                </ul>
              )) :null} 
            </div>,
          
          },
          {
            name:"Price",
            selector : (itm)=><div className='d-flex-col'>{itm.price}</div>,
          
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
            highlightOnHover
            columns={columns}
            data={framethemedata.filter(t=>t.frame_type.toUpperCase().includes(searchvalue.toUpperCase()))}               
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
      <form className="forms-sample" onSubmit={(e)=>Postframetype(e)} >
        <div className="modal-body">
            <div className='row text-start'>
                <div className="mb-3  col-6">
                    <label htmlFor="select" className="form-label ">Frames Type <b>*</b> </label>
                    <input onChange={(e)=>setthemetype(e.target.value)} value={themetype} type="text" required  className="form-control" placeholder="frame type name"  />
                </div>
                <div className="mb-3  col-6">
                    <label htmlFor="select" className="form-label ">Frames <b>*</b> </label>
                    {/* <div className='text-end'> */}
                        <Link to="/frame" className='text-primary ' >Add Frames</Link>
                        {/* </div> */}
                    <Select
                          options={framedata ? framedata.map((fitm, ft) => (
                            { label: fitm.framename, value: fitm.id }
                          )) : null}
                          value={frame}
                          closeMenuOnSelect={false}
                          hideSelectedOptions={true}
                          onChange={newcontent => { setframe(newcontent) }}
                          isMulti={true}
                          isRequired={true}
                        />
                        
                </div>
                <div className="mb-3 col-6">
                    <label htmlFor="userEmail" className="form-label ">Price <b>*</b> </label>
                    <input onChange={(e)=>settprice(e.target.value)} value={price} type="text" required  className="form-control" placeholder="Price"  />
                </div>
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
