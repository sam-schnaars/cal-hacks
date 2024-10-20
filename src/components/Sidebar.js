import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        Balance Sheet: ${JSON.stringify(companyData.bs, null, 2)}
        Income Statement: ${JSON.stringify(companyData.is, null, 2)}
        Cash Flow Statement: ${JSON.stringify(companyData.cfs, null, 2)}`;
      
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

      {/* Chatbot section with increased height */}
      <div className="border-t p-2 bg-gray-100 h-1/3 flex flex-col">
        <h2 className="font-semibold mb-2">Still confused?</h2>
        <form onSubmit={handleAsk} className="flex flex-col flex-grow">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask Omri..."
            rows="3"
            className="w-full p-1 mb-2 text-sm flex-grow"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="bg-blue-500 text-white p-2 rounded text-sm"
          >
            {loading ? 'Thinking...' : 'Ask'}
          </button>
        </form>
        {response && (
          <div className="mt-2 text-sm overflow-auto max-h-24">
            <strong>Response:</strong>
            <p>{response}</p>
          </div>
        )}

      </div>
      </div>
    </div>
  );
};

export default Sidebar;
