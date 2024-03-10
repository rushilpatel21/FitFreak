import express from "express"
import cors from "cors"
// import workouts from "./api/workouts.route.js"
import restaurants from './api/restaurants.route.js'

const app = express()

app.use(cors())
app.use(express.json()) // Allows us to parse

// app.use("/api/v1/workouts" , workouts)
// app.use("*",(req,res) => res.status(404).json({error : "not found"}))

app.use("/api/v1/restaurants" , restaurants)
app.use("*",(req,res) => res.status(404).json({error : "not found"}))

export default app