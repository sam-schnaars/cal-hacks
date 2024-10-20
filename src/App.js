import React from 'react';
import AssetsTable from './components/AssetsTable.js';
import LiabilitiesTable from './components/LiabilitiesTable.js';
import IncomeAndCashFlowTable from './components/IncomeAndCashFlowTable.js';
import BalanceSheetTable from './components/BalanceSheetTable.js';
import Sidebar from "./components/Sidebar.js"
import BSTable from './components/BSTable.js';
import ISTable from './components/ISTable.js';
import CFSTable from './components/CFSTable.js';

function App() {

  const questions = [
    "What is the value of the companies assets?",
    "What is the value of the companies liabilites?",
    "What is total cash flow?",
  ]
  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar/>
      {/* Main Content */}

      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex flex-row space-x-4">
            <div className="flex-1">
              <BSTable/>
            </div>
            <div className="flex-1 flex flex-col space-y-4">
              <ISTable/>
              <CFSTable/>
            </div>
          </div>
        </main>

        {/* Bottom Right Buttons */}
        <div className="p-4 flex justify-end gap-4">
          <button>IDK</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
}



export default App;
