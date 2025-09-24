"use client";

import Link from "next/link";

export default function SynaiHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        {/* Floating particles effect */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-2/3 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-1/4 right-1/5 w-2 h-2 bg-white rounded-full animate-pulse delay-300"></div>
      </div>

      {/* Floating animation container */}
      <div className="absolute inset-0 synai-float" style={{
        background: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='1' fill='white' opacity='0.1'/><circle cx='20' cy='20' r='0.5' fill='white' opacity='0.15'/><circle cx='80' cy='30' r='0.8' fill='white' opacity='0.12'/><circle cx='30' cy='80' r='0.6' fill='white' opacity='0.1'/></svg>")`
      }}>
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 md:px-4">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Meet Synai
        </h1>
        
        <p className="text-xl md:text-2xl lg:text-3xl font-medium mb-8 opacity-90">
          Your Personal AI Coach, Engineered for You
        </p>
        
        <p className="text-base md:text-xl lg:text-2xl mb-12 opacity-80 max-w-3xl mx-auto leading-relaxed">
          What if you had an AI that truly understood your unique patterns, values, and goals?
          Not generic advice, but deeply personalized guidance built from a clinical assessment of who you are.
        </p>
        
        <Link
          href="/#pricing"
          className="inline-block bg-white text-primary px-8 py-4 rounded-full text-base md:text-lg font-semibold transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/20"
        >
          Discover Your Personal AI
        </Link>
      </div>

      {/* Add floating animation keyframes */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(2deg);
          }
        }
      `}</style>
    </section>
  );
}