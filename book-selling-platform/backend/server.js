import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDB from "./config/db.js"
import authRoutes from "./routes/authRoutes.js"
import googleAuthRoutes from "./routes/googleAuthRoutes.js"
import bookRoutes from "./routes/bookRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("API is running on port 3000 🚀")
})

app.use("/api/auth", authRoutes)

app.use("/api/auth", googleAuthRoutes)

app.use("/api/books", bookRoutes)

app.use("/api/orders", orderRoutes)

app.use("/api/payment", paymentRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
