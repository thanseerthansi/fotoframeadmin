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
    const [orient,setorient]=useState('')
    const [auther,setauther]=useState('')
    const [selectproduct,setselectproduct]=useState('')
    const [searchvalue,setsearchvalue]=useState('')
    const [delivery_charge,setdelivery_charge]=useState(0)
    const [sizes,setsizes]=useState('')
    const [sizeprice,setsizeprice]=useState('')
    const [sizeorientation,setsizeorientation]=useState('')
    
    // const []
  
    useEffect(() => {
      Getproduct()
      Gettheme()
      Getdelivey()
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
        // console.log("data",data)
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
        // console.log("datacity",data)
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
          // console.log("postproduct")
          let msg
          let themelist =[]
          const form_data = new FormData();  
          if (image instanceof File ){    
                form_data.append("product_image",image)
        }         
          form_data.append("product_name",title)
          form_data.append("auther",auther)
          form_data.append("price",price)
          form_data.append("color",color)     
          form_data.append("orientation",orient)     
          form_data.append("sizes",sizes)     
          try {
            if (theme[0].value){
              theme.forEach(element => {
                themelist.push(element.value)
              });
            }
          } catch (error) {           
              notifyerror("Theme not selected")
              return           
          }     
          
          // form_data.append("theme_id",themelist)
          form_data.append("theme_id",JSON.stringify(themelist))
          
          if (selectproduct){
            form_data.append("id",selectproduct.id)
            msg = "Successfully updated"
          }else{
            msg = "Successfully added"
          }
          try {
          
           let data = await Callaxios("post","product/product/",form_data)  
          //  console.log("data",data)
           if (data.data.Status===200){
              Getproduct()
              notify(msg)
              setmodal(!modal)
           }       
          } catch (error) {
            console.log(error)
          }
        }
    const deletetask = async(itmid)=>{
        // notify("delete")
        try {
          let data =await Callaxios("delete",`product/product/`,{id:itmid})
          // console.log("data",data)
          if (data.status===200){
            notify("Deleted Successfully")
            Getproduct()
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
        const edittheme=(itm)=>{
          setallnull()
          setselectproduct(itm)
          settitle(itm.product_name)
          setauther(itm.auther)
          setimage(itm.product_image)
          setprice(itm.price)
          setcolor(itm.color)
          setorient(itm.orientation)
          arraysorttheme(itm)
          setmodal(!modal)
        }
        const setallnull=()=>{
          setselectproduct('')
          settitle('')
          setauther('')
          setcolor('')
          settheme('')
          setprice('')
          setimage()
          setorient('')
          setsizes('')
          setsizeorientation('')
          setsizeprice('')
        }
        const arraysorttheme=(product_array)=>{
          if (product_array.theme.length){
            const list_item=[]
            product_array.theme.forEach(element => {
              list_item.push( {label:element.theme_name, value: element.id} ,)
            });
            // console.log("listvalue",list_item)
            settheme(()=>[...list_item])
          }
          
        }
        const setstatus=async(status,itmid)=>{
          try {
            let data = await Callaxios("post","product/product/",{status:status,id:itmid})  
            if (data.data.Status===200){
              // notify("status updated")
              Getproduct()
            }
          } catch (error) {
            notifyerror("Something went wrong")
          }
        }
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
            // width:"20%",
            },
            {
              name:"Status",
              selector : (itm)=>itm.status===true ? 
              <button onClick={()=>setstatus(false,itm.id)} className='h-auto w-auto rounded text-white p-1 bg-success status-button' >enabled</button>
               :<button onClick={()=>setstatus(true,itm.id)} className='h-auto w-auto rounded text-white p-1  status-button'style={{backgroundColor:"#e20000"}}>disabled</button>,
               width:"10%",
            },
            {
              name:"Auther",
              selector : (itm)=><div>{itm.auther}</div>,
            },
            {
              name:"Color",
              selector : (itm)=><div style={{backgroundColor:itm.color,height:"40px",width:"40px",borderRadius:"40px"}}><span > </span></div>,
            },
            {
              name:"Orientation",
              selector : (itm)=><div >{itm.orientation}</div>,
            },
            {
              name:"Theme",
              selector : (itm)=><div>
                {itm.theme? itm.theme.map((themeitm,fk)=>(
                <ul key={fk}>
                  <li>{themeitm.theme_name}</li>
                </ul>
              )) :null} 
               
                </div>,
                width:"160px",
            },
            {
              name:"Price",
              selector : (itm)=><div>{itm.price}</div>,
            },
            {
              name:"Sizes",
              selector : (itm)=><div className='d-flex-col'>
                {itm.sizes?<>
              <b>Size-Price</b>
              {itm.sizes?itm.sizes.split(',').map((ptitm,pk)=>(            
              <ul key={pk}> 
                <li>{ptitm}</li>
              </ul>
            )):null}</>:null}</div>,
            width:"160px",
            },
            {
              name:"Action",
              selector : (itm)=><div className='d-flex'><div>
              <button onClick={()=>edittheme(itm)} className='btn btn-warning btn-xs '><BiEdit size={15} /></button>
              </div>
              <div className='ml-5' style={{marginLeft:"2px"}}>
              <button  onClick={()=>submitdelete(itm.id)} className='btn btn-danger btn-xs' ><RiDeleteBin6Line size={15} /></button>
            </div></div>,
            width:"150px",
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
    const Getdelivey=async()=>{
      try {
        let data = await Callaxios("get","product/delivery/")
        // console.log("datadelivery",data)
        if (data.status===200){
          if(data.data.length){
            setdelivery_charge(data.data[0].delivery_charge)
          }
          
        }
      } catch (error) {
        console.log(error)
      }
    }
  const postdelivery =async()=>{
    try {
      let data = await Callaxios("post","product/delivery/",{delivery_charge:delivery_charge})
      if (data.data.Status===200){
        notify("Updated Successfully")
      }
      else{
        notifyerror("Something Went Wrong")
      }
    } catch (error) {
      notifyerror("Something Went Wrong")
    }
  }
  const deletelisthandle=(k)=>{
    let array =[]
    let string = sizes
    // let slice = string.slice(k,1)
    string.split(',').forEach(element=>
        array.push(element)
    )
    array.splice(k,1)
    setsizes(array.toString())
  }
  const sizepricehandler=()=>{
    let sellprice = sizes
    if (sizeorientation){
      if(sizeprice){
        let list=''
        let pp_ls =sizeorientation+"-"+sizeprice 
        if (sellprice){
          list = sellprice.concat(",",pp_ls)
        }else{
          list = pp_ls
        }
        setsizes(list)
        setsizeorientation('')
        setsizeprice('')
      }
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
        <h6 className="card-title text-start text-bold">Products</h6>
        <div className='text-start'><button onClick={()=>setmodal(!modal)&setallnull()} className='btn btn-success btn-sm' ><BiAddToQueue size={20}/>Add</button></div>
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
        <div className='row mt-1'>
          <div className='col-6 mt-2 text-end'>
            <h6>Delivery charge :</h6>
          </div>
          <div className='col-6 d-flex'>
            <div className='col-6 d-flex' >
          <input onChange={(e)=>setdelivery_charge(e.target.value)} value={delivery_charge} type="text" className="form-control " id="navbarForm" placeholder="Delivery charge" />
          {/* <b className='mt-2'>AED</b>&nbsp; */}
          </div>
          <div className='col-6'>
          <button onClick={()=>postdelivery()} className='btn btn-sm btn-primary'>submit</button>
          </div>
          
          </div>
        </div>
        
        </div>
        
        </div>

        <div className="table-responsive pt-3">
        <DataTable
            pagination
            // highlightOnHover
            // highlightOnHover={true}
            columns={columns}
            data={ productdata.filter(t=>t.product_name.toUpperCase().includes(searchvalue.toUpperCase()))}               
            defaultSortField="id"
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
      <h5 className="modal-title" id="exampleModalCenterTitle">Add Product</h5>
      <button onClick={()=>setmodal(!modal)} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="btn-close" />
      </div>
      <form className="forms-sample" onSubmit={(e)=>Postproduct(e)} >
        <div className="modal-body">
            <div className='row text-start'>              
                <div className="mb-3 col-md-6 col-12">
                    <label htmlFor="userEmail" className="form-label ">Title</label>
                    <input onChange={(e)=>settitle(e.target.value)}  value={title} type="text" required  className="form-control" placeholder="Product Title"  />
                </div>
                <div className="mb-3 col-md-6 col-12">
                    <label htmlFor="userEmail" className="form-label ">Auther</label>
                    <input onChange={(e)=>setauther(e.target.value)}  value={auther}   type="text"   className="form-control" placeholder="auther"  />
                </div>
                <div className="mb-3 col-md-6 col-12">
                    <label htmlFor="userEmail" className="form-label ">Color</label>
                    <input onChange={(e)=>setcolor(e.target.value)}  value={color}   type="color" required  className="form-control" placeholder="Color"  />
                </div>
                <div className="mb-3 col-md-6 col-12">
                    <label htmlFor="userEmail" className="form-label ">Theme  </label>
                    <Link to="/producttheme" className='text-primary ' > &nbsp; Add Theme</Link>
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
                <div className="mb-3 col-md-6 col-12" >
                    <label htmlFor="userEmail" className="form-label ">Price</label>
                    <input onChange={(e)=>setprice(e.target.value)}  value={price}   type="text" required  className="form-control" placeholder="Price"  />
                </div>
                <div className="mb-3 col-md-6 col-12">
                    <label htmlFor="userEmail" className="form-label ">Orientation</label>
                    {/* <input onChange={(e)=>setorient(e.target.value)}  value={orient}   type="text" required  className="form-control" placeholder="Orientaions"  /> */}
                    <select required onChange={(e)=>setorient(e.target.value)}  value={orient}  className="form-select" id="exampleFormControlSelect1">
                          <option hidden>Select Orientation</option>
                          <option value="potrait" >Potrait</option>
                          <option value="Landscape" >Landscape</option>
                          <option value="Square">Square</option>
                        </select>
                </div>
                <div className="mb-3 col-md-6 col-12">
                    <label htmlFor="userEmail" className="form-label ">image</label>
                    <input   type="file" onChange={(e)=>setimage(e.target.files[0])}  value={''}   className="form-control" placeholder="image"  />
                    {image ?
                          <div className='m-2'>
                            <img className='rounded image-size' src={image instanceof File ? URL.createObjectURL(image):image}  alt='img' height="auto" width="auto" />
                          </div>
                          :null }
                </div>
                <div className="mb-3 col-md-6 col-12 ">
                    <label htmlFor="userEmail" className="form-label ">Sizes</label>
                    <b style={sizes?{display:"block"}:{display:'none'}}>Noof Photos-size-price</b>
                  {sizes?sizes.split(',').map((itm,k)=>(
                    <ul key={k}>
                    <li>{itm} &nbsp; <RiDeleteBin6Line  onClick={()=>deletelisthandle(k)} className='deletebutton'/></li>
                  </ul>
                  )):null}
                    <div className='row border py-2'>
                      <div className='col-12 '>
                      <label htmlFor="userEmail" className="form-label ">Size</label>
                      <input   type="text" onChange={(e)=>setsizeorientation(e.target.value)}  value={sizeorientation}   className="form-control" placeholder="size"  />
                      </div>
                      <div className='col-12 '>
                      <label htmlFor="userEmail" className="form-label ">Price</label>
                      <input   type="text" onChange={(e)=>setsizeprice(e.target.value)}  value={sizeprice}   className="form-control" placeholder="price"  />
                      </div>
                      <div className='text-end pt-1'>
                      <button onClick={()=>sizepricehandler()} type='button' className='btn btn-primary '>Add</button>
                      </div>
                      
                   
                    </div>
                    
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
