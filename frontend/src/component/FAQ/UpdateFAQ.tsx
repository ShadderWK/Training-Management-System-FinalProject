import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "antd";

import NavbarAdmin from "../Navbar/NavbarAdmin";
import SidebarAdmin from "../Sidebar/SidebarAdmin";

import { QuestionInterface } from "../../interfaces/IQuestion";

import { UpdateQuestion } from "../../service/HttpClientService";

import "./UpdateFAQ.css";

function UpdateFAQ() {
  const { id } = useParams();
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<String>("");
  const [faq, setFaq] = useState<QuestionInterface>({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const defaultSelectedKeys = ["3"];

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    console.log(name);
    setFaq({ ...faq, [name]: e.target.value });
  };

  const submit = async () => {
    const adminIDFromLocalStorage = localStorage.getItem("uid");

    if (adminIDFromLocalStorage !== null) {
      const adminID = parseInt(adminIDFromLocalStorage, 10);

      let data = {
        ID: convertType(id),
        Title: faq.Title,
        Detail: faq.Detail,
        Reply: faq.Reply,
        AdminID: adminID,
      };
      console.log(data);

      let res = await UpdateQuestion(data);
      if (res.status) {
        setSuccess(true);
        window.location.href = "/admin/edit-faq";
      } else {
        setError(true);
      }
      console.log(JSON.stringify(data));
    } else {
      console.error("UID not found in localStorage");
    }
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
        <div className="updatefaq-container">
          <h1>อัปเดต FAQ</h1>
          <div className="addfaq-input">
            <input
              id="title"
              name="Title"
              placeholder="หัวข้อ"
              value={faq.Title}
              onChange={handleInputChange}
            />

            <input
              id="detail"
              name="Detail"
              placeholder="รายละเอียด"
              value={faq.Detail}
              onChange={handleInputChange}
            />

            <input
              id="reply"
              name="Reply"
              placeholder="คำตอบ"
              value={faq.Reply}
              onChange={handleInputChange}
            />

            <button onClick={submit}>เพิ่มข้อมูล</button>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default UpdateFAQ;
