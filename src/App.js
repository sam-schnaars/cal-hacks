"use client";

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Homepage from "./Home.tsx";
import PracticeScreenOld from "./Practice.js";
import PracticeScreen2 from "./Practice2.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/practice" element={<PracticeScreen2 />} />
        <Route path="/practice_old" element={<PracticeScreenOld />} />
      </Routes>
    </Router>
  );
}

export default App;
