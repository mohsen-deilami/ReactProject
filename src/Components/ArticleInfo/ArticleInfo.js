/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import "./ArticleInfo.css";
import Topbar from "../Topbar/Topbar";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import CommentsTextArea from "../CommentsTextArea/CommentsTextArea";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
export default function ArticleInfo() {
  const { articleName } = useParams();
  console.log(articleName);
  const [articleInfo, setArticleInfo] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles/${articleName}`)
      .then((res) => res.json())
      .then((articles) => {
        setArticleInfo(articles);
        console.log(articles);
      });
  }, []);
  return (
    <div>
      <Topbar />
      <Navbar />
      <Breadcrumb
        links={[
          { id: 1, title: "Home", to: "" },
          {
            id: 2,
            title: "Articles ",
            to: "article-info/articleName",
          },
          { id: 3, title:`${articleName}`, to: "articleName" },
        ]}
      />

      <main className="main">
        <div className="container">
          <div className="row">
            <div className="col-8">
              {articleInfo && (
                <div className="article">
                  <h1 className="article__title">{articleInfo.title}</h1>
                  <div className="article__header">
                    <div className="article-header__category article-header__item">
                      <i className="far fa-folder article-header__icon"></i>
                      {articleInfo.categoryID ? (
                        <Link to={`/category-info/${articleInfo.categoryID.name}/1`} className="article-header__text">
                          {articleInfo.categoryID.title}
                        </Link>
                      ) : null}
                    </div>
                    {articleInfo.creator ? (
                      <>
                        <div className="article-header__category article-header__item">
                          <i className="far fa-user article-header__icon"></i>

                          <span className="article-header__text">
                            Submitted by: {articleInfo.creator.name}
                          </span>
                        </div>
                        <div className="article-header__category article-header__item">
                          <i className="far fa-eye article-header__icon"></i>
                          <span className="article-header__text">
                            Date of Release:{" "}
                            {articleInfo.creator.updatedAt.slice(0, 10)}
                          </span>
                        </div>
                      </>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="article-section">
                    <h2 className="article-section__title">
                      {articleInfo.description}
                    </h2>

                    <img
                      src={`http://localhost:4000/courses/covers/${articleInfo.cover}`}
                      alt="Article Cover"
                      className="article__banner"
                    />
                    <div className="article__score">
                      <div className="article__score-icons">
                        <img
                          src="/images/svgs/star_fill.svg"
                          className="article__score-icon"
                        />
                        <img
                          src="/images/svgs/star_fill.svg"
                          className="article__score-icon"
                        />
                        <img
                          src="/images/svgs/star_fill.svg"
                          className="article__score-icon"
                        />
                        <img
                          src="/images/svgs/star_fill.svg"
                          className="article__score-icon"
                        />
                        <img
                          src="/images/svgs/star.svg"
                          className="article__score-icon"
                        />
                      </div>
                      <span className="article__score-text">
                        4.2/5 - (5 Rate)
                      </span>
                    </div>

                    <p className="article__paragraph paragraph">
                      {articleInfo.description}
                    </p>
                   
                   <div className="article-section" dangerouslySetInnerHTML={{__html :DOMPurify.sanitize(articleInfo.body)}}>
                    
                   </div>
                    
               
                    <div className="article-read">
                      <span className="article-read__title">
                        What you will read in this article
                      </span>
                      <ul className="article-read__list">
                        <li className="article-read__item">
                          <a href="#" className="article-read__link">
                            Introducing the best JavaScript training sites:
                          </a>
                        </li>
                        <li className="article-read__item">
                          <a href="#" className="article-read__link">
                            An easier way, JavaScript courses!
                          </a>
                        </li>
                        <li className="article-read__item">
                          <a href="#" className="article-read__link">
                            Registering in JavaScript courses:
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="article-social-media">
                    <span className="article-social-media__text">Share :</span>
                    <a href="#" className="article-social-media__link">
                      <i className="fab fa-telegram-plane article-social-media__icon"></i>
                    </a>
                    <a href="#" className="article-social-media__link">
                      <i className="fab fa-twitter article-social-media__icon"></i>
                    </a>
                    <a href="#" className="article-social-media__link">
                      <i className="fab fa-facebook-f article-social-media__icon"></i>
                    </a>
                  </div>
                </div>
              )}

              <div className="suggestion-articles">
                <div className="row">
                  <div className="col-6">
                    <div className="suggestion-articles__right suggestion-articles__content">
                      <a href="#" className="suggestion-articles__icon-link">
                        <i className="fas fa-arrow-right suggestion-articles__icon"></i>
                      </a>
                      <a href="#" className="suggestion-articles__link">
                        What is the fastest and best way to learn JavaScript? |
                        Experienced programmers{" "}
                      </a>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="suggestion-articles__left suggestion-articles__content">
                      <a href="#" className="suggestion-articles__icon-link">
                        <i className="fas fa-arrow-left suggestion-articles__icon"></i>
                      </a>
                      <a href="#" className="suggestion-articles__link">
                        What is the fastest and best way to learn JavaScript? |
                        Experienced programmers{" "}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <CommentsTextArea />
            </div>
            <div className="col-4"></div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
