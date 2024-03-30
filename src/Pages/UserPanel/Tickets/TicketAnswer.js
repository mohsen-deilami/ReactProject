/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import "./TicketAnswer.css";

export default function TicketAnswer() {
  const { id } = useParams();
  const [ticketInfo, setTicketInfo] = useState({});

  useEffect(() => {
    fetch(`http://localhost:4000/v1/tickets/answer/${id}`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
    
        setTicketInfo(data);
      });
  }, []);

  return (
    <div className="col-9">
      <div className="ticket">
        <div className="ticket-header">
          <span className="ticket-header__title">All Tickets</span>
          <Link className="ticket-header__link" to="/my-account/send-ticket">
            Send New Ticket
          </Link>
        </div>
        <div className="ticket-top">
          <div className="ticket-top__right">
            <a className="ticket-top__link" href="#">
              <i className="fa fa-angle-right ticket-top__icon"></i>
            </a>
          </div>
          <div className="ticket-top__left">
            <span className="ticket-top__title">تیکت تست</span>
            <span className="ticket-top__text">Ticket ID: 2070</span>
          </div>
        </div>
        <div className="ticket-send">
          <div className="ticket-send__header">
            <div className="ticket-send__header-right">
              <div className="ticket-send__header-mic">
                <i className="fa fa-microphone ticket-send__header-icon"></i>
                <span className="ticket-send__header-text">0</span>
              </div>
              <div className="ticket-send__header-pin">
                <i className="fa fa-paperclip ticket-send__header-icon"></i>
                <span className="ticket-send__header-text">0</span>
              </div>
            </div>
            <div className="ticket-send__header-left">
              <i className="fa fa-bars ticket-send__header-icon-left"></i>
            </div>
          </div>
          <div className="ticket-send__title">
            <span className="ticket-send__title-text">
              <i className="ticket-send__title-icon fa fa-plus"></i>
             Send Answer
            </span>
          </div>
          <div className="ticket-send__answer">
            <div className="ticket-send__answer-box">
              <p className="ticket-send__answer-text">{ticketInfo.ticket}</p>
            </div>
            <div className="ticket-send__answer-bottom">
             
              <span className="ticket-send__answer-date ticket-send__answer-span">
                2022-11-29
              </span>
              <span className="ticket-send__answer-time ticket-send__answer-span">
                14:28
              </span>
            </div>
          </div>
          <div className="ticket-send__title">
            <span className="ticket-send__title-text">
              <i className="ticket-send__title-icon fa fa-plus"></i>
            Answers
            </span>
          </div>

          {ticketInfo.answer === null ? (
            <div className="alert alert-danger">
             No response has been sent to the ticket yet
            </div>
          ) : (
            <>
         
           

             <div className="ticket-send__answer-user">
               <div className="ticket-send__answer-user-box">
                 <p className="ticket-send__answer-user-text">{ticketInfo.answer}</p>
               </div>
               <div className="ticket-send__answer-user-bottom">
                 <span className="ticket-send__answer-user-name ticket-send__answer-user-span">
                Mohsen deilami
                 </span>
                 <span className="ticket-send__answer-user-date ticket-send__answer-user-span">
                   2022-11-29
                 </span>
                 <span className="ticket-send__answer-user-time ticket-send__answer-user-span">
                   14:28
                 </span>
               </div>
             </div>
  
</>
          )}
        </div>
      </div>
    </div>
  );
}
