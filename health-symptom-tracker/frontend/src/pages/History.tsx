import { useEffect, useState } from "react"
import { getSymptoms } from "../services/symptom.service"

interface Symptom {
  _id: string
  symptomName: string
  severity: number
  notes?: string
  date: string
}

const severityLabels: Record<number, string> = {
  1: "Very Mild",
  2: "Mild",
  3: "Moderate",
  4: "Severe",
  5: "Very Severe",
}

const severityColors: Record<number, string> = {
  1: "bg-green-100 text-green-700",
  2: "bg-lime-100 text-lime-700",
  3: "bg-yellow-100 text-yellow-700",
  4: "bg-orange-100 text-orange-700",
  5: "bg-red-100 text-red-700",
}

export default function History() {
  const [symptoms, setSymptoms] = useState<Symptom[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSymptoms()
      .then((res) => setSymptoms(res.data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">

        <h2 className="text-3xl font-bold text-gray-800">
          Symptom History 📖
        </h2>
        <p className="text-gray-500 mt-1">
          Review your past symptom logs
        </p>

        {loading && (
          <p className="mt-6 text-gray-500">Loading symptoms...</p>
        )}

        {!loading && symptoms.length === 0 && (
          <div className="mt-10 bg-white rounded-xl shadow p-6 text-center">
            <p className="text-gray-600">
              No symptoms recorded yet.
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Start by adding your first symptom.
            </p>
          </div>
        )}

        <div className="mt-8 space-y-4">
          {symptoms.map((s) => (
            <div
              key={s._id}
              className="bg-white rounded-2xl shadow-md p-6"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-semibold text-gray-800">
                  {s.symptomName}
                </h4>

                <span
                  className={`text-sm font-medium px-3 py-1 rounded-full ${severityColors[s.severity]}`}
                >
                  {severityLabels[s.severity]}
                </span>
              </div>

              <p className="text-sm text-gray-500 mt-1">
                {new Date(s.date).toLocaleDateString()}
              </p>

              {s.notes && (
                <p className="mt-4 text-gray-700 bg-gray-50 p-3 rounded-lg">
                  {s.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
