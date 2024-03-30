import React, { useState } from 'react'
import './Discount.css'
import swal from 'sweetalert'
export default function Discount() {


    const [discount,setDiscount]=useState('')

    const discountSubmit = () => {                       
       
       fetch('http://localhost:4000/v1/offs/all',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            Authorization:`Bearer ${JSON.parse(localStorage.getItem('user')).token}`
        },
        body:JSON.stringify({
            discount:discount
        })
        
       }).then(res=>{res.json()
    if(res.ok){
       swal({
        title:'discount successfuly submited...!',
        icon:'success',
        buttons:'ok'
       })
    }
    })
       
    }
    const discountDelete = ()=>{
      fetch('http://localhost:4000/v1/offs/all',{
        method:'DELETE',
        headers: {
          Authorization: `Beare ${JSON.parse(localStorage.getItem('user')).token}`,
        },
      }).then(res=>{res.json()
        if(res.ok){
           swal({
            title:'discount successfuly Deleted...!',
            icon:'success',
            buttons:'ok'
           })
        }
        })
    }
  return (
    <div className="container-fluid">
    <div className="container">

   
    <form className="edit__form" action="#">
          <div className="edit__personal">
            <div className="row">
              <div className="col-9">
              <label className="edit__label"> Discount *</label>
                <input
                  className="edit__input"
                  type="text"
                 value={discount}
                 onChange={event=>setDiscount(event.target.value)}                 
                  placeholder="Please enter number of Discount"
                />
              </div>

            
            </div>
          </div>
         <div className="discoun__btns">

          <button className="discount__btn discount__btn-submit btn" type="button"  onClick={()=>discountSubmit()}>
         Submit
          </button>
          <button className="discount__btn btn" type="button"  onClick={()=>discountDelete()}>
         Delete
          </button>
         </div>
        </form>
         </div> 
         </div> 
  )
}
