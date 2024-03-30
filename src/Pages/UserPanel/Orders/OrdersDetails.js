import React, { useEffect, useState } from 'react'
import { useParams, Link } from "react-router-dom";
import './OrdersDetails.css'
export default function OrdersDetails() {
    const [orderDetail,setOrderDetail]=useState([])
const {orderId}=useParams();

    useEffect(()=>{
    const localStorageData = JSON.parse(localStorage.getItem("user"));
fetch(`http://localhost:4000/v1/orders/${orderId}`,{
    headers:{
        Authorization :`Bearer ${localStorageData.token}`
    }
}).then(res =>res.json())
.then(data=>{
    console.log(data[0] )
    setOrderDetail(data)
})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <div className="col-9">
        {orderDetail.length ?
        (
    <div className="order">
         <p className="order__title">
      Order No. <span className='order__title-content'> {orderDetail[0]._id} </span>  was registered on 
      <span className='order__title-content'>{orderDetail[0].createdAt.slice(0,10)}</span> 
      and is currently in <span className='order__title-content'> Completed </span> status
      </p>
      <h2 className="order__details">Order Details</h2>

      <div className="order__content">
        <div className="order__content-items-title">
            <p>Product</p>
            <p>Sum</p>
        </div>
        <div className="order__content-items">
        <p>{orderDetail[0].course.name}</p>
            <p>{orderDetail[0].price}</p>
        </div>
        <div className="order__content-items">
        <p>total basket</p>
            <p>{orderDetail[0].price}</p>
        </div>
        <div className="order__content-items">
        <p>The final price</p>
            <p>{orderDetail[0].price}</p>
        </div>
      </div>
    
          
             
                <input type="submit" value="Re-Order"  className='submit-btn'/>
          
             
          

            <div className="order__bill">
                <h2 className="order__bill-title">Bill address</h2>
                <div className="order__bill-content">

                <div className="order__bill-content__item">Mohsen deilami   </div>
                <div className="order__bill-content__item">09115917091</div>
                <div className="order__bill-content__item">Mohsen.deilami65760@gmail.com</div>
                </div>
            </div>
         
    </div>
  ):(
    ''
  )}
    </div>
  )
}
