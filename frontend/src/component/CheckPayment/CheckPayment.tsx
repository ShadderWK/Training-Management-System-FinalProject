import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PictureOutlined } from "@ant-design/icons";

import NavbarAdmin from "../Navbar/NavbarAdmin";
import SidebarAdmin from "../Sidebar/SidebarAdmin";

import { GetCourseRegistrations } from "../../service/HttpClientService";

import { CourseRegistrationInterface } from "../../interfaces/ICourseRegistration";

import "./CheckPayment.css";

function CheckPayment() {
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<String>("");
  const [courseReg, setCourseReg] = useState<CourseRegistrationInterface[]>([]);
  const [filterChecked, setFilterChecked] = useState(false);
  const [filteredData, setFilteredData] = useState<
    CourseRegistrationInterface[]
  >([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const { Column } = Table;
  const navigate = useNavigate();
  const defaultSelectedKeys = ["4"];

  const columns: ColumnsType<CourseRegistrationInterface> = [
    {
      title: "หมายคำสั่งซื้อ",
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
      title: "คอร์สที่สมัคร",
      dataIndex: ["Course", "Name"],
      key: "Course.Name",
      align: "center",
    },

    {
      title: "สถานะ",
      dataIndex: ["PaymentStatus", "Status"],
      key: "PaymentStatus.Status",
      align: "center",
    },

    {
      title: "ตรวจสอบสลิป",
      key: "action",
      align: "center",
      render: (record) => (
        <span className="icon-table">
          <PictureOutlined
            style={{
              fontSize: "20px",
              justifyContent: "center",
              alignItems: "center",
              color: "#1890ff",
            }}
            onClick={() => navigate(`/admin/change-status/${record.ID}`)}
          />
        </span>
      ),
    },
  ];

  const fetchCourseRegistrations = async () => {
    let res = await GetCourseRegistrations();
    res && setCourseReg(res);
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

    if (filterChecked) {
      const filteredCourseReg = courseReg.filter(
        (item) => item.PaymentStatus?.Status === "รอการตรวจสอบ"
      );
      setFilteredData(filteredCourseReg);
    } else {
      setFilteredData(courseReg);
    }

    fetchCourseRegistrations();
  }, [filterChecked, courseReg]);

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
        <div className="check-payment-container">
          <div className="check-payment-title">
            <h1>ตรวจสอบการชำระเงิน</h1>

            <label>
              <input
                type="checkbox"
                checked={filterChecked}
                onChange={() => setFilterChecked(!filterChecked)}
              />
              รอการตรวจสอบ
            </label>
          </div>

          <Table
            columns={columns}
            dataSource={filteredData}
            scroll={{ x: 900 }}
          />
        </div>
      </Layout>
    </div>
  );
}
export default CheckPayment;
