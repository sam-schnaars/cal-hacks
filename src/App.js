'use client'

import React from 'react';
import AssetsTable from './components/AssetsTable.js';
import LiabilitiesTable from './components/LiabilitiesTable.js';
import IncomeAndCashFlowTable from './components/IncomeAndCashFlowTable.js';
import BalanceSheetTable from './components/BalanceSheetTable.js';
import Sidebar from "./components/Sidebar.js"
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Homepage from './Home.tsx';
import PracticeScreen from './Practice.js';

function App() {

  // are these necessary anymore @sam?
  const questions = [
    "What is the value of the companies assets?",
    "What is the value of the companies liabilites?",
    "What is total cash flow?",
  ]

  const [question, setQuestion] = useState({"highlight":[""]});

  return (

    <Router>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/practice' element={<PracticeScreen/>}/>
      </Routes>
    </Router>

  );
}



export default App;
