import { Link } from "react-router-dom"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <header className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Track and manage your health symptoms
        </p>
      </header>
      <main className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

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

              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 text-2xl group-hover:scale-110 transition">
                ➕
              </div>
            </div>
          </Link>
          <div className="bg-white rounded-2xl shadow-md p-6 opacity-70">
            <h2 className="text-xl font-semibold text-gray-800">
              Symptom History
            </h2>
            <p className="text-gray-500 mt-1">
              View your past symptom logs
            </p>
            <p className="text-sm text-gray-400 mt-4">
              Coming soon…
            </p>
          </div>

        </div>
      </main>
    </div>
  )
}
