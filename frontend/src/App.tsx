import React, { useEffect, useState } from "react";
import { Router, Routes, Route, Link } from "react-router-dom";

//Page
import Member from "./page/login/Member";
import Admin from "./page/login/Admin";
import Register from "./page/register/Register";
import Home from "./component/Home/Home";
import Course from "./component/Course/Course";
import FAQ from "./component/FAQ/FAQ";
//Component
import Topbar from "./component/TopBar/Topbar";

function App() {
  const [token, setToken] = useState<String>("");
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Topbar />} />
        <Route path="/register" element={<Register />} />

        <Route path="member" element={<Member />} />
        <Route path="member/home" element={<Home />} />
        <Route path="member/course/:id" element={<Course />} />
        <Route path="member/faq" element={<FAQ />} />

        <Route path="admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
