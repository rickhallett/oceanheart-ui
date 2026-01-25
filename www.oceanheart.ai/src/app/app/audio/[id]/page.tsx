"use client";

/**
 * Audio Detail Page
 * Individual audio recording page with full player and details
 */

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  IconArrowLeft,
  IconHeadphones,
  IconClock,
  IconEye,
  IconLoader2,
  IconCalendar,
} from '@tabler/icons-react';
import { AudioPlayer } from '@/components/audio/AudioPlayer';
import {
  formatDuration,
  formatFileSize,
  parseTags,
  getCategoryDisplayName,
  getCategoryColor,
  type AudioWithProgress,
} from '@/lib/audio';
import { cn } from '@/lib/utils';

// Note: Authentication is currently disabled. Session features are commented out.

interface AudioDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function AudioDetailPage({ params }: AudioDetailPageProps) {
  const resolvedParams = use(params);
  // Auth disabled - user features removed
  const [recording, setRecording] = useState<AudioWithProgress | null>(null);
  const [relatedRecordings, setRelatedRecordings] = useState<AudioWithProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch recording
  useEffect(() => {
    fetchRecording();
  }, [resolvedParams.id]);

  const fetchRecording = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/audio/${resolvedParams.id}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Audio recording not found');
        }
        throw new Error('Failed to fetch recording');
      }

      const data = await response.json();
      setRecording(data.recording);

      // Fetch related recordings (same category)
      fetchRelatedRecordings(data.recording.category);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load audio recording');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRelatedRecordings = async (category: string) => {
    try {
      const response = await fetch(`/api/audio?category=${category}`);
      if (response.ok) {
        const data = await response.json();
        // Filter out current recording and limit to 3
        const related = data.recordings
          .filter((r: AudioWithProgress) => r.id !== resolvedParams.id)
          .slice(0, 3);
        setRelatedRecordings(related);
      }
    } catch (err) {
      console.error('Failed to fetch related recordings:', err);
    }
  };

  // Handle progress update
  const handleProgressUpdate = async (progressSeconds: number, completed: boolean) => {
    try {
      await fetch('/api/audio/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recordingId: resolvedParams.id,
          progressSeconds,
          completed,
        }),
      });
    } catch (err) {
      console.error('Failed to save progress:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <IconLoader2 className="w-12 h-12 text-ocean-blue animate-spin mx-auto mb-4" />
          <p className="text-zinc-400">Loading audio...</p>
        </div>
      </div>
    );
  }

  if (error || !recording) {
    return (
      <div className="max-w-2xl mx-auto mt-20">
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-zinc-100 mb-2">Error</h2>
          <p className="text-red-400 mb-6">{error || 'Recording not found'}</p>
          <Link href="/app/audio">
            <button className="px-6 py-3 bg-ocean-blue text-black rounded-lg font-semibold hover:bg-ocean-blue/90 transition-all">
              Back to Library
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const tags = parseTags(recording.tags);
  const categoryColor = getCategoryColor(recording.category);
  const createdDate = new Date(recording.created_at * 1000);

  return (
    <div className="max-w-5xl mx-auto">
      {/* Back Button */}
      <Link href="/app/audio">
        <motion.button
          whileHover={{ x: -4 }}
          className="flex items-center gap-2 text-zinc-400 hover:text-zinc-100 mb-6 transition-colors"
        >
          <IconArrowLeft className="w-5 h-5" />
          Back to Library
        </motion.button>
      </Link>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Player and Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                {/* Category Badge */}
                <div className="mb-3">
                  <span
                    className={cn(
                      'inline-block px-4 py-1.5 rounded-full text-sm font-medium border',
                      `bg-${categoryColor}/10 text-${categoryColor} border-${categoryColor}/30`
                    )}
                  >
                    {getCategoryDisplayName(recording.category)}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-3xl lg:text-4xl font-bold text-zinc-100 mb-3">
                  {recording.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
                  {recording.duration && (
                    <span className="flex items-center gap-1">
                      <IconClock className="w-4 h-4" />
                      {formatDuration(recording.duration)}
                    </span>
                  )}
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <IconEye className="w-4 h-4" />
                    {recording.listen_count} {recording.listen_count === 1 ? 'listen' : 'listens'}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <IconCalendar className="w-4 h-4" />
                    {createdDate.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            {recording.description && (
              <p className="text-zinc-300 leading-relaxed">{recording.description}</p>
            )}
          </div>

          {/* Audio Player */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6 lg:p-8">
            <AudioPlayer
              recordingId={recording.id}
              audioUrl={recording.file_url}
              title={recording.title}
              initialProgress={recording.user_progress?.progress_seconds}
              initialCompleted={recording.user_progress?.completed}
              onProgressUpdate={handleProgressUpdate}
            />
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-zinc-400 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-white/5 rounded-full text-sm text-zinc-300 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Details Card */}
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-zinc-100 mb-4">Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-400">Duration</span>
                <span className="text-zinc-100 font-medium">
                  {formatDuration(recording.duration)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">File Size</span>
                <span className="text-zinc-100 font-medium">
                  {formatFileSize(recording.file_size)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Listens</span>
                <span className="text-zinc-100 font-medium">{recording.listen_count}</span>
              </div>
              {recording.user_progress && (
                <div className="flex justify-between">
                  <span className="text-zinc-400">Your Progress</span>
                  <span className="text-zinc-100 font-medium">
                    {recording.duration
                      ? Math.round(
                          (recording.user_progress.progress_seconds / recording.duration) * 100
                        )
                      : 0}
                    %
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Related Recordings */}
          {relatedRecordings.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-zinc-100 mb-4">Related</h3>
              <div className="space-y-4">
                {relatedRecordings.map((related) => (
                  <Link key={related.id} href={`/app/audio/${related.id}`}>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer">
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                            `bg-${getCategoryColor(related.category)}/20`
                          )}
                        >
                          <IconHeadphones
                            className={cn('w-5 h-5', `text-${getCategoryColor(related.category)}`)}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-zinc-100 mb-1 line-clamp-2">
                            {related.title}
                          </h4>
                          <p className="text-xs text-zinc-400">
                            {formatDuration(related.duration)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
