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

export default function Framestyle() {
  const { framedata,Getframe } = useContext(Simplecontext)
    const [modal,setmodal]=useState(false)
    const [framethemedata,setframethemedata]=useState([])
    const [selecttheme,setselecttheme]=useState()
    const [themetype,setthemetype]=useState()
    const [frame,setframe]=useState()
    const [price,settprice]=useState()
    const [searchvalue,setsearchvalue]=useState('')
  
    useEffect(() => {
      Getframetheme()
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
        console.log("dataframesytle",data)
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
        let framelist =[]
        if (frame[0].value){
          
          console.log("ftamearay",frame)
          
          frame.forEach(element => {
            framelist.push(element.value)
          });
          console.log("fraemlist",framelist)
        }
         body ={
          frame_type:themetype,
          frameid:framelist,
          price:price,
        }
        let data = await Callaxios("post","frame/frametype/",body)
        console.log("dATta",data)
        if (data.data.Status===200){
          notify("Successfuly added")
          Getframe()
          setmodal(!modal)
        }
      } catch (error) {
        
      }
    }
    const deletetask = async(itmid)=>{
        notify("delete")
        // try {
        //   let data =await Callaxios("delete",`categories/${itmid}`)
        //   // console.log("data",data)
        //   if (data.status===200){
        //     notify("Deleted Successfully")
        //     getcategory()
        //   }
        // } catch (error) {
        //   notifyerror("Something went wrong")
        // }    
    }
    
    const submitdelete = (itemid) => {
        confirmAlert({
            title: "Confirmation",
            message: `Are you sure to delete this ?`,
            buttons: [
            {
                label: "Yes",           
                onClick:()=>deletetask(),
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
            name:"Frame theme",
            selector : (itm)=><div>{itm.frame_type}</div>,
            // width:"20%",
          },
          {
            name:"Frames",
            selector : (itm)=><div className='d-flex-col'>
              
        </div>,
          
          },
          {
            name:"Price",
            selector : (itm)=><div className='d-flex-col'>{itm.price}</div>,
          
          },
          {
            name:"Action",
            selector : (itm)=><div className='d-flex'><div>
            <button className='btn btn-warning btn-xs '><BiEdit size={15} /></button>
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
        <div className='text-start'><button onClick={()=>setmodal(!modal)} className='btn btn-success btn-sm' ><BiAddToQueue size={20}/>Add</button></div>
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
      <h5 className="modal-title" id="exampleModalCenterTitle">Tasks</h5>
      <button onClick={()=>setmodal(!modal)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="btn-close" />
      </div>
      <form className="forms-sample" onSubmit={(e)=>Postframetype(e)} >
        <div className="modal-body">
            <div className='row text-start'>
                <div className="mb-3  col-6">
                    <label htmlFor="select" className="form-label ">Frames Type</label>
                    <input onChange={(e)=>setthemetype(e.target.value)} type="text" required  className="form-control" placeholder="Theme name "  />
                </div>
                <div className="mb-3  col-6">
                    <label htmlFor="select" className="form-label ">Frames </label>
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
                    <label htmlFor="userEmail" className="form-label ">Price</label>
                    <input onChange={(e)=>settprice(e.target.value)} type="text" required  className="form-control" placeholder="Job Details"  />
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
