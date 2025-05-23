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
      description: "Your personal AI coach guides you through life's challenges, helping you make decisions aligned with your deepest values and highest potential."
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-24 synai-fade-in">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Your Journey to Personal AI
          </h2>
          <p className="text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            From clinical assessment to your private AI coach in three steps
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative bg-white/95 backdrop-blur-lg rounded-3xl p-10 shadow-2xl text-center transition-all duration-500 hover:-translate-y-4 hover:shadow-3xl synai-fade-in synai-fade-in-delay-${index + 1}`}
            >
              {/* Step Number Badge */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-xl">
                {step.number}
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full opacity-60"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-purple-400 rounded-full opacity-60"></div>

              {/* Step Content */}
              <div className="pt-8">
                <h4 className="text-2xl font-bold text-gray-900 mb-6">
                  {step.title}
                </h4>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Connecting Flow Lines */}
        <div className="hidden md:flex items-center justify-center mt-16 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-5xl flex justify-between px-20">
              <div className="w-32 h-1 bg-white/30 rounded-full"></div>
              <div className="w-32 h-1 bg-white/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}