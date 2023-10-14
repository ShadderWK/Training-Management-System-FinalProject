import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "antd";
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
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const defaultSelectedKeys = ["5"];

  const fetchCourseByID = async () => {
    let res = await GetCourseByID(id + "");
    res && setCourse(res);
  };

  const fetchCourseRegistrationByCourseID = async () => {
    let res = await GetCourseRegistrationByCourseID(id + "");
    res && setCourseReg(res);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      courseReg.map((item) => ({
        หมายเลขคำสั่งซื้อ: item.ID,
        ชื่อคนสมัคร: `${item.Member?.Firstname} ${item.Member?.Lastname}`,
        อีเมล: item.Member?.Email,
        เบอร์โทรติดต่อ: item.Member?.Tel,
        สถานนะการชำระเงิน: item.PaymentStatus?.Status,
      }))
    );

    const wscols = [
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
      { wch: 30 },
    ];

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
          <h1>รายชื่อคนในคอร์ส</h1>
          <h1>{course.Name}</h1>
          <button onClick={exportToExcel}>Export to Excel</button>

          <div>
            <table className="check-payment-table">
              <thead>
                <tr>
                  <th>หมายเลขคำสั่งซื้อ</th>
                  <th>ชื่อคนสมัคร</th>
                  <th>อีเมล</th>
                  <th>เบอร์โทรติดต่อ</th>
                  <th>สถานนะการชำระเงิน</th>
                </tr>
              </thead>
              <tbody>
                {courseReg.map((item, index) => (
                  <tr key={index}>
                    <td>{item.ID}</td>
                    <td>
                      {item.Member?.Firstname} {item.Member?.Lastname}
                    </td>
                    <td>{item.Member?.Email}</td>
                    <td>{item.Member?.Tel}</td>
                    <td>{item.PaymentStatus?.Status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default ListCourseByID;
