import React, { useEffect, useState } from "react";
import './Courses.css'
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";
import { useForm } from "./../../../hooks/useForm";
import Input from "./../../../Components/Form/Input";
import {requiredValidator, minValidator} from "../../../validators/Rules"

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [courseCategory, setCourseCategory] = useState("-1");
  const [categories, setCategories] = useState([]);
  const [courseStatus, setCourseStatus] = useState("start");
  const [courseCover, setCourseCover] = useState({});

  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      shortName: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isValid: false,
      },
      support: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllCourses();


    fetch(`http://localhost:4000/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        setCategories(allCategories);
      });

  }, []);

  function getAllCourses() {
    const localStorageData = localStorage.getItem("user");
    fetch("http://localhost:4000/v1/courses", {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((allCourses) => {
        setCourses(allCourses);
      
      });
  }
  const removeCourse = (courseId) => {                                   /// deletet
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "Are you sure for delete this Course ?!",
      icon: "warning",
      buttons: ["No", "Yes"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/courses/${courseId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
          swal({
            title: "The Course deleted successfully  ",
            icon: "success",
            buttons: "Ok",
          }).then(() => {
            getAllCourses();
          });
        }else{
          swal({
            title: "There was a problem deleting the course.",
            icon: "error",
            buttons: "Ok",
          });
        }
        });
      }
    });
  };
  const selectCategory = (event) => {
    setCourseCategory(event.target.value);
    console.log(event.target.value);
  };

const addNewCourse =(event)=>{                        //add new course
  event.preventDefault();
  const localStorageData = JSON.parse(localStorage.getItem("user"));    
  let formData=new FormData();
   formData.append( 'name',formState.inputs.name.value)
   formData.append( 'description',formState.inputs.description.value)
   formData.append( 'shortName',formState.inputs.shortName.value)
   formData.append( 'categoryID',courseCategory)
   formData.append( 'price',formState.inputs.price.value)
   formData.append( 'support',formState.inputs.support.value)
   formData.append( 'status',courseStatus)
   formData.append( 'cover',courseCover)
  
if(courseCategory === '-1' ){
  swal({
    title: 'Please select your desired category',
    icon: 'warning',
    buttons: 'Ok'
  })
}
else{
  fetch('http://localhost:4000/v1/courses',{
    method:'POST',
    headers:{
"Authorization":`Beare ${localStorageData.token}`
    },
    body:formData
  }).then(res => {
    if(res.ok) {
      swal({
        title: 'New course added successfully.',
        icon: 'success',
        buttons: 'Ok'
      }).then(() => {
        getAllCourses()
      })
    }
    else{
      swal({
        title: 'An error occurred while registering. Please check the data',
        icon: 'warning',
        buttons: 'Ok'
      })
    }
  })
}
}
  return (
    <>
        <div class="container">
     <div class="home-content-edit" id="home-content">
     
          <div class="home-title">
            <span> Add a new course</span>
          </div>
          <form class="form">
            <div class="col-6">
              <div class="name input">
                <label class="input-title"  style={{ display: "block" }}>Course name</label>
                <Input
                  id="name"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[
                    requiredValidator() ,
                     minValidator(5),
                    ] }
                   
                  type="text"
                  placeholder="Please enter the course name..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">Course description</label>
                <Input
                  id="description"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[ requiredValidator() ,minValidator(5)]}
                  type="text"
                  placeholder="Please enter the course description..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="number input">
                <label class="input-title">Course Url</label>
                <Input
                  id="shortName"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[ requiredValidator() ,minValidator(5)]}
                  type="text"
                  isValid="false"
                  placeholder="Please enter the URL of the course..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">Course price</label>
                <Input
                  id="price"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[ requiredValidator() ,minValidator(3)]}
                  type="text"
                  isValid="false"
                  placeholder="Please enter the price of the course..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>
            <div class="col-6">
              <div class="price input">
                <label class="input-title">How to support the course</label>
                <Input
                  id="support"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[ requiredValidator() ,minValidator(5)]}
                  type="text"
                  isValid="false"
                  placeholder="Please enter how to support the course..."
                />
                <span class="error-message text-danger"></span>
              </div>
            </div>

            <div class="col-6">
              <div class="number input category-type">
                <label class="input-title category-title">Course category: </label>
                <select onChange={selectCategory}>
                  <option value={-1}>Please select your desired category</option>
                  {categories.map((category) => (
                    <option value={category._id}>{category.title}</option>
                  ))}
                </select>
                <span class="error-message text-danger"></span>
              </div>
            </div>

            
            <div class="col-6">
              <div class="file">
                <label class="input-title course__category-title">Course photo:</label>
                <input
                  type="file"
                  id="file"
                  accept="image/png, image/jpeg"
                  onChange={(event) => {
                    setCourseCover(event.target.files[0]);
                  }} 
                />
              </div>
            </div>
            <div className="col-6">
              <div className="bottom-form__curses">
                <div className="condition">
                  <label className="input-title">Course status:</label>
                  <div className="radios">
                    <div className="available">
                      <label>
                        <span>Start </span>
                        <input
                          type="radio"
                          value="start"
                          name="condition"
                          checked
                          onInput={(event) =>
                            setCourseStatus(event.target.value)
                          }
                        />
                      </label>
                    </div>

                    <div className="unavailable">
                      <label>
                        <span>Presell </span>
                        <input
                          type="radio"
                          value="presell"
                          name="condition"
                          onInput={(event) =>
                            setCourseStatus(event.target.value)
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
            <div className="col-12">
            <div className="bottom-form">
              <div className="submit-btn">
                <input type="submit" value="Add"  onClick={addNewCourse}/>
              </div>
             
            </div>
          </div>
          </form>
        </div>
      </div>


      <DataTable title="Courses">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Status</th>
              <th>Link</th>
              <th>Teacher</th>
              <th>Category </th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{course.name}</td>
                <td>
                  {course.price === 0 ? "Free" : course.price.toLocaleString()}
                </td>
                <td>
                  {course.isComplete === 0 ? "In Progress" : "Completed "}
                </td>
                <td>{course.shortName}</td>
                <td>{course.creator}</td>
                {course.categoryID !== null ? (
                  <td>{course.categoryID.name}</td>
                ) : (
                  <td>Null</td>
                )}

                <td>
                  <button type="button" class="btn btn-primary edit-btn">
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger delete-btn"
                    onClick={() => removeCourse(course._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}
