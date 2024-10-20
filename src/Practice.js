'use client';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from "./components/Sidebar.js"
import ISTable from './components/ISTable.js';
import CFSTable from './components/CFSTable.js';
import BSTable from './components/BSTable.js';
import data from "./google_questions.json";

function PracticeScreen() {
  const questions = data.quiz.questions;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [question, setQuestion] = useState({ "highlight": [""] });

  const navigate = useNavigate();

  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    setIsAnswered(true);
    setQuestion(questions[currentQuestionIndex]);
    if (optionId === questions[currentQuestionIndex].correctAnswer) {
      setFeedback('Correct answer!');
    } else {
      setFeedback(`Incorrect answer. ${questions[currentQuestionIndex].explanation}`);
    }
  };

  const handleNext = () => {
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setCurrentQuestionIndex((prevIndex) => {
        if (prevIndex < questions.length - 1) {
          setSelectedOption(null);
          setIsAnswered(false);
          setFeedback('');
          return prevIndex + 1;
        }
        return prevIndex;
      });
    } else {
      alert('Please select the correct answer before proceeding.');
    }
    setQuestion({"highlight":[""]});
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex > 0) {
        setSelectedOption(null);
        setIsAnswered(false);
        setFeedback('');
        return prevIndex - 1;
      }
      return prevIndex;
    });
    setQuestion({"highlight":[""]});
  };

  return (
    <div className='flex flex-col h-screen'>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          setQuestion={setQuestion}
          currentQuestionIndex={currentQuestionIndex}
          handleOptionSelect={handleOptionSelect}
          selectedOption={selectedOption}
          isAnswered={isAnswered}
          feedback={feedback}
        />
        <div className="flex-1 flex flex-col overflow-auto">
          <main className="flex-1 p-6">
            <div className="flex flex-row space-x-4">
              <div className="flex-1">
                <BSTable question={question}/>
              </div>
              <div className="flex-1 flex flex-col space-y-4">
                <ISTable question={question}/>
                <CFSTable question={question}/>
              </div>
            </div>
          </main>
        </div>
      </div>

      <div className="w-full bg-background border-t border-gray-200">
        <div className="flex justify-between items-center px-4 py-3">
          <button
            onClick={handlePrevious}
            className="bg-gray-300 text-black font-bold border border-black rounded-lg px-4 py-2"
            disabled={currentQuestionIndex === 0}
          >
            Back
          </button>
          <div className="text-center">
            {currentQuestionIndex + 1}/{10}
          </div>
          <div className="flex gap-4">
            <button className="bg-gray-300 text-black font-bold border border-black rounded-lg px-4 py-2">Idk</button>
            <button
              onClick={handleNext}
              className="bg-gray-800 text-white font-bold border border-black rounded-lg px-4 py-2"
              disabled={!isAnswered || selectedOption !== questions[currentQuestionIndex].correctAnswer}
            >
              Next
            </button>
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
