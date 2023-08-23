import React from "react";
import "./Register.css";
import MemberReg1 from "../../assets/MemberLogin1.png"
import TopbarReg from "../../component/TopBar/TopbarReg";
import { MemberInterface } from "../../interfaces/IMember";

function Register() {

  return (
    <div>
      <TopbarReg />
      <div className="wrapper-reg">
      <div className="wrapper-reg2">
        <div className="photo-reg">
          <img src={MemberReg1} />
        </div>
        <div className="from-reg">
          <h3 className="header-reg">ลงทะเบียน</h3>
          <div className="input-namereg">
            <input className="input-namereg-text" placeholder="ชื่อ"></input>
            <input className="input-namereg-text" placeholder="สกุล"></input>
          </div>
          <div className="input-allreg">
            <input className="input-allin" placeholder="อีเมล"></input>
            <input className="input-allin" placeholder="รหัสผ่าน"></input>
            <input className="input-allin" placeholder="ยืนยันรหัสผ่าน"></input>
            <input className="input-allin" placeholder="เบอร์โทรศัพท์"></input>
            <input className="input-allin" placeholder="ที่อยู่"></input>
          </div>
          <div>
          <div className="layout-sexdate">
            <div className="form-sexreg">
              เพศ
            </div>
            <div className="form-sexreg">
              วันเกิด
            </div>
          </div>
          <div className="Date-sex-reg">
            <div className="input-sexreg">
              <label className="container-reg">หญิง
                <input type="radio" name="radio" />
                <span className="checkmark-reg"></span>
              </label>
              <label className="container-reg">ชาย
                <input type="radio" name="radio"/>
                <span className="checkmark-reg"></span>
              </label>
              <label className="container-reg">ไม่ระบุ
                <input type="radio" name="radio"/>
                <span className="checkmark-reg"></span>
              </label>
            </div>
            <div className="input-datereg">
              <input type="date" name="date-reg"/>
            </div>
          </div>
          </div>
          <div className="form-bntreg">
            <button className="input-bntreg">
              ยืนยันการลงทะเบียน   
            </button>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Register;
