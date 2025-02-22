import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";

export default async function LeaderboardLayout({ children }: { children: ReactNode }) {


  return <>{children}</>;
}
