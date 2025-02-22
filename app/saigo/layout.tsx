import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import config from "@/config";
import { headers } from "next/headers";

// Mark as server component explicitly
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SaigoLayoutPrivate({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createClient();
  const currentPath = headers().get("x-pathname") || "";

  // Step 1: Get user session
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return redirect(config.auth.loginUrl);
  }

  // Step 2: Get user data in a single query
  const { data: saigoUser, error: userError } = await supabase
    .from("saigo_users")
    .select(`
      *,
      username (*)
    `)
    .eq("email", user.email)
    .maybeSingle();

  if (userError || !saigoUser) {
    return redirect(config.auth.loginUrl);
  }

  // Step 3: Handle routing based on username status
  const hasUsername = saigoUser.saigo_username !== null;
  const isOnUsernamePage = currentPath.includes('/saigo/username');

  if (!hasUsername && !isOnUsernamePage) {
    return redirect('/saigo/username');
  }

  if (hasUsername && isOnUsernamePage) {
    return redirect('/saigo/leaderboard');
  }

  return <>{children}</>;
}
