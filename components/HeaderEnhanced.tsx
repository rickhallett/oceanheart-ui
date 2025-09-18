"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/app/icon.png";
import config from "@/config";
import { cn } from "@/lib/utils";

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

const HeaderEnhanced = () => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { mainTitle, subtitle } = getAppNameParts();

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;
      
      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.header
          initial={{ opacity: 1, y: -100 }}
          animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-transparent rounded-full bg-base-100 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
            "backdrop-blur-lg bg-opacity-90"
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo}
              alt={`${mainTitle} logo`}
              className="w-6 h-6"
              priority={true}
              width={24}
              height={24}
            />
            <span className="font-bold text-sm hidden sm:block">{mainTitle}</span>
          </Link>

          {/* Navigation Links - Hidden on mobile */}
          <nav className="hidden md:flex items-center justify-center space-x-4">
            {links.map((link, idx) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-base-content/60 hover:text-base-content transition-colors text-sm font-medium relative",
                  link.className
                )}
              >
                <span className="relative z-20">{link.label}</span>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <Link
            href="https://calendar.app.google/85ZdaqYK5vfNk4aH9"
            target="_blank"
            rel="noopener noreferrer"
            className="border text-sm font-medium relative border-base-content/[0.2] text-base-content px-4 py-2 rounded-full hover:bg-primary hover:text-primary-content transition-colors hidden sm:block"
          >
            <span>Book a Call</span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-primary to-transparent h-px" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-2 md:hidden hover:bg-base-200 transition-colors"
            onClick={() => setIsOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </motion.header>
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-[4999]"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-[5001] w-full sm:max-w-sm bg-base-100 shadow-xl"
            >
              <div className="px-6 py-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <Link
                    href="/"
                    className="flex items-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <Image
                      src={logo}
                      alt={`${mainTitle} logo`}
                      className="w-8 h-8"
                      priority={true}
                      width={32}
                      height={32}
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-lg">{mainTitle}</span>
                      {subtitle && <span className="text-xs opacity-70">{subtitle}</span>}
                    </div>
                  </Link>

                  {/* Close Button */}
                  <button
                    type="button"
                    className="rounded-full p-2 hover:bg-base-200 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
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
                <nav className="flex flex-col space-y-4">
                  {links.map((link, idx) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={cn(
                          "block px-4 py-3 text-base font-medium rounded-lg hover:bg-base-200 transition-colors",
                          link.className
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-8"
                >
                  <Link
                    href="https://calendar.app.google/85ZdaqYK5vfNk4aH9"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    Book a Call
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-20" />
    </>
  );
};

export default HeaderEnhanced;