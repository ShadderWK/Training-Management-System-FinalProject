import React, { useEffect, useState } from "react";
import SignIn from "../../component/SignIn";
import { MemberLogin } from "../../service/HttpClientService";
import HomePage from "../../component/HomePage";
import Navbar from "../../component/Navbar";

function Member() {
  const [token, setToken] = useState<String>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return <SignIn loginRole={MemberLogin} />;
  }

  return (
    <div>
      <Navbar />
    </div>
  );
}

export default Member;