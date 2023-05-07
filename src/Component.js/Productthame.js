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


export default function Producttheme() {
    const [modal,setmodal]=useState(false)
    const [themedata,setthemedata]=useState([])
    const [themename,setthemename]=useState('')
    const [description,setdescription]=useState('')
    const [selecttheme,setselecttheme]=useState('')
    const [searchvalue,setsearchvalue]=useState('')
    // console.log("selecttheme",selecttheme)
    useEffect(() => {
      Gettheme()
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

        const Gettheme =async()=>{
            try {
              let data = await Callaxios("get","product/producttheme/")
              // console.log("datacity",data)
              if (data.status===200){
                // console.log("data",data.data)
                setthemedata(data.data)
              }
            } catch (error) { 
              notifyerror("Something went wrong")
              
            }
          }
    const Posttheme =async(e)=>{
        e.preventDefault()
        let msg
        let body
      
     
        if (selecttheme){
            body ={
                id : selecttheme.id,
                theme_name:themename,
                description:description,
            }
            msg = "Successfully updated"
        }else{
            body ={
                theme_name:themename,
                description:description,
            }
            msg = "Successfully added"
        }
        try {
        // console.log("BODY",body)
        let data = await Callaxios("post","product/producttheme/",body)  
        // console.log("data",data)
        if (data.data.Status===200){
            Gettheme()
            notify(msg)
            setmodal(!modal)
        }       
        } catch (error) {
            console.log(error)
        }
    }
    const Getselecttheme=(itm)=>{
      setallnull()
      setselecttheme(itm)
      setthemename(itm.theme_name)
      setdescription(itm.description)
      setmodal(!modal)
    }
    const deletetask = async(itmid)=>{
        try {
          let data =await Callaxios("delete",`product/producttheme/`,{id:itmid})
        //   console.log("data",data)
          if (data.status===200){
            notify("Deleted Successfully")
            Gettheme()
          }
        } catch (error) {
          notifyerror("Something went wrong")
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
        // const rowNumber = (row) => themedata 
        const rowNumber = (row) => themedata.filter(t=>t.theme_name.toUpperCase().includes(searchvalue.toUpperCase())).indexOf(row) + 1;
        // console.log("rownum",rowNumber)
        const columns =[
    
            {
              name: <div>#</div>,
              selector: (row) =>rowNumber(row),
              width:"50px",
            },
            {
              name:"Product theme",
              selector : (itm)=><div>{itm.theme_name}</div>,
              // width:"20%",
            },
            {
              name:"description",
              selector : (itm)=><div className='d-flex-col text-center'>{itm.description}
                
          </div>,
            
            },
            {
              name:"Action",
              selector : (itm)=><div className='d-flex'><div>
              <button onClick={()=>Getselecttheme(itm)} className='btn btn-warning btn-xs '><BiEdit size={15} /></button>
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
    const setallnull=(name)=>{
      setselecttheme('')
      setthemename('')
      setdescription('')
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
        <h6 className="card-title text-start text-bold">Product Theme</h6>
        <div className='text-start'><button onClick={()=>setmodal(!modal) & setallnull()} className='btn btn-success btn-sm' ><BiAddToQueue size={20}/>Add</button></div>
        </div>
        <div className='col-6'>
        <form className="search-form ml-auto">
          <div className="input-group">
            <div className="input-group-text">
              <BiSearch/>
            </div>
            <input  type="text" onChange={(e)=>setsearchvalue(e.target.value)} value={searchvalue} className="form-control" id="navbarForm" placeholder="Search here..." />
          </div>
        </form>
        </div>
        </div>

        <div className="table-responsive pt-3">
        <DataTable
            pagination
            // highlightOnHover
            columns={columns}
                               
            data={themedata.filter(t=>t.theme_name.toUpperCase().includes(searchvalue.toUpperCase()))}                      
            defaultSortField="id"
            defaultSortAsc={false}               
            paginationRowsPerPageOptions={[10,20,50,100]}
            // fixedHeader
            // fixedHeaderScrollHeight='63vh'
            // className="tablereact  tablereact "
            customStyles={customStyles}
        />
       {/* <div className="spinner-container">
  <div className="spinner " />
</div> */}

          
        </div>
      </div>
    </div>
  </div>
</div>

  <div className="modal " id="exampleModalCenter" tabIndex={1} aria-labelledby="exampleModalCenterTitle" aria-modal="true" role="dialog" style={modal===true ? {display: 'block', paddingRight: 17}:{display:'none'}}>
  <div className="modal-dialog modal-dialog-centered modal-lg box-shadow-blank" >
    <div className="modal-content"><div className="modal-header">
      <h5 className="modal-title" id="exampleModalCenterTitle">Add Product Theme</h5>
      <button onClick={()=>setmodal(!modal)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="btn-close" />
      </div>
      <form className="forms-sample" onSubmit={(e)=>Posttheme(e)} >
        <div className="modal-body">
            <div className='row text-start'>              
                <div className="mb-3 col-12">
                    <label htmlFor="userEmail" className="form-label ">Theme Name</label>
                    <input  onChange={(e)=>setthemename(e.target.value)} value={themename} type="text" required  className="form-control" placeholder="Theme name"  />
                </div>
                <div className="mb-3 col-12">
                    <label htmlFor="userEmail" className="form-label ">description</label>
                    <textarea onChange={(e)=>setdescription(e.target.value)} value={description}  type="text"   className="form-control" placeholder="description"  />
                    
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
