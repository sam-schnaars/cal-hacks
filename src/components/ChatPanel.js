import React, { useState } from 'react';
import axios from 'axios';
import balanceSheetData from "../google_balance_sheet.json";
import incomeData from "../google_income_statement.json";
import cashFlowData from "../google_cash_flow.json";

const ChatPanel = ({ currentQuestion }) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const instructions = "The user is a student trying to study accounting. The user is trying to answer a real-world question about a company's 10K and the user needs your help in understanding the answer better. Here is the question, answer options and a one-line explanation the user was given. The user still couldn't understand despite the explanation. Hence, using the explanation as reference, the user needs your help in understanding this even better. Keep your answer simple, concise and related to the below question answer without adding outside info of your own.";

  const handleAsk = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const contextString = `${instructions}\nQuestion: ${currentQuestion.text}\nOptions: ${currentQuestion.options.map(option => option.text).join(', ')}\nExplanation: ${currentQuestion.explanation}\n\n`;
      const fullPrompt = `${contextString}User question: ${prompt}\n\n
        Balance Sheet: ${JSON.stringify(balanceSheetData, null, 2)}
        Income Statement: ${JSON.stringify(incomeData, null, 2)}
        Cash Flow Statement: ${JSON.stringify(cashFlowData, null, 2)}`;
      
      const result = await axios.post('http://localhost:3001/chat', { prompt: fullPrompt });
      setResponse(result.data.generated_text);
    } catch (error) {
      console.error('Error:', error);
      setResponse('An error occurred while fetching the answer');
    }
    setLoading(false);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAsk(e);
    }
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed right-0 top-3/4 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-l-md z-10"
      >
        {isChatOpen ? 'Close Chat' : 'Still confused?'}
      </button>

      <div className={`fixed right-0 top-0 h-full w-80 bg-white shadow-lg transition-all duration-300 transform ${isChatOpen ? 'translate-x-0' : 'translate-x-full'} z-20 flex flex-col`}>
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold">Ask Omri!</h2>
          <button 
            onClick={toggleChat}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-4">
          {response ? (
            <div className="mb-4 text-sm bg-blue-100 p-3 rounded-lg shadow">
              <strong className="block mb-1">Omri:</strong>
              <p>{response}</p>
            </div>
          ) : (
            <div className="text-gray-500 text-center mt-4">
              Ask a question to get started!
            </div>
          )}
        </div>
        <div className="p-4 border-t">
          <form onSubmit={handleAsk} className="flex flex-col">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Omri..."
              rows="2"
              className="w-full p-2 mb-2 text-sm border rounded"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="bg-blue-500 text-white p-2 rounded text-sm"
            >
              {loading ? 'Thinking...' : 'Ask'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatPanel;
