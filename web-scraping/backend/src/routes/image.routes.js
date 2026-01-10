import express from "express"
import { fetchImages } from "../controllers/image.controller.js"

const router = express.Router()

router.post("/", fetchImages)

export default router
