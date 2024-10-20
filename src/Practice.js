'use client'

import React from 'react';
import AssetsTable from './components/AssetsTable.js';
import LiabilitiesTable from './components/LiabilitiesTable.js';
import IncomeAndCashFlowTable from './components/IncomeAndCashFlowTable.js';
import BalanceSheetTable from './components/BalanceSheetTable.js';
import Sidebar from "./components/Sidebar.js"
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ISTable from './components/ISTable.js';
import CFSTable from './components/CFSTable.js';
import BSTable from './components/BSTable.js';

function PracticeScreen() {

  const questions = [
    "What is the value of the companies assets?",
    "What is the value of the companies liabilites?",
    "What is total cash flow?",
  ]

  const [question, setQuestion] = useState({ "highlight": [""] });
  const [index, setIndex] = useState(0);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/'); // Navigate to the AnotherPage
  };

  return (
    <div className='flex flex-col h-screen'>
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-auto">
          <main className="flex-1 p-6">
            <div className="flex flex-row space-x-4">
              <div className="flex-1">
                <BSTable />
              </div>
              <div className="flex-1 flex flex-col space-y-4">
                <ISTable />
                <CFSTable />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full bg-background border-t border-gray-200">
        <div className="flex justify-between items-center px-4 py-3">
          <button className="bg-gray-300 text-black font-bold border border-black rounded-lg px-4 py-2">Back</button>
          <div className="flex gap-4">
            <button className="bg-gray-300 text-black font-bold border border-black rounded-lg px-4 py-2">Idk</button>
            <button className="bg-gray-800 text-white font-bold border border-black rounded-lg px-4 py-2">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}



export default PracticeScreen;
