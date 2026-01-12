"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import Link from "next/link";
import { Navigation, PageTransition } from "@/components/kaishin";
import { TerminalFooter } from "@/components/terminal";

const trials = [
  {
    level: "I",
    name: "INITIATE",
    subtitle: "The First Gate",
    cost: 90,
    hoursPerDay: 0.33,
    totalHours: 30,
    hoursPerWeek: 2.33,
    survivalRate: 100,
    dropoffRate: 0,
    difficulty: 1,
    bossEncounter: "The Mirror - Face yourself",
    rewards: ["Foundation Habits", "Self-Awareness +10", "Discipline +5"],
    warning: "Even the first step requires commitment",
  },
  {
    level: "II",
    name: "FOUNDATION",
    subtitle: "The Crucible Begins",
    cost: 180,
    hoursPerDay: 0.67,
    totalHours: 60,
    hoursPerWeek: 4.67,
    survivalRate: 85,
    dropoffRate: 15,
    difficulty: 2,
    bossEncounter: "The Comfortable Self - Leave comfort behind",
    rewards: ["Daily Ritual Mastery", "Resilience +15", "Focus +10"],
    warning: "Manageable, but only if you show up daily",
  },
  {
    level: "III",
    name: "PRACTITIONER",
    subtitle: "The Filter",
    cost: 360,
    hoursPerDay: 1,
    totalHours: 90,
    hoursPerWeek: 7,
    survivalRate: 60,
    dropoffRate: 40,
    difficulty: 3,
    bossEncounter: "The Casual Self - Kill the tourist in you",
    rewards: ["True Dedication Unlocked", "Willpower +25", "Integration +20"],
    warning: "Where casual learners die. Only practitioners survive.",
    checkpoint: true,
  },
  {
    level: "IV",
    name: "ADVANCED PRACTITIONER",
    subtitle: "The Abyss Gazes Back",
    cost: 720,
    hoursPerDay: 1.5,
    totalHours: 135,
    hoursPerWeek: 10.5,
    survivalRate: 35,
    dropoffRate: 65,
    difficulty: 5,
    bossEncounter: "The Shadow - Integrate your darkness",
    rewards: ["Shadow Work Complete", "Power +40", "Authenticity +30"],
    warning: "Significant drop-off. Your life will change.",
    locked: true,
  },
  {
    level: "V",
    name: "MASTER PRACTITIONER",
    subtitle: "The Narrow Path",
    cost: 1440,
    hoursPerDay: 2,
    totalHours: 180,
    hoursPerWeek: 14,
    survivalRate: 15,
    dropoffRate: 85,
    difficulty: 7,
    bossEncounter: "The Ego - Die before you die",
    rewards: ["Ego Death Achieved", "Mastery +60", "Presence +50"],
    warning: "Elite territory. Few dare, fewer finish.",
    locked: true,
  },
  {
    level: "VI",
    name: "MENTOR",
    subtitle: "The Return",
    cost: 2880,
    hoursPerDay: 2.5,
    totalHours: 225,
    hoursPerWeek: 17.5,
    survivalRate: 5,
    dropoffRate: 95,
    difficulty: 9,
    bossEncounter: "The Teacher - Give what you've gained",
    rewards: ["Guide Certification", "Wisdom +80", "Compassion +70"],
    warning: "Semi-professional commitment. Your old life is gone.",
    locked: true,
  },
  {
    level: "VII",
    name: "TEACHER",
    subtitle: "The Peak",
    cost: 5760,
    hoursPerDay: 3,
    totalHours: 270,
    hoursPerWeek: 21,
    survivalRate: 1.5,
    dropoffRate: 98.5,
    difficulty: 10,
    bossEncounter: "The Final Test - Embody the method",
    rewards: ["Complete Mastery", "ALL STATS MAXED", "Legacy Created"],
    warning: "1-2% completion rate. Are you the exception?",
    locked: true,
    final: true,
  },
];

const stats = [
  { name: "Total Life Hours Required", value: "1,260", color: "rust" },
  { name: "Total Days Committed", value: "630", color: "gold" },
  { name: "Overall Completion Rate", value: "1.5%", color: "rust" },
  { name: "Unlock Rate (Tier VII)", value: "0.015", color: "plum" },
];

export default function ProgramV7Page() {
  const [selectedTrial, setSelectedTrial] = useState<number | null>(null);
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  // Find highest tier user can achieve with their commitment
  const maxTierAchievable = trials.reduce((max, trial, idx) => {
    if (hoursPerWeek >= trial.hoursPerWeek) {
      return idx;
    }
    return max;
  }, -1);

  return (
    <PageTransition>
      <main ref={containerRef} className="relative bg-black antialiased">
        <Navigation />

        {/* Glitchy Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
          {/* Matrix-style background effect */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `repeating-linear-gradient(0deg, rgba(242,204,143,0.03) 0px, transparent 1px, transparent 2px, rgba(242,204,143,0.03) 3px)`,
            }} />
          </div>

          {/* Pulsing danger zones */}
          <motion.div
            animate={{
              opacity: [0.1, 0.2, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 left-10 w-96 h-96 bg-rust/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              opacity: [0.2, 0.3, 0.2],
              scale: [1.2, 1, 1.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-20 right-10 w-80 h-80 bg-gold/20 rounded-full blur-3xl"
          />

          <motion.div
            style={{ opacity, scale }}
            className="max-w-5xl mx-auto text-center relative z-10 px-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Warning Badge */}
              <div className="inline-block bg-rust/20 text-rust text-xs font-mono px-4 py-2 md:px-6 md:py-3 mb-6 md:mb-8 tracking-wider border border-rust/40">
                ⚠ WARNING: HIGH DIFFICULTY CONTENT
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-8xl font-mono font-bold text-zinc-100 mb-3 md:mb-4 leading-tight">
                THE <span className="text-rust animate-pulse">CRUCIBLE</span>
              </h1>

              <div className="font-mono text-gold mb-6 md:mb-8 text-sm md:text-xl tracking-wide md:tracking-widest">
                [ 7 TRIALS • 630 DAYS • 1,260 HOURS ]
              </div>

              <p className="text-base md:text-xl lg:text-2xl text-zinc-400 font-light leading-relaxed mb-8 md:mb-12 max-w-3xl mx-auto px-4">
                Not a program. A <span className="text-rust font-medium">gauntlet</span>.
                Not a course. A <span className="text-gold font-medium">transformation protocol</span>.
              </p>

              {/* Stats Display */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto mb-8 md:mb-12">
                {stats.map((stat, idx) => (
                  <motion.div
                    key={stat.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="bg-black/80 border border-white/10 p-3 md:p-4 backdrop-blur-sm font-mono"
                  >
                    <div className={`text-2xl md:text-3xl font-bold text-${stat.color} mb-1`}>
                      {stat.value}
                    </div>
                    <div className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-wide">
                      {stat.name}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="text-zinc-500 font-mono text-sm"
              >
                &gt; 98.5% will quit before completion
                <br />
                &gt; Are you the 1.5%?
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-600 font-mono text-xs"
          >
            ↓ SCROLL TO VIEW TRIALS ↓
          </motion.div>
        </section>

        {/* Reality Check Calculator - Show Maximum Achievable Tier */}
        <section className="py-12 md:py-20 px-4 md:px-6 bg-black relative border-t border-b border-rust/20">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-8 md:mb-12">
                <div className="inline-block bg-rust/10 text-rust text-xs font-mono px-4 py-2 mb-4 tracking-wider border border-rust/20">
                  COMMITMENT ANALYZER
                </div>
                <h2 className="text-2xl md:text-4xl font-mono font-bold text-zinc-100 mb-3 md:mb-4">
                  What Tier Can You Reach?
                </h2>
                <p className="text-sm md:text-base text-zinc-400 font-light px-4">
                  Based on your weekly commitment, see which tiers are achievable.
                </p>
              </div>

              <div className="bg-black/80 border-2 border-white/10 p-4 md:p-8 font-mono max-w-3xl mx-auto">
                <div className="mb-6 md:mb-8">
                  <label className="block text-zinc-300 mb-4 text-xs md:text-base text-center">
                    Hours per week you can REALISTICALLY commit:
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-gold"
                  />
                  <div className="text-3xl md:text-4xl text-gold font-bold mt-3 md:mt-4 text-center">
                    {hoursPerWeek} hrs/week
                  </div>
                </div>

                {/* Current Achievement Level - Fixed height to prevent jank */}
                <div className="mb-6 md:mb-8 text-center flex justify-center">
                  {maxTierAchievable >= 0 ? (
                    <div className={`inline-flex flex-col items-center justify-center px-4 py-3 md:px-6 md:py-4 border-2 min-h-[80px] md:min-h-[100px] ${maxTierAchievable >= 6 ? 'border-jade bg-jade/10 text-jade' :
                        maxTierAchievable >= 4 ? 'border-gold bg-gold/10 text-gold' :
                          maxTierAchievable >= 2 ? 'border-plum bg-plum/10 text-plum' :
                            'border-rust bg-rust/10 text-rust'
                      }`}>
                      <div className="text-[10px] md:text-xs mb-2">MAXIMUM TIER ACHIEVABLE</div>
                      <div className="text-xl md:text-3xl font-bold whitespace-nowrap">
                        {trials[maxTierAchievable].level} - {
                          trials[maxTierAchievable].name === "ADVANCED PRACTITIONER" ? "ADVANCED" :
                          trials[maxTierAchievable].name === "MASTER PRACTITIONER" ? "MASTER" :
                          trials[maxTierAchievable].name
                        }
                      </div>
                    </div>
                  ) : (
                    <div className="inline-flex flex-col items-center justify-center px-4 py-3 md:px-6 md:py-4 border-2 border-rust bg-rust/10 text-rust min-h-[80px] md:min-h-[100px]">
                      <div className="text-[10px] md:text-xs mb-2">INSUFFICIENT COMMITMENT</div>
                      <div className="text-base md:text-xl font-bold">
                        Minimum 2.33 hrs/week required
                      </div>
                    </div>
                  )}
                </div>

                {/* All Tier Requirements Table */}
                <div className="bg-zinc-900/30 border border-white/10 overflow-hidden">
                  <div className="border-b border-white/10 bg-zinc-900/50 px-4 py-3">
                    <div className="text-xs text-gold font-mono">ALL TIER REQUIREMENTS:</div>
                  </div>

                  <div className="divide-y divide-white/5">
                    {trials.map((trial, idx) => {
                      const isAchievable = hoursPerWeek >= trial.hoursPerWeek;

                      return (
                        <motion.div
                          key={trial.level}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          className={`flex items-center justify-between px-3 md:px-4 py-3 transition-colors gap-2 md:gap-4 min-h-[56px] ${isAchievable
                              ? 'bg-jade/5 hover:bg-jade/10'
                              : 'bg-rust/5 hover:bg-rust/10'
                            }`}
                        >
                          {/* Left: Tier info */}
                          <div className="flex items-center gap-2 md:gap-4 flex-1 min-w-0">
                            <div className={`w-8 h-8 md:w-10 md:h-10 border flex items-center justify-center font-mono text-sm md:text-lg flex-shrink-0 ${isAchievable
                                ? 'border-jade/40 text-jade'
                                : 'border-rust/40 text-rust'
                              }`}>
                              {trial.level}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs md:text-sm text-zinc-100 font-medium truncate">{trial.name}</div>
                              <div className="text-[10px] md:text-xs text-zinc-500 whitespace-nowrap">
                                {(trial.hoursPerDay * 60).toFixed(0)}min/day • {trial.hoursPerWeek.toFixed(1)}hrs/wk
                              </div>
                            </div>
                          </div>

                          {/* Right: Status - fixed width to prevent jank */}
                          <div className="flex-shrink-0 text-right w-16 md:w-20">
                            {isAchievable ? (
                              <span className="text-[10px] md:text-xs font-mono text-jade">✓ VIABLE</span>
                            ) : (
                              <span className="text-[10px] md:text-xs font-mono text-rust">✗ LOCKED</span>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Summary message */}
                <div className="mt-4 md:mt-6">
                  {maxTierAchievable >= 6 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-jade/10 border border-jade/30 p-3 md:p-4 text-jade text-xs md:text-sm"
                    >
                      ✓ ELITE COMMITMENT: At {hoursPerWeek} hrs/week, you can achieve ALL SEVEN TIERS including TEACHER.
                      Total journey: 630 days (21 months).
                    </motion.div>
                  ) : maxTierAchievable >= 2 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-gold/10 border border-gold/30 p-3 md:p-4 text-gold text-xs md:text-sm"
                    >
                      ✓ SOLID COMMITMENT: At {hoursPerWeek} hrs/week, you can reach {trials[maxTierAchievable].name}.
                      To unlock higher tiers, increase your weekly commitment.
                    </motion.div>
                  ) : maxTierAchievable >= 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-plum/10 border border-plum/30 p-3 md:p-4 text-plum text-xs md:text-sm"
                    >
                      ⚠ MINIMAL COMMITMENT: At {hoursPerWeek} hrs/week, you can only reach {trials[maxTierAchievable].name}.
                      Consider increasing your commitment to access deeper transformation.
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-rust/10 border border-rust/30 p-3 md:p-4 text-rust text-xs md:text-sm"
                    >
                      ✗ INSUFFICIENT: Minimum 2.33 hrs/week (20min/day) required to begin Tier I.
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* The Seven Trials */}
        <section id="trials" className="py-12 md:py-20 px-4 md:px-6 bg-black relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10 md:mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-block bg-gold/10 text-gold text-xs font-mono px-4 py-2 mb-4 tracking-wider border border-gold/20">
                  THE SEVEN TRIALS
                </div>
                <h2 className="text-3xl md:text-5xl font-mono font-bold text-zinc-100 mb-3 md:mb-4">
                  Each Trial: 90 Days
                </h2>
                <p className="text-sm md:text-base text-zinc-400 font-light max-w-2xl mx-auto px-4">
                  Progressive difficulty. Increasing time commitment. Brutal honesty about dropout rates.
                </p>
              </motion.div>
            </div>

            {/* Horizontal Bar Chart - Labels Left, Bars Right */}
            <div className="mb-12 md:mb-20 max-w-5xl mx-auto">
              <div className="space-y-2 md:space-y-3">
                {trials.map((trial, idx) => {
                  // Max bar width is 2/3 of container (66.67%)
                  const maxBarWidthPercent = 66.67;
                  const barWidthPercent = (trial.survivalRate / 100) * maxBarWidthPercent;

                  return (
                    <motion.div
                      key={trial.level}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-2 md:gap-6"
                    >
                      {/* Left: Label */}
                      <div className="w-32 md:w-48 flex items-center gap-2 md:gap-3">
                        <span className={`text-xl md:text-3xl font-mono font-bold ${trial.final ? 'text-rust' :
                            trial.checkpoint ? 'text-gold' :
                              'text-zinc-400'
                          }`}>
                          {trial.level}
                        </span>
                        <span className="text-xs md:text-sm font-mono text-zinc-100 whitespace-nowrap">
                          {trial.name}
                        </span>
                      </div>

                      {/* Right: Bar container (grows from right to left, 0% at far right) */}
                      <div className="flex-1 flex justify-end">
                        <div className="relative w-full h-12 md:h-16 flex items-center justify-end">
                          {/* Background track */}
                          <div className="absolute right-0 w-2/3 h-full border-r-2 border-zinc-800" />

                          {/* Bar (grows from right towards left) */}
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${barWidthPercent}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: idx * 0.1 + 0.2, ease: "easeOut" }}
                            className={`h-full border-2 ${trial.checkpoint ? 'border-gold/40 bg-gold/10' :
                                trial.final ? 'border-rust/40 bg-rust/10' :
                                  'border-white/20 bg-white/[0.05]'
                              } relative`}
                            style={{
                              maxWidth: '66.67%',
                            }}
                          >
                            {/* Percentage label inside bar (right-aligned) */}
                            <div className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2">
                              <span className={`text-xs md:text-sm font-mono font-bold ${trial.survivalRate < 20 ? 'text-rust' :
                                  trial.survivalRate < 50 ? 'text-gold' :
                                    'text-jade'
                                }`}>
                                {trial.survivalRate}%
                              </span>
                            </div>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-4 md:mt-6 flex justify-end pr-4 md:pr-8">
                <div className="flex items-center gap-4 md:gap-8 text-[10px] md:text-xs text-zinc-600 font-mono">
                  <span>← 100%</span>
                  <span className="text-zinc-700">0% →</span>
                </div>
              </div>

              <div className="text-center mt-4 md:mt-8 text-[10px] md:text-xs text-zinc-600 font-mono px-4">
                Survival rates at each stage • Bars grow from right (0%) to left (100%)
              </div>
            </div>

            {/* Trial Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {trials.map((trial, idx) => {
                const isLocked = idx >= 5; // Lock Mentor (VI) and Teacher (VII)

                return (
                  <motion.div
                    key={trial.level}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setSelectedTrial(idx)}
                    className={`relative cursor-pointer group ${isLocked ? 'opacity-60' : ''}`}
                  >
                    {/* Difficulty indicators - moved to z-20 */}
                    <div className="absolute -top-2 -right-2 z-20">
                      <div className="bg-black border border-rust/40 px-3 py-1 font-mono text-xs text-rust">
                        DIFF: {'★'.repeat(trial.difficulty)}
                      </div>
                    </div>

                    <div className={`bg-black/80 border-2 p-6 h-full transition-all ${trial.checkpoint ? 'border-gold/40 hover:border-gold' :
                        trial.final ? 'border-rust/40 hover:border-rust' :
                          'border-white/10 hover:border-white/30'
                      } ${isLocked ? 'relative overflow-hidden' : ''}`}>

                      {isLocked && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10">
                          <div className="text-center">
                            <div className="text-zinc-600 font-mono text-5xl mb-2">🔒</div>
                            <div className="text-zinc-500 font-mono text-xs">LOCKED</div>
                          </div>
                        </div>
                      )}

                      {/* Header */}
                      <div className="mb-4 pb-4 border-b border-white/10">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-12 h-12 border-2 flex items-center justify-center font-mono text-2xl ${trial.final ? 'border-rust text-rust' :
                              trial.checkpoint ? 'border-gold text-gold' :
                                'border-zinc-600 text-zinc-400'
                            }`}>
                            {trial.level}
                          </div>
                          <div>
                            <h3 className="text-xl font-mono font-bold text-zinc-100">
                              {isLocked ? trial.name.split('').map((c, i) => String.fromCharCode(c.charCodeAt(0) + (i % 2 ? 1 : -1))).join('') : trial.name}
                            </h3>
                            <p className="text-xs text-zinc-500">{isLocked ? '█'.repeat(trial.subtitle.length) : trial.subtitle}</p>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="space-y-2 mb-4 font-mono text-xs">
                        <div className="flex justify-between">
                          <span className="text-zinc-500">COST:</span>
                          <span className="text-zinc-100">{isLocked ? '£█████' : `£${trial.cost}`}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">TIME/DAY:</span>
                          <span className="text-zinc-100">{isLocked ? '███min' : `${(trial.hoursPerDay * 60).toFixed(0)}min`}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">HRS/WEEK:</span>
                          <span className="text-zinc-100">{isLocked ? '██.█' : trial.hoursPerWeek.toFixed(1)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">TOTAL:</span>
                          <span className="text-zinc-100">{isLocked ? '███hrs' : `${trial.totalHours}hrs`}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">DROPOUT:</span>
                          <span className={trial.dropoffRate > 50 ? 'text-rust' : 'text-jade'}>
                            {isLocked ? '██%' : `${trial.dropoffRate}%`}
                          </span>
                        </div>
                      </div>

                      {/* Boss Encounter */}
                      <div className="bg-zinc-900/50 border border-rust/20 p-3 mb-4">
                        <div className="text-xs text-rust font-mono mb-1">BOSS ENCOUNTER:</div>
                        <div className="text-sm text-zinc-300 font-light">
                          {isLocked ? '█'.repeat(20) : trial.bossEncounter}
                        </div>
                      </div>

                      {/* Rewards */}
                      <div className="mb-4">
                        <div className="text-xs text-gold font-mono mb-2">REWARDS:</div>
                        <div className="space-y-1">
                          {isLocked ? (
                            <>
                              <div className="text-xs text-zinc-400 font-mono">+ ████████████</div>
                              <div className="text-xs text-zinc-400 font-mono">+ ██████████</div>
                              <div className="text-xs text-zinc-400 font-mono">+ ███████████████</div>
                            </>
                          ) : (
                            trial.rewards.map((reward, ridx) => (
                              <div key={ridx} className="text-xs text-zinc-400 font-mono">
                                + {reward}
                              </div>
                            ))
                          )}
                        </div>
                      </div>

                      {/* Warning */}
                      <div className="text-xs text-zinc-500 italic border-t border-white/5 pt-3">
                        {isLocked ? '█'.repeat(40) : trial.warning}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Brutal Truth Section */}
        <section className="py-12 md:py-20 px-4 md:px-6 bg-black relative border-t border-rust/20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >

              <div className="mt-8 md:mt-12 bg-black/80 border-2 border-gold/30 p-4 md:p-8 font-mono">
                <p className="text-gold mb-3 md:mb-4 text-base md:text-lg">
                  &ldquo;Number go up. Lizard brain get excite.&rdquo;
                </p>
                <p className="text-zinc-400 text-xs md:text-sm font-light">
                  This is data-driven spiritual engineering. Every exercise recorded.
                  Every metric tracked. By the end, we find the optimal algorithm for YOU.
                </p>
                <p className="text-zinc-500 text-[10px] md:text-xs mt-3 md:mt-4 italic">
                  99% of systems fail because they over-simplify, over-promise, and under-deliver.
                  We do the opposite.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24 px-4 md:px-6 bg-black relative border-t border-gold/20">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-mono font-bold text-zinc-100 mb-4 md:mb-6">
                Last Chance to <span className="text-rust">Turn Back</span>
              </h2>
              <p className="text-sm md:text-base text-zinc-400 font-light mb-8 md:mb-12 max-w-2xl mx-auto px-4">
                Once you start, there&apos;s no shortcut. No hack. No cheat code.
                Just you, the work, and 630 days of transformation.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
                <motion.a
                  href="/app"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 md:px-8 md:py-4 bg-rust text-zinc-100 border-2 border-rust hover:bg-rust/90 hover:shadow-[0_0_30px_rgba(212,106,93,0.6)] transition-all duration-300 font-mono font-bold text-base md:text-lg"
                >
                  ENTER THE CRUCIBLE
                </motion.a>
                <motion.a
                  href="/program"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 md:px-8 md:py-4 bg-black text-zinc-400 border-2 border-zinc-700 hover:border-zinc-500 hover:text-zinc-100 transition-all duration-300 font-mono text-base md:text-lg"
                >
                  View Standard Path
                </motion.a>
              </div>

              <div className="mt-8 md:mt-12 text-zinc-600 font-mono text-xs">
                &gt; You&apos;ve been warned.
              </div>
            </motion.div>
          </div>
        </section>

        <TerminalFooter />
      </main>
    </PageTransition>
  );
}
