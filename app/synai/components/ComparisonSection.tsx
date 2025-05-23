export default function ComparisonSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20 synai-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Generic AI vs. Personal AI
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            The difference between asking ChatGPT for life advice and having a coach who's studied you for years
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Generic AI Card */}
          <div className="relative bg-gradient-to-br from-red-50 to-red-100 rounded-3xl p-10 shadow-xl border border-red-200 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl synai-fade-in synai-fade-in-delay-1">
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-red-400 rounded-full opacity-30"></div>

            <h3 className="text-3xl font-bold text-red-700 mb-8 flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-4 animate-pulse"></div>
              Generic AI Coaching
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-white text-sm font-bold">✗</span>
                </div>
                <span className="text-red-800 font-medium text-lg">One-size-fits-all responses</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-white text-sm font-bold">✗</span>
                </div>
                <span className="text-red-800 font-medium text-lg">Surface-level advice that sounds good but doesn't fit</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-white text-sm font-bold">✗</span>
                </div>
                <span className="text-red-800 font-medium text-lg">No understanding of your values or patterns</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-white text-sm font-bold">✗</span>
                </div>
                <span className="text-red-800 font-medium text-lg">Starts from zero every conversation</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-white text-sm font-bold">✗</span>
                </div>
                <span className="text-red-800 font-medium text-lg">Looks at symptoms, not root causes</span>
              </li>
            </ul>
          </div>

          {/* Synai Card */}
          <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-10 shadow-xl border border-blue-200 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl synai-fade-in synai-fade-in-delay-2">
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-indigo-400 rounded-full opacity-30"></div>

            <h3 className="text-3xl font-bold text-blue-700 mb-8 flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-4 animate-pulse"></div>
              Synai: Your Personal AI
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-blue-800 font-medium text-lg">Built from your professional evidence-based evaluation</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-blue-800 font-medium text-lg">Knows your history, values, and goals</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-blue-800 font-medium text-lg">Guidance tailored to your specific patterns</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-blue-800 font-medium text-lg">Grounded in ACT (Acceptance &amp; Commitment Therapy)</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-blue-800 font-medium text-lg">Evolves with you through ongoing dialogue</span>
              </li>
              <li className="flex items-start">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <span className="text-blue-800 font-medium text-lg">Addresses root causes and unconscious blocks</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}