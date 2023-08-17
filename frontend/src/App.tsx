import React from "react";
import { Router, Routes, Route, Link } from "react-router-dom";

//Page
import Member from "./page/login/Member";
import Admin from "./page/login/Admin";
import Register from "./page/register/Register";
//Component
import Topbar from "./component/TopBar/Topbar";

function App() {
  return (
    <div>
      <Routes>
        <Route path="" element={<Topbar />} />
        <Route path="member" element={<Member />} />
        <Route path="admin" element={<Admin />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
