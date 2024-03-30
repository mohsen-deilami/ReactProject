/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import AuthContext from "../../../Context/authContetxt";
import swal from "sweetalert";
import { useNavigate , Link} from "react-router-dom";
import { useContext } from "react";

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
    <div className="col-3">
      <div className="sidebar">
        {authContext.userInfos && (
            <span className="sidebar__name">{authContext.userInfos.name}  </span>

        )}
        <ul className="sidebar__list">
          <li className="sidebar__item">
            <Link className="sidebar__link" to='/my-account'>
              Counter
            </Link>
          </li>
          <li className="sidebar__item">
            <Link className="sidebar__link" to='orders'>
              Orders
            </Link>
          </li>
          <li className="sidebar__item">
            <a className="sidebar__link" href="#">
            My wallet
            </a>
          </li>
          <li className="sidebar__item">
            <Link className="sidebar__link"to='editAccount'>
            Account details
            </Link>
          </li>
          <li className="sidebar__item">
            <Link className="sidebar__link" to='buyed'>
            Purchased courses
            </Link>
          </li>
          <li className="sidebar__item">
            <Link className="sidebar__link" to='tickets'>
            Support tickets
            </Link>
          </li>
          <li className="sidebar__item" onClick={logout}>
            <a className="sidebar__link" href="#">
             LogOut
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

