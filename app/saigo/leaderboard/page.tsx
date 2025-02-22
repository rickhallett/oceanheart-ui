import { createClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";

export default async function LeaderboardPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // if (!user) {
  //   return redirect('/saigo/signin');
  // }

  // const { data: saigoUser } = await supabase
  //   .from("saigo_users")
  //   .select("username")
  //   .eq("email", user.email)
  //   .maybeSingle();

  // if (!saigoUser || saigoUser.username === null) {
  //   return redirect("/saigo/username");
  // }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold text-white mb-6">Leaderboard</h1>
      <div className="bg-gray-800 rounded-lg p-8 text-center">
        <p className="text-xl text-gray-300">
          The SAIGO leaderboard is coming soon!
        </p>
        <p className="text-gray-400 mt-4">
          Track your progress and compete with other consciousness explorers.
        </p>
      </div>
    </div>
  );
}
