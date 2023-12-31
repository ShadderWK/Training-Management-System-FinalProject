import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Popconfirm } from "antd";

import NavbarAdmin from "../Navbar/NavbarAdmin";
import SidebarAdmin from "../Sidebar/SidebarAdmin";

import { NewsInterface } from "../../interfaces/INews";

import { GetNews, DeleteNews } from "../../service/HttpClientService";

import "./News.css";

function News() {
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<String>("");
  const [news, setNews] = useState<NewsInterface[]>([]);
  const navigate = useNavigate();
  const defaultSelectedKeys = ["5"];

  const fetchNews = async () => {
    let res = await GetNews();
    res && setNews(res);
  };

  const DeletANews = async (id: string) => {
    let res = await DeleteNews(id);
    if (res) {
      window.location.href = "/admin/edit-news";
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

    fetchNews();
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
        <div className="news-container">
          <div className="news-title">
            <h1>แก้ไขรูปข่าว</h1>
            <button onClick={() => navigate("/admin/add-news")}>
              เพิ่มรูปข่าว
            </button>
          </div>

          <div className="news-content">
            {news.map((newsItem) => (
              <div key={newsItem.ID} className="news-block">
                <img src={newsItem.Image} />

                <Popconfirm
                  title={
                    <p className="pop-confirm-title">
                      คุณแน่ใจว่าจะลบรูปข่าวนี้ใช่หรือไม่
                    </p>
                  }
                  description={
                    <p className="pop-confirm-desciption">
                      การลบรูปข่าวจะไม่สามารถกู้คืนได้
                    </p>
                  }
                  onConfirm={() => DeletANews(newsItem.ID + "")}
                  okText={<p className="pop-confirm-desciption">ตกลง</p>}
                  cancelText={<p className="pop-confirm-desciption">ยกเลิก</p>}
                >
                  <button>Delete</button>
                </Popconfirm>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default News;
