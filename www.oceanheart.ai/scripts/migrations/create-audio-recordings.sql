-- Audio Recordings Migration
-- Creates tables for audio recordings (guided meditations, talks) and user listening progress

-- Audio recordings table
CREATE TABLE IF NOT EXISTS audio_recordings (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- 'meditation', 'talk', 'teaching', 'practice'
  duration INTEGER, -- in seconds
  file_url TEXT NOT NULL,
  file_size INTEGER, -- in bytes
  uploaded_by TEXT NOT NULL,
  created_at INTEGER NOT NULL, -- Unix timestamp
  updated_at INTEGER NOT NULL, -- Unix timestamp
  is_published INTEGER DEFAULT 0, -- SQLite uses INTEGER for booleans (0 or 1)
  listen_count INTEGER DEFAULT 0,
  tags TEXT -- JSON array of tags stored as string
);

-- User listening progress table
CREATE TABLE IF NOT EXISTS audio_progress (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  recording_id TEXT NOT NULL,
  progress_seconds INTEGER DEFAULT 0,
  completed INTEGER DEFAULT 0, -- SQLite uses INTEGER for booleans (0 or 1)
  last_listened_at INTEGER NOT NULL, -- Unix timestamp
  FOREIGN KEY (recording_id) REFERENCES audio_recordings(id) ON DELETE CASCADE
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_audio_category ON audio_recordings(category);
CREATE INDEX IF NOT EXISTS idx_audio_published ON audio_recordings(is_published);
CREATE INDEX IF NOT EXISTS idx_audio_created ON audio_recordings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_progress_user ON audio_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_recording ON audio_progress(recording_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_progress_user_recording ON audio_progress(user_id, recording_id);
