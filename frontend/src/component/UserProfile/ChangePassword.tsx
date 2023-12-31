import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "antd";

import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

import { MemberInterface } from "../../interfaces/IMember";

import {
  GetMemberByID,
  UpdateMemberPassword,
} from "../../service/HttpClientService";

import "./ChangePassword.css";

function ChangePassword() {
  const { id } = useParams();
  const Uid = localStorage.getItem("uid") + "";
  const [member, setMember] = useState<MemberInterface>({});
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<String>("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const defaultSelectedKeys = ["1"];

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  const fetchMemberByID = async () => {
    let res = await GetMemberByID(id + "");
    res && setMember(res);
  };

  const submit = async () => {
    setPasswordError(false);
    setConfirmPasswordError(false);

    if (newPassword.length < 8) {
      setPasswordError(true);
      return;
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError(true);
      return;
    }

    let newdata = {
      ID: convertType(id),
      Password: newPassword,
      GenderID: member.GenderID,
    };

    let res = await UpdateMemberPassword(newdata);
    if (res.status) {
      setSuccess(true);
      window.location.href = "/member/home";
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
      navigate("/member");
    }

    if (id != Uid) {
      navigate("/member");
    }

    const role = localStorage.getItem("Role");
    if (role === "member") {
      setRole(role);
    } else {
      localStorage.clear();
    }

    fetchMemberByID();
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

        <div className="change-password-container">
          <h1>เปลี่ยนรหัสผ่าน</h1>

          <div className="change-password-section">
            <div className="change-password-field">
              <p>รหัสผ่านใหม่</p>
              <div className="change-password-input-container">
                <input
                  name="Password"
                  type="password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                />
              </div>
              {passwordError && (
                <span className="error-message">
                  รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร
                </span>
              )}
            </div>
          </div>

          <div className="change-password-section">
            <div className="change-password-field">
              <p>ยืนยันรหัสผ่านใหม่</p>
              <div className="change-password-input-container">
                <input
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
              </div>
              {confirmPasswordError && (
                <span className="error-message">รหัสผ่านไม่ตรงกัน</span>
              )}
            </div>
          </div>

          <div className="change-password-btn-section">
            <button className="change-password-btn-submit" onClick={submit}>
              ยืนยัน
            </button>
            <button
              className="change-password-btn-back"
              onClick={() => navigate(`/member/profile/${id}`)}
            >
              ย้อนกลับ
            </button>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default ChangePassword;
