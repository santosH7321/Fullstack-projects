import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

import cardRoutes from "./routes/card.routes.js"

dotenv.config() 

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/cards", cardRoutes)

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("MongoDB Connected")
  } catch (error) {
    console.error("MongoDB connection failed:", error.message)
    process.exit(1)
  }
}

const PORT = process.env.PORT || 3000

connectDB()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
