import React from "react";
import { Router, Routes, Route, Link } from "react-router-dom";

//Page
import Welcome from "../src/page/Welcome";
import Role from "../src/page/Role";
//Component
import HomePage from "./component/HomePage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/role" element={<Role />} />
        <Route path="/HomePage" element={<HomePage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
