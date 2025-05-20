"use client";

import Image from "next/image";
import config from "@/config";
import Link from "next/link";

const Hero = () => {

  return (
    <>
      <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
        <div className="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">

          {/* Headline */}
          <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
            Conscious AI Integration: <span className="text-blue-400">Your Human Edge, Amplified.</span>
          </h1>
          
          {/* Sub-headline */}
          <p className="text-lg opacity-80 leading-relaxed">
            Overwhelmed by AI's pace? Master it with heart, clarity, and Kai's unique guidance.
          </p>

          {/* Framework Snapshot */}
          <div className="flex flex-col gap-2 items-center lg:items-start">
            <p className="text-lg opacity-80 leading-relaxed">
              <span className="font-bold">Story · Spirit · Science</span> → Amplified Consciousness
            </p>
            <p className="text-lg opacity-80 leading-relaxed">
              <span className="font-bold">Prompt · Context · Model</span> → Amplified Sensitivity
            </p>
            <p className="text-lg opacity-80 leading-relaxed">
              <span className="font-bold">IQ · EQ · AI</span> → Amplified Intelligence
            </p>
          </div>

          {/* Primary CTA */}
          <a href="https://calendar.app.google/85ZdaqYK5vfNk4aH9" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-wide">
            Integrate AI Now
          </a>
          
          {/* Secondary CTA */}
          <Link href="/about" className="link link-hover text-blue-400 mt-2">
            Learn about Kai →
          </Link>

        </div>
        {/* Image Section */}
        <div className="lg:w-full flex justify-center items-center">
          <Image
            src="/images/kai_profile.jpeg"
            alt="Kai - Conscious AI Integration Specialist"
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