
const express = require('express');
const mysql = require('mysql2');
const app = express();
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

 

// MySQL Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
 
// app.get('' , (req, res) => {
//   res.send("hello world")
// })

// Test the connection
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to the database.');
});

// Middleware
app.use(express.json());

// Retrieve all patients
app.get('/patients', (req, res) => {
  const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to retrieve patients' });
    } else {
      res.json(results);
    }
  });
});

// // Retrieve all providers
// app.get('/providers', (req, res) => {
//   const query = 'SELECT first_name, last_name, provider_specialty FROM providers';
//   db.query(query, (err, results) => {
//     if (err) {
//       res.status(500).json({ error: 'Failed to retrieve providers' });
//     } else {
//       res.json(results);
//     }
//   });
// });

// // Filter patients by First Name
// app.get('/patients/filter', (req, res) => {
//   const { firstName } = req.query; // Assuming ?firstName=John in the query params
//   const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
//   db.query(query, [firstName], (err, results) => {
//     if (err) {
//       res.status(500).json({ error: 'Failed to filter patients' });
//     } else {
//       res.json(results);
//     }
//   });
// });

// // Retrieve all providers by their specialty
// app.get('/providers/filter', (req, res) => {
//   const { specialty } = req.query; // Assuming ?specialty=Cardiology in the query params
//   const query = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';
//   db.query(query, [specialty], (err, results) => {
//     if (err) {
//       res.status(500).json({ error: 'Failed to filter providers' });
//     } else {
//       res.json(results);
//     }
//   });
// });

// Listen to the server

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});