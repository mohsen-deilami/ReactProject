import React, { useEffect, useState } from 'react'
import './PopularCourses.css'
import SectionHeader from '../SectionHeader/SectionHeader'
import CourseBox from "../CourseBox/CourseBox";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
export default function PopularCourses() {
  const [popularCourses,setPopularCourses]=useState([])
  useEffect (()=>{
    fetch('http://localhost:4000/v1/courses/popular')
    .then(res=>res.json())
    .then(popularCourse =>{
     setPopularCourses(popularCourse)
  })
  },[])
 

  return (
    <div className="popular">
    <div className="container">
      <SectionHeader
      title={'PopularCourses'}
      describe={'Popular Courses based on student ratings'}
      />
      <div className="courses-content">
        <div className="container">
          <div className="row">
          <Swiper
                  slidesPerView={4}
                  spaceBetween={30}
                  pagination={{
                    clickable: true,
                  }}
                  loop={true}
                  className="mySwiper"
                >
                  {popularCourses.map((presellCourse) => (
                    <SwiperSlide>
                      <CourseBox {...presellCourse} isSlider={true}/>
                    </SwiperSlide>
                  ))}
                </Swiper>

     
          </div>
          </div>
    </div>
    </div>
    </div>
  )
}
