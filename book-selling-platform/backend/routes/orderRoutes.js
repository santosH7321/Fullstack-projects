import express from "express"
import {
  createOrder,
  getMyOrders,
  getAllOrders
} from "../controllers/orderController.js"
import protect from "../middlewares/protect.js"
import admin from "../middlewares/admin.js"

const router = express.Router()

router.post("/", protect, createOrder)
router.get("/my", protect, getMyOrders)

router.get("/", protect, admin, getAllOrders)

export default router
