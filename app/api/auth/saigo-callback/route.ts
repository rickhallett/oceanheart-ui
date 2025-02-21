import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@/libs/supabase/server";
import config from "@/config";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createClient();
    const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error("Error during session exchange:", error);
    }
    if (session?.user?.email) {
      try {
        const { error: insertError } = await supabase
          .from("saigo_users")
          .insert([{ 
            email: session.user.email,
            user_id: session.user.id 
          }]);
        if (insertError) {
          console.error("Error inserting saigo user:", insertError);
        }
      } catch (insertionException) {
        console.error("Exception inserting saigo user:", insertionException);
      }
    }
  }

  // Redirect to Saigo-specific callback URL
  return NextResponse.redirect(requestUrl.origin + config.auth.saigo.callbackUrl);
}
