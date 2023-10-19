import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

import {
  TeamOutlined,
  InfoCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import NavbarAdmin from "../Navbar/NavbarAdmin";
import SidebarAdmin from "../Sidebar/SidebarAdmin";

import { CourseInterface } from "../../interfaces/ICourse";

import { GetCourses } from "../../service/HttpClientService";

import "./ListRegCourse.css";

function ListRegCourse() {
  const [course, setCourse] = useState<CourseInterface[]>([]);
  const [filteredData, setFilteredData] = useState<CourseInterface[]>([]);
  const [filterActive, setFilterActive] = useState(false);
  const [filterDisable, setFilterDisable] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<String>("");
  const navigate = useNavigate();
  const defaultSelectedKeys = ["2"];

  const columns: ColumnsType<CourseInterface> = [
    {
      title: "รหัสการอบรม",
      dataIndex: "ID",
      key: "ID",
      align: "center",
    },

    {
      title: "หัวข้อการอบรม",
      dataIndex: "Name",
      key: "ID",
      align: "left",
    },

    {
      title: "สถานะ",
      dataIndex: ["CourseStatus", "Status"],
      key: "ID",
      align: "center",
    },

    {
      title: "ดูข้อมูลการอบรม",
      key: "action",
      align: "center",
      render: (record) => (
        <span className="icon-table">
          <InfoCircleOutlined
            style={{
              fontSize: "20px",
              justifyContent: "center",
              alignItems: "center",
              color: "#1890ff",
            }}
            onClick={() => navigate(`/admin/course/${record.ID}`)}
          />
        </span>
      ),
    },

    {
      title: "ดูรายชื่อผู้สมัคร",
      key: "action",
      align: "center",
      render: (record) => (
        <span className="icon-table">
          <TeamOutlined
            style={{
              fontSize: "20px",
              justifyContent: "center",
              alignItems: "center",
              color: "#1890ff",
            }}
            onClick={() => navigate(`/admin/list-course/${record.ID}`)}
          />
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

    if (filterActive) {
      const filteredCourse = course.filter(
        (item) => item.CourseStatus?.Status === "เปิดใช้งาน"
      );
      setFilteredData(filteredCourse);
    } else {
      setFilteredData(course);
    }

    let filteredCourse = course;

    if (filterActive && filterDisable) {
      filteredCourse = course;
    } else if (filterActive) {
      filteredCourse = course.filter(
        (item) => item?.CourseStatus?.Status === "เปิดใช้งาน"
      );
    } else if (filterDisable) {
      filteredCourse = course.filter(
        (item) => item?.CourseStatus?.Status === "ปิดใช้งาน"
      );
    }

    if (searchText) {
      filteredCourse = filteredCourse.filter((item) =>
        item?.Name?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredData(filteredCourse);

    fetchCourses();
  }, [course, filterActive, filterDisable]);

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
          <h1>การอบรมทั้งหมดในปัจจุบัน</h1>

          <div className="list-course-section">
            <button onClick={() => navigate(`/admin/add-course`)}>
              เพิ่มการอบรม
            </button>

            <div className="list-course-filter">
              <div className="list-course-checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={filterActive}
                    onChange={() => setFilterActive(!filterActive)}
                  />
                  เปิดใช้งาน
                </label>

                <label>
                  <input
                    type="checkbox"
                    checked={filterDisable}
                    onChange={() => setFilterDisable(!filterDisable)}
                  />
                  ปิดใช้งาน
                </label>
              </div>

              <div className="list-course-input">
                <input
                  type="text"
                  placeholder="ชื่อการอบรม..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <SearchOutlined style={{ color: "#2B56BA" }} />
              </div>
            </div>
          </div>

          <Table
            columns={columns}
            dataSource={filteredData}
            scroll={{ x: 1200 }}
          />
        </div>
      </Layout>
    </div>
  );
}

export default ListRegCourse;
