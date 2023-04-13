import React, { createContext, useEffect, useState } from 'react'
import Callaxios from './Callaxios';
export const Simplecontext = createContext();

export default function Simplecontextprovider({children}) {
    const [framedata,setframedata]=useState([])
    useEffect(() => {
      Getframe()
    }, [])
    
    const Getframe =async()=>{
        try {
          let data = await Callaxios("get","frame/frame/")
          if (data.status===200){
            console.log("data.data ",data.data)
            setframedata(data.data)
          }
          console.log("data",data)
        } catch (error) {
          console.log(error)
        }
      } 
  return (
    <Simplecontext.Provider value={{
        framedata
    }}>{children}</Simplecontext.Provider>
  )
}
