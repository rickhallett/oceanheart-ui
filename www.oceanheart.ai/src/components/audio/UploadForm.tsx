"use client";

/**
 * UploadForm Component
 * Form for uploading audio recordings (admin only)
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  IconUpload,
  IconCheck,
  IconX,
  IconLoader2,
  IconPlayerPlayFilled,
} from '@tabler/icons-react';
import { cn } from '@/lib/utils';
import { formatFileSize } from '@/lib/audio';
import type { AudioRecording } from '@/lib/audio';

interface UploadFormProps {
  onSuccess?: (recording: AudioRecording) => void;
}

export function UploadForm({ onSuccess }: UploadFormProps) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'meditation' | 'talk' | 'teaching' | 'practice'>('meditation');
  const [tags, setTags] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [uploadedRecording, setUploadedRecording] = useState<AudioRecording | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [duration, setDuration] = useState<number | null>(null);

  // Handle file selection
  const handleFileChange = (selectedFile: File | null) => {
    if (!selectedFile) return;

    // Validate file type (check both MIME type and extension)
    const allowedTypes = ['audio/mpeg', 'audio/mp3', 'audio/mp4', 'audio/m4a', 'audio/wav', 'audio/x-m4a', 'video/mp4', 'application/octet-stream'];
    const allowedExtensions = ['.mp3', '.m4a', '.wav'];
    const fileExtension = selectedFile.name.toLowerCase().match(/\.[^.]+$/)?.[0] || '';

    if (!allowedTypes.includes(selectedFile.type) || !allowedExtensions.includes(fileExtension)) {
      setError('Invalid file type. Please upload MP3, M4A, or WAV files.');
      return;
    }

    // Validate file size (100MB max)
    const maxSize = 100 * 1024 * 1024;
    if (selectedFile.size > maxSize) {
      setError('File size exceeds 100MB limit.');
      return;
    }

    setFile(selectedFile);
    setError(null);

    // Auto-fill title from filename if empty
    if (!title) {
      const filename = selectedFile.name.replace(/\.[^/.]+$/, ''); // Remove extension
      setTitle(filename.replace(/[-_]/g, ' '));
    }

    // Get audio duration
    const audio = new Audio();
    audio.src = URL.createObjectURL(selectedFile);
    audio.addEventListener('loadedmetadata', () => {
      setDuration(Math.floor(audio.duration));
      URL.revokeObjectURL(audio.src);
    });
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileChange(droppedFile);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !title || !category) {
      setError('Please fill in all required fields and select a file.');
      return;
    }

    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      if (duration) formData.append('duration', duration.toString());
      formData.append('is_published', isPublished.toString());
      if (tags) formData.append('tags', JSON.stringify(tags.split(',').map(t => t.trim()).filter(Boolean)));

      // Simulate upload progress (since we can't track actual progress with fetch)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 300);

      const response = await fetch('/api/audio', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Upload failed');
      }

      const data = await response.json();
      setUploadedRecording(data.recording);

      if (onSuccess) {
        onSuccess(data.recording);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload audio');
      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setFile(null);
    setTitle('');
    setDescription('');
    setCategory('meditation');
    setTags('');
    setIsPublished(false);
    setDuration(null);
    setUploadProgress(0);
    setUploadedRecording(null);
    setError(null);
  };

  // If upload successful, show success view
  if (uploadedRecording) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-jade/10 border border-jade/30 rounded-lg p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 bg-jade rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(93,214,174,0.5)]"
          >
            <IconCheck className="w-10 h-10 text-black" />
          </motion.div>

          <h2 className="text-2xl font-bold text-zinc-100 mb-2">Upload Successful!</h2>
          <p className="text-zinc-400 mb-6">
            Your audio recording has been uploaded successfully.
          </p>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => router.push(`/app/audio/${uploadedRecording.id}`)}
              className="px-6 py-3 bg-ocean-blue text-black rounded font-semibold hover:bg-ocean-blue/90 transition-all flex items-center gap-2"
            >
              <IconPlayerPlayFilled className="w-5 h-5" />
              Listen Now
            </button>
            <button
              onClick={resetForm}
              className="px-6 py-3 bg-white/10 text-zinc-100 rounded font-semibold hover:bg-white/20 transition-all border border-white/20"
            >
              Upload Another
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-6">
      {/* File Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative border-2 border-dashed rounded-lg p-12 transition-all cursor-pointer',
          isDragging
            ? 'border-ocean-blue bg-ocean-blue/5'
            : file
            ? 'border-jade bg-jade/5'
            : 'border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10'
        )}
      >
        <input
          type="file"
          accept="audio/mpeg,audio/mp3,audio/mp4,audio/m4a,audio/wav"
          onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isUploading}
        />

        <div className="text-center">
          {file ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <IconCheck className="w-16 h-16 text-jade mx-auto mb-4" />
              <p className="text-lg font-medium text-zinc-100 mb-1">{file.name}</p>
              <p className="text-sm text-zinc-400">{formatFileSize(file.size)}</p>
              {duration && <p className="text-xs text-zinc-500 mt-1">{Math.floor(duration / 60)}:{(duration % 60).toString().padStart(2, '0')}</p>}
            </motion.div>
          ) : (
            <>
              <IconUpload className="w-16 h-16 text-zinc-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-zinc-100 mb-1">
                Drag and drop your audio file here
              </p>
              <p className="text-sm text-zinc-400">
                or click to browse (MP3, M4A, WAV - Max 100MB)
              </p>
            </>
          )}
        </div>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3"
          >
            <IconX className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-400">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Fields */}
      <div className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-zinc-300 mb-2">
            Title <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-zinc-100 placeholder-zinc-500 focus:border-ocean-blue focus:outline-none focus:ring-2 focus:ring-ocean-blue/20 transition-all"
            placeholder="Enter audio title..."
            required
            disabled={isUploading}
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-zinc-300 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-zinc-100 placeholder-zinc-500 focus:border-ocean-blue focus:outline-none focus:ring-2 focus:ring-ocean-blue/20 transition-all resize-none"
            placeholder="Describe what this audio is about..."
            disabled={isUploading}
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-zinc-300 mb-2">
            Category <span className="text-red-400">*</span>
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as typeof category)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-zinc-100 focus:border-ocean-blue focus:outline-none focus:ring-2 focus:ring-ocean-blue/20 transition-all cursor-pointer"
            required
            disabled={isUploading}
          >
            <option value="meditation">Guided Meditation</option>
            <option value="talk">Dharma Talk</option>
            <option value="teaching">Teaching</option>
            <option value="practice">Practice</option>
          </select>
        </div>

        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-zinc-300 mb-2">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-zinc-100 placeholder-zinc-500 focus:border-ocean-blue focus:outline-none focus:ring-2 focus:ring-ocean-blue/20 transition-all"
            placeholder="mindfulness, breathing, beginner..."
            disabled={isUploading}
          />
        </div>

        {/* Publish Checkbox */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="published"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="w-5 h-5 bg-white/5 border border-white/20 rounded cursor-pointer accent-ocean-blue"
            disabled={isUploading}
          />
          <label htmlFor="published" className="text-sm font-medium text-zinc-300 cursor-pointer">
            Publish immediately
          </label>
        </div>
      </div>

      {/* Upload Progress */}
      <AnimatePresence>
        {isUploading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <div className="bg-white/5 border border-white/10 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-zinc-300">Uploading...</span>
                <span className="text-sm text-zinc-400">{uploadProgress}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-ocean-blue"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isUploading || !file || !title}
        className="w-full py-4 bg-ocean-blue text-black rounded-lg font-semibold hover:bg-ocean-blue/90 hover:shadow-[0_0_30px_rgba(79,195,247,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none flex items-center justify-center gap-2"
      >
        {isUploading ? (
          <>
            <IconLoader2 className="w-5 h-5 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <IconUpload className="w-5 h-5" />
            Upload Audio
          </>
        )}
      </button>
    </form>
  );
}
