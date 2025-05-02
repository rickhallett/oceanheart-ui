"use client";

import React, { useState, useEffect, CSSProperties } from "react";

interface TimerProps {
  enhanced?: boolean;
}

const Timer: React.FC<TimerProps> = ({ enhanced = false }) => {
  // Reset the start date to now (current time)
  const [startDate] = useState<Date>(new Date());

  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeElapsed(new Date().getTime() - startDate.getTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [startDate]);

  const days = Math.floor(timeElapsed / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeElapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (timeElapsed % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor((timeElapsed % (1000 * 60)) / 1000);

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

export default Timer; 