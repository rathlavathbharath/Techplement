const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db'); // Import the database connection pool

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to store calculation history in the database
app.post('/history', (req, res) => {
    const calculation = req.body.calculation;
    
    // Insert the calculation into the database
    pool.query('INSERT INTO calculation_history (calculation) VALUES (?)', [calculation], (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            res.status(200).json({ message: 'Calculation history stored successfully' });
        }
    });
});

// Route to retrieve calculation history from the database
app.get('/history', (req, res) => {
    // Retrieve calculation history from the database
    pool.query('SELECT * FROM calculation_history', (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            res.status(200).json(results);
        }
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

