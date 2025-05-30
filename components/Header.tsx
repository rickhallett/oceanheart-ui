"use client";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import AuthButton from "@/components/AuthButton";
import logo from "@/app/icon.png"; // Consider updating if you have a new logo
import config from "@/config";

// Links reflecting "The Art of Personal AI" focus
const links: { href: string; label: string; className?: string }[] = [
  {
    href: "/#pricing",
    label: "Offerings",
  },
  {
    href: "/about-alt",
    label: "About Kai",
  },
  {
    href: "https://www.oceanheart.blog/",
    label: "Blog",
  },
  {
    href: "/consulting",
    label: "Consulting",
  },
  {
    href: "/synai",
    label: "Synai",
    className: "synai-nav-link",
  }
];

const cta = (
  <Suspense fallback="Loading...">
    <Link
      href="https://calendar.app.google/85ZdaqYK5vfNk4aH9"
      className="btn btn-primary"
    >
      Book a Call
    </Link>
  </Suspense>
);

// Function to split appName into main title and subtitle
const getAppNameParts = () => {
  // Split the appName at the hyphen if it exists
  const parts = config.appName.split(" - ");
  return {
    mainTitle: parts[0] || config.appName, // First part or full name if no hyphen
    subtitle: parts[1] || "", // Second part or empty if no hyphen
  };
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mainTitle, subtitle } = getAppNameParts();

  return (
    <header className="bg-base-200">
      <nav
        className="container flex items-center justify-between px-8 py-4 mx-auto"
        aria-label="Global"
      >
        {/* Your logo/name on large screens */}
        <div className="flex lg:flex-1">
          <Link
            className="flex items-center gap-2 shrink-0"
            href="/"
            title={config.appName}
          >
            <Image
              src={logo}
              alt={`${mainTitle} logo`}
              className="w-8"
              priority={true}
              width={32}
              height={32}
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-lg">{mainTitle}</span>
              {subtitle && (
                <span className="text-xs">{subtitle}</span>
              )}
            </div>
          </Link>
        </div>
        {/* Burger button to open menu on mobile */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
            onClick={() => setIsOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-base-content"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        {/* Your links on large screens */}
        <div className="hidden lg:flex lg:justify-center lg:gap-12 lg:items-center">
          {links.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              // Removed specific HDI styling unless needed
              className={`link link-hover ${link.className || ''}`}
              title={link.label}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA on large screens */}
        <div className="hidden lg:flex lg:justify-end lg:flex-1">{cta}</div>
      </nav>

      {/* Mobile menu */}
      <div className={`relative z-50 ${isOpen ? "" : "hidden"}`}>
        <div
          className={`fixed inset-y-0 right-0 z-10 w-full px-8 py-4 overflow-y-auto bg-base-200 sm:max-w-sm sm:ring-1 sm:ring-neutral/10 transform origin-right transition ease-in-out duration-300`}
        >
          {/* Your logo/name on small screens */}
          <div className="flex items-center justify-between">
            <Link
              className="flex items-center gap-2 shrink-0"
              title={config.appName}
              href="/"
            >
              <Image
                src={logo}
                alt={`${mainTitle} logo`}
                className="w-8"
                priority={true}
                width={32}
                height={32}
              />
              <div className="flex flex-col">
                <span className="font-extrabold text-lg">{mainTitle}</span>
                {subtitle && (
                  <span className="text-xs">{subtitle}</span>
                )}
              </div>
            </Link>
            {/* Close button */}
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5"
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

          {/* Your links on small screens */}
          <div className="flow-root mt-6">
            <div className="py-4">
              <div className="flex flex-col gap-y-4 items-start">
                {links.map((link) => (
                  <Link
                    href={link.href}
                    key={link.href}
                    className={`link link-hover ${link.className || ''}`}
                    title={link.label}
                    onClick={() => setIsOpen(false)} // Close menu on link click
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="divider"></div>
            {/* Your CTA on small screens */}
            <div className="flex flex-col" onClick={() => setIsOpen(false)}>{cta}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 