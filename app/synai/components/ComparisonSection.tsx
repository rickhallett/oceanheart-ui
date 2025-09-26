export default function ComparisonSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 md:px-4">
        {/* Section Header */}
        <div className="text-center mb-20 synai-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Generic AI vs. Personal AI
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The difference between one-size-fits-all and truly personalized guidance
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto relative">
          {/* VS indicator */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-xl border-4 border-white">
              <span className="text-white font-bold text-lg">VS</span>
            </div>
          </div>
          {/* Generic AI Card */}
          <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-200 synai-fade-in synai-fade-in-delay-1">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 to-orange-400 rounded-t-2xl"></div>

            <h3 className="text-2xl font-bold text-gray-700 mb-6 flex items-center">
              <div className="w-3 h-3 bg-red-400 rounded-full mr-3"></div>
              Generic AI
            </h3>

            <ul className="space-y-4">
              {[
                "One-size-fits-all answers",
                "Looks helpful, often misses your reality",
                "No memory of your values or history",
                "Starts from zero each time",
                "Handles symptoms, not patterns"
              ].map((limitation, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-6 h-6 bg-red-400 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✗</span>
                  </div>
                  <span className="text-gray-700 font-medium">{limitation}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Synai Card */}
          <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-200 synai-fade-in synai-fade-in-delay-2">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-t-2xl"></div>

            <h3 className="text-2xl font-bold text-primary mb-6 flex items-center">
              <div className="w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full mr-3"></div>
              Synai (Personal AI)
            </h3>

            <ul className="space-y-4">
              {[
                "Built from a structured intake and goals",
                "Carries context: history, values, constraints",
                "Guidance tuned to your patterns",
                "Grounded in clear, evidence-informed principles",
                "Improves through ongoing use",
                "Works at the level of patterns and decisions"
              ].map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className="text-gray-700 font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}