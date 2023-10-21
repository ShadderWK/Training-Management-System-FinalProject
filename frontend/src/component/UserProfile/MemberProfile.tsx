import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "antd";
import { format, parseISO } from "date-fns";
import { th } from "date-fns/locale";

import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

import { MemberInterface } from "../../interfaces/IMember";

import { GetMemberByID, UpdateMember } from "../../service/HttpClientService";

import "./MemberProfile.css";

function MemberProfile() {
  const { id } = useParams();
  const Uid = localStorage.getItem("uid") + "";
  const [member, setMember] = useState<MemberInterface>({});
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<String>("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const defaultSelectedKeys = ["1"];

  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  const isImageType = (file: File) => {
    const acceptedImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    return acceptedImageTypes.includes(file.type);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0] as File;

    if (file) {
      if (file.size > 300 * 1024) {
        setError(true);
        return;
      }

      if (isImageType(file)) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target?.result as string;
          setMember({ ...member, Image: imageUrl });
        };
        reader.readAsDataURL(file);
        setError(false);
      } else {
        setError(true);
      }
    }
  };

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

  const submit = async () => {
    let newdata = {
      ID: convertType(id),
      GenderID: member.GenderID,
      Image: member.Image,
    };

    let res = await UpdateMember(newdata);
    if (res.status) {
      setSuccess(true);
      window.location.href = "/member/profile/" + id;
    } else {
      setError(true);
    }
    console.log(JSON.stringify(newdata));
  };

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
          <h1>ข้อมูลรายละเอียดส่วนตัว</h1>
          <div className="member-profile-section">
            <div className="member-profile-detail">
              <div className="member-profile-img-section">
                <div className="member-profile-img-container">
                  <img src={member.Image} />
                </div>

                <div className="member-profile-img-btn">
                  <button onClick={() => imageInputRef.current?.click()}>
                    เปลี่ยนรูป
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                    ref={imageInputRef}
                  />

                  <button onClick={submit}>บันทึก</button>
                </div>
              </div>

              <div className="member-profile-text-container">
                <p>
                  <span>ชื่อ-นามสกุล :</span> {member.Firstname}{" "}
                  {member.Lastname}
                </p>

                <p>
                  <span>อีเมล :</span> {member.Email}
                </p>

                <p>
                  <span>เพศ :</span> {member.Gender?.Name}
                </p>

                <p>
                  <span>เบอร์โทร :</span> {member.Tel}
                </p>

                <p>
                  <span>ที่อยู่ :</span> {member.Address}
                </p>

                <p>
                  <span>วันเกิด : </span>
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

            <div className="profile-btn-section">
              <button
                className="profile-change-pass-btn"
                onClick={() => navigate(`/member/change-password/${id}`)}
              >
                เปลี่ยนรหัสผ่าน
              </button>
              <button
                className="profile-edit-btn"
                onClick={() => navigate(`/member/edit-profile/${id}`)}
              >
                แก้ไขข้อมูลส่วนตัว
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default MemberProfile;
