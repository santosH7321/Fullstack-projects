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

  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [severity, setSeverity] = useState("")
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)

  const fetchData = () => {
    setLoading(true)

    getSymptoms({
      from: from || undefined,
      to: to || undefined,
      severity: severity ? Number(severity) : undefined,
      page,
      limit: 5,
    })
      .then((res) => {
        setSymptoms(res.data.data)
        setPages(res.data.pages)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchData()
  }, [page])

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Symptom History 📖
          </h2>
          <p className="text-gray-500 mt-1">
            Review and filter your past symptom logs
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow p-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
          
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          />

          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          />

          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="">All Severities</option>
            <option value="1">Very Mild</option>
            <option value="2">Mild</option>
            <option value="3">Moderate</option>
            <option value="4">Severe</option>
            <option value="5">Very Severe</option>
          </select>

          <button
            onClick={() => {
              setPage(1)
              fetchData()
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-4 py-2 text-sm font-medium"
          >
            Apply
          </button>
        </div>
        {loading && (
          <p className="text-gray-500">Loading symptoms...</p>
        )}

        {!loading && symptoms.length === 0 && (
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <p className="text-gray-600">
              No symptoms found for selected filters.
            </p>
          </div>
        )}

        <div className="space-y-4">
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

        {/* ================= Pagination ================= */}
        <div className="flex justify-between items-center pt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded-lg text-sm disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm text-gray-500">
            Page {page} of {pages}
          </span>

          <button
            onClick={() => setPage((p) => Math.min(pages, p + 1))}
            disabled={page === pages}
            className="px-4 py-2 border rounded-lg text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>

      </div>
    </div>
  )
}
