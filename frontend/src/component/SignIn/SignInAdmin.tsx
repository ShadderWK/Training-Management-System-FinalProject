import React, { useState } from "react";
import "./SignIn.css";

import { SignInInterface } from "../../interfaces/ISignIn";

import Alert from "../Alert/Alert";

type Prop = {
  loginRole: any;
};

function SignInAdmin({ loginRole }: Prop) {
  const [signin, setSignin] = useState<Partial<SignInInterface>>({});
  const [emailerror, setEmailError] = useState(false);
  const [passworderror, setPasswordError] = useState(false);
  const [error, setError] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof signin;
    const { value } = event.target;
    setSignin({ ...signin, [id]: value });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      submit();
    }
  };

  const handleClose = () => {
    setError(false);
  };

  const submit = async () => {
    if (signin.Email?.length == null || signin.Email.length == 0) {
      setEmailError(true);
    }

    if (signin.Password?.length == null || signin.Password.length == 0) {
      setPasswordError(true);
    }

    let res = await loginRole(signin);
    console.log(res.message);
    if (res) {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      setError(true);
    }
  };
  return (
    <div>
      <Alert
        trigger={error}
        title="อีเมลหรือรหัสผ่านไม่ถูกต้อง"
        message="อีเมลหรือรหัสผ่านของคุณไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง"
        onClose={handleClose}
      />
      <div className="wrapper-login">
        <div className="form-login">
          <p className="header-adminlogin">ยินดีต้อนรับผู้ดูแลระบบ</p>

          <div className="text-and-input">
            <p className="text-login">อีเมล</p>
            <input
              type="text"
              id="Email"
              className="input-login"
              value={signin.Email || ""}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            ></input>
            {emailerror &&
            (signin.Email?.length == null || signin.Email?.length == 0) ? (
              <p className="validate-login">กรุณากรอกอีเมล</p>
            ) : (
              ""
            )}
          </div>

          <div className="text-and-input">
            <p className="text-login">รหัสผ่าน</p>
            <input
              type="password"
              id="Password"
              className="input-login"
              value={signin.Password || ""}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            ></input>
            {passworderror &&
            (signin.Password?.length == null || signin.Password.length == 0) ? (
              <p className="validate-login">กรุณากรอกรหัสผ่าน</p>
            ) : (
              ""
            )}
          </div>

          <button className="btn-login" onClick={submit}>
            เข้าสู่ระบบ
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignInAdmin;
