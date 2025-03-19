import { NextResponse } from 'next/server';
import { createServiceClient } from '@/libs/supabase/server';
import { InstagramService } from '@/libs/instagram-service';

// This endpoint will be called by Vercel Cron
// Configure in vercel.json: 
// "crons": [{ "path": "/api/cron/instagram-checker", "schedule": "0 * * * *" }]
export async function GET(request: Request) {
  // Verify that this is a cron job request by checking for a secret header
  // This helps prevent unauthorized access to this endpoint
  const authHeader = request.headers.get('Authorization');
  const expectedToken = process.env.CRON_SECRET;

  // If no secret is set, only allow in development
  if (expectedToken && authHeader !== `Bearer ${expectedToken}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('Running scheduled Instagram checks...');

    const supabase = createServiceClient();
    const instagramService = new InstagramService(supabase);

    const results = await instagramService.runInstagramChecks();

    console.log('Instagram checks completed:', results);

    return NextResponse.json({
      success: true,
      message: 'Instagram checks completed successfully',
      results,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Error running scheduled Instagram checks:', error);

    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 