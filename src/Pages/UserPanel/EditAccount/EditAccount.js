
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../../Context/authContetxt";
import swal from 'sweetalert'

import "./EditAccount.css";

export default function EditAccount() {
  const authContext = useContext(AuthContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setName(authContext.userInfos.name);
    setPhone(authContext.userInfos.phone);
    setUsername(authContext.userInfos.username);
    setUsername(authContext.userInfos.username);
    setEmail(authContext.userInfos.email);
  }, []);

  const editAccount = (event) => {
    event.preventDefault();

    const userNewInfos = {
      name,
      username,
      email,
      password,
      phone,
    };

    fetch(`http://localhost:4000/v1/users/`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
      },
      body: JSON.stringify(userNewInfos)
    }).then(res => {
      if(res.ok) {
        swal({
          title: "Your account information has been successfully edited.",
          icon: 'success',
          buttons: "very great"
        })
      }
    })
  };

  return (
    <div class="col-9">
      <div class="edit">
        <form class="edit__form" action="#">
          <div class="edit__personal">
            <div class="row">
              <div class="col-12">
              <label className="edit__label">Phone Number *</label>
                <input
                  class="edit__input"
                  type="text"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Please enter your mobile number"
                />
              </div>

              <div class="col-12">
              <label className="edit__label">Name And Famili*</label>
                <input
                  class="edit__input"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Please enter your name and famili"
                />
              </div>
              <div class="col-12">
              <label className="edit__label">Username *</label>
                <input
                  class="edit__input"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Please enter your Username"
                />
                <span className="edit__help">
                    Your name will be seen in this way in the user account and
                    comments.
                  </span>
              </div>
              <div class="col-12">
              <label className="edit__label">E-Mail Address*</label>
                <input
                  class="edit__input"
                  type="text"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Please enter your E-mail Address"
                />
              </div>
            </div>
          </div>
          <div class="edit__password">
          <span className="edit__password-title">Change password</span>
            <div class="row">
              <div class="col-12">
              <label className="edit__label">
                    Previous password (if you don't want to change it, leave it blank)
                  </label>
                <input
                  class="edit__input"
                  type="text"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Confirm new password"
                />
              </div>
            </div>
          </div>
          <button class="edit__btn" type="submit" onClick={editAccount}>
          Save changes
          </button>
        </form>
      </div>
    </div>
  );
}

