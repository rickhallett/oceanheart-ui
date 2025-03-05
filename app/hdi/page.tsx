"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip } from "react-tooltip";
import 'react-tooltip/dist/react-tooltip.css'
import Image from "next/image";
import Script from "next/script";

export default function HDIPage() {
  const targetTimestamp = 1741129521485 + (7 * 24 * 60 * 60 * 1000) + (7 * 60 * 60 * 1000) + (7 * 60 * 1000) + (7 * 1000);
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hrs: 0,
    mins: 0,
    secs: 0,
    expired: false
  });

  // State for HDI definitions from the database
  const [hdiDefinitions, setHdiDefinitions] = useState([
    "Human Digital Interface",
    "Higher Defiance Institute",
    "Hyperconsciousness Design Initiative",
    "Heart Data Integrated"
  ]);
  const [namesCount, setNamesCount] = useState(4);
  const [isLoading, setIsLoading] = useState(true);

  // State for the carousel
  const [currentDefinitionIndex, setCurrentDefinitionIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for right to left, -1 for left to right

  // State for terminal animation
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  // Add state for audio
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const terminalContent = [
    { prefix: "<span class='text-green-500'>hdi@oceanheart:~$</span> <span class='text-green-400'>", text: "./initialize.sh", suffix: "</span>" },
    { prefix: "<span class='text-green-500'>[INFO]</span> <span class='text-green-400'>", text: "Initializing HDI system components...", suffix: "</span>" },
    { prefix: "<span class='text-green-500'>[INFO]</span> <span class='text-green-400'>", text: "Loading neural interface modules...", suffix: "</span>" },
    { prefix: "<span class='text-green-500'>[INFO]</span> <span class='text-green-400'>", text: "Establishing connection to central node...", suffix: "</span>" },
    { prefix: "<span class='text-green-500'>[SUCCESS]</span> <span class='text-green-400'>", text: "Connection established.", suffix: "</span>" },
    // { prefix: "<span class='text-green-500'>hdi@oceanheart:~$</span> <span class='text-green-400'>", text: "", suffix: "</span>" }
  ];

  // Fetch HDI names from the API
  const fetchHDINames = async () => {
    try {
      const response = await fetch('/api/hdi/names');
      const data = await response.json();

      if (data.names && data.names.length > 0) {
        setHdiDefinitions(data.names);
        setNamesCount(data.names.length);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching HDI names:', error);
      setIsLoading(false);
    }
  };

  // Poll for new names
  useEffect(() => {
    fetchHDINames();

    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch('/api/hdi/names');
        const data = await response.json();

        if (data.count > namesCount) {
          setHdiDefinitions(data.names);
          setNamesCount(data.count);
        }
      } catch (error) {
        console.error('Error polling HDI names:', error);
      }
    }, 5000); // Poll every 5 secs

    return () => clearInterval(pollInterval);
  }, [namesCount]);

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

  // Effect for the carousel
  useEffect(() => {
    if (hdiDefinitions.length === 0) return;

    const carouselInterval = setInterval(() => {
      setDirection(1);
      setCurrentDefinitionIndex((prevIndex) =>
        prevIndex === hdiDefinitions.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(carouselInterval);
  }, [hdiDefinitions.length]);

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

  // Initialize audio
  useEffect(() => {
    const audioElement = new Audio('/audio/just_cant_wait_to_be_king.mp3');

    audioElement.addEventListener('loadedmetadata', () => {
      setDuration(audioElement.duration);
    });

    audioElement.addEventListener('timeupdate', () => {
      setProgress(audioElement.currentTime);
    });

    audioElement.addEventListener('ended', () => {
      setIsPlaying(false);
      setProgress(0);
    });

    setAudio(audioElement);

    return () => {
      audioElement.pause();
      audioElement.src = "";
    };
  }, []);

  // Handle play/pause
  const togglePlay = () => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  // Format time for display (mm:ss)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Handle seeking
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audio) return;
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setProgress(newTime);
  };

  const handleDownload = async () => {
    try {
      if (timeRemaining.expired) {
        window.location.href = "/api/hdi/download";
      } else {
      }
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  // Animation variants for the carousel
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0
    })
  };

  const loadingText = () => {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.5 }}
      >
        <div className="text-2xl font-bold opacity-50">Loading...</div>
      </motion.div>
    )
  }

  return (
    <>
      <div className="container mx-auto px-4 font-mono">
        <section className="text-center max-w-xl mx-auto mt-6 md:mt-12 mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.5 }}
          >
            <h1 className="font-extrabold lg:text-5xl opacity-60 tracking-tight mb-6 tracking-wide" style={{ fontSize: '5rem' }}>
              HDI
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.5 }}
          >
            <Image src="/images/hdi_logo_v01-2.png" alt="HDI Logo" width={300} height={300} className="mx-auto my-4" />
          </motion.div>

          {/* Carousel for h2 with id="hdi-carousel" */}
          <div id="hdi-carousel" className="h-12 relative mb-12">
            {isLoading ? (
              loadingText()
            ) : (
              <AnimatePresence initial={false} custom={direction}>
                <motion.h2
                  key={currentDefinitionIndex}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="text-2xl absolute w-full"
                >
                  {hdiDefinitions[currentDefinitionIndex]}
                </motion.h2>
              </AnimatePresence>
            )}
          </div>

          {/* Terminal emulation */}
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

          {/* Audio Player */}
          <div className="audio-player mb-12 bg-base-200 rounded-xl overflow-hidden shadow-lg">
            <div className="p-4 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <button
                  onClick={togglePlay}
                  className="bg-green-500 hover:bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors duration-200"
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="6" y="4" width="4" height="16"></rect>
                      <rect x="14" y="4" width="4" height="16"></rect>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                  )}
                </button>
                <div className="text-sm font-mono ml-4 flex-1">
                  <div className="font-bold text-green-500">HDI Radio</div>
                  <div className="text-xs opacity-70">March 2025: chart #1</div>
                </div>
                <div className="text-xs font-mono opacity-70">
                  {formatTime(progress)} / {formatTime(duration)}
                </div>
              </div>

              {/* Audio visualization/timeline */}
              <div className="relative h-8 w-full bg-black rounded overflow-hidden">
                {/* Progress bar */}
                <div className="absolute top-0 left-0 h-full bg-green-500 opacity-30" style={{ width: `${(progress / duration) * 100}%` }}></div>

                {/* Audio waveform visualization (static design) */}
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-around px-2">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 bg-green-400 rounded-full ${isPlaying ? 'animate-pulse' : ''}`}
                      style={{
                        height: `${Math.sin(i * 0.5) * 50 + 50}%`,
                        opacity: i < (progress / duration) * 40 ? 0.9 : 0.3,
                        animationDelay: `${i * 50}ms`
                      }}
                    ></div>
                  ))}
                </div>

                {/* Seek input */}
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={progress}
                  onChange={handleSeek}
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>

        </section>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.5 }}
        >

          <section className="text-center max-w-xl mx-auto mt-6 md:mt-12 mb-16 md:mb-24">
            <p className="text-md md:text-lg opacity-80 leading-relaxed mb-4">
              The next generation of human-computer interaction is almost here.
            </p>
            <p className="text-md md:text-lg opacity-80 leading-relaxed mb-4">
              The future is coming and soon the old world of the analogue and digital will become one.
            </p>
            <p className="text-md md:text-lg opacity-80 leading-relaxed mb-4">
              There's every chance you'll survive this transition. But then again, there's a chance you won't.
            </p>
            <p className="text-md md:text-lg opacity-80 leading-relaxed mb-4">
              It's really just a question of bandwidth. <em>How much data can you handle?</em>
            </p>
            <hr className="my-16 border-base-300" />
            <p className="text-md md:text-lg opacity-80 leading-relaxed mb-8">
              HDI will rewire your fundamental relationship with the machine <span className="font-bold">forever</span>.
            </p>
            <p className="text-md md:text-lg opacity-80 leading-relaxed mb-2 max-w-sm mx-auto">
              But to get to the root of the problem, we need to update the most important operating system of all: <span className="font-bold">your brain</span>.
            </p>
            <p className="text-sm md:text-md opacity-20 leading-relaxed mb-2 max-w-sm mx-auto mt-8">
              Do you think that's air you're breathing now?
            </p>

          </section>


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
                onClick={handleDownload}
                className="btn btn-outline btn-md text-md"
              >
                Download HDI v0.1
              </button>
              {!timeRemaining.expired && <Tooltip id="download-tooltip" place="top" delayShow={100} />}
            </div>
          </section>

          <section className="max-w-xl mx-auto">
            <h3 className="font-bold text-2xl lg:text-3xl tracking-tight mb-6 text-center">
              What is HDI?
            </h3>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDefinitionIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <p className="text-md md:text-lg opacity-80 leading-relaxed mb-6 mx-auto text-center">
                  {hdiDefinitions[currentDefinitionIndex]} (HDI)
                </p>
              </motion.div>
            </AnimatePresence>
            <p className="text-md md:text-lg opacity-80 leading-relaxed mb-12 mx-auto text-center">
              is a revolutionary technology of the mind, body and heart. Dilligently applied, it bridges the gap between human cognition, digital systems and beyond.
            </p>
            <p className="text-md md:text-lg opacity-80 leading-relaxed mb-20 max-w-sm mx-auto text-center">
              <em>"Digital actions will be the fundamental unit of all knowledge work. It all starts with the prompt - the prompt <em>is</em> <strong>you</strong>."</em>
            </p>
            <p className="text-md md:text-lg opacity-80 leading-relaxed mb-24 max-w-sm mx-auto text-center">
              <strong><em>In the end, it comes down to the man in the box.</em></strong>
            </p>
          </section>
        </motion.div>



      </div>
    </>
  );
}
