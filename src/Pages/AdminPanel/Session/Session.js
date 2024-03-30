import React, { useEffect, useState } from "react";
import { useForm } from "./../../../hooks/useForm";
import Input from "./../../../Components/Form/Input";
import { requiredValidator, minValidator } from "../../../validators/Rules";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import "./Session.css";
import swal from "sweetalert";
export default function Sessions() {
  const [courses, setCourses] = useState([]);
  const [sessionCourse, setSessionCourse] = useState("-1");
  const [sessionVideo, setSessionVideo] = useState({});
  const [allSession, setAllSession] = useState([]);
  const [freeSession ,setFreeSession]=useState("1")
  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      time: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    fetch("http://localhost:4000/v1/courses")
      .then((res) => res.json())
      .then((allCourses) => {
        setCourses(allCourses);
      });
      getAllSession();
    }, []);
    
    async function getAllSession() {
      const response = await fetch("http://localhost:4000/v1/courses/sessions");
      const data = await response.json();
      setAllSession(data);
     
  
  }

  const addNewsession = (event) => {                                       /// add new session
    event.preventDefault();

    const localStorageData = JSON.parse(localStorage.getItem("user"));
    let formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    formData.append("time", formState.inputs.time.value);
    formData.append("video", sessionVideo);
    formData.append("free", freeSession);

    if (sessionCourse === "-1") {
      swal({
        title: "Please select your desired category",
        icon: "warning",
        buttons: "Ok",
      });
    } else {
      fetch(`http://localhost:4000/v1/courses/${sessionCourse}/sessions`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
        },
        body: formData,
      }).then((res) => {
        if (res.ok) {
          swal({
            title: "New Article added successfully.",
            icon: "success",
            buttons: "Ok",
          })
          getAllSession();
         
        } else {
          swal({
            title: "An error occurred while registering. Please check the data",
            icon: "warning",
            buttons: "Ok",
          });
        }
      });
    }
  };
                                                       ///// delete session
                                                       
const deleteSession = (sessionId)=>{
  const localStorageData = JSON.parse(localStorage.getItem("user"));
  console.log(localStorageData);
  swal({
    title: "Are you sure for delete this session ?!",
    icon: "warning",
    buttons: ["No", "Yes"],
  }).then(result => {
   
   
    if (result) {
      fetch(`http://localhost:4000/v1/courses/sessions/${sessionId}`,{
        method:'DELETE',
        headers :{
          "Authorization" : `Beare ${localStorageData.token}`
            }
      }).then(res =>{
        if(res.ok) {  
          swal({
            title: "Session deleted successfully  ",
            icon: "success",
            buttons: "Ok",
          }).then(() => {
            getAllSession();
          }) ;
        }
      })
       }
  })
}
  return (
    <>
        <div className="container">
      <div className="home-content-edit" id="home-content">
        
          <div className="home-title">
            <span> Add a new Session</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  Session name
                </label>
                <Input
                  id="title"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[requiredValidator(), minValidator(5)]}
                  type="text"
                  placeholder="Please enter the session name..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">Session duration</label>
                <Input
                  id="time"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[requiredValidator(), minValidator(3)]}
                  type="text"
                  placeholder="Please enter the Session duration..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>

            <div className="col-6">
              <div className="number input ">
                <label className="input-title session__category-title">
                  Course category:{" "}
                </label>
                <select
                  onChange={(event) => setSessionCourse(event.target.value)}
                >
                  <option value={-1}>
                    Please select your desired category
                  </option>
                  {courses &&
                    courses.map((course) => (
                      <option value={course._id}>{course.name}</option>
                    ))}
                </select>
                <span className="error-message text-danger"></span>
              </div>
            </div>

            <div className="col-6">
              <div className="number input category-type">
                <label className="input-title ">Video File </label>
                <input
                  type="file"
                  onChange={(event) => {
                    setSessionVideo(event.target.files[0]);
                  }}
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>

            <div className="col-6">
              <div className="bottom-form__curses">
                <div className="condition">
                  <label className="input-title">Free status:</label>
                  <div className="radios">
                    <div className="available">
                      <label>
                        <span>Free </span>
                        <input
                          type="radio"
                          value="1"
                          name="condition"
                          checked
                          onInputHandler={(event) =>{
                           
                            setFreeSession(event.target.value)}
                          }
                        />
                      </label>
                    </div>

                    <div className="unavailable">
                      <label>
                        <span>Non-free </span>
                        <input
                          type="radio"
                          value='0'
                          name="condition"
                          onInputHandler={(event) =>{
                          
                            setFreeSession(event.target.value)}
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
                  <input
                    type="submit"
                    accept="video/*"
                    value="Add"
                    onClick={addNewsession}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <DataTable title="Session">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Title</th>
              <th>Cousre Name</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>

            {allSession.map((session, index) => (
              <tr>
                <td>{index + 1}</td>
                <td>{session.title}</td>
                <td>{session.time}</td>
               { session.course !== null ? (<td>{session.course.name}</td>) : (<td>Null</td>)}

                     <td>
                  <button type="button" className="btn btn-primary edit-btn">
                    Edit
                  </button>
                </td>
                <td>
                  <button type="button" className="btn btn-danger delete-btn" onClick={()=>deleteSession(session._id)}>
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
