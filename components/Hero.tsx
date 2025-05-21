"use client";

import Image from "next/image";
import config from "@/config";
import Link from "next/link";

const Hero = () => {

  return (
    <>
      <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
        <div className="flex flex-col gap-10 items-center justify-center text-center w-full lg:w-1/2">

          {/* Headline */}
          <h1 className="font-extrabold text-4xl lg:text-6xl tracking-tight">
            Conscious AI Integration: <span className="text-blue-400 glow-blue">Your Human Edge, Amplified.</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-lg opacity-80 leading-relaxed">
            Overwhelmed by AI&apos;s pace? Master it with heart, clarity, and Kai&apos;s unique guidance.
          </p>

          {/* Framework Snapshot */}
          <div className="flex flex-col gap-6 items-center w-full mt-4">
            <p className="text-lg opacity-80 leading-relaxed">
              <span className="font-bold">Amplified <span className="text-blue-400 glow-blue">Consciousness</span></span>
            </p>
            <p className="text-lg opacity-80 leading-relaxed">
              <span className="font-bold">Amplified <span className="text-blue-400 glow-blue">Sensitivity</span></span>
            </p>
            <p className="text-lg opacity-80 leading-relaxed">
              <span className="font-bold">Amplified <span className="text-blue-400 glow-blue">Intelligence</span></span>
            </p>
          </div>

          {/* Primary CTA */}
          <a href="https://calendar.app.google/85ZdaqYK5vfNk4aH9"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-wide mt-4">
            Integrate AI Now
          </a>

          {/* Secondary CTA */}
          <Link href="/about-alt" className="link link-hover text-blue-400 glow-blue mt-2">
            Learn about Kai →
          </Link>

        </div>
        {/* Image Section zoom in */}
        <div className="lg:w-1/2 flex justify-center items-center">
          <div className="image-container">
            <Image
              src="/images/greece_profile2.jpeg"
              alt="Kai - Conscious AI Integration Specialist"
              className="kai-image"
              priority={true}
              width={500}
              height={500}
              style={{
                transform: "scale(1.2)",
                transformOrigin: "center",
                transition: "transform 0.5s ease-in-out",
              }}
            />
          </div>
        </div>
      </section>

      {/* Ethical Mirror Quote Section
      <section className="max-w-5xl mx-auto my-16 px-8">
        <div className="quote-container relative py-12 px-8 bg-opacity-5 bg-blue-400 backdrop-blur-sm rounded-lg border border-blue-400 border-opacity-10">
          <div className="absolute top-6 left-8 opacity-20 text-6xl text-blue-400">&quot;</div>
          <div className="text-center">
            <blockquote className="text-xl md:text-2xl font-light text-gray-100 opacity-50 leading-relaxed">
              <p className="mb-2">&quot;AI isn&apos;t a lottery ticket—it&apos;s a mirror.</p>
              <p className="mb-2">The sooner you look, the sooner you adjust the reflection.</p>
              <p>Wait too long, and you&apos;re stuck wearing yesterday&apos;s face.&quot;</p>
            </blockquote>
          </div>
          <div className="absolute bottom-6 right-8 opacity-20 text-6xl text-blue-400">&quot;</div>
        </div>
      </section> */}

      <style jsx global>{`
        .glow-blue {
          position: relative;
          color: #60a5fa;
          text-shadow: 0 0 10px rgba(96, 165, 250, 0.47), 0 0 17px rgba(96, 165, 250, 0.33);
          animation: pulse 3s infinite alternate;
        }
        
        @keyframes pulse {
          0% {
            text-shadow: 0 0 10px rgba(96, 165, 250, 0.47), 0 0 17px rgba(96, 165, 250, 0.33);
          }
          100% {
            text-shadow: 0 0 13px rgba(96, 165, 250, 0.6), 0 0 23px rgba(37, 99, 235, 0.47), 0 0 27px rgba(37, 99, 235, 0.27);
          }
        }

        .quote-container {
          box-shadow: 0 0 40px rgba(96, 165, 250, 0.1);
          transition: all 0.5s ease;
        }
        
        .quote-container:hover {
          box-shadow: 0 0 60px rgba(96, 165, 250, 0.2);
        }
        
        .image-container {
          position: relative;
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
          overflow: hidden;
        }
        
        .kai-image {
          width: 100%;
          max-width: 100%;
          border-radius: 0.5rem;
          mask-image: radial-gradient(circle at center, black 85%, transparent 100%);
          -webkit-mask-image: radial-gradient(circle at center, black 85%, transparent 100%);
        }
      `}</style>
    </>
  );
};

export default Hero; 