"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconEdit, IconCheck, IconX, IconCamera, IconMail, IconMapPin, IconFlame } from "@tabler/icons-react";
import { CircleProgress } from "@/components/kaishin/CircleProgress";
import { FiveBodiesVisualizer } from "@/components/kaishin/FiveBodiesVisualizer";

export default function ProfilePage() {
    const [isEditing, setIsEditing] = useState(false);

    // Mock user data (would come from context/API in real app)
    const user = {
        name: "Seeker",
        email: "seeker@example.com",
        location: "San Francisco, CA",
        bio: "On a journey of integration through The Kaishin Method. Learning to unite mind, body, and spirit.",
        website: "https://example.com",
        avatar: "",
        currentCircle: 2,
        daysInProgram: 45,
        currentStreak: 12,
        joinedDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
        fiveBodies: {
            mental: 60,
            emotional: 55,
            physical: 70,
            energetic: 45,
            spiritual: 50
        },
        completedCourses: 1,
        enrolledCourses: ["30-Day Challenge", "90-Day Transformation"]
    };

    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        location: user.location || "",
        bio: user.bio || "",
        website: user.website || "",
    });

    const stats = [
        { label: "Courses Completed", value: user.completedCourses.toString(), color: "text-jade" },
        { label: "Current Streak", value: user.currentStreak.toString(), color: "text-gold" },
        { label: "Days Active", value: user.daysInProgram.toString(), color: "text-plum" },
        { label: "Current Circle", value: user.currentCircle.toString(), color: "text-gold" }
    ];

    const achievements = [
        { name: "First Course Complete", earned: user.completedCourses >= 1, icon: "完" }, // 完 = complete/finish
        { name: "30-Day Streak", earned: user.currentStreak >= 30, icon: "火" }, // 火 = fire/passion
        { name: "Circle Explorer", earned: user.currentCircle >= 2, icon: "円" }, // 円 = circle/completeness
        { name: "Five Bodies Awareness", earned: true, icon: "体" }, // 体 = body/form
        { name: "Pillar Integration", earned: user.currentCircle >= 3, icon: "統" }, // 統 = integration/unification
        { name: "Community Member", earned: true, icon: "仲" } // 仲 = fellowship/companionship
    ];

    const handleSave = () => {
        // Would update user profile with form data via API/context
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData({
            name: user.name,
            email: user.email,
            location: user.location || "",
            bio: user.bio || "",
            website: user.website || "",
        });
        setIsEditing(false);
    };

    const daysSinceJoining = Math.floor(
        (Date.now() - new Date(user.joinedDate).getTime()) / (1000 * 60 * 60 * 24)
    );

    const joinDate = new Date(user.joinedDate).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="max-w-5xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-serif font-light text-zinc-100 mb-2">
                    My <span className="text-gold">Profile</span>
                </h1>
                <p className="text-zinc-400">Track your journey through The Kaishin Method</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-black border border-white/[0.1] p-6 backdrop-blur-xl">
                        {/* Avatar */}
                        <div className="relative w-32 h-32 mx-auto mb-4 group cursor-pointer">
                            {user.avatar ? (
                                <img
                                    src={user.avatar}
                                    alt={user.name}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full rounded-full bg-gold/10 border-2 border-gold/50 flex items-center justify-center text-4xl font-serif font-light text-gold shadow-[0_0_30px_rgba(212,165,116,0.2)]">
                                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </div>
                            )}
                            <div className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <IconCamera className="w-8 h-8 text-white" />
                            </div>
                        </div>

                        <h2 className="text-2xl font-serif font-light text-zinc-100 text-center mb-4">{user.name}</h2>

                        {/* Current Circle */}
                        <div className="flex justify-center mb-6 overflow-x-auto">
                            <CircleProgress currentCircle={user.currentCircle} size="sm" showLabels={false} />
                        </div>
                        <p className="text-sm text-zinc-400 text-center mb-6">Circle {user.currentCircle}: Independence</p>

                        {/* Quick Stats */}
                        <div className="space-y-3 pt-4 pb-2 border-t border-white/[0.1]">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-zinc-400">Member Since</span>
                                <span className="text-zinc-100 font-medium">{joinDate}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-zinc-400">Days Active</span>
                                <span className="text-zinc-100 font-medium">{daysSinceJoining}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-zinc-400">Current Streak</span>
                                <div className="flex items-center gap-1">
                                    <IconFlame className="w-4 h-4 text-gold" />
                                    <span className="text-zinc-100 font-medium">{user.currentStreak} days</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="mt-6 grid grid-cols-2 gap-3">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-black border border-white/[0.1] p-4 backdrop-blur-xl hover:border-white/[0.2] transition-all"
                            >
                                <p className={`text-2xl font-serif font-light ${stat.color}`}>{stat.value}</p>
                                <p className="text-xs text-zinc-400 mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Profile Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Personal Information */}
                    <div className="bg-black border border-white/[0.1] p-6 backdrop-blur-xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-serif font-light text-zinc-100">Personal Information</h3>
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/50 text-gold hover:bg-gold/20 transition-all shadow-[0_0_15px_rgba(212,165,116,0.2)]"
                                >
                                    <IconEdit className="w-4 h-4" />
                                    <span className="text-sm">Edit</span>
                                </button>
                            ) : (
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center gap-2 px-4 py-2 bg-jade/10 border border-jade/50 text-jade hover:bg-jade/20 transition-all"
                                    >
                                        <IconCheck className="w-4 h-4" />
                                        <span className="text-sm">Save</span>
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="flex items-center gap-2 px-4 py-2 bg-plum/10 border border-plum/50 text-plum hover:bg-plum/20 transition-all"
                                    >
                                        <IconX className="w-4 h-4" />
                                        <span className="text-sm">Cancel</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="name" className="text-zinc-400 mb-2 block">Full Name</Label>
                                {isEditing ? (
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="bg-white/[0.05] border-white/[0.1] text-zinc-100"
                                    />
                                ) : (
                                    <div className="text-zinc-100">{user.name}</div>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="email" className="text-zinc-400 mb-2 block">Email Address</Label>
                                {isEditing ? (
                                    <Input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="bg-white/[0.05] border-white/[0.1] text-zinc-100"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2 text-zinc-100">
                                        <IconMail className="w-4 h-4 text-zinc-400" />
                                        {user.email || 'Not set'}
                                    </div>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <Label htmlFor="location" className="text-zinc-400 mb-2 block">Location</Label>
                                {isEditing ? (
                                    <Input
                                        id="location"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        placeholder="City, State/Country"
                                        className="bg-white/[0.05] border-white/[0.1] text-zinc-100"
                                    />
                                ) : (
                                    <div className="flex items-center gap-2 text-zinc-100">
                                        <IconMapPin className="w-4 h-4 text-zinc-400" />
                                        {user.location || 'Not set'}
                                    </div>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <Label htmlFor="website" className="text-zinc-400 mb-2 block">Website</Label>
                                {isEditing ? (
                                    <Input
                                        id="website"
                                        type="url"
                                        value={formData.website}
                                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                        placeholder="https://yourwebsite.com"
                                        className="bg-white/[0.05] border-white/[0.1] text-zinc-100"
                                    />
                                ) : (
                                    <div className="text-zinc-100">{user.website || 'Not set'}</div>
                                )}
                            </div>

                            <div className="md:col-span-2">
                                <Label htmlFor="bio" className="text-zinc-400 mb-2 block">Bio</Label>
                                {isEditing ? (
                                    <textarea
                                        id="bio"
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                        rows={3}
                                        className="w-full bg-white/[0.05] border border-white/[0.1] px-4 py-3 text-zinc-100 placeholder-zinc-400 focus:border-gold/50 focus:outline-none transition-colors"
                                        placeholder="Tell us about yourself..."
                                    />
                                ) : (
                                    <p className="text-zinc-100">{user.bio || 'No bio yet'}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Five Bodies Progress */}
                    <div className="bg-black border border-white/[0.1] p-6 backdrop-blur-xl">
                        <h3 className="text-xl font-serif font-light text-zinc-100 mb-6">Five Bodies Development</h3>
                        <FiveBodiesVisualizer progress={user.fiveBodies} />
                    </div>

                    {/* Achievements */}
                    <div className="bg-black border border-white/[0.1] p-6 backdrop-blur-xl">
                        <h3 className="text-xl font-serif font-light text-zinc-100 mb-6">Achievements</h3>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {achievements.map((achievement, index) => (
                                <div
                                    key={index}
                                    className={`text-center p-4 border transition-all ${achievement.earned
                                            ? "bg-gold/10 border-gold/50 shadow-[0_0_15px_rgba(212,165,116,0.15)]"
                                            : "bg-white/[0.02] border-white/[0.05] opacity-40"
                                        }`}
                                >
                                    <div className="text-3xl mb-2">
                                        {achievement.icon}
                                    </div>
                                    <p className="text-xs text-zinc-100">{achievement.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
