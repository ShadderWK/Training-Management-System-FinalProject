import React from "react";
import "./Topbar.css";

function TopbarSignIn() {
  return (
    <nav className="topbar">
      <a className="title" href="/">
        Training Management System
      </a>

      <ul className="topUl">
        <li>
          <a href="member" className="topbarActive">
            เข้าสู่ระบบ
          </a>
        </li>

        <span>|</span>

        <li>
          <a href="register">สมัครสมาชิก</a>
        </li>
      </ul>
    </nav>
  );
}

export default TopbarSignIn;
