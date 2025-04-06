"use client";

import Image from "next/image";
import ButtonSignin from "@/components/ButtonSignin"; // Keep if auth needed, or replace CTA
import config from "@/config";
import Link from "next/link";
// Removed unused imports (useEffect, useState, User, supabase) unless needed for ButtonSignin logic later
// import { FaRegSquareCaretDown } from "react-icons/fa6"; // Removed unless used
// Removed IntroVideo import unless you have a relevant video

const Hero = () => {
  // Removed user state unless ButtonSignin requires it and handles it

  return (
    <>
      <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
        <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">

          {/* UPDATED Headline */}
          <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
            Beyond the Hype: <span className="text-blue-400">Human-Centred AI</span>
          </h1>
          {/* UPDATED Subheadline */}
          <p className="text-lg opacity-80 leading-relaxed">
            Where technology meets the depths of <span className="italic text-blue-400">human wisdom and connection</span>
          </p>

          {/* UPDATED Value Proposition Points - Aligned with new positioning */}
          <p className="text-lg opacity-80 leading-relaxed -mt-4">
            Integrate AI with integrity, authenticity, and ethical grounding
          </p>
          <p className="text-lg opacity-80 leading-relaxed -mt-4">
            Learn from first principles, not trends—keep your expertise at the helm
          </p>
          <p className="text-lg opacity-80 leading-relaxed -mt-4">
            From <Link href="/about" className="text-blue-400 underline">Kai</Link>: a rare synthesis of psychotherapy, software engineering, and 25 years of contemplative practice
          </p>

          {/* UPDATED Primary CTA */}
          <a href="https://calendar.app.google/85ZdaqYK5vfNk4aH9" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-wide">
            Book a Discovery Conversation
          </a>
          {/* Secondary CTA */}
          <Link href="/#pricing" className="link link-hover text-blue-400 mt-2">
            Explore Guidance & Training Options
          </Link>

        </div>
        {/* Image Section */}
        <div className="lg:w-full flex justify-center items-center">
          <Image
            src="/images/placeholder_hero.png" // Placeholder path
            alt="The intersection of technology and human wisdom"
            className="w-full max-w-md lg:max-w-lg rounded-lg shadow-lg"
            priority={true}
            width={500}
            height={500}
          />
        </div>
      </section>
    </>
  );
};

export default Hero; 