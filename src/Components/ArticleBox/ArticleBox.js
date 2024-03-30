import React from 'react'
import './ArticleBox.css'
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
export default function ArticleBox(props) {

  return (
    <>
          <div className="col-4">
              <div className="article-card">
                <div className="article-card__header">
                  <Link to={`/article-info/${props.shortName}`} className="article-card__link-img">
                    <img src={`http://localhost:4000/courses/covers/${props.cover}`} 
                    className="article-card__img" alt="Article Cover" />
                  </Link>
                </div>
                <div className="article-card__content">
                  <Link to={`/article-info/${props.shortName}`} className="article-card__link">
                  {props.description}  
                                 </Link>
                  <p className="article-card__text" dangerouslySetInnerHTML={{__html :DOMPurify.sanitize(props.body)}}>
                   
                                </p>
                </div>
                <div className="article__btn">
                  <Link  to={`/article-info/${props.shortName}`} className="article-card__btn">Read more  </Link>

                </div>
              </div>
            </div>

  
          </>
          )
        }
        