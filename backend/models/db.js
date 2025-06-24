const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  // Define o schema padrão como 'consultorio'
  options: '-c search_path=consultorio'
});

// Não precisa mais do SET manual
console.log('Schema padrão: consultorio');

module.exports = pool;
