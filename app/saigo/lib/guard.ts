import { createClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";
import { headers } from 'next/headers';

export async function guardSaigoRoute() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/saigo/signin");
  }

  // Check if user has a username set
  const { data: profile } = await supabase
    .from("saigo_users")
    .select("username")
    .eq("id", user.id)
    .single();

  // Get the current path from headers
  const headersList = headers();
  const currentPath = headersList.get("x-invoke-path") || "";
  console.log(currentPath)


  if (profile?.username) {
    // If we're not already on the leaderboard, redirect there
    if (!currentPath.includes("/saigo/leaderboard")) {
      redirect("/saigo/leaderboard");
    }
  } else {
    // If we're not already on the username page, redirect there
    if (!currentPath.includes("/saigo/username")) {
      redirect("/saigo/username");
    }
  }
}
