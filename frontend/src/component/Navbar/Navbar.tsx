import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { MemberInterface } from "../../interfaces/IMember";

import "./Navbar.css";
import UserIcon from "../../assets/UserIcon.svg";

function Navbar() {
  const [member, setMember] = useState<MemberInterface>({});
  const Uid = localStorage.getItem("uid") + "";
  const Token = localStorage.getItem("token") + "";
  const Firstname = localStorage.getItem("Firstname") + "";
  const Lastname = localStorage.getItem("Lastname") + "";
  const Fullname = Firstname + " " + Lastname;

  const signout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="navbar-container">
      <a href="/member/home">Training Management System</a>
      <div className="navbar-profile">
        <div className="navbar-name">{Fullname}</div>
        <img src={UserIcon} className="navbar-img" />
        <button onClick={signout}>ออก</button>
      </div>
    </div>
  );
}

export default Navbar;
