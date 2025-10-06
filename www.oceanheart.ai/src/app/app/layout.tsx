"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
    IconHome,
    IconBooks,
    IconBrain,
    IconUser,
    IconSettings,
    IconHelp,
    IconMenu2,
    IconX,
    IconRocket,
    IconHeadphones,
    IconLogout,
} from "@tabler/icons-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { data: session } = useSession();
    const user = session?.user;

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/auth/signin' });
    };

    const navItems = [
        { name: "Dashboard", href: "/app", icon: IconHome },
        { name: "Courses", href: "/app/courses", icon: IconBooks },
        { name: "Audio Library", href: "/app/audio", icon: IconHeadphones },
        { name: "30-Day Sprint", href: "/app/sprint", icon: IconRocket },
        { name: "Kaishin AI", href: "/app/chat", icon: IconBrain },
        { name: "Profile", href: "/app/profile", icon: IconUser },
        { name: "Settings", href: "/app/settings", icon: IconSettings },
        { name: "Support", href: "/app/support", icon: IconHelp },
    ];

    const isActive = (href: string) => {
        if (href === "/app") {
            return pathname === "/app";
        }
        return pathname.startsWith(href);
    };

    return (
        <div className="min-h-screen bg-black text-zinc-100 flex">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex lg:flex-col w-72 bg-black/95 border-r border-white/[0.1] fixed h-full z-40 backdrop-blur-2xl">
                {/* Logo */}
                <div className="p-6 border-b border-white/[0.1]">
                    <Link href="/app" className="flex items-center gap-3">
                        <span className="text-4xl font-serif-jp text-gold">心</span>
                        <div>
                            <h1 className="text-base font-serif font-normal text-zinc-100 leading-tight">
                                The Kaishin Method
                            </h1>
                            <p className="text-xs text-zinc-400 font-sans">Member Portal</p>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);

                        return (
                            <Link key={item.href} href={item.href}>
                                <div
                                    className={cn(
                                        "flex items-center gap-3 px-4 py-3 rounded-sm transition-all relative group border border-transparent",
                                        active
                                            ? "bg-gold/10 text-gold border-gold/50 shadow-[0_0_20px_rgba(212,165,116,0.2)]"
                                            : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.05] hover:border-white/[0.1]"
                                    )}
                                >
                                    {active && (
                                        <div className="absolute left-0 w-1 h-8 bg-gold shadow-[0_0_10px_rgba(212,165,116,0.5)]" />
                                    )}
                                    <Icon className="w-5 h-5 flex-shrink-0" />
                                    <span className="font-sans font-normal">{item.name}</span>
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                {/* User Section & Logout */}
                <div className="p-4 border-t border-white/[0.1] space-y-3">
                    {/* User Info */}
                    {user && (
                        <div className="flex items-center gap-3 px-4 py-3 rounded-sm bg-white/[0.05] border border-white/[0.1]">
                            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                                {user.image ? (
                                    <img src={user.image} alt={user.name || "User"} className="w-full h-full rounded-full object-cover" />
                                ) : (
                                    <span className="text-gold font-medium">{user.name?.charAt(0).toUpperCase() || "U"}</span>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-zinc-100 truncate">
                                    {user.name || "Member"}
                                </p>
                                <p className="text-xs text-zinc-400 truncate">
                                    {user.email || "No email"}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="w-full justify-start text-plum hover:bg-plum/10 hover:border-plum/30 flex items-center gap-2 px-4 py-3 rounded-sm border border-transparent hover:border-plum/30 transition-all"
                    >
                        <IconLogout className="w-5 h-5" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-b border-white/[0.1]">
                <div className="flex items-center justify-between p-4">
                    <Link href="/app" className="flex items-center gap-2">
                        <span className="text-2xl font-serif-jp text-gold">心</span>
                        <span className="text-sm font-serif font-normal text-zinc-100">
                            The Kaishin Method
                        </span>
                    </Link>

                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-sm hover:bg-white/[0.05] border border-transparent hover:border-white/[0.1] transition-all"
                        aria-label="Toggle navigation menu"
                    >
                        {isSidebarOpen ? (
                            <IconX className="w-6 h-6 text-zinc-100" />
                        ) : (
                            <IconMenu2 className="w-6 h-6 text-zinc-100" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar */}
            {isSidebarOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        onClick={() => setIsSidebarOpen(false)}
                        className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-md z-40"
                    />

                    {/* Sidebar */}
                    <aside className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-black/95 border-r border-white/[0.1] z-50 overflow-y-auto backdrop-blur-2xl">
                        {/* Logo */}
                        <div className="p-6 border-b border-white/[0.1]">
                            <Link href="/app" className="flex items-center gap-3" onClick={() => setIsSidebarOpen(false)}>
                                <span className="text-4xl font-serif-jp text-gold">心</span>
                                <div>
                                    <h1 className="text-base font-serif font-normal text-zinc-100 leading-tight">
                                        The Kaishin Method
                                    </h1>
                                    <p className="text-xs text-zinc-400 font-sans">Member Portal</p>
                                </div>
                            </Link>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 p-4 space-y-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item.href);

                                return (
                                    <Link key={item.href} href={item.href} onClick={() => setIsSidebarOpen(false)}>
                                        <div
                                            className={cn(
                                                "flex items-center gap-3 px-4 py-3 rounded-sm transition-all relative border border-transparent",
                                                active
                                                    ? "bg-gold/10 text-gold border-gold/50 shadow-[0_0_20px_rgba(212,165,116,0.2)]"
                                                    : "text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.05] hover:border-white/[0.1]"
                                            )}
                                        >
                                            {active && (
                                                <div className="absolute left-0 w-1 h-8 bg-gold shadow-[0_0_10px_rgba(212,165,116,0.5)]" />
                                            )}
                                            <Icon className="w-5 h-5 flex-shrink-0" />
                                            <span className="font-sans font-normal">{item.name}</span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </nav>

                        {/* User Section & Logout */}
                        <div className="p-4 border-t border-white/[0.1] space-y-3">
                            {/* User Info */}
                            {user && (
                                <div className="flex items-center gap-3 px-4 py-3 rounded-sm bg-white/[0.05] border border-white/[0.1]">
                                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                                        {user.image ? (
                                            <img src={user.image} alt={user.name || "User"} className="w-full h-full rounded-full object-cover" />
                                        ) : (
                                            <span className="text-gold font-medium">{user.name?.charAt(0).toUpperCase() || "U"}</span>
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-zinc-100 truncate">
                                            {user.name || "Member"}
                                        </p>
                                        <p className="text-xs text-zinc-400 truncate">
                                            {user.email || "No email"}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="w-full justify-start text-plum hover:bg-plum/10 hover:border-plum/30 flex items-center gap-2 px-4 py-3 rounded-sm border border-transparent hover:border-plum/30 transition-all"
                            >
                                <IconLogout className="w-5 h-5" />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </aside>
                </>
            )
            }

            {/* Main Content */}
            <main className="flex-1 lg:ml-72">
                {/* Mobile top spacing */}
                <div className="lg:hidden h-16"></div>

                <div className="min-h-screen bg-black">
                    <div className="p-6 lg:p-8">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
