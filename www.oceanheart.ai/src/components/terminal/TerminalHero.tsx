"use client";

import { motion } from "framer-motion";
import { ASCIILogo } from "./ASCIILogo";
import Link from "next/link";

export function TerminalHero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative pt-20 sm:pt-24 md:pt-20 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 bg-terminal-bg">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(125, 207, 255, 0.5) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(125, 207, 255, 0.5) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Ambient glow - Terminal cyan */}
      <div className="absolute -top-10 sm:-top-20 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-[#7dcfff]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-56 sm:w-80 h-56 sm:h-80 bg-[#bb9af7]/10 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-left"
        >
          {/* ASCII Logo */}
          <div className="mb-8 overflow-hidden">
            <ASCIILogo animate={true} />
          </div>

          {/* Terminal-style title */}
          <div className="mb-6">
            <p className="font-terminal text-terminal-muted text-sm mb-2">
              <span className="text-terminal-green">$</span> whoami
            </p>
            <h1 className="font-terminal text-2xl sm:text-3xl md:text-4xl text-terminal-cyan mb-2">
              Kai Hallett
            </h1>
            <p className="font-terminal text-lg sm:text-xl md:text-2xl text-terminal-secondary">
              Software Engineer <span className="text-terminal-purple">&</span> Human Systems Architect
            </p>
          </div>

          {/* One-liner */}
          <div className="mb-8">
            <p className="font-terminal text-terminal-muted text-sm mb-2">
              <span className="text-terminal-green">$</span> cat mission.txt
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl text-terminal font-light leading-relaxed">
              I build AI systems that{" "}
              <span className="text-terminal-green">actually work</span> for humans.
            </p>
          </div>

          {/* Differentiator */}
          <div className="mb-10 p-4 sm:p-6 bg-terminal-bg-secondary border border-white/10 rounded-sm">
            <p className="font-terminal text-terminal-muted text-sm mb-4">
              <span className="text-terminal-green">$</span> cat credentials.md
            </p>
            <div className="space-y-2 text-terminal-secondary text-sm sm:text-base font-terminal">
              <p>
                <span className="text-terminal-purple">15 years</span> as a therapist taught me how humans actually behave.
              </p>
              <p>
                <span className="text-terminal-blue">5 years</span> as an engineer taught me how to build systems.
              </p>
              <p className="text-terminal-cyan pt-2 border-t border-white/10 mt-4">
                Now I build systems that account for real human behaviour.
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link
              href="/portfolio"
              className="inline-flex items-center justify-center px-6 py-3 font-terminal text-sm bg-transparent border border-terminal-cyan text-terminal-cyan hover:bg-terminal-cyan/10 hover:shadow-[0_0_20px_rgba(125,207,255,0.3)] transition-all duration-200 rounded-sm"
            >
              <span className="text-terminal-green mr-2">$</span> see my work
            </Link>
            <Link
              href="/consulting"
              className="inline-flex items-center justify-center px-6 py-3 font-terminal text-sm bg-transparent border border-terminal-purple text-terminal-purple hover:bg-terminal-purple/10 hover:shadow-[0_0_20px_rgba(187,154,247,0.3)] transition-all duration-200 rounded-sm"
            >
              <span className="text-terminal-green mr-2">$</span> hire me
            </Link>
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 font-terminal text-sm bg-transparent border border-white/20 text-terminal-secondary hover:border-white/40 hover:text-terminal transition-all duration-200 rounded-sm"
            >
              <span className="text-terminal-green mr-2">$</span> github
            </a>
          </div>

          {/* Currently building */}
          <div className="text-sm font-terminal text-terminal-muted">
            <span className="text-terminal-green">$</span> current_project
            <span className="ml-2 text-terminal-orange">&quot;Building AI-powered tools for therapists&quot;</span>
            <span className="cursor-blink text-terminal-cyan ml-1">_</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
