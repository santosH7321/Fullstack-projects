import express from "express"
import { fetchImages } from "../controllers/image.controller.js"
import History from "../models/History.model.js"

const router = express.Router()

router.post("/", fetchImages)
router.get("/history", async (req, res) => {
  const history = await History.find().sort({ createdAt: -1 }).limit(10)
  res.json(history)
})

export default router
