import React from "react";
import { Link } from "react-router-dom";
import "./Topbar.css";

function Topbar() {
  return (
    <div className="background-container">
      <div>
        <nav className="topbar">
          <a className="title" href="/">
            Training Management System
          </a>

          <ul className="topUl">
            <li>
              <Link to="/member">
                <a>เข้าสู่ระบบ/สมัครสมาชิก</a>
              </Link>
            </li>
          </ul>
        </nav>

        <img
          className="background-image"
          src="https://ird.sut.ac.th/ird2020/images/Cover/cover2-22.09.63-02.jpg"
          alt="Background Image"
        />
      </div>
    </div>
  );
}

export default Topbar;
