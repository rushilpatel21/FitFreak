const express = require('express');
const router = express.Router();
const WorkoutLog = require('../models/workoutLogSchema.js');

router.get('/:username', async (req, res) => {
    const userName =  req.params.username;
    try{
        const workoutlog = await WorkoutLog.find({ userName : userName}).sort({ startTime: 1});
        res.json({ workoutlog });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

module.exports = router;