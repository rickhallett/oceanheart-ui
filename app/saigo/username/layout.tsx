import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";

export default async function UsernameLayout({ children }: { children: ReactNode }) {
  // const supabase = createClient();
  // const { data: { user } } = await supabase.auth.getUser();

  // if (!user) {
  //   return redirect('/saigo/signin');
  // }

  // const { data: saigoUser } = await supabase
  //   .from("saigo_users")
  //   .select("saigo_username")
  //   .eq("email", user.email)
  //   .maybeSingle();

  // if (saigoUser?.saigo_username !== null) {
  //   return redirect("/saigo/leaderboard");
  // }

  return <>{children}</>;
}
import { ReactNode } from "react";
import { guardSaigoRoute } from "../lib/guard";

export default async function Layout({ children }: { children: ReactNode }) {
  await guardSaigoRoute();
  return <>{children}</>;
}
