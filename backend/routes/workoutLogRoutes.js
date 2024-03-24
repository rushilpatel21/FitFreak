const express = require('express');
const router = express.Router();
const WorkoutLog = require('../models/workoutLogSchema.js');

router.get('', async (req, res) => {
  try {
    const workoutLogs = await WorkoutLog.find();
    res.json({ workoutLogs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
