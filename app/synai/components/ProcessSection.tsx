export default function ProcessSection() {
  const steps = [
    {
      number: "1",
      title: "Deep Assessment",
      description: "Kai conducts a comprehensive clinical evaluation, mapping your values, patterns, goals, and unconscious blocks using proven therapeutic frameworks."
    },
    {
      number: "2",
      title: "AI Engineering",
      description: "Your assessment becomes a sophisticated prompt system—a private AI that understands you at a level that generic tools simply cannot match."
    },
    {
      number: "3",
      title: "Ongoing Partnership",
      description: "Your personal AI coach guides you through life&apos;s challenges, helping you make decisions aligned with your deepest values and highest potential."
    }
  ];

  return (
    <section className="py-24 bg-base-300">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 synai-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Your Journey to Personal AI
          </h2>
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto">
            From professional assessment to your private AI coach in three steps
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative bg-black rounded-2xl p-8 shadow-lg text-center transition-transform duration-300 hover:-translate-y-2 synai-fade-in synai-fade-in-delay-${index + 1} text-base-content`}
            >
              {/* Step Number Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-yellow-500 text-black rounded-full flex items-center justify-center font-semibold text-lg">
                {step.number}
              </div>

              {/* Step Content */}
              <div className="pt-4">
                <h4 className="text-xl font-semibold text-secondary mb-4">
                  {step.title}
                </h4>
                <p className="text-secondary/80 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Connecting Lines for Desktop */}
        <div className="hidden md:flex items-center justify-center mt-8 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-4xl flex justify-between px-16">
              <div className="w-24 h-0.5 bg-primary/30"></div>
              <div className="w-24 h-0.5 bg-primary/30"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}