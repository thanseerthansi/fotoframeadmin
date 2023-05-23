import React, { useContext, useEffect, useState } from 'react'
import { RiFileCopy2Fill ,RiDownload2Line,RiPriceTag3Fill} from 'react-icons/ri';
import { Simplecontext } from './Simplecontext';
import Callaxios from './Callaxios';
export default function Dashboard() {
    const { orderproductdata } = useContext(Simplecontext)
    const [orderdata,setorderdata]=useState([])
    useEffect(() => {
      Getorders()
    }, [])
    
    const Getorders =async()=>{
        try {
          let data  = await Callaxios("get","order/orders/")
        //   console.log("order date",data)
          if (data.status===200){
              setorderdata(data.data)
          }
        } catch (error) {
        //   notifyerror("Something went wrong ")
        }
      }
    return (
        <div className='page-wrapper p-3 mt-5'>
    
    <div className='margin_card'>
            <div className="row">
                <div className="col-md-4">
                    <div className="card mini-stats-wid">
                        <div className="card-body">
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <p className="text-muted fw-medium">Orders</p>
                                    <h4 className="mb-0">{orderproductdata.length}</h4>
                                </div>
                                <div className="flex-shrink-0 align-self-center">
                                    <div className="mini-stat-icon avatar-sm rounded-circle bg-primary" style={{padding:"12px"}}>
                                        <span className="avatar-title">
                                            <RiFileCopy2Fill size={28} fill='white' />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mini-stats-wid">
                        <div className="card-body">
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <p className="text-muted fw-medium">Revenue</p>
                                    <h4 className="mb-0">{orderdata.length?orderdata.reduce((n, {total_price}) => n + parseInt(total_price), 0):null}<span className='aeddash'> AED</span></h4>
                                </div>
                                <div className="flex-shrink-0 align-self-center ">
                                    <div className="avatar-sm rounded-circle bg-primary mini-stat-icon" style={{padding:"12px"}}>
                                        <span className="avatar-title rounded-circle bg-primary">
                                        <RiDownload2Line size={28} fill='white' />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card mini-stats-wid">
                        <div className="card-body">
                            <div className="d-flex">
                                <div className="flex-grow-1">
                                    <p className="text-muted fw-medium">Average Price</p>
                                    <h4 className="mb-0">{orderdata.length?Math.round((parseFloat(orderdata.reduce((n, {total_price}) => n + parseInt(total_price), 0)))/orderproductdata.length):null}<span className='aeddash'> AED</span></h4>
                                </div>
                                <div className="flex-shrink-0 align-self-center">
                                    <div className="avatar-sm rounded-circle bg-primary mini-stat-icon" style={{padding:"12px"}}>
                                        <span className="avatar-title rounded-circle bg-primary">
                                        <RiPriceTag3Fill size={28} fill='white' />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
     </div>
        
    )
}
