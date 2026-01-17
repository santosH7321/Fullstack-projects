import api from "./api"

export const addSymptom = (data: {
  symptomName: string
  severity: number
  notes?: string
  date?: string
}) => api.post("/symptoms", data)

export const getSymptoms = () => api.get("/symptoms")
