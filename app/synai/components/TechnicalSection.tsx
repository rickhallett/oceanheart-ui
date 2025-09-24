import TechnicalDeepDive from './TechnicalDeepDive';

export default function TechnicalSection() {
  return (
    <section className="py-24 bg-base-300 text-white">
      <div className="container mx-auto px-6 md:px-4">
        <div className="text-center mb-16 synai-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            How it's built
          </h2>
          <p className="text-lg md:text-2xl text-white/80 max-w-4xl mx-auto">
            A simple prompt architecture that keeps context stable and useful.
          </p>
        </div>

        <div className="max-w-4xl mx-auto synai-fade-in synai-fade-in-delay-1">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h4 className="text-center text-xl md:text-2xl font-semibold mb-8">
              Prompt at a glance
            </h4>

            <div className="font-mono text-xs md:text-base leading-relaxed space-y-3">
              <div className="bg-white/10 p-4 rounded-lg border-l-4 border-secondary">
                &lt;SYNAI_PERSONAL_COACH_SYSTEM&gt;
              </div>
              <div className="ml-6 bg-white/10 p-4 rounded-lg border-l-4 border-primary">
                &lt;ClientProfile&gt; goals, values, constraints &lt;/ClientProfile&gt;
              </div>
              <div className="ml-6 bg-white/10 p-4 rounded-lg border-l-4 border-primary">
                &lt;Framework&gt; ACT-informed principles &lt;/Framework&gt;
              </div>
              <div className="ml-6 bg-white/10 p-4 rounded-lg border-l-4 border-primary">
                &lt;Knowledge&gt; patterns and updates over time &lt;/Knowledge&gt;
              </div>
              <div className="ml-6 bg-white/10 p-4 rounded-lg border-l-4 border-primary">
                &lt;Guidance&gt; responses tied to profile &lt;/Guidance&gt;
              </div>
              <div className="bg-white/10 p-4 rounded-lg border-l-4 border-secondary">
                &lt;/SYNAI_PERSONAL_COACH_SYSTEM&gt;
              </div>
            </div>

            <p className="text-center mt-8 text-white/70 italic text-lg">
              Built for clarity and day-to-day reliability.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto synai-fade-in synai-fade-in-delay-2">
          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full opacity-70 animate-spin" style={{ animationDuration: '4s' }}></div>
              <div className="absolute inset-4 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full animate-ping" style={{ animationDuration: '2s' }}></div>
              <div className="absolute inset-6 bg-white rounded-full"></div>
              <div className="absolute inset-7 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full"></div>
            </div>
            <h5 className="text-xl font-semibold mb-3">Evidence-informed</h5>
            <p className="text-white/70">
              Uses established principles without overclaiming
            </p>
          </div>

          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full opacity-70 animate-spin" style={{ animationDuration: '6s' }}></div>
              <div className="absolute inset-4 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full animate-ping" style={{ animationDuration: '2.5s' }}></div>
              <div className="absolute inset-6 bg-white rounded-full"></div>
              <div className="absolute inset-7 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full"></div>
            </div>
            <h5 className="text-xl font-semibold mb-3">Simple engineering</h5>
            <p className="text-white/70">
              Small parts, predictable behavior, easy updates
            </p>
          </div>

          <div className="text-center">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full opacity-70 animate-spin" style={{ animationDuration: '5s' }}></div>
              <div className="absolute inset-4 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full animate-ping" style={{ animationDuration: '3s' }}></div>
              <div className="absolute inset-6 bg-white rounded-full"></div>
              <div className="absolute inset-7 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full"></div>
            </div>
            <h5 className="text-xl font-semibold mb-3">Useful outputs</h5>
            <p className="text-white/70">
              Focused on decisions and next steps, not theatrics
            </p>
          </div>
        </div>

        <TechnicalDeepDive />
      </div>
    </section>
  );
}