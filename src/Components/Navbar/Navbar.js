/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from "react";
import "./Navbar.css";
import { Link , useNavigate} from "react-router-dom";
import AuthContext from "../../Context/authContetxt";


export default function Navbar() {
  const authContext = useContext(AuthContext);
  const [allMenus, setAllMenus] = useState([]);
const navigate=useNavigate()
  useEffect(() => {
    fetch("http://localhost:4000/v1/menus")
      .then((res) => res.json())
      .then((menus) => {
        setAllMenus(menus);
      
       
      });
  }, []);
  return (
    <div className="main-header">
      <div className="container-fluid">
        <div className="main-header__content">
          <div className="main-header__left" >
            <img
              src="/images/logo/manida-logo.JPG"
              className="main-header__logo"
              alt="Logo "
              onClick={()=>navigate('/')}
            />

            <ul className="main-header__menu">
              <li className="main-header__item">
                <Link to="/" className="main-header__link">
                  Home{" "}
                </Link>
              </li>

              {allMenus.map((menu) => (
                <li className="main-header__item" key={menu._id}>
                  <Link to={`/category-info/${menu.href}/1`} className="main-header__link"> 
                  {menu.title} {menu.submenus.length !== 0 && (
                      <>
                        <i className="fas fa-angle-down main-header__link-icon"></i>
                        <ul className="main-header__dropdown">
                          {menu.submenus.map((submenu) => (
                            <>
                     
                            <li className="main-header__dropdown-item" onClick={()=>console.log(submenu.href)} key={menu._id}>
                            
                              <Link  to={`/course-info/${submenu.href}`}   className="main-header__dropdown-link" > {submenu.title } </Link>
                            </li>
                            </>
                          ))}
                        </ul>
                      </>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="main-header__right">
            <a href="#" className="main-header__search-btn">
              <i className="fas fa-search main-header__search-icon"></i>
            </a>
            <a href="#" className="main-header__cart-btn">
              <i className="fas fa-shopping-cart main-header__cart-icon"></i>
            </a>
            {authContext.isLogin ? (
              <Link to="/my-account" className="main-header__profile">
                <span className="main-header__profile-text">
                  {authContext.userInfos.name}{" "}
                </span>
              </Link>
            ) : (
              <Link to="/login" className="main-header__profile">
                <span className="main-header__profile-text">
                  {" "}
                  Login \ Register{" "}
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
