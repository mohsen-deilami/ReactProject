/* eslint-disable no-const-assign */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from "react";
import "./CommentsTextArea.css";
import Alert from "react-bootstrap/Alert";
import AuthContext from "../../Context/authContetxt";
import { Link } from "react-router-dom";

export default function CommentsTextArea({ comments, submitComment }) {
  const authContext = useContext(AuthContext);
  const [newCommentbody, setNewCommentBody] = useState("");
  const [commentScore, setCommentScore] = useState(-'1');



  
  return (
    <div className="comments">
      <div className="comments__header">
        <div className="comments__header-icon-content">
          <i className="comments__header-icon far fa-comment"></i>
        </div>
        <span className="comments__header-title">Comments</span>
      </div>
      <div className="comments__content">
        {!comments ? (
          <Alert variant="warning">
            There are no comments for this course yet.{" "}
          </Alert>
        ) : (
          <>
            {comments.map((comment) => (
              <div className="comments__item" key={comment._id}>
                <div className="comments__question">
                  <div className="comments__question-header">
                    <div className="comments__question-header-right">
                      <span className="comments__question-name comment-name">
                        {comment.creator ? comment.creator.name : "No Name"}
                      </span>
                      <span className="comments__question-status comment-status">
                        {comment.creator
                          ? comment.creator.role === "ADMIN"
                            ? "amin"
                            : "user"
                          : ""}
                      </span>
                      <span className="comments__question-date comment-date">
                        {comment.updatedAt.slice(0, 10)}
                      </span>
                    </div>
                    <div className="comments__question-header-left">
                      <a
                        className="comments__question-header-link comment-link"
                        href="#"
                      >
                        antwort
                      </a>
                    </div>
                  </div>
                  <div className="comments__question-text">
                    <p className="comments__question-paragraph comment-paragraph">
                      {comment.body}
                    </p>
                  </div>

                  {comment.answerContent ? (
                    <div
                      className="comments__item"
                      key={comment._id}
                      style={{ marginTop: "1rem" }}
                    >
                      <div className="comments__question">
                        <div className="comments__question-header">
                          <div className="comments__question-header-right">
                            <span className="comments__question-name comment-name">
                              {comment.answerContent.creator
                                ? comment.answerContent.creator.name
                                : "No Name"}
                            </span>
                            <span className="comments__question-status comment-status">
                              {comment.answerContent.creator
                                ? comment.answerContent.creator.role === "ADMIN"
                                  ? "amin"
                                  : "user"
                                : ""}
                            </span>
                            <span className="comments__question-date comment-date">
                              {comment.answerContent.updatedAt.slice(0, 10)}
                            </span>
                          </div>
                          <div className="comments__question-header-left">
                            <a
                              className="comments__question-header-link comment-link"
                              href="#"
                            >
                              antwort
                            </a>
                          </div>
                        </div>
                        <div className="comments__question-text">
                          <p className="comments__question-paragraph comment-paragraph">
                            {comment.answerContent.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}

          {/*   <div className="comments__pagantion">
              <ul className="comments__pagantion-list">
                <li className="comments__pagantion-item">
                  <a href="#" className="comments__pagantion-link">
                    <i className="fas fa-long-arrow-alt-right comments__pagantion-icon"></i>
                  </a>
                </li>
                <li className="comments__pagantion-item">
                  <a href="#" className="comments__pagantion-link">
                    1
                  </a>
                </li>
                <li className="comments__pagantion-item">
                  <a href="#" className="comments__pagantion-link">
                    2
                  </a>
                </li>
                <li className="comments__pagantion-item">
                  <a
                    href="#"
                    className="comments__pagantion-link comments__pagantion-link--active"
                  >
                    3
                  </a>
                </li>
              </ul>
            </div> */}
          </>
        )}
      </div>
      {authContext.isLogin === true ? (
        <>
          <div className="comments__rules">
            <span className="comments__rules-title">
              Comment registration rules{" "}
            </span>
            <span className="comments__rules-item">
              <i className="fas fa-check comments__rules-icon"></i>If you need
              course support, ask questions in the online display section Use it
              and questions related to bug fixes will not be approved{" "}
            </span>
            <span className="comments__rules-item">
              <i className="fas fa-check comments__rules-icon"></i>
              Comments unrelated to the course will not be approved.
            </span>
            <span className="comments__rules-item">
              <i className="fas fa-check comments__rules-icon"></i>
              Questions related to bug fixes will not be approved in this
              section.
            </span>
            <span className="comments__rules-item">
              <i className="fas fa-check comments__rules-icon"></i>
              Avoid posting duplicate comments.
            </span>
          </div>
          <div className="comments__respond">
            <div className="comments__score">
              <span className="comments__score-title">Your score </span>
              
              <div className="custom-select">
                <select
                  id="select-Box"
                  className="comments__score-input"
                  onChange={event =>setCommentScore(event.target.value)}
                >
                  <option value="-1">Choose your score: </option>
                  <option value="5">Exelent</option>
                  <option value="4">Very Good</option>
                  <option value="3">Good</option>
                  <option value="2">Not Bad</option>
                  <option value="1">Bad</option>
                </select>
              </div>
            </div>
            <div className="comments__respond-content">
              <div className="comments__respond-title">
                {" "}
                your point of view *
              </div>

              <textarea
                className="comments__score-input-respond"
                onChange={event =>  setNewCommentBody(event.target.value)}
              >
                {newCommentbody}
              </textarea>
            </div>
            <button
              type="submit"
              className="comments__respond-btn"
              onClick={() => {
                submitComment(newCommentbody, commentScore);
              }}
            >
              Submit
            </button>
          </div>
        </>
      ) : (
        <Alert variant="danger" style={{ marginTop: "1.5rem" }}>
          You must
          <Link to="/login" style={{ margin: ".5rem" }}>
            login
          </Link>{" "}
          first to post a comment
        </Alert>
      )}
    </div>
  );
}
