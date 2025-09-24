import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary to-secondary text-white text-center">
      <div className="container mx-auto px-6 md:px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
            Ready for AI that knows your context?
          </h2>

          <p className="text-lg md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto">
            Try guidance that's grounded in you—not a generic script.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="https://calendar.app.google/85ZdaqYK5vfNk4aH9"
              className="inline-block bg-white text-primary px-8 py-4 rounded-full text-base md:text-lg font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/20"
            >
              Book a discovery call
            </Link>

            <Link
              href="/about-alt"
              className="inline-block bg-transparent text-white px-8 py-4 border-2 border-white rounded-full text-base md:text-lg font-semibold transition-all duration-300 hover:bg-white hover:text-primary"
            >
              Learn about Kai
            </Link>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8 text-center opacity-80">
            <div>
              <div className="text-2xl md:text-3xl font-bold mb-2">Evidence-informed</div>
              <div className="text-xs md:text-sm">Clear, practical foundations</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold mb-2">Personal</div>
              <div className="text-xs md:text-sm">Tailored to your context</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-bold mb-2">Private</div>
              <div className="text-xs md:text-sm">Your own workspace</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}