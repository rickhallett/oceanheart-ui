import { NextResponse, NextRequest } from "next/server";

// Temporarily disabled during authentication system transition
export async function POST(req: NextRequest) {
  // Return unauthorized for protected routes during auth removal
  return NextResponse.json(
    { error: "Authentication temporarily disabled" },
    { status: 401 }
  );
}
