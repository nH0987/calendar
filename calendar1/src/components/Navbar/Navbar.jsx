import React from 'react';
import './Navbar.css';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo">
          <span className="logo-icon">📅</span>
          <h1>Calrma</h1>
        </div>
        
        <div className="navbar-actions">
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;