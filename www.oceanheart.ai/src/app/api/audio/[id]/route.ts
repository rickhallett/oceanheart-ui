/**
 * Single Audio Recording API
 * GET: Get single audio recording by ID
 * PUT: Update audio recording (admin only)
 * DELETE: Delete audio recording (admin only)
 */

import { NextRequest, NextResponse } from 'next/server';
import { del } from '@vercel/blob';
import {
  getAudioRecordingById,
  updateAudioRecording,
  deleteAudioRecording,
  incrementListenCount,
  type AudioRecording,
} from '@/lib/audio';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

/**
 * GET /api/audio/[id]
 * Get single audio recording
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    // TODO: Implement proper authentication via header token
    const userId = request.headers.get('x-user-id');
    const { id } = await params;

    const recording = await getAudioRecordingById(id, userId || undefined);

    if (!recording) {
      return NextResponse.json(
        {
          success: false,
          error: 'Audio recording not found',
        },
        { status: 404 }
      );
    }

    // Check if recording is published (skip admin check for now)
    if (!recording.is_published) {
      return NextResponse.json(
        {
          success: false,
          error: 'Audio recording not found',
        },
        { status: 404 }
      );
    }

    // Increment listen count
    await incrementListenCount(id);

    return NextResponse.json({
      success: true,
      recording,
    });
  } catch (error) {
    console.error('[API] Error fetching audio recording:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch audio recording',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/audio/[id]
 * Update audio recording (admin only)
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // TODO: Implement proper authentication via header token
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        {
          success: false,
          error: 'Authentication required',
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, description, category, duration, is_published, tags } = body;

    // Validate category if provided
    if (category && !['meditation', 'talk', 'teaching', 'practice'].includes(category)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid category',
        },
        { status: 400 }
      );
    }

    const recording = await updateAudioRecording(id, {
      title,
      description,
      category,
      duration,
      is_published,
      tags,
    });

    if (!recording) {
      return NextResponse.json(
        {
          success: false,
          error: 'Audio recording not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      recording,
    });
  } catch (error) {
    console.error('[API] Error updating audio recording:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update audio recording',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/audio/[id]
 * Delete audio recording and file (admin only)
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // TODO: Implement proper authentication via header token
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        {
          success: false,
          error: 'Authentication required',
        },
        { status: 401 }
      );
    }

    // Get recording to get file URL before deleting
    const recording = await getAudioRecordingById(id);

    if (!recording) {
      return NextResponse.json(
        {
          success: false,
          error: 'Audio recording not found',
        },
        { status: 404 }
      );
    }

    // Delete file from Vercel Blob
    try {
      await del(recording.file_url);
    } catch (error) {
      console.error('[API] Error deleting file from blob:', error);
      // Continue with database deletion even if file deletion fails
    }

    // Delete database entry (this will also cascade delete progress entries)
    await deleteAudioRecording(id);

    return NextResponse.json({
      success: true,
      message: 'Audio recording deleted successfully',
    });
  } catch (error) {
    console.error('[API] Error deleting audio recording:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete audio recording',
      },
      { status: 500 }
    );
  }
}
