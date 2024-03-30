/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from "react";
import "./Category.css";
import Topbar from "../../Components/Topbar/Topbar";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import CourseBox from "../../Components/CourseBox/CourseBox";
import Pagination from "../../Components/Pagination/Pagination";
import { useParams } from "react-router-dom";

export default function Category() {
  const { categoryName } = useParams();
  const [status, setstatus] = useState("default");
  const [statusTitle, setStatusTitle] = useState("Default Sort");
  const [courses, setCourses] = useState([]);
  const [shownItems, setShownItems] = useState([]);
  const [orderedCourses, setOrderedCourses] = useState([]);
  const [searchValue, setsearchvalue] = useState("");
  const [coursesDisplayType, setCoursesDisplayType] = useState("row");

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
      .then((res) => res.json())
      .then((allCourses) => {
        setCourses(allCourses);
        setOrderedCourses(allCourses);
      });
  }, [categoryName]);

  useEffect(() => {
    switch (status) {
      case "free": {
        const freeCourses = courses.filter((course) => course.price === 0);
        setOrderedCourses(freeCourses);
        break;
      }
      case "mony": {
        const notFreeCourses = courses.filter((course) => course.price !== 0);
        setOrderedCourses(notFreeCourses);
        break;
      }
      case "last": {
        setOrderedCourses(courses);
        break;
      }
      case "first": {
        const firstCourses = courses.slice().reverse();
        setOrderedCourses(firstCourses);
        break;
      }

      default: {
        setOrderedCourses(courses);
      }
    }
  }, [status]);

  const statusTitleHandler = (event) => {
    setStatusTitle(event.target.textContent);
  };

  const searchValueChaneHandler = (event) => {
    setsearchvalue(event.target.value);
    const filteredCourses = courses.filter((course) =>
      course.name.includes(event.target.value)
    );
    setOrderedCourses(filteredCourses);
  };
  return (
    <div>
      <Topbar />
      <Navbar />
      <div className="container">
        <div className="courses-content">
          <div className="container">
            <div className="row">
              <div className="courses-top-bar">
                <div className="courses-top-bar__left">
                  <div
                    className={`courses-top-bar__row-btn ${
                      coursesDisplayType === "row"
                        ? "courses-top-bar__icon--active"
                        : ""
                    }`}
                    onClick={() => setCoursesDisplayType("row")}
                  >
                    <i className="fas fa-border-all courses-top-bar__icon"></i>
                  </div>
                  <div
                    className={`courses-top-bar__column-btn ${
                      coursesDisplayType === "column"
                        ? "courses-top-bar__icon--active"
                        : ""
                    }`}
                    onClick={() => setCoursesDisplayType("column")}
                  >
                    <i className="fas fa-align-left courses-top-bar__icon"></i>
                  </div>

                  <div className="courses-top-bar__selection">
                    <span className="courses-top-bar__selection-title">
                      <i className="fas fa-angle-down courses-top-bar__selection-icon"></i>
                      {statusTitle}
                    </span>

                    <ul className="courses-top-bar__selection-list">
                      <li
                        className="courses-top-bar__selection-item courses-top-bar__selection-item--active"
                        onClick={() => {
                          setstatus("default");
                          statusTitleHandler(event);
                        }}
                      >
                        Default sort
                      </li>
                      <li
                        className="courses-top-bar__selection-item"
                        onClick={() => {
                          setstatus("free");
                          statusTitleHandler(event);
                        }}
                      >
                        Sort free courses
                      </li>
                      <li
                        className="courses-top-bar__selection-item"
                        onClick={() => {
                          setstatus("mony");
                          statusTitleHandler(event);
                        }}
                      >
                        Sorting of paid periods
                      </li>
                      <li
                        className="courses-top-bar__selection-item"
                        onClick={() => {
                          setstatus("last");
                          statusTitleHandler(event);
                        }}
                      >
                        Sort by latest
                      </li>
                      <li
                        className="courses-top-bar__selection-item"
                        onClick={() => {
                          setstatus("first");
                          statusTitleHandler(event);
                        }}
                      >
                        Sort by first
                      </li>
                      <li
                        className="courses-top-bar__selection-item"
                        onClick={() => {
                          setstatus("cheap");
                          statusTitleHandler(event);
                        }}
                      >
                        Sort by cheapest
                      </li>
                      <li
                        className="courses-top-bar__selection-item"
                        onClick={() => {
                          setstatus("expensive");
                          statusTitleHandler(event);
                        }}
                      >
                        Sort by most expensive
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="courses-top-bar__right">
                  <form action="#" className="courses-top-bar__form">
                    <input
                      type="text"
                      className="courses-top-bar__input"
                      placeholder="Search Courses..."
                      value={searchValue}
                      onChange={searchValueChaneHandler}
                    />
                    <i className="fas fa-search courses-top-bar__search-icon"></i>
                  </form>
                </div>
              </div>
              {orderedCourses.length === 0 ? (
                <div className="alert alert-danger">
                  {" "}
                  No courses have been registered for this category yet
                </div>
              ) : (
                <>
                  {coursesDisplayType === "row" ? (
                    <>
                      {shownItems.map((course) => (
                        <CourseBox {...course} key={course._id}/>
                      ))}
                    </>
                  ) : (
                    <>
                      {shownItems.map((course) => (
                        <div className="col-12">
                          <div className="course-box">
                            <div className="course__box-header">
                              <div className="course__box-right">
                                <a className="course__box-right-link" href="#">
                                  <img
                                    src={`http://localhost:4000/courses/covers/${course.cover}`}
                                    className="course__box-right-img"
                                  />
                                </a>
                              </div>
                              <div className="course__box-left">
                                <div className="course__box-left-top">
                                  <a href="#" className="course__box-left-link">
                                    {course.name}
                                  </a>
                                </div>
                                <div className="course__box-left-center">
                                  <div className="course__box-left-teacher">
                                    <i className="course__box-right-icon fa fa-chalkboard-teacher"></i>
                                    <span className="course__box-left-name">
                                      {course.creator}
                                    </span>
                                  </div>
                                  <div className="course__box-left-stars">
                                    {Array(course.courseAverageScore)
                                      .fill(0)
                                      .map((item) => (
                                        <img
                                          src="/images/svgs/star_fill.svg"
                                          alt="rating"
                                          className="course-box__star"
                                        />
                                      ))}
                                    {Array(5 - course.courseAverageScore)
                                      .fill(0)
                                      .map((item) => (
                                        <img
                                          src="/images/svgs/star.svg"
                                          alt="rating"
                                          className="course-box__star"
                                        />
                                      ))}
                                  </div>
                                </div>
                                <div className="course__box-left-bottom">
                                  <div className="course__box-left-des">
                                    <p>{course.description}</p>
                                  </div>
                                </div>
                                <div className="course__box-footer">
                                  <div className="course__box-footer-right">
                                    <i className="course__box-footer-icon fa fa-users"></i>
                                    <span className="course__box-footer-count">
                                      {course.registers}
                                    </span>
                                  </div>
                                  <span className="course__box-footer-left">
                                    {course.price === 0
                                      ? "Free"
                                      : course.price.toLocaleString()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}

                  <Pagination
                    items={orderedCourses}
                    itemCount={6}
                    pathname={`/category-info/${categoryName}`}
                    setShownItems={setShownItems}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
