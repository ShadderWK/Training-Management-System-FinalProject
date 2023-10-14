import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "antd";

import NavbarAdmin from "../Navbar/NavbarAdmin";
import SidebarAdmin from "../Sidebar/SidebarAdmin";

import { CourseInterface } from "../../interfaces/ICourse";

import { GetCourses } from "../../service/HttpClientService";

import "./ListRegCourse.css";

function ListRegCourse() {
  const [course, setCourse] = useState<CourseInterface[]>([]);
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<String>("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const defaultSelectedKeys = ["5"];

  const fetchCourses = async () => {
    let res = await GetCourses();
    res && setCourse(res);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    } else {
      navigate("/");
    }

    const role = localStorage.getItem("Role");
    if (role === "admin") {
      setRole(role);
    } else {
      localStorage.clear();
    }

    fetchCourses();
  }, []);

  return (
    <div>
      <NavbarAdmin />
      <Layout
        style={{
          maxWidth: "100vw",
          minHeight: "100vh",
          backgroundColor: "#EAEFFA",
        }}
      >
        <SidebarAdmin defaultSelectedKeys={defaultSelectedKeys} />
        <div className="list-course-container">
          <h1>รายชื่อคอร์สในปัจจุบัน</h1>

          <div>
            <table className="check-payment-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>ชื่อคอร์ส</th>
                  <th>เช็ครายชื่อคนที่สมัคร</th>
                </tr>
              </thead>
              <tbody>
                {course.map((item, index) => (
                  <tr key={index}>
                    <td>{item.ID}</td>
                    <td style={{ textAlign: "left" }}>{item.Name}</td>
                    <td style={{ justifyContent: "center" }}>
                      <button
                        className="listcourse-btn"
                        onClick={() =>
                          navigate(`/admin/list-course/${item.ID}`)
                        }
                      >
                        ดูรายชื่อ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default ListRegCourse;
