/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./Session.css";
import { useParams, Link } from "react-router-dom";
import Topbar from "../../Components/Topbar/Topbar";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
export default function Session() {
  const { courseName, sessionID } = useParams();
  const [session, setSession] = useState({});
  const [sessions, setSessions] = useState([]);
  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    fetch(`http://localhost:4000/v1/courses/${courseName}/${sessionID}`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSession(data.session);
        setSessions(data.sessions);
        console.log(data);
      });
  }, []);
  return (
    <div>
      <Topbar />
      <Navbar />
{
   session ? (
    <section className="content">
    <div className="col-4">
      <div className="sidebar">
        <div className="sidebar__header">
          <i className="sidebar__haeder-icon fa fa-book-open"></i>
          <a className="sidebar__header-link" href="#">
            Course List
          </a>
        </div>
        <div className="sidebar-topics">
          <div className="sidebar-topics__item">
            <ul className="sidebar-topics__list">
              {sessions &&
                sessions.map((session) => (
                  <Link to={`/${courseName}/${session._id}`}>
                    <li className="sidebar-topics__list-item">
                      <div className="sidebar-topics__list-left">
                        <span className="sidebar-topics__list-item-time">
                          {session.title}
                        </span>
                      </div>
                      <div className="sidebar-topics__list-right">
                        <a
                          className="sidebar-topics__list-item-link"
                          href="#"
                        ></a>
                        <span>{Math.floor(session.time / 60)}:</span>
                        <span>{session.time % 60}</span>

                        <i className="sidebar-topics__list-item-icon fa fa-play-circle"></i>
                      </div>
                    </li>
                  </Link>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="col-8">
      <div className="episode">
        <div className="episode-haeder">
          <div className="episode-header__right">
            <a className="episode-header__right-back-link" href="#">
              <i className="episode-header__right-home-icon fa fa-home"></i>
              <div className="episode-header__right-home">
                <Link
                  className="episode-header__right-home-link"
                  to={`/course-info/${courseName}`}
                >
                  Go to home course
                </Link>
                <i className="episode-header__right-back-icon fa fa-angle-right"></i>
              </div>
            </a>
          </div>
          <div className="episode-header__left">
            <span className="episode-header__left-text">{courseName}</span>
            <i className="episode-header__left-icon fa fa-play-circle"></i>
          </div>
        </div>
        <div className="episode-content">
       
            <video
              className="episode-content__video"
              controls
              src={` ${Session} && (http://localhost:4000/courses/covers/${session.video} )`}
            ></video>
      

          <a className="episode-content__video-link" href="#">
            Download Video
          </a>
          <div className="episode-content__bottom">
            <a className="episode-content__backward" href="#">
              <i className="episode-content__backward-icon fa fa-arrow-left"></i>
              Previous
            </a>
            <a className="episode-content__forward" href="#">
              Next
              <i className="episode-content__backward-icon fa fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
   ) : (
<div className="container alert alert-warning"> This root does not exist </div>
   )
}
     
      <Footer />
    </div>
  );
}
