import React, { useState } from 'react';

const lessonsData = [
  {
    id: 1,
    title: "Introduction to Variables",
    content: "Variables are used to store data in programming...",
  },
  {
    id: 2,
    title: "Functions in JavaScript",
    content: "Functions are reusable blocks of code...",
  },
  {
    id: 3,
    title: "Loops in JavaScript",
    content: "Loops are used to repeat a block of code...",
  }
];

const Lesson = () => {
  const [currentLesson, setCurrentLesson] = useState(null);

  const handleSelectLesson = (lesson) => {
    setCurrentLesson(lesson);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Lesson List</h1>
      <ul>
        {lessonsData.map(lesson => (
          <li key={lesson.id}>
            <button onClick={() => handleSelectLesson(lesson)}>{lesson.title}</button>
          </li>
        ))}
      </ul>
      
      {currentLesson && (
        <div>
          <h2>{currentLesson.title}</h2>
          <p>{currentLesson.content}</p>
        </div>
      )}
    </div>
  );
};

export default Lesson;