const express = require('express');
const router = express.Router();
const FoodLog = require('../models/foodLogSchema');

router.post('', async (req, res) => {
    try {
      const { userName, name, calories,serving_size_g, fat_total_g, fat_saturated_g, protein_g, sodium_mg, potassium_mg, cholesterol_mg, carbohydrates_total_g, fiber_g, sugar_g, date } = req.body;
      
      const newFoodLog = new FoodLog({
        userName,
        name,
        calories,
        serving_size_g,
        fat_total_g,
        fat_saturated_g,
        protein_g,
        sodium_mg,
        potassium_mg,
        cholesterol_mg,
        carbohydrates_total_g,
        fiber_g,
        sugar_g,
        date
      });

      await newFoodLog.save();
      
      res.status(201).send('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).send('Internal server error');
    }
});
  
module.exports = router;