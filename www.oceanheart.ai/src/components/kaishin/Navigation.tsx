"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconMenu2, IconX, IconBrandGithub } from "@tabler/icons-react";

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  // Determine if we're on an Oceanheart page
  const isOceanheartPage = ['/kai', '/consulting', '/portfolio', '/cv', '/blog'].some(path => pathname.startsWith(path));

  const navLinks = [
    { href: "/", label: "Home" },
    {
      label: "Kaishin Method",
      dropdown: [
        { href: "/path", label: "The Methodology" },
        { href: "/program", label: "90-Day Program" },
        { href: "/somatic", label: "Somatic Practice" },
      ]
    },
    { href: "/kai", label: "Private Sessions" },
    { href: "/consulting", label: "AI Consulting" },
    { href: "/portfolio", label: "Engineering Portfolio" },
    { href: "/cv", label: "CV" },
    { href: "/blog", label: "Blog" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/[0.1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
          <span className="text-2xl sm:text-3xl font-light text-gold font-serif-jp group-hover:scale-110 transition-transform">
            {isOceanheartPage ? '海' : '心'}
          </span>
          <span className="text-base sm:text-xl font-light font-serif text-zinc-100 group-hover:text-gold transition-colors whitespace-nowrap">
            {isOceanheartPage ? 'Oceanheart.ai' : 'The Kaishin Method'}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => {
            if ('dropdown' in link) {
              // Dropdown menu
              return (
                <div
                  key={index}
                  className="relative group"
                >
                  <button
                    onMouseEnter={() => setDropdownOpen(link.label)}
                    className="text-sm font-light tracking-wide transition-colors text-zinc-400 hover:text-gold flex items-center gap-1"
                  >
                    {link.label}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {dropdownOpen === link.label && link.dropdown && (
                    <div
                      className="absolute top-full left-0 mt-2 w-48 bg-charcoal/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl overflow-hidden"
                      onMouseEnter={() => setDropdownOpen(link.label)}
                      onMouseLeave={() => setDropdownOpen(null)}
                    >
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block px-4 py-3 text-sm transition-colors ${
                            pathname === item.href
                              ? "text-gold bg-white/5"
                              : "text-zinc-400 hover:text-gold hover:bg-white/5"
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            } else {
              // Regular link
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-light tracking-wide transition-colors ${
                    pathname === link.href
                      ? "text-gold"
                      : "text-zinc-400 hover:text-gold"
                  }`}
                >
                  {link.label}
                </Link>
              );
            }
          })}
        </div>

        {/* GitHub Link + CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://github.com/oceanheart-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-terminal-cyan transition-colors p-2"
            aria-label="GitHub"
          >
            <IconBrandGithub className="w-5 h-5" />
          </a>
          <Link
            href="/program#start"
            className="btn-primary"
          >
            Begin Your Journey
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-zinc-400 hover:text-zinc-100"
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
              className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/[0.1] relative z-50"
            >
              <div className="px-6 py-4 space-y-4">
                {navLinks.map((link, index) => {
                  if ('dropdown' in link && link.dropdown) {
                    // Dropdown menu for mobile
                    return (
                      <div key={index} className="space-y-2">
                        <div className="text-sm font-light tracking-wide text-zinc-500 uppercase text-xs">
                          {link.label}
                        </div>
                        <div className="pl-4 space-y-2">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={`block text-sm font-light tracking-wide transition-colors ${
                                pathname === item.href
                                  ? "text-gold"
                                  : "text-zinc-400 hover:text-gold"
                              }`}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  } else {
                    // Regular link for mobile
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block text-sm font-light tracking-wide transition-colors ${
                          pathname === link.href
                            ? "text-gold"
                            : "text-zinc-400 hover:text-gold"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  }
                })}
                <a
                  href="https://github.com/oceanheart-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm font-light tracking-wide text-zinc-400 hover:text-terminal-cyan transition-colors"
                >
                  <IconBrandGithub className="w-5 h-5" />
                  GitHub
                </a>
                <Link
                  href="/app"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary block w-full text-center mt-6"
                >
                  Member Portal
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
