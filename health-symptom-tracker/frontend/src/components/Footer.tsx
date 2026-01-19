import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h2 className="text-2xl font-bold text-emerald-500">
              HealthTrack
            </h2>
            <p className="text-sm text-gray-400 mt-3 leading-relaxed">
              Track your daily health symptoms, monitor severity,
              and gain meaningful insights to improve your well-being.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/dashboard"
                  className="hover:text-emerald-400 transition"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/add-symptom"
                  className="hover:text-emerald-400 transition"
                >
                  Add Symptom
                </Link>
              </li>
              <li>
                <Link
                  to="/history"
                  className="hover:text-emerald-400 transition"
                >
                  Symptom History
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Support
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">
                📧 support@healthtrack.app
              </li>
              <li className="text-gray-400">
                🕒 Mon - Sat, 9AM - 6PM
              </li>
              <li className="text-gray-400">
                🌍 Built for better health
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} HealthTrack. All rights reserved.
          </p>

          <p className="text-sm text-gray-500">
            Made with ❤️ for healthier lives
          </p>
        </div>
      </div>
    </footer>
  )
}
