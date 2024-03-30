import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import Input from "./../../../Components/Form/Input";
import { useForm } from "./../../../hooks/useForm";
import { requiredValidator} from "../../../validators/Rules";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import './Offs.css'
export default function Offs() {
    const [courses,setCourses]=useState();
    const [offs,setOffs]=useState([]);
    const [offCourse,setOffCourse]=useState('-1')
    useEffect(()=>{
        getAllOffs();
        fetch('http://localhost:4000/v1/courses')
        .then(res=>res.json())
        .then(allCourses=>{
            setCourses(allCourses)
        })
    },[])

                                       //////////////////// getAll offs
    function getAllOffs(){
        const localStorageData = JSON.parse(localStorage.getItem("user"));
        fetch('http://localhost:4000/v1/offs',{
            headers:{
                Authorization: `Bearer ${localStorageData.token}`,
            }
        })
        .then(res=>res.json())
        .then(allOffs=>{
            console.log(allOffs);
            setOffs(allOffs)})
    }
    const [formState, onInputHandler] = useForm(
        {
          code: {
            value: "",
            isValid: false,
          },
          precent: {
            value: "",
            isValid: false,
          },
          max: {
            value: "",
            isValid: false,
          },
        },
        false
      );

                                                            ///////////////////    add new Offs
      const addNewOff =(event)=>{
        const localStorageData = JSON.parse(localStorage.getItem("user"));
        event.preventDefault();
       const newOffInfos={
        code: formState.inputs.code.value,
	    percent: formState.inputs.precent.value,
	    course: offCourse,
	    max: formState.inputs.max.value
       }

   if(offCourse === '-1')
   {
    swal({
        title: "Please select a Course",
        icon: "warning",
        buttons: "Ok",
      })
   }else{
    fetch('http://localhost:4000/v1/offs',{
        method:'POSt',
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${localStorageData.token}`
        },
        body:JSON.stringify(newOffInfos)
       })
       .then((res) => {res.json()
        if(res.ok){
          swal({
            title: "Menu has successfully sumited",
            icon: "success",
            buttons: "Ok",
          }).then(() => {
           
            getAllOffs();
          });
        }
      
      })
   }
      }
                                                /////// delete Off
   const deleteOff=(offId)=>{   
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    swal({
        title: "Are you sure for delete this user ?!",
        icon: "warning",
        buttons: ["No", "Yes"],
      }).then(result => {
        
        if (result) {
            fetch(`http://localhost:4000/v1/offs/${offId}`,{
                method:'DELETE',
                headers:{
                    Authorization:`Bearer ${localStorageData.token}`
                },
            }).then(res =>{
                if(res.ok){
                  swal({
                    title: "Off deleted successfully  ",
                    icon: "success",
                    buttons: "Ok",
                  }).then(() => {
                    getAllOffs();
                  });
                }
            })
   
        }
      })
       }
  return (
    <div>
        <div className="container">
      <div className="home-content-edit" id="home-content">
       
          <div className="home-title">
            <span> Add a new Offs</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  Offs title
                </label>
                <Input
                  id="code"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[requiredValidator()]}
                  type="text"
                  placeholder="Please enter the off name..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">Number of Offs</label>
                <Input
                  id="max"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[requiredValidator()]}
                  type="text"
                  placeholder="Please enter the menu href..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="price input">
                <label className="input-title">Precent</label>
                <Input
                  id="precent"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[requiredValidator()]}
                  type="text"
                  placeholder="Please enter the menu href..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>

            <div className="col-6">
              <div className="number input category__input">
                <label className="input-title category-title">Course Name: </label>
                <select onChange={(event)=>setOffCourse(event.target.value)}>
                  <option value={-1}>Please select course</option>
                  {courses && (

                  courses.map(course =>                     
                        <option value={course._id} key={course._id}>{course.name}</option>
                     
                  ))}
                  
                </select>
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="bottom-form">
                <div className="submit-btn">
                  <input
                    type="submit"
                  
                    value="Add"
                    onClick={addNewOff}
                  />
                </div>
              </div>
            </div>
            
          </form>
        </div>
      </div>

      <DataTable title=" Offs">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Off Name</th>
              <th>precent</th>
              <th>Number </th>
              <th>Creator </th>
              <th>uses </th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {offs.length !== 0  ? offs.map((off, index) => (
                  <tr key={off._id}>
                    <td> {index + 1}</td>
                    <td>{off.code}</td>
                    <td>{off.percent}</td>
                    <td>{off.creator}</td>
                    <td> {off.max} </td>
                    <td> {off.uses} </td>

                    <td>
                      <button
                        type="button"
                        className="btn btn-primary edit-btn"
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button      type="button"    className="btn btn-danger delete-btn"   onClick={()=>deleteOff(off._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
      </DataTable>
    </div>
  )
}
