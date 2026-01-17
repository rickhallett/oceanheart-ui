"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconMenu2, IconX, IconBrandGithub } from "@tabler/icons-react";

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/cv", label: "CV" },
    { href: "/blog", label: "Blog" },
    { href: "/journal", label: "Journal" },
    { href: "/consulting", label: "Consulting" },
    { href: "/kai", label: "About" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-terminal-bg/90 backdrop-blur-xl border-b border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-terminal text-lg text-terminal-cyan group-hover:text-terminal-blue transition-colors">
            &gt;
          </span>
          <span className="font-terminal text-base sm:text-lg text-terminal group-hover:text-terminal-cyan transition-colors">
            oceanheart.ai
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-terminal text-sm transition-colors ${
                pathname === link.href
                  ? "text-terminal-cyan"
                  : "text-terminal-muted hover:text-terminal"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* GitHub + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://github.com/rickhallett"
            target="_blank"
            rel="noopener noreferrer"
            className="text-terminal-muted hover:text-terminal-cyan transition-colors p-2"
            aria-label="GitHub"
          >
            <IconBrandGithub className="w-5 h-5" />
          </a>
          <a
            href="https://calendar.app.google/RMwsbtUZ76G6VZzb7"
            target="_blank"
            rel="noopener noreferrer"
            className="font-terminal text-sm px-4 py-2 border border-terminal-cyan/30 text-terminal-cyan hover:bg-terminal-cyan/10 transition-all rounded-sm"
          >
            <span className="text-terminal-green mr-1">$</span> contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-terminal-muted hover:text-terminal"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <IconX className="w-6 h-6" />
          ) : (
            <IconMenu2 className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-terminal-bg/95 backdrop-blur-xl border-b border-white/[0.05] relative z-50"
            >
              <div className="px-6 py-4 space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block font-terminal text-sm transition-colors ${
                      pathname === link.href
                        ? "text-terminal-cyan"
                        : "text-terminal-muted hover:text-terminal"
                    }`}
                  >
                    <span className="text-terminal-green mr-2">$</span>
                    {link.label.toLowerCase()}
                  </Link>
                ))}
                <div className="pt-3 border-t border-white/[0.05] space-y-3">
                  <a
                    href="https://github.com/rickhallett"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 font-terminal text-sm text-terminal-muted hover:text-terminal-cyan transition-colors"
                  >
                    <IconBrandGithub className="w-5 h-5" />
                    github
                  </a>
                  <a
                    href="https://calendar.app.google/RMwsbtUZ76G6VZzb7"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block font-terminal text-sm text-center px-4 py-3 border border-terminal-cyan/30 text-terminal-cyan hover:bg-terminal-cyan/10 transition-all rounded-sm"
                  >
                    <span className="text-terminal-green mr-1">$</span> schedule_call
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
