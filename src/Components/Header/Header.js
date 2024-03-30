import React, { useEffect, useState } from 'react'
import './Header.css'
import Topbar from '../Topbar/Topbar'
import Navbar from '../Navbar/Navbar'
import Landing from '../Landing/Landing'
export default function Header() {
  const [indexInfos,setIndexfos]=useState({})
  useEffect(()=>{
fetch('http://localhost:4000/v1/infos/index')
.then(res=>res.json())
.then(infos=>{setIndexfos(infos)

})
  },[])
  return (
    <div>
      <Topbar email={indexInfos.email} phone={indexInfos.phone}/>
      <Navbar/>
      <Landing infos={indexInfos}/>
    </div>
  )
}
