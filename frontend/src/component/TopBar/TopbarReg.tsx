import React from "react";
import { Link } from "react-router-dom";
import "./Topbar.css";

function TopbarReg() {
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
      </ul>
    </nav>
  );
}

export default TopbarReg;
