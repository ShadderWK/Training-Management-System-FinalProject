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
        <Route path="/sign-in" element={<Role />} />

        {/* Member */}
        <Route path="/member" element={<Member />}></Route>
        <Route path="/member/homepage" element={<HomePage />}></Route>

        {/* Employee */}
        <Route path="employee" element={<Employee />}></Route>
      </Routes>
    </div>
  );
}

export default App;
