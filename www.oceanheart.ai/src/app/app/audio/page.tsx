"use client";

/**
 * Audio Library Page
 * Browse and filter audio recordings (guided meditations, talks, teachings, practices)
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@/contexts/UserContext';
import {
  IconSearch,
  IconPlus,
  IconHeadphones,
  IconLoader2,
} from '@tabler/icons-react';
import { AudioCard } from '@/components/audio/AudioCard';
import { CategoryFilter, type AudioCategory } from '@/components/audio/CategoryFilter';
import type { AudioWithProgress } from '@/lib/audio';
import { cn } from '@/lib/utils';

export default function AudioLibraryPage() {
  const { user } = useUser();
  const [recordings, setRecordings] = useState<AudioWithProgress[]>([]);
  const [filteredRecordings, setFilteredRecordings] = useState<AudioWithProgress[]>([]);
  const [activeCategory, setActiveCategory] = useState<AudioCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = user?.email?.endsWith('@oceanheart.ai');

  // Fetch recordings
  useEffect(() => {
    fetchRecordings();
  }, []);

  const fetchRecordings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/audio');

      if (!response.ok) {
        throw new Error('Failed to fetch recordings');
      }

      const data = await response.json();
      setRecordings(data.recordings);
      setFilteredRecordings(data.recordings);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load audio recordings');
    } finally {
      setIsLoading(false);
    }
  };

  // Filter recordings
  useEffect(() => {
    let filtered = recordings;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter((r) => r.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(query) ||
          r.description?.toLowerCase().includes(query) ||
          r.tags?.toLowerCase().includes(query)
      );
    }

    setFilteredRecordings(filtered);
  }, [activeCategory, searchQuery, recordings]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-3 mb-3">
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-zinc-100 mb-1 flex items-center gap-2">
              <IconHeadphones className="w-6 h-6 text-ocean-blue flex-shrink-0" />
              <span className="truncate">Audio Library</span>
            </h1>
            <p className="text-zinc-400 text-sm">
              Guided meditations, dharma talks, and practices for your journey
            </p>
          </div>

          {/* Upload Button (Admin Only) */}
          {isAdmin && (
            <Link href="/app/audio/upload" className="flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-3 py-1.5 bg-ocean-blue text-black rounded text-sm font-medium hover:bg-ocean-blue/90 transition-all flex items-center gap-1.5"
              >
                <IconPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Upload New</span>
                <span className="sm:hidden">Upload</span>
              </motion.button>
            </Link>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center gap-6 text-sm text-zinc-400">
          <span>{recordings.length} total recordings</span>
          {filteredRecordings.length !== recordings.length && (
            <>
              <span>•</span>
              <span>{filteredRecordings.length} showing</span>
            </>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 space-y-3">
        {/* Category Filter */}
        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        {/* Search Bar */}
        <div className="relative w-full sm:max-w-md">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:border-ocean-blue focus:outline-none focus:ring-2 focus:ring-ocean-blue/20 transition-all"
          />
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <IconLoader2 className="w-12 h-12 text-ocean-blue animate-spin mx-auto mb-4" />
            <p className="text-zinc-400">Loading audio library...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
          <p className="text-red-400">{error}</p>
          <button
            onClick={fetchRecordings}
            className="mt-4 px-6 py-2 bg-red-500/20 text-red-300 rounded hover:bg-red-500/30 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && filteredRecordings.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-lg p-12 text-center"
        >
          <IconHeadphones className="w-16 h-16 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-zinc-300 mb-2">
            {searchQuery || activeCategory !== 'all'
              ? 'No recordings found'
              : 'No audio recordings yet'}
          </h3>
          <p className="text-zinc-400 mb-6">
            {searchQuery || activeCategory !== 'all'
              ? 'Try adjusting your filters or search query'
              : 'Audio recordings will appear here once uploaded'}
          </p>
          {(searchQuery || activeCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-6 py-2 bg-white/10 text-zinc-300 rounded hover:bg-white/20 transition-colors"
            >
              Clear Filters
            </button>
          )}
        </motion.div>
      )}

      {/* Recordings Grid */}
      {!isLoading && !error && filteredRecordings.length > 0 && (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredRecordings.map((recording, index) => (
              <motion.div
                key={recording.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
              >
                <AudioCard recording={recording} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
