import React, { createContext, useEffect, useState } from 'react'
import Callaxios from './Callaxios';
export const Simplecontext = createContext();

export default function Simplecontextprovider({children}) {
    const [framedata,setframedata]=useState([])
    const [orderproductdata,setorderproductdata]=useState([])
    useEffect(() => {
      Getframe()
      Getorderproduct()
    }, [])
    
    const Getframe =async()=>{
        try {
          let data = await Callaxios("get","frame/frame/")
          if (data.status===200){
            // console.log("data.data ",data.data)
            setframedata(data.data)
          }
          // console.log("data",data)
        } catch (error) {
          console.log(error)
        }
      } 
    const Getorderproduct=async()=>{
        try {
          let data = await Callaxios("get","order/orderproduct")
          // console.log("dataorderproduct",data)
          if (data.status===200){
            setorderproductdata(data.data)
          }
        } catch (error) {
          
        }
    }
     
  return (
    <Simplecontext.Provider value={{
        framedata,Getframe,Getorderproduct,orderproductdata
    }}>{children}</Simplecontext.Provider>
  )
}
