import React, { useState, useEffect } from 'react';
import './Calendar.css';
import DayCell from '../DayCell/DayCell';
import EventModal from '../EventModal/EventModal';
import { loadEvents, saveEvents } from '../../utils/storage';
import { FaChevronLeft, FaChevronRight, FaPlus, FaSearch } from 'react-icons/fa';

const Calendar = ({ darkMode }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setEvents(loadEvents());
  }, []);

  useEffect(() => {
    saveEvents(events);
  }, [events]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun',
    'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
    setShowModal(true);
  };

  const handleAddEvent = (eventData) => {
    const newEvent = {
      id: Date.now(),
      ...eventData,
      date: `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`
    };
    setEvents([...events, newEvent]);
    setShowModal(false);
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(e => e.id !== eventId));
  };

  const getDayEvents = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr);
  };

  const getFilteredEvents = () => {
    if (!searchTerm) return events;
    return events.filter(e => 
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const getTotalEvents = () => {
    const datePrefix = `${year}-${String(month + 1).padStart(2, '0')}`;
    return events.filter(e => e.date.startsWith(datePrefix)).length;
  };

  const days = [];
  for (let i = 0; i < adjustedFirstDay; i++) {
    days.push(<div key={`empty-${i}`} className="day-cell empty"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayEvents = getDayEvents(day);
    const isToday = 
      day === new Date().getDate() && 
      month === new Date().getMonth() && 
      year === new Date().getFullYear();

    days.push(
      <DayCell
        key={day}
        day={day}
        events={dayEvents}
        isToday={isToday}
        onClick={() => handleDayClick(day)}
        darkMode={darkMode}
      />
    );
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div className="calendar-nav">
          <button onClick={prevMonth} className="nav-btn">
            <FaChevronLeft />
          </button>
          <h2>{monthNames[month]} {year}</h2>
          <button onClick={nextMonth} className="nav-btn">
            <FaChevronRight />
          </button>
        </div>

        <div className="calendar-stats">
          <div className="stat-item">
            <span className="stat-number">{getTotalEvents()}</span>
            <span className="stat-label">Događaja</span>
          </div>
        </div>

        <div className="search-bar">
          <FaSearch />
          <input
            type="text"
            placeholder="Pretraži događaje..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="calendar-grid">
        <div className="weekday">Pon</div>
        <div className="weekday">Uto</div>
        <div className="weekday">Sri</div>
        <div className="weekday">Čet</div>
        <div className="weekday">Pet</div>
        <div className="weekday">Sub</div>
        <div className="weekday">Ned</div>
        {days}
      </div>

      <button className="fab" onClick={() => { setSelectedDay(new Date().getDate()); setShowModal(true); }}>
        <FaPlus />
      </button>

      {showModal && (
        <EventModal
          day={selectedDay}
          month={monthNames[month]}
          year={year}
          events={getDayEvents(selectedDay)}
          onClose={() => setShowModal(false)}
          onAddEvent={handleAddEvent}
          onDeleteEvent={handleDeleteEvent}
          darkMode={darkMode}
        />
      )}
    </div>
  );
};

export default Calendar;