import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { MemberLogin } from "../../service/HttpClientService";

import SignInMember from "../../component/SignIn/SignInMember";
import TopbarNoDec from "../../component/TopBar/TopbarNoDec";

function Member() {
  const [token, setToken] = useState<String>("");
  const [role, setRole] = useState<String>("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("Role");
    if (role === "member") {
      setRole(role);
    } else {
      localStorage.clear();
    }

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
