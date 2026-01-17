import type { Symptom } from "../types/symptom"

export const prepareWeeklyData = (symptoms: Symptom[]) => {
  const last7Days = symptoms.slice(0, 7).reverse()

  return last7Days.map((s) => ({
    date: new Date(s.date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    }),
    severity: s.severity,
  }))
}
