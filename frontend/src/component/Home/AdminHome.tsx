import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";
import {
  MoneyCollectOutlined,
  MehOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

import NavbarAdmin from "../Navbar/NavbarAdmin";
import SidebarAdmin from "../Sidebar/SidebarAdmin";

import {
  GetCountCourseRegistrationByPaymentStatusID,
  GetSumCourseRegistrationPrice,
} from "../../service/HttpClientService";

import "./AdminHome.css";

function AdminHome() {
  const [count1, setCount1] = useState<string>("");
  const [count2, setCount2] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<String>("");
  const navigate = useNavigate();
  const defaultSelectedKeys = ["1"];

  const fetchCountCourseRegistrationByPaymentStatusID1 = async () => {
    let res = await GetCountCourseRegistrationByPaymentStatusID("1");
    res && setCount1(res);
  };

  const fetchCountCourseRegistrationByPaymentStatusID2 = async () => {
    let res = await GetCountCourseRegistrationByPaymentStatusID("2");
    res && setCount2(res);
  };

  const fetchSumCourseRegistrationPrice = async () => {
    let res = await GetSumCourseRegistrationPrice("2");
    res && setPrice(res);
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

    fetchCountCourseRegistrationByPaymentStatusID1();
    fetchCountCourseRegistrationByPaymentStatusID2();
    fetchSumCourseRegistrationPrice();
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
        <div className="adminHome-container">
          <h1>Dashboard Admin</h1>
          <div className="adminHome-section">
            <div className="adminHome-block">
              <CheckCircleOutlined
                style={{ fontSize: "40px", color: "#52c41a" }}
              />
              <p>จำนวนผู้สมัครที่ยืนยันแล้ว</p>
              <p className="adminHome-value">
                {isNaN(parseInt(count2))
                  ? "0"
                  : parseInt(count2).toLocaleString()}{" "}
                คน
              </p>
            </div>

            <div className="adminHome-block">
              <MehOutlined style={{ fontSize: "40px", color: "#faad14" }} />
              <p>จำนวนผู้สมัครที่รอการตรวจสอบ</p>
              <p className="adminHome-value">
                {isNaN(parseInt(count1))
                  ? "0"
                  : parseInt(count1).toLocaleString()}{" "}
                คน
              </p>
            </div>

            <div className="adminHome-block">
              <MoneyCollectOutlined
                style={{ fontSize: "40px", color: "#1890ff" }}
              />
              <p>รายได้ทั้งหมด</p>
              <p className="adminHome-value">
                {isNaN(parseInt(price))
                  ? "0"
                  : parseInt(price).toLocaleString()}{" "}
                บาท
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default AdminHome;
