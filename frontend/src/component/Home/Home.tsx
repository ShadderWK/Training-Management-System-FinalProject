import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";
import { Carousel } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { CourseInterface } from "../../interfaces/ICourse";
import { NewsInterface } from "../../interfaces/INews";

import { GetCourses, GetNews } from "../../service/HttpClientService";

import "./Home.css";

import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import BlogCourse from "./BlogCourse/BlogCourse";

import NewsImg from "../../assets/NewsImg1.jpg";
import prElearningPic from "../../assets/pr-elearning.png";
import Logo from "../../assets/MemberLogin1.png";

function Home() {
  const [token, setToken] = useState<String>("");
  const [search, setSearch] = useState("");
  const [news, setNews] = useState<NewsInterface[]>([]);
  const [courses, setCourses] = useState<CourseInterface[]>([]);
  const navigate = useNavigate();

  console.log(search);

  const fetchCourses = async () => {
    let res = await GetCourses();
    res && setCourses(res);
  };

  const fetchNews = async () => {
    let res = await GetNews();
    res && setNews(res);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    } else {
      navigate("/member");
    }

    fetchNews();
    fetchCourses();
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <Layout
        style={{
          maxWidth: "100vw",
          minHeight: "100vh",
          backgroundColor: "#EAEFFA",
        }}
      >
        <Sidebar />

        <div className="home-container">
          <div className="carousel-container">
            <Carousel
              autoplay
              style={{
                width: "100%",
                maxWidth: "80vw",
              }}
            >
              <div>
                <img className="img-carousel" src={NewsImg} />
              </div>
              {news.map((item, index) => (
                <div key={index}>
                  <img
                    className="img-carousel"
                    src={item.Image}
                    alt={`News ${index}`}
                  />
                </div>
              ))}
            </Carousel>
          </div>

          <div className="home-title-search">
            <h1>การอบรมและสัมนา</h1>
            <div className="home-search-container">
              <input
                id="search"
                name="search"
                placeholder="ค้นหา"
                onChange={(e) => setSearch(e.target.value)}
              />
              <SearchOutlined
                className="home-search-icon"
                style={{ color: "#2B56BA", width: "24px", height: "24px" }}
              />
            </div>
          </div>

          <div className="home-blogcourse">
            {courses
              .filter((item) => {
                return search.toLowerCase() === ""
                  ? item
                  : item.Name?.toLowerCase().includes(search);
              })
              .sort((a, b) => (b?.ID ?? 0) - (a?.ID ?? 0))
              .map((item) => {
                return (
                  <BlogCourse
                    key={item.ID!}
                    id={item.ID!}
                    name={item.Name!}
                    image={item.Image!}
                  />
                );
              })}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Home;
