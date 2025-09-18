"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/icon.png";
import config from "@/config";
import { motion, AnimatePresence } from "motion/react";

const links = [
  { href: "/#pricing", label: "Offerings" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about-alt", label: "About Kai" },
  { href: "https://www.oceanheart.blog/", label: "Blog" },
  { href: "/consulting", label: "Consulting" },
  { href: "/synai", label: "Synai", className: "synai-nav-link" }
];

const getAppNameParts = () => {
  const parts = config.appName.split(" - ");
  return {
    mainTitle: parts[0] || config.appName,
    subtitle: parts[1] || "",
  };
};

const HeaderSimplified = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { mainTitle } = getAppNameParts();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-base-100/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}>
        <nav className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo}
              alt={`${mainTitle} logo`}
              className="w-8 h-8"
              priority={true}
              width={32}
              height={32}
            />
            <span className="font-bold text-lg hidden sm:block">{mainTitle}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base-content/80 hover:text-base-content transition-colors ${link.className || ''}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="https://calendar.app.google/85ZdaqYK5vfNk4aH9"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
            >
              Book a Call
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2"
            onClick={() => setIsOpen(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[60]"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 right-0 z-[70] w-full sm:max-w-sm bg-base-100 shadow-xl"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <Link href="/" onClick={() => setIsOpen(false)}>
                    <Image
                      src={logo}
                      alt={`${mainTitle} logo`}
                      className="w-8 h-8"
                      priority={true}
                      width={32}
                      height={32}
                    />
                  </Link>
                  <button
                    type="button"
                    className="p-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="space-y-4 mb-8">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block py-2 text-lg hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                {/* CTA Button */}
                <Link
                  href="https://calendar.app.google/85ZdaqYK5vfNk4aH9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Book a Call
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  );
};

export default HeaderSimplified;