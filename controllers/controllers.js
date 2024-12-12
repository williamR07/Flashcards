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
    const query = 'INSERT INTO questions (question, answer, category) VALUES (?, ?, ?)';
    const { question, answer, selectedCategory } = req.body;

    if (!question || !answer || !selectedCategory) {
        return res.status(400).send({ error: 'Missing required fields: question, answer, or category' });
    }

    conn.query(query, [question, answer, selectedCategory], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send({ error: 'There was an error storing the data' });
        }
        res.status(200).json({ message: 'The question has been successfully stored' });
    });
};

const updateQuestion = (req, res) => {
    const { status, questionId } = req.body;

    // Validate inputs
    if (!status || !questionId) {
        return res.status(400).send({ error: 'Status and Question ID are required' });
    }

    // Query with placeholders to prevent SQL injection
    const query = `UPDATE questions SET status = ? WHERE questionId = ?`;

    // Execute the query with parameterized values
    conn.query(query, [status, questionId], (err, result) => {
        if (err) {
            console.error('Database error:', err); // Log the error for debugging
            return res.status(500).send({ error: 'An error occurred while updating the data' });
        }

        // Check if any row was updated
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'No question found with the given ID' });
        }

        res.status(200).json({ message: 'The data updated successfully!' });
    });
};

module.exports = { getRequest, storeQuestion, updateQuestion }; 
