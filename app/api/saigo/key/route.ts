import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  console.log("🔑 Key route called - key check disabled");
  
  // Key validation disabled - allow all users to navigate
  return NextResponse.json({ success: true }, { status: 200 });
}