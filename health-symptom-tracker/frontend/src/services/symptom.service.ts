import api from "./api"

export const addSymptom = (data: {
  symptomName: string
  severity: number
  notes?: string
  date?: string
}) => api.post("/symptoms", data)

export const getSymptoms = (params?: {
  from?: string
  to?: string
  severity?: number
  page?: number
  limit?: number
}) => {
  return api.get("/symptoms", {
    params,
  })
}
