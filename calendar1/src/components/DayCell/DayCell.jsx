import React from 'react';
import './DayCell.css';

const DayCell = ({ day, events, isToday, onClick, darkMode }) => {
  const getCategoryColor = (category) => {
    const colors = {
      work: '#3b82f6',
      personal: '#10b981',
      school: '#8b5cf6',
      important: '#ef4444'
    };
    return colors[category] || '#6b7280';
  };

  return (
    <div 
      className={`day-cell ${isToday ? 'today' : ''} ${darkMode ? 'dark' : ''}`}
      onClick={onClick}
    >
      <div className="day-number">{day}</div>
      
      {events.length > 0 && (
        <div className="events-preview">
          {events.slice(0, 2).map((event, index) => (
            <div 
              key={index} 
              className="event-dot"
              style={{ backgroundColor: getCategoryColor(event.category) }}
              title={event.title}
            >
              <span className="event-preview-text">{event.title}</span>
            </div>
          ))}
          {events.length > 2 && (
            <div className="more-events">+{events.length - 2}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default DayCell;