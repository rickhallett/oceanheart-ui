"use client";
import { useState } from "react";
import { Tabs } from "@/components/kaishin/Tabs";
import { Switch } from "@/components/kaishin/Switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { IconBell, IconLock, IconPalette, IconCreditCard } from "@tabler/icons-react";

export default function SettingsPage() {
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [courseReminders, setCourseReminders] = useState(true);
    const [communityUpdates, setCommunityUpdates] = useState(false);
    const [darkMode, setDarkMode] = useState(false); // Changed to false for light theme
    const [selectedTheme, setSelectedTheme] = useState("ocean");

    const tabs = [
        {
            title: "Notifications",
            value: "notifications",
            content: (
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-serif font-light text-zinc-100 mb-4 flex items-center gap-2">
                            <IconBell className="w-5 h-5 text-gold" />
                            Notification Preferences
                        </h3>

                        <div className="space-y-4">
                            {[
                                {
                                    label: "Email Notifications",
                                    description: "Receive updates and course information via email",
                                    value: emailNotifications,
                                    onChange: setEmailNotifications,
                                    disabled: false
                                },
                                {
                                    label: "Push Notifications",
                                    description: "Get real-time updates in your browser",
                                    value: pushNotifications,
                                    onChange: setPushNotifications,
                                    disabled: true
                                },
                                {
                                    label: "Course Reminders",
                                    description: "Receive reminders for upcoming lessons and deadlines",
                                    value: courseReminders,
                                    onChange: setCourseReminders,
                                    disabled: false
                                },
                                {
                                    label: "Community Updates",
                                    description: "Stay informed about community events and discussions",
                                    value: communityUpdates,
                                    onChange: setCommunityUpdates,
                                    disabled: false
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center justify-between gap-3 p-4 bg-black border border-white/[0.1] transition-all backdrop-blur-xl ${
                                        item.disabled ? 'opacity-50' : 'hover:border-white/[0.2]'
                                    }`}
                                >
                                    <div className="flex-1 min-w-0">
                                        <p className={`text-sm font-medium ${item.disabled ? 'text-zinc-500' : 'text-zinc-100'}`}>{item.label}</p>
                                        <p className="text-xs text-zinc-400 mt-1">{item.description}</p>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <Switch
                                            checked={item.value}
                                            onChange={item.onChange}
                                            disabled={item.disabled}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "Security",
            value: "security",
            content: (
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-serif font-light text-zinc-100 mb-4 flex items-center gap-2">
                            <IconLock className="w-5 h-5 text-gold" />
                            Security Settings
                        </h3>

                        <div className="space-y-6">
                            {/* Change Password */}
                            <div className="bg-black border border-white/[0.1] p-4 sm:p-6 backdrop-blur-xl">
                                <h4 className="text-base font-medium text-zinc-100 mb-4">Change Password</h4>
                                <div className="space-y-4">
                                    <div>
                                        <Label className="text-zinc-400 mb-2 block">Current Password</Label>
                                        <Input
                                            type="password"
                                            placeholder="Enter current password"
                                            className="bg-white/[0.05] border-white/[0.1] text-zinc-100 placeholder-zinc-400"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-zinc-400 mb-2 block">New Password</Label>
                                        <Input
                                            type="password"
                                            placeholder="Enter new password"
                                            className="bg-white/[0.05] border-white/[0.1] text-zinc-100 placeholder-zinc-400"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-zinc-400 mb-2 block">Confirm New Password</Label>
                                        <Input
                                            type="password"
                                            placeholder="Confirm new password"
                                            className="bg-white/[0.05] border-white/[0.1] text-zinc-100 placeholder-zinc-400"
                                        />
                                    </div>
                                    <button className="w-full sm:w-auto px-6 py-3 bg-gold text-white hover:bg-gold/90 transition-colors font-medium shadow-[0_0_20px_rgba(212,165,116,0.3)]">
                                        Update Password
                                    </button>
                                </div>
                            </div>

                            {/* Two-Factor Authentication */}
                            <div className="bg-black border border-white/[0.1] p-4 sm:p-6 backdrop-blur-xl">
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-jade/20 flex items-center justify-center flex-shrink-0 mt-1">
                                        <IconLock className="w-4 h-4 text-jade" />
                                    </div>
                                    <div>
                                        <h4 className="text-base font-medium text-zinc-100 mb-1">Two-Factor Authentication</h4>
                                        <p className="text-sm text-zinc-400">Add an extra layer of security to your account</p>
                                    </div>
                                </div>
                                <button disabled className="px-6 py-3 bg-zinc-800/50 border border-zinc-700/50 text-zinc-500 cursor-not-allowed font-medium">
                                    Enable 2FA
                                </button>
                            </div>

                            {/* Active Sessions */}
                            <div className="bg-black border border-white/[0.1] p-4 sm:p-6 backdrop-blur-xl">
                                <h4 className="text-base font-medium text-zinc-100 mb-4">Active Sessions</h4>
                                <p className="text-sm text-zinc-400 mb-4">Manage your active login sessions</p>
                                <div className="bg-white/[0.02] p-4 border border-white/[0.1] mb-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-zinc-100">Chrome on MacOS</p>
                                            <p className="text-xs text-zinc-400">Los Angeles, CA · Current session</p>
                                        </div>
                                        <span className="text-xs px-3 py-1 bg-jade/20 text-jade border border-jade/50 self-start sm:self-auto">Active</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "Appearance",
            value: "appearance",
            content: (
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-serif font-light text-zinc-100 mb-4 flex items-center gap-2">
                            <IconPalette className="w-5 h-5 text-gold" />
                            Appearance Settings
                        </h3>

                        <div className="space-y-6">
                            {/* Dark Mode Toggle */}
                            <div className="flex items-center justify-between gap-3 p-4 bg-black border border-white/[0.1] backdrop-blur-xl">
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-zinc-100">Dark Mode</p>
                                    <p className="text-xs text-zinc-400 mt-1">Use dark theme across the application</p>
                                </div>
                                <div className="flex-shrink-0">
                                    <Switch checked={darkMode} onChange={setDarkMode} />
                                </div>
                            </div>

                            {/* Theme Color */}
                            <div className="bg-black border border-white/[0.1] p-4 sm:p-6 backdrop-blur-xl">
                                <h4 className="text-base font-medium text-zinc-100 mb-4">Theme Color</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {[
                                        { name: "Ocean", value: "ocean", color: "bg-gold", locked: true },
                                        { name: "Plum", value: "plum", color: "bg-plum", locked: true },
                                        { name: "Jade", value: "jade", color: "bg-jade", locked: true },
                                        { name: "Gold", value: "gold", color: "bg-gold", locked: true },
                                    ].map((theme) => (
                                        <button
                                            key={theme.value}
                                            onClick={() => !theme.locked && setSelectedTheme(theme.value)}
                                            className={`relative p-4 border transition-all ${
                                                selectedTheme === theme.value
                                                    ? "border-gold/50 bg-gold/10 shadow-[0_0_15px_rgba(212,165,116,0.2)]"
                                                    : "border-white/[0.1] hover:border-white/[0.2]"
                                            } ${theme.locked ? "cursor-not-allowed" : ""}`}
                                        >
                                            <div className={`w-full h-16 ${theme.color} mb-2`} />
                                            <p className="text-sm text-zinc-100">{theme.name}</p>

                                            {theme.locked && (
                                                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-2 border border-white/10">
                                                    <div className="text-zinc-400 text-2xl">🔒</div>
                                                    <div className="text-zinc-400 text-xs font-mono">COMING SOON</div>
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: "Billing",
            value: "billing",
            content: (
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-serif font-light text-zinc-100 mb-4 flex items-center gap-2">
                            <IconCreditCard className="w-5 h-5 text-gold" />
                            Billing & Subscription
                        </h3>

                        <div className="space-y-6">
                            {/* Current Plan */}
                            <div className="bg-black border border-white/[0.1] p-4 sm:p-6 backdrop-blur-xl">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                                    <div className="flex-1">
                                        <h4 className="text-base font-medium text-zinc-100">No Active Subscription</h4>
                                        <p className="text-sm text-zinc-400">Subscribe to access the full program</p>
                                    </div>
                                    <span className="px-4 py-2 bg-zinc-800/50 text-zinc-500 border border-zinc-700/50 text-sm font-medium self-start sm:self-auto">
                                        Inactive
                                    </span>
                                </div>
                                <button className="px-4 py-2 bg-gold text-black hover:bg-gold/90 transition-colors text-sm font-medium shadow-[0_0_20px_rgba(212,165,116,0.3)]">
                                    Browse Plans
                                </button>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-black border border-white/[0.1] p-4 sm:p-6 backdrop-blur-xl">
                                <h4 className="text-base font-medium text-zinc-100 mb-4">Payment Method</h4>
                                <div className="text-center py-6">
                                    <p className="text-xs text-zinc-400 mb-3">No payment method on file</p>
                                    <button className="px-4 py-2 bg-white/10 border border-white/20 text-zinc-100 hover:bg-white/20 transition-all text-sm">
                                        Add Payment Method
                                    </button>
                                </div>
                            </div>

                            {/* Billing History */}
                            <div className="bg-black border border-white/[0.1] p-4 sm:p-6 backdrop-blur-xl">
                                <h4 className="text-base font-medium text-zinc-100 mb-4">Billing History</h4>
                                <div className="text-center py-8">
                                    <p className="text-sm text-zinc-400">No billing history</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-0">
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-serif font-light text-zinc-100 mb-2">
                    <span className="text-gold">Settings</span>
                </h1>
                <p className="text-zinc-400">Manage your account preferences and settings</p>
            </div>

            <Tabs tabs={tabs} />
        </div>
    );
}
