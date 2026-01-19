import mongoose, { Document } from "mongoose"

export interface ISymptom extends Document {
  user: mongoose.Types.ObjectId
  symptomName: string
  severity: number
  notes?: string
  date: Date
  sleepHours?: number
  waterIntake?: number
  mood?: string
}

const symptomSchema = new mongoose.Schema<ISymptom>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    symptomName: {
      type: String,
      required: true,
      trim: true,
    },
    severity: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    notes: String,

    date: {
      type: Date,
      default: Date.now,
    },
    sleepHours: {
      type: Number,
      min: 0,
      max: 24,
    },
    waterIntake: {
      type: Number,
      min: 0,
    },
    mood: {
      type: String,
      enum: ["happy", "normal", "stressed"],
    },
  },
  { timestamps: true }
)

export default mongoose.model<ISymptom>("Symptom", symptomSchema)
