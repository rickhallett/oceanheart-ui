import React from 'react';
import type { JSX } from 'react';

// Helper component for steps
const Step = ({ emoji, text }: { emoji: string; text: string }) => (
  <div className="flex flex-col items-center text-center">
    <span className="text-3xl mb-2">{emoji}</span>
    <p className="font-semibold text-lg">{text}</p>
  </div>
);

// Helper component for arrows
const Arrow = ({ extraStyle }: { extraStyle?: string }): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={`w-6 h-6 shrink-0 text-primary ${extraStyle || ''}`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
    />
  </svg>
);

const Problem = () => {
  return (
    <section className="bg-neutral text-neutral-content">
      <div className="max-w-7xl mx-auto px-8 py-16 md:py-32 text-center">
        {/* UPDATED Headline */}
        <h2 className="max-w-3xl mx-auto font-extrabold text-4xl md:text-5xl tracking-tight mb-6 md:mb-12">
          We Need <span className="text-secondary underline">Big Heart</span> to Meet Big Tech
        </h2>

        {/* UPDATED Agitation Points */}
        <h2 className="max-w-xl mx-auto font-extrabold text-2xl tracking-tight mb-6 md:mb-12">
          Tired of simplistic, tech-first approaches that overlook the <span className="text-error">complexity of human connection</span>?
        </h2>

        <p className="max-w-xl mx-auto text-lg opacity-90 leading-relaxed mb-6 md:mb-16">
          The AI revolution offers immense possibilities, but most guidance focuses solely on technical implementation, ignoring the deeper ethical and relational implications for wellbeing professionals.
        </p>

        <p className="max-w-xl mx-auto text-lg opacity-90 leading-relaxed mb-6 md:mb-16">
          Without proper integration, these powerful tools risk undermining the very foundations of your practice—authenticity, presence, and the safe container you've worked so hard to create.
        </p>

        <p className="max-w-xl mx-auto text-lg opacity-90 leading-relaxed mb-6 md:mb-20">
          Finding guidance that truly spans both <span className="text-info">technological fluency</span> and <span className="text-success">depth of human understanding</span> is nearly impossible. Most "experts" only speak one language, leaving you to navigate the chasm alone.
        </p>

        {/* UPDATED Steps - reflecting the journey from confusion to integration */}
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-6">
          <Step emoji="🌊" text="Overwhelm & Confusion" />
          <Arrow extraStyle="max-md:-scale-x-100 md:-rotate-90" />
          <Step emoji="⚖️" text="Ethical Dilemmas" />
          <Arrow extraStyle="md:-scale-x-100 md:-rotate-90" />
          <Step emoji="🤖" text="Authenticity Concerns" />
          <Arrow extraStyle="max-md:-scale-x-100 md:-rotate-90" />
          <Step emoji="🧭" text="Need for Integration" />
        </div>
      </div>
    </section>
  );
};

export default Problem; 