import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getSymptoms } from "../services/symptom.service"
import SeverityChart from "../components/SeverityChart"
import { prepareWeeklyData } from "../utils/chartData"
import type { Symptom } from "../types/symptom"

export default function Dashboard() {
  const [symptoms, setSymptoms] = useState<Symptom[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSymptoms()
      .then((res) => setSymptoms(res.data.data))
      .finally(() => setLoading(false))
  }, [])

  const chartData = prepareWeeklyData(symptoms)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-gray-800">
            Health Dashboard 🩺
          </h1>
          <p className="text-gray-500 mt-1">
            Track your symptoms and monitor weekly severity
          </p>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link
            to="/add-symptom"
            className="group bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Add Symptom
                </h2>
                <p className="text-gray-500 mt-1">
                  Log how you're feeling today
                </p>
              </div>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-2xl group-hover:scale-110 transition">
                ➕
              </div>
            </div>
          </Link>

          <Link
            to="/history"
            className="group bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  View History
                </h2>
                <p className="text-gray-500 mt-1">
                  Review past symptom entries
                </p>
              </div>
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-2xl group-hover:scale-110 transition">
                📖
              </div>
            </div>
          </Link>
        </section>

        <section className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            Weekly Severity Overview
          </h2>
          <p className="text-gray-500 mb-4">
            Last 7 days symptom severity
          </p>

          {loading && (
            <p className="text-gray-500">Loading chart data...</p>
          )}

          {!loading && chartData.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No data available for the chart.</p>
              <p className="text-sm mt-1">
                Start by adding a symptom.
              </p>
            </div>
          )}

          {!loading && chartData.length > 0 && (
            <SeverityChart data={chartData} />
          )}
        </section>

      </div>
    </div>
  )
}
