import React, { useEffect, useState } from "react";

import SignInMember from "../../component/SignIn/SignInMember";
import Navbar from "../../component/Navbar";
import TopbarSignIn from "../../component/TopBar/TopbarSignIn";

import { MemberLogin } from "../../service/HttpClientService";

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
        <TopbarSignIn />
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
