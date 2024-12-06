const mysql = require('mysql2');
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


module.exports = conn;