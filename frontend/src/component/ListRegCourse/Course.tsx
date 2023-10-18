import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout, Popconfirm, Image } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";

import NavbarAdmin from "../Navbar/NavbarAdmin";
import SidebarAdmin from "../Sidebar/SidebarAdmin";

import {
  GetCourseByID,
  DeleteCourse,
  UpdateCourse,
} from "../../service/HttpClientService";

import { CourseInterface } from "../../interfaces/ICourse";

import "./Course.css";

function Course() {
  const { id } = useParams();
  const [course, setCourse] = useState<CourseInterface>({});
  const [status, setStatus] = useState<String>("");
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<String>("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const defaultSelectedKeys = ["2"];

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  const fetchCourse = async () => {
    let res = await GetCourseByID(id + "");
    res && setCourse(res);
  };

  const DeleteCourses = async (id: string) => {
    let res = await DeleteCourse(id);
    if (res) {
      navigate(`/admin/list-reg-course`);
    }
  };

  const submitActive = async () => {
    let data = {
      ID: convertType(id),
      AdminID: course.AdminID,
      CourseStatusID: 1,
    };
    console.log(data);

    let res = await UpdateCourse(data);
    if (res.status) {
      setSuccess(true);
      window.location.reload();
    } else {
      setError(true);
    }
    console.log(JSON.stringify(data));
  };

  const submitDisable = async () => {
    let data = {
      ID: convertType(id),
      AdminID: course.AdminID,
      CourseStatusID: 2,
    };
    console.log(data);

    let res = await UpdateCourse(data);
    if (res.status) {
      setSuccess(true);
      window.location.reload();
    } else {
      setError(true);
    }
    console.log(JSON.stringify(data));
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

    fetchCourse();
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
        <div className="course-container">
          <div className="course-img-status">
            <div className="course-img-container">
              <div className="course-img">
                <Image
                  src={course.Image}
                  style={{
                    borderRadius: "20px",
                    padding: "10px",
                    backgroundColor: "#fff",
                  }}
                />
              </div>
            </div>

            <div className="course-status-section">
              <h1>{course.Name}</h1>
              <p>
                <span>รหัสการอบรม : </span> {course.ID}
              </p>

              <p>
                <span>สถานะการใช้งาน : </span>
                {course.CourseStatus?.Status}
              </p>

              <div className="course-btn">
                <button className="course-btn-active" onClick={submitActive}>
                  เปิดใช้งาน
                </button>
                <button className="course-btn-disable" onClick={submitDisable}>
                  ปิดใช้งาน
                </button>
              </div>

              <p>
                <span>รายละเอียด : </span>
                {course.Detail}
              </p>

              <p>
                <span>ราคา : </span>
                {course.Price?.toLocaleString()} บาท
              </p>

              <p>
                <span>เอกสาร : </span>
                <a href={course.Pdf} target="_blank" download>
                  <span className="course-pdf">
                    <FilePdfOutlined /> ดาวน์โหลดเอกสาร
                  </span>
                </a>
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

              <p>
                {course.UpdatedAt ? (
                  <>
                    <span>วันที่ทำการแก้ไขล่าสุด : </span>

                    {new Date(course.UpdatedAt).toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </>
                ) : (
                  "วันที่ทำการแก้ไขล่าสุด: ไม่มีข้อมูล"
                )}
              </p>

              <p>
                <span>ผู้ที่ทำการสร้าง : </span> {course.Admin?.Name}
              </p>
            </div>
          </div>

          <div className="course-btn-section">
            <button
              className="course-btn-edit"
              onClick={() => navigate(`/admin/update-course/${id}`)}
            >
              แก้ไขการอบรม
            </button>

            <Popconfirm
              title="คุณแน่ใจว่าจะลบการอบรมนี้ใช่หรือไม่"
              description="การลบการอบรมจะไม่สามารถกู้คืนได้"
              onConfirm={() => DeleteCourses(id + "")}
              okText="ตกลง"
              cancelText="ไม่"
            >
              <button className="course-btn-disable">ลบการอบรม</button>
            </Popconfirm>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default Course;
