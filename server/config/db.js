const { Pool } = require("pg");

const pool = new Pool({
  // host: process.env.DB_HOST,
  host: process.env.DATABASE_URL,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

module.exports = pool;