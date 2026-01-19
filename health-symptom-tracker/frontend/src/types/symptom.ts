export interface Symptom {
  _id: string
  symptomName: string
  severity: number
  date: string
  notes?: string
  sleepHours?: number
  waterIntake?: number
  mood?: string
}
