import React from 'react';
import '../styles/HomePage.css';

const HomePage = ({ onNavigate }) => {
  return (
    <div className="home-page">
      <header className="app-header">
        <h1>TRIATHLON</h1>
        <p>Bienvenue Athlète</p>
      </header>

      <main className="home-container">
        <div className="home-buttons">
          <button 
            className="home-btn events-btn"
            onClick={() => onNavigate('events')}
          >
            <span className="btn-icon">📋</span>
            <span className="btn-label">Épreuves</span>
          </button>

          <button 
            className="home-btn schedule-btn"
            onClick={() => onNavigate('schedule')}
          >
            <span className="btn-icon">📅</span>
            <span className="btn-label">Planning</span>
          </button>
        </div>

        <button 
          className="logout-btn"
          onClick={() => onNavigate('login')}
        >
          Se déconnecter
        </button>
      </main>

      <footer className="app-footer">
        <p>© 2026 TRIATHLON - Application Officielle</p>
      </footer>
    </div>
  );
};

export default HomePage;
