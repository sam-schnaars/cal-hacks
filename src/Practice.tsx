'use client';

import React, { useState } from 'react';
import Sidebar from "./components/Sidebar.js";
import ISTable from './components/ISTable.js';
import CFSTable from './components/CFSTable.js';
import BSTable from './components/BSTable.js';
import questionz from "./test_questions.json";
import Review from './components/Review.js'; // Import the Review component
import { useParams } from 'react-router-dom';
import is_data from './gis.json';
import cfs_data from './gcfs.json';
import bs_data from './gbs.json';

function PracticeScreen() {
  const questions = questionz.quiz.questions;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [reviewMode, setReviewMode] = useState(false);
  const [highlight, setHighlight] = useState({});
  const params = useParams<{ symbol: string; cik: string }>();
  const { symbol, cik } = params;

  // Parse cik to an integer
  const cikNumber = cik ? parseInt(cik, 10) : null;
  // Store selected answers and correct answers for review
  const [userAnswers, setUserAnswers] = useState(questions.map(q => ({
    selectedOption: null,
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    text: q.text
  })));

  const handleOptionSelect = (optionId) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex].selectedOption = optionId; // Store user's answer
    setUserAnswers(updatedAnswers);
    setHighlight(questions[currentQuestionIndex])
    setSelectedOption(optionId);
    setIsAnswered(true);
    if (optionId === questions[currentQuestionIndex].correctAnswer) {
      setFeedback('Correct answer!');
    } else {
      setFeedback(`Incorrect answer. ${questions[currentQuestionIndex].explanation}`);
    }
  };

  const handleNext = () => {
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      // Check if we're on the last question
      if (currentQuestionIndex === questions.length - 1) {
        // If on the last question, switch to review mode
        setReviewMode(true);
      } else {
        // Otherwise, proceed to the next question
        setCurrentQuestionIndex((prevIndex) => {
          // Reset state for the next question
          setSelectedOption(null); // Reset selected option
          setIsAnswered(false); // Reset answered state
          setFeedback(''); // Clear feedback
          return prevIndex + 1;
        });
      }
    } else {
      alert('Please select the correct answer before proceeding.');
    }
    setHighlight({})
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex > 0) {
        setSelectedOption(null); // Reset selected option
        setIsAnswered(false); // Reset answered state
        setFeedback(''); // Clear feedback
        return prevIndex - 1;
      }
      return prevIndex;
    });
  };

  const handleBackToPractice = () => {
    setReviewMode(false); // Exit review mode
    setCurrentQuestionIndex(0); // Reset to the first question
    setSelectedOption(null); // Reset selected option
    setIsAnswered(false); // Reset answered state
    setFeedback(''); // Clear feedback
    setUserAnswers(questions.map(q => ({ // Reset user answers
      selectedOption: null,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      text: q.text
    })));
  };

  // Filter answered questions for review
  const answeredQuestions = userAnswers.filter(answer => answer.selectedOption !== null);

  return (
    <div className='flex flex-col h-screen'>
        
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          companyInfo={{"symbol":symbol, "cik":cik}}
          currentQuestionIndex={currentQuestionIndex}
          handleOptionSelect={handleOptionSelect}
          selectedOption={selectedOption}
          isAnswered={isAnswered}
          feedback={feedback}
        />
        <div className="flex-1 flex flex-col overflow-auto">
          <main className="flex-1 p-6">
            {reviewMode ? ( // Conditional rendering
              <div>
                <Review 
                    questions={answeredQuestions} // Pass only answered questions
                    onBackToPractice={handleBackToPractice}
                    totalQuestions={questions.length} // Pass total questions
                />
                <button 
                  onClick={handleBackToPractice} 
                  className="mt-4 bg-blue-600 text-white font-bold border border-black rounded-lg px-4 py-2"
                >
                  Keep Going
                </button>
              </div>
            ) : (
              <div className="flex flex-row space-x-4">
                <div className="flex-1">
                  <BSTable question={highlight} bs_data={bs_data}/> {/* Pass selectedOption */}
                </div>
                <div className="flex-1 flex flex-col space-y-4">
                  <ISTable question={highlight}  is_data={is_data}/> {/* Pass selectedOption */}
                  <CFSTable question={highlight} cfs_data={cfs_data}/> {/* Pass selectedOption */}
                </div>
              </div>
            )}
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
            {currentQuestionIndex + 1}/{questions.length}
          </div>
          {!reviewMode && (
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
          )}
        </div>
      </div>
    </div>
  );
}

export default PracticeScreen;
