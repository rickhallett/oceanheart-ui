import { NextRequest, NextResponse } from "next/server";

// Temporarily disabled during authentication system transition
// This function is used to create a Stripe Checkout Session (one-time payment or subscription)
// It's called by the <ButtonCheckout /> component
export async function POST(req: NextRequest) {
  // Return unauthorized for protected routes during auth removal
  return NextResponse.json(
    { error: "Authentication temporarily disabled" },
    { status: 401 }
  );
}
