require('dotenv').config();
const express = require('express');
const sql = require('mssql/msnodesqlv8');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// Configuration SQL Server
const sqlConfig = {
  connectionString: `Driver={ODBC Driver 17 for SQL Server};Server=SRV-SQL\\SQL_SLAM;Database=BD_TRIATHLON_GR1;Trusted_Connection=yes;`
};
// Connexion unique au démarrage
const poolPromise = sql.connect(sqlConfig)
  .then(pool => {
    console.log('Connecté à SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('Erreur de connexion SQL :', err);
    process.exit(1);
  });

// Route : Inscription
app.post('/api/register', async (req, res) => {
  const { identifiant, password } = req.body;

  if (!identifiant || !password) {
    return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
  }

  try {
    const pool = await poolPromise;

    // Vérifier si l'identifiant existe déjà
    const existing = await pool.request()
      .input('identifiant', sql.NVarChar, identifiant)
      .query('SELECT id FROM users WHERE id = @identifiant');

    if (existing.recordset.length > 0) {
      return res.status(409).json({ error: 'Cet identifiant est déjà utilisé.' });
    }

    // Hasher le mot de passe avant stockage
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insérer le nouvel utilisateur
    await pool.request()
      .input('identifiant', sql.NVarChar, identifiant)
      .input('password', sql.VarChar, hashedPassword)
      .query(`
        INSERT INTO users (id, name, email, email_verified_at, password, remember_token, role_id, created_at, updated_at)
        VALUES (18, @identifiant, NULL, NULL, @password, NULL, '1', NULL, NULL)
      `);

    res.status(201).json({ message: 'Compte créé avec succès !' });

  } catch (err) {
    console.error('Erreur SQL :', err);
    res.status(500).json({ error: 'Erreur serveur. Veuillez réessayer.' });
  }
});

// Route : Connexion
app.post('/api/login', async (req, res) => {
  const { identifiant, password } = req.body;

  if (!identifiant || !password) {
    return res.status(400).json({ error: 'Identifiant et mot de passe requis.' });
  }

  try {
    const pool = await poolPromise;

    const result = await pool.request()
      .input('identifiant', sql.NVarChar, identifiant)
      .query('SELECT * FROM users WHERE id = @identifiant');

    if (result.recordset.length === 0) {
      return res.status(401).json({ error: 'Identifiant ou mot de passe incorrect.' });
    }

    const user = result.recordset[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Identifiant ou mot de passe incorrect.' });
    }

    res.json({
      message: 'Connexion réussie !',
      user: { identifiant: user.id},
    });

  } catch (err) {
    console.error('Erreur SQL :', err);
    res.status(500).json({ error: 'Erreur serveur. Veuillez réessayer.' });
  }
});

// Démarrage du serveur
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});