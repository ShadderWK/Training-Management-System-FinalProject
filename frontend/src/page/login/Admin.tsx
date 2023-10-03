import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AdminLogin } from "../../service/HttpClientService";

import SignInAdmin from "../../component/SignIn/SignInAdmin";
import TopbarNoDec from "../../component/TopBar/TopbarNoDec";

function Admin() {
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<String>("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("Role");
    if (role === "admin") {
      setRole(role);
    } else {
      localStorage.clear();
    }

    if (token) {
      setToken(token);
      navigate("/admin/home");
    }
  }, []);

  if (!token) {
    return (
      <div>
        <header>
          <TopbarNoDec />
        </header>
        <SignInAdmin loginRole={AdminLogin} />
      </div>
    );
  }

  return <div></div>;
}

export default Admin;
