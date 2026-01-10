import express from "express"
import { fetchImages } from "../controllers/image.controller.js"
import History from "../models/History.model.js"

const router = express.Router()

router.post("/", fetchImages)
router.get("/history", async (req, res) => {
  const history = await History.find().sort({ createdAt: -1 }).limit(10)
  res.json(history)
})

router.delete("/history/:id", async (req, res) => {
  try {
    const { id } = req.params
    await History.findByIdAndDelete(id)
    res.json({ message: "History deleted successfully" })
  } catch (err) {
    res.status(500).json({ error: "Failed to delete history" })
  }
})

router.delete("/history", async (req, res) => {
  try {
    await History.deleteMany({})
    res.json({ message: "All history deleted" })
  } catch (err) {
    res.status(500).json({ error: "Failed to clear history" })
  }
})


export default router
