import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import config from "@/config";

export default async function SaigoLayoutPrivate({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createClient();

  // Step 1: Check that the user is authenticated.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(config.auth.loginUrl);
  }

  // Step 2: Verify the user exists in the "saigo_users" table.
  const { data: saigoUser } = await supabase
    .from("saigo_users")
    .select("*")
    .eq("email", user.email)
    .maybeSingle();

  if (!saigoUser) {
    // If the user does not exist in the saigo_users table, redirect to the non‐saigo sign‑in.
    redirect(config.auth.loginUrl);
  }

  // Step 3: Check if the user has been assigned a username in the "saigo_username" table.
  const { data: usernameData } = await supabase
    .from("saigo_username")
    .select("*")
    .eq("email", user.email)
    .maybeSingle();

  if (!usernameData) {
    // If no username found, redirect to the username generation page.
    redirect("/saigo/username");
  }

  return <>{children}</>;
}
