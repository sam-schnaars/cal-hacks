import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Lesson from './components/Lesson.tsx';
import Quiz from './components/Quiz';
import AssetsTable from './components/AssetsTable.js';
import LiabilitiesTable from './components/LiabilitiesTable.js';
import IncomeAndCashFlowTable from './components/IncomeAndCashFlowTable.js';



function App() {

  const questions = [
    "What is the value of the companies assets?",
    "What is the value of the companies liabilites?",
    "What is total cash flow?",
  ]
  const innerTable = () => {
    return (
      <thead>
        <th className="border bg-slate-200 border-gray-300 px-4 py-2">Current Assets</th>
        <th className="border bg-slate-200 border-gray-300 px-4 py-2">Current Liabilities</th>
      </thead>  
    )
  }
  return (
    <Router>
      <Routes>
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
      
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div className="w-64 border-r bg-muted">
        <div className="p-4 font-semibold text-lg border-b">Questions</div>
        <div className="h-[calc(100vh-57px)]">
          <nav className="p-2">
            {questions.map((item, index) => (
              <div
                key={index}
                className={`p-2 rounded-md cursor-pointer ${
                  index == 0 ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                }`}
              >
                {item}
                <input className="bg-gray-100 rounded-md"></input>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex flex-row space-x-4">
            <div className="flex-1"><AssetsTable/></div>
            <div className="flex-1"><LiabilitiesTable/></div>
            <div className="flex-1"><IncomeAndCashFlowTable/></div>
          </div>
        </main>

        {/* Bottom Right Buttons */}
        <div className="p-4 flex justify-end gap-4">
          <Link to="/quiz">IDK</Link>
          <Link to="/next">Next</Link>
        </div>
      </div>
    </div>
    </Router>
  );
}



export default App;

