const conn = require('./db');

const getRequest = (req, res) => {
    const query = 'SELECT * FROM questions';

    conn.query(query, (err, result) => {
        if (err) {
            console.error("Error executing query: " + err);
            res.status(500).send({ error: 'Error fetching data from database' });
            return;
        }
        res.status(200).json(result);
    });
};

module.exports = { getRequest }; // Ensure this is correctly exported
