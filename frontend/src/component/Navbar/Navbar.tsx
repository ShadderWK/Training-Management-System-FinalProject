import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { MemberInterface } from "../../interfaces/IMember";

import "./Navbar.css";
import UserIcon from "../../assets/UserIcon.svg";
import LogoIcon from "../../assets/Logo.png";

function Navbar() {
  const [member, setMember] = useState<MemberInterface>({});
  const Uid = localStorage.getItem("uid") + "";
  const Token = localStorage.getItem("token") + "";
  const Firstname = localStorage.getItem("Firstname") + "";
  const Lastname = localStorage.getItem("Lastname") + "";
  const Fullname = Firstname + " " + Lastname;

  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <img src={LogoIcon} className="navbar-img" />
        <a>สถาบันวิจัยและพัฒนา</a>
      </div>

      <div className="navbar-profile">
        <div className="navbar-name">{Fullname}</div>
        <img src={UserIcon} className="navbar-img" />
      </div>
    </div>
  );
}

export default Navbar;
