import { createClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";

export async function guardUsernamePage() {
  // Authentication guards disabled - allow all users to access username page
  return;
}

export async function guardLeaderboardPage() {
  // Authentication guards disabled - allow all users to access leaderboard page
  return;
}
