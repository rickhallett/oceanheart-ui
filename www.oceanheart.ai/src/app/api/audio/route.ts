/**
 * Audio Recordings API
 * GET: List all audio recordings (with optional filters)
 * POST: Upload new audio recording (admin only)
 */

import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import {
  getAllAudioRecordings,
  createAudioRecording,
  type AudioRecording,
} from '@/lib/audio';

/**
 * GET /api/audio
 * List all audio recordings with optional filters
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const category = searchParams.get('category') || undefined;
    const search = searchParams.get('search') || undefined;
    const publishedOnly = searchParams.get('published') !== 'false';

    const recordings = await getAllAudioRecordings({
      category,
      search,
      publishedOnly,
      userId: undefined,
    });

    return NextResponse.json({
      success: true,
      recordings,
      count: recordings.length,
    });
  } catch (error) {
    console.error('[API] Error fetching audio recordings:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch audio recordings',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/audio
 * Upload new audio recording (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    // TODO: Implement proper authentication via header token
    // For now, allow uploads in development
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        {
          success: false,
          error: 'Authentication required',
        },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string | null;
    const category = formData.get('category') as AudioRecording['category'];
    const duration = formData.get('duration') ? parseInt(formData.get('duration') as string) : undefined;
    const isPublished = formData.get('is_published') === 'true';
    const tagsJson = formData.get('tags') as string | null;

    // Validate required fields
    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: 'Audio file is required',
        },
        { status: 400 }
      );
    }

    if (!title || !category) {
      return NextResponse.json(
        {
          success: false,
          error: 'Title and category are required',
        },
        { status: 400 }
      );
    }

    // Validate file type (check both MIME type and extension)
    const allowedTypes = ['audio/mpeg', 'audio/mp3', 'audio/mp4', 'audio/m4a', 'audio/wav', 'audio/x-m4a', 'video/mp4', 'application/octet-stream'];
    const allowedExtensions = ['.mp3', '.m4a', '.wav'];
    const fileExtension = file.name.toLowerCase().match(/\.[^.]+$/)?.[0] || '';

    const isValidType = allowedTypes.includes(file.type) && allowedExtensions.includes(fileExtension);

    if (!isValidType) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid file: ${file.name} (${file.type}). Please upload MP3, M4A, or WAV files.`,
        },
        { status: 400 }
      );
    }

    // Validate file size (100MB max)
    const maxSize = 100 * 1024 * 1024; // 100MB in bytes
    if (file.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          error: 'File size exceeds 100MB limit',
        },
        { status: 400 }
      );
    }

    // Upload file to Vercel Blob
    const timestamp = Date.now();
    const sanitizedTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const filename = `audio/${category}/${sanitizedTitle}-${timestamp}.${file.name.split('.').pop()}`;

    const blob = await put(filename, file, {
      access: 'public',
      addRandomSuffix: false,
    });

    // Parse tags
    let tags: string[] | undefined;
    if (tagsJson) {
      try {
        tags = JSON.parse(tagsJson);
      } catch {
        tags = tagsJson.split(',').map((tag) => tag.trim()).filter(Boolean);
      }
    }

    // Create database entry
    const recording = await createAudioRecording({
      title,
      description: description || undefined,
      category,
      duration,
      file_url: blob.url,
      file_size: file.size,
      uploaded_by: 'system', // TODO: Get from auth header
      is_published: isPublished,
      tags,
    });

    return NextResponse.json({
      success: true,
      recording,
    });
  } catch (error) {
    console.error('[API] Error uploading audio:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to upload audio recording',
      },
      { status: 500 }
    );
  }
}
