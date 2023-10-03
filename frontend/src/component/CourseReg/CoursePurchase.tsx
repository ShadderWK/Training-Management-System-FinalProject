import React, { useEffect, useState, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "antd";

import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

import { CourseRegistrationInterface } from "../../interfaces/ICourseRegistration";

import { CreateCourseRegistration } from "../../service/HttpClientService";

import "./CoursePurchase.css";

function CoursePurchase() {
  const { id } = useParams();
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<String>("");
  const [coursereg, setCourseReg] = useState<CourseRegistrationInterface>({});
  const [receipt, setReceipt] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorPic, setErrorPic] = useState<string | null>(null);
  const navigate = useNavigate();
  const defaultSelectedKeys = ["1"];

  const handleChangeImages = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.files?.[0];

    if (input && isImageType(input)) {
      const reader = new FileReader();
      reader.readAsDataURL(input);
      reader.onload = function () {
        const dataURL = reader.result as string;
        setCourseReg({ ...coursereg, Receipt: dataURL });
        setReceipt(dataURL);
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

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  const submit = async () => {
    const memberIDFromLocalStorage = localStorage.getItem("uid");

    if (memberIDFromLocalStorage !== null) {
      if (!coursereg.Receipt) {
        setErrorPic("Please select an image.");
        return;
      }

      const memberID = parseInt(memberIDFromLocalStorage, 10);

      let data = {
        Receipt: coursereg.Receipt,
        MemberID: memberID,
        CourseID: convertType(id),
        PaymentStatusID: 1,
      };
      console.log(data);

      let res = await CreateCourseRegistration(data);
      if (res.status) {
        setSuccess(true);
        window.location.href = "/member/home";
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
      navigate("/member");
    }

    const role = localStorage.getItem("Role");
    if (role === "member") {
      setRole(role);
    } else {
      localStorage.clear();
    }
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

        <div className="course-purchase-container">
          <p>อัพโหลดสลิป</p>
          {errorPic && <p className="error">{errorPic}</p>}
          <div>
            <input
              id="image"
              name="Image"
              type="file"
              accept="image/*"
              onChange={handleChangeImages}
            />
            {receipt && <img src={receipt} alt="Selected Image" width="200" />}
          </div>
          <button onClick={submit}>ตกลง</button>
        </div>
      </Layout>
    </div>
  );
}

export default CoursePurchase;
