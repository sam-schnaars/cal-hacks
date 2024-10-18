import React from 'react';
import { Link } from 'react-router-dom';

const LeftSidebar = () => {
  return (
    <div className="sidebar left-sidebar">
      <h3>Navigation</h3>
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/lessons" className="nav-link">Lessons</Link>
      <Link to="/quiz" className="nav-link">Quiz</Link>
    </div>
  );
};

export default LeftSidebar;