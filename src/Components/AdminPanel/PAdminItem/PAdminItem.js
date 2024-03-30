import React from "react";

export default function PAdminItem({ title, count }) {
  return (
    <div className="col-4">
      <div className="home-content-revanue box">
        <div className="home-box">
          <div className="home-box-left">
            <div className="home-box-title">
              <span>{title}</span>
            </div>
            <div className="home-box-value">
              <div className="home-box-price">
                <span>{count}</span>
              </div>
              
            </div>
            <div className="home-box-text">
              <span>{title} in last mounth   </span>
            </div>
          </div>
          <div className="home-box-right">
            <div className="home-box-icon">
              <i className="fas fa-money-bill-alt"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
