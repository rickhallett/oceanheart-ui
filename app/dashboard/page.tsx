import AuthButton from "@/components/AuthButton";
import { redirect } from "next/navigation";
import { createClient } from "@/libs/supabase/server";
import Link from "next/link";
import config from "@/config";

export const dynamic = "force-dynamic";

// This is a private page: It's protected by the layout.js component which ensures the user is authenticated.
// It's a server compoment which means you can fetch data (like the user profile) before the page is rendered.
// See https://shipfa.st/docs/tutorials/private-page
export default async function Dashboard() {
  const supabase = createClient();
  const homepage = "/";

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect(config.auth.loginUrl);
    }

    // Note: Saigo user check removed as part of Saigo feature archival

  } catch (e) {
    console.log("An unexpected error occurred", e);
  }

  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8">
        <AuthButton mode="account" />
        <h1 className="text-3xl md:text-4xl font-extrabold">Dashboard...coming soon!</h1>
        <p>
          This is where you'll manage your account and settings.
        </p>
        <Link href={homepage} >
          Back Home
        </Link>
      </section>
    </main>
  );
}
