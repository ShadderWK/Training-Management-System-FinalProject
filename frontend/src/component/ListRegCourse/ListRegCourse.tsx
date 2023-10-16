import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TeamOutlined } from "@ant-design/icons";

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

  const columns: ColumnsType<CourseInterface> = [
    {
      title: "รหัสคอร์ส",
      dataIndex: "ID",
      key: "ID",
      align: "center",
    },

    {
      title: "ชื่อคอร์ส",
      dataIndex: "Name",
      key: "ID",
      align: "left",
    },

    {
      title: "ดูรายชื่อผู้สมัคร",
      key: "action",
      align: "center",
      render: (record) => (
        <span>
          <button
            className="listcourse-btn"
            onClick={() => navigate(`/admin/list-course/${record.ID}`)}
          >
            <TeamOutlined />
            <span className="button-text">ดูรายชื่อ</span>
          </button>
        </span>
      ),
    },
  ];

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
  }, [course]);

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

          <Table columns={columns} dataSource={course} scroll={{ x: 900 }} />
        </div>
      </Layout>
    </div>
  );
}

export default ListRegCourse;
