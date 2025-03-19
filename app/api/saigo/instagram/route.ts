import { NextResponse } from "next/server";
import { createServiceClient } from "@/libs/supabase/server";
import { InstagramService } from "@/libs/instagram-service";

/**
 * GET /api/saigo/instagram
 * Get all Instagram page checks
 */
export async function GET() {
  try {
    const supabase = createServiceClient();
    const instagramService = new InstagramService(supabase);

    const checks = await instagramService.getAllInstagramChecks();

    return NextResponse.json({ checks });
  } catch (error: any) {
    console.error("Error fetching Instagram checks:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch Instagram checks" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/saigo/instagram
 * Create a new Instagram page check
 */
export async function POST(request: Request) {
  try {
    const supabase = createServiceClient();
    const instagramService = new InstagramService(supabase);

    const { pageUsername, userIds } = await request.json();

    if (!pageUsername) {
      return NextResponse.json(
        { error: "Instagram page username is required" },
        { status: 400 }
      );
    }

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json(
        { error: "At least one user ID must be provided" },
        { status: 400 }
      );
    }

    const check = await instagramService.createInstagramCheck(pageUsername, userIds);

    return NextResponse.json({ check }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating Instagram check:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create Instagram check" },
      { status: 500 }
    );
  }
} 