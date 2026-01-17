import { useState } from "react"
import { addSymptom } from "../services/symptom.service"
import { useNavigate } from "react-router-dom"

export default function AddSymptom() {
  const [symptomName, setSymptomName] = useState("")
  const [severity, setSeverity] = useState(3)
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    try {
      setLoading(true)
      await addSymptom({ symptomName, severity, notes })
      navigate("/dashboard")
    } finally {
      setLoading(false)
    }
  }

  const severityLabels: Record<number, string> = {
    1: "Very Mild",
    2: "Mild",
    3: "Moderate",
    4: "Severe",
    5: "Very Severe",
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Add Symptom 🩺
        </h2>
        <p className="text-gray-500 text-center mt-1">
          Track how you're feeling today
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Symptom Name
            </label>
            <input
              type="text"
              placeholder="e.g. Headache, Fever"
              value={symptomName}
              onChange={(e) => setSymptomName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Severity
              </label>
              <span className="text-sm font-semibold text-emerald-600">
                {severityLabels[severity]}
              </span>
            </div>

            <input
              type="range"
              min={1}
              max={5}
              value={severity}
              onChange={(e) => setSeverity(Number(e.target.value))}
              className="w-full accent-emerald-600"
            />

            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>5</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes (optional)
            </label>
            <textarea
              placeholder="Any additional details..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="w-1/3 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-2/3 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg font-semibold transition disabled:opacity-60"
            >
              {loading ? "Saving..." : "Add Symptom"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
