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
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ListManager } from 'react-beautiful-dnd-grid';
export default function OrderProducts() {
    const { orderproductdata,Getorderproduct } = useContext(Simplecontext)
    const [modal,setmodal]=useState(false)
    const [orderdata,setorderdata]=useState([])
    const [searchvalue,setsearchvalue]=useState('')
    const [selectitm,setselectitm]=useState('')
    let location = useLocation();
    let orderp = location.state?location.state.someArray:""
    console.log("array",orderp)
    console.log("selectitm",selectitm)
  
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
        // console.log("orders",orderproductdata)
        // console.log("orderp.id",orderp.id)
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
                <td>{itm.product.length?itm.product[0].product_name:itm.product_type} 
                <br/><u onClick={()=>setmodal(!modal)&setselectitm(itm)} className='hover pointerviewb' ><AiOutlineEye size={15} /> Preview</u></td>
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
      <h5 className="modal-title" id="exampleModalCenterTitle"></h5>
      <button onClick={()=>setmodal(!modal)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="btn-close" />
      </div>
      <form className="forms-sample" >
        <div className="modal-body">
            
        {selectitm.product_name==="Mini Frame"?
        <div className='row'>
        {selectitm? selectitm.image_url.map((itm,k)=>(
            <div key={k} className='col-12 col-md-6 '>
            <div className="mt-2 item">
              <figure className='framebox-shadow' >
              <img src="/assets/img/photos/black-frame.png" alt="example"  style={{width:"100%"}} /> 
              <img src={itm} alt="img" className='minimage' style={selectitm.frame_look==="MODERN"?{width:"94%"}:{width:"94%",padding:"10px"}} />             
               
              </figure>
            </div>
            </div>
            ))
            :null}</div>
            :selectitm.product_name==="College" & selectitm.orientation==="LandScape"?
            <div className="overflowbar " >  
            {selectitm.image_url.length ? 
            <div className={"d-flex border-cp framebox-shadow"} style={selectitm.image_url.length===2?{width:"500px",height:"100%",margin:"auto",borderImage:`url(${selectitm.frame?.image??"http://127.0.0.1:8000/media/Image/black-frame.png"})1%  stretch repeat`}:selectitm.image_url.length===3?{width:"780px",height:"200px",borderImage:`url(${selectitm.frame?.image??"http://127.0.0.1:8000/media/Image/black-frame.png"})1%  stretch repeat`}:{width:"1049px",height:"200px",borderImage:`url(${selectitm.frame?.image??"http://127.0.0.1:8000/media/Image/black-frame.png"})1%  stretch repeat`}}   >
              
            {selectitm.image_url.length?selectitm.image_url.map((itm,k)=>(               
                <img src={itm} alt="img" className={selectitm.image_url.length===2?"image-lcp1 imagelcp_width2":"image-lcp1 imagelcp_width"}    />     
            )):null}
            </div>  
            :null}     
        </div>
          :selectitm.product_name==="College" & selectitm.orientation==="Portait"?
          <div className=" border-cp framebox-shadow" style={{width:"300px",margin:"auto",borderImage:`url(${selectitm.frame?.image??"http://127.0.0.1:8000/media/Image/black-frame.png"})1%  stretch repeat`}}   >
              <DragDropContext >
      <Droppable droppableId="uploaded-images" direction='vertical'>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} >
            {selectitm.image_url.map((image, index) => (
              <Draggable key={index} draggableId={index.toString()} index={index}>
                {(provided) => (
                  <img
                  src={image}
                  alt="img"
                  className="image-pcp pcpwidth "
                  
                    
                    ref={provided.innerRef}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
            </div> 
        :selectitm.product_name==="College" & selectitm.orientation==="Square"?
        <div className="border-cp framebox-shadow" style={selectitm.image_url.length===4? {width:"386px",margin:"auto",padding:"5px",borderImage:`url(${selectitm.frame?.image??"http://127.0.0.1:8000/media/Image/black-frame.png"})1%  stretch repeat`}:selectitm.image_url.length===9?{width:"505px",margin:"auto",padding:"5px",borderImage:`url(${selectitm.frame?.image??"http://127.0.0.1:8000/media/Image/black-frame.png"})1%  stretch repeat`}:{width:"505px",margin:"auto",padding:"5px",borderImage:`url(${selectitm?.image??"http://127.0.0.1:8000/media/Image/black-frame.png"})1%  stretch repeat`}}   >
              
    <div className="App">
      <ListManager
        items={selectitm.image_url}
        direction="horizontal"
        maxItems={selectitm.image_url.length===4? 2:selectitm.image_url.length===9?3:4}
        render={item => <img src={item} alt="img" className='square-image' style={selectitm.image_url.length===12?{width:"120px",height:"100%"}:selectitm.image_url.length===9?{width:"160px",height:"100%"}:{width:"180px",height:"100%"}}/>}
        onDragEnd={() => {}}
        dragEnabled={false}
       
      />
    </div>
            </div>
        :selectitm.product_name==="Canvas"?
        <>
            {selectitm.frame? 
             <div className="d-flex border-cp framebox-shadow" style={{width:"266px",margin:"auto",borderImage:`url(${selectitm.frame?.image??"http://127.0.0.1:8000/media/Image/black-frame.png"})1%  stretch repeat`}} >
            {selectitm.image_url.length?selectitm.image_url.map((itm,k)=>(               
                <img src={itm} key={k} alt="img" className='' style={{width:"250px"}}    />     
            )):null}
            </div>
            :
            <>
            {selectitm.image_url.length?selectitm.image_url.map((itm,k)=>( 
              <div className=" margin-css m-auto" >            
              <div className=' ' >             
              <div className='canvas-rotate '>
                <img src={itm} alt="img" style={{width:"250px "}}   />   
                <div className='canvas-border '>
                  
                <img src={itm} alt="img" style={{maxWidth:"none",height:"100%"}}   /> 
                </div>
              </div>
              </div> 
        
          </div>   
              )):null}
              </>  }</>
    :selectitm.product_name==="Print"?<>
    {selectitm.image_url.length?selectitm.image_url.map((itm,k)=>(               
      <div key={k} className='  ' >             
      <div className='box-shadow p-1 'style={{width:"50%",margin:"auto"}}>
        <img src={itm} alt="img" style={{width:"100%"}}   />   
       
      </div>
      </div>    
 )):null}</>
    :selectitm.product?
    <div className={selectitm.frame?' d-flex border-cp framebox-shadow':'d-flex framebox-shadow'} style={selectitm.frame?{width:"335px",height:"100%",margin:"auto",borderImage:`url(${selectitm.frame?.image??"http://127.0.0.1:8000/media/Image/black-frame.png"})1%  stretch repeat`}:{width:"335px",height:"100%",margin:"auto"}}   >
    <img src={selectitm.product.length?selectitm.product[0].product_image:null} alt="img" className='' style={{width:"100%",height:"100%"}}    />
    </div>
    :null}
       
        <div />
        </div>
        {/* <div className="modal-footer">
          <button onClick={()=>setmodal(!modal) } type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          
        </div> */}
      </form>
      </div>
    </div>
  </div>
    </div>
  )
}
