require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const pool = require('./db');

const app = express();

const createUsersTable = `CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

let dbInitialized = false;

app.use(async (req, res, next) => {
  if (!dbInitialized) {
    try {
      await pool.execute(createUsersTable);
      dbInitialized = true;
    } catch (err) {
      console.error('Database init error:', err);
    }
  }
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is running' });
});

app.set('omdbApiKey', process.env.OMDB_API_KEY || null);

module.exports = app;
