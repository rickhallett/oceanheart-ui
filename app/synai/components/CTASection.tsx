import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary to-secondary text-white text-center">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Ready for AI That Actually Knows You?
          </h2>

          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto">
            Stop settling for generic advice. Experience what&apos;s possible when AI meets deep human understanding.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {/* Primary CTA */}
            <Link
              href="https://calendar.app.google/85ZdaqYK5vfNk4aH9"
              className="inline-block bg-white text-primary px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/20"
            >
              Book Your Discovery Call
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/about-alt"
              className="inline-block bg-transparent text-white px-8 py-4 border-2 border-white rounded-full text-lg font-semibold transition-all duration-300 hover:bg-white hover:text-primary"
            >
              Learn About Kai
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 text-center opacity-80">
            <div>
              <div className="text-3xl font-bold mb-2">Clinical</div>
              <div className="text-sm">Evidence-based assessment</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">Personal</div>
              <div className="text-sm">Tailored to your psychology</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">Contained</div>
              <div className="text-sm">Your exclusive AI container</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}