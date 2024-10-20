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
import PracticeScreen from './Practice.tsx';

function App() {
  return (

    <Router>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path="/practice/:symbol/:cik" element={<PracticeScreen />} />
      </Routes>
    </Router>

  );
}



export default App;
