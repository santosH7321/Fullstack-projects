import express from "express"
import cors from "cors"


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


const PORT = 8080

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
})

export default app
