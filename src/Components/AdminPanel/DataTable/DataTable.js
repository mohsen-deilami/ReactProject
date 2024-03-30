import React from 'react'
import './DataTable.css'
export default function DataTable({children , title}) {
  return (
    <div className="container">
    <div className="home-content-latset-users">
      <div className="home-content-users-title">
        <span>
          List  <span className="signup">{title}</span>
        </span>
      </div>
      <div className="home-content-users-table">
        {children}
        </div>
    </div>
  </div>
  )
}
