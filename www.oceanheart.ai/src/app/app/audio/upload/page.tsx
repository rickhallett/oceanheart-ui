"use client";

/**
 * Audio Upload Page
 * Admin-only page for uploading new audio recordings
 */

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import {
  IconArrowLeft,
  IconUpload,
  IconLoader2,
} from '@tabler/icons-react';
import { UploadForm } from '@/components/audio/UploadForm';

export default function AudioUploadPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';
  const user = session?.user;

  const isAdmin = user?.email?.endsWith('@oceanheart.ai');

  // Redirect non-admins
  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.push('/auth/signin');
      return;
    }

    if (!isAdmin) {
      router.push('/app/audio');
    }
  }, [user, isLoading, isAdmin, router]);

  // Show loading while checking auth
  if (isLoading || !user || !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <IconLoader2 className="w-12 h-12 text-ocean-blue animate-spin mx-auto mb-4" />
          <p className="text-zinc-400">Loading...</p>
        </div>
      </div>
    );
  }

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

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-zinc-100 mb-2 flex items-center gap-3">
          <IconUpload className="w-10 h-10 text-ocean-blue" />
          Upload Audio Recording
        </h1>
        <p className="text-zinc-400 text-lg">
          Upload guided meditations, dharma talks, teachings, and practices
        </p>
      </div>

      {/* Upload Form */}
      <UploadForm />

      {/* Instructions */}
      <div className="mt-12 bg-white/5 border border-white/10 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-zinc-100 mb-4">Upload Guidelines</h3>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li className="flex items-start gap-2">
            <span className="text-ocean-blue mt-0.5">•</span>
            <span>
              <strong className="text-zinc-300">Supported formats:</strong> MP3, M4A, WAV
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-ocean-blue mt-0.5">•</span>
            <span>
              <strong className="text-zinc-300">Maximum file size:</strong> 100MB
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-ocean-blue mt-0.5">•</span>
            <span>
              <strong className="text-zinc-300">Title:</strong> Use a clear, descriptive title that
              reflects the content
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-ocean-blue mt-0.5">•</span>
            <span>
              <strong className="text-zinc-300">Description:</strong> Provide context about what
              listeners will experience
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-ocean-blue mt-0.5">•</span>
            <span>
              <strong className="text-zinc-300">Category:</strong> Choose the most appropriate
              category for the recording
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-ocean-blue mt-0.5">•</span>
            <span>
              <strong className="text-zinc-300">Tags:</strong> Add relevant keywords to help users
              discover the recording
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-ocean-blue mt-0.5">•</span>
            <span>
              <strong className="text-zinc-300">Publishing:</strong> Unpublished recordings are only
              visible to admins
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
