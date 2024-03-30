import React, { useEffect, useState } from "react";
import "./Articles.css";
import DataTable from "../../../Components/AdminPanel/DataTable/DataTable";
import swal from "sweetalert";
import { useForm } from "./../../../hooks/useForm";
import Input from "./../../../Components/Form/Input";
import { requiredValidator, minValidator } from "../../../validators/Rules";
import Editor from "../../../Components/Form/Editor";
import { Link } from "react-router-dom";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [articleCategory, setArticleCategory] = useState("-1");
  const [articleCover, setArticleCover] = useState({});
  const [articleBody, setArticleBody] = useState("");

  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      shortName: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    getAllArticles();

    fetch(`http://localhost:4000/v1/category`)
      .then((res) => res.json())
      .then((allCategories) => {
        setCategories(allCategories);
      });
  }, []);

  function getAllArticles() {
    fetch("http://localhost:4000/v1/articles", {})
      .then((res) => res.json())
      .then((allArticles) => {
        setArticles(allArticles);
        console.log(allArticles);
      });
  }

  const removeArticle = (articleID) => {
    // delete article
    const localStorageDate = JSON.parse(localStorage.getItem("user"));
    swal({
      title: "Are you sure for delete this Article ?!",
      icon: "warning",
      buttons: ["No", "Yes"],
    }).then((result) => {
      if (result) {
        fetch(`http://localhost:4000/v1/articles/${articleID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageDate.token}`,
          },
        }).then((res) => {
          if (res.ok) {
            swal({
              title: "Article deleted successfully  ",
              icon: "success",
              buttons: "Ok",
            }).then(() => {
              getAllArticles();
            });
          }
        });
      }
    });
  };

  const addNewArticle = (event) => {
    //add new article
    event.preventDefault();

    const localStorageData = JSON.parse(localStorage.getItem("user"));
    let formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    formData.append("shortName", formState.inputs.shortName.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("categoryID", articleCategory);
    formData.append("cover", articleCover);
    formData.append("body", articleBody);

    if (articleCategory === "-1") {
      swal({
        title: "Please select your desired category",
        icon: "warning",
        buttons: "Ok",
      });
    } else {
      fetch(`http://localhost:4000/v1/articles`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
        },
        body: formData,
      }).then((res) => {
        if (res.ok) {
          swal({
            title: "New Article published successfully.",
            icon: "success",
            buttons: "Ok",
          }).then(() => {
            getAllArticles();
          });
        } else {
          swal({
            title: "An error occurred while registering. Please check the data",
            icon: "warning",
            buttons: "Ok",
          });
        }
      });
    }
  };

  const addDraftArticle =(event)=>{
    event.preventDefault();

    const localStorageData = JSON.parse(localStorage.getItem("user"));
    let formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    formData.append("shortName", formState.inputs.shortName.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("categoryID", articleCategory);
    formData.append("cover", articleCover);
    formData.append("body", articleBody);

    if (articleCategory === "-1") {
      swal({
        title: "Please select your desired category",
        icon: "warning",
        buttons: "Ok",
      });
    } else {
      fetch(`http://localhost:4000/v1/articles/draft`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
        },
        body: formData,
      }).then((res) => {
        if (res.ok) {
          swal({
            title: "New Article drafed successfully.",
            icon: "success",
            buttons: "Ok",
          }).then(() => {
            getAllArticles();
          });
        } else {
          swal({
            title: "An error occurred while registering. Please check the data",
            icon: "warning",
            buttons: "Ok",
          });
        }
      });
    }
  }
  return (
    <>
        <div className="container">
      <div className="home-content-edit" id="home-content">
        
          <div className="home-title">
            <span> Add a new Article</span>
          </div>
          <form className="form">
            <div className="col-6">
              <div className="name input">
                <label className="input-title" style={{ display: "block" }}>
                  Article name
                </label>
                <Input
                  id="title"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[requiredValidator(), minValidator(5)]}
                  type="text"
                  placeholder="Please enter the article name..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>

            <div className="col-6">
              <div className="number input">
                <label className="input-title">Article Url</label>
                <Input
                  id="shortName"
                  element="input"
                  onInputHandler={onInputHandler}
                  validations={[requiredValidator(), minValidator(5)]}
                  type="text"
                  isValid="false"
                  placeholder="Please enter the URL of the article..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>

            <div className="col-12">
              <div className="number input">
                <label className="input-title" style={{ display: "block" }}>
                  Abstract
                </label>
                <Input
                  id="description"
                  element="textarea"
                  className="articles-textarea"
                  onInputHandler={onInputHandler}
                  validations={[requiredValidator(), minValidator(5)]}
                  type="text"
                  isValid="false"
                  placeholder="Please enter the Abstract of the article..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>

            <div className="col-12">
              <div className="number input">
                <label className="input-title" style={{ display: "block" }}>
                  Body Article
                </label>
                <Editor value={articleBody} setValue={setArticleBody} />
              </div>
            </div>

            <div className="col-6">
              <div className="number input category-type">
                <label className="input-title category-title">
                  Article category:{" "}
                </label>

                <select
                  onChange={(event) => setArticleCategory(event.target.value)}
                >
                  <option value={-1}>
                    Please select your desired category
                  </option>
                  {categories.map((category) => (
                    <option value={category._id}>{category.title}</option>
                  ))}
                </select>
                <span className="error-message text-danger"></span>
              </div>
            </div>

            <div className="col-6">
              <div className="file article-photo">
                <label className="input-title category-title">
                  Article photo:
                </label>
                <input
                  type="file"
                  id="file"
                  accept="image/png, image/jpeg"
                  onChange={(event) => {
                    console.log(event.target.files[0].name);
                    setArticleCover(event.target.files[0]);
                  }}
                />
              </div>
            </div>

            <div className="col-12">
            
            <div className="article__btns">

                  <button className="userPanel__article__btn "  onClick={addNewArticle}> Submit </button>

                  <button  className="userPanel__article__btn draft_btn "   onClick={addDraftArticle}> Draft</button>
            </div>
           
                
          
            </div>
          </form>
        </div>
      </div>

      <DataTable title="Articles">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Link</th>
              <th>Author</th>
              <th>Status</th>
              <th>View</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {articles &&
              articles.map((article, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{article.title}</td>
                  <td>{article.shortName}</td>
                  {article.creator !== null ? (
                    <td>{article.creator.name}</td>
                  ) : (
                    <td>Null</td>
                  )}
                  <td>{article.publish === 1 ? "Published" : "Draft"}</td>

                 
                  <td> 
                  {article.publish === 1 ? (
                    <i className="fa fa-check"></i> 
                  ):( 
                  
                    <Link to={`draft/${article.shortName}`}className="btn btn-primary edit-btn"> Continue writing  </Link>
                    )}
                    </td>
                 
                  <td>
                    <button type="button" className="btn btn-primary edit-btn">
                      Edit
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger delete-btn"
                      onClick={() => removeArticle(article._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </DataTable>
    </>
  );
}
