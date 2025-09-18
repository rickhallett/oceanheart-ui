"use client";

import React from 'react';
import Link from "next/link";
import { motion } from "motion/react";

const KnowledgeGapSimplified = () => {
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
      hours: "250",
      description: "250 free hours → one extra side-project shipped",
    },
    {
      title: "Year 2", 
      hours: "500",
      description: "That project is half-automated → two upgrades shipped",
    },
    {
      title: "Year 3",
      hours: "750",
      description: "Their velocity is a quarter ahead while you're treading water",
    },
  ];

  return (
    <section className="bg-base-200 py-20" id="gold-gap">
      <div className="max-w-7xl mx-auto px-8">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">
            What <span className="text-error">Unconscious</span> AI Integration is Really{" "}
            <span className="text-warning">Costing You</span>
          </h2>
          
          <h3 className="text-2xl lg:text-3xl font-semibold mb-4">
            Paper Maps ➜ Pocket GPS ➜ <span className="text-primary">Next?</span>
          </h3>
          
          <p className="text-lg text-base-content/70 max-w-3xl mx-auto">
            In 2005 you needed an A–Z and ten spare minutes to navigate London. Today one tap does the work.
            The <span className="font-semibold text-primary">next ten-minute tax</span> is hiding in your workflow—and AI can erase it.
          </p>
        </motion.div>

        {/* Task Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-16 max-w-4xl mx-auto"
        >
          <div className="bg-base-100 rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Time Saved by Early Adopters</h3>
            
            <div className="space-y-4">
              {taskComparisons.map((row) => (
                <div
                  key={row.task}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center p-4 rounded-lg bg-base-200/50"
                >
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
                    <span className="badge badge-primary badge-lg">{row.study}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-sm text-right text-base-content/60 mt-4">
              Source: Accenture, McKinsey & GitHub pilot studies 2024
            </p>
          </div>
        </motion.div>

        {/* 250-Hour Snowball */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-base-100 rounded-xl p-8 shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-secondary/10 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold">The 250-Hour Snowball</h3>
            </div>

            <p className="text-lg text-base-content/80 mb-8">
              Conservatively, those 5 saved hours each week add up to{" "}
              <span className="font-semibold text-secondary">≈250 hours a year</span>—a whole work-month. 
              Early adopters reinvest that dividend back into smarter systems, so the gap widens itself without extra effort.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {yearlyProgress.map((year, idx) => (
                <div
                  key={year.title}
                  className="bg-base-200/50 p-4 rounded-lg border-t-2 border-primary/30"
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="badge badge-primary">{year.title}</span>
                    <div className="text-right">
                      <p className="text-2xl font-bold">{year.hours}</p>
                      <p className="text-xs text-base-content/60">hours saved</p>
                    </div>
                  </div>
                  <p className="text-sm text-base-content/70">{year.description}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 border border-primary/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-xl font-bold mb-4">
                  Every week you delay costs you time that never returns
                </h3>
                <p className="text-base-content/80">
                  The tools to reclaim your time are here; the map just isn't labelled for{" "}
                  <em className="text-primary">your</em> specific terrain yet.
                </p>
              </div>
              
              <div className="text-center md:text-right">
                <div className="text-3xl font-bold text-primary mb-2">5 hrs/week</div>
                <div className="text-lg text-base-content/70 mb-4">260 hrs/year lost</div>
                <Link 
                  href="#pricing" 
                  className="btn btn-secondary"
                >
                  See Your Map Options
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default KnowledgeGapSimplified;