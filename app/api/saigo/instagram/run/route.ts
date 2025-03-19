import { NextResponse } from "next/server";
import { createServiceClient } from "@/libs/supabase/server";
import { InstagramService } from "@/libs/instagram-service";

/**
 * POST /api/saigo/instagram/run
 * Manually run Instagram checks
 */
export async function POST() {
  try {
    const supabase = createServiceClient();
    const instagramService = new InstagramService(supabase);

    const results = await instagramService.runInstagramChecks();

    return NextResponse.json({
      message: "Instagram checks completed successfully",
      results
    });
  } catch (error: any) {
    console.error("Error running Instagram checks:", error);
    return NextResponse.json(
      { error: error.message || "Failed to run Instagram checks" },
      { status: 500 }
    );
  }
} 