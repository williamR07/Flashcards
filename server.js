const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const PORT = 3000;
const app = express();

// Use CORS middleware to allow requests from specific origins
app.use(cors()); // Replace with the actual origin if needed

// Setup database connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'question'
});

conn.connect((err) => {
    if (err) {
        console.error("Failed to connect to MySQL: " + err);
    } else {
        console.log('Connected to MySQL successfully');
    }
});

// Handle preflight (OPTIONS) request explicitly if needed
app.options('/question', cors());  // Allow preflight requests for the '/question' endpoint

// Define the '/question' route
app.get('/question', (req, res) => {
    res.json({message: "Connected to backend successfully!"});
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});
