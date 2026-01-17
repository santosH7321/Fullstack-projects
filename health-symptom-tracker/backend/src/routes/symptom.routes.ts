import { Router } from "express"
import { addSymptom, getSymptoms } from "../controllers/symptom.controller"
import { protect } from "../middlewares/auth.middleware"

const router = Router()

router.post("/", protect, addSymptom)
router.get("/", protect, getSymptoms)

export default router
