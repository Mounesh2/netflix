require('dotenv').config();
const mysql = require('mysql2/promise');

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set in .env');
}

// Parse DATABASE_URL (format: mysql://user:pass@host:port/dbname?ssl-mode=REQUIRED)
const url = new URL(databaseUrl);
const dbConfig = {
  host: url.hostname,
  port: parseInt(url.port, 10) || 3306,
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1).split('?')[0] || 'defaultdb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Aiven requires SSL. Use rejectUnauthorized: false when not using Aiven CA cert.
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = mysql.createPool(dbConfig);

module.exports = pool;
