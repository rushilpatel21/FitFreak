const express = require('express');
const router = express.Router();
const FoodLog = require('../models/foodLogSchema');

router.get('', async (req, res) => {
  try {
    const foodLogs = await FoodLog.find();
    res.json({ foodLogs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
