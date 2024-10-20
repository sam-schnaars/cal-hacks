import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import balanceSheetData from "../google_balance_sheet.json";
import incomeData from "../google_income_statement.json";
import cashFlowData from "../google_cash_flow.json";

const ChatPanel = ({ currentQuestion }) => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const instructions = "The user is a student trying to study accounting. The user is trying to answer a real-world question about a company's 10K and the user needs your help in understanding the answer better. Here is the question, answer options and a one-line explanation the user was given. The user still couldn't understand despite the explanation. Hence, using the explanation as reference, the user needs your help in understanding this even better. Keep your answer simple, concise and related to the below question answer without adding outside info of your own.";

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAsk = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setMessages(prevMessages => [...prevMessages, { type: 'user', content: prompt }]);
    
    try {
      const contextString = `${instructions}\nQuestion: ${currentQuestion.text}\nOptions: ${currentQuestion.options.map(option => option.text).join(', ')}\nExplanation: ${currentQuestion.explanation}\n\n`;
      const fullPrompt = `${contextString}User question: ${prompt}\n\n
        Balance Sheet: ${JSON.stringify(balanceSheetData, null, 2)}
        Income Statement: ${JSON.stringify(incomeData, null, 2)}
        Cash Flow Statement: ${JSON.stringify(cashFlowData, null, 2)}`;
      
      const result = await axios.post('http://localhost:3001/chat', { prompt: fullPrompt });
      setMessages(prevMessages => [...prevMessages, { type: 'bot', content: result.data.generated_text }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prevMessages => [...prevMessages, { type: 'bot', content: 'An error occurred while fetching the answer' }]);
    }
    setLoading(false);
    setPrompt('');
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

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <>
      <button
        onClick={toggleChat}
        className="fixed right-0 top-3/4 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-l-md z-10"
      >
        {isChatOpen ? 'Close Chat' : 'Still confused?'}
      </button>

      <div className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg transition-all duration-300 transform ${isChatOpen ? 'translate-x-0' : 'translate-x-full'} z-20 flex flex-col`}>
        <div className="p-4 border-b flex justify-between items-center bg-blue-500 text-white">
          <h2 className="font-semibold text-lg">Ask Omri!</h2>
          <button 
            onClick={toggleChat}
            className="text-white hover:text-gray-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-grow overflow-y-auto p-4 bg-gray-100">
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-3 rounded-lg max-w-[75%] ${
                message.type === 'user' 
                  ? 'bg-blue-500 text-white ml-auto' 
                  : 'bg-white mr-auto'
              }`}>
                <p className="text-sm break-words">{message.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm text-blue-500 transition ease-in-out duration-150">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 border-t bg-white">
          <form onSubmit={handleAsk} className="flex flex-col">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Omri..."
              rows="2"
              className="w-full p-2 mb-2 text-sm border rounded resize-none"
            />
            <div className="flex justify-between">
              <button 
                type="button" 
                onClick={clearChat}
                className="bg-gray-300 text-gray-700 p-2 rounded text-sm hover:bg-gray-400"
              >
                Clear Chat
              </button>
              <button 
                type="submit" 
                disabled={loading}
                className="bg-blue-500 text-white p-2 rounded text-sm hover:bg-blue-600 disabled:opacity-50"
              >
                Ask
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatPanel;
