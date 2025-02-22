import { createClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";

export async function guardSaigoRoute() {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/saigo/signin");
  }

  // Check if user has a username set
  const { data: profile } = await supabase
    .from("saigo_profiles")
    .select("username")
    .eq("id", session.user.id)
    .single();

  if (profile?.username) {
    // If we're not already on the leaderboard, redirect there
    if (!window.location.pathname.includes("/saigo/leaderboard")) {
      redirect("/saigo/leaderboard");
    }
  } else {
    // If we're not already on the username page, redirect there
    if (!window.location.pathname.includes("/saigo/username")) {
      redirect("/saigo/username");
    }
  }
}
