import express from "express"
import {
  createPaymentOrder,
  verifyPayment,
} from "../controllers/paymentController.js"
import protect from "../middlewares/protect.js"

const router = express.Router()

router.post("/create", protect, createPaymentOrder)
router.post("/verify", protect, verifyPayment)

export default router
