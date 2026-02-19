require('dotenv').config();
const express = require('express');
const cors = require('cors');
const freekeys = require('freekeys');
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

const createUsersTable = `CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

app.use(cors({ origin: process.env.CORS_ORIGIN || true, credentials: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

async function start() {
  try {
    await pool.execute(createUsersTable);
    console.log('Database ready.');
  } catch (err) {
    console.error('Database init error:', err);
  }
  // OMDb key: use .env first, else free keys (OMDb + TMDb without registration)
  let omdbKey = process.env.OMDB_API_KEY;
  if (!omdbKey) {
    try {
      const keys = await freekeys();
      omdbKey = keys.imdb_key || null;
      if (omdbKey) console.log('Using OMDb key from freekeys.');
    } catch (err) {
      console.warn('freekeys failed:', err.message);
    }
  }
  app.set('omdbApiKey', omdbKey || null);
  if (!app.get('omdbApiKey')) {
    console.warn('No OMDb API key (set OMDB_API_KEY in .env or use freekeys).');
  }
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start();
