import { createClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";

export async function guardUsernamePage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/saigo/signin");
  }
  const { data: profile, error } = await supabase
    .from("saigo_users")
    .select("username")
    .eq("user_id", user.id)
    .single();
  if (error) {
    console.error("Error fetching saigo user for username page:", error);
  }
  // If a username exists, the user should not be on the username page
  if (profile?.username) {
    redirect("/saigo/leaderboard");
  }
}

export async function guardLeaderboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/saigo/signin");
  }
  const { data: profile, error } = await supabase
    .from("saigo_users")
    .select("username")
    .eq("user_id", user.id)
    .single();
  if (error) {
    console.error("Error fetching saigo user for leaderboard:", error);
  }
  // If no username exists, the user should not be on the leaderboard page
  if (!profile?.username) {
    redirect("/saigo/username");
  }
}
