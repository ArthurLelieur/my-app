import React from 'react';
import '../styles/SchedulePage.css';

const SchedulePage = ({ onNavigate }) => {
  const schedule = [
    {
      id: 1,
      date: "15 mai 2026",
      heure: "09:00",
      evenement: "Triathlon Régional",
      statut: "À venir"
    },
    {
      id: 2,
      date: "22 mai 2026",
      heure: "08:30",
      evenement: "Triathlon Mondial",
      statut: "À venir"
    },
    {
      id: 3,
      date: "05 juin 2026",
      heure: "10:00",
      evenement: "Triathlon Xtrem",
      statut: "Programmé"
    },
  ];

  return (
    <div className="schedule-page">
      <header className="app-header">
        <h1>TRIATHLON</h1>
        <p>Votre Planning</p>
      </header>

      <main className="schedule-container">
        <div className="schedule-list">
          {schedule.map((item) => (
            <div key={item.id} className={`schedule-item status-${item.statut.toLowerCase().replace(' ', '-')}`}>
              <div className="schedule-date">
                <span className="date">{item.date}</span>
                <span className="time">{item.heure}</span>
              </div>
              <div className="schedule-info">
                <h3>{item.evenement}</h3>
                <span className="status-badge">{item.statut}</span>
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
