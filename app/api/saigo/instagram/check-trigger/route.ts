import { NextResponse } from "next/server";
import { createServiceClient } from "@/libs/supabase/server";
import { InstagramService } from "@/libs/instagram-service";

// Track when the last check was performed to avoid excessive checks
let lastCheckTime: number = 0;
const MIN_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * POST /api/saigo/instagram/check-trigger
 * Client-side trigger for Instagram checks
 * Rate limited to prevent excessive checking
 */
export async function POST() {
  const currentTime = Date.now();

  // Only run the check if it's been more than 5 minutes since the last check
  if (currentTime - lastCheckTime < MIN_CHECK_INTERVAL) {
    return NextResponse.json({
      message: "Check skipped - rate limited",
      lastCheckTime: new Date(lastCheckTime).toISOString(),
      nextCheckAvailable: new Date(lastCheckTime + MIN_CHECK_INTERVAL).toISOString()
    });
  }

  try {
    const supabase = createServiceClient();
    const instagramService = new InstagramService(supabase);

    // Update the last check time before running the check
    lastCheckTime = currentTime;

    // Run the check in the background without awaiting it
    // This prevents the request from being blocked by potentially slow checks
    instagramService.runInstagramChecks()
      .then(results => {
        console.log('Instagram check triggered by client completed:', results);
      })
      .catch(error => {
        console.error('Error in background Instagram check:', error);
      });

    return NextResponse.json({
      message: "Instagram check triggered",
      checkStarted: new Date(currentTime).toISOString()
    });
  } catch (error: any) {
    console.error("Error triggering Instagram check:", error);
    return NextResponse.json(
      { error: error.message || "Failed to trigger Instagram check" },
      { status: 500 }
    );
  }
} 