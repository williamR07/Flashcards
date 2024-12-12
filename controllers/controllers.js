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

const storeQuestion = (req, res) => {
    const query = 'INSERT INTO questions (question, answer, category) VALUES (?, ?, ?)'; // Specify table and columns
    const { question, answer, selectedCategory} = req.body; // Extract data from the request body

    if (!question || !answer || !selectedCategory) {
        return res.status(400).send({ error: 'Missing required fields: question, answer, or category' });
    }

    conn.query(query, [ question, answer, selectedCategory], (err, result) => {
        if (err) {
            console.error('Database error:', err); // Log the error for debugging
            return res.status(500).send({ error: 'There was an error storing the data' });
        }
        res.status(200).json({ message: 'The question has been successfully stored' });
    });
};

module.exports = { getRequest, storeQuestion }; // Ensure this is correctly exported
