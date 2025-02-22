import { createClient } from "@/libs/supabase/server";

async function getLeaderboardData() {
  const supabase = createClient();
  
  // Get users with their total points
  const { data: leaderboardData, error } = await supabase
    .from('saigo_users')
    .select(`
      id,
      username,
      practices (
        points
      )
    `);

  if (error) {
    console.error('Error fetching leaderboard data:', error);
    return [];
  }

  // Calculate total points per user and sort
  const usersWithPoints = leaderboardData.map(user => ({
    username: user.username,
    totalPoints: user.practices?.reduce((sum, practice) => sum + (practice.points || 0), 0) || 0
  })).sort((a, b) => b.totalPoints - a.totalPoints);

  return usersWithPoints;
}

export default async function LeaderboardPage() {
  const leaderboardData = await getLeaderboardData();
  const totalPoints = leaderboardData.reduce((sum, user) => sum + user.totalPoints, 0);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold text-white mb-6">Leaderboard</h1>
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-2xl">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-3 px-4 text-gray-300">Username</th>
              <th className="py-3 px-4 text-gray-300 text-right">Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((user, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="py-3 px-4 text-gray-300">{user.username}</td>
                <td className="py-3 px-4 text-gray-300 text-right">{user.totalPoints}</td>
              </tr>
            ))}
            <tr className="border-t-2 border-gray-600">
              <td className="py-3 px-4 text-gray-300 font-bold">Alisone</td>
              <td className="py-3 px-4 text-gray-300 text-right font-bold">{totalPoints}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
