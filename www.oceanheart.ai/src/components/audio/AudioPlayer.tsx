"use client";

/**
 * AudioPlayer Component
 * Custom audio player with waveform visualization, playback controls, and progress saving
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
  IconPlayerSkipBackFilled,
  IconPlayerSkipForwardFilled,
  IconVolume,
  IconVolumeOff,
  IconCheck,
} from '@tabler/icons-react';
import { formatDuration } from '@/lib/audio';
import { cn } from '@/lib/utils';

interface AudioPlayerProps {
  recordingId: string;
  audioUrl: string;
  title: string;
  initialProgress?: number; // in seconds
  initialCompleted?: boolean;
  onProgressUpdate?: (progress: number, completed: boolean) => void;
  className?: string;
}

export function AudioPlayer({
  recordingId,
  audioUrl,
  title,
  initialProgress = 0,
  initialCompleted = false,
  onProgressUpdate,
  className,
}: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(initialProgress);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompleted, setIsCompleted] = useState(initialCompleted);
  const [isLoading, setIsLoading] = useState(true);

  // Waveform bars for visualization
  const waveformBars = 40;

  // Initialize audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
    audio.playbackRate = playbackRate;

    if (initialProgress > 0) {
      audio.currentTime = initialProgress;
    }
  }, []);

  // Handle metadata loaded
  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;

    setDuration(audio.duration);
    setIsLoading(false);

    if (initialProgress > 0 && initialProgress < audio.duration) {
      audio.currentTime = initialProgress;
      setCurrentTime(initialProgress);
    }
  };

  // Handle time update
  const handleTimeUpdate = () => {
    if (!isDragging) {
      const audio = audioRef.current;
      if (audio) {
        setCurrentTime(audio.currentTime);
      }
    }
  };

  // Handle play/pause
  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      clearProgressInterval();
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
        startProgressInterval();
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    }
  };

  // Handle audio end
  const handleEnded = () => {
    setIsPlaying(false);
    clearProgressInterval();
    setIsCompleted(true);

    // Save completion
    if (onProgressUpdate && duration > 0) {
      onProgressUpdate(duration, true);
    }
  };

  // Skip backward/forward
  const skipBackward = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.max(0, audio.currentTime - 15);
      setCurrentTime(audio.currentTime);
    }
  };

  const skipForward = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Math.min(duration, audio.currentTime + 15);
      setCurrentTime(audio.currentTime);
    }
  };

  // Handle progress bar drag
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Handle volume change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);

    const audio = audioRef.current;
    if (audio) {
      audio.volume = newVolume;
    }
  };

  // Toggle mute
  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume || 0.5;
      setIsMuted(false);
      if (volume === 0) setVolume(0.5);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  // Change playback speed
  const changePlaybackRate = (rate: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  // Auto-save progress every 5 seconds
  const startProgressInterval = () => {
    if (progressInterval.current) return;

    progressInterval.current = setInterval(() => {
      const audio = audioRef.current;
      if (audio && onProgressUpdate) {
        onProgressUpdate(audio.currentTime, false);
      }
    }, 5000);
  };

  const clearProgressInterval = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearProgressInterval();
    };
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          skipBackward();
          break;
        case 'ArrowRight':
          e.preventDefault();
          skipForward();
          break;
        case 'ArrowUp':
          e.preventDefault();
          setVolume((v) => Math.min(1, v + 0.1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setVolume((v) => Math.max(0, v - 0.1));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, duration]);

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={cn('relative w-full', className)}>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={audioUrl}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        preload="metadata"
      />

      {/* Waveform Visualization */}
      <div className="mb-4 h-20 flex items-center justify-center gap-0.5 bg-white/[0.02] rounded p-3 border border-white/[0.05]">
        {Array.from({ length: waveformBars }).map((_, i) => {
          const isActive = i < (progressPercentage / 100) * waveformBars;
          const randomHeight = 30 + Math.random() * 70;

          return (
            <motion.div
              key={i}
              className={cn(
                'w-full rounded-full transition-all duration-300',
                isActive ? 'bg-ocean-blue shadow-[0_0_10px_rgba(79,195,247,0.5)]' : 'bg-white/10'
              )}
              style={{ height: `${randomHeight}%` }}
              animate={isPlaying && isActive ? {
                scaleY: [1, 1.2, 1],
              } : {}}
              transition={{
                duration: 0.5,
                repeat: isPlaying && isActive ? Infinity : 0,
                delay: i * 0.02,
              }}
            />
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div
          className="relative h-1.5 bg-white/10 rounded-full cursor-pointer group"
          onClick={handleProgressClick}
        >
          <motion.div
            className="absolute top-0 left-0 h-full bg-gold rounded-full shadow-[0_0_10px_rgba(242,204,143,0.6)]"
            style={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.1 }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-gold rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        </div>

        {/* Time Display */}
        <div className="flex justify-between items-center mt-1.5 text-xs text-zinc-400">
          <span>{formatDuration(currentTime)}</span>
          <span>{formatDuration(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mb-4">
        {/* Skip Backward */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={skipBackward}
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-ocean-blue/50 transition-all"
          aria-label="Skip backward 15 seconds"
          disabled={isLoading}
        >
          <IconPlayerSkipBackFilled className="w-4 h-4 text-zinc-300" />
        </motion.button>

        {/* Play/Pause */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlay}
          className="p-4 rounded-full bg-ocean-blue text-black hover:bg-ocean-blue/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={isPlaying ? 'Pause' : 'Play'}
          disabled={isLoading}
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="pause"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <IconPlayerPauseFilled className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="play"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <IconPlayerPlayFilled className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Skip Forward */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={skipForward}
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-ocean-blue/50 transition-all"
          aria-label="Skip forward 15 seconds"
          disabled={isLoading}
        >
          <IconPlayerSkipForwardFilled className="w-4 h-4 text-zinc-300" />
        </motion.button>
      </div>

      {/* Bottom Controls Row */}
      <div className="flex items-center justify-between gap-3">
        {/* Volume Control */}
        <div className="flex items-center gap-1.5 flex-1 max-w-[200px]">
          <button
            onClick={toggleMute}
            className="p-1.5 rounded hover:bg-white/5 transition-colors"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted || volume === 0 ? (
              <IconVolumeOff className="w-4 h-4 text-zinc-400" />
            ) : (
              <IconVolume className="w-4 h-4 text-zinc-400" />
            )}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="flex-1 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-ocean-blue"
            aria-label="Volume"
          />
        </div>

        {/* Playback Speed */}
        <div className="flex items-center gap-0.5">
          {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
            <button
              key={rate}
              onClick={() => changePlaybackRate(rate)}
              className={cn(
                'px-2 py-0.5 rounded text-xs font-medium transition-all',
                playbackRate === rate
                  ? 'bg-ocean-blue text-black'
                  : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-zinc-300'
              )}
            >
              {rate}x
            </button>
          ))}
        </div>

        {/* Completed Badge */}
        <AnimatePresence>
          {isCompleted && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="flex items-center gap-1 px-2 py-0.5 bg-jade/20 border border-jade/50 rounded-full text-jade text-xs font-medium"
            >
              <IconCheck className="w-3 h-3" />
              Completed
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
