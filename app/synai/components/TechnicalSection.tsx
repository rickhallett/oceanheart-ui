export default function TechnicalSection() {
  return (
    <section className="py-24 bg-base-300 text-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 synai-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            The Engineering Behind the Magic
          </h2>
          <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto">
            For those who appreciate technical excellence: this is prompt engineering at its finest
          </p>
        </div>

        {/* Technical Visualization */}
        <div className="max-w-4xl mx-auto synai-fade-in synai-fade-in-delay-1">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h4 className="text-center text-2xl font-semibold mb-8">
              Simplified Prompt Architecture
            </h4>
            
            {/* XML Structure Display */}
            <div className="font-mono text-sm md:text-base leading-relaxed space-y-3">
              {/* Root Element */}
              <div className="bg-white/10 p-4 rounded-lg border-l-4 border-secondary">
                &lt;SYNAI_PERSONAL_COACH_SYSTEM&gt;
              </div>
              
              {/* Nested Elements */}
              <div className="ml-6 bg-white/10 p-4 rounded-lg border-l-4 border-primary">
                &lt;ClientIdentity&gt; Your unique psychological profile &lt;/ClientIdentity&gt;
              </div>
              
              <div className="ml-6 bg-white/10 p-4 rounded-lg border-l-4 border-primary">
                &lt;CoreFramework&gt; ACT-based therapeutic approach &lt;/CoreFramework&gt;
              </div>
              
              <div className="ml-6 bg-white/10 p-4 rounded-lg border-l-4 border-primary">
                &lt;KnowledgeGraph&gt; Living map of your patterns and goals &lt;/KnowledgeGraph&gt;
              </div>
              
              <div className="ml-6 bg-white/10 p-4 rounded-lg border-l-4 border-primary">
                &lt;AdaptiveLearning&gt; Continuous integration of new insights &lt;/AdaptiveLearning&gt;
              </div>
              
              <div className="ml-6 bg-white/10 p-4 rounded-lg border-l-4 border-primary">
                &lt;PersonalizedGuidance&gt; Tailored responses to your context &lt;/PersonalizedGuidance&gt;
              </div>
              
              {/* Closing Root Element */}
              <div className="bg-white/10 p-4 rounded-lg border-l-4 border-secondary">
                &lt;/SYNAI_PERSONAL_COACH_SYSTEM&gt;
              </div>
            </div>
            
            {/* Technical Note */}
            <p className="text-center mt-8 text-white/70 italic text-lg">
              This represents months of R&D, clinical expertise, and advanced AI engineering—all focused on understanding you.
            </p>
          </div>
        </div>

        {/* Additional Technical Details */}
        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto synai-fade-in synai-fade-in-delay-2">
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full opacity-70 animate-spin" style={{animationDuration: '4s'}}></div>
              <div className="absolute inset-4 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full animate-ping" style={{animationDuration: '2s'}}></div>
              <div className="absolute inset-6 bg-white rounded-full"></div>
              <div className="absolute inset-7 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full"></div>
            </div>
            <h5 className="text-xl font-semibold mb-3">Research-Based</h5>
            <p className="text-white/70">
              Built on established therapeutic frameworks and clinical psychology principles
            </p>
          </div>
          
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full opacity-70 animate-spin" style={{animationDuration: '6s'}}></div>
              <div className="absolute inset-4 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full animate-ping" style={{animationDuration: '2.5s'}}></div>
              <div className="absolute inset-6 bg-white rounded-full"></div>
              <div className="absolute inset-7 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full"></div>
            </div>
            <h5 className="text-xl font-semibold mb-3">Advanced Engineering</h5>
            <p className="text-white/70">
              Sophisticated prompt architecture that evolves with your growth and insights
            </p>
          </div>
          
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full opacity-70 animate-spin" style={{animationDuration: '5s'}}></div>
              <div className="absolute inset-4 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full animate-ping" style={{animationDuration: '3s'}}></div>
              <div className="absolute inset-6 bg-white rounded-full"></div>
              <div className="absolute inset-7 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full"></div>
            </div>
            <h5 className="text-xl font-semibold mb-3">Precision Targeting</h5>
            <p className="text-white/70">
              Every response calibrated to your specific psychological patterns and goals
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}