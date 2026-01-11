import express from "express"
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js"
import protect from "../middlewares/protect.js"
import admin from "../middlewares/admin.js"

const router = express.Router()

// PUBLIC
router.get("/", getBooks)

// ADMIN
router.post("/", protect, admin, createBook)
router.put("/:id", protect, admin, updateBook)
router.delete("/:id", protect, admin, deleteBook)

export default router
