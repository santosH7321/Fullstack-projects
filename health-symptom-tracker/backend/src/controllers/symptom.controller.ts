import { Response } from "express"
import Symptom from "../models/Symptom"
import { AuthRequest } from "../middlewares/auth.middleware"

export const addSymptom = async (req: AuthRequest, res: Response) => {
  const { symptomName, severity, notes, date, sleepHours, waterIntake, mood } = req.body

  const symptom = await Symptom.create({
    user: req.user._id,
    symptomName,
    severity,
    notes,
    date,
    sleepHours,
    waterIntake,
    mood,
  })

  res.status(201).json(symptom)
}
export const getSymptoms = async (req: AuthRequest, res: Response) => {
  const {
    from,
    to,
    severity,
    page = "1",
    limit = "5",
  } = req.query

  const query: any = {
    user: req.user._id,
  }

  if (from && to) {
    query.date = {
      $gte: new Date(from as string),
      $lte: new Date(to as string),
    }
  }

  if (severity) {
    query.severity = Number(severity)
  }

  const pageNumber = Number(page)
  const limitNumber = Number(limit)
  const skip = (pageNumber - 1) * limitNumber

  const symptoms = await Symptom.find(query)
    .sort({ date: -1 }) 
    .skip(skip)
    .limit(limitNumber)

  const total = await Symptom.countDocuments(query)
  res.json({
    total,
    page: pageNumber,
    pages: Math.ceil(total / limitNumber),
    data: symptoms,
  })
}

