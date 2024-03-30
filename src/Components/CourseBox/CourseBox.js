/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './CourseBox.css'
import CircleSpinner from '../../Components/CircleSpinner/CircleSpinner'

export default function CourseBox(props) {
 
  const [isImgShow, setIsImgShow]=useState(false);
  
  const onImageLoaded =()=>setIsImgShow(true)

  
  return (
    <div className="col-4" style={{width: `${props.isSlider && '100%'}`}}>
    <div className="course-box">
      <Link to={`/course-info/${props.shortName}`}>
        <img 
        src={`http://localhost:4000/courses/covers/${props.cover}`}
        alt="Course img" 
        className="course-box__img" 
        onLoad={onImageLoaded}
        />
        {!isImgShow &&(
          <CircleSpinner/>
        )}
      </Link>
      <div className="course-box__main">
        <Link to={`/course-info/${props.shortName}`} className="course-box__title">{props.name}</Link>

        <div className="course-box__rating-teacher">
          <div className="course-box__teacher">
            <i className="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
            <a href="#" className="course-box__teacher-link"> {props.creator}</a>
          </div>
          <div className="course-box__rating">
         {Array(props.courseAverageScore).fill(0).map(item =>(

            <img src="/images/svgs/star_fill.svg" alt="rating" className="course-box__star" key={item._id}/>
         ))}
         {Array(5-props.courseAverageScore).fill(0).map(item =>(

           <img src="/images/svgs/star.svg" alt="rating" className="course-box__star"/>
           
         ))}
           
          </div>
        </div>

        <div className="course-box__status">
          <div className="course-box__users">
            <i className="fas fa-users course-box__users-icon"></i>
            <span className="course-box__users-text">{props.registers}</span>
          </div>
       
           {props.price ? (
            <>
            {props.discount === 0 ?(
              <span className="course-box__price">{props.price === 0 ? 'Free' : props.price.toLocaleString()}</span>
            ) : (
              <>
            <span className="course-box__price ">
              {props.price === 0 ? 'Free' : 
           ( props.price - ( props.price * props.discount / 100)).toLocaleString()}
            <span className="course-box__price price__discount">{props.price === 0 ? 'Free' : props.price.toLocaleString()}</span>
            </span>
              </>
            )}
            </>
           ):'Free'
           
           }
          
        </div>
      </div>

      <div className="course-box__footer">
        <Link to={`/course-info/${props.shortName}`} className="course-box__footer-link">
        View Information
          <i className="fas fa-arrow-right course-box__footer-icon"></i>
        </Link>
      </div>
      
      {( props.price !== 0 && props.discount) && (
          <span className="courses-box__discount">%{props.discount}</span>
        )}

    </div>
  </div>
  )
}
