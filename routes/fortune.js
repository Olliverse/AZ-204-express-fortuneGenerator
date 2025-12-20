const express = require('express');
const router = express.Router();
const fortuneGenerator = require('../services/fortuneGenerator');

// POST endpoint to generate a reverse fortune
router.post('/generate', (req, res) => {
    const { situation } = req.body;

    if (!situation || situation.trim().length === 0) {
        return res.status(400).json({
            error: 'Please provide your current situation'
        });
    }

    const fortune = fortuneGenerator.generateMisfortune(situation);
    res.json(fortune);
});

module.exports = router;