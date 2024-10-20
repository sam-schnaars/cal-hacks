'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from "./components/Sidebar.js"
import ISTable from './components/ISTable.js';
import CFSTable from './components/CFSTable.js';
import BSTable from './components/BSTable.js';
import ChatPanel from './components/ChatPanel.js';

// Import all JSON files
import googleBS from "./jsons/gbs.json";
import googleIS from "./jsons/gis.json";
import googleCFS from "./jsons/gcfs.json";
import googleQuestions from "./questions/google_questions.json";

import appleBS from "./jsons/aapl-bs.json";
import appleIS from "./jsons/aapl-is.json";
import appleCFS from "./jsons/aapl-cfs.json";
import appleQuestions from "./questions/apple_quiz.json";

import nvidiaBS from "./jsons/nbs.json";
import nvidiaIS from "./jsons/nis.json";
import nvidiaCFS from "./jsons/ncfs.json";
import nvidiaQuestions from "./questions/nvidia_quiz.json";

function PracticeScreen() {
  const location = useLocation();
  const [selectedCompany, setSelectedCompany] = useState(location.state?.company || 'GOOG');

  const companyData = {
    GOOG: { bs: googleBS, is: googleIS, cfs: googleCFS, questions: googleQuestions },
    AAPL: { bs: appleBS, is: appleIS, cfs: appleCFS, questions: appleQuestions },
    NVDA: { bs: nvidiaBS, is: nvidiaIS, cfs: nvidiaCFS, questions: nvidiaQuestions },
  };

  const { bs, is, cfs, questions } = companyData[selectedCompany];

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
    const currentQuestion = questions.quiz.questions[currentQuestionIndex];
    setQuestion(currentQuestion);
    if (currentQuestion && currentQuestion.explanation) {
      setFeedback(<span className="text-black font-normal">{currentQuestion.explanation}</span>);
    } else {
      setFeedback(<span className="text-black font-normal">No explanation available.</span>);
    }
  };

  const handleCheck = () => {
    if (selectedOptionBeforeCheck) {
      setSelectedOption(selectedOptionBeforeCheck);
      setIsAnswered(true);
      setQuestion(questions.quiz.questions[currentQuestionIndex]);
      if (selectedOptionBeforeCheck === questions.quiz.questions[currentQuestionIndex].correctAnswer) {
        setFeedback(<><span className="text-green-500">Correct!</span><br /><span className="text-black font-normal">{questions.quiz.questions[currentQuestionIndex].explanation}</span></>);
      } else {
        setFeedback(<><span className="text-red-500">So close!</span><br /><span className="text-black font-normal">{questions.quiz.questions[currentQuestionIndex].explanation}</span></>);
      }
    }
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex < questions.quiz.questions.length - 1) {
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

  useEffect(() => {
    // Reset state when selectedCompany changes
    setCurrentQuestionIndex(0);
    setSelectedOptionBeforeCheck(null);
    setSelectedOption(null);
    setIsAnswered(false);
    setFeedback('');
    setQuestion({ "highlight": [""] });
  }, [selectedCompany]);

  return (
    <div className='flex flex-col h-screen'>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          currentQuestionIndex={currentQuestionIndex}
          handleOptionSelect={handleOptionSelect}
          selectedOptionBeforeCheck={selectedOptionBeforeCheck}
          selectedOption={selectedOption}
          isAnswered={isAnswered}
          feedback={feedback}
          handleCheck={handleCheck}
          questions={questions.quiz.questions}
          companyData={{
            bs, is, cfs, ticker: questions.quiz.ticker, title: questions.quiz.title
          }}
          selectedCompany={selectedCompany}
          setSelectedCompany={setSelectedCompany}
        />
        <div className="flex-1 flex flex-col overflow-auto">
          <main className="flex-1 p-6">
            <div className="flex flex-row space-x-4">
              <div className="flex-1">
                <BSTable question={question} isAnswered={isAnswered} company={selectedCompany}/>
              </div>
              <div className="flex-1 flex flex-col space-y-4">
                <ISTable question={question} isAnswered={isAnswered} company={selectedCompany}/>
                <CFSTable question={question} isAnswered={isAnswered} company={selectedCompany}/>
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
            {currentQuestionIndex + 1}/{questions.quiz.questions.length}
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
                disabled={currentQuestionIndex === questions.quiz.questions.length - 1}
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
