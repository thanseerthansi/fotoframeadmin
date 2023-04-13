// import React, { useEffect } from 'react'

export default function Scripts() {
   
        const script = document.createElement('script');
        script.src = "/assets/js/template.js";
        
        script.async = true;
        document.body.appendChild(script);
      


}
