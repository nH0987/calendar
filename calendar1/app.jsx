import React, { useState } from 'react';
import './app.css';
import Calendar from './src/components/Calendar/Calendar';
import Navbar from './src/components/Navbar/Navbar';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Calendar darkMode={darkMode} />
    </div>
  );
}

export default App;