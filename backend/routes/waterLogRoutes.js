const express = require('express');
const router = express.Router();
const WaterLog = require('../models/waterLogSchema.js');

router.get('/', async (req, res) => {
  try {
    const waterLogs = await WaterLog.find();
    res.json({ waterLogs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
