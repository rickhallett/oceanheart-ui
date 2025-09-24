export default function FeaturesSection() {
  const features = [
    {
      title: "Grounded Intake",
      description: "Starts from a structured assessment of your goals, values, and constraints.",
      color: "from-blue-400 to-blue-600"
    },
    {
      title: "Structured Profile",
      description: "Your assessment becomes a concise profile the AI can reliably use.",
      color: "from-purple-400 to-purple-600"
    },
    {
      title: "Personalized Guidance",
      description: "Conversations build on your context instead of starting from scratch.",
      color: "from-green-400 to-green-600"
    },
    {
      title: "Learns Over Time",
      description: "Updates as your situation changes, with simple, transparent rules.",
      color: "from-orange-400 to-orange-600"
    },
    {
      title: "Private by Default",
      description: "A dedicated container focused on your work, not a shared pool.",
      color: "from-red-400 to-red-600"
    },
    {
      title: "Practical, Not Flashy",
      description: "Designed to be dependable and useful day-to-day.",
      color: "from-indigo-400 to-indigo-600"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-4">
        <div className="text-center mb-20 synai-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            How Synai Works
          </h2>
          <p className="text-lg md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Simple building blocks that make the AI actually useful to you
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`text-center p-8 synai-fade-in ${index < 3 ? 'synai-fade-in-delay-1' : index < 6 ? 'synai-fade-in-delay-2' : 'synai-fade-in-delay-3'}`}
            >
              <div className="relative w-20 h-20 mx-auto mb-8">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-full animate-pulse`}></div>
                <div className={`absolute inset-2 bg-gradient-to-br ${feature.color} rounded-full opacity-70 animate-spin`} style={{ animationDuration: '8s' }}></div>
                <div className={`absolute inset-4 bg-gradient-to-br ${feature.color} rounded-full animate-ping`} style={{ animationDuration: '3s' }}></div>
                <div className={`absolute inset-6 bg-white rounded-full shadow-lg`}></div>
                <div className={`absolute inset-7 bg-gradient-to-br ${feature.color} rounded-full`}></div>
              </div>

              <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                {feature.title}
              </h4>

              <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}