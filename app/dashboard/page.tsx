import ButtonAccount from "@/components/ButtonAccount";
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
  let homepage = "/";

  try {

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

    if (saigoUser) {
      homepage = "/saigo/leaderboards";
    }

  } catch (e) {
    console.log("An unexpected error occured", e);
  }

  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8">
        <ButtonAccount />
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
