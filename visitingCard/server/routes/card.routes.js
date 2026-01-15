import express from "express"
import {
  createCard,
  getCardById,
  getAllCards
} from "../controllers/card.controller.js"

const router = express.Router()

router.post("/", createCard)
router.get("/", getAllCards)
router.get("/:id", getCardById)

export default router
