import React, { useEffect, useState } from "react";
import SignIn from "../../component/SignIn";
import { EmployeeLogin } from "../../service/HttpClientService";
import HomePage from "../../component/HomePage";

function Employee() {
  const [token, setToken] = useState<String>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  if (!token) {
    return <SignIn loginRole={EmployeeLogin} />;
  }

  return (
    <div>
      <HomePage />
    </div>
  );
}

export default Employee;
