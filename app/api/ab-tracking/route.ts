import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/libs/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { testId, variant, event } = body;

    if (!testId || !variant || !event) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

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
    console.error("Error in AB testing endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
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