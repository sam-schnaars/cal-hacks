'use client';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar.js';
import BSTable from './components/BSTable.js';
import ISTable from './components/ISTable.js';
import CFSTable from './components/CFSTable.js';

function PracticeScreen() {
  const questions = [
    "What is the value of the company's assets?",
    "What is the value of the company's liabilities?",
    "What is total cash flow?",
  ];

  const [question, setQuestion] = useState({ highlight: [""] });
  const [index, setIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null); // Track the selected answer
  const [isAnswered, setIsAnswered] = useState(false); // Track if the question is answered
  const [feedback, setFeedback] = useState(''); // Store feedback message

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/'); // Navigate to another page
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar setQuestion={setQuestion} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Scrollable Main Section */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex flex-row space-x-4">
            <div className="flex-1">
              <BSTable question={question} />
            </div>
            <div className="flex-1 flex flex-col space-y-4">
              <ISTable question={question} />
              <CFSTable question={question} />
            </div>
          </div>
        </main>

        {/* Fixed Footer Section */}
        <div className="p-4 flex justify-end gap-4 border-t-2">
          <button className="px-4 py-2 bg-gray-300 rounded">IDK</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>
        </div>
      </div>
    </div>
  );
}

export default PracticeScreen;
