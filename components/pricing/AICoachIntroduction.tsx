const AICoachIntroduction = () => {
  return (
    <div className="mb-16 rounded-2xl p-8 shadow-2xl bg-gradient-to-br from-primary to-secondary text-white relative overflow-hidden">
      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <h3 className="text-2xl md:text-3xl font-bold">
          Your Personal AI Coach Journey
        </h3>
        <p className="max-w-3xl text-lg text-white/95 leading-relaxed">
          Unlike generic AI that gives one-size-fits-all advice, your personal AI coach is built from your unique clinical assessment. 
          Each service includes comprehensive psychological profiling with Kai to create an AI coach that truly understands 
          your patterns, values, and goals.
        </p>
        <a 
          href="mailto:kai@oceanheart.ai?subject=Tell me more about AI Coaching"
          className="btn btn-white text-primary btn-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 font-bold border-2 border-white/20"
        >
          Learn More About AI Coaching
        </a>
      </div>
    </div>
  );
};

export default AICoachIntroduction;
