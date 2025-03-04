"use client";

import { useState, useEffect } from "react";
import config from "@/config";
import { getSEOTags } from "@/libs/seo";

// Set metadata for SEO
export const metadata = getSEOTags({
  title: `${config.appName} HDI - Human Digital Interface`,
  description: "Download the first version of our Human Digital Interface technology",
  canonicalUrlRelative: "/hdi",
});

export default function HDIPage() {
  const targetTimestamp = 1741129521485 + (7 * 24 * 60 * 60 * 1000) + (7 * 60 * 60 * 1000) + (7 * 60 * 1000) + (7 * 1000);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = Date.now();
      const difference = targetTimestamp - now;
      
      if (difference <= 0) {
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          expired: true
        });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeRemaining({
        days,
        hours,
        minutes,
        seconds,
        expired: false
      });
    };
    
    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);
    
    return () => clearInterval(timer);
  }, [targetTimestamp]);

  const handleDownload = async () => {
    try {
      window.location.href = "/api/hdi/download";
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <>
      <section className="text-center max-w-xl mx-auto mt-12 mb-24 md:mb-32">
        <h1 className="font-extrabold text-3xl lg:text-5xl tracking-tight mb-6">
          Human Digital Interface
        </h1>
        <p className="text-lg opacity-80 leading-relaxed">
          The next generation of human-computer interaction is almost here. Our HDI technology will change how you interact with digital systems forever.
        </p>
      </section>

      <section className="mb-24 md:mb-32">
        <h3 className="font-bold text-2xl lg:text-3xl tracking-tight mb-6">
          Countdown to v0.1 Release
        </h3>
        
        <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
          <div className="bg-base-200 p-6 rounded-xl text-center">
            <div className="text-4xl font-bold">{timeRemaining.days}</div>
            <div className="text-sm opacity-70">Days</div>
          </div>
          <div className="bg-base-200 p-6 rounded-xl text-center">
            <div className="text-4xl font-bold">{timeRemaining.hours}</div>
            <div className="text-sm opacity-70">Hours</div>
          </div>
          <div className="bg-base-200 p-6 rounded-xl text-center">
            <div className="text-4xl font-bold">{timeRemaining.minutes}</div>
            <div className="text-sm opacity-70">Minutes</div>
          </div>
          <div className="bg-base-200 p-6 rounded-xl text-center">
            <div className="text-4xl font-bold">{timeRemaining.seconds}</div>
            <div className="text-sm opacity-70">Seconds</div>
          </div>
        </div>

        <div className="text-center">
          <button 
            onClick={handleDownload}
            disabled={!timeRemaining.expired}
            className={`btn btn-lg ${timeRemaining.expired ? 'btn-primary' : 'btn-disabled'}`}
          >
            {timeRemaining.expired ? 'Download v0.1' : 'Coming Soon'}
          </button>
        </div>
      </section>

      <section>
        <h3 className="font-bold text-2xl lg:text-3xl tracking-tight mb-6">
          What is HDI?
        </h3>
        <p className="text-lg opacity-80 leading-relaxed mb-8">
          Human Digital Interface (HDI) is our revolutionary technology that bridges the gap between human cognition and digital systems. Unlike traditional interfaces that require physical interaction, HDI creates a seamless connection between your thoughts and digital actions.
        </p>
        
        <h3 className="font-bold text-2xl lg:text-3xl tracking-tight mb-6">
          Key Features
        </h3>
        <ul className="list-disc pl-6 text-lg opacity-80 leading-relaxed mb-8">
          <li>Direct neural-digital communication</li>
          <li>Zero latency response time</li>
          <li>Intuitive thought-based navigation</li>
          <li>Adaptive learning algorithms</li>
          <li>Privacy-first architecture</li>
        </ul>
      </section>
    </>
  );
}
