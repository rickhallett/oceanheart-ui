"use client";

import { useState, useEffect } from "react";

export default function TerminalEmulation() {
  // State for terminal animation
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const terminalContent = [
    { prefix: "<span class='text-green-500'>hdi@oceanheart:~$</span> <span class='text-green-400'>", text: "./initialize.sh", suffix: "</span>" },
    { prefix: "<span class='text-green-500'>[INFO]</span> <span class='text-green-400'>", text: "Initializing HDI system components...", suffix: "</span>" },
    { prefix: "<span class='text-green-500'>[INFO]</span> <span class='text-green-400'>", text: "Loading neural interface modules...", suffix: "</span>" },
    { prefix: "<span class='text-green-500'>[INFO]</span> <span class='text-green-400'>", text: "Establishing connection to central node...", suffix: "</span>" },
    { prefix: "<span class='text-green-500'>[SUCCESS]</span> <span class='text-green-400'>", text: "Connection established.", suffix: "</span>" },
    // { prefix: "<span class='text-green-500'>hdi@oceanheart:~$</span> <span class='text-green-400'>", text: "", suffix: "</span>" }
  ];

  // Effect to start terminal animation on component mount
  useEffect(() => {
    let isMounted = true;
    let timeouts: NodeJS.Timeout[] = [];

    const animateTerminal = async () => {
      // Clear any existing lines
      setTerminalLines([]);

      // Process each line with a delay
      for (let i = 0; i < terminalContent.length; i++) {
        const line = terminalContent[i];

        // Type each character of the current line
        let displayedText = line.prefix;
        for (let j = 0; j <= line.text.length; j++) {
          if (!isMounted) return;

          // Add next character
          const newText = line.prefix + line.text.substring(0, j) + line.suffix;

          // Update with small delay
          await new Promise<void>(resolve => {
            const timeout = setTimeout(() => {
              if (isMounted) {
                if (i === 0) {
                  // For first line, directly update the array
                  setTerminalLines([newText]);
                } else {
                  // For subsequent lines, append to existing lines
                  setTerminalLines(prev => {
                    const newLines = [...prev];
                    if (newLines.length > i) {
                      newLines[i] = newText;
                    } else {
                      newLines.push(newText);
                    }
                    return newLines;
                  });
                }
              }
              resolve();
            }, Math.random() * 50);
            timeouts.push(timeout as NodeJS.Timeout);
          });
        }

        // Pause between lines
        if (i < terminalContent.length - 1) {
          await new Promise<void>(resolve => {
            const timeout = setTimeout(resolve, 300);
            timeouts.push(timeout as NodeJS.Timeout);
          });
        }
      }

      // Animation complete
      if (isMounted) {
        setIsAnimationComplete(true);
      }
    };

    animateTerminal();

    // Cleanup function
    return () => {
      isMounted = false;
      timeouts.forEach(clearTimeout);
    };
  }, []);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="terminal-container mb-12 rounded-xl overflow-hidden shadow-lg">
      <div className="terminal-header bg-gray-800 p-2 flex items-center">
        <div className="terminal-button bg-red-500 rounded-full w-3 h-3 mr-2"></div>
        <div className="terminal-button bg-yellow-500 rounded-full w-3 h-3 mr-2"></div>
        <div className="terminal-button bg-green-500 rounded-full w-3 h-3"></div>
        <div className="terminal-title text-gray-400 text-xs ml-4">hdi@oceanheart:~</div>
      </div>
      <div className="terminal-body bg-black p-4 font-mono text-sm" style={{ minHeight: '200px' }}>
        {terminalLines.map((line, index) => (
          <div key={`line-${index}`} className="terminal-line" dangerouslySetInnerHTML={{ __html: line }} />
        ))}
        {isAnimationComplete && (
          <div className="terminal-line">
            <span className="text-green-500">hdi@oceanheart:~$</span>
            <span className={`text-green-400 ${showCursor ? 'terminal-cursor' : 'opacity-0'}`}>_</span>
          </div>
        )}
      </div>
    </div>
  );
}
