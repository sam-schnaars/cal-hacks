import React, { useState } from 'react';
import data from "../google_questions.json";
import { useNavigate } from 'react-router-dom';

const Sidebar = ({setQuestion}) => {
  const questions = data.quiz.questions; // Use questions from the JSON

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null); // Track the selected answer
  const [isAnswered, setIsAnswered] = useState(false); // Track if the question is answered
  const [feedback, setFeedback] = useState(''); // Store feedback message

  // Function to handle option selection
  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    setIsAnswered(true);
    setQuestion(questions[currentQuestionIndex]);
    // Provide feedback on the selected answer
    if (optionId === questions[currentQuestionIndex].correctAnswer) {
      setFeedback('Correct answer!');
    } else {
      setFeedback(`Incorrect answer. ${questions[currentQuestionIndex].explanation}`);
    }
  };

  // Function to handle moving to the next question
  const handleNext = () => {
    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
      setCurrentQuestionIndex((prevIndex) => {
        if (prevIndex < questions.length - 1) {
          // Reset state for the next question
          setSelectedOption(null);
          setIsAnswered(false);
          setFeedback('');
          return prevIndex + 1;
        }
        return prevIndex; // No change if on last question
      });
    } else {
      alert('Please select the correct answer before proceeding.');
    }
    setQuestion({"highlight":[""]});
  };
  // Function to handle moving to the previous question
  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex > 0) {
        // Reset state for the previous question
        setSelectedOption(null);
        setIsAnswered(false);
        setFeedback('');
        return prevIndex - 1;
      }
      return prevIndex; // No change if on the first question
    });
    setQuestion({"highlight":[""]});
  };

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/'); // Navigate to the AnotherPage
  };

  return (
    <div className="w-64 border-r bg-muted">
        <div className='border-b'>
        <button onClick={handleButtonClick}><div className="text-4xl font-bold p-4">10k-cademy</div></button>
        </div>
      <div className="p-4 font-semibold text-lg border-b">
        <div className="flex items-center">
          <strong>{data.quiz.ticker}</strong>:&nbsp;
          {data.quiz.title}&nbsp;
          <button onClick={handleButtonClick} className="inline-flex items-center justify-center transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 hover:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>
        </div> {/* Display quiz title */}
      <div className="h-[calc(100vh-57px)]">
        <nav className="p-2">
          {/* Display the current question */}
          <div className="p-2 rounded-md bg-primary text-primary-foreground">
            {questions[currentQuestionIndex].text} {/* Display current question text */}
          </div>

          {/* Display answer options */}
          <div className="mt-4">
            {questions[currentQuestionIndex].options.map((option) => (
              <div key={option.id} className="flex items-center mb-2">
                <input
                  type="radio"
                  id={option.id}
                  name="options"
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={() => handleOptionSelect(option.id)}
                  className="hidden" // Hide the default radio button
                />
                <label
                  htmlFor={option.id}
                  className={`flex items-center p-2 rounded-md cursor-pointer transition-colors duration-200
                    ${isAnswered && option.id === selectedOption && option.id !== questions[currentQuestionIndex].correctAnswer ? 'text-gray-500' : ''}`}
                >
                  <span className={`w-5 h-5 inline-block rounded-full mr-2 border-2 
                    ${selectedOption === option.id && option.id === questions[currentQuestionIndex].correctAnswer ? 'bg-green-500' : 
                      selectedOption === option.id ? 'bg-red-500' : 'bg-white'}`} 
                  />
                  {option.text}
                </label>
              </div>
            ))}
          </div>

          {/* Feedback message */}
          {isAnswered && (
            <div className="mt-2">
              <p className={`font-semibold ${selectedOption === questions[currentQuestionIndex].correctAnswer ? 'text-green-400' : 'text-red-400'}`}>
                {feedback}
              </p>
            </div>
          )}
        </nav>

        {/* Navigation buttons for previous and next */}
        <div className="flex justify-between mt-4 px-2">
            <button
              onClick={handlePrevious}
              className="bg-gray-900 p-2 rounded-md text-white"
            >
              Previous
            </button><button
              onClick={handleNext}
              className="bg-gray-900 p-2 rounded-md text-white"
              disabled={!isAnswered || selectedOption !== questions[currentQuestionIndex].correctAnswer} // Disable if not answered correctly
            >
              Next
            </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
