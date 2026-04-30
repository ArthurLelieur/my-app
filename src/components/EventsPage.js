import React, { useState } from 'react';
import '../styles/EventsPage.css';

const EventsPage = ({ onNavigate, events, setEvents }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    lieu: '',
    type: '',
    distance: '',
    date: '',
    heure: ''
  });

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (formData.nom && formData.lieu && formData.type && formData.distance && formData.date && formData.heure) {
      const newEvent = {
        id: Math.max(...events.map(e => e.id), 0) + 1,
        ...formData
      };
      setEvents([...events, newEvent]);
      setFormData({ nom: '', lieu: '', type: '', distance: '', date: '', heure: '' });
      setShowForm(false);
    }
  };

  return (
    <div className="events-page">
      <header className="app-header">
        <h1>TRIATHLON</h1>
        <p>Les Épreuves</p>
      </header>

      <main className="events-container">
        <div className="events-controls">
          <button 
            className="add-event-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '✕ Annuler' : '+ Ajouter une épreuve'}
          </button>
        </div>

        {showForm && (
          <form className="event-form" onSubmit={handleAddEvent}>
            <div className="form-group">
              <label htmlFor="nom">Nom</label>
              <input
                type="text"
                id="nom"
                name="nom"
                placeholder="Nom de l'épreuve"
                value={formData.nom}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lieu">Lieu</label>
              <input
                type="text"
                id="lieu"
                name="lieu"
                placeholder="Lieu de l'épreuve"
                value={formData.lieu}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="type">Type</label>
              <input
                type="text"
                id="type"
                name="type"
                placeholder="ex: Sprint, Olympique"
                value={formData.type}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="distance">Distance</label>
              <input
                type="text"
                id="distance"
                name="distance"
                placeholder="ex: 750m natation / 20km vélo / 5km course"
                value={formData.distance}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="text"
                id="date"
                name="date"
                placeholder="ex: 15 mai 2026"
                value={formData.date}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="heure">Heure</label>
              <input
                type="text"
                id="heure"
                name="heure"
                placeholder="ex: 09:00"
                value={formData.heure}
                onChange={handleFormChange}
                required
              />
            </div>
            <button type="submit" className="submit-btn">Ajouter</button>
          </form>
        )}

        <div className="events-list">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-header">
                <h2>{event.nom}</h2>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteEvent(event.id)}
                  title="Supprimer cette épreuve"
                >
                  🗑️
                </button>
              </div>
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
                <div className="detail-item">
                  <strong>Date:</strong>
                  <p>{event.date}</p>
                </div>
                <div className="detail-item">
                  <strong>Heure:</strong>
                  <p>{event.heure}</p>
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
