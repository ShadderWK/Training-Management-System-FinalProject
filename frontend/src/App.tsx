import React from "react";
import { Router, Routes, Route, Link } from "react-router-dom";

//Page
import Role from "../src/page/Role";
import Register from "./page/register/Register";
//Component
import Topbar from "./component/TopBar/Topbar";

function App() {
  return (
    <div>
      <Routes>
        <Route path="" element={<Topbar />} />
        <Route path="sign-in" element={<Role />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
