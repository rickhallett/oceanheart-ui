"use client";

import { useEffect, useState } from "react";

interface ASCIILogoProps {
  className?: string;
  animate?: boolean;
}

const ASCII_LOGO = `
                                 _                      _        _
  ___   ___ ___  __ _ _ __  | |__   ___  __ _ _ __| |_     __ _(_)
 / _ \\ / __/ _ \\/ _\` | '_ \\ | '_ \\ / _ \\/ _\` | '__| __|   / _\` | |
| (_) | (_|  __/ (_| | | | || | | |  __/ (_| | |  | |_ _ | (_| | |
 \\___/ \\___\\___|\\__,_|_| |_||_| |_|\\___|\\__,_|_|   \\__(_) \\__,_|_|
`;

const ASCII_LOGO_MINIMAL = `
  ___   ___ ___  __ _ _ __  | |__   ___  __ _ _ __| |_
 / _ \\ / __/ _ \\/ _\` | '_ \\ | '_ \\ / _ \\/ _\` | '__| __|
| (_) | (_|  __/ (_| | | | || | | |  __/ (_| | |  | |_
 \\___/ \\___\\___|\\__,_|_| |_||_| |_|\\___|\\__,_|_|   \\__|
`;

const ASCII_KAI = `
 _         _
| | ____ _(_)
| |/ / _\` | |
|   < (_| | |
|_|\\_\\__,_|_|
`;

export function ASCIILogo({ className = "", animate = true }: ASCIILogoProps) {
  const [displayedText, setDisplayedText] = useState(animate ? "" : ASCII_LOGO);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!animate) return;

    let currentIndex = 0;
    const text = ASCII_LOGO;

    const typeInterval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        // Keep cursor blinking after typing completes
        setTimeout(() => setShowCursor(true), 500);
      }
    }, 8); // Fast typing speed

    return () => clearInterval(typeInterval);
  }, [animate]);

  useEffect(() => {
    if (!animate) return;

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, [animate]);

  return (
    <div className={`font-terminal ${className}`}>
      <pre
        className="text-terminal-cyan text-[0.5rem] sm:text-xs md:text-sm leading-tight whitespace-pre"
        aria-label="oceanheart.ai"
      >
        {displayedText}
        {animate && showCursor && <span className="text-terminal-green">_</span>}
      </pre>
    </div>
  );
}

export function ASCIILogoMinimal({ className = "" }: { className?: string }) {
  return (
    <div className={`font-terminal ${className}`}>
      <pre
        className="text-terminal-cyan text-[0.4rem] sm:text-[0.5rem] md:text-xs leading-tight whitespace-pre"
        aria-label="oceanheart"
      >
        {ASCII_LOGO_MINIMAL}
      </pre>
    </div>
  );
}

export function ASCIIKai({ className = "" }: { className?: string }) {
  return (
    <div className={`font-terminal ${className}`}>
      <pre
        className="text-terminal-purple text-xs sm:text-sm leading-tight whitespace-pre"
        aria-label="kai"
      >
        {ASCII_KAI}
      </pre>
    </div>
  );
}
