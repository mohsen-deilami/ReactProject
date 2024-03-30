import React from "react";
import { Link } from "react-router-dom";

export default function Ticket(props) {
  return (
    <div className="ticket-content__box">
      <div className="ticket-content__right">
        <div className="ticket-content__right-right">
          <Link className="ticket-content__link" to={`answer/${props._id}`}>
            {props.title}
          </Link>
            </div>
            <div className="ticket-content__right-left">
          <span className="ticket-content__category">
            <i className="fa fa-ellipsis-v ticket-content__icon"></i>
           {
               props.departmentSubID
           }
          </span>
          <span className="ticket-content__name">{props.user}</span>
        </div>
      </div>
      <div className="ticket-content__left">
        <div className="ticket-content__left-right">
          <div className="ticket-content__condition">
            <span className="ticket-content__condition-text">
                {
                    props.answer === 0 ? "Not answered" : "Answered  "
                }
            </span>
          </div>
        </div>
        <div className="ticket-content__left-left">
          <span className="ticket-content__time">{props.createdAt.slice(0, 10)}</span>
        </div>
      </div>
    </div>
  );
}
