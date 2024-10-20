import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatPanel from './ChatPanel';

const Sidebar = ({ 
  currentQuestionIndex, 
  handleOptionSelect, 
  selectedOptionBeforeCheck,
  selectedOption, 
  isAnswered, 
  feedback,
  handleCheck,
  questions,
  companyData
}) => {

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
      <div className='border-b flex justify-center'>
        <button onClick={handleButtonClick}>
          <div className="text-3xl font-bold p-4">
            10-Kademy<sub className="text-sm text-gray-500">beta</sub>
          </div>
        </button>
      </div>
      <div className="p-4 font-semibold text-lg border-b">
        <div className="flex items-center">
          <select
            value={companyData.ticker}
            onChange={(e) => {
              const newCompany = e.target.value;
              navigate('/practice', { state: { company: newCompany } });
            }}
            className="flex-grow border-2 rounded-lg p-1 mr-2"
            aria-label="Select a company"
          >
            <option value="GOOG">GOOG</option>
            <option value="AAPL">AAPL</option>
            <option value="NVDA">NVDA</option>
          </select>
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
