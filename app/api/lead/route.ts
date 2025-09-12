import { NextResponse, NextRequest } from "next/server";

// Lead collection temporarily disabled during authentication system transition
// This route is used to store the leads that are generated from the landing page.
export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  // Temporarily disable lead storage during auth removal
  console.log("Lead collection temporarily disabled:", body.email);
  return NextResponse.json({ message: "Lead collection temporarily disabled" }, { status: 200 });
}
