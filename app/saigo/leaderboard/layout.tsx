import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";

import { guardSaigoRoute } from "../lib/guard";

export default async function Layout({ children }: { children: ReactNode }) {
  await guardSaigoRoute();
  return <>{children}</>;
}
import { ReactNode } from "react";
import { guardLeaderboardPage } from "../lib/guard";

export default async function Layout({ children }: { children: ReactNode }) {
  await guardLeaderboardPage();
  return <>{children}</>;
}
