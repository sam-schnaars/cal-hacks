'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from "./components/Sidebar.js"
import ISTable from './components/ISTable.js';
import CFSTable from './components/CFSTable.js';
import BSTable from './components/BSTable.js';
import data from "./google_questions.json";

function PracticeScreen() {
  const questions = data.quiz.questions;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionBeforeCheck, setSelectedOptionBeforeCheck] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [question, setQuestion] = useState({ "highlight": [""] });

  const navigate = useNavigate();

  const handleOptionSelect = (optionId) => {
    setSelectedOptionBeforeCheck(optionId);
  };

  const handleIDK = () => {
    setIsAnswered(true);
    setSelectedOption(null); // No option was selected
    setQuestion(questions[currentQuestionIndex]);
    setFeedback(<span className="text-black font-normal">{questions[currentQuestionIndex].explanation}</span>);
  };

  const handleCheck = () => {
    if (selectedOptionBeforeCheck) {
      setSelectedOption(selectedOptionBeforeCheck);
      setIsAnswered(true);
      setQuestion(questions[currentQuestionIndex]);
      if (selectedOptionBeforeCheck === questions[currentQuestionIndex].correctAnswer) {
        setFeedback(<><span className="text-green-500">Correct!</span><br /><span className="text-black font-normal">{questions[currentQuestionIndex].explanation}</span></>);
      } else {
        setFeedback(<><span className="text-red-500">So close!</span><br /><span className="text-black font-normal">{questions[currentQuestionIndex].explanation}</span></>);
      }
    }
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex < questions.length - 1) {
        setSelectedOption(null);
        setSelectedOptionBeforeCheck(null);
        setIsAnswered(false);
        setFeedback('');
        setQuestion({"highlight":[""]});
        return prevIndex + 1;
      }
      return prevIndex;
    });
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex > 0) {
        setSelectedOption(null);
        setSelectedOptionBeforeCheck(null);
        setIsAnswered(false);
        setFeedback('');
        setQuestion({"highlight":[""]});
        return prevIndex - 1;
      }
      return prevIndex;
    });
  };

  // Add this new useEffect hook for keyboard events
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        if (!isAnswered && selectedOptionBeforeCheck) {
          handleCheck();
        } else if (isAnswered && currentQuestionIndex < questions.length - 1) {
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [isAnswered, selectedOptionBeforeCheck, currentQuestionIndex, questions.length]);

  return (
    <div className='flex flex-col h-screen'>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          setQuestion={setQuestion}
          currentQuestionIndex={currentQuestionIndex}
          handleOptionSelect={handleOptionSelect}
          selectedOptionBeforeCheck={selectedOptionBeforeCheck}
          selectedOption={selectedOption}
          isAnswered={isAnswered}
          feedback={feedback}
          handleCheck={handleCheck}
        />
        <div className="flex-1 flex flex-col overflow-auto">
          <main className="flex-1 p-6">
            <div className="flex flex-row space-x-4">
              <div className="flex-1">
                <BSTable question={questions[currentQuestionIndex]} isAnswered={isAnswered}/>
              </div>
              <div className="flex-1 flex flex-col space-y-4">
                <ISTable question={question} isAnswered={isAnswered}/>
                <CFSTable question={question} isAnswered={isAnswered}/>
              </div>
            </div>
          </main>
        </div>
      </div>

      <div className="w-full bg-navy border-t border-gray-200">
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
            {!isAnswered && (
              <>
                <button 
                  onClick={handleIDK} 
                  className="bg-gray-300 text-black font-bold border border-black rounded-lg px-4 py-2"
                >
                  Idk
                </button>
                <button 
                  onClick={handleCheck}
                  className={`font-bold rounded-lg px-4 py-2 transition-colors duration-200
                    ${selectedOptionBeforeCheck 
                      ? 'bg-gray-300 text-black border border-black' 
                      : 'bg-gray-200 text-white border border-white'}`}
                  disabled={!selectedOptionBeforeCheck}
                >
                  Check
                </button>
              </>
            )}
            {isAnswered && (
              <button
                onClick={handleNext}
                className="bg-gray-800 text-white font-bold border border-black rounded-lg px-4 py-2"
                disabled={currentQuestionIndex === questions.length - 1}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PracticeScreen;
