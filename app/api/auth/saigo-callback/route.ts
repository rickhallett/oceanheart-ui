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
      // Check if the user already exists in saigo_users                                                  
      const { data: existingUser, error: selectError } = await supabase
        .from("saigo_users")
        .select("*")
        .eq("email", session.user.email)
        .maybeSingle();

      if (selectError) {
        console.error("Error querying saigo_users:", selectError);
      }

      if (existingUser) {
        // User already exists; check for generated username                                              
        if (existingUser.saigo_username) {
          // Username exists: redirect to leaderboard                                                     
          return NextResponse.redirect(requestUrl.origin + "/saigo/leaderboard");
        } else {
          // No username yet: redirect to username generation page                                        
          return NextResponse.redirect(requestUrl.origin + "/saigo/username");
        }
      } else {
        // User not found: insert new user record                                                         
        const { error: insertError } = await supabase
          .from("saigo_users")
          .insert([{ email: session.user.email, user_id: session.user.id }]);
        if (insertError) {
          console.error("Error inserting new saigo user:", insertError);
        }
        // After insertion, redirect to username generation page                                          
        return NextResponse.redirect(requestUrl.origin + "/saigo/username");
      }
    }
  }
}
}
