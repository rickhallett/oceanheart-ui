'use client';

import React, { useEffect } from 'react';
import Image from "next/image";

// Define the content
const headline = "The Art of Personal AI: Conscious AI Integration";
const subheadline = "Stop Drowning in AI Courses: Get Clear, Actionable AI Guidance Now";
const introParagraph = "The era of intimate human-AI cooperation isn't coming, it's here. You needed to understand this yesterday. Are you still drowning in endless AI courses, feeling lost and overwhelmed by technical jargon?";
const aboutArtOfPersonalAI = "As a psychotherapist and engineer of a different path, I help you cut through the clutter and understand AI's fundamental core – which is not so different from your own – turning it into your intuitive, universal translator. This isn't about another course; it's about true understanding that unleashes your ability to leverage AI effectively.";
const artOfPersonalAICreated = "That's why I created The Art of Personal AI, my unique framework for Conscious AI Integration for AI & You. We go beyond surface-level tactics to:";
const listItems = [
  "Attune your Consciousness",
  "Embody your lived Sensitivity",
  "Amplify your Intelligence"
];
const integratedApproach = "This integrated approach fuses deep human understanding with technological power, helping you overcome emotional bottlenecks and turning AI overwhelm into fluent skill-building. It's about unlocking your capacity to 10x your ability to leverage AI with genuine insight.";
const callToActionFinal = "Ready to stop drowning and start consciously creating with AI? Drop me an email to book your discovery call. Let's unlock The Art of Personal AI for you.";

// Main component
export default function LandingHero() {
  return (
    <>
      <style jsx>{`
        @keyframes burn {
          0% { text-shadow: 0 0 4px #ff3, 0 0 11px #ff3, 0 0 19px #ff3, 0 0 40px #ff5722, 0 0 80px #ff5722, 0 0 90px #ff5722, 0 0 100px #ff5722, 0 0 150px #ff5722; }
          20% { text-shadow: 0 0 4px #ff5, 0 0 10px #ff5, 0 0 18px #ff5, 0 0 38px #ff5722, 0 0 73px #ff5722, 0 0 80px #ff5722, 0 0 94px #ff5722, 0 0 140px #ff5722; }
          40% { text-shadow: 0 0 4px #ff8, 0 0 11px #ff8, 0 0 19px #ff8, 0 0 40px #ff5722, 0 0 80px #ff5722, 0 0 90px #ff5722, 0 0 100px #ff5722, 0 0 150px #ff5722; }
          60% { text-shadow: 0 0 4px #ffa, 0 0 10px #ffa, 0 0 18px #ffa, 0 0 38px #ff5722, 0 0 73px #ff5722, 0 0 80px #ff5722, 0 0 94px #ff5722, 0 0 140px #ff5722; }
          80% { text-shadow: 0 0 4px #ff3, 0 0 11px #ff3, 0 0 19px #ff3, 0 0 40px #ff5722, 0 0 80px #ff5722, 0 0 90px #ff5722, 0 0 100px #ff5722, 0 0 150px #ff5722; }
          100% { text-shadow: 0 0 4px #ff5, 0 0 10px #ff5, 0 0 18px #ff5, 0 0 38px #ff5722, 0 0 73px #ff5722, 0 0 80px #ff5722, 0 0 94px #ff5722, 0 0 140px #ff5722; }
        }
        .burning-text {
          animation: burn 1.5s infinite alternate;
          position: relative;
          color: #ff4500;
          font-weight: bold;
          display: inline-block;
          transform: perspective(400px) rotateX(10deg);
        }
        .burning-text::after {
          content: '';
          position: absolute;
          top: -2px;
          left: -4px;
          right: -4px;
          bottom: -2px;
          background: radial-gradient(ellipse at center, rgba(255,69,0,0.2) 0%, rgba(255,69,0,0) 70%);
          z-index: -1;
          border-radius: 50%;
          filter: blur(8px);
        }
        
        .ethereal-text {
          background: linear-gradient(135deg, #60a5fa, #93c5fd);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
          font-weight: 500;
          letter-spacing: 0.5px;
        }
        
        .ethereal-text::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -3px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.6), transparent);
        }
      `}</style>

      <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-12 lg:py-24">
        <div className="flex flex-col gap-8 lg:gap-10 items-center justify-center text-center lg:text-left lg:items-start">
          {/* Headline Section */}
          <div className="relative">
            <h1 className="font-extrabold text-5xl lg:text-6xl tracking-tight relative z-10">
              <span className="text-blue-400">The Art of Personal AI:</span>
              <br />
              Conscious AI Integration
            </h1>
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-base-200 rounded-full opacity-50 blur-xl z-0"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-100 rounded-full opacity-30 blur-xl z-0"></div>
          </div>

          {/* Subheadline */}
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-blue-500 relative z-10">
            <span className="burning-text">Stop drowning</span> in AI courses
          </h2>

          {/* Intro Paragraph */}
          <p className="text-xl max-w-2xl relative z-10">
            {introParagraph}
          </p>

          {/* About The Art of Personal AI */}
          <p className="text-xl max-w-2xl relative z-10 font-medium">
            {aboutArtOfPersonalAI}
          </p>

          {/* Why The Art of Personal AI was created */}
          <p className="text-xl max-w-2xl relative z-10 font-semibold">
            {artOfPersonalAICreated}
          </p>

          {/* List Items */}
          <ul className="list-disc list-inside text-xl max-w-2xl relative z-10 space-y-2 pl-4">
            {listItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          {/* Integrated Approach */}
          <p className="text-xl max-w-2xl relative z-10">
            {integratedApproach}
          </p>

          {/* Final Call to Action within hero content */}
          <p className="text-xl max-w-2xl relative z-10 font-medium">
            {callToActionFinal}
          </p>

          {/* Bio Section - Reorganized for more impact */}
          <div className="flex flex-col gap-3 border-l-4 border-blue-400 pl-4 py-2 relative z-10">
            <p className="text-xl font-semibold">
              Rick &quot;Kai&quot; Hallett
            </p>
            <p className="text-md opacity-80 font-medium">
              Helping Leaders Navigate the AI Revolution
            </p>
            <p className="text-md opacity-80">
              Psychotherapist & Software Engineer
            </p>
          </div>

          {/* Pain Points Section */}
          <div id="value-proposition" className="relative z-10 max-w-2xl">
            <h3 className="font-bold text-2xl mb-6 text-blue-400">Escape Tutorial <span className="burning-text">Hell</span></h3>

            <div className="grid gap-6 mb-6">
              <div className="flex flex-col gap-1">
                <h4 className="font-semibold text-lg">Overwhelmed by the Pace?</h4>
              </div>

              <div className="flex flex-col gap-1">
                <h4 className="font-semibold text-lg">Want to Use AI, Not Be Used By It?</h4>
              </div>

              <div className="flex flex-col gap-1">
                <h4 className="font-semibold text-lg">Seeking Human-Centered Guidance?</h4>
              </div>
            </div>
          </div>

          {/* Where I Come In Section */}
          <div className="mt-6 relative z-10 max-w-2xl text-center mx-auto">
            <h3 className="font-bold text-3xl mb-6 text-blue-400">
              This is where I come in:
            </h3>
            <p className="font-medium mb-4 text-xl">
              I&apos;m your <span className="ethereal-text">navigator and curator</span> in the AI space. I help you:
            </p>
            <ul className="list-none pl-0 space-y-3">
              <li className="text-lg">Understand the rapidly changing AI landscape.</li>
              <li className="text-lg">Adapt your skills and mindset.</li>
              <li className="text-lg">Apply AI tools meaningfully and ethically.</li>
              <li className="text-lg">Thrive with confidence in an AI-driven future.</li>
            </ul>
          </div>
        </div>

        <div className="lg:w-2/5 relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-50 rounded-full opacity-40 blur-xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-base-200 rounded-full opacity-50 blur-xl"></div>
          <Image
            src="/images/Transparent Logo.png"
            alt="Richard Hallett"
            className="w-full rounded-xl relative z-10"
            priority={true}
            width={500}
            height={500}
          />
        </div>
      </section>

      {/* CTA Section - Now in a centered card */}
      <section className="max-w-3xl mx-auto px-8 py-12">
        <div className="bg-base-100 shadow-lg rounded-xl p-8 text-center border border-blue-100">
          <h3 className="text-3xl font-semibold mb-4 text-blue-400">Ready to Make Sense of AI? Let&apos;s Talk.</h3>
          <p className="text-xl mb-6">Book a Free 20-Minute Clarity Call</p>
          <a
            href="/schedule?utm_campaign=landing_test"
            id="schedule-call-button"
            className="btn btn-primary btn-lg shadow-md hover:shadow-lg transition-all duration-300 px-8"
          >
            Schedule Your Free Call Now
          </a>
          <p className="text-sm mt-4 opacity-80 max-w-lg mx-auto">
            No obligation, just a chance to see how I can help you navigate the AI revolution. Choose a time that works for you, or send me a written message if you prefer.
          </p>
        </div>
      </section>
    </>
  );
} 