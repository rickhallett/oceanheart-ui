import ButtonAccount from "@/components/ButtonAccount";
import { createClient } from "@/libs/supabase/server";
import Link from "next/link";

async function getPracticeSummaryData() {
  const supabase = createClient();

  const { data: practiceData, error } = await supabase
    .from('practices')
    .select('type, points');

  if (error) {
    console.error('Error fetching practice summary data:', error);
    return [];
  }

  // Aggregate practices by type
  const summary = practiceData.reduce((acc, practice) => {
    if (!practice.type) return acc;
    acc[practice.type] = (acc[practice.type] || 0) + (practice.points || 0);
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(summary).map(([type, totalPoints]) => ({
    type,
    totalPoints
  }));
}

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
    `)
    .not('username', 'is', null);  // Only get users with usernames set

  console.log('Query error if any:', error);
  console.log('Number of users found:', leaderboardData?.length);
  console.log('Raw user data:', leaderboardData);

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
  const [leaderboardData, practiceSummary] = await Promise.all([
    getLeaderboardData(),
    getPracticeSummaryData()
  ]);

  const totalPoints = leaderboardData.reduce((sum, user) => sum + user.totalPoints, 0);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="flex flex-row items-end justify-end w-1/2 mb-4">
        <ButtonAccount />
      </div>
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

      {/* Practice Summary Section */}
      <div className="mt-8 bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-white mb-4">Practice Summary</h2>
        <div className="flex flex-wrap gap-4">
          {practiceSummary.map((practice, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4 flex-1 min-w-[150px]">
              <div className="text-gray-300 font-medium mb-1">{practice.type}</div>
              <div className="text-2xl font-bold text-white">{practice.totalPoints}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
