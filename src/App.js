import React from 'react';
import AssetsTable from './components/AssetsTable.js';
import LiabilitiesTable from './components/LiabilitiesTable.js';
import Sidebar from "./components/Sidebar.js"



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
      <div className="flex-1">
        <main className="flex-1 flex flex-row p-6">
          <AssetsTable/>
          <LiabilitiesTable dataType="Liabilities and Stockholders' Equity"/>
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
