import React from "react";
import "./Topbar.css";

function TopbarReg() {
  return (
    <nav className="topbar">
      <a className="title" href="/">
        Training Management System
      </a>

      <ul className="topUl">
        <li>
          <a href="/member">เข้าสู่ระบบ</a>
        </li>

        <span>|</span>

        <li>
          <a href="/register" className="topbarActive">
            สมัครสมาชิก
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default TopbarReg;
