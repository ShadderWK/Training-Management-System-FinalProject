import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Carousel } from "antd";
import {
  SearchOutlined,
  CaretRightOutlined,
  CaretLeftOutlined,
} from "@ant-design/icons";

import { CourseInterface } from "../../interfaces/ICourse";
import { NewsInterface } from "../../interfaces/INews";

import {
  GetCoursesByCourseStatusID,
  GetNews,
} from "../../service/HttpClientService";

import "./Home.css";

import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import BlogCourse from "./BlogCourse/BlogCourse";

import NewsImg from "../../assets/NewsImg1.jpg";

function Home() {
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<String>("");
  const [search, setSearch] = useState("");
  const [news, setNews] = useState<NewsInterface[]>([]);
  const [courses, setCourses] = useState<CourseInterface[]>([]);
  const navigate = useNavigate();
  const defaultSelectedKeys = ["1"];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const fetchCourseByCourseStatusID = async () => {
    let res = await GetCoursesByCourseStatusID("1");
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

    const role = localStorage.getItem("Role");
    if (role === "member") {
      setRole(role);
    } else {
      localStorage.clear();
    }

    fetchNews();
    fetchCourseByCourseStatusID();

    window.removeEventListener("popstate", () => {
      navigate("/member/home");
    });
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
        <Sidebar defaultSelectedKeys={defaultSelectedKeys} />

        <div className="home-container">
          <div className="carousel-container">
            <Carousel
              autoplay
              style={{
                width: "100%",
              }}
            >
              <img className="img-carousel" src={NewsImg} />

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
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
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

          <div className="home-pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <CaretLeftOutlined />
            </button>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                currentPage * itemsPerPage >=
                courses.filter((item) =>
                  search.toLowerCase() === ""
                    ? item
                    : item.Name?.toLowerCase().includes(search)
                ).length
              }
            >
              <CaretRightOutlined />
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Home;
