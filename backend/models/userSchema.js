const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    description: 'Username of the user'
  },
  email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    description: 'Email address of the user'
  },
  password: {
    type: String,
    required: true,
    description: 'Password of the user'
  },
  weight: {
    type: Number,
    required: true,
    min: 1,
    description: 'Weight of the user in kilograms'
  },
  lifestyle: {
    type: String,
    required: true,
    enum: ['Active', 'Moderate', 'Sedentary'],
    description: 'Lifestyle of the user'
  },
  goal: {
    type: String,
    required: true,
    description: 'Goal of the user'
  },
  height: {
    type: Number,
    required: true,
    min: 1,
    description: 'Height of the user in centimeters'
  },
  bmi: {
    type: Number,
    required: true,
    min: 1,
    description: 'BMI (Body Mass Index) of the user'
  },
  birthday: {
    type: String,
    required: true,
    match: /^\d{4}-\d{2}-\d{2}$/,
    description: 'Birthday of the user in the format YYYY-MM-DD'
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    description: 'Age of the user'
  },
  sex: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other'],
    description: 'Sex of the user'
  }
});

module.exports = mongoose.model('users', userSchema);
