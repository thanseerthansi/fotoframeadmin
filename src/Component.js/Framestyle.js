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
  const { framedata } = useContext(Simplecontext)
    const [modal,setmodal]=useState(false)
    const [frametheme,setframetheme]=useState([])
    const [selecttheme,setselecttheme]=useState()
    const [themename,setthemename]=useState()
    const [frame,setframe]=useState()
    const [price,estprice]=useState()
  
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
        console.log("data",data)
        if (data.status===200){
          setframetheme(data.data)
        }
      } catch (error) { 
        notifyerror("Something went wrong")
        
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
        
        const columns =[
    
          {
            name: <div>#</div>,
            selector: (itm,index) =>index+1,
            width:"50px",
          },
          {
            name:"Frame theme",
            selector : (itm)=><div>{itm.framename}</div>,
            // width:"20%",
          },
          {
            name:"Frames",
            selector : (itm)=><div className='d-flex-col'>
              
        </div>,
          
          },
          {
            name:"Price",
            selector : (itm)=><div className='d-flex-col'>
              
        </div>,
          
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
            <input  type="text" className="form-control" id="navbarForm" placeholder="Search here..." />
          </div>
        </form>
        </div>
        </div>

        <div className="table-responsive pt-3">
        <DataTable
            pagination
            highlightOnHover
            columns={columns}
            data={frametheme}               
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
      <form className="forms-sample" >
        <div className="modal-body">
            <div className='row text-start'>
                <div className="mb-3  col-6">
                    <label htmlFor="select" className="form-label ">Frames Theme</label>
                    <input type="text" required  className="form-control" placeholder="Job Details"  />
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
                    <input type="text" required  className="form-control" placeholder="Job Details"  />
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
