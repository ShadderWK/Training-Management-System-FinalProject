import React, { useEffect, useState } from "react";

import { AdminLogin } from "../../service/HttpClientService";

import SignInAdmin from "../../component/SignIn/SignInAdmin";
import TopbarNoDec from "../../component/TopBar/TopbarNoDec";

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
