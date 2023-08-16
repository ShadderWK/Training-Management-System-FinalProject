import React from "react";
import "./Topbar.css";

function Topbar() {
  return (
    <nav>
      <a className="Title">Training Management System</a>

      <ul>
        <li>
          <a href="sign-in">เข้าสู่ระบบ</a>
        </li>

        <span>|</span>

        <li>
          <a href="register">สมัครสมาชิก</a>
        </li>
      </ul>
    </nav>
  );
}

export default Topbar;
