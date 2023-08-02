import React from "react";
import { Router, Routes, Route, Link } from "react-router-dom";

//Page
import Welcome from "../src/page/Welcome";
import Role from "../src/page/Role";
import Member from "./page/login/Member";
import Employee from "./page/login/Employee";
//Component
import HomePage from "./component/HomePage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/role" element={<Role />} />
        <Route path="/homepage" element={<HomePage />}></Route>
        {/* Member */}
        <Route path="role/member" element={<Member />}></Route>
        {/* Employee */}
        <Route path="role/employee" element={<Employee />}></Route>
      </Routes>
    </div>
  );
}

export default App;
