import React from "react";
import { Link } from "react-router-dom";
import "./Topbar.css";

function TopbarNoDec() {
  return (
    <nav className="topbar">
      <a className="title" href="/">
        Training Management System
      </a>
    </nav>
  );
}

export default TopbarNoDec;
