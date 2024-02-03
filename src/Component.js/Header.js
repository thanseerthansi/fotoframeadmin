import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GiWoodFrame } from 'react-icons/gi';
import { MdFilterFrames,MdOutlineLogout,MdPlace } from 'react-icons/md';
import { AiFillDashboard ,AiOutlineBorder} from 'react-icons/ai';
import { HiColorSwatch } from 'react-icons/hi';
import { ImPriceTags } from 'react-icons/im';
import { RiFileCopy2Fill,RiProductHuntFill } from 'react-icons/ri';
import Scripts from './Scripts';
export default function Header() {
  let navigate = useNavigate();
  useEffect(() => {
    Scripts()
  }, [])
  const logoutfn=()=>{
    window.localStorage.removeItem("fotoframe_token");
    return navigate('/login');
  }
  return (
    <div>
    {/* partial:partials/_sidebar.html */}
<nav className="sidebar">
<div className="sidebar-header ">
 <a href= "/vessel" className="sidebar-brand">
   {/* NNPA<span>UI</span> */}
   <img src="..\assets\images\logo\logo-fotoframe.png" alt="light theme" width={65} height={55} style={{marginLeft: "-9px"}} />
 </a>
 <div className="sidebar-toggler not-active">
   <span />
   <span />
   <span />
 </div>
</div>
<div className="sidebar-body">
 <ul className="nav">
   <li className="nav-item nav-category">Main</li>
   <li className="nav-item">
     <Link to="/" className="nav-link">
       <AiFillDashboard size={25}/>
       <span className="link-title"><b>Dashboard</b></span>
     </Link>
   </li> 
  
   <li className="nav-item not-active">
     <Link to="/orders" className="nav-link">
       {/* <i className="link-icon" data-feather="grid" /> */}
       <RiFileCopy2Fill  size={25}/>
       <span className="link-title "><b>Orders</b></span>
     </Link>
   </li>
   <li className="nav-item not-active">
     <Link to="/product" className="nav-link">
       {/* <i className="link-icon" data-feather="grid" /> */}
       <RiProductHuntFill  size={25}/>
       <span className="link-title "><b>Products</b></span>
     </Link>
   </li>
   <li className="nav-item not-active">
     <Link to="/producttheme" className="nav-link">
       {/* <i className="link-icon" data-feather="grid" /> */}
       <HiColorSwatch  size={25}/>
       <span className="link-title "><b>Product theme</b></span>
     </Link>
   </li>
   {/* <li className="nav-item not-active">
     <Link to="/frametype" className="nav-link">
     
       <MdFilterFrames size={22}/>
       <span className="link-title " style={{paddingLeft:"4px"}}><b>Product Frame type</b></span>
     </Link>
   </li> */}
   <li className="nav-item not-active">
     <Link to="/frame" className="nav-link">
       {/* <i className="link-icon" data-feather="grid" /> */}
       <GiWoodFrame  size={25}/>
       <span className="link-title "><b>Frame</b></span>
     </Link>
   </li>
   <li className="nav-item not-active">
     <Link to="/frameprice" className="nav-link">
       {/* <i className="link-icon" data-feather="grid" /> */}
       <ImPriceTags  size={25}/>
       <span className="link-title "><b>Frame Price</b></span>
     </Link>
   </li>
   
   <li className="nav-item not-active">
     <Link to="/city" className="nav-link">
       {/* <i className="link-icon" data-feather="table" /> */}
       <MdPlace size={22}/>
       <span className="link-title " style={{paddingLeft:"4px"}}><b>City</b></span>
     </Link>
   </li>
   
   
   
 </ul>
</div>
</nav>

{/* partial:partials/_navbar.html */}
<div className="page-wrapper" >
<nav className="navbar">
 <a href= "/vessel" className="sidebar-toggler">
   <i data-feather="menu" />
 </a>
 <div className="navbar-content">
  
   <ul className="navbar-nav">
    
     <li className="nav-item">
     <a style={{cursor:"pointer"}} onClick={()=>logoutfn()} className="nav-link ms-0">
       {/* <i className="me-2 icon-md" data-feather="log-out" /> */}
       <MdOutlineLogout className='me-1 icon-md'/>
       <span style={{}}>Log Out</span>
     </a>
       
     </li>
   </ul>
 </div>
</nav>
</div>
</div>
  )
}
