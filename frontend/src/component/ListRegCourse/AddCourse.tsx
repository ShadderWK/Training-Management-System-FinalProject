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
  const pdfInputRef = useRef<HTMLInputElement | null>(null);
  const [pdfFileName, setPdfFileName] = useState<string>("");
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
      setImgError("ไฟล์รูปภาพไม่ถูกต้อง");
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
        Name: course.Name,
        Detail: course.Detail,
        Image: course.Image,
        Pdf: course.Pdf,
        Price: convertType(course.Price),
        AdminID: adminID,
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

            <div className="add-course-section-3">
              <button onClick={() => imageInputRef.current?.click()}>
                เพิ่มรูปภาพ
              </button>

              {course.Image && (
                <div className="add-course-img-section">
                  <img src={course.Image} />
                </div>
              )}

              {imgError && (
                <p className="update-course-error-message">{imgError}</p>
              )}
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              ref={imageInputRef}
            />
            <div className="update-course-pdf">
              <p>เอกสาร (PDF)</p>
              <div className="update-course-pdf-upload">
                <a href={course.Pdf} target="_blank" download>
                  <FilePdfOutlined />
                  <span> </span> {pdfFileName}
                </a>

                <button onClick={() => pdfInputRef.current?.click()}>
                  อัพโหลดไฟล์
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
