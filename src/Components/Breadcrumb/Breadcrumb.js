/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './Breadcrumb.css'
import { Link } from 'react-router-dom'
export default function Breadcrumb({links}) {
  return (
    <div className='breadcrumb'>
        <div className="container">
        <div className="breadcrumb__content">
          <div className="breadcrumb__home-content-icon">
            <i className="fas fa-home breadcrumb__home-icon"></i>
          </div>
          <ul className="breadcrumb__list">
            {links.map(link =>(

                <li className="breadcrumb__item" key={link.id}>
              <Link className="breadcrumb__link" to ={`/${link.to}`}>
               {link.title}
               {link.id !== links.length ? (

                <i className="fas fa-angle-right breadcrumb__icon"></i>
               ):null}
              </Link>
            </li>
                ))}
           
          </ul>
        </div>
        </div>
      
    </div>
  )
}
