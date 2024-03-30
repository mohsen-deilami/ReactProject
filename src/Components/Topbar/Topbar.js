/* eslint-disable no-unreachable */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState , useEffect, memo } from "react";
import "./Topbar.css";
import { Link } from "react-router-dom";

export default memo( function Topbar() {
  const [indexInfos,setIndexfos]=useState({})
  useEffect(()=>{
fetch('http://localhost:4000/v1/infos/index')
.then(res=>res.json())
.then(infos=>{
  setIndexfos(infos)
})
  },[])
 const [allMenues , setAllMenues] =useState([]);
 const getAllItemFromArray = (arr, randomCaount)=>{
const shuffeld=[...arr].sort(()=>0.5 - Math.random())
return shuffeld.slice(0 , randomCaount)

 }

 useEffect(()=>{
  fetch('http://localhost:4000/v1/menus/topbar')
  .then(res =>res.json())
  .then(data =>{
    
    setAllMenues(data)
  })
 },[])
 
  return (
    <div className="top-bar">
      <div className="container-fluid">
        <div className="top-bar__content">
          <div className="top-bar__left">
           
         
            <ul className="top-bar__menu">
              {getAllItemFromArray(allMenues , 5).map((menu,index) =>(

                
                <li className="top-bar__item" key={index}>
                <Link to={`/course-info/${menu.href}`}  className="top-bar__link">
                  {menu.title}
                </Link>
              </li>
                ))}

            
           
            </ul>
          </div>
          <div className="top-bar__right">
            <div className="top-bar__email">
              <i className="fas fa-envelope top-bar__email-icon"></i>
              <Link to="/p-admin" className="top-bar__email-text top-bar__link">
             {indexInfos.email}
              </Link>
              
            </div>
            <div className="top-bar__phone">
             
              <i className="fa fa-paper-plane top-bar__phone-icon" aria-hidden="true"></i>

             <Link to="#" className="top-bar__phone-text top-bar__link">
              @ {indexInfos.phone}
              </Link>
              
            

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
)