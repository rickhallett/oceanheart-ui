export default function ProcessSection() {
  const steps = [
    {
      number: "1",
      title: "Assessment",
      description: "A focused intake to map your goals, values, constraints, and current patterns."
    },
    {
      number: "2",
      title: "Setup",
      description: "We translate that into a structured profile your personal AI can use."
    },
    {
      number: "3",
      title: "Ongoing",
      description: "You work with the AI; we adjust as your needs change."
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-br from-primary to-secondary relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 md:px-4 relative z-10">
        <div className="text-center mb-24 synai-fade-in">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Your Path to Personal AI
          </h2>
          <p className="text-xl md:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            From intake to a working system in three steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative bg-white/95 backdrop-blur-lg rounded-3xl p-10 shadow-2xl text-center synai-fade-in synai-fade-in-delay-${index + 1}`}
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl md:text-2xl shadow-xl">
                {step.number}
              </div>

              <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-400 rounded-full opacity-60"></div>
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-purple-400 rounded-full opacity-60"></div>

              <div className="pt-8">
                <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                  {step.title}
                </h4>
                <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

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