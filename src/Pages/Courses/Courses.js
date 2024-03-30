import React, { useEffect, useState } from "react";
import "./Courses.css";
import Topbar from "../../Components/Topbar/Topbar";
import Navbar from "../../Components/Navbar/Navbar";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import Footer from "../../Components/Footer/Footer";
import CourseBox from "../../Components/CourseBox/CourseBox";
import Pagination from "../../Components/Pagination/Pagination";


export default function Courses() {
  const [allCourses ,setAllCourses]=useState([]);
  const [shownItems,setShownItems]=useState([])
  

  useEffect(()=>{
    fetch('http://localhost:4000/v1/courses')
    .then(res=>res.json())
    .then(courseData =>setAllCourses(courseData)
    )
  },[])

  return (
    <div>
      <Topbar />
      <Navbar />
      <Breadcrumb
        links={[
          { id: 1, title: "Home", to: "" },
          {
            id: 2,
            title: "All Courses ",
            to: "courses",
          },
        ]}
      />
      {/* <!--------------------------------  Courses-Section  --------------------------------> */}
      <section className="courses">
        <div className="container">
          <div className="courses-content">
            <div className="container">
              <div className="row">
                {shownItems.map(course =>(
                  <CourseBox {...course}/>

                ))}
              
              </div>
            </div>
          </div>
          <Pagination items={allCourses} itemCount={3} pathname="/courses" setShownItems={setShownItems}/>
        </div>
      </section>
      {/* <!--------------------------------  Courses-Section  --------------------------------> */}
      <Footer />
    </div>
  );
}
