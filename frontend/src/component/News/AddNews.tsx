import React, { useEffect, useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";

import NavbarAdmin from "../Navbar/NavbarAdmin";
import SidebarAdmin from "../Sidebar/SidebarAdmin";

import { NewsInterface } from "../../interfaces/INews";

import { CreateNews } from "../../service/HttpClientService";

import "./AddNews.css";

function AddNews() {
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<String>("");
  const [news, setNews] = useState<NewsInterface>({});
  const [image, setImage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorPic, setErrorPic] = useState<string | null>(null);
  const navigate = useNavigate();
  const defaultSelectedKeys = ["2"];

  const handleChangeImages = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.files?.[0];

    if (input && isImageType(input)) {
      const reader = new FileReader();
      reader.readAsDataURL(input);
      reader.onload = function () {
        const dataURL = reader.result as string;
        setNews({ ...news, Image: dataURL });
        setImage(dataURL);
      };
    } else {
      setErrorPic("Invalid image type. Please select a valid image file.");
    }
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

  const submit = async () => {
    const adminIDFromLocalStorage = localStorage.getItem("uid");

    if (adminIDFromLocalStorage !== null) {
      if (!news.Image) {
        setErrorPic("Please select an image.");
        return;
      }
      const adminID = parseInt(adminIDFromLocalStorage, 10);

      let data = {
        Image: news.Image,
        AdminID: adminID,
      };
      console.log(data);

      let res = await CreateNews(data);
      if (res.status) {
        setSuccess(true);
        window.location.href = "/admin/edit-news";
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
        <div className="addnews-container">
          <h1>เพิ่มรูปข่าว</h1>
          {errorPic && <p className="error">{errorPic}</p>}
          <div>
            <input
              id="image"
              name="Image"
              type="file"
              accept="image/*"
              onChange={handleChangeImages}
            />
            {image && <img src={image} alt="Selected Image" width="200" />}
          </div>
          <div>
            <button onClick={submit}>ตกลง</button>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default AddNews;
