import React, { useState } from 'react';
import './EventModal.css';
import { FaTimes, FaPlus, FaTrash, FaClock, FaAlignLeft } from 'react-icons/fa';

const EventModal = ({ day, month, year, events, onClose, onAddEvent, onDeleteEvent, darkMode }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    time: '',
    category: 'personal'
  });

  const categories = [
    { value: 'work', label: 'Posao', color: '#3b82f6', emoji: '💼' },
    { value: 'personal', label: 'Lično', color: '#10b981', emoji: '🏠' },
    { value: 'school', label: 'Škola', color: '#8b5cf6', emoji: '📚' },
    { value: 'important', label: 'Važno', color: '#ef4444', emoji: '⭐' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onAddEvent(formData);
      setFormData({ title: '', description: '', time: '', category: 'personal' });
      setShowForm(false);
    }
  };

  const getCategoryInfo = (category) => {
    return categories.find(cat => cat.value === category) || categories[1];
  };

  return (
    <div className={`modal-overlay ${darkMode ? 'dark' : ''}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{day} {month} {year}</h2>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className="modal-body">
          {events.length > 0 && (
            <div className="events-list">
              <h3>Događaji ({events.length})</h3>
              {events.map(event => {
                const catInfo = getCategoryInfo(event.category);
                return (
                  <div key={event.id} className="event-item" style={{ borderLeft: `4px solid ${catInfo.color}` }}>
                    <div className="event-header">
                      <span className="event-category" style={{ backgroundColor: catInfo.color }}>
                        {catInfo.emoji} {catInfo.label}
                      </span>
                      <button 
                        className="delete-event-btn" 
                        onClick={() => onDeleteEvent(event.id)}
                        title="Obriši"
                      >
                        <FaTrash />
                      </button>
                    </div>
                    <h4>{event.title}</h4>
                    {event.time && (
                      <p className="event-time">
                        <FaClock /> {event.time}
                      </p>
                    )}
                    {event.description && (
                      <p className="event-description">
                        <FaAlignLeft /> {event.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {!showForm ? (
            <button className="add-event-btn" onClick={() => setShowForm(true)}>
              <FaPlus /> Dodaj događaj
            </button>
          ) : (
            <form className="event-form" onSubmit={handleSubmit}>
              <h3>Novi događaj</h3>
              
              <div className="form-group">
                <label>Naziv *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Npr. Sastanak, Rođendan..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Opis</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Dodatne informacije..."
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Vrijeme</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Kategorija</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>
                        {cat.emoji} {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>
                  Otkaži
                </button>
                <button type="submit" className="submit-btn">
                  Sačuvaj
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventModal;