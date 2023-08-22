import React, { useEffect, useState } from "react";

import { MemberLogin } from "../../service/HttpClientService";

import SignInMember from "../../component/SignIn/SignInMember";
import TopbarNoDec from "../../component/TopBar/TopbarNoDec";
import Navbar from "../../component/Navbar/Navbar";
import Sidebar from "../../component/Sidebar/Sidebar";

function Member() {
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
        <SignInMember loginRole={MemberLogin} />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Sidebar />
    </div>
  );
}

export default Member;
