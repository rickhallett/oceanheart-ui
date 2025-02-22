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

  // Step 2: Get user data to verify they exist
  const { data: saigoUser, error: userError } = await supabase
    .from("saigo_users")
    .select("id")
    .eq("email", user.email)
    .maybeSingle();

  if (userError || !saigoUser) {
    return redirect(config.auth.loginUrl);
  }

  return <>{children}</>;
}
