import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout, Alert, Image } from "antd";

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
  const qrCodeInputRef = useRef<HTMLInputElement | null>(null);
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
          setErrorMessage("รูปภาพไม่ถูกต้อง");
        }
      } else {
        setError(true);
        setErrorMessage("ไฟล์รูปภาพต้องมีขนาดไม่เกิน 300 KB");
      }
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
      !course.LinkContact ||
      !course.LinkFile ||
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
      LinkFile: course.LinkFile,
      LinkContact: course.LinkContact,
      QRContact: course.QRContact,
      Price: convertType(course.Price),
      AdminID: course.AdminID,
      CourseStatusID: course.CourseStatusID,
      StartTime: course.StartTime,
      EndTime: course.EndTime,
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
                name="Image"
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

              <div className="update-course-section-last-box">
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

              <div className="update-course-section-last">
                <div className="update-course-last-box-2">
                  <p>วันที่เริ่มอบรม</p>
                  <div className="update-course-title-input">
                    <input
                      name="StartTime"
                      type="date"
                      value={(course.StartTime + "").split("T")[0]}
                      onChange={handleInputDateTimeChange}
                    />
                  </div>
                </div>

                <div className="update-course-last-box-2">
                  <p>วันที่สิ้นสุดการอบรม</p>
                  <div className="update-course-title-input">
                    <input
                      name="EndTime"
                      type="date"
                      value={(course.EndTime + "").split("T")[0]}
                      onChange={handleInputDateTimeChange}
                    />
                  </div>
                </div>
              </div>

              <div className="update-course-section-last-box">
                <p>ลิงค์เอกสารการอบรม</p>
                <div className="update-course-price-section">
                  <div className="update-course-title-price">
                    <input
                      name="LinkFile"
                      value={course.LinkFile}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="update-course-section-last-box">
                <p>ลิงค์ช่องทางการติดต่อ</p>
                <div className="update-course-price-section">
                  <div className="update-course-title-price">
                    <input
                      name="LinkContact"
                      value={course.LinkContact}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>

              <div className="update-course-qr">
                <p>QRCode ช่องทางการติดต่อ</p>
                <div className="update-course-qr-img">
                  <div className="update-course-qr-container">
                    <Image src={course.QRContact} />
                    <button onClick={() => qrCodeInputRef.current?.click()}>
                      เปลี่ยนรูป
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
