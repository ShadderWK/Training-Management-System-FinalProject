import React, { useEffect, useState } from "react";

import { MemberLogin } from "../../service/HttpClientService";

import SignInMember from "../../component/SignIn/SignInMember";
import TopbarNoDec from "../../component/TopBar/TopbarNoDec";

import { useNavigate } from "react-router-dom";

function Member() {
  const [token, setToken] = useState<String>("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      navigate("/member/home");
    }
  }, [navigate]);

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

  return <div></div>;
}

export default Member;
