const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const userRoutes = require('./routes/userRoutes.js');
const foodLogRoutes = require('./routes/foodLogRoutes.js');
const workoutLogRoutes = require('./routes/workoutLogRoutes.js');
const waterLogRoutes = require('./routes/waterLogRoutes.js');
const waterLogUserRoutes = require('./routes/waterLogUserRoutes.js');
const workoutLogUserRoutes = require('./routes/workoutLogUserRoutes.js');
const foodLogUserRoutes = require('./routes/foodLogUserRoutes.js')
const userUserRoutes = require('./routes/userUserRoutes.js');


const app = express();

app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (error) => console.error("MongoDB connection error:", error));
db.once("open", () => console.log("Connected to MongoDB"));


// This is for all the users.
app.use("/api/users", userRoutes);
app.use("/api/foodlog", foodLogRoutes);
app.use("/api/workoutlog", workoutLogRoutes);
app.use("/api/waterlog", waterLogRoutes);


// Now for specific users.
app.use("/api/waterlog", waterLogUserRoutes);
app.use("/api/workoutlog", workoutLogUserRoutes);
app.use("/api/foodlog", foodLogUserRoutes);
app.use("/api/users", userUserRoutes);

app.listen(process.env.PORT || 8000, () => {
  console.log("Server started on port " + (process.env.PORT || 8000));
});
