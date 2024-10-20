import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import data from "../google_questions.json";
import ChatPanel from './ChatPanel';
import mappings from "../companies_mapping.json";

<<<<<<< Updated upstream
const Sidebar = ({ 
  currentQuestionIndex, 
  handleOptionSelect, 
  selectedOptionBeforeCheck,
  selectedOption, 
  isAnswered, 
  feedback,
  handleCheck // Add this prop
}) => {
=======
const Sidebar = ({ currentQuestionIndex, handleOptionSelect, selectedOption, isAnswered, feedback, companyInfo }) => {
>>>>>>> Stashed changes
  const questions = data.quiz.questions;
  const labels = ['A', 'B', 'C', 'D'];
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(-1);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (isAnswered) return;

      const currentOptions = questions[currentQuestionIndex].options;
      
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          setFocusedOptionIndex((prevIndex) => 
            prevIndex > 0 ? prevIndex - 1 : currentOptions.length - 1
          );
          break;
        case 'ArrowDown':
          event.preventDefault();
          setFocusedOptionIndex((prevIndex) => 
            prevIndex < currentOptions.length - 1 ? prevIndex + 1 : 0
          );
          break;
        case 'Enter':
          event.preventDefault();
          if (focusedOptionIndex !== -1) {
            handleOptionSelect(currentOptions[focusedOptionIndex].id);
            handleCheck(); // Immediately check the answer
          }
          break;
        default:
          const key = event.key.toUpperCase();
          if (labels.includes(key)) {
            const optionIndex = labels.indexOf(key);
            if (optionIndex < currentOptions.length) {
              handleOptionSelect(currentOptions[optionIndex].id);
              setFocusedOptionIndex(optionIndex);
            }
          }
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentQuestionIndex, handleOptionSelect, handleCheck, isAnswered, questions, focusedOptionIndex]);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/');
  };

  return (
    <>
      <div className="w-64 border-r bg-muted">
        <div className='border-b'>
          <button onClick={handleButtonClick}><div className="text-4xl font-bold p-4">10-Kademy</div></button>
        </div>
        <div className="p-4 font-semibold text-lg border-b">
          <div className="flex items-center">
            <strong>{companyInfo.symbol}</strong>:&nbsp;
            {mappings[companyInfo.symbol].name}&nbsp;
            <button onClick={handleButtonClick} className="inline-flex items-center justify-center transition-colors duration-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="h-[calc(100vh-57px)]">
          <nav className="p-2">
            <div className="p-2 rounded-md bg-primary text-primary-foreground">
              {questions[currentQuestionIndex].text}
            </div>

            <div className="mt-4">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <div key={option.id} className="flex items-center mb-2">
                  <input
                    type="radio"
                    id={option.id}
                    name="options"
                    value={option.id}
                    checked={selectedOptionBeforeCheck === option.id}
                    onChange={() => handleOptionSelect(option.id)}
                    className="hidden"
                  />
                  <label
                    htmlFor={option.id}
                    className="flex items-center p-2 rounded-md cursor-pointer transition-colors duration-200"
                  >
                    <span className={`w-5 h-5 inline-block rounded-full mr-2 border-2 
                      ${!isAnswered && (selectedOptionBeforeCheck === option.id || focusedOptionIndex === index) ? 'bg-gray-400' : 
                        isAnswered && option.id === questions[currentQuestionIndex].correctAnswer ? 'bg-green-500' : 
                        isAnswered && option.id === selectedOption ? 'bg-red-500' : 
                        'bg-white'}`} 
                    />
                    <span className="mr-2">{labels[index]})</span>
                    <span className={`${isAnswered && option.id === selectedOption && option.id !== questions[currentQuestionIndex].correctAnswer ? 'text-gray-500' : ''}`}>
                      {option.text}
                    </span>
                  </label>
                </div>
              ))}
            </div>

            {isAnswered && (
              <div className="mt-2">
                <p className={`font-semibold ${selectedOption === questions[currentQuestionIndex].correctAnswer ? 'text-green-400' : 'text-red-400'}`}>
                  {feedback}
                </p>
              </div>
            )}
          </nav>
        </div>
      </div>

      <ChatPanel currentQuestion={questions[currentQuestionIndex]} />
    </>
  );
};

export default Sidebar;
