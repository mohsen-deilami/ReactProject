/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import { Link } from 'react-router-dom'
import './Sidebar.css'
import AuthContext from "../../../Context/authContetxt";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
export default function Sidebar() {
  const authContext =useContext (AuthContext);
  const navigate = useNavigate();
  const logout = ()=>{
    swal({
      title:'You have successfully logged out..!',
      icon:'warning',
      buttons:['No' ,'Yes']
    }).then((result) =>{
      if(result){
        authContext.logout();
        navigate('/') 

      }
    }
   
    )


  }
  return (
    <div id="sidebar" className="col-2">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Link to="/">
            <img className="sidebar-logo__img" src="/images/logo/manida-logo.JPG" alt="Logo" />
          </Link>
        </div>

       
      </div>
      <div className="sidebar-menu">
        <ul>
          <li className="active-menu">
            <Link to="">
              <span>Home </span>
            </Link>
          </li>
          <li>
            <Link to="courses">
              <span>Courses </span>
            </Link>
          </li>
          <li>
            <Link to="session">
              <span>Session </span>
            </Link>
          </li>
          <li>
            <Link to="menus">
              <span> Menue</span>
            </Link>
          </li>
          <li>
            <Link to="articles">
              <span> Articles</span>
            </Link>
          </li>
          <li>
            <Link to="users">
              <span>Users</span>
            </Link>
          </li>
          <li>
            <Link to="discount">
              <span>Discount</span>
            </Link>
          </li>
          <li>
            <Link to="Offs">
              <span>Offs </span>
            </Link>
          </li>
          <li>
            <Link to="comments">
              <span>Comments </span>
            </Link>
          </li>
          <li>
            <Link to="tickets">
              <span>Tickets </span>
            </Link>
          </li>
          <li>
            <Link to="category">
              <span>Categories</span>
            </Link>
          </li>
          <li>
            <Link to="contact">
              <span>Contact</span>
            </Link>
          </li>
          <li onClick={logout}> 
            <a href="#" >
              <span >Logout</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
