/**
 * Audio Library Utilities
 * Functions for managing audio recordings and user listening progress
 */

import { turso } from './turso';

export interface AudioRecording {
  id: string;
  title: string;
  description: string | null;
  category: 'meditation' | 'talk' | 'teaching' | 'practice';
  duration: number | null; // in seconds
  file_url: string;
  file_size: number | null; // in bytes
  uploaded_by: string;
  created_at: number; // Unix timestamp
  updated_at: number; // Unix timestamp
  is_published: number; // 0 or 1 (SQLite boolean)
  listen_count: number;
  tags: string | null; // JSON array as string
}

export interface AudioProgress {
  id: string;
  user_id: string;
  recording_id: string;
  progress_seconds: number;
  completed: number; // 0 or 1 (SQLite boolean)
  last_listened_at: number; // Unix timestamp
}

export interface AudioWithProgress extends AudioRecording {
  user_progress?: {
    progress_seconds: number;
    completed: boolean;
    last_listened_at: number;
  };
}

/**
 * Get all audio recordings
 */
export async function getAllAudioRecordings(options?: {
  category?: string;
  search?: string;
  publishedOnly?: boolean;
  userId?: string;
}): Promise<AudioWithProgress[]> {
  try {
    if (!turso) {
      console.warn("Turso database not configured");
      return [];
    }

    let sql = `
      SELECT
        ar.*,
        ap.progress_seconds,
        ap.completed,
        ap.last_listened_at
      FROM audio_recordings ar
      LEFT JOIN audio_progress ap ON ar.id = ap.recording_id AND ap.user_id = ?
      WHERE 1=1
    `;

    const args: (string | number)[] = [options?.userId || ''];

    if (options?.publishedOnly) {
      sql += ' AND ar.is_published = 1';
    }

    if (options?.category) {
      sql += ' AND ar.category = ?';
      args.push(options.category);
    }

    if (options?.search) {
      sql += ' AND (ar.title LIKE ? OR ar.description LIKE ?)';
      const searchTerm = `%${options.search}%`;
      args.push(searchTerm, searchTerm);
    }

    sql += ' ORDER BY ar.created_at DESC';

    const result = await turso.execute({
      sql,
      args,
    });

    return result.rows.map((row: any) => ({
      id: row.id as string,
      title: row.title as string,
      description: row.description as string | null,
      category: row.category as AudioRecording['category'],
      duration: row.duration as number | null,
      file_url: row.file_url as string,
      file_size: row.file_size as number | null,
      uploaded_by: row.uploaded_by as string,
      created_at: row.created_at as number,
      updated_at: row.updated_at as number,
      is_published: row.is_published as number,
      listen_count: row.listen_count as number,
      tags: row.tags as string | null,
      user_progress: row.progress_seconds !== null ? {
        progress_seconds: row.progress_seconds as number,
        completed: Boolean(row.completed),
        last_listened_at: row.last_listened_at as number,
      } : undefined,
    }));
  } catch (error) {
    console.error('[Audio] Error fetching audio recordings:', error);
    throw error;
  }
}

/**
 * Get a single audio recording by ID
 */
export async function getAudioRecordingById(
  id: string,
  userId?: string
): Promise<AudioWithProgress | null> {
  try {
    if (!turso) {
      console.warn("Turso database not configured");
      return null;
    }

    const result = await turso.execute({
      sql: `
        SELECT
          ar.*,
          ap.progress_seconds,
          ap.completed,
          ap.last_listened_at
        FROM audio_recordings ar
        LEFT JOIN audio_progress ap ON ar.id = ap.recording_id AND ap.user_id = ?
        WHERE ar.id = ?
      `,
      args: [userId || '', id],
    });

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return {
      id: row.id as string,
      title: row.title as string,
      description: row.description as string | null,
      category: row.category as AudioRecording['category'],
      duration: row.duration as number | null,
      file_url: row.file_url as string,
      file_size: row.file_size as number | null,
      uploaded_by: row.uploaded_by as string,
      created_at: row.created_at as number,
      updated_at: row.updated_at as number,
      is_published: row.is_published as number,
      listen_count: row.listen_count as number,
      tags: row.tags as string | null,
      user_progress: row.progress_seconds !== null ? {
        progress_seconds: row.progress_seconds as number,
        completed: Boolean(row.completed),
        last_listened_at: row.last_listened_at as number,
      } : undefined,
    };
  } catch (error) {
    console.error('[Audio] Error fetching audio recording:', error);
    throw error;
  }
}

/**
 * Create a new audio recording
 */
export async function createAudioRecording(data: {
  title: string;
  description?: string;
  category: AudioRecording['category'];
  duration?: number;
  file_url: string;
  file_size?: number;
  uploaded_by: string;
  is_published?: boolean;
  tags?: string[];
}): Promise<AudioRecording> {
  try {
    if (!turso) {
      throw new Error("Turso database not configured");
    }

    const id = crypto.randomUUID();
    const now = Math.floor(Date.now() / 1000);

    await turso.execute({
      sql: `
        INSERT INTO audio_recordings (
          id, title, description, category, duration, file_url, file_size,
          uploaded_by, created_at, updated_at, is_published, tags
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        id,
        data.title,
        data.description || null,
        data.category,
        data.duration || null,
        data.file_url,
        data.file_size || null,
        data.uploaded_by,
        now,
        now,
        data.is_published ? 1 : 0,
        data.tags ? JSON.stringify(data.tags) : null,
      ],
    });

    const recording = await getAudioRecordingById(id);
    if (!recording) {
      throw new Error('Failed to create audio recording');
    }

    return recording;
  } catch (error) {
    console.error('[Audio] Error creating audio recording:', error);
    throw error;
  }
}

/**
 * Update an audio recording
 */
export async function updateAudioRecording(
  id: string,
  data: Partial<{
    title: string;
    description: string;
    category: AudioRecording['category'];
    duration: number;
    is_published: boolean;
    tags: string[];
  }>
): Promise<AudioRecording | null> {
  try {
    if (!turso) {
      throw new Error("Turso database not configured");
    }

    const now = Math.floor(Date.now() / 1000);
    const updates: string[] = ['updated_at = ?'];
    const args: (string | number | null)[] = [now];

    if (data.title !== undefined) {
      updates.push('title = ?');
      args.push(data.title);
    }
    if (data.description !== undefined) {
      updates.push('description = ?');
      args.push(data.description);
    }
    if (data.category !== undefined) {
      updates.push('category = ?');
      args.push(data.category);
    }
    if (data.duration !== undefined) {
      updates.push('duration = ?');
      args.push(data.duration);
    }
    if (data.is_published !== undefined) {
      updates.push('is_published = ?');
      args.push(data.is_published ? 1 : 0);
    }
    if (data.tags !== undefined) {
      updates.push('tags = ?');
      args.push(JSON.stringify(data.tags));
    }

    args.push(id);

    await turso.execute({
      sql: `UPDATE audio_recordings SET ${updates.join(', ')} WHERE id = ?`,
      args,
    });

    return await getAudioRecordingById(id);
  } catch (error) {
    console.error('[Audio] Error updating audio recording:', error);
    throw error;
  }
}

/**
 * Delete an audio recording
 */
export async function deleteAudioRecording(id: string): Promise<void> {
  try {
    if (!turso) {
      throw new Error("Turso database not configured");
    }

    await turso.execute({
      sql: 'DELETE FROM audio_recordings WHERE id = ?',
      args: [id],
    });
  } catch (error) {
    console.error('[Audio] Error deleting audio recording:', error);
    throw error;
  }
}

/**
 * Increment listen count for a recording
 */
export async function incrementListenCount(recordingId: string): Promise<void> {
  try {
    if (!turso) {
      throw new Error("Turso database not configured");
    }

    await turso.execute({
      sql: 'UPDATE audio_recordings SET listen_count = listen_count + 1 WHERE id = ?',
      args: [recordingId],
    });
  } catch (error) {
    console.error('[Audio] Error incrementing listen count:', error);
    throw error;
  }
}

/**
 * Save or update user listening progress
 */
export async function saveAudioProgress(data: {
  user_id: string;
  recording_id: string;
  progress_seconds: number;
  completed?: boolean;
}): Promise<AudioProgress> {
  try {
    if (!turso) {
      throw new Error("Turso database not configured");
    }

    const now = Math.floor(Date.now() / 1000);

    // Check if progress already exists
    const existing = await turso.execute({
      sql: `SELECT id FROM audio_progress WHERE user_id = ? AND recording_id = ?`,
      args: [data.user_id, data.recording_id],
    });

    if (existing.rows.length > 0) {
      // Update existing progress
      const id = existing.rows[0].id as string;
      await turso.execute({
        sql: `
          UPDATE audio_progress
          SET progress_seconds = ?, completed = ?, last_listened_at = ?
          WHERE id = ?
        `,
        args: [
          data.progress_seconds,
          data.completed ? 1 : 0,
          now,
          id,
        ],
      });

      return {
        id,
        user_id: data.user_id,
        recording_id: data.recording_id,
        progress_seconds: data.progress_seconds,
        completed: data.completed ? 1 : 0,
        last_listened_at: now,
      };
    } else {
      // Create new progress
      const id = crypto.randomUUID();
      await turso.execute({
        sql: `
          INSERT INTO audio_progress (
            id, user_id, recording_id, progress_seconds, completed, last_listened_at
          ) VALUES (?, ?, ?, ?, ?, ?)
        `,
        args: [
          id,
          data.user_id,
          data.recording_id,
          data.progress_seconds,
          data.completed ? 1 : 0,
          now,
        ],
      });

      return {
        id,
        user_id: data.user_id,
        recording_id: data.recording_id,
        progress_seconds: data.progress_seconds,
        completed: data.completed ? 1 : 0,
        last_listened_at: now,
      };
    }
  } catch (error) {
    console.error('[Audio] Error saving audio progress:', error);
    throw error;
  }
}

/**
 * Get user's progress for a specific recording
 */
export async function getAudioProgress(
  userId: string,
  recordingId: string
): Promise<AudioProgress | null> {
  try {
    if (!turso) {
      console.warn("Turso database not configured");
      return null;
    }

    const result = await turso.execute({
      sql: `SELECT * FROM audio_progress WHERE user_id = ? AND recording_id = ?`,
      args: [userId, recordingId],
    });

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];
    return {
      id: row.id as string,
      user_id: row.user_id as string,
      recording_id: row.recording_id as string,
      progress_seconds: row.progress_seconds as number,
      completed: row.completed as number,
      last_listened_at: row.last_listened_at as number,
    };
  } catch (error) {
    console.error('[Audio] Error fetching audio progress:', error);
    throw error;
  }
}

/**
 * Format duration in seconds to MM:SS format
 */
export function formatDuration(seconds: number | null): string {
  if (!seconds) return '--:--';

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format file size in bytes to human-readable format
 */
export function formatFileSize(bytes: number | null): string {
  if (!bytes) return 'Unknown';

  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

/**
 * Parse tags from JSON string
 */
export function parseTags(tagsJson: string | null): string[] {
  if (!tagsJson) return [];

  try {
    return JSON.parse(tagsJson);
  } catch {
    return [];
  }
}

/**
 * Get category display name
 */
export function getCategoryDisplayName(category: AudioRecording['category']): string {
  const names: Record<AudioRecording['category'], string> = {
    meditation: 'Guided Meditation',
    talk: 'Dharma Talk',
    teaching: 'Teaching',
    practice: 'Practice',
  };
  return names[category] || category;
}

/**
 * Get category icon color
 */
export function getCategoryColor(category: AudioRecording['category']): string {
  const colors: Record<AudioRecording['category'], string> = {
    meditation: 'ocean-blue',
    talk: 'plum',
    teaching: 'jade',
    practice: 'gold',
  };
  return colors[category] || 'ocean-blue';
}
