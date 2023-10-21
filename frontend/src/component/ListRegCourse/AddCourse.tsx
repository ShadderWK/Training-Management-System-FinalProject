import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Alert } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";

import NavbarAdmin from "../Navbar/NavbarAdmin";
import SidebarAdmin from "../Sidebar/SidebarAdmin";

import { CourseInterface } from "../../interfaces/ICourse";

import { CreateCourse } from "../../service/HttpClientService";

import "./AddCourse.css";

function AddCourse() {
  const [course, setCourse] = useState<CourseInterface>({});
  const [priceError, setPriceError] = useState<string>("");
  const [pdfError, setPdfError] = useState<string>("");
  const [imgError, setImgError] = useState<string>("");
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<String>("");
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const qrCodeInputRef = useRef<HTMLInputElement | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();
  const defaultSelectedKeys = ["2"];

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setCourse({ ...course, [name]: value });
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const name = e.target.name;
    console.log(name);
    setCourse({ ...course, [name]: e.target.value });
  };

  const handleInputDateTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = e.target.name;
    setCourse({
      ...course,
      [name]: new Date(e.target.value).toISOString(),
    });
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0] as File;
    const name = e.target.name;

    if (file) {
      if (file.size <= 300 * 1024) {
        if (isImageType(file)) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const imageUrl = event.target?.result as string;
            setCourse({ ...course, [name]: imageUrl });
          };
          reader.readAsDataURL(file);
        } else {
          setError(true);
          setImgError("รูปภาพไม่ถูกต้อง");
        }
      } else {
        setError(true);
        setImgError("ไฟล์รูปภาพต้องมีขนาดไม่เกิน 300 KB");
      }
    }
  };

  const submit = async () => {
    const adminIDFromLocalStorage = localStorage.getItem("uid");

    if (adminIDFromLocalStorage !== null) {
      const adminID = parseInt(adminIDFromLocalStorage, 10);

      if (typeof course.Price === "string") {
        const priceValue = parseFloat(course.Price);

        if (priceValue < 0) {
          setPriceError("ราคาห้ามน้อยกว่า 0 บาท");
          return;
        }
      }

      if (pdfError || imgError) {
        setError(true);
        setErrorMessage("ข้อมูลไม่ถูกต้อง");
        return;
      }

      if (
        !course.Image ||
        !course.LinkContact ||
        !course.LinkFile ||
        !course.Name ||
        !course.Detail ||
        !course.Price ||
        !course.StartTime ||
        !course.EndTime
      ) {
        setError(true);
        setErrorMessage("ข้อมูลไม่ครบถ้วน");
        return;
      }

      let data = {
        Name: course.Name,
        Detail: course.Detail,
        Image: course.Image,
        LinkContact: course.LinkContact,
        LinkFile: course.LinkFile,
        QRContact: course.QRContact,
        Price: convertType(course.Price),
        AdminID: adminID,
        StartTime: course.StartTime,
        EndTime: course.EndTime,
        CourseStatusID: 2,
      };
      console.log(data);

      let res = await CreateCourse(data);
      if (res.status) {
        setSuccess(true);
        window.location.href = "/admin/list-reg-course";
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
        <div className="add-course-container">
          {error && (
            <Alert
              message={errorMessage}
              type="error"
              closable
              style={{
                position: "fixed",
                bottom: "10px",
                fontFamily: "IBM Plex Sans Thai",
                fontSize: "16px",
                zIndex: "1",
              }}
              onClose={() => setError(false)}
            />
          )}

          <h1>เพิ่มการอบรม</h1>

          <div className="add-course-section">
            <div className="add-course-section-1">
              <div className="add-course-section-1-front">
                <p>หัวข้อการอบรม</p>
                <div className="add-course-section-1-input">
                  <input
                    name="Name"
                    value={course.Name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="add-course-section-1-back">
                <p>ราคา</p>
                <div className="add-course-section-1-error-block">
                  <div className="add-course-section-1-input">
                    <input
                      name="Price"
                      type="number"
                      value={course.Price}
                      onChange={handleInputChange}
                    />
                    <p>บาท</p>
                  </div>
                  {priceError && (
                    <p className="update-course-error-message">{priceError}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="add-course-section-2">
              <p>รายละเอียด</p>
              <div className="add-course-section-2-input">
                <textarea
                  name="Detail"
                  value={course.Detail}
                  onChange={handleTextAreaChange}
                />
              </div>
            </div>

            <div className="add-course-section-link-container">
              <div className="add-course-section-link">
                <p>ลิงค์เอกสารการอบรม</p>
                <div className="add-course-section-link-input">
                  <input
                    name="LinkFile"
                    value={course.LinkFile}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="add-course-section-link">
                <p>ลิงค์ช่องทางการติดต่อ</p>
                <div className="add-course-section-link-input">
                  <input
                    name="LinkContact"
                    value={course.LinkContact}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <div className="add-course-section-3">
              <div className="add-course-section-3-time-btn">
                <div className="add-course-section-3-btn">
                  <button onClick={() => imageInputRef.current?.click()}>
                    เพิ่มรูปภาพหน้าปก
                  </button>
                  <input
                    name="Image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                    ref={imageInputRef}
                  />
                  <button onClick={() => qrCodeInputRef.current?.click()}>
                    เพิ่มรูปภาพ QRCode ช่องทางการติดต่อ
                  </button>
                  <input
                    name="QRContact"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                    ref={qrCodeInputRef}
                  />
                </div>
                <div className="add-course-section-3-time">
                  <div className="add-course-time-container">
                    <p>วันที่เริ่มอบรม</p>
                    <div className="add-course-section-3-input">
                      <input
                        name="StartTime"
                        type="date"
                        value={(course.StartTime + "").split("T")[0]}
                        onChange={handleInputDateTimeChange}
                      />
                    </div>
                  </div>

                  <div className="add-course-time-container">
                    <p>วันที่สิ้นสุดการอบรม</p>
                    <div className="add-course-section-3-input">
                      <input
                        name="EndTime"
                        type="date"
                        value={(course.EndTime + "").split("T")[0]}
                        onChange={handleInputDateTimeChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {course.Image && (
                <div className="add-course-img-section">
                  <img src={course.Image} />
                </div>
              )}

              {course.QRContact && (
                <div className="add-course-img-section">
                  <img src={course.QRContact} />
                </div>
              )}

              {imgError && (
                <p className="update-course-error-message">{imgError}</p>
              )}
            </div>
          </div>

          <button className="add-course-btn" onClick={submit}>
            ตกลง
          </button>
        </div>
      </Layout>
    </div>
  );
}

export default AddCourse;
