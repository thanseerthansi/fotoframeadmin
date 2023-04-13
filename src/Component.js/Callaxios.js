import React from 'react'
import { BaseUrl } from './Url'
import axios from 'axios'

export default async function Callaxios(method,url,datalist) {
    let token =localStorage.getItem('fotoframe_token');
    let body = {
        method:method,
        url:BaseUrl+url,
        headers:{"Authorization" : token},
        data: datalist
    }
    try {
        if(method==="get"){
            let data = await axios.get(BaseUrl+url,{params:datalist})
            return data
        }else{
            let data = await  axios(body)
            return data
        }
    
    } catch (error) {
        console.log(error)
        // if (error.message==="Request failed with status code 401"){
        //     console.log("notoken")
        //     window.location.href = '/adminlogin';
        // }
        return null
    } 
}
