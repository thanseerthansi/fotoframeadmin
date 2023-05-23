import React, { useEffect } from 'react'
import Header from './Header'
import { Outlet, useNavigate } from 'react-router-dom'
import Scripts from './Scripts';

export default function Home() {
  let navigate = useNavigate();
  useEffect(() => {
    checkauth()
    Scripts( )
  }, [])
  const checkauth=()=>{
    let token  = window.localStorage.getItem("fotoframe_token")
    // console.log("token",token)
    if(!token){
      return navigate('/login');
    }
  }
  return (
    <div>
        <Header/>
        <div className='main-wrapper'>
        <Outlet />
        </div>
    </div>
  )
}
