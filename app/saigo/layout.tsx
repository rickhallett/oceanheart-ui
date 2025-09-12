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
  // Authentication and key checks disabled - allow all users to navigate
  return <>{children}</>;
}
