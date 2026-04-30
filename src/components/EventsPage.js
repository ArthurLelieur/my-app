import React from 'react';
import '../styles/EventsPage.css';

const EventsPage = ({ onNavigate }) => {
  const events = [
    {
      id: 1,
      nom: "Triathlon Régional",
      lieu: "Colmar",
      type: "L",
      distance: "750m natation / 20km vélo / 5km course"
    },
    {
      id: 2,
      nom: "Triathlon Mondial",
      lieu: "Mulhouse",
      type: "M (Olympique)",
      distance: "1500m natation / 40km vélo / 10km course"
    },
    {
      id: 3,
      nom: "Triathlon Xtrem",
      lieu: "Strasbourg",
      type: "XXL (IronMan)",
      distance: "400m natation / 10km vélo / 2.5km course"
    }
  ];

  return (
    <div className="events-page">
      <header className="app-header">
        <h1>TRIATHLON</h1>
        <p>Les Épreuves</p>
      </header>

      <main className="events-container">
        <div className="events-list">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <h2>{event.nom}</h2>
              <div className="event-details">
                <div className="detail-item">
                  <strong>Lieu:</strong>
                  <p>{event.lieu}</p>
                </div>
                <div className="detail-item">
                  <strong>Type:</strong>
                  <p>{event.type}</p>
                </div>
                <div className="detail-item">
                  <strong>Distance:</strong>
                  <p>{event.distance}</p>
                </div>
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

export default EventsPage;
