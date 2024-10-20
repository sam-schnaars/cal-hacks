// Review.js
import React from 'react';

const Review = ({ questions, onBackToPractice, totalQuestions }) => {
  const calculateCorrectPercentage = () => {
    const correctAnswers = questions.filter(answer => answer.selectedOption === answer.correctAnswer).length;
    return totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0; // Avoid division by zero
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">Review Your Answers</h2>
      {/* Progress Bar for Correct Answers */}
      <div className='my-10'>
        <div className="relative w-full h-4 bg-gray-200 rounded">
          <div
            className="absolute h-full bg-green-500 rounded"
            style={{ width: `${calculateCorrectPercentage()}%` }}
          />
        </div>
        <div className="text-center">
          {calculateCorrectPercentage().toFixed(0)}% Correct
        </div>
      </div>
      <ul>
        {questions.map((question, index) => (
          <li key={index} className="mb-4">
            <div>
              <strong>Question {index + 1}:</strong> {question.text}
            </div>
            <div>
              <strong>Your Answer:</strong> {question.selectedOption}
            </div>
            <div>
              <strong>Correct Answer:</strong> {question.correctAnswer}
            </div>
            <div>
              <strong>Feedback:</strong> {question.explanation}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Review;
