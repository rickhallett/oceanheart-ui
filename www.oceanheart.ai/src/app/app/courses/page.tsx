"use client";
import { useState } from "react";
import { IconClock, IconUsers, IconStar, IconCheck } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { PillarIcon } from "@/components/kaishin/PillarIcon";

type Pillar = "view" | "compass" | "ground";

interface Course {
    id: string;
    title: string;
    tagline: string;
    pillars: Pillar[];
    duration: string;
    format: string;
    price: string;
    priceOptions?: string;
    tier: 1 | 2 | 3 | 4 | "community";
    featured?: boolean;
    flagship?: boolean;
    imageGradient: string;
    highlights: string[];
    outcomes: string[];
    prerequisites?: string | string[];
    cta: string;
    targetAudience?: string;
    circleGoal?: { from: number; to: number };
}

const COURSES: Course[] = [
    // TIER 1
    {
        id: "30-day-challenge",
        title: "The 30-Day Integration Challenge",
        tagline: "Build Your Unshakable Daily Practice in Just 15 Minutes a Day",
        pillars: ["view", "compass", "ground"],
        duration: "30 days",
        format: "Daily emails + audio practices",
        price: "£47",
        tier: 1,
        featured: true,
        imageGradient: "linear-gradient(135deg, var(--gold) 0%, var(--jade) 100%)",
        highlights: [
            "Days 1-10: The Ground (Somatic foundation)",
            "Days 11-20: The Compass (Psychological clarity)",
            "Days 21-30: The View (Spiritual recognition)",
            "Achieve Circle 1 mastery across all three pillars"
        ],
        outcomes: [
            "Build consistent daily practice",
            "Experience the power of integration",
            "Perfect preparation for 90-Day Transformation"
        ],
        cta: "Start Your 30-Day Challenge",
        circleGoal: { from: 0, to: 1 }
    },
    // TIER 2 - FLAGSHIP
    {
        id: "90-day-transformation",
        title: "The 90-Day Transformation",
        tagline: "From Overwhelm to Embodied Peace: The Flagship Immersion",
        pillars: ["view", "compass", "ground"],
        duration: "90 days (12 weeks)",
        format: "Self-paced + Live calls",
        price: "£497",
        priceOptions: "3 payments of £177",
        tier: 2,
        flagship: true,
        imageGradient: "linear-gradient(135deg, var(--plum) 0%, var(--gold) 100%)",
        highlights: [
            "Month 1: Master The Ground (Circle 1)",
            "Month 2: Master The Compass (Circle 2)",
            "Month 3: Master The View (Circle 3)",
            "12 video modules + 90 daily practices",
            "Bi-weekly live calls with Kaishin",
            "Private community + lifetime access"
        ],
        outcomes: [
            "Regulated nervous system as baseline",
            "Values-aligned decision making",
            "Stable recognition of awareness",
            "Circle 1 → Circle 3 mastery"
        ],
        prerequisites: "30-Day Challenge recommended (not required)",
        cta: "Begin Your 90-Day Transformation",
        circleGoal: { from: 1, to: 3 }
    },
    // TIER 2 - AI COURSE
    {
        id: "ai-human-edge",
        title: "AI & The Human Edge",
        tagline: "Thrive in the Age of AI by Mastering the Irreplaceable Human Capacities",
        pillars: ["view", "compass", "ground"],
        duration: "6 weeks",
        format: "Hybrid (self-paced + 2 live calls)",
        price: "£297",
        tier: 2,
        imageGradient: "linear-gradient(135deg, var(--gold) 0%, var(--plum) 100%)",
        highlights: [
            "Understanding AI: Clarity over anxiety",
            "The View in the tech age",
            "The Compass for AI collaboration",
            "The Ground of conscious integration",
            "6 modules + AI tools handbook",
            "2 live Q&A sessions"
        ],
        outcomes: [
            "Technical AI literacy",
            "Presence under technological pressure",
            "Conscious AI workflow integration",
            "Irreplaceable human capacities developed"
        ],
        cta: "Master AI & The Human Edge"
    },
    // TIER 2 - DEEPENING COURSES
    {
        id: "view-intensive",
        title: "The View Intensive: Awakening to What You Are",
        tagline: "21-Day Direct Recognition of Non-Dual Awareness",
        pillars: ["view"],
        duration: "21 days",
        format: "Intensive cohort",
        price: "£497",
        tier: 2,
        imageGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        highlights: [
            "Week 1: Deconstructing the seeker",
            "Week 2: Direct recognition",
            "Week 3: Living from awakening",
            "Daily practices + weekly live sessions",
            "Limited to 20 participants"
        ],
        outcomes: [
            "Stable recognition of awareness",
            "Circle 4-5 mastery in The View",
            "Direct transmission experience"
        ],
        prerequisites: "90-Day Transformation (required)",
        cta: "Join The View Intensive",
        circleGoal: { from: 3, to: 5 }
    },
    {
        id: "compass-mastery",
        title: "The Compass Mastery: ACT for Real Life",
        tagline: "Master Acceptance & Commitment Therapy",
        pillars: ["compass"],
        duration: "8 weeks",
        format: "Applied learning cohort",
        price: "£497",
        tier: 2,
        imageGradient: "linear-gradient(135deg, var(--jade) 0%, var(--gold) 100%)",
        highlights: [
            "All 6 ACT core processes",
            "20+ defusion techniques",
            "Deep values work",
            "Weekly practice sessions",
            "Therapist toolkit included"
        ],
        outcomes: [
            "Psychological flexibility mastery",
            "Circle 4-5 mastery in The Compass",
            "Professional application skills"
        ],
        prerequisites: "90-Day Transformation (required)",
        cta: "Master The Compass",
        circleGoal: { from: 3, to: 5 }
    },
    {
        id: "ground-awakening",
        title: "The Ground Awakening: Somatic Mastery",
        tagline: "Heal Your Nervous System, Reclaim Your Body",
        pillars: ["ground"],
        duration: "12 weeks",
        format: "Slow & steady cohort",
        price: "£597",
        tier: 2,
        imageGradient: "linear-gradient(135deg, #a8714a 0%, var(--jade) 100%)",
        highlights: [
            "Phase 1: Foundation (Weeks 1-4)",
            "Phase 2: Release (Weeks 5-8)",
            "Phase 3: Integration (Weeks 9-12)",
            "50+ somatic practices",
            "Trauma-informed approach",
            "1-on-1 check-ins included"
        ],
        outcomes: [
            "Deep nervous system healing",
            "Circle 4-5 mastery in The Ground",
            "Embodied wisdom integration"
        ],
        prerequisites: "90-Day Transformation (required)",
        cta: "Awaken The Ground",
        circleGoal: { from: 3, to: 5 }
    },
    // TIER 3 - APPLIED
    {
        id: "integrated-leadership",
        title: "Integrated Leadership",
        tagline: "Lead with Presence, Navigate with Wisdom, Ground in Values",
        pillars: ["view", "compass", "ground"],
        duration: "8 weeks",
        format: "Cohort-based",
        price: "£997",
        tier: 3,
        imageGradient: "linear-gradient(135deg, var(--gold) 0%, var(--plum) 100%)",
        highlights: [
            "The awakened leader",
            "Embodied authority",
            "Team dynamics & culture",
            "Navigating complexity",
            "Sustainability without burnout",
            "Peer cohort (6-8 leaders)"
        ],
        outcomes: [
            "Presence-based leadership",
            "Values-driven organizations",
            "Sustainable pace mastery"
        ],
        targetAudience: "Executives, managers, entrepreneurs",
        cta: "Lead with Integration"
    },
    {
        id: "integrated-relationships",
        title: "Integrated Relationships",
        tagline: "Bring The Method into Your Intimate Relationships",
        pillars: ["view", "compass", "ground"],
        duration: "6 weeks",
        format: "Individual or couple",
        price: "£197 / £297",
        priceOptions: "Individual / Couple",
        tier: 3,
        imageGradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        highlights: [
            "The View of relationship",
            "The Compass in communication",
            "The Ground in connection",
            "Working with conflict",
            "Desire and devotion",
            "Partner practice library"
        ],
        outcomes: [
            "Deeper intimacy and autonomy",
            "Conscious communication",
            "Co-regulation skills"
        ],
        cta: "Transform Your Relationship"
    },
    // TIER 4 - CERTIFICATION
    {
        id: "certified-practitioner",
        title: "The Kaishin Method Certified Practitioner",
        tagline: "Become Certified to Guide Others Using the View, Compass, and Ground Framework",
        pillars: ["view", "compass", "ground"],
        duration: "6 months",
        format: "Intensive cohort training",
        price: "£5,997",
        tier: 4,
        featured: true,
        imageGradient: "linear-gradient(135deg, var(--gold) 0%, var(--gold) 100%)",
        highlights: [
            "Phase 1: Deep personal practice (Circle 5-6 development)",
            "Phase 2: Pedagogy & teaching skills",
            "Phase 3: Supervised practice",
            "60 hours of training",
            "License to teach 30-Day Challenge",
            "Ongoing mentorship & community",
            "Annual recertification pathway"
        ],
        outcomes: [
            "Circle 6 mastery (Subtle Mastery)",
            "Certified to teach framework",
            "Join teaching lineage",
            "Generate passive licensing revenue"
        ],
        prerequisites: [
            "90-Day Transformation + 2 Deepening Courses",
            "6+ months personal practice",
            "Application & interview required"
        ],
        cta: "Apply for Certification",
        circleGoal: { from: 5, to: 6 }
    }
];

function CourseCard({ course }: { course: Course }) {
    const [isHovered, setIsHovered] = useState(false);
    const isPremium = course.tier === 4 || course.flagship;

    return (
        <div
            className={`relative p-[1px] overflow-hidden group ${isPremium ? "lg:col-span-2" : ""
                }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Animated border glow */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        layoutId={`course-hover-${course.id}`}
                        className="absolute inset-0 bg-gradient-to-r from-gold/50 via-jade/50 to-gold/50 blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />
                )}
            </AnimatePresence>

            {/* Main card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative bg-black border border-white/[0.2] overflow-hidden h-full backdrop-blur-xl flex flex-col"
            >
                {/* Badge */}
                {(course.featured || course.flagship) && (
                    <div className={`absolute top-3 sm:top-4 right-3 sm:right-4 z-20 px-2 sm:px-4 py-1.5 sm:py-2 border border-white/[0.2] text-[10px] sm:text-xs font-medium tracking-wide backdrop-blur-md max-w-[45%] sm:max-w-none text-center leading-tight ${course.featured && course.tier === 1
                            ? "bg-gold/20 text-gold"
                            : "bg-gold/20 text-gold"
                        }`}>
                        {course.featured && course.tier === 1 ? (
                            <>
                                <span className="hidden sm:inline">RECOMMENDED START HERE</span>
                                <span className="sm:hidden">START HERE</span>
                            </>
                        ) : (
                            <span>FLAGSHIP</span>
                        )}
                    </div>
                )}

                {/* Course Image Header */}
                <div className="h-40 relative overflow-hidden flex-shrink-0">
                    <img
                        src={`/images/courses/${course.id}.png`}
                        alt={course.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black" />

                    {/* Animated gradient overlay */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/0"
                        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    />

                    {/* Radial glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/20 rounded-full blur-3xl" />
                    </div>
                </div>

                {/* Content */}
                <div className="relative p-4 sm:p-6 lg:p-8 bg-black/40 backdrop-blur-sm border-t border-white/[0.1] flex flex-col flex-1">
                    {/* Pillars */}
                    <motion.div
                        className="flex gap-2 sm:gap-3 mb-3 sm:mb-4"
                        animate={isHovered ? { x: 4 } : { x: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        {course.pillars.map((pillar) => (
                            <PillarIcon key={pillar} pillar={pillar} size={24} />
                        ))}
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-serif font-normal text-zinc-100 mb-2">{course.title}</h3>
                    <p className="text-sm sm:text-base text-zinc-400 font-sans mb-4 sm:mb-6">{course.tagline}</p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-zinc-400 mb-4 sm:mb-6">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <IconClock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold/70" />
                            <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <IconUsers className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold/70" />
                            <span>{course.format}</span>
                        </div>
                    </div>

                    {/* Circle Progress */}
                    {course.circleGoal && (
                        <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                            <div className="flex items-center gap-1 sm:gap-1.5 justify-center sm:justify-start">
                                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((circle) => {
                                    const isStarting = circle === course.circleGoal?.from;
                                    const isTarget = circle === course.circleGoal?.to;
                                    const isInRange = course.circleGoal && circle >= course.circleGoal.from && circle <= course.circleGoal.to;

                                    return (
                                        <motion.div
                                            key={circle}
                                            whileHover={{ scale: 1.1 }}
                                            className={`flex items-center justify-center font-medium text-[10px] sm:text-xs rounded-full transition-all duration-300 ${isTarget
                                                    ? 'w-6 h-6 sm:w-8 sm:h-8 bg-gold text-white shadow-[0_0_20px_rgba(212,165,116,0.5)]'
                                                    : isStarting
                                                        ? 'w-5 h-5 sm:w-7 sm:h-7 bg-gold/70 text-white shadow-[0_0_12px_rgba(212,165,116,0.3)]'
                                                        : isInRange
                                                            ? 'w-4 h-4 sm:w-6 sm:h-6 bg-gold/30 text-gold'
                                                            : 'w-4 h-4 sm:w-6 sm:h-6 bg-white/[0.05] text-zinc-600 border border-white/[0.05]'
                                                }`}
                                        >
                                            {circle}
                                        </motion.div>
                                    );
                                })}
                            </div>
                            <p className="text-[10px] sm:text-xs text-zinc-500 mt-2 sm:mt-3 text-center sm:text-left">
                                Circle {course.circleGoal.from} → Circle {course.circleGoal.to} Mastery
                            </p>
                        </div>
                    )}

                    {/* 2-Column Grid for Content (Desktop) / 1-Column (Mobile) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                        {/* Highlights */}
                        <div>
                            <h4 className="text-xs sm:text-sm font-medium text-zinc-200 mb-2 sm:mb-3">What&apos;s Included:</h4>
                            <ul className="space-y-1.5 sm:space-y-2">
                                {course.highlights.map((highlight, idx) => (
                                    <li key={idx} className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-zinc-400">
                                        <IconCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold/70 flex-shrink-0 mt-0.5" />
                                        <span>{highlight}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Outcomes */}
                        <div>
                            <h4 className="text-xs sm:text-sm font-medium text-zinc-200 mb-2 sm:mb-3">Outcomes:</h4>
                            <ul className="space-y-1.5 sm:space-y-2">
                                {course.outcomes.map((outcome, idx) => (
                                    <li key={idx} className="flex items-start gap-1.5 sm:gap-2 text-xs sm:text-sm text-zinc-400">
                                        <IconStar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold/70 flex-shrink-0 mt-0.5" />
                                        <span>{outcome}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Prerequisites */}
                    {course.prerequisites && (
                        <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-white/[0.02] border border-white/[0.05] rounded-lg">
                            <p className="text-[10px] sm:text-xs text-zinc-400 leading-relaxed">
                                <span className="font-medium text-zinc-300">Prerequisites: </span>
                                {Array.isArray(course.prerequisites)
                                    ? course.prerequisites.join(" • ")
                                    : course.prerequisites}
                            </p>
                        </div>
                    )}

                    {/* Target Audience */}
                    {course.targetAudience && (
                        <div className="mb-4 sm:mb-6">
                            <p className="text-[10px] sm:text-xs text-zinc-400">
                                <span className="font-medium text-zinc-300">For: </span>
                                {course.targetAudience}
                            </p>
                        </div>
                    )}

                    {/* Spacer to push price/CTA to bottom */}
                    <div className="flex-1" />

                    {/* Price & CTA */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-end justify-between pt-4 sm:pt-6 border-t border-white/[0.1] mt-auto gap-3 sm:gap-4">
                        <div className="flex-shrink-0">
                            <div className="text-2xl sm:text-3xl font-serif font-light text-zinc-100 leading-tight">{course.price}</div>
                            {course.priceOptions && (
                                <div className="text-xs text-zinc-500 mt-1">{course.priceOptions}</div>
                            )}
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative px-4 sm:px-6 py-2.5 sm:py-3 bg-gold text-black font-semibold overflow-hidden group/button border border-gold whitespace-nowrap text-sm sm:text-base min-h-[44px]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-gold to-jade opacity-0 group-hover/button:opacity-100 transition-opacity duration-300" />
                            <span className="relative z-10">{course.cta}</span>
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function CoursesPage() {
    const [filterTier, setFilterTier] = useState<"all" | 1 | 2 | 3 | 4>("all");
    const [filterPillar, setFilterPillar] = useState<Pillar | "all">("all");

    const _filteredCourses = COURSES.filter(course => {
        if (filterTier !== "all" && course.tier !== filterTier) return false;
        if (filterPillar !== "all" && !course.pillars.includes(filterPillar)) return false;
        return true;
    });

    const tier1Courses = COURSES.filter(c => c.tier === 1);
    const tier2Courses = COURSES.filter(c => c.tier === 2);
    const tier3Courses = COURSES.filter(c => c.tier === 3);
    const tier4Courses = COURSES.filter(c => c.tier === 4);

    return (
        <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <section className="mb-16 relative">
                <div className="absolute -top-20 -left-20 w-72 h-72 bg-gold/20 rounded-full blur-3xl" />
                <div className="absolute -top-10 right-10 w-96 h-96 bg-jade/10 rounded-full blur-3xl" />
                <div className="relative">
                    <h1 className="text-4xl md:text-5xl font-serif font-light text-zinc-100 mb-4">
                        Your Path to Mastery
                    </h1>
                    <p className="text-lg text-zinc-400 font-sans max-w-2xl">
                        From 30-day challenge to complete transformation. Choose your starting point.
                    </p>
                </div>
            </section>

            {/* Filters */}
            <div className="mb-8 sm:mb-12 space-y-3 sm:space-y-4 relative z-10">
                {/* Tier Filters */}
                <div>
                    <h3 className="text-xs font-medium text-zinc-400 mb-2">Filter by Tier</h3>
                    <div className="flex flex-wrap gap-2 relative z-10">
                        <button
                            onClick={() => setFilterTier("all")}
                            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 border whitespace-nowrap ${filterTier === "all"
                                    ? "bg-gold/20 text-gold border-gold/50 shadow-[0_0_20px_rgba(212,165,116,0.3)]"
                                    : "bg-white/[0.02] text-zinc-400 border-white/[0.1] hover:border-white/[0.2] hover:bg-white/[0.05]"
                                }`}
                        >
                            All Courses
                        </button>
                        <button
                            onClick={() => setFilterTier(1)}
                            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 border whitespace-nowrap ${filterTier === 1
                                    ? "bg-gold/20 text-gold border-gold/50 shadow-[0_0_20px_rgba(212,165,116,0.3)]"
                                    : "bg-white/[0.02] text-zinc-400 border-white/[0.1] hover:border-white/[0.2] hover:bg-white/[0.05]"
                                }`}
                        >
                            <span className="hidden sm:inline">Entry Point (£47)</span>
                            <span className="sm:hidden">Entry (£47)</span>
                        </button>
                        <button
                            onClick={() => setFilterTier(2)}
                            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 border whitespace-nowrap ${filterTier === 2
                                    ? "bg-gold/20 text-gold border-gold/50 shadow-[0_0_20px_rgba(212,165,116,0.3)]"
                                    : "bg-white/[0.02] text-zinc-400 border-white/[0.1] hover:border-white/[0.2] hover:bg-white/[0.05]"
                                }`}
                        >
                            <span className="hidden sm:inline">Transformation (£297-597)</span>
                            <span className="sm:hidden">Transform</span>
                        </button>
                        <button
                            onClick={() => setFilterTier(3)}
                            className={`relative z-10 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 border whitespace-nowrap cursor-pointer ${filterTier === 3
                                    ? "bg-gold/20 text-gold border-gold/50 shadow-[0_0_20px_rgba(212,165,116,0.3)]"
                                    : "bg-white/[0.02] text-zinc-400 border-white/[0.1] hover:border-white/[0.2] hover:bg-white/[0.05]"
                                }`}
                        >
                            <span className="hidden sm:inline">Mastery (£997+)</span>
                            <span className="sm:hidden">Mastery</span>
                        </button>
                        <button
                            onClick={() => setFilterTier(4)}
                            className={`relative z-10 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 border whitespace-nowrap cursor-pointer ${filterTier === 4
                                    ? "bg-gold/20 text-gold border-gold/50 shadow-[0_0_20px_rgba(212,165,116,0.3)]"
                                    : "bg-white/[0.02] text-zinc-400 border-white/[0.1] hover:border-white/[0.2] hover:bg-white/[0.05]"
                                }`}
                        >
                            <span className="hidden sm:inline">Certification (£5,997+)</span>
                            <span className="sm:hidden">Cert</span>
                        </button>
                    </div>
                </div>

                {/* Pillar Filters */}
                <div>
                    <h3 className="text-xs font-medium text-zinc-400 mb-2">Filter by Pillar</h3>
                    <div className="flex flex-wrap gap-2 relative z-10">
                        <button
                            onClick={() => setFilterPillar("all")}
                            className={`relative z-10 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 border cursor-pointer ${filterPillar === "all"
                                    ? "bg-gold/20 text-gold border-gold/50 shadow-[0_0_20px_rgba(212,165,116,0.3)]"
                                    : "bg-white/[0.02] text-zinc-400 border-white/[0.1] hover:border-white/[0.2] hover:bg-white/[0.05]"
                                }`}
                        >
                            All Pillars
                        </button>
                        <button
                            onClick={() => setFilterPillar("view")}
                            className={`relative z-10 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 border cursor-pointer ${filterPillar === "view"
                                    ? "bg-gold/20 text-gold border-gold/50 shadow-[0_0_20px_rgba(212,165,116,0.3)]"
                                    : "bg-white/[0.02] text-zinc-400 border-white/[0.1] hover:border-white/[0.2] hover:bg-white/[0.05]"
                                }`}
                        >
                            <PillarIcon pillar="view" size={16} />
                            View
                        </button>
                        <button
                            onClick={() => setFilterPillar("compass")}
                            className={`relative z-10 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 border cursor-pointer ${filterPillar === "compass"
                                    ? "bg-gold/20 text-gold border-gold/50 shadow-[0_0_20px_rgba(212,165,116,0.3)]"
                                    : "bg-white/[0.02] text-zinc-400 border-white/[0.1] hover:border-white/[0.2] hover:bg-white/[0.05]"
                                }`}
                        >
                            <PillarIcon pillar="compass" size={16} />
                            Compass
                        </button>
                        <button
                            onClick={() => setFilterPillar("ground")}
                            className={`relative z-10 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 border cursor-pointer ${filterPillar === "ground"
                                    ? "bg-gold/20 text-gold border-gold/50 shadow-[0_0_20px_rgba(212,165,116,0.3)]"
                                    : "bg-white/[0.02] text-zinc-400 border-white/[0.1] hover:border-white/[0.2] hover:bg-white/[0.05]"
                                }`}
                        >
                            <PillarIcon pillar="ground" size={16} />
                            Ground
                        </button>
                    </div>
                </div>
            </div>

            {/* Tier 1: Entry Point */}
            {(filterTier === "all" || filterTier === 1) && tier1Courses.some(c => filterPillar === "all" || c.pillars.includes(filterPillar)) && (
                <section className="mb-12 sm:mb-16 lg:mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="mb-6 sm:mb-8 lg:mb-10 relative p-4 sm:p-6 bg-white/[0.02] border border-white/[0.1] backdrop-blur-sm"
                    >
                        <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gold to-jade flex items-center justify-center text-white font-serif text-lg sm:text-xl shadow-[0_0_20px_rgba(212,165,116,0.3)] flex-shrink-0">1</div>
                            <h2 className="text-2xl sm:text-3xl font-serif font-light text-zinc-100">The Entry Point</h2>
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-400 ml-0 sm:ml-16">Low-risk, high-value introduction to The Kaishin Method</p>
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-gold via-jade to-transparent" />
                    </motion.div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {tier1Courses.filter(c => filterPillar === "all" || c.pillars.includes(filterPillar)).map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </section>
            )}

            {/* Tier 2: Transformation */}
            {(filterTier === "all" || filterTier === 2) && tier2Courses.some(c => filterPillar === "all" || c.pillars.includes(filterPillar)) && (
                <section className="mb-12 sm:mb-16 lg:mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="mb-6 sm:mb-8 lg:mb-10 relative p-4 sm:p-6 bg-white/[0.02] border border-white/[0.1] backdrop-blur-sm"
                    >
                        <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-jade to-plum flex items-center justify-center text-white font-serif text-lg sm:text-xl shadow-[0_0_20px_rgba(93,214,174,0.3)] flex-shrink-0">2</div>
                            <h2 className="text-2xl sm:text-3xl font-serif font-light text-zinc-100">Deep Transformation</h2>
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-400 ml-0 sm:ml-16">Flagship immersion courses for comprehensive mastery</p>
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-jade via-plum to-transparent" />
                    </motion.div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {tier2Courses.filter(c => filterPillar === "all" || c.pillars.includes(filterPillar)).map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </section>
            )}

            {/* Tier 3: Applied Mastery */}
            {(filterTier === "all" || filterTier === 3) && tier3Courses.some(c => filterPillar === "all" || c.pillars.includes(filterPillar)) && (
                <section className="mb-12 sm:mb-16 lg:mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="mb-6 sm:mb-8 lg:mb-10 relative p-4 sm:p-6 bg-white/[0.02] border border-white/[0.1] backdrop-blur-sm"
                    >
                        <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-plum to-gold flex items-center justify-center text-white font-serif text-lg sm:text-xl shadow-[0_0_20px_rgba(168,113,74,0.3)] flex-shrink-0">3</div>
                            <h2 className="text-2xl sm:text-3xl font-serif font-light text-zinc-100">Applied Mastery</h2>
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-400 ml-0 sm:ml-16">Bring The Kaishin Method into specific life domains</p>
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-plum via-gold to-transparent" />
                    </motion.div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {tier3Courses.filter(c => filterPillar === "all" || c.pillars.includes(filterPillar)).map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </section>
            )}

            {/* Tier 4: Certification */}
            {(filterTier === "all" || filterTier === 4) && tier4Courses.some(c => filterPillar === "all" || c.pillars.includes(filterPillar)) && (
                <section className="mb-12 sm:mb-16 lg:mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="mb-6 sm:mb-8 lg:mb-10 relative p-4 sm:p-6 bg-white/[0.02] border border-white/[0.1] backdrop-blur-sm"
                    >
                        <div className="flex items-center gap-3 sm:gap-4 mb-2 sm:mb-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gold to-gold flex items-center justify-center text-white font-serif text-lg sm:text-xl shadow-[0_0_20px_rgba(212,165,116,0.3)] flex-shrink-0">4</div>
                            <h2 className="text-2xl sm:text-3xl font-serif font-light text-zinc-100">Professional Training</h2>
                        </div>
                        <p className="text-xs sm:text-sm text-zinc-400 ml-0 sm:ml-16">Become certified to teach The Kaishin Method</p>
                        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-gold via-gold to-transparent" />
                    </motion.div>
                    <div className="grid grid-cols-1 gap-8">
                        {tier4Courses.filter(c => filterPillar === "all" || c.pillars.includes(filterPillar)).map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
