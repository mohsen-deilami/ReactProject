import React, { useEffect, useState } from 'react'
import Editor from '../../Components/Form/Editor'
import { useParams, Link } from "react-router-dom";
import Articles from './Articles';
import swal from "sweetalert";
export default function Draft() {
    const [articles, setArticles] = useState([]);
const [articleDesc,setArticleDesc]=useState('')
  const [articleCategory, setArticleCategory] = useState("-1");
  const [articleCover, setArticleCover] = useState({});
  const [articleBody, setArticleBody] = useState("");
const {shortName}=useParams()

   useEffect(()=>{
fetch(`http://localhost:4000/v1/articles/${shortName}`,{
    headers:{
        Authorization:`Beare ${localStorage.getItem('user').token}`
    },
}).then(res=>res.json())
.then(data =>{
    setArticles(data)
    setArticleCategory(data.categoryID)
    console.log(data);
})
  },[]) 

const addNewArticle =(event)=>{
    event.preventDefault();

    const localStorageData = JSON.parse(localStorage.getItem("user"));
    let formData = new FormData();
    formData.append("title",articles.title);
    formData.append("shortName", shortName);
    formData.append("description",articleDesc);
    formData.append("categoryID", articleCategory._id);
    formData.append("cover",articleCover);
    formData.append("body", articleBody);
const newobj={
     'title':articles.title,
     'shortName': shortName,
     'description':articleDesc,
     'categoryID': articleCategory._id,
     'cover':articleCover,
     'body': articleBody,
}


console.log('newobj=>', newobj);
 
      fetch(`http://localhost:4000/v1/articles`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
        },
        body: formData,
      }).then((res) => {
        if (res.ok) {return res.json()}
        return res.text()})
        .then(result=>{
            console.log(result);
        })
        /*   swal({
            title: "New Article published successfully.",
            icon: "success",
            buttons: "Ok",
          }).then(() => {
           
          });
        } else {
          swal({
            title: "An error occurred while registering. Please check the data",
            icon: "warning",
            buttons: "Ok",
          }); */
        
     
   

console.log('formdata',formData);
}
const addDraftArticle =()=>{

}  
  return (

    <div className="home-content-edit" id="home-content">
    <div className="back-btn">
      <i className="fas fa-arrow-left"></i>
    </div>
    <div className="container">
      <div className="home-title">
        <span> Add a new Article</span>
      </div>
      <form className="form">
        <div className="col-6">
          <div className="name input">
            <label className="input-title" style={{ display: "block" }}>
              Article name
            </label>
            <input
              type="text"
              placeholder="Please enter the article name..."
              value={articles.title}
            />
            <span className="error-message text-danger"></span>
          </div>
        </div>

        <div className="col-6">
          <div className="number input">
            <label className="input-title">Article Url</label>
            <input
             type="text"  
              placeholder="Please enter the URL of the article..."
              value={articles.shortName}
            />
            <span className="error-message text-danger"></span>
          </div>
        </div>

        <div className="col-12">
          <div className="number input">
            <label className="input-title" style={{ display: "block" }}>
              Abstract
            </label>
         
            <textarea name="" placeholder="Please enter the Abstract of the article..." 
             className="form-control articles-textarea " rows="3" required="required"
              value={articleDesc} onChange={(event)=>setArticleDesc(event.target.value)}>
               
             </textarea>
   
            <span className="error-message text-danger"></span>
          </div>
        </div>

        <div className="col-12">
          <div className="number input">
            <label className="input-title" style={{ display: "block" }}>
              Body Article
            </label>
            <Editor  value={articles.body} setValue={setArticleBody}/>
          </div>
        </div>

        <div className="col-6">
          <div className="number input category-type">
            <label className="input-title category-title">
              Article category:{" "}
            </label>
{articleCategory && (

    <input type="text" value={articleCategory.name}/>

)}
         
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
             
                setArticleCover(event.target.files[0]);
              }}
            />
          </div>
        </div>

        <div className="col-12">
          <div className="bottom-form">
            <div className="submit-btn">
              <input
                type="submit"
                value="Publish"
                className="m-1"
               onClick={addNewArticle}
              />

              <input
                type="submit"
                value="Draft"
                className="m-1"
               onClick={addDraftArticle}
              />

          
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
  )
}
