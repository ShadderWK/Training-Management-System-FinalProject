import React from "react";
import { Link } from "react-router-dom";
import "./Topbar.css";

function Topbar() {
  return (
    <nav className="topbar">
      <a className="title" href="/">
        Training Management System
      </a>

      <ul className="topUl">
        <li>
          <Link to="/member">
            <a>เข้าสู่ระบบ</a>
          </Link>
        </li>

        <span>|</span>

        <li>
          <Link to="/register">
            <a>สมัครสมาชิก</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Topbar;
