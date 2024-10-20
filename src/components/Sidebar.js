import React, { useState } from 'react';
import axios from 'axios';
import data from "../questions.json";
import balanceSheetData from "../google_balance_sheet.json";
import incomeData from "../google_income_statement.json";
import cashFlowData from "../google_cash_flow.json";

const Sidebar = () => {
  const questions = data.quiz.questions; // Use questions from the JSON

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null); // Track the selected answer
  const [isAnswered, setIsAnswered] = useState(false); // Track if the question is answered
  const [feedback, setFeedback] = useState(''); // Store feedback message

  // Function to handle option selection
  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
    setIsAnswered(true);

    // Provide feedback on the selected answer
    if (optionId === questions[currentQuestionIndex].correctAnswer) {
      setFeedback('Correct answer! ' + questions[currentQuestionIndex].explanation);
    } else {
      setFeedback('Incorrect answer. ' + questions[currentQuestionIndex].explanation);
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
  };

  // Chat bot for further clarification
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const instructions = "The user is a student trying to study accounting. The user is trying to answer a real-world question about a company's 10K and the user needs your help in understanding the answer better. Here is the question, answer options and a one-line explanation the user was given. The user still couldn't understand despite the explanation. Hence, using the explanation as reference, the user needs your help in understanding this even better. Keep your answer simple, concise and related to the below question answer without adding outside info of your own.";

  const handleAsk = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const currentQuestion = questions[currentQuestionIndex];
      const contextString = `${instructions}\nQuestion: ${currentQuestion.text}\nOptions: ${currentQuestion.options.map(option => option.text).join(', ')}\nExplanation: ${currentQuestion.explanation}\n\n`;
      const fullPrompt = `${contextString}User question: ${prompt}\n\n
        Balance Sheet: ${JSON.stringify(balanceSheetData, null, 2)}
        Income Statement: ${JSON.stringify(incomeData, null, 2)}
        Cash Flow Statement: ${JSON.stringify(cashFlowData, null, 2)}`
      ;
      
      const result = await axios.post('http://localhost:3001/chat', { prompt: fullPrompt });
      setResponse(result.data.generated_text);
    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred while fetching the answer');
    }
    setLoading(false);
  };

  return (
    <div className="w-64 border-r bg-muted">
      <div className="p-4 font-semibold text-lg border-b">{data.quiz.title}</div> {/* Display quiz title */}
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

        {/* Chat bot for further clarification */}
        <div className="ChatBot">
          <h1>Still confused?</h1>
          <form onSubmit={handleAsk}>
            <textarea
              value={ prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ask away"
              rows="4"
              cols="50"
            />
            <br />
            <button type="ask" disabled={loading}>
              {loading ? 'Thinking...' : '_Ask_'}
            </button>
          </form>
          {response && (
            <div className="response">
              <h2>Response:</h2>
              <p>{response}</p>
            </div>
          )}
        </div>

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
