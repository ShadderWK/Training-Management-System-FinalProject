import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Popconfirm } from "antd";

import NavbarAdmin from "../Navbar/NavbarAdmin";
import SidebarAdmin from "../Sidebar/SidebarAdmin";

import { QuestionInterface } from "../../interfaces/IQuestion";

import { GetQuestions, DeleteQuestion } from "../../service/HttpClientService";

import "./EditFAQ.css";

function EditFAQ() {
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<String>("");
  const [faq, setFaq] = useState<QuestionInterface[]>([]);
  const navigate = useNavigate();
  const defaultSelectedKeys = ["6"];

  const fetchQuestions = async () => {
    let res = await GetQuestions();
    res && setFaq(res);
  };

  const DeleteFAQ = async (id: string) => {
    let res = await DeleteQuestion(id);
    if (res) {
      window.location.href = "/admin/edit-faq";
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

    fetchQuestions();
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
        <div className="editfaq-container">
          <h1>แก้ไขคำถามที่พบบ่อย FAQ</h1>
          <div className="editfaq-title">
            <h1>คำถามที่มีในปัจจุบัน</h1>
            <button onClick={() => navigate("/admin/add-faq")}>
              เพิ่มคำถามใหม่
            </button>
          </div>

          <div className="editfaq-all-question">
            {faq.map((question, index) => (
              <div className="editfaq-block">
                <div key={index}>
                  <h2>{question.Title}</h2>
                  <p>
                    <span>รายละเอียด:</span> {question.Detail}
                  </p>
                  <p>
                    <span>ตอบ:</span> {question.Reply}
                  </p>

                  <div className="editfaq-btn">
                    <button
                      className="edit-btn"
                      onClick={() =>
                        navigate(`/admin/update-faq/${question.ID}`)
                      }
                    >
                      Edit
                    </button>

                    <Popconfirm
                      title={
                        <p className="pop-confirm-title">
                          คุณแน่ใจว่าจะลบคำถามนี้ใช่หรือไม่
                        </p>
                      }
                      description={
                        <p className="pop-confirm-desciption">
                          การลบการคำถามจะไม่สามารถกู้คืนได้
                        </p>
                      }
                      onConfirm={() => DeleteFAQ(question.ID + "")}
                      okText={<p className="pop-confirm-desciption">ตกลง</p>}
                      cancelText={
                        <p className="pop-confirm-desciption">ยกเลิก</p>
                      }
                    >
                      <button className="delete-btn">Delete</button>
                    </Popconfirm>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default EditFAQ;
