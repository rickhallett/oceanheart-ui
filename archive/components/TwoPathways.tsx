"use client";

import Link from "next/link";

const TwoPathways = () => {
  return (
    <section className="max-w-7xl mx-auto px-8 py-16 lg:py-20">
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Therapy & Coaching Card - Secondary */}
        <div className="group relative card bg-base-200/30 backdrop-blur-sm border border-white/10 hover:border-secondary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-secondary/20">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="card-body relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="card-title text-2xl">Therapy & Coaching</h2>
            </div>
            <p className="text-base-content/80 mb-6">
              Personal sessions for clarity, emotional resilience and life direction.
            </p>
            <div className="card-actions justify-start">
              <a
                href="https://awake.oceanheart.ai"
                className="btn btn-outline btn-secondary hover:shadow-lg hover:shadow-secondary/30 transition-all duration-300"
              >
                <span>Explore Sessions</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* AI Strategy & Solutions Card - Primary */}
        <div className="group relative card bg-base-200/30 backdrop-blur-sm border border-white/10 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-blue-400/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300"></div>
          <div className="card-body relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="card-title text-2xl">AI Strategy & Solutions</h2>
            </div>
            <p className="text-base-content/80 mb-6">
              Workshops and enablement to help teams adopt AI safely and effectively.
            </p>
            <div className="card-actions justify-start">
              <Link
                href="/consulting"
                className="btn btn-primary hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
              >
                <span>Explore AI Strategy</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoPathways;