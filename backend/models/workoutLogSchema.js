const mongoose = require('mongoose');

const workoutLogSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    workoutDate: {
        type: String,
        required: true,
        match: /^\d{4}-\d{2}-\d{2}$/
    },
    workoutType: {
        type: String,
        required: true,
        enum: ['Cardio', 'Strength Training', 'Flexibility Training', 'Balance And Stability']
    },
    workoutName: {
        type: String,
        required: true
    },
    workoutMinutes: {
        type: Number,
        required: true,
        min: 1
    },
    caloriesBurnt: {
        type: Number,
        required: true,
        min: 1
    },
    startTime: {
        type: String,
        required: true,
        match: /^(?:[01]\d|2[0-3]):[0-5]\d$/
    }
});

module.exports = mongoose.model("workout logs", workoutLogSchema);
