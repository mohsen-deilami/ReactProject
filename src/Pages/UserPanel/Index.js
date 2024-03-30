import React, { useContext } from 'react'
import './Index.css'
import { Outlet } from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import Topbar from '../../Components/Topbar/Topbar'
import Sidebar from '../../Components/UserPanel/Sidebar/Sidebar'
import AuthContext from '../../Context/authContetxt'

import './Index.css'

export default function Index() {
    const authContext=useContext(AuthContext);
 
  return (
      <>
        <Topbar />
        <Navbar />

        <section className="content ">
        <div className="content-header">
            <div className="container">
                <span className="content-header__title">My user account  </span>
                <span className="content-header__subtitle">Counter</span>
            </div>
        </div>
        <div className="content-main">
            <div className="container">
                <div className="row">
                    <Sidebar />

                    <Outlet />

                </div>
            </div>
        </div>
    </section>

        <Footer />
      </>
  )
}
