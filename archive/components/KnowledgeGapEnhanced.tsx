"use client";

import React from 'react';
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { MovingBorder } from "@/components/ui/moving-border";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { useRef } from "react";

const KnowledgeGapEnhanced = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const taskComparisons = [
    { 
      task: "Re-draft customer email", 
      old: 25, 
      now: 15, 
      study: "~55% faster",
      icon: "✉️"
    },
    { 
      task: "Find decisions in Slack", 
      old: 20, 
      now: 3, 
      study: "30-40% reading saved",
      icon: "💬"
    },
    { 
      task: "Boilerplate coding", 
      old: 45, 
      now: 20, 
      study: "55% faster",
      icon: "💻"
    },
  ];

  const yearlyProgress = [
    {
      title: "Year 1",
      description: "250 free hours → one extra side-project shipped",
      color: "from-primary/20 to-primary/5",
      hours: "250",
      projects: "1",
    },
    {
      title: "Year 2", 
      description: "That project is half-automated → two upgrades shipped",
      color: "from-secondary/20 to-secondary/5",
      hours: "500",
      projects: "3",
    },
    {
      title: "Year 3",
      description: "Their velocity is a quarter ahead while you're treading water",
      color: "from-accent/20 to-accent/5",
      hours: "750",
      projects: "5+",
    },
  ];

  const costMetrics = [
    { label: "Hours Lost Weekly", value: "5", suffix: "hrs" },
    { label: "Hours Lost Yearly", value: "260", suffix: "hrs" },
    { label: "Work Weeks Lost", value: "6.5", suffix: "wks" },
    { label: "Value Lost", value: "£13k", suffix: "+" },
  ];

  return (
    <section 
      ref={containerRef}
      className="bg-base-200 overflow-hidden px-0 md:px-24 py-24 relative" 
      id="gold-gap"
    >
      <div className="px-8 max-w-7xl mx-auto">
        {/* Animated Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl lg:text-6xl font-bold mb-12 tracking-tight">
            What <span className="text-error">Unconscious</span> AI Integration is Really{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Costing You</span>
          </h2>
          
          <TextGenerateEffect
            words="Paper Maps ➜ Pocket GPS ➜ Next?"
            className="text-3xl lg:text-5xl font-bold mb-6 tracking-tight"
            duration={0.5}
          />
          
          <p className="text-lg lg:text-xl text-base-content/80 max-w-3xl mx-auto">
            In 2005 you needed an A–Z and ten spare minutes to navigate London. Today one tap does the work.
            The <span className="font-semibold text-primary">next ten-minute tax</span> is hiding in your workflow—and AI can erase it.
          </p>
        </motion.div>

        {/* Task Comparison with Moving Borders */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20 max-w-4xl mx-auto"
        >
          <BackgroundGradient className="rounded-xl p-8 bg-secondary/5">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-6 text-center">Time Saved by Early Adopters</h3>
              {taskComparisons.map((row, idx) => (
                <motion.div
                  key={row.task}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-base-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{row.icon}</span>
                      <span className="font-medium">{row.task}</span>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-base-content/60">Yesterday</p>
                      <p className="text-xl font-bold text-error">{row.old} min</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-base-content/60">Now</p>
                      <p className="text-xl font-bold text-success">{row.now} min</p>
                    </div>
                    <div className="text-center">
                      <MovingBorder duration={3000} className="px-3 py-1">
                        <span className="font-semibold text-primary">{row.study}</span>
                      </MovingBorder>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-sm text-right text-base-content/60 mt-4">
              Source: Accenture, McKinsey & GitHub pilot studies 2024
            </p>
          </BackgroundGradient>
        </motion.div>

        {/* 250-Hour Snowball with Animated Cards */}
        <motion.div
          style={{ y, opacity }}
          className="max-w-4xl mx-auto mb-16"
        >
          <BackgroundGradient className="rounded-xl p-8 bg-base-100">
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="bg-secondary/10 p-3 rounded-full"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>
              <h3 className="text-2xl font-bold">The 250-Hour Snowball</h3>
            </div>

            <div className="pl-4 border-l-2 border-secondary/30">
              <p className="text-lg text-base-content/80">
                Conservatively, those 5 saved hours each week add up to{" "}
                <motion.span
                  initial={{ scale: 1 }}
                  whileInView={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  className="font-semibold text-secondary-focus inline-block"
                >
                  ≈250 hours a year
                </motion.span>
                —a whole work-month. Early adopters reinvest that dividend back into smarter systems, so the gap widens itself without extra effort.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {yearlyProgress.map((year, idx) => (
                <motion.div
                  key={year.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className={`bg-gradient-to-br ${year.color} p-4 rounded-lg border-t-2 ${
                    idx === 0 ? 'border-primary/30' : idx === 1 ? 'border-secondary/30' : 'border-accent/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`bg-${idx === 0 ? 'primary' : idx === 1 ? 'secondary' : 'accent'}/10 text-${idx === 0 ? 'primary' : idx === 1 ? 'secondary-focus' : 'accent-focus'} px-2 py-1 rounded text-sm font-bold`}>
                      {year.title}
                    </span>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{year.hours}</p>
                      <p className="text-xs text-base-content/60">hours saved</p>
                    </div>
                  </div>
                  <p className="text-base-content/80 text-sm">{year.description}</p>
                </motion.div>
              ))}
            </div>
          </BackgroundGradient>
        </motion.div>

        {/* Warning + CTA with Animated Numbers */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <BackgroundGradient className="rounded-xl bg-base-100 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-5 bg-gradient-to-br from-primary to-primary-focus p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {costMetrics.map((metric, idx) => (
                      <motion.div
                        key={metric.label}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ 
                          duration: 0.5, 
                          delay: idx * 0.1,
                          type: "spring"
                        }}
                        viewport={{ once: true }}
                        className="text-primary-content"
                      >
                        <p className="text-3xl font-bold">
                          {metric.value}
                          <span className="text-sm">{metric.suffix}</span>
                        </p>
                        <p className="text-xs opacity-80">{metric.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-xl font-bold mb-4">
                  Every week you delay costs you time that never returns
                </h3>
                <p className="text-base-content/80 mb-6">
                  The tools to reclaim your time are here; the map just isn't labelled for{" "}
                  <em className="text-primary">your</em> specific terrain yet.
                  Let me create your custom integration map.
                </p>
                <Link 
                  href="#pricing" 
                  className="btn btn-secondary shadow-md hover:shadow-lg transition-all group"
                >
                  See Your Map Options
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </BackgroundGradient>
        </motion.div>
      </div>
    </section>
  );
};

export default KnowledgeGapEnhanced;