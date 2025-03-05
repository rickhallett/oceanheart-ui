"use client";

import { useState, useEffect } from "react";

export default function AudioPlayer() {
  // State for audio
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

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

  return (
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
  );
}
