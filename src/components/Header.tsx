"use client";
import { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import ButtonSignin from "./ButtonSignin";
import logo from "@/app/icon.png"; // Consider updating if you have a new logo
import config from "@/config";

// UPDATED links to reflect new focus
const links: { href: string; label: string; className?: string }[] = [
  {
    href: "/#pricing", // Link to new pricing section
    label: "Offerings", // Renamed from Pricing
  },
  {
    href: "/about", // Keep 'Why Oceanheart?' or rename to 'About Kai' / 'My Approach'
    label: "Why Oceanheart?",
  },
  // Removed Somatic Bournemouth - too specific for main nav? Consider moving to Footer or separate page.
  {
    href: "https://www.oceanheart.blog/", // Keep Blog link
    label: "Blog",
  },
  {
    href: "/#contact", // Combine Consulting/Contact or keep separate if needed
    label: "Consulting / Contact", // UPDATED
    className: "hdi-nav-link relative",
  },
  // Removed /contact if combined above
];

const cta = (
  <Suspense fallback="Loading...">
    <ButtonSignin extraStyle="btn-primary" />
  </Suspense>
);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const { data: session } = useSession();

  // useEffect(() => {
  //   // Add HDI script loading if needed here
  // }, []);

  return (
    <header className="bg-base-200">
      <nav
        className="container flex items-center justify-between px-8 py-4 mx-auto"
        aria-label="Global"
      >
        {/* Your logo/name on large screens */}
        <div className="flex lg:flex-1">
          <Link
            className="flex items-center gap-2 shrink-0 "
            href="/"
            title={`${config.appName} homepage`} // Uses updated appName
          >
            <Image
              src={logo}
              alt={`${config.appName} logo`} // Uses updated appName
              className="w-8"
              priority={true}
              width={32}
              height={32}
            />
            <span className="font-extrabold text-lg">{config.appName}</span> {/* Uses updated appName */}
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
        {/* Consider if ButtonSignin is still the right primary CTA here, or maybe "Book a Call" */}
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
              className="flex items-center gap-2 shrink-0 "
              title={`${config.appName} homepage`}
              href="/"
            >
              <Image
                src={logo}
                alt={`${config.appName} logo`}
                className="w-8"
                priority={true}
                width={32}
                height={32}
              />
              <span className="font-extrabold text-lg">{config.appName}</span>
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