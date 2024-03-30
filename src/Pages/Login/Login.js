/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from "react";
import "./Login.css";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Topbar from "../../Components/Topbar/Topbar";
import Input from "../../Components/Form/Input";
import Button from "../../Components/Form/Button";
import {requiredValidator, minValidator, maxValidator} from "../../validators/Rules";

import { useForm } from "../../hooks/useForm";
import AuthContext from "../../Context/authContetxt";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {
  const [isRecapchaVerify ,setIsRecapchaVerify]=useState(false);
  const recapchaOnChangeHandler =()=>{
    setIsRecapchaVerify(true);
  }
  const navigate=useNavigate();
  const authContext = useContext(AuthContext);

  const [formState, onInputHandler] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const userLogin = (event) => {
    event.preventDefault();
    const userData = {
      identifier: formState.inputs.username.value,
      password: formState.inputs.password.value,
    };
    fetch('http://localhost:4000/v1/auth/login' ,{
      method:'POST',
      headers :{
        'Content-Type':'application/json',
      },
      body :JSON.stringify(userData),
      
    }).then( async (res) =>{
      if(!res.ok){
       const text = await res.text();
        throw new Error(text);
      }
      else {
        return res.json()
      }
    })
        .then(result =>{
        swal({
          title:'Success Login...!',
          icon:'success',
          buttons:'Enter Panel'
        }).then(value =>{
          navigate('/')
        })
          authContext.login({},result.accessToken)
      })
      .catch(err =>{
        swal({
          title:'Eine solche benutzer gibt es nicht',
          icon:'error',
          buttons:'Try  Again'
        })
      })
    };
     
     
      
  return (
    <>
      <Topbar />
      <Navbar />

      <section className="login-register">
        <div className="login">
          <span className="login__title"> Log in to the user account</span>
          <span className="login__subtitle">
            We are happy to see you again dear friend :)
          </span>
          <div className="login__new-member">
            <span className="login__new-member-text">Are you a new user? </span>

            <Button className="login__new-member-link" to="/register">
              Register
            </Button>
          </div>
          <form action="#" className="login-form">
            <div className="login-form__username">
              <Input
                className="login-form__username-input"
                id="username"
                element="input"
                type="text"
                placeholder="username or email address"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(45),
                ]}
                onInputHandler={onInputHandler}
              />

              <i className="login-form__username-icon fa fa-user"></i>
            </div>
            <div className="login-form__password">
              <Input
                id="password"
                element="input"
                className="login-form__password-input"
                type="password"
                placeholder="Password "
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(18),
                ]}
                onInputHandler={onInputHandler}
              />
              <i className="login-form__password-icon fa fa-lock-open"></i>
            </div>
            <div className=" login-form__password recapch-parent" >

             <ReCAPTCHA sitekey=" 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={recapchaOnChangeHandler}/>
            </div>

            

            <Button
              className={`login-form__btn ${
                (formState.isFormValid && isRecapchaVerify)
                  ? "login-form__btn-success"
                  : "login-form__btn-error"
              }`}
              type="submit"
              disabled={(!formState.isFormValid || !isRecapchaVerify)}
              onClick={userLogin}
            >
              <span className="login-form__btn-text">Enter</span>
              <i className="login-form__btn-icon fas fa-sign-out-alt"></i>
            </Button>

            <div className="login-form__password-setting">
              <label className="login-form__password-remember">
                <input
                  className="login-form__password-checkbox"
                  type="checkbox"
                />
                <span className="login-form__password-text">Remember me</span>
              </label>
              <label className="login-form__password-forget">
                <a className="login-form__password-forget-link" href="#">
                  Forgot your password?
                </a>
              </label>
            </div>
          </form>
          <div className="login__des">
            <span className="login__des-title">Hello dear user:</span>
            <ul className="login__des-list">
              <li className="login__des-item">
                Please use reliable and up-to-date browsers such as Google
                Chrome and Firefox use.
              </li>
              <li className="login__des-item">
                We never ask for your confidential information via email.
              </li>
              <li className="login__des-item">
                Please change your password at short intervals.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
