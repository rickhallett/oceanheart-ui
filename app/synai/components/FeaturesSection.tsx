export default function FeaturesSection() {
  const features = [
    {
      icon: "🧠",
      title: "Clinical Foundation",
      description: "Starts with Kai's professional assessment of your patterns, values, and goals using evidence-based therapeutic frameworks."
    },
    {
      icon: "⚡",
      title: "Advanced Prompt Engineering",
      description: "Your assessment becomes a sophisticated AI prompt—not just instructions, but a living knowledge graph of who you are."
    },
    {
      icon: "🎯",
      title: "Personalized Guidance",
      description: "Every conversation builds on deep understanding of your unique context, helping you uncover \"unknown unknowns\" about yourself."
    },
    {
      icon: "📈",
      title: "Continuous Evolution",
      description: "Your AI coach learns and adapts, updating its understanding as you grow and change through life's journey."
    },
    {
      icon: "🛡️",
      title: "Private & Secure",
      description: "Your personal AI exists only for you. Complete privacy, with all the depth of understanding you'd expect from years of therapy."
    },
    {
      icon: "💎",
      title: "Unprecedented Quality",
      description: "This isn't ChatGPT with a nice interface. It's a professionally engineered system that represents the cutting edge of personalized AI."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 synai-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-6">
            How Synai Works
          </h2>
          <p className="text-xl md:text-2xl text-base-content/70 max-w-4xl mx-auto">
            A fusion of clinical expertise, advanced AI engineering, and your unique psychological fingerprint
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`text-center p-8 transition-transform duration-300 hover:-translate-y-2 synai-fade-in ${index < 3 ? 'synai-fade-in-delay-1' : index < 6 ? 'synai-fade-in-delay-2' : 'synai-fade-in-delay-3'}`}
            >
              {/* Feature Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-2xl mb-6 mx-auto">
                {feature.icon}
              </div>
              
              {/* Feature Title */}
              <h4 className="text-xl font-semibold text-base-content mb-4">
                {feature.title}
              </h4>
              
              {/* Feature Description */}
              <p className="text-base-content/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}