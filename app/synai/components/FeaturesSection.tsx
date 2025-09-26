export default function FeaturesSection() {
  const features = [
    {
      title: "Grounded Intake",
      description: "Starts from a structured assessment of your goals, values, and constraints.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Structured Profile",
      description: "Your assessment becomes a concise profile the AI can reliably use.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Personalized Guidance",
      description: "Conversations build on your context instead of starting from scratch.",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      title: "Learns Over Time",
      description: "Updates as your situation changes, with simple, transparent rules.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Private by Default",
      description: "A dedicated container focused on your work, not a shared pool.",
      gradient: "from-slate-600 to-gray-600"
    },
    {
      title: "Practical, Not Flashy",
      description: "Designed to be dependable and useful day-to-day.",
      gradient: "from-indigo-500 to-blue-500"
    }
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #9ca3af 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-6 md:px-4 relative z-10">
        <div className="text-center mb-20 synai-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How Synai Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Six core capabilities that make AI truly personal
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-gray-200 transition-all duration-500 synai-fade-in ${index < 3 ? 'synai-fade-in-delay-1' : index < 6 ? 'synai-fade-in-delay-2' : 'synai-fade-in-delay-3'}`}
            >
              {/* Gradient accent line */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${feature.gradient} rounded-t-2xl`}></div>

              {/* Icon area */}
              <div className="relative mb-6">
                <div className={`w-16 h-16 mx-auto bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                    <div className={`w-4 h-4 bg-gradient-to-r ${feature.gradient} rounded-full`}></div>
                  </div>
                </div>
              </div>

              <h4 className="text-xl font-bold text-gray-900 mb-4 text-center group-hover:text-gray-800 transition-colors duration-300">
                {feature.title}
              </h4>

              <p className="text-gray-600 leading-relaxed text-center group-hover:text-gray-700 transition-colors duration-300">
                {feature.description}
              </p>

              {/* Bottom accent */}
              <div className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}