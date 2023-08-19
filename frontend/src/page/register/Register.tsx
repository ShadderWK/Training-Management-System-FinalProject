import React from "react";
import "./Register.css";
import MemberReg1 from "../../assets/MemberLogin1.png"
import Topbar from "../../component/TopBar/Topbar";

function Register() {
  return (
    <div>
      <Topbar />
      <div className="wrapper-reg">
        <div className="photo-reg">
          <img src={MemberReg1} />
        </div>
        <div className="from-reg">
          <h3 className="header-reg">ลงทะเบียน</h3>
          <div className="input-namereg">
            <input placeholder="ชื่อ"></input>
            <input placeholder="สกุล"></input>
          </div>
          <div className="input-allreg">
            <input placeholder="อีเมล"></input>
            <input placeholder="รหัสผ่าน"></input>
            <input placeholder="ยืนยันรหัสผ่าน"></input>
            <input placeholder="เบอร์โทรศัพท์"></input>
            <input placeholder="ที่อยู๋"></input>
          </div>
          <div className="Date-sex-reg">
            <div className="input-sexreg"></div>
            <div className="input-datereg"></div>
          </div>
          <div className="form-bntreg">
            <button className="input-bntreg">
              ยืนยันการลงทะเบียน   
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
