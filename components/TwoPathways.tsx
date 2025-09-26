"use client";

import Link from "next/link";

const TwoPathways = () => {
  return (
    <section className="max-w-7xl mx-auto px-8 py-16 lg:py-20">
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Therapy & Coaching Card */}
        <div className="card bg-base-200 border border-base-300 hover:border-blue-400/30 transition-all duration-300">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Therapy & Coaching</h2>
            <p className="text-base-content/80 mb-6">
              Personal sessions for clarity, emotional resilience and life direction.
            </p>
            <div className="card-actions justify-start">
              <a
                href="https://awake.oceanheart.ai"
                className="btn btn-secondary btn-sm"
              >
                → Explore Sessions
              </a>
            </div>
          </div>
        </div>

        {/* AI Strategy & Solutions Card */}
        <div className="card bg-base-200 border border-base-300 hover:border-blue-400/30 transition-all duration-300">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">AI Strategy & Solutions</h2>
            <p className="text-base-content/80 mb-6">
              Workshops and enablement to help teams adopt AI safely and effectively.
            </p>
            <div className="card-actions justify-start">
              <Link
                href="/consulting"
                className="btn btn-primary btn-sm"
              >
                → Explore AI Strategy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoPathways;