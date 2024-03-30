/* eslint-disable react-hooks/exhaustive-deps */
import React , { useEffect, useState }from 'react'
import './LandingCounter.css'
export default function LandingCounter({count}) {
    const [courseCounter , setCourseCounter]=useState(0)
    useEffect(()=>{
     
        let counter =  setInterval( () => {
            setCourseCounter(prev =>prev +1)
        }, 1); 
        
        if(courseCounter >=count ){
            clearInterval(counter);
        }
        return ()=>  clearInterval(counter);
    },[courseCounter]);
    return (
    <div>
      <span>{courseCounter}</span>
    </div>
  )
}
