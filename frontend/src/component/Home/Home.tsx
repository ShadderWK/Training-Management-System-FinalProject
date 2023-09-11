import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { CourseInterface } from "../../interfaces/ICourse";

import { GetCourses } from "../../service/HttpClientService";

import "./Home.css";

import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import BlogCourse from "./BlogCourse/BlogCourse";

import prElearningPic from "../../assets/pr-elearning.png";

function Home() {
  const [token, setToken] = useState<String>("");
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState<CourseInterface[]>([]);
  const navigate = useNavigate();

  console.log(search);

  const fetchCourses = async () => {
    let res = await GetCourses();
    res && setCourses(res);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    } else {
      navigate("/member");
    }

    fetchCourses();
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <Layout
        style={{
          minHeight: "100vh",
          backgroundColor: "#EAEFFA",
        }}
      >
        <Sidebar />
        <div className="home-container">
          <img src={prElearningPic} />
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
