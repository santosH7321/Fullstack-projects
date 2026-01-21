import { Response } from "express"
import Symptom from "../models/Symptom"
import { AuthRequest } from "../middlewares/auth.middleware"
import User from "../models/User"
import { sendEmail } from "../utils/sendEmail"


export const getInsights = async (req: AuthRequest, res: Response) => {
  const last7Days = new Date()
  last7Days.setDate(last7Days.getDate() - 7)

  const symptoms = await Symptom.find({
    user: req.user._id,
    date: { $gte: last7Days },
  })

  const insights: string[] = []

  if (insights.length > 0) {
  const user = await User.findById(req.user._id)

    if (user?.email) {
      await sendEmail(
        user.email,
        "Health Alert Notification",
        insights.join("\n")
      )
    }
  }


  const highSeverityCount = symptoms.filter((s) => s.severity >= 4).length
  if (highSeverityCount >= 3) {
    insights.push(
      "High severity symptoms detected multiple times this week"
    )
  }

  const symptomMap: Record<string, number> = {}
  symptoms.forEach((s) => {
    symptomMap[s.symptomName] = (symptomMap[s.symptomName] || 0) + 1
  })

  Object.entries(symptomMap).forEach(([name, count]) => {
    if (count >= 5) {
      insights.push(`Frequent occurrence of ${name}`)
    }
  })

  res.json(insights)
}
