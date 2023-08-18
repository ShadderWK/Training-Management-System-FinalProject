import React, { useEffect, useState } from "react";

import { AdminLogin } from "../../service/HttpClientService";

import SignInAdmin from "../../component/SignIn/SignInAdmin";
import TopbarAdmin from "../../component/TopBar/TopbarNoDec";
import Navbar from "../../component/Navbar";

function Admin() {
  const [token, setToken] = useState<String>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return (
      <div>
        <TopbarAdmin />
        <SignInAdmin loginRole={AdminLogin} />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
    </div>
  );
}

export default Admin;
