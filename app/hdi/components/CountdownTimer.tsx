"use client";

import { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css';

interface CountdownTimerProps {
  onDownload: () => void;
}

export default function CountdownTimer({ onDownload }: CountdownTimerProps) {
  const targetTimestamp = 1741129521485 + (7 * 24 * 60 * 60 * 1000) + (7 * 60 * 60 * 1000) + (7 * 60 * 1000) + (7 * 1000);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hrs: 0,
    mins: 0,
    secs: 0,
    expired: false
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = Date.now();
      const difference = targetTimestamp - now;

      if (difference <= 0) {
        setTimeRemaining({
          days: 0,
          hrs: 0,
          mins: 0,
          secs: 0,
          expired: true
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hrs = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({
        days,
        hrs,
        mins,
        secs,
        expired: false
      });
    };

    calculateTimeRemaining();
    const timer = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(timer);
  }, [targetTimestamp]);

  return (
    <section className="mb-16 md:mb-18">
      <h3 className="font-bold text-2xl lg:text-3xl tracking-tight mb-6 text-center">
        Countdown to <span className="text-secondary">v0.1</span>
      </h3>

      <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto mb-12">
        <div className="bg-base-200 p-6 rounded-xl text-center">
          <div className="text-3xl md:text-4xl font-bold">{timeRemaining.days}</div>
          <div className="text-sm opacity-70">days</div>
        </div>
        <div className="bg-base-200 p-6 rounded-xl text-center">
          <div className="text-3xl md:text-4xl font-bold">{timeRemaining.hrs}</div>
          <div className="text-sm opacity-70">hrs</div>
        </div>
        <div className="bg-base-200 p-6 rounded-xl text-center">
          <div className="text-3xl md:text-4xl font-bold">{timeRemaining.mins}</div>
          <div className="text-sm opacity-70">mins</div>
        </div>
        <div className="bg-base-200 p-6 rounded-xl text-center">
          <div className="text-3xl md:text-4xl font-bold">{timeRemaining.secs}</div>
          <div className="text-sm opacity-70">secs</div>
        </div>
      </div>

      <div className="text-center">
        <button
          data-tooltip-id="download-tooltip"
          data-tooltip-content="Patience, grasshopper..."
          onClick={onDownload}
          className="btn btn-outline btn-md text-md"
        >
          Download HDI v0.1
        </button>
        {!timeRemaining.expired && <Tooltip id="download-tooltip" place="top" delayShow={100} />}
      </div>
    </section>
  );
}
