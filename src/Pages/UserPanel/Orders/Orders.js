/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useNavigate , Link} from "react-router-dom";
import "./Orders.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate=useNavigate()

  useEffect(() => {
    fetch(`http://localhost:4000/v1/orders`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrders(data);
      });
  }, []);

  const showOrderDetails = (orderID) => {
      navigate(orderID)
  }

  return (
    <>
    {orders.length !==0 ? (
      <div className="col-9">
      <div className="order">
        <table className="order__table">
          <thead className="order__table-header">
            <tr className="order__table-header-list">
              <th className="order__table-header-item">ID</th>
              <th className="order__table-header-item">Date</th>
              <th className="order__table-header-item">Status</th>
              <th className="order__table-header-item">Course</th>
              <th className="order__table-header-item">Price</th>
              <th className="order__table-header-item">Action</th>
            </tr>
          </thead>
          <tbody className="order__table-body">
            {orders.map((order, index) => (
              <tr className="order__table-body-list" key={order._id}>
                <td className="order__table-body-item">
                  <a href="#" className="order__table-body-link">
                    {index + 1}
                  </a>
                </td>
                <td className="order__table-body-item">{order.createdAt.slice(0, 10)}</td>
                <td className="order__table-body-item">Completed</td>
                <td className="order__table-body-item">
                 {order.course.name}
                </td>
                <td className="order__table-body-item">
                 {order.price}
                </td>
                <td className="order__table-body-item" onClick={() => showOrderDetails(order._id)}>
                  <a className="order__table-body-btn" href="#">
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    ) : (
      <div className="col-9">
      <div className="order">
      <div className="alert alert-warning">  You are not registered in any course   </div>
       </div>
       </div>
      )}
      </>
   
  );
}
