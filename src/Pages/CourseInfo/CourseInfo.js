/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "./CourseInfo.css";
import Topbar from "../../Components/Topbar/Topbar";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import CourseDetailBox from "../../Components/CourseDetailBox/CourseDetailBox";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import CommentsTextArea from "../../Components/CommentsTextArea/CommentsTextArea";
import Accordion from "react-bootstrap/Accordion";
import { useParams, Link } from "react-router-dom";
import swal from "sweetalert";

export default function CourseInfo() {
 
  const { courseName } = useParams();
  const [comments, setComments] = useState([]);
  const [session, setSession] = useState([]);
  const [courseTeacher, setCourseTeacher] = useState([]);

  const [courseDetails, setcourseDetails] = useState({});
  const [relatedCourses,setRelatedCourses]=useState([]);

  const fetchData = async () => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    await fetch(`http://localhost:4000/v1/courses/${courseName}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          localStorageData ? localStorageData.token : null
        }`,
      },
    })
      .then((res) => res.json())
      .then((courseInfo) => {

        
        console.log(courseInfo);
        setcourseDetails(courseInfo);
        setComments(courseInfo.comments);
        setSession(courseInfo.sessions);
        setCourseTeacher(courseInfo.creator);

      if(courseInfo.message === 'Course Not Found!'){
          swal({
            title:'This course was deleted',
            icon:'warning',
            buttons:'Ok'
          }).then(()=>{
            window.history.back()
          })
          } 
        
      });
  };

  function relatedCourse(){
    fetch(`http://localhost:4000/v1/courses/related/${courseName}`)
    .then(res=>res.json())
    .then(courses=>{
      console.log('related:',courses)
      if(courseName.length !==0){

        setRelatedCourses(courses)
      }
    })
  }

  useEffect(() => {
    fetchData();
    relatedCourse()
  }, [courseName]);

                                                                       //// submit comment
  const submitComment = (newCommentBody, userScore) => {   
console.log(userScore);
    if(userScore == '-1'){
      swal({
        title:'Please select one Score',
        icon:'warning',
        buttons:'ok'
      })

    }else{

     const localStorageData = JSON.parse(localStorage.getItem("user"));

    fetch(`http://localhost:4000/v1/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageData.token}`,
      },
      body: JSON.stringify({
        body: newCommentBody,
        courseShortName: courseName,
        score: userScore,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        swal({
          title: "The desired comment was registered successfully",
          icon: "success",
          buttons: "OK",
        });
        console.log(result);
      });
    }
  };


  const registerWithoudOffs =(course)=>{    
console.log(course);                                    /////register Withoud Offs
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "Are you sure for register this course ?!",
      icon: "warning",
      buttons: ["No", "Yes"],
    }).then(result => {
      if(result){
        fetch(`http://localhost:4000/v1/courses/${course._id}/register`,{
          method:'POST',
          headers:{
            Authorization:`Bearre ${localStorageData.token}`,
            'Content-Type':'application/json'
          },
          body:JSON.stringify({
            price:courseDetails.price
          })
        }).then(res =>{
          if(res.ok){
            swal({
              title: "You have successfully registered for this course  ",
              icon: "success",
              buttons: "Ok",
            }).then(() => {
              fetchData();
            });
          }  
        })
      
      }
    })
  }
      
                                                                      ///// register In Course
    const registerInCourse=course=>{
                                                                           /////register in free course
      if(courseDetails.price === 0){
       registerWithoudOffs(course) 
      }

     else{
                                                       ///// register in none free course and withoud discount code
        swal({
          title: "Are you sure for register this course ?!",
          icon: "warning",
          buttons: ["No", "Yes"],
        }).then(result =>{

          if(result){
            swal({
              title: "Do you have a discount code??!",
              icon: "warning",
              content:'input',
              buttons: ["NO discount code", "With discount code"],
            }).then(code =>{
             
              if(code === null){
                console.log(courseDetails._id);
                registerWithoudOffs(course)
              
              }

                                                ///// register in non free course with discount

              else{

                 if(code){                                    ////// ابتدا چک میکنه که کد تخفیف معتبره
    
                  
              fetch(`http://localhost:4000/v1/offs/${code}`, {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${
                    JSON.parse(localStorage.getItem("user")).token
                  }`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  course: course._id,
                }),
              })
                .then((res) => {
                 

                  if (res.status === 409 ) {
                    swal({
                      title: "The discount code has already been used  ",
                      icon: "danger",
                      buttons: "Ok",
                    })
                  } else if (res.status === 404) {
                    swal({
                      title: "The discount code is not valid  ",
                      icon: "danger",
                      buttons: "Ok",
                    })
                  } 
                  else {
                    return res.json()
                  }
                  })
                  .then((code) => {
                    if(code){
                    fetch(
                      `http://localhost:4000/v1/courses/${course._id}/register`,
                      {
                        method: "POST",
                        headers: {
                          Authorization: `Bearer ${
                            JSON.parse(localStorage.getItem("user")).token
                          }`,
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          price: courseDetails.price - (courseDetails.price * code.percent / 100)
                        }),
                      }
                    ).then(res=>{
                      if(res.ok){return res.json()}
                      
                      return res.text()})
                      .then(result=>{
                        swal({
                          title: "You have successfully registered for this course  ",
                          icon: "success",
                          buttons: "Ok",
                        }).then(() => {
                          fetchData();
                        });
                    })
                  }
                  }
                )
                      
         
            }
            else{
              swal({
                title: "Enter your valid code to use the discount  ",
                icon: "warning",
                buttons: "Ok",
              })
            }

                ///////////////////////////
              }

            })
    
       }
   })
    }   

                                                                                
   }   

  return (

  

 <div>
    
 <Topbar />
 <Navbar />

 {courseDetails.categoryID ? (
   <Breadcrumb
     links={[
       { id: 1, title: "Home", to: "" },
       {
         id: 2,
         title: `${courseDetails.categoryID.name}`,
         to: `category-info/${courseDetails.categoryID.name}/1`,
       },
       { id: 3, title: `${courseName}`, to: "courseName" },
     ]}
   />
 ) : (
   ""
 )}

 <section className="course-info">
   <div className="container">
     <div className="row">
       <div className="col-6">
         {courseDetails ? (
           <>
             {courseDetails.categoryID ? (
               <Link
                 to={`/category-info/${courseDetails.categoryID.name}/1`}
                 className="course-info__link"
               >
                 {courseDetails.categoryID
                   ? courseDetails.categoryID.title
                   : ""}
               </Link>
             ) : (
               ""
             )}

             <h2 className="course-info-title">{courseDetails.name}</h2>
             <p className="course-info-text">
               {courseDetails.description}
             </p>
             <div className="course-info__socials">
               <a href="" className="course-info__social-media-item">
                 <svg
                   className="svg-inline--fa fa-telegram course-info__icon"
                   aria-hidden="true"
                   focusable="false"
                   data-prefix="fab"
                   data-icon="telegram"
                   role="img"
                   xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 496 512"
                   data-fa-i2svg=""
                 >
                   <path
                     fill="currentColor"
                     d="M248 8C111 8 0 119 0 256S111 504 248 504 496 392.1 496 256 384.1 8 248 8zM362.1 176.7c-3.732 39.22-19.88 134.4-28.1 178.3-3.476 18.58-10.32 24.82-16.95 25.42-14.4 1.326-25.34-9.517-39.29-18.66-21.83-14.31-34.16-23.22-55.35-37.18-24.49-16.14-8.612-25 5.342-39.5 3.652-3.793 67.11-61.51 68.33-66.75 .153-.655 .3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283 .746-104.6 69.14-14.85 10.19-26.89 9.934c-8.855-.191-25.89-5.006-38.55-9.123-15.53-5.048-27.88-7.717-26.8-16.29q.84-6.7 18.45-13.7 108.4-47.25 144.6-62.3c68.87-28.65 83.18-33.62 92.51-33.79 2.052-.034 6.639 .474 9.61 2.885a10.45 10.45 0 0 1 3.53 6.716A43.76 43.76 0 0 1 362.1 176.7z"
                   ></path>
                 </svg>
               </a>
               <a href="" className="course-info__social-media-item">
                 <svg
                   className="svg-inline--fa fa-twitter course-info__icon"
                   aria-hidden="true"
                   focusable="false"
                   data-prefix="fab"
                   data-icon="twitter"
                   role="img"
                   xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 512 512"
                   data-fa-i2svg=""
                 >
                   <path
                     fill="currentColor"
                     d="M459.4 151.7c.325 4.548 .325 9.097 .325 13.65 0 138.7-105.6 298.6-298.6 298.6-59.45 0-114.7-17.22-161.1-47.11 8.447 .974 16.57 1.299 25.34 1.299 49.06 0 94.21-16.57 130.3-44.83-46.13-.975-84.79-31.19-98.11-72.77 6.498 .974 12.99 1.624 19.82 1.624 9.421 0 18.84-1.3 27.61-3.573-48.08-9.747-84.14-51.98-84.14-102.1v-1.299c13.97 7.797 30.21 12.67 47.43 13.32-28.26-18.84-46.78-51.01-46.78-87.39 0-19.49 5.197-37.36 14.29-52.95 51.65 63.67 129.3 105.3 216.4 109.8-1.624-7.797-2.599-15.92-2.599-24.04 0-57.83 46.78-104.9 104.9-104.9 30.21 0 57.5 12.67 76.67 33.14 23.72-4.548 46.46-13.32 66.6-25.34-7.798 24.37-24.37 44.83-46.13 57.83 21.12-2.273 41.58-8.122 60.43-16.24-14.29 20.79-32.16 39.31-52.63 54.25z"
                   ></path>
                 </svg>
               </a>
               <a href="" className="course-info__social-media-item">
                 <svg
                   className="svg-inline--fa fa-facebook-f course-info__icon"
                   aria-hidden="true"
                   focusable="false"
                   data-prefix="fab"
                   data-icon="facebook-f"
                   role="img"
                   xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 320 512"
                   data-fa-i2svg=""
                 >
                   <path
                     fill="currentColor"
                     d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"
                   ></path>
                 </svg>
               </a>
             </div>
           </>
         ) : (
           ""
         )}
       </div>
       <div className="col-6">
         <video
           src="" 
           poster={`http://localhost:4000/courses/covers/${courseDetails.cover}`}
           className="course-info-video"
           controls
         />
       </div>
     </div>
   </div>
 </section>

 <main className="main">
   <div className="container">
     <div className="row">
       <div className="col-8">
                                                   {/* CourseDetailBox */}
         <div className="course">
           <div className="course-boxes">
             <div className="row">
               <CourseDetailBox    icon="graduation-cap"   title={"Course status:"}      
               text={ courseDetails.isComplete === 1
                     ? "finished"
                     : "in progress  "
                 }
               />

               <CourseDetailBox
                 title={"last update:"}
                 text={
                   courseDetails.updatedAt
                     ? courseDetails.updatedAt.slice(0, 10)
                     : courseDetails.updatedAt
                 }
                 icon={"fas fa-calendar-alt "}
               />
               <CourseDetailBox
                 title={"Support method :"}
                 text={courseDetails.support}
                 icon={"fas fa-user-alt "}
               />
             </div>
           </div>
         </div>
         {/* progress */}
         <div className="course-progress">
           <div className="course-progress__header">
             <i className="fas fa-chart-line course-progress__icon"></i>
             <span className="course-progress__title">
               Course progress percentage: 100%
             </span>
           </div>
           <div className="progress course-progress__bar">
             <div
               className="progress-bar progress-bar-striped progress-bar-animated"
               role="progressbar"
               aria-label="Animated striped example"
               aria-valuenow="75"
               aria-valuemin="0"
               aria-valuemax="100"
               style={{ width: "75%" }}
             ></div>
           </div>
         </div>

         {/* introduction */}
         <div className="introduction">
           <div className="introduction__item">
             <SectionHeader
               title={
                 "Training of 20 JavaScript libraries for the job market"
               }
             />
             <img
               src="/images/info/1.gif"
               alt="course info image"
               className="introduction__img img-fluid"
             />
             <p className="introduction__text">
               There are many libraries for the JavaScript language, and
               several new libraries are added to this list every year,
               which are heavily used in the job market, and if you enter
               the job market without knowing these libraries, you will be
               very annoyed. and you may even be disappointed!
             </p>
             <p className="introduction__text">
               In this course, you will be taught how to work with 20 of
               the most used JavaScript libraries in a project-oriented
               manner so that you will not have any problems entering the
               job market.
             </p>

             <SectionHeader
               title={
                 "What is the purpose of this course? (the only way to enter the job market and earn money)"
               }
             />
             <img
               src="/images/info/2.jpg"
               alt="course info image"
               className="introduction__img img-fluid"
             />
             <p className="introduction__text">
               When I first entered one of the programming companies,
               libraries called Lodash and Formik were used, while I had
               heard the name Formik for the first time and had not used
               these libraries until then.{" "}
             </p>
             <p className="introduction__text">
               It was here that I realized that JavaScript libraries are
               one of the most important topics that every web programmer
               must have worked with in order to enter the job market and
               earn better, more comfortable and more money.{" "}
             </p>
             <p className="introduction__text">
               As it is clear from the name of this course, the purpose of
               this course is to teach 20 of the most practical and widely
               used JavaScript libraries so that you can continue the path
               of web programming with more strength and preparation after
               this course. Learn React or Node or... more easily and
               finally enter the job market and earn money.{" "}
             </p>
             <p className="introduction__text">
               As a web developer, at least if you haven't worked with a
               particular library, you should know how to learn a new
               library. Suppose a new library is created. Do you have to
               wait for the training course?! Definitely not.{" "}
             </p>
             <p className="introduction__text">
               In this course, in addition to the direct training of each
               library, we also tried to teach you how to learn a new
               library, so that after completing the course, you are no
               longer dependent on any particular course or person, and if
               a new library is added to the JavaScript and web world. You
               can easily learn it.{" "}
             </p>
           </div>

           <div className="introduction__btns">
             <a href="#" className="introduction__btns-item">
               Public download of videos{" "}
             </a>
             <a href="#" className="introduction__btns-item">
               Public download of attachments
             </a>
           </div>
         </div>

         {/*  introduction__topic   Accordion*/}
         {session ? (
           <Accordion defaultActiveKey="">
             <Accordion.Item eventKey="0" className="accordion">
               <Accordion.Header>Course introduction</Accordion.Header>

               {session.map((session, index) => (
                 <Accordion.Body key={session._id}>
                   {session.free === 1 ||
                   courseDetails.isUserRegisteredToThisCourse ? (
                     <div className="accordion-body introduction__accordion-body">
                       <div className="introduction__accordion-right">
                         <span className="introduction__accordion-count">
                           {index + 1}
                         </span>
                         <i className="fab fa-youtube introduction__accordion-icon"></i>
                         <Link
                           to={`/${courseName}/${session._id}`}
                           className="introduction__accordion-link"
                         >
                           {session.title}
                         </Link>
                       </div>

                       <div className="introduction__accordion-left">
                         <span className="introduction__accordion-time">
                           <span>{Math.floor(session.time / 60)}:</span>
                           <span>{session.time % 60}</span>
                         </span>
                       </div>
                     </div>
                   ) : (
                     <div className="accordion-body introduction__accordion-body">
                       <div className="introduction__accordion-right">
                         <span className="introduction__accordion-count">
                           {index + 1}
                         </span>
                         <i className="fab fa-youtube introduction__accordion-icon"></i>
                         <span
                           href="#"
                           className="introduction__accordion-link"
                         >
                           {session.title}
                         </span>
                       </div>

                       <div className="introduction__accordion-left">
                         <span className="introduction__accordion-time">
                           <span>{Math.floor(session.time / 60)}:</span>
                           <span>{session.time % 60}</span>
                         </span>
                         <i className="fa fa-lock"></i>
                       </div>
                     </div>
                   )}
                 </Accordion.Body>
               ))}
             </Accordion.Item>
           </Accordion>
         ) : null}

         {/*  techer-details */}
         {courseTeacher ? (
           <div className="techer-details">
             <div className="techer-details__header">
               <div className="techer-details__header-right">
                 <img
                   src={courseTeacher.profile}
                   alt="Teacher Profile"
                   className="techer-details__header-img"
                 />
                 <div className="techer-details__header-titles">
                   <a href="#" className="techer-details__header-link">
                     {courseTeacher.name}
                   </a>
                   <span className="techer-details__header-skill">
                     Front End & Back End Developer
                   </span>
                 </div>
               </div>
               <div className="techer-details__header-left">
                 <i className="fas fa-chalkboard-teacher techer-details__header-icon"></i>
                 <span className="techer-details__header-name">
                   Teacher
                 </span>
               </div>
             </div>
             <p className="techer-details__footer">
               First of all, I started Android programming and worked with
               Android Java language for nearly 2 years. Then I decided to
               work in the web field. And..{" "}
             </p>
           </div>
         ) : null}

         <CommentsTextArea
           comments={comments}
           submitComment={submitComment}
         />
       </div>

       <div className="col-4">
         <div className="courses-info">
           <div className="course-info">
             <div className="course-info__register">
               {courseDetails.isUserRegisteredToThisCourse ? (
                 <span className="course-info__register-title">
                   <i className="fas fa-graduation-cap course-info__register-icon"></i>
                   You are a course student
                 </span>
               ) : (
                 <span className="course-info__register-title">
                   <i className="fas fa fa-registered course-info__register-icon"></i>
                   <button className="course-info__register-btn" onClick={()=>registerInCourse(courseDetails)}> 
                   Register in this Course </button>
                 </span>
               )}
             </div>
           </div>
           <div className="course-info">
             <div className="course-info__total">
               <div className="course-info__top">
                 <div className="course-info__total-sale">
                   <i className="fas fa-user-graduate course-info__total-sale-icon"></i>
                   <span className="course-info__total-sale-text">
                     Number of students:
                   </span>
                   <span className="course-info__total-sale-number">
                     {courseDetails.courseStudentsCount}
                   </span>
                 </div>
               </div>
               <div className="course-info__bottom">
                 <div className="course-info__total-comment">
                   <i className="far fa-comments course-info__total-comment-icon"></i>
                   <span className="course-info__total-comment-text">
                     67 Point of view
                   </span>
                 </div>
                 <div className="course-info__total-view">
                   <i className="far fa-eye course-info__total-view-icon"></i>
                   <span className="course-info__total-view-text">
                     14,234 Visit
                   </span>
                 </div>
               </div>
             </div>
           </div>
           <div className="course-info">
             <div className="course-info__header-short-url">
               <i className="fas fa-link course-info__short-url-icon"></i>
               <span className="course-info__short-url-text">
                 Short link
               </span>
             </div>
             <span className="course-info__short-url">
               https://sabzlearn.ir/?p=117472
             </span>
           </div>
           <div className="course-info">
             <span className="course-info__topic-title">
               Course headings
             </span>
             <span className="course-info__topic-text">
               To view or download the course on the word
               <a
                 href="#"
                 style={{
                   color: "blue",
                   fontWeight: "bold",
                   margin: "0 .5rem",
                 }}
               >
                 Link
               </a>
               Clicken Sie
             </span>
           </div>
           <div className="course-info">
             <span className="course-info__courses-title">
               Related courses
             </span>
             <ul className="course-info__courses-list">

                   {relatedCourses.length  && (

                       relatedCourses.map(course =>(
                       
                       <li className="course-info__courses-list-item">
                 <Link to={`/course-info/${course.shortName}`} className="course-info__courses-link">
                   <img
                    src={`http://localhost:4000/courses/covers/${course.cover}`}
                     alt="Course Cover"
                     className="course-info__courses-img"
                     />
                   <span className="course-info__courses-text">
                     {course.name}
                   </span>
                 </Link>
               </li>
                     ))
                     )
                   }
             
             </ul>
           </div>
         </div>
       </div>
     </div>
   </div>
 </main>
 <Footer />
</div>
 
  
  );
}
