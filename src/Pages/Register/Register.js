import React, { useContext } from 'react'
import './Register.css'
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import Topbar from "../../Components/Topbar/Topbar";
import Input from '../../Components/Form/Input';
import Button from '../../Components/Form/Button';
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator

} from "../../validators/Rules";
import { useForm } from "../../hooks/useForm";
import AuthContext from '../../Context/authContetxt';
import { useNavigate } from 'react-router-dom';
import swal from "sweetalert";

export default function Register() {
   
   const authContext=useContext(AuthContext)
  
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
      phone: {
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
    },
    false
    );
  
let navigate =useNavigate();

  const registerHandler =(event)=>{
    event.preventDefault();
    
    const newUserInfos = {
      name: formState.inputs.name.value,
      username: formState.inputs.username.value,
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
      confirmPassword: formState.inputs.password.value,
      phone:formState.inputs.phone.value
    };
      
    
    fetch(`http://localhost:4000/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserInfos),
    })
    .then((res) => {
    
      if(res.ok) {
        return res.json()
      } else {
        if (res.status === 403) {
          swal({
            title: 'This number is baned',
            icon: 'error',
            buttons: 'Ok '
          })
        }
      }
    })
    .then((result) => {
      
      if(result !==undefined){
        swal({
          title: '"You have successfully registered on the site"',
          icon: 'success',
          buttons: 'Ok '
        }).then(()=>{

          authContext.login(result.user, result.accessToken);
  navigate('/');
        })
      }
    });
};

  
  return (
    <>
    <Topbar />
    <Navbar />

    <section className="login-register">
      <div className="login register-form">
        <span className="login__title"> Create a user account</span>
        <span className="login__subtitle"> We are glad that you are going to join us</span>
        <div className="login__new-member">
          <span className="login__new-member-text"> Already registered?</span>
         
          <Button className="login__new-member-link" to="/login">
          Enter

          </Button>
        </div>
        <form action="#" className="login-form">
          <div className="login-form__username">
            <Input
            element='input'
            id="name"
              className="login-form__username-input"
              type="text"
              placeholder="Name and Famili"
              validations={[
                requiredValidator(),
                minValidator(8),
                maxValidator(32),
              ]}
              onInputHandler={onInputHandler}
            />
            <i className="login-form__username-icon fa fa-user"></i>

            </div>
            <div className="login-form__username">
              
            <Input
            element='input'
            id="username"
              className="login-form__username-input"
              type="text"
              placeholder="User Name"
              validations={[
                requiredValidator(),
                minValidator(8),
                maxValidator(32),
              ]}
              onInputHandler={onInputHandler}
            />
            <i className="login-form__username-icon fa fa-user"></i>
          </div>
            <div className="login-form__username">
              
            <Input
            element='input'
            id="phone"
              className="login-form__username-input"
              type="text"
              placeholder=" Phone"
              validations={[
                requiredValidator(),
                minValidator(10),
                maxValidator(12),
              ]}
              onInputHandler={onInputHandler}
            />
            <i className="login-form__username-icon fa fa-user"></i>
          </div>

          <div className="login-form__password">
            <Input
            element='input'
            id='email'
              className="login-form__password-input"
              type="email"
              placeholder="E-Mail Adrress "
              validations={[
                requiredValidator(),
                minValidator(8),
                maxValidator(50),
                emailValidator()
              ]}
              onInputHandler={onInputHandler}
            />
            <i className="login-form__password-icon fa fa-envelope"></i>
          </div>
          <div className="login-form__password">
            <Input
            element='input'
            id='password'
              className="login-form__password-input"
              type="password"
              placeholder="Password "
              validations={[
                requiredValidator(),
                minValidator(8),
                maxValidator(20),
              ]}
              onInputHandler={onInputHandler}
            />
            <i className="login-form__password-icon fa fa-lock-open"></i>
          </div>
         
          <Button className={`login-form__btn ${formState.isFormValid ? 'login-form__btn-success' : 'login-form__btn-error'}`}
           type="submit" disabeled={false} onClick={registerHandler}>
            <i className="login-form__btn-icon fa fa-user-plus"></i>
            <span className="login-form__btn-text">Membership</span>

          </Button>
        </form>
        <div className="login__des">
          <span className="login__des-title"> Hello dear user:</span>
          <ul className="login__des-list">
            <li className="login__des-item">
                Please use reliable and up-to-date browsers such as Google Chrome and Firefox use.
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
    
  )
}
