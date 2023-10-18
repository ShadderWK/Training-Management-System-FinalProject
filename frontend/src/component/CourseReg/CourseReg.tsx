import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout, Image } from "antd";

import { GetCourseByID } from "../../service/HttpClientService";

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
            <div className="course-reg-img">
              <Image
                src={course.Image}
                style={{
                  borderRadius: "20px",
                  padding: "10px",
                  backgroundColor: "#fff",
                }}
              />
            </div>

            <div className="course-reg-detail">
              <h1>{course.Name}</h1>

              <p>
                <span>รหัสการอบรม :</span> {course.ID}
              </p>

              <p>
                <span>ราคา :</span> {course.Price} บาท
              </p>

              <p>
                <span>รายละเอียดการอบรม :</span> {course.Detail}
              </p>

              <p>
                {course.CreatedAt ? (
                  <>
                    <span>วันที่เพิ่มการอบรม : </span>

                    {new Date(course.CreatedAt).toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </>
                ) : (
                  "วันที่เพิ่มการอบรม: ไม่มีข้อมูล"
                )}
              </p>

              <button onClick={() => navigate(`/member/course-purchase/${id}`)}>
                สั่งซื้อการอบรม
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default CourseReg;
