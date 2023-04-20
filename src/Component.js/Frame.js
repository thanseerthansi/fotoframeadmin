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
import { Simplecontext } from './Simplecontext';

export default function Frame() {
  const { framedata,Getframe } = useContext(Simplecontext)
    const [modal,setmodal]=useState(false)
    // const [framedata,setframedata]=useState([])
    const [framename,setframename]=useState('')
    const [image,setimage]=useState()
    const [mainimage,setmainimage]=useState()
    const [selectframe,setselectframe]=useState()
    const [searchvalue,setsearchvalue]=useState('')
    // console.log("selectframe",selectframe)
    useEffect(() => {
      // Getframe()
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
    const Postframe =async(e)=>{
      e.preventDefault()
      let msg
      const form_data = new FormData();  
      if (image instanceof File ){    
            form_data.append("image",image)
    }
      if (mainimage instanceof File ){    
            form_data.append("main_image",mainimage)
    }
      if (framename){
        form_data.append("framename",framename)
      }
      if (selectframe){
        form_data.append("id",selectframe.id)
        msg = "Successfully updated"
      }else{
        msg = "Successfully added"
      }
      try {
      
       let data = await Callaxios("post","frame/frame/",form_data)  
      //  console.log("data",data)
       if (data.data.Status===200){
          Getframe()
          notify(msg)
          setmodal(!modal)
       }       
      } catch (error) {
        console.log(error)
      }
    }
    const Getselectframe=(itm)=>{
      setallnull()
      setselectframe(itm)
      setframename(itm.framename)
      setimage(itm.image)
      setmainimage(itm.main_image)
      setmodal(!modal)
    }
    const deletetask = async(itmid)=>{
        try {
          let data =await Callaxios("delete",`frame/frame`,{id:itmid})
          // console.log("data",data)
          if (data.status===200){
            notify("Deleted Successfully")
            Getframe()
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
        const rowNumber = (row) => framedata.filter(t=>t.framename.toUpperCase().includes(searchvalue.toUpperCase())).indexOf(row) + 1;
        const columns =[
    
            {
              name: <div>#</div>,
              selector: (row) =>rowNumber(row),
              width:"50px",
            },
            {
              name:"Frame Name",
              selector : (itm)=><div>{itm.framename}</div>,
              // width:"20%",
            },
            {
              name:"Background Frame",
              selector : (itm)=><div className='d-flex-col text-center'><img src={itm.image} width={70} className="img-thumbnail" alt="layout images" />               
              </div>,         
            },
            {
              name:"Main Image",
              selector : (itm)=><div className='d-flex-col text-center'><img src={itm.main_image} width={70} className="img-thumbnail" alt="layout mainimages" />               
              </div>,         
            },
            {
              name:"Action",
              selector : (itm)=><div className='d-flex'><div>
              <button onClick={()=>Getselectframe(itm)} className='btn btn-warning btn-xs '><BiEdit size={15} /></button>
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
      setselectframe('')
      setframename('')
      setimage()
      setmainimage()
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
        <h6 className="card-title text-start text-bold">Frame</h6>
        <div className='text-start'><button onClick={()=>setmodal(!modal) & setallnull()} className='btn btn-success btn-sm' ><BiAddToQueue size={20}/>Add</button></div>
        </div>
        <div className='col-6'>
        <form className="search-form ml-auto">
          <div className="input-group">
            <div className="input-group-text">
              <BiSearch/>
            </div>
            <input  type="text" onChange={(e)=>setsearchvalue(e.target.value)} className="form-control" id="navbarForm" placeholder="Search here..." />
          </div>
        </form>
        </div>
        </div>

        <div className="table-responsive pt-3">
        <DataTable
            pagination
            // highlightOnHover
            columns={columns}
            data={framedata.filter(t=>t.framename.toUpperCase().includes(searchvalue.toUpperCase()))}               
            defaultSortField="_id"
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
      <h5 className="modal-title" id="exampleModalCenterTitle">Frames</h5>
      <button onClick={()=>setmodal(!modal)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="btn-close" />
      </div>
      <form className="forms-sample" onSubmit={(e)=>Postframe(e)} >
        <div className="modal-body">
            <div className='row text-start'>              
                <div className="mb-3 col-12">
                    <label htmlFor="userEmail" className="form-label ">Frame Name</label>
                    <input  onChange={(e)=>setframename(e.target.value)} value={framename} type="text" required  className="form-control" placeholder="Frame name"  />
                </div>
                <div className="mb-3 col-12">
                    <label htmlFor="userEmail" className="form-label ">Main image</label>
                    <input onChange={(e)=>setmainimage(e.target.files[0])} value={''}  type="file"   className="form-control" placeholder="main image"  />
                    {mainimage ?
                          <div className='m-2'>
                            <img className='rounded image-size' src={mainimage instanceof File ? URL.createObjectURL(mainimage):mainimage}  alt='img' height="auto" width="auto" />
                          </div>
                          :null }
                </div>
                <div className="mb-3 col-12">
                    <label htmlFor="userEmail" className="form-label ">Frame image</label>
                    <input onChange={(e)=>setimage(e.target.files[0])} value={''}  type="file"   className="form-control" placeholder="image"  />
                    {image ?
                          <div className='m-2'>
                            <img className='rounded image-size' src={image instanceof File ? URL.createObjectURL(image):image}  alt='img' height="auto" width="auto" />
                          </div>
                          :null }
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
