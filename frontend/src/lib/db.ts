import mysql from 'mysql2/promise';

const databaseUrl = process.env.DATABASE_URL || '';

let pool: any;

if (databaseUrl) {
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
    ssl: {
      rejectUnauthorized: false,
    },
  };

  pool = mysql.createPool(dbConfig);

  // Initialize database
  (async () => {
    try {
      await pool.execute(`CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        phone VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`);
    } catch (err) {
      console.error('Database init error:', err);
    }
  })();
}

export default pool;
