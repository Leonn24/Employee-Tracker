require('dotenv').config();
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: 3306,
});

  // Connect to the database
  db.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database.");
  });

  module.exports = db;