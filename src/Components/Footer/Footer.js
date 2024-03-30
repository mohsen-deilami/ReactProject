/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./Footer.css";
import FooterItem from "../FooterItem/FooterItem";
import { Link } from "react-router-dom";
import Input from "../Form/Input";
import swal from "sweetalert";
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
} from "../../validators/Rules";
import { useForm } from "../../hooks/useForm";

export default function Footer() {
  const [formState, onInputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const addNewEmail = (event) => {
    event.preventDefault();
    const newEmail = {
      email: formState.inputs.email.value,
    };
    fetch('http://localhost:4000/v1/newsletters',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(newEmail)
    }).then(res => {
      if (res.ok){
        swal({
          title:  'Your email has been successfully registered in the newsletter',
          icon:'success',
          buttons:'OK'
        })
         
        }
    })
  
  };
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-widgets">
          <div className="row">
            <FooterItem title="About us">
              <p className="footer-widgets__text">
            When I first started learning programming. One of the problems I had
            in the learning process was the lack of good training with
            acceptable support, which made me decide then that if one day I had
            acceptable financial and technical ability, I would start a website
            to solve this problem! And today Sabzlern programming training
            academy operates as a private academy and this means that every
            school is not allowed to teach in it and must pass the special
            filtering of Sabzlern academy! At Sabzleran Academy, we guarantee
            good and quality support. Because the instructors of the Sabzlern
            website even charge a fee to support their free courses and are
            committed to having the love of their dear users!
              </p>
            </FooterItem>

            <FooterItem title="The latest content">
              <div className="footer-widgets__links">
              <a href="#" className="footer-widgets__link">
              How to install the library in Python Python library installation
              tutorial
            </a>
            <a href="#" className="footer-widgets__link">
              How to update Python? | Tutorial on updating Python from zero to
              one hundred
            </a>
            <a href="#" className="footer-widgets__link">
              How to install Python on Mac, Windows and Linux Step by step and
              image
            </a>
            <a href="#" className="footer-widgets__link">
              The best front-end frameworks 16. Front-end frameworks check the
              disadvantages and benefits
            </a>
            <a href="#" className="footer-widgets__link">
              Introducing the best JavaScript training site [experience
              oriented] + free training
            </a>
              </div>
            </FooterItem>

            <FooterItem title="Quick access ">
            <div className="row">
            <div className="col-6">
              <a href="#" className="footer-widgets__link">
                HTML tutorial
              </a>
            </div>

            <div className="col-6">
              <a href="#" className="footer-widgets__link">
                CSS tutorial
              </a>
            </div>

            <div className="col-6">
              <a href="#" className="footer-widgets__link">
                JavaScript training
              </a>
            </div>
            <div className="col-6">
              <a href="#" className="footer-widgets__link">
                Bootstrap tutorial
              </a>
            </div>
            <div className="col-6">
              <a href="#" className="footer-widgets__link">
                React training
              </a>
            </div>

            <div className="col-6">
              <a href="#" className="footer-widgets__link">
                Python training
              </a>
            </div>

            <div className="col-6">
              <Link
                to="/contact"
                className="footer-widgets__link"
                style={{ fontWeight: "900" }}
              >
                Contact Us
              </Link>
            </div>
            <div className="col-12">
            <span className="footer-widgets__title"> Subscribe to the newsletter</span>
                  <span className="footer-widgets__text text-center d-block">
                  Subscribe to get the latest news and site discounts!
                  </span>
              <div className="newsletter-content">
                <Input
                  element="input"
                  id="email"
                  className="login-form__password-input"
                  type="email"
                  placeholder="E-Mail Adrress "
                  validations={[
                    requiredValidator(),
                    minValidator(8),
                    maxValidator(50),
                    emailValidator(),
                  ]}
                  onInputHandler={onInputHandler}
                />

                <button
                  type="submit"
                  className="newsletter__btn"
                  onClick={addNewEmail}
                >
                  Membership
                </button>
              </div>
            </div>
          </div>
            </FooterItem>
          </div>
        </div>
      </div>

      <div className="footer__copyright">
        <span className="footer__copyright-text">
        All rights are reserved for Mr. Mohsen Deilami.
        </span>
      </div>
    </footer>
  );
}
