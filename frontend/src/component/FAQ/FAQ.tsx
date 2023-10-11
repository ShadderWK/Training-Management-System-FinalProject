import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";

import "./FAQ.css";

import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

import { QuestionInterface } from "../../interfaces/IQuestion";

import { GetQuestions } from "../../service/HttpClientService";

function FAQ() {
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<String>("");
  const [faq, setFaq] = useState<QuestionInterface[]>([]);
  const navigate = useNavigate();
  const defaultSelectedKeys = ["4"];

  const fetchQuestions = async () => {
    let res = await GetQuestions();
    res && setFaq(res);
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

    fetchQuestions();
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

        <div className="faq-container">
          <h1>คำถามที่พบบ่อย FAQ</h1>
          <ul>
            {faq.map((question, index) => (
              <li>
                <div key={index}>
                  <h2>{question.Title}</h2>
                  <p>
                    <span>รายละเอียด:</span> {question.Detail}
                  </p>
                  <p>
                    <span>ตอบ:</span> {question.Reply}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="faq-image">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/LINE_logo.svg/2048px-LINE_logo.svg.png" />
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default FAQ;
