import React, { useState } from 'react';
import './App.css';

const API_URL = 'http://localhost:5001';

const App = () => {
  const [mode, setMode] = useState('login');

  const [formData, setFormData] = useState({
    identifiant: '',
    password: '',
    nom: '',
    prenom: '',
  });

  // Retour utilisateur (succès ou erreur)
  const [message, setMessage] = useState(null);  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setMessage(null); // Efface le message quand l'utilisateur modifie le formulaire
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (mode === 'login') {
        // ── Connexion ──────────────────────────────
        const res = await fetch(`${API_URL}/api/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            identifiant: formData.identifiant,
            password: formData.password,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setMessage({ type: 'error', text: data.error });
        } else {
          setMessage({ type: 'success', text: `Bienvenue ${data.user.identifiant} !` });
          // TODO: rediriger vers le dashboard
        }

      } else {
        // ── Inscription ────────────────────────────
        const res = await fetch(`${API_URL}/api/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            identifiant: formData.identifiant,
            password: formData.password,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          setMessage({ type: 'error', text: data.error });
        } else {
          setMessage({ type: 'success', text: data.message });
          // Revenir à la page de connexion après succès
          setTimeout(() => {
            setMode('login');
            setFormData({ identifiant: '', password: ''});
            setMessage(null);
          }, 2000);
        }
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Impossible de joindre le serveur.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mobile-container">
      <header className="app-header">
        <h1>TRIATHLON</h1>
        <p>Application Triathlete</p>
      </header>

      <main className="auth-card">
        <div className="tabs">
          <button
            className={mode === 'login' ? 'active' : ''}
            onClick={() => { setMode('login'); setMessage(null); }}
          >
            Connexion
          </button>
          <button
            className={mode === 'register' ? 'active' : ''}
            onClick={() => { setMode('register'); setMessage(null); }}
          >
            Créer un compte
          </button>
        </div>

        {/* Message de retour (succès ou erreur) */}
        {message && (
          <div className={`feedback-message ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {mode === 'login' && (
            <div className="form-group">
              <label htmlFor="identifiant-login">Identifiant</label>
              <input
                type="text"
                id="identifiant-login"
                name="identifiant"
                placeholder="Entrez votre identifiant"
                value={formData.identifiant}
                onChange={handleChange}
                required
              />

              <label htmlFor="password-login">Mot de passe</label>
              <input
                type="password"
                id="password-login"
                name="password"
                placeholder="Votre mot de passe"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {mode === 'register' && (
            <div className="form-group">
              <label htmlFor="identifiant-register">Identifiant</label>
              <input
                type="text"
                id="identifiant-register"
                name="identifiant"                  
                placeholder="Choisissez un identifiant"
                value={formData.identifiant}        
                onChange={handleChange}
                required
              />

              <label htmlFor="password-register">mot de passe</label>
              <input
                type="password"
                id="password-register"
                name="password"
                placeholder="Votre mot de passe"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <button type="submit" className="cta-button" disabled={loading}>
            {loading
              ? 'Chargement…'
              : mode === 'login' ? 'Se connecter' : "S'inscrire"}
          </button>
        </form>
      </main>

      <footer className="app-footer">
        <p>© 2026 TRIATHLON - Application Officielle</p>
      </footer>
    </div>
  );
};

export default App;