import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

type TrackEvent = {
  testId: string;
  variant: string;
  event: 'view' | 'click' | 'conversion';
};

// In-memory storage for demo purposes
// In production, you'd use a database
const trackingData: TrackEvent[] = [];

export async function POST(request: NextRequest) {
  try {
    const { testId, variant, event } = await request.json() as TrackEvent;

    // Log the event
    console.log(`A/B Test: ${testId}, Variant: ${variant}, Event: ${event}`);

    // Store the event in our in-memory array
    // In a real application, you would store this in a database
    trackingData.push({
      testId,
      variant,
      event,
    });

    // Create a Supabase client
    const supabase = createClient();

    // Record the event
    const { error } = await supabase
      .from("ab_test_events")
      .insert({
        test_id: testId,
        variant,
        event_type: event,
        timestamp: new Date().toISOString(),
        user_agent: request.headers.get("user-agent") || "",
        ip_hash: hashIp(request.ip || ""),
      });

    if (error) {
      console.error("Error recording AB test event:", error);
      return NextResponse.json(
        { error: "Failed to record event" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking A/B test event:", error);
    return NextResponse.json(
      { success: false, error: "Failed to track event" },
      { status: 500 }
    );
  }
}

// Optional: Add a GET method to retrieve stats (for admin purposes)
export async function GET() {
  // Count events by test ID, variant, and event type
  const stats = trackingData.reduce((acc, { testId, variant, event }) => {
    const key = `${testId}_${variant}_${event}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return NextResponse.json({ stats });
}

// Simple hash function to anonymize IPs
function hashIp(ip: string): string {
  // This is a very simple hash - in production use a proper hashing algorithm
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
} 