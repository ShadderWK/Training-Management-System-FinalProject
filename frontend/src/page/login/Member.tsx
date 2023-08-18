import React, { useEffect, useState } from "react";

import { MemberLogin } from "../../service/HttpClientService";

import SignInMember from "../../component/SignIn/SignInMember";
import Navbar from "../../component/Navbar";
import TopbarAdmin from "../../component/TopBar/TopbarNoDec";

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
        <TopbarAdmin />
        <SignInMember loginRole={MemberLogin} />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
    </div>
  );
}

export default Member;
