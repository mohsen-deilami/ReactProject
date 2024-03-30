import React, { useEffect, useState } from "react";
import "./Articles.css";
import ArticleBox from "../../Components/ArticleBox/ArticleBox";
import Navbar from "../../Components/Navbar/Navbar";
import Topbar from "../../Components/Topbar/Topbar";
import Breadcrumb from "../../Components/Breadcrumb/Breadcrumb";
import Footer from "../../Components/Footer/Footer";
import Pagination from "../../Components/Pagination/Pagination";
export default function Articles() {
  const [allArticles, setAllArticles] = useState([]);
  const [shownItems,setShownItems]=useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles`)
      .then((res) => res.json())
      .then((articles) => {
        setAllArticles(articles);
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
            title: "All Articles ",
            to: "articles/1",
          },
        ]}
      />
      <section className="courses">
        <div className="container">
      <div className="courses-content">
        <div className="container">
          <div className="row">
            {allArticles && (
              <>
                {shownItems.filter(article=>article.publish===1).map((article) => (
                   <ArticleBox {...article} key={article}/>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      <Pagination
      items={allArticles} itemCount={3} pathname='/articles' setShownItems={setShownItems}
      /> 
      </div>
      </section>
      <Footer />
    </div>
  );
}
