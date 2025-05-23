export default function ComparisonSection() {
  return (
    <section className="py-24 bg-base-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 synai-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-6">
            Generic AI vs. Personal AI
          </h2>
          <p className="text-xl md:text-2xl text-base-content/70 max-w-3xl mx-auto">
            The difference between asking ChatGPT for life advice and having a coach who&apos;s studied you for years
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Generic AI Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-red-500 transition-transform duration-300 hover:-translate-y-2 synai-fade-in synai-fade-in-delay-1">
            <h3 className="text-2xl font-semibold text-red-600 mb-6">
              Generic AI Coaching
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-3 mt-1">✗</span>
                <span className="text-base-content/80">One-size-fits-all responses</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-3 mt-1">✗</span>
                <span className="text-base-content/80">No memory of your unique context</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-3 mt-1">✗</span>
                <span className="text-base-content/80">Surface-level advice that sounds good but doesn&apos;t fit</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-3 mt-1">✗</span>
                <span className="text-base-content/80">No understanding of your values or patterns</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-3 mt-1">✗</span>
                <span className="text-base-content/80">Starts from zero every conversation</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-3 mt-1">✗</span>
                <span className="text-base-content/80">Treats symptoms, not root causes</span>
              </li>
            </ul>
          </div>

          {/* Synai Card */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-primary transition-transform duration-300 hover:-translate-y-2 synai-fade-in synai-fade-in-delay-2">
            <h3 className="text-2xl font-semibold text-primary mb-6">
              Synai: Your Personal AI
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3 mt-1">✓</span>
                <span className="text-base-content/80">Built from your clinical assessment</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3 mt-1">✓</span>
                <span className="text-base-content/80">Knows your history, values, and goals</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3 mt-1">✓</span>
                <span className="text-base-content/80">Guidance tailored to your specific patterns</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3 mt-1">✓</span>
                <span className="text-base-content/80">Grounded in ACT (Acceptance & Commitment Therapy)</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3 mt-1">✓</span>
                <span className="text-base-content/80">Evolves with you through ongoing dialogue</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary font-bold mr-3 mt-1">✓</span>
                <span className="text-base-content/80">Addresses root causes and unconscious blocks</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}