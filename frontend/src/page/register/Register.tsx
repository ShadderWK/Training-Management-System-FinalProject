import React, { useEffect, useState } from "react";
import "./Register.css";
import MemberReg1 from "../../assets/MemberLogin1.png";
import TopbarReg from "../../component/TopBar/TopbarReg";

import { notification } from "antd";

import { MemberInterface } from "../../interfaces/IMember";
import { CreateMember } from "../../service/HttpClientService";

type NotificationType = "success" | "info" | "warning" | "error";

function Register() {
  const MAX_FIRSTNAME_LENGTH = 30;
  const MAX_LASTNAME_LENGTH = 30;
  const MAX_ADDRESS_LENGTH = 300;

  const [member, setMember] = useState<MemberInterface>({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: "เกิดความผิดพลาด",
      description: errorMessage,
    });
  };

  enum GenderOptions {
    Female = 2,
    Male = 1,
    Unspecified = 3,
  }

  const handleInputRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const genderValue = e.target.value as keyof typeof GenderOptions;

    setMember({
      ...member,
      [name]: genderValue,
      GenderID: GenderOptions[genderValue],
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;

    let inputValue = e.target.value;

    if (name === "Tel") {
      inputValue = inputValue.replace(/\D/g, "");
      inputValue = inputValue.substring(0, 10);
    } else if (
      name === "Firstname" &&
      inputValue.length > MAX_FIRSTNAME_LENGTH
    ) {
      return;
    } else if (name === "Lastname" && inputValue.length > MAX_LASTNAME_LENGTH) {
      return;
    }

    setMember({ ...member, [name]: inputValue });
  };

  const handleInputChangeBirthday = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const name = e.target.name;
    setMember({
      ...member,
      [name]: new Date(e.target.value).toISOString(),
    });
  };

  const submit = async () => {
    if (
      !member.Firstname ||
      !member.Lastname ||
      !member.Email ||
      !member.Password ||
      !member.Address ||
      !member.GenderID ||
      !member.Birthday
    ) {
      setError(true);
      setErrorMessage("ข้อมูลไม่ครบถ้วน");
      openNotificationWithIcon("warning");
      return;
    }

    if (member.Password.length < 8) {
      setError(true);
      setErrorMessage("รหัสผ่านต้องไม่น้อยกว่า 8 ตัวอักษร");
      openNotificationWithIcon("warning");
      return;
    }

    if (member.Password !== confirmPassword) {
      setError(true);
      setErrorMessage("รหัสผ่านไม่ตรงกัน");
      openNotificationWithIcon("warning");
      return;
    }

    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!emailPattern.test(member.Email)) {
      setError(true);
      setErrorMessage("รูปแบบอีเมลไม่ถูกต้อง");
      openNotificationWithIcon("warning");
      return;
    }

    let data = {
      Firstname: member.Firstname,
      Lastname: member.Lastname,
      Email: member.Email,
      Password: member.Password,
      Tel: member.Tel,
      Address: member.Address,
      Birthday: member.Birthday,
      GenderID: member.GenderID,
      Image:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    };

    let res = await CreateMember(data);
    if (res.status) {
      window.location.href = "/";
      setSuccess(true);
    } else {
      setError(true);
      if (
        res.message ===
        'ERROR: duplicate key value violates unique constraint "idx_members_email" (SQLSTATE 23505)'
      ) {
        setErrorMessage("อีเมลนี้เคยถูกใช้สมัครสมาชิกไปแล้ว");
        openNotificationWithIcon("warning");
      }
    }
  };

  return (
    <div>
      <TopbarReg />
      {contextHolder}
      <div className="reg-container">
        <div className="reg-wrapper">
          <div className="reg-wrapper-2">
            <div className="reg-img">
              <img src={MemberReg1}></img>
            </div>
            <div className="reg-section">
              <h1>ลงทะเบียน</h1>
              <div className="reg-name">
                <input
                  value={member.Firstname}
                  name="Firstname"
                  onChange={handleInputChange}
                  placeholder="ชื่อ"
                />

                <input
                  value={member.Lastname}
                  name="Lastname"
                  onChange={handleInputChange}
                  placeholder="นามสกุล"
                />
              </div>

              <input
                value={member.Email}
                type="email"
                name="Email"
                onChange={handleInputChange}
                placeholder="อีเมล"
              />

              <input
                type="password"
                value={member.Password}
                name="Password"
                onChange={handleInputChange}
                placeholder="รหัสผ่าน"
              />

              <input
                type="password"
                placeholder="ยืนยันรหัสผ่าน"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <input
                value={member.Tel}
                name="Tel"
                onChange={handleInputChange}
                placeholder="เบอร์โทรศัพท์"
              />

              <input
                value={member.Address}
                name="Address"
                onChange={handleInputChange}
                placeholder="ที่อยู่"
              />

              <div className="reg-sex-bd">
                <div className="reg-sex-container">
                  <p>เพศ</p>
                  <div className="reg-sex-radio-container">
                    <div className="reg-sex-radio">
                      <input
                        type="radio"
                        onChange={handleInputRadioChange}
                        name="Gender"
                        value="Female"
                      />
                      <p>หญิง</p>
                    </div>

                    <div className="reg-sex-radio">
                      <input
                        type="radio"
                        onChange={handleInputRadioChange}
                        name="Gender"
                        value="Male"
                      />
                      <p>ชาย</p>
                    </div>

                    <div className="reg-sex-radio">
                      <input
                        type="radio"
                        onChange={handleInputRadioChange}
                        name="Gender"
                        value="Unspecified"
                      />
                      <p>ไม่ระบุ</p>
                    </div>
                  </div>
                </div>
                <div className="reg-bd">
                  <p>วันเกิด</p>
                  <input
                    type="date"
                    value={(member.Birthday + "").split("T")[0]}
                    name="Birthday"
                    onChange={handleInputChangeBirthday}
                  />
                </div>
              </div>
              <button onClick={submit}>ยืนยันการลงทะเบียน</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
