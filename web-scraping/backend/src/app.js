import express from "express"
import cors from "cors"
import imageRoutes from "./routes/image.routes.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/images", imageRoutes)

const PORT = 8080

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
})

export default app
