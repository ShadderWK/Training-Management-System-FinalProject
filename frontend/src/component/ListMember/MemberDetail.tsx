import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout, Image } from "antd";
import { MoneyCollectOutlined, SolutionOutlined } from "@ant-design/icons";

import NavbarAdmin from "../Navbar/NavbarAdmin";
import SidebarAdmin from "../Sidebar/SidebarAdmin";

import { MemberInterface } from "../../interfaces/IMember";

import {
  GetMemberByID,
  GetCountCoursesRegistraionByMemberID,
  GetSumCourseRegistrationPricesByMemberID,
} from "../../service/HttpClientService";

import "./MemberDetail.css";

function MemberDetail() {
  const { id } = useParams();
  const [member, setMember] = useState<MemberInterface>({});
  const [countCourse, setCountCourse] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<String>("");
  const navigate = useNavigate();
  const defaultSelectedKeys = ["3"];

  const fetchMemberByID = async () => {
    let res = await GetMemberByID(id + "");
    res && setMember(res);
  };

  const fetchSumCourseRegistrationPricesByMemberID = async () => {
    let res = await GetSumCourseRegistrationPricesByMemberID("2", id + "");
    res && setPrice(res);
  };

  const fetchCountCoursesRegistraionByMemberID = async () => {
    let res = await GetCountCoursesRegistraionByMemberID(id + "");
    res && setCountCourse(res);
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

    fetchMemberByID();
    fetchCountCoursesRegistraionByMemberID();
    fetchSumCourseRegistrationPricesByMemberID();
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
        <div className="member-detail-container">
          <div className="member-detail-section">
            <div className="member-detail-img-container">
              <Image
                src={member.Image}
                style={{
                  maxHeight: "50vh",
                  borderRadius: "20px",
                  padding: "10px",
                  backgroundColor: "#fff",
                }}
              />
            </div>
            <div className="member-detail-info-container">
              <h2>
                {member.Firstname} {member.Lastname}
              </h2>

              <p>
                <span>UID : </span> {member.ID}
              </p>

              <p>
                <span>อีเมล : </span> {member.Email}
              </p>

              <p>
                <span>เพศ : </span> {member.Gender?.Name}
              </p>

              <p>
                <span>เบอร์โทรศัพท์ : </span> {member.Email}
              </p>

              <p>
                <span>ที่อยู่ : </span> {member.Address}
              </p>

              <p>
                {member.Birthday ? (
                  <>
                    <span>วันเกิด : </span>

                    {new Date(member.Birthday).toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </>
                ) : (
                  "วันเกิด : ไม่มีข้อมูล"
                )}
              </p>

              <p>
                {member.CreatedAt ? (
                  <>
                    <span>สมัครเข้าใช้เมื่อ : </span>

                    {new Date(member.CreatedAt).toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </>
                ) : (
                  "สมัครเข้าใช้เมื่อ : ไม่มีข้อมูล"
                )}
              </p>
            </div>
          </div>
          <div className="member-detail-data">
            <div className="member-detail-block">
              <SolutionOutlined
                style={{ fontSize: "40px", color: "#1890ff" }}
              />
              <p>จำนวนการอบรมที่ผู้ใช้สมัครทั้งหมด</p>
              <p className="member-detail-p">
                {isNaN(parseInt(countCourse))
                  ? "0"
                  : parseInt(countCourse).toLocaleString()}{" "}
                คน
              </p>
            </div>

            <div className="member-detail-block">
              <MoneyCollectOutlined
                style={{ fontSize: "40px", color: "#1890ff" }}
              />
              <p>รายได้จากผู้ใช้ทั้งหมด</p>
              <p className="member-detail-p">
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

export default MemberDetail;
