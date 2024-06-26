import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { BiSearch,BiAddToQueue,BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
// import Scripts from './Scripts';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import DataTable from 'react-data-table-component';
import { Simplecontext } from './Simplecontext';
import Callaxios from './Callaxios';
import moment from 'moment';
import { Link } from 'react-router-dom';

export default function Orders() {
    const { orderproductdata,Getorderproduct } = useContext(Simplecontext)
    const [modal,setmodal]=useState(false)
    const [orderdata,setorderdata]=useState([])
    const [searchvalue,setsearchvalue]=useState('')
    // const [status,setstatus]=useState('')
    
    useEffect(() => {
      Getorders()
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
    const Getorders =async()=>{
      try {
        let data  = await Callaxios("get","order/orders/")
        // console.log("order date",data)
        if (data.status===200){
            setorderdata(data.data)
        }
      } catch (error) {
        notifyerror("Something went wrong ")
      }
    }
    const deletetask = async(itmid)=>{
        notify("delete")    
    }
    const orderfunction=(itm)=>{
      if (orderproductdata){
        let order_qs = orderproductdata.filter(t=>t.order.id===itm.id)
        return order_qs[0]
      }else{return null}
      
      
    }   
    // const datefield =(date)=>{
    //   console.log("olddate",date)
    //   let convert_date = <Moment date={date} />
    //   console.log("date",convert_date)
    // }
    const rowNumber = (row) => orderdata.filter(t=>t.Customer_name.toLowerCase().includes(searchvalue.toLowerCase())).indexOf(row) + 1;
        const columns =[
    
            {
              name: <div>#</div>,
              selector: (row) =>rowNumber(row),
              width:"50px",
            },
            {
              name:"Order.No",
              selector : (itm)=><div><Link to={{pathname: "/orderproduct"}} state={{someArray:itm}}>F{itm.created_date.split('T')[1].split('.')[1]}f{itm.id}</Link></div>,
              // selector : (itm)=><div>F{orderdata.created_date.split('T')[1].split('.')[1]}f{orderdata.id}</div>,
              
            },
            {
              name:"Customer",
              selector : (itm)=><div>{itm.Customer_name}</div>,
              
             
            },
            {
              name:"Status",
              selector : (itm)=><div className='p-2'>
              <button  disabled className='h-auto w-auto rounded  p-1 btn btn-secondary ' >{itm.status}</button>
              <br/><select onChange={(e)=>changestatus(itm.id,e.target.value)} className='form-select mt-1' >
                <option value='' hidden>Change Status</option>
                <option value="new">New</option>
                <option value="dispatch">Dispatch</option>
                <option value="delivered">Delivered</option>
                <option value="delete">Delete</option>
              </select>
              </div>,
        
            },
            {
              name:"Price",
              selector : (itm)=><div className='d-flex-col text-center'>{itm.total_price } <span className='aed'> AED</span></div>,
           
            },
            {
              name:"Paid",
              selector : (itm)=><div className='d-flex-col text-center'>
                <button  disabled className={`h-auto w-auto rounded  p-1 btn  ${itm.paidstatus?"btn-success":"btn-danger"}`} >{itm.paidstatus?"Paid":"Not Paid"}</button>
              <br/><select onChange={(e)=>changepaidstatus(itm.id,e.target.value)} className='form-select mt-1' >
                <option value='' hidden>Change Status</option>
                <option value={true}>Paid</option>
                <option value={false}>Not Paid</option>
                
              </select>
               </div>,
           
            },
            {
              name:"Date",
              selector : (itm)=><div className='d-flex-col text-center'>{moment(itm.created_date).format("MMMM Do YYYY, h:mm:ss a")}</div>,
           
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
          const changepaidstatus=async(order_id,status)=>{
            try {
              let data =await Callaxios("patch","order/orders/",{id:order_id,paidstatus:status})
              // console.log("datastatu",data)
              if (data.data.Status===200){
                notify("status changed")
                Getorders()
                // console.log("ststus",data)
             
              }else{
                notifyerror("Something went wrong")
              }
            } catch (error) {
              
            }
          }
    const changestatus=async(orderid,status)=>{
      try {
        let data =await Callaxios("patch","order/orders/",{id:orderid,status:status})
        // console.log("datastatu",data)
        if (data.data.Status===200){
          notify("status changed")
          Getorders()
        }else{
          notifyerror("Something Went Wrong")
        }
      } catch (error) {
        
      }
    }
  return (
    <div className='page-wrapper p-3 mt-5'>
       <ToastContainer/>
      <div className="row">
  <div className="col-md-12 grid-margin stretch-card">
    <div className="card">
      <div className="card-body">
        <div className='row ' >
          <div className='col-6' >
        <h6 className="card-title text-start text-bold">Orders</h6>
        {/* <div className='text-start'><button onClick={()=>setmodal(!modal)} className='btn btn-success btn-sm' ><BiAddToQueue size={20}/>Add</button></div> */}
        </div>
        <div className='col-6'>
        <form className="search-form ml-auto">
          <div className="input-group">
            <div className="input-group-text">
              <BiSearch/>
            </div>
            <input onChange={(e)=>e.target.value.charAt(0) !== ' '?setsearchvalue(e.target.value):""} value={searchvalue} type="text" className="form-control" id="navbarForm" placeholder="Search here..." />
          </div>
        </form>
        </div>
        </div>

        <div className="table-responsive pt-3">
        <DataTable
            pagination
            // highlightOnHover
            columns={columns}
            data={orderdata.filter(t=>t.Customer_name.toLowerCase().includes(searchvalue.toLowerCase()))}               
            defaultSortField="_id"
            defaultSortAsc={false}               
            paginationRowsPerPageOptions={[10,20,50,100]}
            // fixedHeader
            // fixedHeaderScrollHeight='63vh'
            // className="tablereact  tablereact "
            customStyles={customStyles}
        />
          {/* <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Vessel</th>
                <th>Job Details</th>
                <th>Engineer</th>
                <th>Port</th>
                <th>ETA</th>
                <th>ETD</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
             
                <tr >
                <td>1</td>
                <td>name</td>
                <td>job</td>
                <td>engineer</td>
                <td>port</td>
                <td>11/02/2023</td>
                <td>12/02/2023</td>
                <td>
                  <ul className='text-center'>
                    <li className='list-group-item '>
                      <button onClick={()=> setmodal(!modal)} className='btn btn-warning btn-xs edit-btn' ><BiEdit size={15}/>edit</button>
                    </li>
                    <li className='list-group-item mt-1' >
                    
                      <button onClick={()=>submitdelete()} className='btn btn-danger btn-xs' ><RiDeleteBin6Line size={15} />delete</button>
                    </li>
                  </ul>
                </td>
              </tr>
             
              
             
            </tbody>
          </table> */}
          
        </div>
      </div>
    </div>
  </div>
</div>

  {/* <div className="modal " id="exampleModalCenter" tabIndex={1} aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog" style={modal===true ? {display: 'block', paddingRight: 17}:{display:'none'}}>
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
  </div> */}
    </div>
  )
}
