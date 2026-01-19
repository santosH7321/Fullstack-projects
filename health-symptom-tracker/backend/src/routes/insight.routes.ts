import { Router } from "express"
import { getInsights } from "../controllers/insight.controller"
import { protect } from "../middlewares/auth.middleware"

const router = Router()

router.get("/", protect, getInsights)

export default router
