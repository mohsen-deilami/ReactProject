/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import AuthContext from "../../Context/authContetxt";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function PAdminPrivate({ children }) {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(()=>{
    authContext.isLogin && (
    authContext.userInfos.role === "ADMIN" ? <>{children}</> :
    <>
    {
     swal({
      title:'You are not authorized to enter this page...!',
      icon:'warning',
      buttons:'OK'
    }).then(value =>{
    navigate('/')
    }) }
    </>
    
    )
    
  },[])
  return(
    authContext.isLogin && (

      authContext.userInfos.role === "ADMIN" ? <>{children}</> : navigate('/')

    )

)
}
