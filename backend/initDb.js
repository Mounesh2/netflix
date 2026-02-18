require('dotenv').config();
const pool = require('./db');

const createUsersTable = `CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)`;

async function init() {
  try {
    await pool.execute(createUsersTable);
    console.log('Users table ready.');
    process.exit(0);
  } catch (err) {
    console.error('Init DB error:', err);
    process.exit(1);
  }
}

init();
