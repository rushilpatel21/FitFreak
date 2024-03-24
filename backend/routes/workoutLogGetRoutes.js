const express = require('express');
const router = express.Router();
const WorkoutLog = require('../models/workoutLogSchema.js');

router.post('', async(req, res) => {
    try{
        const {userName, workoutDate, workoutType, workoutName, workoutMinutes, caloriesBurnt, startTime} = req.body;
        const newWorkoutLog = new WorkoutLog({
            userName,
            workoutDate,
            workoutType,
            workoutName,
            workoutMinutes,
            caloriesBurnt,
            startTime
        });
        await newWorkoutLog.save();
        res.status(201).send('Data saved successfully');
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;