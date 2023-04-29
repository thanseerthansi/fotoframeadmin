import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { BiSearch,BiAddToQueue,BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { AiOutlineEye } from 'react-icons/ai';
// import Scripts from './Scripts';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import DataTable from 'react-data-table-component';
import { Simplecontext } from './Simplecontext';
import Callaxios from './Callaxios';
import { useLocation } from 'react-router-dom';
export default function OrderProducts() {
    const { orderproductdata,Getorderproduct } = useContext(Simplecontext)
    const [modal,setmodal]=useState(false)
    const [orderdata,setorderdata]=useState([])
    const [searchvalue,setsearchvalue]=useState('')
    let location = useLocation();
    let orderp = location.state?location.state.someArray:""
    console.log("array",orderp)
  
    useEffect(() => {
       
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
    
    
    const orderfunction=()=>{
        console.log("orders",orderproductdata)
        console.log("orderp.id",orderp.id)
      if (orderproductdata){
        let order_qs = orderproductdata.filter(t=>t.order[0].id===orderp.id)
        console.log("orderqs",order_qs)
        return order_qs
      }else{return null}
      
      
    }   
        // const columns =[
    
        //     {
        //       name: <div>#</div>,
        //       selector: (itm,index) =>index+1,
        //       width:"50px",
        //     },
        //     {
        //       name:"Order.No",
        //       selector : (itm)=><div>F{itm.created_date.split('T')[1].split('.')[1]}f{itm.id}</div>,
        //       // selector : (itm)=><div>F{orderdata.created_date.split('T')[1].split('.')[1]}f{orderdata.id}</div>,
              
        //     },
        //     {
        //       name:"Customer",
        //       selector : (itm)=><div>{itm.Customer_name}</div>,
              
             
        //     },
        //     {
        //       name:"Status",
        //       selector : (itm)=><div>{itm.status}</div>,
        
        //     },
        //     {
        //       name:"Date",
        //       selector : (itm)=><div className='d-flex-col text-center'>                    
        //   </div>,
           
        //     },
        //   ]
         
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
        <h6 className="card-title text-start text-bold">Order detail</h6>
        {/* <div className='text-start'><button onClick={()=>setmodal(!modal)} className='btn btn-success btn-sm' ><BiAddToQueue size={20}/>Add</button></div> */}
        </div>
       
        </div>
        <div className='row '>
            <div className='col-6 d-flex'>              
                <span className='fontbold'>Customer : </span><span >{orderp?orderp.Customer_name:null}</span>
            </div>
            <div className='col-6 d-flex'>              
                <span className='fontbold'>Email : </span>{orderp?orderp. email:null}
            </div>
            <div className='col-6 d-flex'>              
                <span className='fontbold'>Address : </span>{orderp?orderp.address:null}
            </div>
            <div className='col-6 d-flex'>               
                <span className='fontbold'>Contact : </span>{orderp?orderp.contact:null}
            </div>
            <div className='col-6 d-flex'>               
                <span className='fontbold'>City : </span>{orderp?orderp.city:null}
            </div>

        </div>
        <div className="table-responsive pt-3">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Products</th>
                <th>Images</th>
                <th>Orientation</th>
                <th>Frame</th>
                <th >Size</th>
                {/* <th style={{width:"180px"}}>Status</th> */}
                <th>Price</th>
                
                
                
              </tr>
            </thead>
            <tbody>
              {orderfunction().length?orderfunction().map((itm,k)=>(
                <tr key={k}>
                <td>{k+1}</td>
                <td>{itm.product_type} <u className='hover pointerviewb' ><AiOutlineEye size={15} /> Preview</u></td>
                <td>Download</td>
                <td>{itm.orientation}</td>
                <td>{itm.frame?.[0].framename??""}</td>
                <td>{itm.size}</td>
                {/* <td><div className='p-2'>{itm.status}
              <button  disabled className='h-auto w-auto rounded  p-1  ' >{itm.status}</button>
              <br/><select className='form-select mt-1' >
                <option value='' hidden>Change Status</option>
                <option>New</option>
                <option>Dispatch</option>
                <option>Delivered</option>
                <option>Delete</option>
              </select>
              </div></td> */}
                <td>{itm.price} <span className='aed'>AED</span></td>
                {/* <td>name</td> */}
                
              </tr>
             )):null}
             <tr>
              <td colSpan={6} className='text-end'>Shipping</td>
              <td colSpan={1} className=''>{orderp?orderp.shipping:null}</td>
             </tr>
             <tr>
              <td colSpan={6} className='text-end'>Total</td>
              <td colSpan={1} className=''>{orderfunction()?orderfunction().reduce((n, {price}) => n + parseInt(price), 0)+parseInt(orderp?orderp.shipping:null):null}<span className='aed'> AED</span></td>
             </tr>
              
             
            </tbody>
          </table>
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
                    <label htmlFor="select" className="form-label ">Vessel</label>
                    <select required  className="form-select" id="exampleFormControlSelect1">
                          <option hidden>Select Vessel</option>
                          <option  >vessel 1</option>
                          <option   >Vessel 2</option>
                        </select>
                </div>
                <div className="mb-3 col-6">
                    <label htmlFor="userEmail" className="form-label ">Job Details</label>
                    <input type="text" required  className="form-control" placeholder="Job Details"  />
                </div>
                <div className="mb-3  col-6">
                    <label htmlFor="select" className="form-label ">Engineer</label>
                    <select required  className="form-select" id="exampleFormControlSelect1">
                          <option hidden>Select Engineer</option>
                          <option  >engineer  1</option>
                          <option   >Engineer 2</option>
                        </select>
                </div>
                <div className="mb-3  col-6">
                    <label htmlFor="select" className="form-label ">Port</label>
                    <select required  className="form-select" id="exampleFormControlSelect1">
                          <option hidden>Select Port</option>
                          <option  >Port 1</option>
                          <option   >Port 2</option>
                        </select>
                </div>
                <div className="mb-3 col-6">
                    <label htmlFor="userEmail" className="form-label ">ETA</label>
                    <input type="date" required  className="form-control" placeholder="Job Details"  />
                </div>
                <div className="mb-3 col-6">
                    <label htmlFor="userEmail" className="form-label ">ETD</label>
                    <input type="date" required  className="form-control" placeholder="Job Details"  />
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
