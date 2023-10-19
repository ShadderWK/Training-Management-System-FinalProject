import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "antd";

import NavbarAdmin from "../Navbar/NavbarAdmin";
import SidebarAdmin from "../Sidebar/SidebarAdmin";

import { QuestionInterface } from "../../interfaces/IQuestion";

import {
  UpdateQuestion,
  GetQuestionByID,
} from "../../service/HttpClientService";

import "./UpdateFAQ.css";

function UpdateFAQ() {
  const { id } = useParams();
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<String>("");
  const [faq, setFaq] = useState<QuestionInterface>({});
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessages, setErrorMessages] = useState<{
    Title: string;
    Detail: string;
    Reply: string;
  }>({
    Title: "",
    Detail: "",
    Reply: "",
  });
  const navigate = useNavigate();
  const defaultSelectedKeys = ["6"];

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  const validateInputs = () => {
    const newErrorMessages = { Title: "", Detail: "", Reply: "" };
    let hasError = false;

    if (!faq.Title) {
      newErrorMessages.Title = "กรุณาใส่หัวข้อคำถาม";
      hasError = true;
    }

    if (!faq.Detail) {
      newErrorMessages.Detail = "กรุณาใส่รายละเอียดคำถาม";
      hasError = true;
    }

    if (!faq.Reply) {
      newErrorMessages.Reply = "กรุณาใส่คำตอบ";
      hasError = true;
    }

    setErrorMessages(newErrorMessages);
    return !hasError;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const name = e.target.name;
    console.log(name);
    setFaq({ ...faq, [name]: e.target.value });
  };

  const fetchQuestionByID = async () => {
    let res = await GetQuestionByID(id + "");
    res && setFaq(res);
  };

  const submit = async () => {
    if (validateInputs()) {
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

    fetchQuestionByID();
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
          <h1>แก้ไขคำถามที่พบบ่อย FAQ</h1>
          <div className="updatefaq-input">
            <div className="updatefaq-text">
              <p className="updatefaq-text-title">หัวข้อคำถาม</p>
              <div className="updatefaq-text-input">
                <textarea
                  id="title"
                  name="Title"
                  placeholder="หัวข้อ..."
                  rows={1}
                  value={faq.Title}
                  onChange={handleInputChange}
                />
              </div>
              {errorMessages.Title && (
                <p className="updatefaq-error-message">{errorMessages.Title}</p>
              )}
            </div>

            <div className="updatefaq-text">
              <p className="updatefaq-text-title">รายละเอียดคำถาม</p>
              <div className="updatefaq-text-input">
                <textarea
                  id="detail"
                  name="Detail"
                  placeholder="รายละเอียด..."
                  rows={4}
                  value={faq.Detail}
                  onChange={handleInputChange}
                />
              </div>
              {errorMessages.Detail && (
                <p className="updatefaq-error-message">
                  {errorMessages.Detail}
                </p>
              )}
            </div>

            <div className="updatefaq-text">
              <p className="updatefaq-text-title">คำตอบ</p>
              <div className="updatefaq-text-input">
                <textarea
                  id="reply"
                  name="Reply"
                  placeholder="คำตอบ..."
                  rows={4}
                  value={faq.Reply}
                  onChange={handleInputChange}
                />
              </div>
              {errorMessages.Reply && (
                <p className="updatefaq-error-message">{errorMessages.Reply}</p>
              )}
            </div>

            <button onClick={submit}>แก้ไขข้อมูลข้อมูล</button>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default UpdateFAQ;
