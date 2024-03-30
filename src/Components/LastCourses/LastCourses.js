import React, { useEffect, useState } from "react";
import "./LastCourses.css";
import SectionHeader from "../SectionHeader/SectionHeader";
import CourseBox from "../CourseBox/CourseBox";
export default function LastCourses() {
  const [lastCourses,setLastCourses]=useState([])
  useEffect (()=>{
    fetch('http://localhost:4000/v1/courses')
    .then(res =>res.json())
    .then(allCourses => setLastCourses(allCourses))
  },[])
  return (
    <div className="courses">
      <div className="container">
        <SectionHeader
          title={"The latest courses"}
          describe={"Your launch pad to success"}
          btn={"All Courses"}
          btnHref='/courses/1'
        />
      </div>
      <div className="courses-content">
        <div className="container">
          <div className="row">
            {lastCourses.reverse().slice(0 , 6).map((course) =>(

              <CourseBox {...course}/>
            )

            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
