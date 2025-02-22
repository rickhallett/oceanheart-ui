import ButtonAccount from "@/components/ButtonAccount";
import LineGraph from "@/components/LineGraph";

export default async function LeaderboardPage() {
  // Fetch data from the secure route
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/saigo/leaderboard`, {
    cache: "no-store",
  });

  if (!res.ok) {
    // Handle error gracefully
    return <div>Error fetching leaderboard data: {JSON.stringify(res)}</div>;
  }

  const { leaderboardData, practiceSummary, dailyPoints } = await res.json();
  console.log(dailyPoints);

  // Split leaderboard data into two columns
  const half = Math.ceil(leaderboardData.length / 2);
  const leftData = leaderboardData.slice(0, half);
  const rightData = leaderboardData.slice(half);

  // Calculate total across all users
  const totalPoints = leaderboardData.reduce((sum: number, user: any) => sum + user.totalPoints, 0);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="flex flex-row items-end justify-end w-1/2 mb-4">
        <ButtonAccount />
      </div>

      <h1 className="text-4xl font-bold text-white mb-6">Leaderboard</h1>
      <div className="bg-gray-800 rounded-lg p-8 w-full max-w-4xl">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4 text-gray-300">Username</th>
                  <th className="py-3 px-4 text-gray-300 text-right">Points</th>
                </tr>
              </thead>
              <tbody>
                {leftData.map((user: any, index: number) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="py-3 px-4 text-gray-300">{user.username}</td>
                    <td className="py-3 px-4 text-gray-300 text-right">
                      {user.totalPoints}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex-1">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-3 px-4 text-gray-300">Username</th>
                  <th className="py-3 px-4 text-gray-300 text-right">Points</th>
                </tr>
              </thead>
              <tbody>
                {rightData.map((user: any, index: number) => (
                  <tr key={index + half} className="border-b border-gray-700">
                    <td className="py-3 px-4 text-gray-300">{user.username}</td>
                    <td className="py-3 px-4 text-gray-300 text-right">
                      {user.totalPoints}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4">
          <table className="w-full text-left">
            <tbody>
              <tr className="border-t-2 border-gray-600">
                <td className="py-3 px-4 text-gray-300 font-bold">Alisone</td>
                <td className="py-3 px-4 text-gray-300 text-right font-bold">
                  {totalPoints}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Practice Summary Section */}
      <div className="mt-8 bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-white mb-4">Practice Summary</h2>
        <div className="flex flex-wrap gap-4">
          {practiceSummary.map((practice: any, index: number) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4 flex-1 min-w-[150px]">
              <div className="text-gray-300 font-medium mb-1">
                {practice.type}
              </div>
              <div className="text-2xl font-bold text-white">
                {practice.totalPoints}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Line Graph Section */}
      <div className="mt-8">
        {/* Replace the array below with dynamic data if available */}
        <LineGraph data={dailyPoints} />
      </div>
    </div>
  );
}
