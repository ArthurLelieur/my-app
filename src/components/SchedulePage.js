import React from 'react';
import '../styles/SchedulePage.css';

const SchedulePage = ({ onNavigate, events }) => {
  return (
    <div className="schedule-page">
      <header className="app-header">
        <h1>TRIATHLON</h1>
        <p>Votre Planning</p>
      </header>

      <main className="schedule-container">
        <div className="schedule-list">
          {events.map((event) => (
            <div key={event.id} className="schedule-item">
              <div className="schedule-date">
                <span className="date">{event.date}</span>
                <span className="time">{event.heure}</span>
              </div>
              <div className="schedule-info">
                <h3>{event.nom}</h3>
                <p className="schedule-location">{event.lieu}</p>
                <p className="schedule-type">{event.type}</p>
              </div>
            </div>
          ))}
        </div>

        <button 
          className="back-btn"
          onClick={() => onNavigate('home')}
        >
          ← Retour à l'accueil
        </button>
      </main>

      <footer className="app-footer">
        <p>© 2026 TRIATHLON - Application Officielle</p>
      </footer>
    </div>
  );
};

export default SchedulePage;
