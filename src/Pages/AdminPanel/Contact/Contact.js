import React, { useEffect, useState } from "react";
import "./Contact.css";
import swal from "sweetalert";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
export default function Contact() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    getAllContacts();
  }, []);
  function getAllContacts() {
    fetch("http://localhost:4000/v1/contact", {})
      .then((res) => res.json())
      .then((allContacts) => {
        setContacts(allContacts);
      });
  }
  const showContactBody = (body) => {
    swal({
      title: body,
      icon: "warning",
      buttons: "Ok",
    });
  };

  const sendAnswerToUser = (contactEmail) => {
                                                           ////// answer email
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "Enter your Answer",
      content: "input",
      icon: "success",
      buttons: "Send",
    }).then((value) => {
      if (value) {
        const answerInfo = {
          email: contactEmail,
          answer: value,
        };
        fetch("http://localhost:4000/v1/contact/answer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageData.token}`,
          },
          body: JSON.stringify(answerInfo),
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
          })
          .then((result) => {
            swal({
              title: "Your email has been sent successfully",
              icon: "success",
              buttons: "Ok",
            });
            getAllContacts();
          });
      }
    });
  };

                                                                          ///// delete Contact
  const deleteContact = (contactID) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "Are you sure for delete this Contact ?!",
      icon: "warning",
      buttons: ["No", "Yes"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/contact/${contactID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Beare ${localStorageData.token}`,
          },
        }).then(res =>{
            if(res.ok){
              swal({
                title: "User deleted successfully  ",
                icon: "success",
                buttons: "Ok",
              }).then(() => {
                getAllContacts();
              });
            }
          })
      }
    });
  };
  return (
    <div>
      <DataTable title="Contact">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name and Famili</th>
              <th>E-Mail</th>
              <th>Phone</th>
              <th>View Contact</th>
              <th>Answer</th>
              <th>Delete</th>
            </tr>
          </thead>
          {contacts &&
            contacts.map((contact, index) => (
              <>
             
                <tbody>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td>
                    
                      <button
                        type="button"
                        className="btn btn-primary edit-btn"
                        onClick={() => showContactBody(contact.body)}
                      >
                        View Contact
                      </button>
                    </td>
                    <td>
                    {contact.answer === 0 ? (
                      <button
                        type="button"
                        className="btn btn-primary edit-btn"
                        onClick={() => sendAnswerToUser(contact.email)}
                      >
                        Answer
                      </button>
                    ):(
<button
                        type="button"
                        className="btn btn-success edit-btn"
                        onClick={() => sendAnswerToUser(contact.email)}
                      >
                        Answer
                      </button>
                    )}
                      
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger delete-btn"
                        onClick={() => deleteContact(contact._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </>
            ))}
        </table>
      </DataTable>
    </div>
  );
}
