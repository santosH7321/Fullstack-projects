import { useState } from "react"
import { addSymptom } from "../services/symptom.service"
import { useNavigate } from "react-router-dom"

export default function AddSymptom() {
  const [symptomName, setSymptomName] = useState("")
  const [severity, setSeverity] = useState(3)
  const [notes, setNotes] = useState("")
  const [sleepHours, setSleepHours] = useState<number | "">("")
  const [waterIntake, setWaterIntake] = useState<number | "">("")
  const [mood, setMood] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      setLoading(true)
      await addSymptom({
        symptomName,
        severity,
        notes,
        sleepHours: sleepHours === "" ? undefined : sleepHours,
        waterIntake: waterIntake === "" ? undefined : waterIntake,
        mood: mood || undefined,
      })
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

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <input
            value={symptomName}
            onChange={(e) => setSymptomName(e.target.value)}
            placeholder="Symptom name"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />

          <div>
            <div className="flex justify-between mb-2">
              <span>Severity</span>
              <span className="text-emerald-600 font-semibold">
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
          </div>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Notes (optional)"
            rows={3}
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="number"
            placeholder="Sleep hours"
            value={sleepHours}
            onChange={(e) =>
              setSleepHours(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="w-full px-4 py-2 border rounded-lg"
          />

          <input
            type="number"
            placeholder="Water intake (liters)"
            value={waterIntake}
            onChange={(e) =>
              setWaterIntake(
                e.target.value === "" ? "" : Number(e.target.value)
              )
            }
            className="w-full px-4 py-2 border rounded-lg"
          />

          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="">Mood</option>
            <option value="happy">Happy</option>
            <option value="normal">Normal</option>
            <option value="stressed">Stressed</option>
          </select>

          <button
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-2 rounded-lg"
          >
            {loading ? "Saving..." : "Add Symptom"}
          </button>
        </form>
      </div>
    </div>
  )
}
