import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";

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
  const defaultSelectedKeys = ["3"];

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
          <h1>แก้ไข FAQ</h1>
          <div className="editfaq-title">
            <h1>คำถามที่มีในปัจจุบัน</h1>
            <button onClick={() => navigate("/admin/add-faq")}>
              เพิ่มคำถามใหม่
            </button>
          </div>

          <div className="editfaq-all-question">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Detail</th>
                  <th>Reply</th>
                  <th>Admin</th>
                  <th>Edit/Delete</th>
                </tr>
              </thead>
              <tbody>
                {faq.map((question, index) => (
                  <tr key={index}>
                    <td>{question.ID}</td>
                    <td>{question.Title}</td>
                    <td>{question.Detail}</td>
                    <td>{question.Reply}</td>
                    <td>{question.AdminID}</td>
                    <td>
                      <button
                        onClick={() =>
                          navigate(`/admin/update-faq/${question.ID}`)
                        }
                      >
                        Edit
                      </button>
                      <button onClick={() => DeleteFAQ(question.ID + "")}>
                        Delete
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

export default EditFAQ;
