const features = [
  { title: "Daily Tracking", icon: "📝", desc: "Log symptoms easily." },
  { title: "Weekly Insights", icon: "📊", desc: "Detect health patterns." },
  { title: "Secure Data", icon: "🔒", desc: "Privacy-first design." },
]

export default function FeaturesSection() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center">
          Why HealthTrack?
        </h2>

        <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl shadow-md p-8 text-center"
            >
              <div className="text-4xl">{f.icon}</div>
              <h3 className="mt-4 text-xl font-semibold">
                {f.title}
              </h3>
              <p className="mt-2 text-gray-500 text-sm">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
