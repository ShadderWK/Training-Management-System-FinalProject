import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "antd";

import {
  GetCourseByID,
  CreateCourseRegistration,
} from "../../service/HttpClientService";

import { CourseInterface } from "../../interfaces/ICourse";

import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

import "./CourseReg.css";

function CourseReg() {
  const { id } = useParams();
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<String>("");
  const [course, setCourse] = useState<CourseInterface>({});
  const navigate = useNavigate();
  const defaultSelectedKeys = ["1"];

  const fetchCourse = async () => {
    let res = await GetCourseByID(id + "");
    res && setCourse(res);
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

    fetchCourse();
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

        <div className="course-reg-container">
          <h1>{course.Name}</h1>
          <img src={course.Image} width="500px" />
          <p>{course.Detail}</p>
          <p>ราคา : {course.Price} บาท</p>
          <button onClick={() => navigate(`/member/course-purchase/${id}`)}>
            สั่งซื้อ
          </button>
        </div>
      </Layout>
    </div>
  );
}

export default CourseReg;
