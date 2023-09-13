import React, { useEffect, useState } from "react";
import "./Register.css";
import MemberReg1 from "../../assets/MemberLogin1.png";
import TopbarReg from "../../component/TopBar/TopbarReg";
import Alert from "../../component/Alert/Alert";
import { MemberInterface } from "../../interfaces/IMember";
import { GenderInterface } from "../../interfaces/IGender";
import { CreateMember } from "../../service/HttpClientService";
import { SelectChangeEvent } from "@mui/material/Select";

function Register() {
  const [member, setMember] = useState<MemberInterface>({});
  const [gender, setGender] = useState<GenderInterface[]>([]);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [pass, setPass] = React.useState<State>({
    password: "",
    showPassword: false,
  });

  const [radio, setRadio] = React.useState("");

  interface State {
    password: string;
    showPassword: boolean;
  }

  const handlePassword =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setPass({ ...pass, [prop]: event.target.value });
    };

  // ==============================(handle ShowPassword)=====================================
  const handleClickShowPassword = () => {
    setPass({
      ...pass,
      showPassword: !pass.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // =========================(handleClose)====================================================

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccess(false);
    setError(false);
  };

  // =========================(HandleChange)====================================================

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof member;
    console.log(event.target.name);
    console.log(event.target.value);
    setMember({
      ...member,
      [name]: event.target.value,
    });
    console.log(member);
  };

  const handleInputRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    console.log(name);
    setMember({ ...member, [name]: e.target.value });
  };

  // =========================(HandleInputChange)====================================================
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    console.log(name);
    setMember({ ...member, [name]: e.target.value });
  };

  // =========================(Fetch API)====================================================

  const apiUrl = "http://localhost:8080";
  const requestOptionsGet = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  const fetchGender = async () => {
    fetch(`${apiUrl}/genders`, requestOptionsGet)
      .then((response) => response.json())
      .then((result) => {
        setGender(result.data);
      });
  };

  useEffect(() => {
    fetchGender();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  console.log(member);

  // เพิ่มข้อมูลเข้า Database
  const submit = async () => {
    let data = {
      Firstname: member.Firstname,
      Lastname: member.Lastname,
      Password: pass.password,
      Email: member.Email,
      Tel: member.Tel,
      Address: member.Address,
      Birthday: member.Birthday,
      GenderID: convertType(member.GenderID),
    };
    // window.location.href = "/members"
    let res = await CreateMember(data);
    if (res.status) {
      window.location.href = "/user/profile-member";
      setSuccess(true);
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <TopbarReg />
      {/* <div className="wrapper-reg"> */}
      <div className="wrapper-reg2">
        <div className="photo-reg">
          <img src={MemberReg1} />
        </div>
        <div className="from-reg">
          <h3 className="header-reg">ลงทะเบียน</h3>
          <div className="input-namereg">
            <input
              className="input-namereg-text"
              placeholder="ชื่อ"
              onChange={handleInputChange}
            ></input>
            <input
              className="input-namereg-text"
              placeholder="สกุล"
              onChange={handleInputChange}
            ></input>
          </div>
          <div className="input-allreg">
            <input
              className="input-allin"
              placeholder="อีเมล"
              onChange={handleInputChange}
            ></input>
            <input
              className="input-allin"
              placeholder="รหัสผ่าน"
              onChange={handleInputChange}
            ></input>
            <input
              className="input-allin"
              placeholder="ยืนยันรหัสผ่าน"
              onChange={handleInputChange}
            ></input>
            <input
              className="input-allin"
              placeholder="เบอร์โทรศัพท์"
              onChange={handleInputChange}
            ></input>
            <input
              className="input-allin"
              placeholder="ที่อยู่"
              onChange={handleInputChange}
            ></input>
          </div>
          <div>
            <div className="layout-sexdate">
              <div className="form-sexreg">เพศ</div>
              <div className="form-sexreg">วันเกิด</div>
            </div>
            <div className="Date-sex-reg">
              <div className="input-sexreg">
                <label className="container-reg">
                  หญิง
                  <input
                    type="radio"
                    name="radio"
                    value={2}
                    onChange={handleInputRadioChange}
                  />
                  <span className="checkmark-reg"></span>
                </label>
                <label className="container-reg">
                  ชาย
                  <input
                    type="radio"
                    name="radio"
                    value={1}
                    onChange={handleInputRadioChange}
                  />
                  <span className="checkmark-reg"></span>
                </label>
                <label className="container-reg">
                  ไม่ระบุ
                  <input
                    type="radio"
                    name="radio"
                    value={3}
                    onChange={handleInputRadioChange}
                  />
                  <span className="checkmark-reg"></span>
                </label>
              </div>
              <div className="input-datereg">
                <input
                  type="date"
                  name="date-reg"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="form-bntreg">
            <button className="input-bntreg" onClick={submit}>
              ยืนยันการลงทะเบียน
            </button>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default Register;
