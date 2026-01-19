import { Link } from "react-router-dom"

export default function CTASection() {
  return (
    <section className="py-20 text-center">
      <h2 className="text-3xl md:text-4xl font-bold">
        Take control of your health today
      </h2>

      <p className="mt-4 text-gray-600">
        Start tracking symptoms with HealthTrack.
      </p>

      <div className="mt-8">
        <Link
          to="/register"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl"
        >
          Create Free Account
        </Link>
      </div>
    </section>
  )
}
