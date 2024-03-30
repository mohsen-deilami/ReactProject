import React from "react";
import "./AboutUs.css";
import SectionHeader from "../SectionHeader/SectionHeader";
import AboutUsBox from "../AboutUsBox/AboutUsBox";
export default function AboutUs() {
  return (
    <div className="about-us">
      <div className="container">
        <SectionHeader
          title={"How can we help you?"}
          describe={"This project is for a private academy "}
        />
        <div className="container">
          <div className="row">
            <AboutUsBox
            icon={'far fa-copyright about-us__icon'}
            title={"Dedicated courses"}
            describe={"Provides support and high quality!"}
            />
            <AboutUsBox
            icon={'fas fa-leaf about-us__icon'}
            title={"Teaching permission"}
            describe={
                "It does not apply to any school. Because quality is important to him!"
            }
            />
            <AboutUsBox
            icon={'fas fa-gem about-us__icon'}
            title={" Paid and free course"}
            describe={
                " It doesnt matter to him. He pays his teachers to provide the highest quality in support and course updates"
            }
            />
            <AboutUsBox
            icon={'fas fa-crown about-us__icon'}
              title={" Importance to the user"}
              describe={
                " The first and last priority of Sabzleran Programming Training Academy is the importance of users ."
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
