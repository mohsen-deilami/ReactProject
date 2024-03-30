/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./SectionHeader.css";
import { Link } from "react-router-dom";
export default function SectionHeader({ title, describe, btn , btnHref}) {
  return (
    <div className="section-header">
      
       
          <div className="section-header__left">
            <h2 className="section-header-title title">{title}</h2>
            <span className="section-header-text">{describe}</span>
          </div>
          {btn ? (
            <div className="section-header__right">
              <Link to={btnHref} className="section-header__link">
                {btn}
              </Link>
              <i className="fas fa-arrow-right section-header__icon"></i>
            </div>
          ) : null}
       
      
    </div>
  );
}
