const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
const app = express();

const allowedOrigins = [
  'https://fit-freak-ini6qwbpr-rushils-projects-26391fe7.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
// app.use(cors(corsOptions));
app.use(cors()); // To Allow all origins 

// app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes.js'); //Normal for all users
const foodLogRoutes = require('./routes/foodLogRoutes.js'); //Normal for all users
const workoutLogRoutes = require('./routes/workoutLogRoutes.js'); //Normal for all users
const waterLogRoutes = require('./routes/waterLogRoutes.js'); //Normal for all users

const userUserRoutes = require('./routes/userUserRoutes.js'); //For specific users (as per the username)
const foodLogUserRoutes = require('./routes/foodLogUserRoutes.js') //For specific users (as per the username)
const workoutLogUserRoutes = require('./routes/workoutLogUserRoutes.js'); //For specific users (as per the username)
const waterLogUserRoutes = require('./routes/waterLogUserRoutes.js'); //For specific users (as per the username)

const userGetRoutes =  require('./routes/userGetRoutes.js'); //To get data from users
const foodLogGetRoutes = require('./routes/foodLogGetRoutes.js'); //To get data from users
const workoutLogGetRoutes = require('./routes/workoutLogGetRoutes.js'); //To get data from users
const waterLogGetRoutes = require('./routes/waterLogGetRoutes.js'); //To get data from users

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (error) => console.error("MongoDB connection error:", error));
db.once("open", () => console.log("Connected to MongoDB"));

app.get('/', (req, res) => {
  res.send("Server is running.")
})

// This is for all the users.
app.use("/api/users", userRoutes);
app.use("/api/foodlog", foodLogRoutes);
app.use("/api/workoutlog", workoutLogRoutes);
app.use("/api/waterlog", waterLogRoutes);

// Now for specific users.
app.use("/api/users", userUserRoutes);
app.use("/api/foodlog", foodLogUserRoutes);
app.use("/api/workoutlog", workoutLogUserRoutes);
app.use("/api/waterlog", waterLogUserRoutes);

// Now for adding data for users.
app.use("/api/userGet", userGetRoutes);
app.use("/api/foodLogGet", foodLogGetRoutes);
app.use("/api/workoutLogGet", workoutLogGetRoutes);
app.use("/api/waterLogGet", waterLogGetRoutes);

app.listen(process.env.PORT || 8000, () => {
  console.log("Server started on port " + (process.env.PORT || 8000));
});
