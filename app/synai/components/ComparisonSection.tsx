export default function ComparisonSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 md:px-4">
        {/* Section Header */}
        <div className="text-center mb-20 synai-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Generic AI vs. Personal AI
          </h2>
          <p className="text-lg md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            The gap between a one-off chat and a tool that knows your context.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Generic AI Card */}
          <div className="relative bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-10 shadow-xl border border-red-200 synai-fade-in synai-fade-in-delay-1">
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-red-400 rounded-full opacity-30"></div>

            <h3 className="text-2xl md:text-3xl font-bold text-red-700 mb-8 flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-4 animate-pulse"></div>
              Generic AI
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-white text-sm font-bold">✗</span>
                </div>
                <span className="text-red-800 font-medium text-base md:text-lg">One-size-fits-all answers</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-white text-sm font-bold">✗</span>
                </div>
                <span className="text-red-800 font-medium text-base md:text-lg">Looks helpful, often misses your reality</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-white text-sm font-bold">✗</span>
                </div>
                <span className="text-red-800 font-medium text-base md:text-lg">No memory of your values or history</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-white text-sm font-bold">✗</span>
                </div>
                <span className="text-red-800 font-medium text-base md:text-lg">Starts from zero each time</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-white text-sm font-bold">✗</span>
                </div>
                <span className="text-red-800 font-medium text-base md:text-lg">Handles symptoms, not patterns</span>
              </li>
            </ul>
          </div>

          {/* Synai Card */}
          <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-10 shadow-xl border border-blue-200 synai-fade-in synai-fade-in-delay-2">
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-indigo-400 rounded-full opacity-30"></div>

            <h3 className="text-2xl md:text-3xl font-bold text-blue-700 mb-8 flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-4 animate-pulse"></div>
              Synai (Personal AI)
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-blue-800 font-medium text-base md:text-lg">Built from a structured intake and goals</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-blue-800 font-medium text-base md:text-lg">Carries context: history, values, constraints</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-blue-800 font-medium text-base md:text-lg">Guidance tuned to your patterns</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-blue-800 font-medium text-base md:text-lg">Grounded in clear, evidence-informed principles</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-blue-800 font-medium text-base md:text-lg">Improves through ongoing use</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-blue-800 font-medium text-lg">Works at the level of patterns and decisions</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}