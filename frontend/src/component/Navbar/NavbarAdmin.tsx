import React, { useState, useEffect } from "react";

import "./Navbar.css";
import UserIcon from "../../assets/UserIcon.svg";
import LogoIcon from "../../assets/Logo.png";

function NavbarAdmin() {
  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <img src={LogoIcon} className="navbar-img-logo" />
        <a>ผู้ดูแลระบบ</a>
      </div>

      <div className="navbar-profile">
        <img src={UserIcon} className="navbar-img" />
      </div>
    </div>
  );
}

export default NavbarAdmin;
