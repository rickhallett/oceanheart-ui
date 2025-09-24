export default function FeaturesSection() {
  const features = [
    {
      title: "Clinical Foundation",
      description: "Starts with Kai's professional assessment of your patterns, values, and goals using evidence-based therapeutic frameworks.",
      color: "from-blue-400 to-blue-600"
    },
    {
      title: "Advanced Prompt Engineering",
      description: "Your assessment becomes a sophisticated AI prompt—not just instructions, but a living knowledge graph of who you are.",
      color: "from-purple-400 to-purple-600"
    },
    {
      title: "Personalized Guidance",
      description: "Every conversation builds on deep understanding of your unique context, helping you uncover unknown unknowns about yourself.",
      color: "from-green-400 to-green-600"
    },
    {
      title: "Continuous Evolution",
      description: "Your AI coach learns and adapts, updating its understanding as you grow and change through life's journey.",
      color: "from-orange-400 to-orange-600"
    },
    {
      title: "Contained & Secure",
      description: "Your personal AI exists only for you. Your own container, with all the depth of understanding you'd expect from years of therapy.",
      color: "from-red-400 to-red-600"
    },
    {
      title: "Unprecedented Quality",
      description: "This isn't ChatGPT with a nice interface. It's a professionally engineered system that represents the cutting edge of personalized AI.",
      color: "from-indigo-400 to-indigo-600"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 md:px-4">
        {/* Section Header */}
        <div className="text-center mb-20 synai-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            How Synai Works
          </h2>
          <p className="text-lg md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            A fusion of clinical expertise, advanced AI engineering, and your unique psychological fingerprint
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`text-center p-8 synai-fade-in ${index < 3 ? 'synai-fade-in-delay-1' : index < 6 ? 'synai-fade-in-delay-2' : 'synai-fade-in-delay-3'}`}
            >
              {/* Animated Feature Icon */}
              <div className="relative w-20 h-20 mx-auto mb-8">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-full animate-pulse`}></div>
                <div className={`absolute inset-2 bg-gradient-to-br ${feature.color} rounded-full opacity-70 animate-spin`} style={{ animationDuration: '8s' }}></div>
                <div className={`absolute inset-4 bg-gradient-to-br ${feature.color} rounded-full animate-ping`} style={{ animationDuration: '3s' }}></div>
                <div className={`absolute inset-6 bg-white rounded-full shadow-lg`}></div>
                <div className={`absolute inset-7 bg-gradient-to-br ${feature.color} rounded-full`}></div>
              </div>

              {/* Feature Title */}
              <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                {feature.title}
              </h4>

              {/* Feature Description */}
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