/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./Search.css";
import Navbar from "../../Components/Navbar/Navbar";
import Topbar from "../../Components/Topbar/Topbar";
import Footer from "../../Components/Footer/Footer";
import SectionHeader from "../../Components/SectionHeader/SectionHeader";
import CourseBox from "../../Components/CourseBox/CourseBox";
import ArticleBox from "../../Components/ArticleBox/ArticleBox";
import { useParams } from "react-router-dom";

export default function Search() {
  const [courses, setCourses] = useState([]);
  const [articles, setArticles] = useState([]);
  const { value } = useParams();
  useEffect(() => {
    fetch(`http://localhost:4000/v1/search/${value}`)
      .then((res) => res.json())
      .then((allSearch) => {
        console.log(allSearch);
        setCourses(allSearch.allResultCourses);
        setArticles(allSearch.allResultArticles );
      });
  }, []);
  return (
    <div>
      <Topbar />
      <Navbar />
      <div className="courses">
        <div className="container">
              <SectionHeader
                title={"The result of Courses for your search"}
                describe={"all courses in site"}
              />
          <div className="courses-content">
            <div className="container">
            <div className="row">
              {courses.length === 0 ? (
                <div className="alert alert-danger">
                  There is no course for this search
                </div>
              ) : (
                <>
               {courses.map(course =>(
                    <CourseBox {...course} key={course.id}/>

                ))} 
                </>
              )}
            </div>
            </div>
          </div>
              <SectionHeader
                title={"The result of Articles for your search"}
                describe={"all Articles in site"}
              />
          <div className="courses-content">
            <div className="container">
            <div className="row">
              {articles.length === 0 ? (
                <div className="alert alert-danger">
                  There is no articles for this search
                </div>
              ) : (
                <>
               {articles.map(article =>(
                    <ArticleBox {...article} key={article.id}/>

                ))} 
                </>
              )}
            </div>
            </div>
          </div>


        </div>
      </div>

      <Footer />
    </div>
  );
}
