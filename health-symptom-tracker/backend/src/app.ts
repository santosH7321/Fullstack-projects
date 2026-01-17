import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.routes"
import symptomRoutes from "./routes/symptom.routes"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (_req, res) => {
  res.send("Health Tracker API running")
})
app.use("/api/auth", authRoutes)
app.use("/api/symptoms", symptomRoutes)

export default app
