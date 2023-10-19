import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "antd";

import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

import { MemberInterface } from "../../interfaces/IMember";
import { GenderInterface } from "../../interfaces/IGender";

import {
  GetMemberByID,
  GetGenders,
  UpdateMember,
} from "../../service/HttpClientService";

import "./EditProfile.css";

function EditProfile() {
  const { id } = useParams();
  const Uid = localStorage.getItem("uid") + "";
  const [member, setMember] = useState<MemberInterface>({});
  const [gender, setGender] = useState<GenderInterface[]>([]);
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<String>("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const defaultSelectedKeys = ["1"];

  const MAX_FIRSTNAME_LENGTH = 30;
  const MAX_LASTNAME_LENGTH = 30;
  const MAX_ADDRESS_LENGTH = 300;

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    let inputValue = e.target.value;

    if (name === "Tel") {
      inputValue = inputValue.replace(/\D/g, "");
      inputValue = inputValue.substring(0, 10);
    } else if (
      name === "Firstname" &&
      inputValue.length > MAX_FIRSTNAME_LENGTH
    ) {
      return;
    } else if (name === "Lastname" && inputValue.length > MAX_LASTNAME_LENGTH) {
      return;
    }

    console.log(name);
    setMember({ ...member, [name]: inputValue });
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const name = e.target.name;

    const value = e.target.value;

    if (name === "Address" && value.length > MAX_ADDRESS_LENGTH) {
      return;
    }
    console.log(name);
    setMember({ ...member, [name]: e.target.value });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const name = event.target.name as keyof typeof member;
    setMember({
      ...member,
      [name]: event.target.value,
    });
  };

  const handleInputChangeBirthday = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = e.target.name;
    setMember({
      ...member,
      [name]: new Date(e.target.value).toISOString(),
    });
  };

  const fetchMemberByID = async () => {
    let res = await GetMemberByID(id + "");
    res && setMember(res);
  };

  const fetchGenders = async () => {
    let res = await GetGenders();
    res && setGender(res);
  };

  const submit = async () => {
    let newdata = {
      ID: convertType(id),
      GenderID: convertType(member.GenderID),
      Firstname: member.Firstname,
      Lastname: member.Lastname,
      Tel: member.Tel,
      Address: member.Address,
      Birthday: member.Birthday,
      Password: member.Password,
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
    fetchGenders();
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

        <div className="edit-profile-container">
          <h1>แก้ไขข้อมูลส่วนตัว</h1>

          <div className="edit-profile-section">
            <div className="edit-profile-name-section">
              <div className="edit-profile-input-container">
                <p>ชื่อ</p>
                <div className="edit-profile-input-section">
                  <input
                    name="Firstname"
                    value={member.Firstname}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="edit-profile-name">
                <p>นามสกุล</p>
                <div className="edit-profile-input-section">
                  <input
                    name="Lastname"
                    value={member.Lastname}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="edit-profile-name-section">
              <div className="edit-profile-input-container">
                <p>อีเมล</p>
                <div className="edit-profile-input-section-email">
                  <input readOnly value={member.Email} />
                </div>
              </div>

              <div className="edit-profile-input-container">
                <p>เพศ</p>
                <div className="edit-profile-input-section">
                  <select
                    value={
                      member.GenderID !== undefined
                        ? member.GenderID.toString()
                        : ""
                    }
                    onChange={handleSelectChange}
                    name="GenderID"
                  >
                    {gender.map((item) => (
                      <option key={item.ID} value={item.ID?.toString() || ""}>
                        {item.Name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="edit-profile-name-section">
              <div className="edit-profile-input-container">
                <p>เบอร์โทรศัพท์</p>
                <div className="edit-profile-input-section">
                  <input
                    name="Tel"
                    type="tel"
                    value={member.Tel}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="edit-profile-input-container">
                <p>วันเกิด</p>
                <div className="edit-profile-input-section">
                  <input
                    name="Birthday"
                    type="date"
                    value={(member.Birthday + "").split("T")[0]}
                    onChange={handleInputChangeBirthday}
                  />
                </div>
              </div>
            </div>

            <div className="edit-profile-input-container">
              <p>ที่อยู่</p>
              <div className="edit-profile-input-section">
                <textarea
                  name="Address"
                  value={member.Address}
                  onChange={handleTextAreaChange}
                />
              </div>
            </div>

            <div className="edit-profile-btn-section">
              <button className="edit-profile-btn-submit" onClick={submit}>
                ตกลง
              </button>

              <button
                className="edit-profile-btn-back"
                onClick={() => navigate(`/member/profile/${id}`)}
              >
                ย้อนกลับ
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default EditProfile;
