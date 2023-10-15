import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "antd";
import { format, parseISO } from "date-fns";
import { th } from "date-fns/locale";

import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

import { MemberInterface } from "../../interfaces/IMember";

import { GetMemberByID } from "../../service/HttpClientService";

import "./MemberProfile.css";

function MemberProfile() {
  const { id } = useParams();
  const [member, setMember] = useState<MemberInterface>({});
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<String>("");
  const navigate = useNavigate();
  const defaultSelectedKeys = ["1"];

  const fetchMemberByID = async () => {
    let res = await GetMemberByID(id + "");
    res && setMember(res);
  };

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

        <div className="member-profile-container">
          <h1>ข้อมูลรายละเอียดส่วนบุคคล</h1>
          <div className="member-profile-section">
            <div className="member-profile-img-container">
              <img src={member.Image} />
            </div>
            <div>
              <p>
                ชื่อ: {member.Firstname} {member.Lastname}
              </p>

              <p>อีเมล: {member.Email}</p>

              <p>เพศ: {member.Gender?.Name}</p>

              <p>เบอร์โทร: {member.Tel}</p>

              <p>ที่อยู่: {member.Address}</p>

              <p>
                วันเกิด:{" "}
                {member.Birthday
                  ? format(
                      parseISO(member.Birthday?.toString()),
                      "dd MMMM yyyy",
                      {
                        locale: th,
                      }
                    )
                  : ""}
              </p>
            </div>
          </div>
          <button onClick={() => navigate(`/member/change-password/${id}`)}>
            เปลี่ยนรหัสผ่าน
          </button>
          <button>แก้ไขข้อมูลส่วนตัว</button>
        </div>
      </Layout>
    </div>
  );
}

export default MemberProfile;
