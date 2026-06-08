const { Pool } = require("pg");
require("dotenv").config(); // Esto debe estar arriba

console.log("PASSWORD:", process.env.DB_PASSWORD); // Para probar que se carga

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;