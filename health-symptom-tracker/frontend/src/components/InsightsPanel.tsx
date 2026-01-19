import { useEffect, useState } from "react"
import { getInsights } from "../services/insight.service"

export default function InsightsPanel() {
  const [insights, setInsights] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getInsights()
      .then((res) => setInsights(res.data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return null

  return (
    <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
      <h3 className="text-lg font-semibold text-amber-800 mb-3">
        Health Insights ⚠️
      </h3>

      {insights.length === 0 ? (
        <p className="text-amber-700">
          ✅ No unusual health patterns detected this week.
        </p>
      ) : (
        <ul className="space-y-2">
          {insights.map((insight, idx) => (
            <li key={idx} className="flex gap-2 text-amber-700">
              <span>⚠️</span>
              <span>{insight}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
