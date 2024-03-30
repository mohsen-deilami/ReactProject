import React, { useEffect, useState } from "react";
import "./Users.css";
import swal from "sweetalert";
import Input from "./../../../Components/Form/Input";
import { useForm } from "./../../../hooks/useForm";
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
} from "../../../validators/Rules";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      username: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const clearinput = () => {
    formState.inputs.name.value = "";
    formState.inputs.username.value = "";
    formState.inputs.email.value = "";
    formState.inputs.password.value = "";
    formState.inputs.password.value = "";
    formState.inputs.phone.valu = "";
  };
  useEffect(() => {
    getAllUsers();
  }, []);

  function getAllUsers() {
                                                                                //// GetAllUser
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    fetch(`http://localhost:4000/v1/users`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      },
    })
      .then((res) => res.json())
      .then((allUsers) => {
        setUsers(allUsers);
      });
  }

  const deleteUser = (userId) => {
                                                                                /// Delete User
    const localStorageData = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "Are you sure for delete this user ?!",
      icon: "warning",
      buttons: ["No", "Yes"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/users/${userId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Beare ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "User deleted successfully  ",
              icon: "success",
              buttons: "Ok",
            }).then(() => {
              getAllUsers();
            });
          }
        });
      }
    });
  };

                                                                         /// Ban User
  const banUser = (userId) => {
    const localStorageData = JSON.parse(localStorage.getItem("user"));

    swal({
      title: "Are you sure for Ban this user ?!",
      icon: "warning",
      buttons: ["No", "Yes"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/users/ban/${userId}`, {
          method: "PUT",
          headers: {
            Authorization: `Beare ${localStorageData.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "The user was successfully banned",
              icon: "success",
              buttons: "Ok",
            });
            deleteUser(userId);
            getAllUsers();
          }
        });
      }
    });
  };

  const editUser = () => {
                                                                           /// edit User
    alert(" There is any code for this section....  ");
  };

  const addNewUser = (event) => {
                                                                            ///add new user
    event.preventDefault();

    const newUserInfos = {
      name: formState.inputs.name.value,
      username: formState.inputs.username.value,
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
      confirmPassword: formState.inputs.password.value,
      phone: formState.inputs.phone.value,
    };

    fetch(`http://localhost:4000/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserInfos),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          if (res.status === 403) {
            swal({
              title: "This number is baned",
              icon: "error",
              buttons: "Ok ",
            });
          }
        }
      })
      .then((result) => {
        if (result !== undefined) {
          swal({
            title: "User has successfully registered on the site",
            icon: "success",
            buttons: "Ok ",
          }).then(() => {
            clearinput();
            getAllUsers();
          });
        }
      });
  };

   const changeRole = (userId ,userRole) => {               //// change role
    let newRole={
      id: userId,
      role: userRole
    };
    
    if(userRole === 'ADMIN'){
      newRole = {
        id: userId,
        role: 'USER',
      };
    } else {
      newRole = {
        id: userId,
        role: 'ADMIN',
      };
    } 
    swal({
      title: `Are you sure for change rol of this user to ${newRole.role}?!`,
      icon: "warning",
      buttons: ["No", "Yes"],
    }).then((result) => {
      if (result) { 

                            
         fetch('http://localhost:4000/v1/users/role', {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${ JSON.parse(localStorage.getItem("user")).token }`,
          },
          body:JSON.stringify(newRole)
        }).then(res =>{
          if(res.ok){
           swal({
            title:`User role successfully change to ${newRole.role}`,
                icon:'success',
                buttons:'OK'
           }).then(()=>{
            getAllUsers();
           })
       }})
      }
    })

  }; 



   
  return (
    <>
   
        <div className="container">
      <div className="home-content-edit">
      
          <div className="home-title">
            <span> Add a new user</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title"> Name And Famili </label>
                <Input
                  type="text"
                  className=""
                  id="name"
                  element="input"
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(20),
                  ]}
                  onInputHandler={onInputHandler}
                  placeholder="Please enter the user's first and last name..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="family input">
                <label className="input-title"> User Name</label>
                <Input
                  type="text"
                  className=""
                  id="username"
                  element="input"
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(20),
                  ]}
                  onInputHandler={onInputHandler}
                  placeholder="Please enter username..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="email input">
                <label className="input-title">E-Mail</label>
                <Input
                  type="text"
                  className=""
                  id="email"
                  element="input"
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(20),
                    emailValidator(),
                  ]}
                  onInputHandler={onInputHandler}
                  placeholder="Please enter email..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="password input">
                <label className="input-title">Password </label>
                <Input
                  type="text"
                  className=""
                  id="password"
                  element="input"
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(20),
                  ]}
                  onInputHandler={onInputHandler}
                  placeholder="Please enter the user password..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-6">
              <div className="phone input">
                <label className="input-title"> Telephone Number</label>
                <Input
                  type="text"
                  className=""
                  id="phone"
                  element="input"
                  validations={[
                    requiredValidator(),
                    minValidator(10),
                    maxValidator(12),
                  ]}
                  onInputHandler={onInputHandler}
                  placeholder="Please enter the user's phone number..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>

            <div className="col-12">
              <div className="bottom-form">
                <div className="submit-btn">
                  <input  type="submit" value="Add" onClick={addNewUser} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DataTable title=" Users">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name and Famili</th>
              <th>E-Mail</th>
              <th>Role</th>
              <th>Edit</th>
              <th>Change Role</th>
              <th>Delete</th>
              <th>Ban</th>
            </tr>
          </thead>
          <tbody>
            {users.length !== 0
              ? users.map((user, index) => (
                  <tr>
                    <td> {index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary edit-btn btn"
                        onClick={editUser}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary edit-btn btn"
                        onClick={() => changeRole(user._id,user.role)}
                      >
                        Change Role
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger delete-btn btn"
                        onClick={() => deleteUser(user._id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger delete-btn btn"
                        onClick={() => banUser(user._id)}
                      >
                        {"    "} Ban{" "}
                      </button>
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}
