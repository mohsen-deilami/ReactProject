import React, { useEffect, useState } from 'react'
import './Comments.css'
import DataTable from '../../../Components/AdminPanel/DataTable/DataTable'
import swal from "sweetalert";
export default function Comments() {
    const [comments,setComments]=useState([]);

    useEffect(()=>{
getAllComments()
    },[])

    function getAllComments (){
fetch('http://localhost:4000/v1/comments')
.then(res =>res.json())
.then(allComents=>{
  
 console.log(allComents); 
  setComments(allComents)
}
  )
}


const showCommenttBody =(body)=>{
 swal({
  title:body,
  icon:'warning',
  buttons:'Ok'
 })
}
                                       //// delete comment
 const deleteComment =(comentId)=>{
  const localStorageData = JSON.parse(localStorage.getItem("user"));
  swal({
    title: "Are you sure for delete this Comment ?!",
    icon: "warning",
    buttons: ["No", "Yes"],
  }).then((result) => {
    if (result) {
      fetch(`http://localhost:4000/v1/comments/${comentId}`,{
        method:'DELETE',
        headers :{
        
          Authorization: `Beare ${localStorageData.token}`,
        }
      }).then(res =>{
        if(res.ok){
          swal({
            title: "User deleted successfully  ",
            icon: "success",
            buttons: "Ok",
          }).then(() => {
            getAllComments();
          });
        }
      })
    }
  })
 
 }
 ////////////////                                            ban user
  
 const banUser=(userId)=>{
  const localStorageData = JSON.parse(localStorage.getItem("user"));
  swal({
    title: "Are you sure for delete this Comment ?!",
    icon: "warning",
    buttons: ["No", "Yes"],
  }).then((result) => {
    if (result) {
      fetch(`http://localhost:4000/v1/users/ban/${userId}`,{
        method:'PUT',
        headers:{
          Authorization:`Bearer ${localStorageData.token}`
        }
    }).then(res =>{
      if(res.ok){
        swal({
          title: "User baned successfully  ",
          icon: "success",
          buttons: "Ok",
        }).then(() => {
          getAllComments();
        });
      }
    })

    }})
 }


                                            ////////////// answer
      const answerComment= (commentId)=>{
        const localStorageData = JSON.parse(localStorage.getItem("user"));
        swal({
          title:'enter your answer',
          icon:'success',
          buttons:'ok',
          content: "input",
        })
        .then((answerText) => {
          console.log(answerText);
          if (answerText) {
            const answerBody={
              body:answerText
            }
            fetch(`http://localhost:4000/v1/comments/answer/${commentId}`,{
              method:'POST',
              headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${localStorageData.token}`
              },
              body:JSON.stringify(answerBody)
            }).then(res=>{
              if(res.ok){return res.json()}
              return res.text()})
              .then(res=>{
                console.log(res);
    getAllComments();
              })
          }
        })

        }
                                            ////////////// reject
      const rejectComment= (commentId)=>{
        const localStorageData = JSON.parse(localStorage.getItem("user"));
        swal({
          title: "Are you sure for Reject this Comment ?!",
          icon: "warning",
          buttons: ["No", "Yes"],
        })
        .then((result) => {
         
          if (result) {
          
            fetch(`http://localhost:4000/v1/comments/reject/${commentId}`,{
              method:'PUT',
              headers:{
              
                Authorization:`Bearer ${localStorageData.token}`
              },
             
            }).then(res =>{
              if(res.ok){
                swal({
                  title: "User deleted successfully  ",
                  icon: "success",
                  buttons: "Ok",
                }).then(() => {
                  getAllComments();
                });
              }
            })
          }
        })

        }
                                            ////////////// accept
      const acceptComment= (commentId)=>{
        const localStorageData = JSON.parse(localStorage.getItem("user"));
        swal({
          title: "Are you sure for Accept this Comment ?!",
          icon: "warning",
          buttons: ["No", "Yes"],
        })
        .then((result) => {
         
          if (result) {
           
            fetch(`http://localhost:4000/v1/comments/accept/${commentId}`,{
              method:'PUT',
              headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${localStorageData.token}`
              },
             
            }).then(res =>{
              if(res.ok){
                swal({
                  title: "Comment accepted successfully  ",
                  icon: "success",
                  buttons: "Ok",
                }).then(() => {
                  getAllComments();
                });
              }
            })
          }
        })

        }

      
  return (
    <div>
     

    <DataTable title=" Users">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Course Name</th>
              <th>User</th>
              <th>Score</th>
              <th>View</th>
              <th>Answer</th>
              <th>Accept</th>
              <th>Delete</th>
              <th>Ban</th>
            </tr>
          </thead>
          <tbody>
       {comments.length !==0 ? (
comments.map((comment , index) =>(

  <tr key={comment._id}>
    <td > {index + 1}</td>
    <td>{comment.course}</td>
    {comment.creator ? ( <td>{comment.creator.name}</td>) : ( <td></td>)}

    <td>
    {
      Array(comment.score).fill(0).map(item =>(
<img src="/images/svgs/star_fill.svg" alt="rating" class="course-box__star"/>
        
        ))
      
      }
      {
        Array(5-comment.score).fill(0).map(item=>(
<img src="/images/svgs/star.svg" alt="rating" class="course-box__star"/>

        ))
      }
      </td>
   
    <td>
      <button type="button" className="btn btn-primary edit-btn" onClick={()=>showCommenttBody(comment.body)}>
        View Comment
      </button>
    </td>
     
   
    {comment.answer=== 0 ? (
 <td>
 <button type="button" className='edit-btn  btn btn-success'
  onClick={()=>acceptComment(comment._id)}>
   Accept
 </button>
</td>
    ): (
      <td>
      <button type="button" className='edit-btn btn btn-danger'
       onClick={()=>rejectComment(comment._id)}>
        Reject
      </button>
    </td>
    )}
    <td>

      <button type="button" className={`edit-btn ${comment.answer === 0 ? 'btn btn-danger': 'btn btn-success'} `}
       onClick={()=>answerComment(comment._id)}>
        Answer
      </button>
    </td>
  
    <td>
      <button  type="button" className="btn btn-danger delete-btn"  onClick={()=>deleteComment(comment._id)}   >
        Delete
      </button>
    </td>
    <td>
      <button   type="button"  className="btn btn-danger delete-btn" onClick={()=>banUser(comment.creator._id)}  >
        {"    "} Ban {" " }
      </button>
    </td>
  </tr>
))

        ):('')}
     

          
          </tbody>
        </table>
      </DataTable>
    </div>
  )
}
