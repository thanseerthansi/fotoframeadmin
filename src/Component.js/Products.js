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
import { Link } from 'react-router-dom';
export default function Products() {
    const [modal,setmodal]=useState(false)
    const [productdata,setproductdata]=useState([])
    const [themedata,setthemedata]=useState('')
    const [theme,settheme]=useState('')
    const [title,settitle]=useState('')
    const [image,setimage]=useState('')
    const [color,setcolor]=useState('')
    const [price,setprice]=useState('')
    const [selectproduct,setselectproduct]=useState('')
    const [searchvalue,setsearchvalue]=useState('')
    
    // const []
  
    useEffect(() => {
      Getproduct()
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
    const Getproduct=async()=>{
      try {
        let data = await Callaxios("get","product/product/")
        console.log("data",data)
        if(data.status===200){
          setproductdata(data.data)       
        }
      } catch (error) {
        notifyerror("Something went wrong")
      }
    }
    const Gettheme =async()=>{
      try {
        let data = await Callaxios("get","product/producttheme/")
        console.log("datacity",data)
        if (data.status===200){
          // console.log("data",data.data)
          setthemedata(data.data)
        }
      } catch (error) { 
        notifyerror("Something went wrong")
        
      }
    }
        const Postproduct =async(e)=>{
          e.preventDefault()
          console.log("postproduct")
          let msg
          let themelist =[]
          const form_data = new FormData();  
          if (image instanceof File ){    
                form_data.append("product_image",image)
        }
          
          form_data.append("product_name",title)
          form_data.append("product_image",title)
          form_data.append("auther",title)
          form_data.append("price",title)
          form_data.append("color",color)
          
          if (theme[0].value){
            theme.forEach(element => {
              themelist.push(element.value)
            });
          }
          form_data.append("theme",JSON.stringify(themelist))
          
          if (selectproduct){
            form_data.append("id",selectproduct.id)
            msg = "Successfully updated"
          }else{
            msg = "Successfully added"
          }
          try {
          
           let data = await Callaxios("post","product/product/",form_data)  
           console.log("data",data)
           if (data.data.Status===200){
              Gettheme()
              notify(msg)
              setmodal(!modal)
           }       
          } catch (error) {
            console.log(error)
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
        const rowNumber = (row) => productdata.filter(t=>t.product_name.toUpperCase().includes(searchvalue.toUpperCase())).indexOf(row) + 1;
        const columns =[
    
            {
              name: <div>#</div>,
              selector: (row) =>rowNumber(row),
              width:"50px",
            },
            {
              name:"Product Title",
              selector : (itm)=><div>{itm.product_name}</div>,
              width:"20%",
            },
            {
              name:"Images",
              selector : (itm)=><div className='d-flex-col text-center'><img src={itm.product_image} width={70} className="img-thumbnail" alt="layout images" />                  
          </div>,
            width:"20%",
            },
            {
              name:"Auther",
              selector : (itm)=><div>{itm.auther}</div>,
            },
            {
              name:"Color",
              selector : (itm)=><div>{itm.color}</div>,
            },
            {
              name:"Theme",
              selector : (itm)=><div>
                <ul>
                  <li>{itm.theme}</li>
                </ul>
                </div>,
            },
            {
              name:"Price",
              selector : (itm)=><div>{itm.price}</div>,
            },
            {
              name:"Action",
              selector : (itm)=><div className='d-flex'><div>
              <button  className='btn btn-warning btn-xs '><BiEdit size={15} /></button>
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
        <h6 className="card-title text-start text-bold">Products</h6>
        <div className='text-start'><button onClick={()=>setmodal(!modal)} className='btn btn-success btn-sm' ><BiAddToQueue size={20}/>Add</button></div>
        </div>
        <div className='col-6'>
        <form className="search-form ml-auto">
          <div className="input-group">
            <div className="input-group-text">
              <BiSearch/>
            </div>
            <input onChange={(e)=>setsearchvalue(e.target.value)} value={searchvalue} type="text" className="form-control" id="navbarForm" placeholder="Search here..." />
          </div>
        </form>
        </div>
        </div>

        <div className="table-responsive pt-3">
        <DataTable
            pagination
            highlightOnHover
            columns={columns}
            data={productdata}               
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
      <h5 className="modal-title" id="exampleModalCenterTitle">Frames</h5>
      <button onClick={()=>setmodal(!modal)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="btn-close" />
      </div>
      <form className="forms-sample" onSubmit={(e)=>Postproduct(e)} >
        <div className="modal-body">
            <div className='row text-start'>              
                <div className="mb-3 col-md-6 col-12">
                    <label htmlFor="userEmail" className="form-label ">Title</label>
                    <input   type="text" required  className="form-control" placeholder="Product Title"  />
                </div>
                <div className="mb-3 col-md-6 col-12">
                    <label htmlFor="userEmail" className="form-label ">Auther</label>
                    <input   type="text"   className="form-control" placeholder="auther"  />
                </div>
                <div className="mb-3 col-md-6 col-12">
                    <label htmlFor="userEmail" className="form-label ">Color</label>
                    <input   type="color" required  className="form-control" placeholder="Color"  />
                </div>
                <div className="mb-3 col-md-6 col-12">
                    <label htmlFor="userEmail" className="form-label ">Theme  </label>
                    <Link to="/frame" className='text-primary ' > &nbsp; Add Theme</Link>
                        {/* </div> */}
                    <Select
                          options={themedata ? themedata.map((titm, t) => (
                            { label: titm.theme_name, value: titm.id }
                          )) : null}
                          value={theme}
                          closeMenuOnSelect={false}
                          hideSelectedOptions={true}
                          onChange={newcontent => { settheme(newcontent) }}
                          isMulti={true}
                          isRequired={false}
                        />
                </div>
                <div className="mb-3 col-md-6 col-12">
                    <label htmlFor="userEmail" className="form-label ">Image</label>
                    <input   type="text" required  className="form-control" placeholder="Image"  />
                </div>
                <div className="mb-3 col-md-6 col-12">
                    <label htmlFor="userEmail" className="form-label ">image</label>
                    <input   type="file"   className="form-control" placeholder="image"  />
                    {/* {image ?
                          <div className='m-2'>
                            <img className='rounded image-size' src={image instanceof File ? URL.createObjectURL(image):image}  alt='img' height="auto" width="auto" />
                          </div>
                          :null } */}
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
