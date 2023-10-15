import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "antd";

import NavbarAdmin from "../Navbar/NavbarAdmin";
import SidebarAdmin from "../Sidebar/SidebarAdmin";

import {
  GetCourseRegistrationByID,
  UpdateCourseRegistration,
  GetPaymentStatuses,
} from "../../service/HttpClientService";

import { CourseRegistrationInterface } from "../../interfaces/ICourseRegistration";
import { PaymentStatusInterface } from "../../interfaces/IPaymentStatus";

import "./ChangeStatus.css";

function ChangeStatus() {
  const { id } = useParams();
  const [courseReg, setCourseReg] = useState<CourseRegistrationInterface>({});
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatusInterface[]>(
    []
  );
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<String>("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const defaultSelectedKeys = ["4"];

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.name as keyof typeof courseReg;
    setCourseReg({
      ...courseReg,
      [name]: event.target.value,
    });
  };

  const fetchCourseRegistrationByID = async () => {
    let res = await GetCourseRegistrationByID(id + "");
    res && setCourseReg(res);
  };

  const fetchPaymentStatuses = async () => {
    let res = await GetPaymentStatuses();
    res && setPaymentStatus(res);
  };

  const submit = async () => {
    let newdata = {
      ID: convertType(id),
      PaymentStatusID: convertType(courseReg.PaymentStatusID),
      MemberID: courseReg.MemberID,
      CourseID: courseReg.CourseID,
    };

    let res = await UpdateCourseRegistration(newdata);
    if (res.status) {
      setSuccess(true);
      window.location.href = "/admin/check-payment";
    } else {
      setError(true);
    }
    console.log(JSON.stringify(newdata));
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

    fetchCourseRegistrationByID();
    fetchPaymentStatuses();
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
        <div className="change-status-container">
          <div className="change-status-section">
            <img src={courseReg.Receipt} />
            <div className="change-status-text">
              <h1>ตรวจสอบการชำระเงินหมายเลข {courseReg.ID}</h1>

              <p>
                <span>ชื่อ-นามสกุล :</span> {courseReg.Member?.Firstname}{" "}
                {courseReg.Member?.Lastname}
              </p>

              <p>
                <span>เบอร์โทรติดต่อ :</span> {courseReg.Member?.Tel}
              </p>

              <p>
                <span>อีเมล :</span> {courseReg.Member?.Email}
              </p>

              <p>
                <span>สมัครคอร์ส :</span> {courseReg.Course?.Name}
              </p>

              <p>
                <span>ราคา :</span> {courseReg.Course?.Price}
              </p>

              <div className="change-status-select-container">
                <label htmlFor="statusSelect">เลือกสถานะการชำระเงิน:</label>

                <select
                  id="statusSelect"
                  className="custom-select"
                  value={
                    courseReg.PaymentStatusID !== undefined
                      ? courseReg.PaymentStatusID.toString()
                      : ""
                  }
                  onChange={handleInputChange}
                  name="PaymentStatusID"
                >
                  {paymentStatus.map((status) => (
                    <option key={status.ID} value={status.ID?.toString() || ""}>
                      {status.Status}
                    </option>
                  ))}
                </select>
              </div>
              <button onClick={submit}>ยืนยันการชำระเงิน</button>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default ChangeStatus;
