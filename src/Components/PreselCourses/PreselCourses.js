import React, { useEffect, useState } from "react";
import "./PreselCourses.css";
import SectionHeader from "../SectionHeader/SectionHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import CourseBox from "../CourseBox/CourseBox";

export default function PreselCourses() {
  const [presellCourses, setPresellCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/v1/courses/presell")
      .then((res) => res.json())
      .then((presellCourses) => {
        setPresellCourses(presellCourses);

      });
  }, []);
  return (
    <div className="presell">
      <div className="container">
        <div className="presell__header">
          <SectionHeader title={"PreselCourses"} />

          <div className="courses-content">
            <div className="container">
              <div className="row">
                <Swiper
                  slidesPerView={3}
                  spaceBetween={30}
                  pagination={{
                    clickable: true,
                  }}
                  loop={true}
                  className="mySwiper"
                >
                {/*   {presellCourses.map((presellCourse) => (
                    <SwiperSlide>
                      <CourseBox {...presellCourse} isSlider={true}/>
                    </SwiperSlide>
                  ))} */}
                  {presellCourses.filter(filterredCourse =>filterredCourse.status === "presell").map((presellCourse) => (
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
    </div>
  );
}
