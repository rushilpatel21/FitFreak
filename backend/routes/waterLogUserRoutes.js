const express = require('express');
const router = express.Router();
const WaterLog = require('../models/waterLogSchema.js');

router.get('/:username', async (req,res) => {
    const userName = req.params.username;
    // console.log(userName);
    try{
        const waterLogs = await  WaterLog.find({ userName : userName}).sort({waterDate: -1}); //-1 is for descending order
        res.json({ waterLogs });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;