const express = require('express');
const router = express.Router();
const FoodLog = require('../models/foodLogSchema');

router.get('/:username', async(req,res) => {
    const userName = req.params.username;
    try{
        const foodLogs = await FoodLog.find({ userName : userName}).sort({waterDate: -1});
        res.json({ foodLogs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } 
});

module.exports = router;
