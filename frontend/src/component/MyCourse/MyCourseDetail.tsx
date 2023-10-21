import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout, Image } from "antd";
import { FilePdfOutlined, ContactsOutlined } from "@ant-design/icons";

import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

import {
  CheckCourseRegistrationByCourseID,
  GetCourseRegistrationsByCourseID,
} from "../../service/HttpClientService";

import { CourseRegistrationInterface } from "../../interfaces/ICourseRegistration";

import "./MyCourseDetail.css";

function MyCourseDetail() {
  const { id } = useParams();
  const Uid = localStorage.getItem("uid") + "";
  const [courseReg, setCourseReg] = useState<CourseRegistrationInterface>({});
  const [check, setCheck] = useState<String>("");
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<String>("");
  const navigate = useNavigate();
  const defaultSelectedKeys = ["2"];

  const fetchCheckCourseRegistrationByCourseID = async () => {
    let res = await CheckCourseRegistrationByCourseID(Uid, id + "", "2");
    setCheck(res);

    if (res === "not_checked") {
      navigate(`/member/course/${id}`);
    }
  };

  const fetchCourseRegistrationsByCourseID = async () => {
    let res = await GetCourseRegistrationsByCourseID(Uid, id + "", "2");
    res && setCourseReg(res);
  };

  console.log("Status =", check);

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

    fetchCheckCourseRegistrationByCourseID();
    fetchCourseRegistrationsByCourseID();
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

        <div className="mycourse-detail-container">
          <div className="mycourse-detail-section">
            <div className="mycourse-detail-info">
              <h1>{courseReg.Course?.Name} </h1>
              <p>
                <span>รายละเอียด : </span> {courseReg.Course?.Detail}
              </p>

              <p>
                <span>สถานที่การอบรม : </span>
                {courseReg.Course?.Place}
              </p>

              <p>
                {courseReg.Course?.StartTime ? (
                  <>
                    <span>วันที่เริ่มอบรม: </span>

                    {new Date(courseReg.Course.StartTime).toLocaleDateString(
                      "th-TH",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </>
                ) : (
                  "วันที่เริ่มอบรม: ไม่มีข้อมูล"
                )}
              </p>

              <p>
                {courseReg.Course?.EndTime ? (
                  <>
                    <span>วันที่สิ้นสุดอบรม: </span>

                    {new Date(courseReg.Course.EndTime).toLocaleDateString(
                      "th-TH",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </>
                ) : (
                  "วันที่สิ้นสุดอบรม: ไม่มีข้อมูล"
                )}
              </p>

              <p>
                {courseReg.CreatedAt ? (
                  <>
                    <span>วันที่ซื้อการอบรม : </span>

                    {new Date(courseReg.CreatedAt).toLocaleDateString("th-TH", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </>
                ) : (
                  "วันที่ซื้อการอบรม: ไม่มีข้อมูล"
                )}
              </p>

              <div className="mycourse-detail-link">
                <p>
                  <a href={courseReg.Course?.LinkFile}>
                    <span className="course-pdf">
                      <FilePdfOutlined /> เอกสารการอบรม
                    </span>
                  </a>
                </p>

                <p>
                  <a href={courseReg.Course?.LinkContact}>
                    <span className="course-pdf">
                      <ContactsOutlined /> ช่องทางการติดต่อ
                    </span>
                  </a>
                </p>
              </div>

              {courseReg.Course?.QRContact ? (
                <div className="mycourse-detail-qr">
                  <div className="mycourse-detail-qr-container">
                    <Image src={courseReg.Course.QRContact} />
                  </div>
                </div>
              ) : null}
            </div>

            <div className="mycourse-detail-img">
              <Image
                src={courseReg.Course?.Image}
                style={{
                  borderRadius: "20px",
                  padding: "10px",
                  backgroundColor: "#fff",
                }}
              />
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default MyCourseDetail;
