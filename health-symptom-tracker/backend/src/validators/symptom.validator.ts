import { z } from "zod"

export const symptomSchema = z.object({
  symptomName: z.string().min(1),
  severity: z.number().min(1).max(5),
  notes: z.string().optional(),
  sleepHours: z.number().optional(),
  waterIntake: z.number().optional(),
  mood: z.string().optional(),
})
