import { Response } from "express"
import Symptom from "../models/Symptom"
import { AuthRequest } from "../middlewares/auth.middleware"

export const addSymptom = async (req: AuthRequest, res: Response) => {
  const { symptomName, severity, notes, date } = req.body

  const symptom = await Symptom.create({
    user: req.user._id,
    symptomName,
    severity,
    notes,
    date,
  })

  res.status(201).json(symptom)
}

export const getSymptoms = async (req: AuthRequest, res: Response) => {
  const symptoms = await Symptom.find({ user: req.user._id }).sort({
    date: -1,
  })

  res.json(symptoms)
}
