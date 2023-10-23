import React, { useEffect, useState, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout, Image } from "antd";

import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

import BankQRCode from "../../assets/BankQRCode.jpg";

import { CourseRegistrationInterface } from "../../interfaces/ICourseRegistration";

import { CreateCourseRegistration } from "../../service/HttpClientService";

import "./CoursePurchase.css";

function CoursePurchase() {
  const { id } = useParams();
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<String>("");
  const [coursereg, setCourseReg] = useState<CourseRegistrationInterface>({});
  const [receipt, setReceipt] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorPic, setErrorPic] = useState<string | null>(null);
  const navigate = useNavigate();
  const defaultSelectedKeys = ["1"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setCourseReg({ ...coursereg, [name]: value });
  };

  const handleChangeImages = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.files?.[0];

    if (input && isImageType(input)) {
      if (input.size > 300 * 1024) {
        setErrorPic(
          "รูปภาพมีขนาดใหญ่เกินไป กรุณาเลือกรูปภาพที่มีขนาดไม่เกิน 300 KB"
        );
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(input);
        reader.onload = function () {
          const dataURL = reader.result as string;
          setCourseReg({ ...coursereg, Receipt: dataURL });
          setReceipt(dataURL);
          setErrorPic("");
          setSelectedFileName(input.name);
        };
      }
    } else {
      setErrorPic("รูปภาพไม่ถูกต้อง กรุณาเลือกรูปภาพใหม่");
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
        setErrorPic("กรุณาเลือกรูปภาพ");
        return;
      }

      const memberID = parseInt(memberIDFromLocalStorage, 10);

      let data = {
        Receipt: coursereg.Receipt,
        Note: coursereg.Note,
        MemberID: memberID,
        CourseID: convertType(id),
        PaymentStatusID: 1,
      };
      console.log(data);

      let res = await CreateCourseRegistration(data);
      if (res.status) {
        setSuccess(true);
        window.location.reload();
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

    window.addEventListener("popstate", () => {
      navigate(`/member/course/${id}`);
    });
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
          <h1>ชำระเงิน</h1>
          <div className="course-purchase-section">
            <div className="course-purchase-qrcode">
              <Image src={BankQRCode} style={{ borderRadius: "20px" }} />
            </div>

            <div className="course-purchase-image">
              <div className="course-purchase-btn">
                <label htmlFor="image">อัพโหลดรูปภาพ</label>
                <input
                  id="image"
                  name="Image"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleChangeImages}
                />

                <button onClick={submit}>ยืนยันคำสั่งซื้อ</button>
              </div>

              <div className="course-purchase-imgdisplay">
                {receipt && <Image src={receipt} alt="Selected Image" />}
                {selectedFileName && <p>{selectedFileName}</p>}
                {errorPic && (
                  <p className="course-purchase-error">{errorPic}</p>
                )}
              </div>
              <div className="course-purchase-note">
                <p>**หมายเหตุ</p>
                <div className="course-purchase-input">
                  <input
                    name="Note"
                    value={coursereg.Note}
                    onChange={handleInputChange}
                    placeholder="หมายเหตุ..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default CoursePurchase;
