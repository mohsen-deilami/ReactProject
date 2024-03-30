/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "./Topbar.css";

export default function Topbar() {
  const [adminInfo, setAdminInfo] = useState([]);
  const [adminNotifications, setAdminNotifications] = useState([]);
  const [isShowModalBox, setIsShowModalBox] = useState(false);


  useEffect(() => {
    fetch(`http://localhost:4000/v1/auth/me`, {
      method: "GET",
      headers: {
        authorization: `Beare ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((adminiInfo) => {
        setAdminInfo(adminiInfo);
        setAdminNotifications(adminiInfo.notifications);


      });
  }, []);

  // این فاکشن میره اون نوتیفیکیشنی رو که روش کلیک شده رو یه مقداری بهش میده که دیگه برای کاربر نشون نده
  const seeNotification = (notificationId) => {
    console.log(notificationId);
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    fetch(`http://localhost:4000/v1/notifications/see/${notificationId}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((allnotification) => {
        console.log(allnotification);
      });
  };
 
  return (
    <div className="container-fluid">
      <div className="container">
        <div
          className={`home-header ${
            isShowModalBox && "active-modal-notfication"
          }`}
        >
           <div className="home-left">
           
            <div className="home-searchbar">
              <input
                type="text"
                className="search-bar"
                placeholder="search..."
              />
            </div>
            <div className="home-notification">
              <button type="button" onMouseMove={() => setIsShowModalBox(true)}>
                <i className="far fa-bell"></i>
              </button>
            </div>
            <div
              className="home-notification-modal"
              onMouseLeave={() => setIsShowModalBox(false)}
            >
              <ul className="home-notification-modal-list">
                {adminNotifications.length !== 0 ? (
                  adminNotifications.map((notification) => (
                    <>
                   

                      <li className="home-notification-modal-item">
                        <span className="home-notification-modal-text">
                          {notification.msg}
                        </span>
                        <label className="switch">
                          <a      href="javascript:void(0)"  className="notification__see"  onClick={() => seeNotification(notification._id)} >  Saw  </a>
                        </label>
                      </li>
                    </>
                  ))
                ) : (
                  <li className="home-notification-modal-item">
                    <div className=" home-notification-modal-text">There is no notification....</div>
                   
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="home-right">
            <div className="home-profile">
            <div className="home-profile-image">
                <a href="#">
                  <img
                    className=" home-profile-image img"
                    src={adminInfo.profile}
                    alt=""
                  />
                </a>
              </div>
              <div className="home-profile-name">
                <a href="#">{adminInfo.name}</a>
              </div>
             


              <div className="home-profile-icon">
                <i className="fas fa-angle-down" ></i>
                
              </div>
            </div>
          </div>

         
        </div>
      </div>
    </div>
  );
}
