/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import "./SendTickets.css";
import { Link , useNavigate} from "react-router-dom";


export default function SendTicket() {
  const [departments, setDepartments] = useState([]);
  const [departmentsSubs, setDepartmentsSubs] = useState([]);
  const [courses,setCourses]=useState([]);
  const [ticketTypeId,setTicketTypeId]=useState('');

  const[departmentId,setDepartmentId]=useState('');
  const[departmentSubId,setDepartmentSubId]=useState('');
  const[title,setTitle]=useState('');
  const[priority,setPriority]=useState('');
  const[body,setBody]=useState('');
  const[courseId,setCourseId]=useState('');

  const navigate=useNavigate();


  useEffect(() => {
    getUserCourses();
    fetch(`http://localhost:4000/v1/tickets/departments`)
      .then((res) => res.json())
      .then((data) => setDepartments(data));
  }, []);

  const getDepartmentsSub = (departmentID) => {
    fetch(`http://localhost:4000/v1/tickets/departments-subs/${departmentID}`)
      .then((res) => res.json())
      .then((subs) => setDepartmentsSubs(subs));
  };

function getUserCourses (){
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    fetch(`http://localhost:4000/v1/users/courses/`,{
        headers:{
            Authorization :`Bearer ${localStorageData.token}`
        }
    })
    .then(res =>res.json())
    .then(data =>{
        setCourses(data)
    })
}


const sendTicket =(event)=>{
    event.preventDefault();
    const newTicket={
        departmentID: departmentId,
        departmentSubID: departmentSubId,
        title: title,
        priority: priority,
        body: body,
        course: courseId.length ? courseId : undefined
    }

    swal({
        title: "Are you sure for send this Ticket   ?!",
        icon: "warning",
        buttons: ["No", "Yes"],
      }).then(result => {
        
        if (result) {
            fetch('http://localhost:4000/v1/tickets',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    Authorization:`Bearer ${JSON.parse(localStorage.getItem('user')).token}`
                },
                body:JSON.stringify(newTicket)
            }).then(res=>{
              
                if(res.ok){
                    swal({
                      title: "Ticket send successfully  ",
                      icon: "success",
                      buttons: "Ok",
                    })
                }
                res.json()
            }).then(() =>  navigate('/my-account/tickets')  )
                
        }

    
})
}
  return (
    <div className="col-9">
      <div className="ticket">
        <div className="ticket-header">
          <span className="ticket-header__title">Send New Ticket  </span>
          <Link className="ticket-header__link" to={'/my-account/tickets'}>
            All Tickets
          </Link>
        </div>

        <form className="ticket-form" action="#">
          <div className="row">

            <div className="col-6">
              <label className="ticket-form__label">Select the Department:</label>
              <select
                className="ticket-form__select"
                onChange={(event) =>{ 
                    getDepartmentsSub(event.target.value)
                    setDepartmentId(event.target.value)
                
                }}
              >
                <option className="ticket-form__option">
            Please select one 
                </option>
                {departments.map((department) => (
                  <option value={department._id} key={department._id}>{department.title}</option>
                ))}
              </select>
            </div>


            <div className="col-6">
              <label className="ticket-form__label">Select type of ticket</label>
              <select className="ticket-form__select" onChange={event =>{
                setTicketTypeId(event.target.value)
                setDepartmentSubId(event.target.value)
                }}>
                <option className="ticket-form__option">
                Please select one item.
                </option>
                {departmentsSubs.map((sub) => (
                  <option value={sub._id} key={sub._id}>{sub.title}</option>
                ))}
              </select>
            </div>

            <div className="col-6">
              <label className="ticket-form__label">Select Title the Ticket:</label>
              <input className="ticket-form__input" type="text" onChange={event=>setTitle(event.target.value)}/>
            </div>

            <div className="col-6">
              <label className="ticket-form__label"> Select Priority:</label>
              <select className="ticket-form__select" onChange={(event)=>setPriority(event.target.value)}>
                <option className="ticket-form__option">
                Please select one item.
                </option>
                <option value={3}>Low  </option>
                <option value={2}>Medium</option>
                <option value={2}>Heigh</option>
                
              </select>
            </div>
          
        {/*   اگر نوع تیکت ما از پشتیبانی دوره ها باشه این سلکت باکس برای انتخاب دوره ها به کاربر نشان داده خاهد شد */}
         {  
         ticketTypeId === '63b688c5516a30a651e98156' &&
         <div className="col-6">
              <label className="ticket-form__label">Select Course</label>
              <select className="ticket-form__select" onChange={(event)=>setCourseId(event.target.value)}>
                <option className="ticket-form__option">
                Please select one item.
                </option>
                {courses.map((course) => (
                  <option value={course.course._id} key={course.course._id}>{course.course.name}</option>
                ))}
              </select>
            </div>
            }

            <div className="col-12">
              <label className="ticket-form__label">
              Enter the content of the ticket:
              </label>
              <textarea className="ticket-form__textarea" onChange={event=>setBody(event.target.value)}></textarea>
            </div>
            <div className="col-12">
              <div className="ticket-form__file">
                <span className="ticket-form__file-max">
                Maximum size: 6 MB
                </span>
                <span className="ticket-form__file-format">
                Allowed formats: jpg, png.jpeg, rar, zip
                </span>
                <input className="ticket-form__file-input" type="file" />
              </div>
            </div>
            <div className="col-12">
              <button className="ticket-form__btn" onClick={sendTicket}>
                <i className="ticket-form__btn-icon fa fa-paper-plane"></i>
                 {" "}Send Ticket 
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
