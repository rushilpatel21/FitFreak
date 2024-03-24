const express = require('express');
const router = express.Router();
const User = require('../models/userSchema.js');

router.get('/:username', async (req,res) => {
    const userName = req.params.username;
    try{
        const users = await User.find({ username : userName});
        res.json({ users });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;