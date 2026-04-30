import React, { useState } from 'react';
import '../styles/SchedulePage.css';

const SchedulePage = ({ onNavigate }) => {
  const [schedule, setSchedule] = useState([
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
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    heure: '',
    evenement: '',
    statut: 'À venir'
  });

  const handleDeleteEvent = (id) => {
    setSchedule(schedule.filter(item => item.id !== id));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (formData.date && formData.heure && formData.evenement) {
      const newEvent = {
        id: Math.max(...schedule.map(s => s.id), 0) + 1,
        ...formData
      };
      setSchedule([...schedule, newEvent]);
      setFormData({ date: '', heure: '', evenement: '', statut: 'À venir' });
      setShowForm(false);
    }
  };

  return (
    <div className="schedule-page">
      <header className="app-header">
        <h1>TRIATHLON</h1>
        <p>Votre Planning</p>
      </header>

      <main className="schedule-container">
        <div className="schedule-controls">
          <button 
            className="add-event-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '✕ Annuler' : '+ Ajouter un événement'}
          </button>
        </div>

        {showForm && (
          <form className="event-form" onSubmit={handleAddEvent}>
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
            <div className="form-group">
              <label htmlFor="evenement">Événement</label>
              <input
                type="text"
                id="evenement"
                name="evenement"
                placeholder="Nom de l'événement"
                value={formData.evenement}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="statut">Statut</label>
              <select
                id="statut"
                name="statut"
                value={formData.statut}
                onChange={handleFormChange}
              >
                <option>À venir</option>
                <option>Programmé</option>
              </select>
            </div>
            <button type="submit" className="submit-btn">Ajouter</button>
          </form>
        )}

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
              <button
                className="delete-btn"
                onClick={() => handleDeleteEvent(item.id)}
                title="Supprimer cet événement"
              >
                🗑️
              </button>
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
