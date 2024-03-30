import React, { useEffect, useState } from "react";
import DataTable from "./../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/v1/tickets`, {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTickets(data);
      });
  }, []);

  const showTicketBody = (body) => {
    swal({
      title: body,
      buttons: "Ok",
    });
  };

  const answerTicket = (ticketID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    swal({
      title:'enter your answer',
      buttons:'ok',
      content: "input",
    }).then(answerText => {
      console.log(answerText);

     if (answerText) {
        const answerBody={
          ticketID,
          body:answerText
        }

      fetch(`http://localhost:4000/v1/tickets/answer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization : `Beare ${localStorageData.token}`,
        },
        body: JSON.stringify(answerBody)
      }).then(res =>{
        
        if(res.ok){
          swal({
            title: "The ticket was sent successfully  ",
            icon: "success",
            buttons: "Ok",
          })
          }
       })
         
    
        }
        });
    console.log('ticketID=>',ticketID);
  };
  return (
    <>
      <DataTable title="Tickets">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Title</th>
              <th>Type of Ticket </th>
              <th>Course</th>
              <th>Priority</th>
              <th>View</th>
              <th>Response</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket._id}>
                <td>{index + 1}</td>
                <td>{ticket.user}</td>
                <td>{ticket.title}</td>
                <td>{ticket.departmentSubID}</td>
                <td>{ticket.course ? ticket.course : "---"}</td>
                <td>
                  {ticket.priority === 1 && "Heigh"}
                  {ticket.priority === 2 && "Medium"}
                  {ticket.priority === 3 && "Low"}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => showTicketBody(ticket.body)}
                  >
                    View
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary edit-btn"
                    onClick={() => answerTicket(ticket._id)}
                  >
                    Response
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
