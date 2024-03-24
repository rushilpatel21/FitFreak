const express = require('express');
const router = express.Router();
const WaterLog = require('../models/waterLogSchema.js');

router.use(express.json());

router.post('', async(req, res) => {
    try{
        const { userName, waterDate, waterQuantity, waterUnit } = req.body;
        console.log("check point 1");
        const newWaterLog = new WaterLog({
            userName,
            waterDate,
            waterQuantity,
            waterUnit
        });
        await newWaterLog.save();
        console.log("check point 2");
        res.status(201).send('Data saved successfully');
        console.log("check point 3");
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;