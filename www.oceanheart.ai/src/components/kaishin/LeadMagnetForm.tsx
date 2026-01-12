"use client";
import { useState } from "react";

export function LeadMagnetForm() {
  const [email, setEmail] = useState("");
  const [checked, setChecked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email capture logic

  };

  return (
    <section id="start" className="py-24 px-6 text-paper">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">
          <span className="text-gold">Begin Here:</span> The Integration Starter Kit
        </h2>
        <p className="text-lg font-light mb-12 opacity-90">
          Free resources to explore The Kaishin Method before you commit
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="font-sans font-medium mb-4 text-gold">What You&apos;ll Receive Instantly:</h3>
            <ul className="space-y-2 font-light opacity-90">
              <li className="flex items-start gap-2">
                <span className="text-gold flex-shrink-0">✓</span>
                <span>The Five Bodies Assessment (Interactive PDF)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold flex-shrink-0">✓</span>
                <span>The Three Pillars Introduction (20-page guide)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold flex-shrink-0">✓</span>
                <span>The Tanden Breathing Practice (10-min audio)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold flex-shrink-0">✓</span>
                <span>Circle 0 to Circle 1 Training (15-min video)</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans font-medium mb-4 text-gold">Plus 7-Week Email Series:</h3>
            <ul className="space-y-2 font-light opacity-90">
              <li><span className="text-gold">Week 1:</span> The Five Bodies explained</li>
              <li><span className="text-gold">Week 2:</span> The Three Pillars framework</li>
              <li><span className="text-gold">Week 3:</span> The Eight Circles roadmap</li>
              <li><span className="text-gold">Week 4:</span> Why integration matters</li>
              <li><span className="text-gold">Week 5:</span> The 30-Day Challenge intro</li>
              <li><span className="text-gold">Week 6:</span> The 90-Day Transformation</li>
              <li><span className="text-gold">Week 7:</span> Your next step</li>
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="relative mb-6">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full px-6 py-4 bg-black/30 backdrop-blur-sm text-zinc-100 border border-gold/30 focus:border-gold outline-none font-light rounded-xl text-lg transition-all duration-300 focus:ring-2 focus:ring-gold/20 placeholder:text-zinc-500"
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-gold/5 to-plum/5 rounded-xl blur-sm" />
          </div>

          <label className="flex items-center gap-3 mb-8 text-sm text-zinc-300 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                required
                className="appearance-none w-6 h-6 border-2 border-gold/40 rounded bg-black/30 checked:bg-gold checked:border-gold transition-all duration-300 cursor-pointer peer"
              />
              <svg
                className="absolute w-4 h-4 text-black pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="group-hover:text-gold transition-colors duration-300">
              I want to receive the Integration Starter Kit (unsubscribe anytime)
            </span>
          </label>

          <button
            type="submit"
            className="relative w-full bg-gold text-black px-8 py-4 font-sans font-semibold tracking-wide rounded-xl overflow-hidden group transition-all duration-300 hover:shadow-[0_0_30px_rgba(242,204,143,0.4)] text-lg"
          >
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">
              SEND ME THE STARTER KIT
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-gold via-plum/30 to-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0" />
          </button>
        </form>

        <p className="text-sm mt-8 text-zinc-400 font-light">
          No spam. Unsubscribe anytime. 2-3 emails per month after the series.
        </p>
      </div>
    </section>
  );
}
