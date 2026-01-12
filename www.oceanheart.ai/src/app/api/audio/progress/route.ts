/**
 * Audio Progress API
 * GET: Get user's progress for a recording
 * POST: Save/update user's listening progress
 */

import { NextRequest, NextResponse } from 'next/server';
import { saveAudioProgress, getAudioProgress } from '@/lib/audio';

/**
 * GET /api/audio/progress?recordingId=xxx
 * Get user's progress for a specific recording
 */
export async function GET(request: NextRequest) {
  try {
    // TODO: Implement proper authentication via header token
    const userId = request.headers.get('x-user-id') || 'guest';

    const searchParams = request.nextUrl.searchParams;
    const recordingId = searchParams.get('recordingId');

    if (!recordingId) {
      return NextResponse.json(
        {
          success: false,
          error: 'recordingId parameter is required',
        },
        { status: 400 }
      );
    }

    const progress = await getAudioProgress(userId, recordingId);

    return NextResponse.json({
      success: true,
      progress,
    });
  } catch (error) {
    console.error('[API] Error fetching audio progress:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch audio progress',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/audio/progress
 * Save or update user's listening progress
 */
export async function POST(request: NextRequest) {
  try {
    // TODO: Implement proper authentication via header token
    const userId = request.headers.get('x-user-id') || 'guest';

    const body = await request.json();
    const { recordingId, progressSeconds, completed } = body;

    // Validate required fields
    if (!recordingId || progressSeconds === undefined) {
      return NextResponse.json(
        {
          success: false,
          error: 'recordingId and progressSeconds are required',
        },
        { status: 400 }
      );
    }

    // Validate progress is non-negative
    if (progressSeconds < 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'progressSeconds must be non-negative',
        },
        { status: 400 }
      );
    }

    const progress = await saveAudioProgress({
      user_id: userId,
      recording_id: recordingId,
      progress_seconds: progressSeconds,
      completed: Boolean(completed),
    });

    return NextResponse.json({
      success: true,
      progress,
    });
  } catch (error) {
    console.error('[API] Error saving audio progress:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to save audio progress',
      },
      { status: 500 }
    );
  }
}
