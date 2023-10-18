import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout, Alert } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";

import NavbarAdmin from "../Navbar/NavbarAdmin";
import SidebarAdmin from "../Sidebar/SidebarAdmin";

import { CourseInterface } from "../../interfaces/ICourse";

import { UpdateCourse, GetCourseByID } from "../../service/HttpClientService";

import "./UpdateCourse.css";

function UpdateCourses() {
  const { id } = useParams();
  const [course, setCourse] = useState<CourseInterface>({});
  const [pdfFileName, setPdfFileName] = useState<string>("");
  const [priceError, setPriceError] = useState<string>("");
  const [pdfError, setPdfError] = useState<string>("");
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<String>("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const pdfInputRef = useRef<HTMLInputElement | null>(null);
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

  const isImageType = (file: File) => {
    const acceptedImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    return acceptedImageTypes.includes(file.type);
  };

  const isPDFType = (file: File) => {
    return file.type === "application/pdf";
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0] as File;

    if (file && isImageType(file)) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setCourse({ ...course, Image: imageUrl });
      };
      reader.readAsDataURL(file);
    } else {
      setError(true);
      setErrorMessage("รูปภาพไม่ถูกต้อง");
    }
  };

  const handlePDFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0] as File;

    if (file && isPDFType(file)) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const pdfDataUrl = event.target?.result as string;
        setCourse({ ...course, Pdf: pdfDataUrl });
        setPdfFileName(file.name);
        setPdfError("");
      };
      reader.readAsDataURL(file);
    } else {
      setPdfError("ไฟล์ PDF ไม่ถูกต้อง");
      setPdfFileName("");
    }
  };

  const fetchCourse = async () => {
    let res = await GetCourseByID(id + "");
    res && setCourse(res);
  };

  const submit = async () => {
    if (typeof course.Price === "string") {
      const priceValue = parseFloat(course.Price);

      if (priceValue < 0) {
        setPriceError("ราคาห้ามน้อยกว่า 0 บาท");
        return;
      }
    }

    if (pdfError) {
      return;
    }

    if (
      !course.Image ||
      !course.Pdf ||
      !course.Name ||
      !course.Detail ||
      !course.Price
    ) {
      setError(true);
      setErrorMessage("ข้อมูลไม่ครบถ้วน");
      return;
    }

    let data = {
      ID: convertType(id),
      Name: course.Name,
      Detail: course.Detail,
      Image: course.Image,
      Pdf: course.Pdf,
      Price: convertType(course.Price),
      AdminID: course.AdminID,
      CourseStatusID: course.CourseStatusID,
    };
    console.log(data);

    let res = await UpdateCourse(data);
    if (res.status) {
      setSuccess(true);
      navigate(`/admin/course/${id}`);
    } else {
      setError(true);
    }
    console.log(JSON.stringify(data));
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

    fetchCourse();
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
        <div className="update-course-container">
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

          <h1>แก้ไขการอบรม</h1>
          <div className="update-course-section">
            <div className="update-course-img">
              <div className="update-course-img-container">
                <img src={course.Image} />
              </div>

              <button onClick={() => imageInputRef.current?.click()}>
                เปลี่ยนรูป
              </button>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
                ref={imageInputRef}
              />
            </div>
            <div className="update-course-input-section">
              <div className="update-course-title">
                <p>ชื่อหัวข้อ</p>
                <div className="update-course-title-input">
                  <input
                    name="Name"
                    value={course.Name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="update-course-title">
                <p>รายละเอียด</p>
                <div className="update-course-title-input">
                  <textarea
                    name="Detail"
                    value={course.Detail}
                    onChange={handleTextAreaChange}
                  />
                </div>
              </div>

              <div className="update-course-pdf">
                <p>เอกสาร (PDF)</p>
                <div className="update-course-pdf-upload">
                  <a href={course.Pdf} target="_blank" download>
                    <FilePdfOutlined />
                    {pdfFileName ? pdfFileName : " เอกสาร"}
                  </a>

                  <button onClick={() => pdfInputRef.current?.click()}>
                    อัพโหลดไฟล์ใหม่
                  </button>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handlePDFChange}
                    ref={pdfInputRef}
                    style={{ display: "none" }}
                  />
                  {pdfError && (
                    <p className="update-course-error-message">{pdfError}</p>
                  )}
                </div>
              </div>

              <div className="update-course-title">
                <p>ราคา</p>
                <div className="update-course-price-section">
                  <div className="update-course-title-price">
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

              <button className="update-course-btn" onClick={submit}>
                ยืนยันการแก้ไข
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default UpdateCourses;
