import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.routes"
import symptomRoutes from "./routes/symptom.routes"
import insightRoutes from "./routes/insight.routes"
import { errorHandler } from "./middlewares/error.middleware"
import { apiLimiter } from "./middlewares/rateLimit.middleware"
import helmet from "helmet"

const app = express()

app.use(cors())
app.use(express.json())
app.use(errorHandler)
app.use(helmet())
app.use("/api", apiLimiter)

app.get("/", (_req, res) => {
  res.send("Health Tracker API running")
})
app.use("/api/auth", authRoutes)
app.use("/api/symptoms", symptomRoutes)
app.use("/api/insights", insightRoutes)

export default app
