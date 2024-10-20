'use client'

import React from 'react';
import AssetsTable from './components/AssetsTable.js';
import LiabilitiesTable from './components/LiabilitiesTable.js';
import IncomeAndCashFlowTable from './components/IncomeAndCashFlowTable.js';
import BalanceSheetTable from './components/BalanceSheetTable.js';
import Sidebar from "./components/Sidebar.js"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PracticeScreen() {

  const questions = [
    "What is the value of the companies assets?",
    "What is the value of the companies liabilites?",
    "What is total cash flow?",
  ]

  const [question, setQuestion] = useState({"highlight":[""]});
  const [index, setIndex] = useState(0);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/'); // Navigate to the AnotherPage
  };

  return (
    <div className='flex-col'>
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar setQuestion={setQuestion}/>
      {/* Main Content */}

      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex flex-row space-x-4">
            <div className="flex-1"><BalanceSheetTable question={question}/></div>
            <div className="flex-1"><IncomeAndCashFlowTable question={question}/></div>
          </div>
        </main>
      </div>
    </div>
    </div>
  );
}



export default PracticeScreen;
