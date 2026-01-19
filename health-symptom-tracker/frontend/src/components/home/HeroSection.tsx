import { Link } from "react-router-dom"

export default function HeroSection() {
  return (
    <section className="bg-linear-to-br from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Track Your Health.
            <br />
            <span className="text-emerald-600">
              Understand Your Body.
            </span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            Log symptoms, monitor severity, and get weekly
            health insights effortlessly.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              to="/register"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="border px-6 py-3 rounded-xl"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
