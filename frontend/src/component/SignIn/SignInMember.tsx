import React, { useState } from "react";

import { SignInInterface } from "../../interfaces/ISignIn";
import "./SignIn.css";

import MemberLogin1 from "../../assets/MemberLogin1.png";

type Prop = {
  loginRole: any;
};

function SignInMember({ loginRole }: Prop) {
  const [signin, setSignin] = useState<Partial<SignInInterface>>({});

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof signin;
    const { value } = event.target;
    setSignin({ ...signin, [id]: value });
  };

  const submit = async () => {
    let res = await loginRole(signin);
    console.log(res);
    if (res) {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
    }
  };

  return (
    <div className="wrapper-login">
      <div className="img-login">
        <img src={MemberLogin1} />
      </div>

      <div className="form-login">
        <p className="header-memlogin">ยินดีต้อนรับสู่บริการอบรม</p>

        <div className="text-and-input">
          <p className="text-login">อีเมล</p>
          <input
            type="text"
            id="Email"
            className="input-login"
            value={signin.Email || ""}
            onChange={handleInputChange}
          ></input>
        </div>

        <div className="text-and-input">
          <p className="text-login">รหัสผ่าน</p>
          <input
            type="password"
            id="Password"
            className="input-login"
            value={signin.Password || ""}
            onChange={handleInputChange}
          ></input>
        </div>

        <button className="btn-login" onClick={submit}>
          เข้าสู่ระบบ
        </button>
      </div>
    </div>
  );
}

export default SignInMember;
