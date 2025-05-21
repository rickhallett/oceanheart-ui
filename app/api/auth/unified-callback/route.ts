import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/libs/supabase/server";
import config from "@/config";

export const dynamic = "force-dynamic";

/**
 * Unified authentication callback handler that supports both standard and legacy redirects
 * 
 * @param req - The incoming request with auth code
 * @returns NextResponse with appropriate redirect
 */
export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get("code");
  const authType = requestUrl.searchParams.get("type") || "standard"; // Can be "standard" or "saigo"
  
  console.log(`🚀 Starting unified auth callback processing for type: ${authType}`);

  if (!code) {
    console.error("⚠️ No auth code provided in callback URL");
    return NextResponse.redirect(requestUrl.origin + config.auth.loginUrl);
  }

  try {
    console.log("⚙️ Creating Supabase client...");
    const supabase = createClient();

    console.log("🔄 Exchanging code for session...");
    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("❌ Session exchange error:", {
        error: error.message,
        status: error.status
      });
      return NextResponse.redirect(requestUrl.origin + config.auth.loginUrl);
    }

    if (!session?.user) {
      console.error("⚠️ No user in session");
      return NextResponse.redirect(requestUrl.origin + config.auth.loginUrl);
    }

    // For backward compatibility with archived Saigo feature
    if (authType === "saigo") {
      console.log("⚠️ Legacy Saigo authentication requested, redirecting to standard flow");
    }

    // Redirect to the main callback URL (dashboard or account page)
    return NextResponse.redirect(requestUrl.origin + config.auth.callbackUrl);
    
  } catch (error) {
    console.error("❌ Unexpected error during auth callback:", error);
    return NextResponse.redirect(requestUrl.origin + config.auth.loginUrl);
  }
}