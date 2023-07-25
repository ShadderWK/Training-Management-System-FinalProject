import React from 'react';
import { Router, Routes, Route, Link } from "react-router-dom";

import HomePage from './component/HomePage';
import WelcomePage from './component/WelcomePage';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<WelcomePage />} />
        <Route path='/HomePage' element={<HomePage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
