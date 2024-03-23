const express = require("express");
const mongoose = require("mongoose");

require('dotenv').config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (error) => console.error("MongoDB connection error:", error));
db.once("open", () => console.log("Connected to MongoDB"));

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
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

  const foodLogSchema = new mongoose.Schema({
    userName: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    calories: {
      type: Number,
      required: true
    },
    serving_size_g: {
      type: Number,
      required: true
    },
    fat_total_g: {
      type: Number,
      required: true
    },
    fat_saturated_g: {
      type: Number,
      required: true
    },
    protein_g: {
      type: Number,
      required: true
    },
    sodium_mg: {
      type: Number,
      required: true
    },
    potassium_mg: {
      type: Number,
      required: true
    },
    cholesterol_mg: {
      type: Number,
      required: true
    },
    carbohydrates_total_g: {
      type: Number,
      required: true
    },
    fiber_g: {
      type: Number,
      required: true
    },
    sugar_g: {
      type: Number,
      required: true
    },
    date: {
      type: String,
      required: true,
      match: /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/
    }
  });

  const workoutLogSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    workoutDate: {
        type: String,
        required: true,
        match: /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/
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

  const waterLogSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    waterDate: {
        type: String,
        required: true,
        match: /^[0-9]{2}-[0-9]{2}-[0-9]{4}$/
    },
    waterQuantity: {
        type: Number,
        required: true
    },
    waterUnit: {
        type: String,
        required: true,
        enum: ['Glass', 'l', 'ml']
    }
  });

// Define user model
const User = mongoose.model("User", userSchema);
const WorkoutLog = mongoose.model("workout logs",workoutLogSchema);
const WaterLog = mongoose.model("water log", waterLogSchema);
const FoodLog = mongoose.model("food log", foodLogSchema);

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/workoutlog", async (req, res) => {
    try {
      const workoutlog = await WorkoutLog.find();
      res.json({ workoutlog });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

app.get("/api/waterlog", async (req, res) => {
    try {
      const waterlog = await WaterLog.find();
      res.json({ waterlog });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

app.get("/api/foodlog", async (req, res) => {
    try {
      const foodlog = await FoodLog.find();
      res.json({ foodlog });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

app.listen(process.env.PORT || 8000, () => {
  console.log("Server started on port " + (process.env.PORT || 8000));
});
