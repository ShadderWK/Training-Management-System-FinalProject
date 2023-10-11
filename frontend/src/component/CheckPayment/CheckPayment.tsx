import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";

import NavbarAdmin from "../Navbar/NavbarAdmin";
import SidebarAdmin from "../Sidebar/SidebarAdmin";
import ChangeStatus from "./ChangeStatus";

import { GetCourseRegistrations } from "../../service/HttpClientService";

import { CourseRegistrationInterface } from "../../interfaces/ICourseRegistration";

import "./CheckPayment.css";

function CheckPayment() {
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<String>("");
  const [courseReg, setCourseReg] = useState<CourseRegistrationInterface[]>([]);
  const [filterChecked, setFilterChecked] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const defaultSelectedKeys = ["4"];

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

    fetchCourseRegistrations();
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

          <div>
            <table className="check-payment-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>ชื่อ-นามสกุล</th>
                  <th>คอร์สที่สมัคร</th>
                  <th>สถานะ</th>
                  <th>ตรวจสอบ</th>
                </tr>
              </thead>
              <tbody>
                {courseReg
                  .filter(
                    (item) =>
                      !filterChecked ||
                      item.PaymentStatus?.Status === "รอการตรวจสอบ"
                  )
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.ID}</td>

                      <td>
                        {item.Member?.Firstname} {item.Member?.Lastname}
                      </td>

                      <td>{item.Course?.Name}</td>

                      <td>{item.PaymentStatus?.Status}</td>

                      <td>
                        <button
                          className="check-payment-btn"
                          onClick={() =>
                            navigate(`/admin/change-status/${item.ID}`)
                          }
                        >
                          ตรวจสอบ
                        </button>
                      </td>
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
export default CheckPayment;
