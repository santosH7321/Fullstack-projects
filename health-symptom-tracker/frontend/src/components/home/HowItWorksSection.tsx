const steps = [
  { step: "01", title: "Create Account" },
  { step: "02", title: "Log Symptoms" },
  { step: "03", title: "View Insights" },
]

export default function HowItWorksSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center">
          How it works
        </h2>

        <div className="mt-12 grid md:grid-cols-3 gap-10 text-center">
          {steps.map((s) => (
            <div key={s.step}>
              <div className="text-emerald-600 text-4xl font-bold">
                {s.step}
              </div>
              <h3 className="mt-4 text-xl font-semibold">
                {s.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
