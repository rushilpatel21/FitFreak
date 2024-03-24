const express = require('express');
const router = express.Router();
const User = require('../models/userSchema.js');

router.post('', async  (req, res) => {
    try{
        const {username, email, password, weight, lifestyle, goal, height, bmi, birthday, age, sex} = req.body;

        const newUser = new User({
            username,
            email,
            password,
            weight,
            lifestyle,
            goal,
            height,
            bmi,
            birthday,
            age,
            sex       
        });

        await newUser.save();
        res.status(201).send('Data saved successfully');
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;