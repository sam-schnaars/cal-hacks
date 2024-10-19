import React from 'react';
import { Link } from 'react-router-dom';

const LeftSidebar = () => {
  return (
    <div className="sidebar left-sidebar">
      <Link to="/lessons" className="nav-link"></Link>
      <Link to="/quiz" className="nav-link"></Link>
    </div>
  );
};

export default LeftSidebar;