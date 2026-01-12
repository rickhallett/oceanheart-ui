import { NextResponse } from 'next/server';
import { getTestimonials } from '@/lib/testimonials';

export const dynamic = 'force-dynamic'; // Ensure this route is not statically generated

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam, 10) : 10;

    const testimonials = await getTestimonials(limit);

    return NextResponse.json({
      testimonials,
      count: testimonials.length,
      source: testimonials.length > 3 ? 'trustpilot' : 'fallback',
    });
  } catch (_error) {
    

    return NextResponse.json(
      {
        error: 'Failed to fetch testimonials',
        message: _error instanceof Error ? _error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
