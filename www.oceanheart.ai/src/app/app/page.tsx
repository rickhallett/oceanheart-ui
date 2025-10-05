"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    IconFlame,
    IconCalendar,
    IconBook,
    IconChevronRight,
    IconBrain,
    IconHeart,
    IconRun,
    IconSparkles,
    IconCompass
} from "@tabler/icons-react";
import { CircleProgress } from "@/components/kaishin/CircleProgress";
import { FiveBodiesVisualizer } from "@/components/kaishin/FiveBodiesVisualizer";
import { PillarIcon } from "@/components/kaishin/PillarIcon";

export default function AppDashboard() {
    const router = useRouter();

    // Simulated logged-in state (would be from auth context in real app)
    const [isLoggedIn] = useState(false);

    // Mock user data (would come from context/API in real app)
    const user = {
        name: "Seeker",
        currentCircle: isLoggedIn ? 2 : 0,
        daysInProgram: isLoggedIn ? 45 : 0,
        currentStreak: isLoggedIn ? 12 : 0,
        joinedDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
        currentCourse: isLoggedIn ? "The 90-Day Transformation" : "No active course",
        fiveBodies: {
            mental: isLoggedIn ? 60 : 0,
            emotional: isLoggedIn ? 55 : 0,
            physical: isLoggedIn ? 70 : 0,
            energetic: isLoggedIn ? 45 : 0,
            spiritual: isLoggedIn ? 50 : 0
        }
    };

    const upcomingSessions = isLoggedIn ? [
        {
            title: "Month 2: The Compass Deep Dive",
            date: "Oct 5, 2025",
            time: "10:00 AM PST",
            pillar: "compass" as const
        },
        {
            title: "Community Practice Circle",
            date: "Oct 8, 2025",
            time: "2:00 PM PST",
            pillar: "ground" as const
        },
        {
            title: "Live Q&A with Kaishin",
            date: "Oct 12, 2025",
            time: "11:00 AM PST",
            pillar: "view" as const
        },
    ] : [];

    const recentActivity = isLoggedIn ? [
        { action: "Completed Day 42: Somatic Release Practice", time: "2 hours ago", pillar: "ground" as const },
        { action: "Values Clarification Exercise", time: "Yesterday", pillar: "compass" as const },
        { action: "Morning Meditation: Awareness of Awareness", time: "2 days ago", pillar: "view" as const },
        { action: "Joined Community Discussion: Integration Tips", time: "3 days ago", pillar: "compass" as const },
    ] : [];

    return (
        <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
            >
                <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-4 sm:gap-0">
                    <div className="flex-1 w-full sm:w-auto">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-zinc-100 mb-2">
                            Welcome Back, <span className="text-gold">{user.name}</span>
                        </h1>
                        <p className="text-sm sm:text-base text-zinc-400 font-sans">Day {user.daysInProgram} of your transformation journey</p>
                    </div>

                    {/* Integrated Circle Progress */}
                    <div className="flex flex-col items-start sm:items-end gap-3 w-full sm:w-auto">
                        <div className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.1] px-4 py-2.5 backdrop-blur-sm">
                            <div className="text-right">
                                <div className="text-xs text-zinc-400 uppercase tracking-wider mb-0.5">Circle</div>
                                <div className="text-xl font-serif text-gold">{user.currentCircle}</div>
                            </div>
                            <div className="w-px h-8 bg-white/[0.1]" />
                            <CircleProgress currentCircle={user.currentCircle} size={40} showLabels={false} />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Stats Overview */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12"
            >
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative bg-black border border-white/[0.1] p-6 hover:border-white/[0.2] transition-all backdrop-blur-xl group overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                        <div className="flex items-center gap-3 mb-4">
                            <IconFlame className="w-6 h-6 text-gold" />
                            <span className="text-sm text-zinc-400 uppercase tracking-wider">Current Streak</span>
                        </div>
                        <div className="text-3xl sm:text-4xl font-serif font-light text-zinc-100 mb-1">{user.currentStreak}</div>
                        <div className="text-sm text-zinc-400">days of consistent practice</div>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative bg-black border border-white/[0.1] p-6 hover:border-white/[0.2] transition-all backdrop-blur-xl group overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                        <div className="flex items-center gap-3 mb-4">
                            <IconCalendar className="w-6 h-6 text-gold" />
                            <span className="text-sm text-zinc-400 uppercase tracking-wider">Days Active</span>
                        </div>
                        <div className="text-3xl sm:text-4xl font-serif font-light text-zinc-100 mb-1">{user.daysInProgram}</div>
                        <div className="text-sm text-zinc-400">since you began</div>
                    </div>
                </motion.div>

                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="relative bg-black border border-white/[0.1] p-6 hover:border-white/[0.2] transition-all backdrop-blur-xl group overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                        <div className="flex items-center gap-3 mb-4">
                            <IconBook className="w-6 h-6 text-gold" />
                            <span className="text-sm text-zinc-400 uppercase tracking-wider">Current Course</span>
                        </div>
                        <div className="text-lg font-serif font-normal text-zinc-100 mb-1">{user.currentCourse}</div>
                        <div className="text-sm text-zinc-400">Month 2 of 3</div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Five Bodies Progress */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-12"
            >
                <h2 className="text-2xl font-serif font-light text-zinc-100 mb-6">Your Five Bodies Development</h2>
                <div className="bg-black border border-white/[0.1] p-8 backdrop-blur-xl">
                    <FiveBodiesVisualizer
                        progress={user.fiveBodies}
                    />

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 mt-8 px-2 sm:px-0">
                        <div className="text-center">
                            <IconBrain className="w-8 h-8 text-gold mx-auto mb-2" />
                            <div className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Mental</div>
                            <div className="text-lg font-serif text-zinc-100">{user.fiveBodies.mental}%</div>
                        </div>
                        <div className="text-center">
                            <IconHeart className="w-8 h-8 text-plum mx-auto mb-2" />
                            <div className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Emotional</div>
                            <div className="text-lg font-serif text-zinc-100">{user.fiveBodies.emotional}%</div>
                        </div>
                        <div className="text-center">
                            <IconRun className="w-8 h-8 text-jade mx-auto mb-2" />
                            <div className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Physical</div>
                            <div className="text-lg font-serif text-zinc-100">{user.fiveBodies.physical}%</div>
                        </div>
                        <div className="text-center">
                            <IconSparkles className="w-8 h-8 text-gold mx-auto mb-2" />
                            <div className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Energetic</div>
                            <div className="text-lg font-serif text-zinc-100">{user.fiveBodies.energetic}%</div>
                        </div>
                        <div className="text-center">
                            <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                                <span className="text-2xl font-serif-jp text-gold">心</span>
                            </div>
                            <div className="text-xs text-zinc-400 uppercase tracking-wider mb-1">Spiritual</div>
                            <div className="text-lg font-serif text-zinc-100">{user.fiveBodies.spiritual}%</div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Circle Progression Path */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-12"
            >
                <h2 className="text-2xl font-serif font-light text-zinc-100 mb-6">Your Circle Journey</h2>
                <div className="bg-black border border-white/[0.1] p-8 overflow-x-auto backdrop-blur-xl">
                    <CircleProgress
                        currentCircle={user.currentCircle}
                        totalCircles={8}
                        size="md"
                        showLabels={true}
                    />
                </div>
            </motion.section>

            {/* Two Column Layout */}
            <div className="grid md:grid-cols-2 gap-8">
                {/* Upcoming Sessions */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <h2 className="text-xl font-serif font-light text-zinc-100 mb-6 flex items-center gap-2">
                        <IconCalendar className="w-5 h-5 text-gold" />
                        Upcoming Sessions
                    </h2>
                    <div className="space-y-4">
                        {upcomingSessions.length > 0 ? (
                            upcomingSessions.map((session, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: i * 0.1 }}
                                    className="bg-black border border-white/[0.1] p-4 hover:border-white/[0.2] transition-all group backdrop-blur-xl"
                                >
                                    <div className="flex items-start gap-3">
                                        <PillarIcon pillar={session.pillar} size={24} />
                                        <div className="flex-1">
                                            <h3 className="text-sm font-medium text-zinc-100 mb-1 group-hover:text-gold transition-colors">
                                                {session.title}
                                            </h3>
                                            <p className="text-xs text-zinc-400">{session.date} at {session.time}</p>
                                        </div>
                                        <IconChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-gold transition-colors" />
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="bg-black border border-white/[0.1] p-8 backdrop-blur-xl text-center">
                                <p className="text-sm text-zinc-400">No upcoming sessions</p>
                            </div>
                        )}
                    </div>
                </motion.section>

                {/* Recent Activity */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <h2 className="text-xl font-serif font-light text-zinc-100 mb-6 flex items-center gap-2">
                        <IconCompass className="w-5 h-5 text-gold" />
                        Recent Activity
                    </h2>
                    <div className="space-y-4">
                        {recentActivity.length > 0 ? (
                            recentActivity.map((activity, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: i * 0.1 }}
                                    className="bg-black border border-white/[0.1] p-4 hover:border-white/[0.2] transition-all group backdrop-blur-xl"
                                >
                                    <div className="flex items-start gap-3">
                                        <PillarIcon pillar={activity.pillar} size={24} />
                                        <div className="flex-1">
                                            <p className="text-sm text-zinc-100 group-hover:text-gold transition-colors">
                                                {activity.action}
                                            </p>
                                            <p className="text-xs text-zinc-400 mt-1">{activity.time}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="bg-black border border-white/[0.1] p-8 backdrop-blur-xl text-center">
                                <p className="text-sm text-zinc-400">No recent activity</p>
                            </div>
                        )}
                    </div>
                </motion.section>
            </div>

            {/* Quick Actions */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-12"
            >
                <h2 className="text-xl font-serif font-light text-zinc-100 mb-6">Quick Actions</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => router.push('/app/courses')}
                        className="relative bg-black border border-white/[0.1] p-6 text-left hover:border-gold/50 transition-all group backdrop-blur-xl overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative flex items-center justify-between">
                            <div>
                                <div className="text-zinc-100 font-serif font-normal text-lg mb-1">Continue Learning</div>
                                <div className="text-sm text-zinc-400">{user.currentCourse}</div>
                            </div>
                            <IconChevronRight className="w-6 h-6 text-gold group-hover:translate-x-1 transition-transform" />
                        </div>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => router.push('/app/chat')}
                        className="relative bg-black border border-white/[0.1] p-6 text-left hover:border-plum/50 transition-all group backdrop-blur-xl overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-plum/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative flex items-center justify-between">
                            <div>
                                <div className="text-zinc-100 font-serif font-normal text-lg mb-1">Kaishin AI Companion</div>
                                <div className="text-sm text-zinc-400">Get personalized guidance</div>
                            </div>
                            <IconChevronRight className="w-6 h-6 text-plum group-hover:translate-x-1 transition-transform" />
                        </div>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => router.push('/app/profile')}
                        className="relative bg-black border border-white/[0.1] p-6 text-left hover:border-jade/50 transition-all group backdrop-blur-xl overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-jade/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative flex items-center justify-between">
                            <div>
                                <div className="text-zinc-100 font-serif font-normal text-lg mb-1">View Progress</div>
                                <div className="text-sm text-zinc-400">Track your journey</div>
                            </div>
                            <IconChevronRight className="w-6 h-6 text-jade group-hover:translate-x-1 transition-transform" />
                        </div>
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => router.push('/app/support')}
                        className="relative bg-black border border-white/[0.1] p-6 text-left hover:border-gold/50 transition-all group backdrop-blur-xl overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative flex items-center justify-between">
                            <div>
                                <div className="text-zinc-100 font-serif font-normal text-lg mb-1">Get Support</div>
                                <div className="text-sm text-zinc-400">Help and resources</div>
                            </div>
                            <IconChevronRight className="w-6 h-6 text-gold group-hover:translate-x-1 transition-transform" />
                        </div>
                    </motion.button>
                </div>
            </motion.section>
        </div>
    );
}
