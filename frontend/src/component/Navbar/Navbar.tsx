import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { MemberInterface } from "../../interfaces/IMember";

import { GetMemberByID } from "../../service/HttpClientService";

import "./Navbar.css";
import UserIcon from "../../assets/UserIcon.svg";
import LogoIcon from "../../assets/Logo.png";

function Navbar() {
  const [member, setMember] = useState<MemberInterface>({});
  const Uid = localStorage.getItem("uid") + "";
  const Token = localStorage.getItem("token") + "";
  const navigate = useNavigate();

  const fetchMemberByID = async () => {
    let res = await GetMemberByID(Uid + "");
    res && setMember(res);
  };

  useEffect(() => {
    fetchMemberByID();
  }, [navigate]);

  return (
    <div className="navbar-container">
      <div className="navbar-logo">
        <img src={LogoIcon} className="navbar-img-logo" />
        <a>สถาบันวิจัยและพัฒนา</a>
      </div>

      <div className="navbar-profile">
        <div className="navbar-name">
          {member.Firstname} {member.Lastname}
        </div>
        <img
          src={member.Image}
          onClick={() => navigate(`/member/profile/${Uid}`)}
          className="navbar-img"
        />
      </div>
    </div>
  );
}

export default Navbar;
