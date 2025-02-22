import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";

export default async function LeaderboardLayout({ children }: { children: ReactNode }) {


  return <>{children}</>;
}
import { ReactNode } from "react";
import { guardSaigoRoute } from "../lib/guard";

export default async function Layout({ children }: { children: ReactNode }) {
  await guardSaigoRoute();
  return <>{children}</>;
}
