import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/libs/supabase/server";
import config from "@/config";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  console.log("🚀 Starting auth callback processing...");
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get("code");
  console.log("📝 Auth code present:", !!code);

  if (code) {
    console.log("⚙️ Creating Supabase client...");
    const supabase = createClient();

    console.log("🔄 Exchanging code for session...");
    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("❌ Session exchange error:", {
        error: error.message,
        status: error.status
      });
    }

    if (session?.user?.email) {
      console.log("✅ Session obtained successfully for email:", session.user.email);

      console.log("🔍 Checking for existing user in saigo_users...");
      const { data: existingUser, error: selectError } = await supabase
        .from("saigo_users")
        .select("*")
        .eq("email", session.user.email)
        .maybeSingle();

      if (selectError) {
        console.error("❌ Error querying saigo_users:", {
          error: selectError.message,
          hint: selectError.hint
        });
      }

      if (existingUser) {
        console.log("👤 Existing user found:", {
          email: existingUser.email,
          hasUsername: !!existingUser.saigo_username
        });

        if (existingUser.saigo_username) {
          console.log("➡️ Redirecting to leaderboard - username exists");
          return NextResponse.redirect(requestUrl.origin + "/saigo/leaderboard");
        } else {
          console.log("➡️ Redirecting to username generation - no username found");
          return NextResponse.redirect(requestUrl.origin + "/saigo/username");
        }
      } else {
        console.log("📝 Creating new user record...", {
          email: session.user.email,
          userId: session.user.id
        });

        const { error: insertError } = await supabase
          .from("saigo_users")
          .insert([{ email: session.user.email, user_id: session.user.id }]);

        if (insertError) {
          console.error("❌ Error inserting new saigo user:", {
            error: insertError.message,
            hint: insertError.hint
          });
        } else {
          console.log("✅ New user created successfully");
        }

        console.log("➡️ Redirecting new user to username generation");
        return NextResponse.redirect(requestUrl.origin + "/saigo/username");
      }
    } else {
      console.error("⚠️ No user email in session:", { session });
    }
  } else {
    console.error("⚠️ No auth code provided in callback URL");
  }

  console.log("⚠️ Fallback: No valid response condition met");
  return NextResponse.redirect(requestUrl.origin + config.auth.loginUrl);
}
