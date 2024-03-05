const express = require('express');
const router = express.Router();

// Route to handle calculation requests
router.post('/calculate', (req, res) => {
    // Extract the calculation expression from the request body
    const expression = req.body.expression;

    // Perform the calculation (you'll need to implement this logic)
    // For simplicity, let's assume the calculation is performed synchronously
    try {
        const result = eval(expression);
        res.json({ success: true, result }); // Send the result back to the frontend
    } catch (error) {
        res.status(400).json({ success: false, error: 'Invalid expression' }); // Handle calculation errors
    }
});

module.exports = router;
