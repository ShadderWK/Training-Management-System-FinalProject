import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";
import {
  MoneyCollectOutlined,
  MehOutlined,
  CheckCircleOutlined,
  UserOutlined,
  SolutionOutlined,
} from "@ant-design/icons";

import NavbarAdmin from "../Navbar/NavbarAdmin";
import SidebarAdmin from "../Sidebar/SidebarAdmin";

import {
  GetCountCourseRegistrationByPaymentStatusID,
  GetSumCourseRegistrationPrice,
  GetCountMembers,
  GetCountCoursesByCourseStatusID,
} from "../../service/HttpClientService";

import "./AdminHome.css";

function AdminHome() {
  const [count1, setCount1] = useState<string>("");
  const [count2, setCount2] = useState<string>("");
  const [countMember, setCountMember] = useState<string>("");
  const [countCourse, setCountCourse] = useState<string>("");
  const [price1, setPrice1] = useState<string>("");
  const [price2, setPrice2] = useState<string>("");
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

  const fetchSumCourseRegistrationPrice1 = async () => {
    let res = await GetSumCourseRegistrationPrice("2");
    res && setPrice1(res);
  };

  const fetchSumCourseRegistrationPrice2 = async () => {
    let res = await GetSumCourseRegistrationPrice("1");
    res && setPrice2(res);
  };

  const fetchCountCoursesByCourseStatusID = async () => {
    let res = await GetCountCoursesByCourseStatusID("1");
    res && setCountCourse(res);
  };

  const fetchCountMember = async () => {
    let res = await GetCountMembers();
    res && setCountMember(res);
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
    fetchSumCourseRegistrationPrice1();
    fetchSumCourseRegistrationPrice2();
    fetchCountCoursesByCourseStatusID();
    fetchCountMember();
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
            <div
              className="adminHome-block"
              onClick={() => navigate("/admin/check-payment")}
            >
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

            <div
              className="adminHome-block"
              onClick={() => navigate("/admin/check-payment")}
            >
              <MehOutlined style={{ fontSize: "40px", color: "#faad14" }} />
              <p>จำนวนผู้สมัครที่รอการตรวจสอบ</p>
              <p className="adminHome-value">
                {isNaN(parseInt(count1))
                  ? "0"
                  : parseInt(count1).toLocaleString()}{" "}
                คน
              </p>
            </div>

            <div
              className="adminHome-block"
              onClick={() => navigate("/admin/check-payment")}
            >
              <MoneyCollectOutlined
                style={{ fontSize: "40px", color: "#1890ff" }}
              />
              <p>รายได้ทั้งหมด</p>
              <p className="adminHome-value">
                {isNaN(parseInt(price1))
                  ? "0"
                  : parseInt(price1).toLocaleString()}{" "}
                บาท
              </p>
            </div>

            <div
              className="adminHome-block"
              onClick={() => navigate("/admin/list-member")}
            >
              <UserOutlined style={{ fontSize: "40px", color: "#d6dff5" }} />
              <p>จำนวนสมาชิกทั้งหมด</p>
              <p className="adminHome-value">
                {isNaN(parseInt(countMember))
                  ? "0"
                  : parseInt(countMember).toLocaleString()}{" "}
                คน
              </p>
            </div>

            <div
              className="adminHome-block"
              onClick={() => navigate("/admin/list-reg-course")}
            >
              <SolutionOutlined
                style={{ fontSize: "40px", color: "#5980d9" }}
              />
              <p>จำนวนการอบรมที่เปิดใช้งานทั้งหมด</p>
              <p className="adminHome-value">
                {isNaN(parseInt(countCourse))
                  ? "0"
                  : parseInt(countCourse).toLocaleString()}{" "}
                การอบรม
              </p>
            </div>

            <div
              className="adminHome-block"
              onClick={() => navigate("/admin/check-payment")}
            >
              <MoneyCollectOutlined
                style={{ fontSize: "40px", color: "#ff4d4f" }}
              />
              <p>จำนวนเงินรอการตรวจสอบ</p>
              <p className="adminHome-value">
                {isNaN(parseInt(price2))
                  ? "0"
                  : parseInt(price2).toLocaleString()}{" "}
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
