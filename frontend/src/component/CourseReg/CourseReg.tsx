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
          <div className="course-reg-title">
            <img src={course.Image} width="500px" />

            <div className="course-reg-detail">
              <h1>{course.Name}</h1>
              <p>
                <span>รายละเอียดคอร์ส :</span> {course.Detail}
              </p>
              <p>
                <span>ราคา :</span> {course.Price} บาท
              </p>
              <p>
                <span>รหัสคอร์ส :</span> {course.ID}
              </p>
            </div>
          </div>

          <button onClick={() => navigate(`/member/course-purchase/${id}`)}>
            สั่งซื้อคอร์ส
          </button>
        </div>
      </Layout>
    </div>
  );
}

export default CourseReg;
