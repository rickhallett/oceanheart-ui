import Header from "@/components/Header";
import SuspendedFooter from "@/components/Footer";

export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </main>
      <SuspendedFooter />
    </>
  );
}
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";

export default async function LeaderboardLayout({ children }: { children: ReactNode }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/saigo/signin');
  }

  const { data: saigoUser } = await supabase
    .from("saigo_users")
    .select("saigo_username")
    .eq("email", user.email)
    .maybeSingle();

  if (!saigoUser || saigoUser.saigo_username === null) {
    return redirect("/saigo/username");
  }

  return <>{children}</>;
}
