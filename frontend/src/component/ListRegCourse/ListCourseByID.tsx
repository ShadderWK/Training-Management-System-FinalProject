import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import * as XLSX from "xlsx";

import NavbarAdmin from "../Navbar/NavbarAdmin";
import SidebarAdmin from "../Sidebar/SidebarAdmin";

import { CourseInterface } from "../../interfaces/ICourse";
import { CourseRegistrationInterface } from "../../interfaces/ICourseRegistration";

import {
  GetCourseRegistrationByCourseID,
  GetCourseByID,
} from "../../service/HttpClientService";

import "./ListCourseByID.css";

function ListCourseByID() {
  const { id } = useParams();
  const [course, setCourse] = useState<CourseInterface>({});
  const [courseReg, setCourseReg] = useState<CourseRegistrationInterface[]>([]);
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<String>("");

  const columns: ColumnsType<CourseRegistrationInterface> = [
    {
      title: "หมายเลขคำสั่งซื้อ",
      dataIndex: "ID",
      key: "ID",
      align: "center",
    },

    {
      title: "ชื่อ-นามสกุล",
      dataIndex: "Member",
      render: (text, record) =>
        `${record?.Member?.Firstname || ""} ${record?.Member?.Lastname || ""}`,
      key: "Name",
      align: "center",
    },

    {
      title: "เบอร์โทรศัพท์",
      dataIndex: ["Member", "Tel"],
      key: "Member.Tel",
      align: "center",
    },

    {
      title: "อีเมล",
      dataIndex: ["Member", "Email"],
      key: "Member.Email",
      align: "center",
    },
  ];

  const navigate = useNavigate();
  const defaultSelectedKeys = ["5"];

  const fetchCourseByID = async () => {
    let res = await GetCourseByID(id + "");
    res && setCourse(res);
  };

  const fetchCourseRegistrationByCourseID = async () => {
    let res = await GetCourseRegistrationByCourseID(id + "", "2");
    res && setCourseReg(res);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      courseReg.map((item) => ({
        หมายเลขคำสั่งซื้อ: item.ID,
        ชื่อคนสมัคร: `${item.Member?.Firstname} ${item.Member?.Lastname}`,
        อีเมล: item.Member?.Email,
        เบอร์โทรติดต่อ: item.Member?.Tel,
      }))
    );

    const wscols = [{ wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }];

    ws["!cols"] = wscols;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Course Registration Data");
    XLSX.writeFile(wb, `รายชื่อผู้สมัคร ${course.Name}.xlsx`);
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

    fetchCourseByID();
    fetchCourseRegistrationByCourseID();
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
        <div className="list-course-byid-container">
          <h1>รายชื่อผู้สมัครการอบรม</h1>
          <h1>{course.Name}</h1>
          <button onClick={exportToExcel}>ส่งออกเป็นไฟล์ Excel</button>

          <Table columns={columns} dataSource={courseReg} scroll={{ x: 900 }} />
        </div>
      </Layout>
    </div>
  );
}

export default ListCourseByID;
