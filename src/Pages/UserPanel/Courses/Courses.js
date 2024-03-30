/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";

import "./Courses.css";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [shownCourses, setShownCourses] = useState([]);
  const [showNCourseState, setShowNCourseState] = useState("all");

  useEffect(() => {
    getAllCourses();
  }, []);

  function getAllCourses() {
    fetch(`http://localhost:4000/v1/users/courses/`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setShownCourses(data);
      });
  }
  const allCourses = (event) => {
    event.preventDefault();
    setShowNCourseState("all");
    getAllCourses();
  };
  const activeCourses = (event) => {
    event.preventDefault();
    setShowNCourseState("free");
    let activeCourse = courses
      .reverse()
      .filter((course) => course.course.price === 0);
    setShownCourses(activeCourse);
  };
  const completedCourses = (event) => {
    event.preventDefault();
    setShowNCourseState("money");
    let completedCourse = courses
      .reverse()
      .filter((course) => course.course.price !== 0);
    setShownCourses(completedCourse);
  };
  return (
    <div className="col-9">
      <div className="courses">
        <div className="courses-header">
          <span className="courses-header__title">All courses</span>
          <ul className="courses-header__list">
            <li className="courses-header__item" onClick={allCourses}>
              <a
                className={`courses-header__link ${
                  showNCourseState === "all"
                    ? "courses-header__link-active"
                    : null
                }`}
                href="#"
              >
                All Courses
              </a>
            </li>
            <li className="courses-header__item" onClick={activeCourses}>
              <a
                className={`courses-header__link ${
                  showNCourseState === "free"
                    ? "courses-header__link-active"
                    : null
                }`}
                href="#"
              >
                Free Courses
              </a>
            </li>
            <li className="courses-header__item" onClick={completedCourses}>
              <a
                className={`courses-header__link ${
                  showNCourseState === "money"
                    ? "courses-header__link-active"
                    : null
                }`}
                href="#"
              >
                Money Courses
              </a>
            </li>
          </ul>
        </div>
        <div className="main">
          <div className="row">
            <div className="col-12">
              {shownCourses.length ? (
                shownCourses.map((course) => (
                  <div className="main__box">
                    <div className="main__box-right">
                      <a href="#" className="main__box-title">
                        {course.course.name}
                      </a>
                      <div className="main__box-bottom">
                        <div className="main__box-all">
                          <span className="main__box-all-text">Status : </span>

                          <span className="main__box-all-value">
                            {" "}
                            {course.course.isComplete === 1
                              ? "Completed"
                              : "On performing"}
                          </span>
                        </div>
                        <div className="main__box-completed">
                          <span className="main__box-completed-text">
                            {" "}
                            Price :{" "}
                          </span>
                          <span className="main__box-completed-value">
                            {course.course.price === 0
                              ? "Free"
                              : course.course.price}{" "}
                            $
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="main__box-left">
                      <a className="main__box-img-link" href="#">
                        <img
                          className="main__box-img img-fluid"
                          src={`http://localhost:4000/courses/covers/${course.course.cover}`}
                        />
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="alert alert-warning">
                  There is no course for this filter
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
