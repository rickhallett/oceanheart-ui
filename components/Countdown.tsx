"use client";

import React, { useState, useEffect, CSSProperties } from "react";

interface CountdownProps {
  enhanced?: boolean;
}

const Countdown: React.FC<CountdownProps> = ({ enhanced = false }) => {
  // Set the target date to Friday, February 28 at 05:00 GMT.
  // (Adjust the year if necessary.)
  const targetDate = new Date("2025-04-18T09:30:00Z");

  const [timeRemaining, setTimeRemaining] = useState<number>(
    targetDate.getTime() - new Date().getTime()
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(targetDate.getTime() - new Date().getTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  if (timeRemaining <= 0) {
    return (
      <div className="text-center text-white font-bold py-2">
        The countdown has ended!
      </div>
    );
  }

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  if (enhanced) {
    return (
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": days } as CSSProperties}></span>
          </span>
          days
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": hours } as CSSProperties}></span>
          </span>
          hours
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": minutes } as CSSProperties}></span>
          </span>
          min
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": seconds } as CSSProperties}></span>
          </span>
          sec
        </div>
      </div>
    );
  }

  return (
    <div className="text-center text-white font-bold py-2">
      {days}d {hours}h {minutes}m {seconds}s
    </div>
  );
};

export default Countdown;