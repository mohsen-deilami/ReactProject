import React, { useEffect, useState } from "react";
import "./LastArticles.css";
import SectionHeader from "../SectionHeader/SectionHeader";
import ArticleBox from "../ArticleBox/ArticleBox";
export default function LastArticles() {
  const [articles,setArticles]=useState([]);

  useEffect(()=>{
fetch(`http://localhost:4000/v1/articles`)
.then(res=>res.json())
.then(allArticles=>setArticles(allArticles))
  },[])
  return (
    <section className="articles">
      <div className="container">
        <SectionHeader
          title={"Latest Articles"}
          describe={"Towards the advancement of Knowledge...!"}
          btn={"All Articles"}
          btnHref="/articles/1"
        />
      </div>
      <div className="articles__content">
        <div className="container">
          <div className="row">
            {articles.filter(article => article.publish === 1  ).reverse().slice(0,3).map(article =>(

              <ArticleBox {...article} key={article._id}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
