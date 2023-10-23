import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";
import { CaretRightOutlined, CaretLeftOutlined } from "@ant-design/icons";

import { GetCourseRegistrationByMemberID } from "../../service/HttpClientService";

import { CourseRegistrationInterface } from "../../interfaces/ICourseRegistration";

import "./MyCourse.css";

import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import BlogCourse from "../Home/BlogCourse/BlogCourse";

function MyCourse() {
  const [courseReg, setCourseReg] = useState<CourseRegistrationInterface[]>([]);
  const Uid = localStorage.getItem("uid") + "";
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<String>("");
  const navigate = useNavigate();
  const defaultSelectedKeys = ["2"];
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const fetchCourseRegistrationByMemberID = async () => {
    let res = await GetCourseRegistrationByMemberID(Uid + "", "2");
    res && setCourseReg(res);
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

    fetchCourseRegistrationByMemberID();
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

        <div className="mycourse-container">
          <h1>การอบรมของฉัน</h1>
          <div className="mycourse-section">
            {courseReg
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((item) => {
                return (
                  <BlogCourse
                    key={item.ID!}
                    id={item.CourseID!}
                    name={item.Course?.Name!}
                    image={item.Course?.Image!}
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
              disabled={currentPage * itemsPerPage >= courseReg.length}
            >
              <CaretRightOutlined />
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default MyCourse;
