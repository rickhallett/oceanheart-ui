import ButtonAccount from "@/components/ButtonAccount";
import LeaderboardTable from "@/components/LeaderboardTable";
import LineGraph from "@/components/LineGraph";
import PracticeSummaryPieChart from "@/components/PracticeSummaryPieChart";
import PracticeTypesStackedBarChart from "@/components/PracticeTypesStackedBarChart";
import CumulativePointsAreaChart from "@/components/CumulativePointsAreaChart";
import PracticeTypesRadarChart from "@/components/PracticeTypesRadarChart";
import Countdown from "@/components/Countdown";
import Image from "next/image";

export default async function LeaderboardPage() {
  // Fetch data from the secure route
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/saigo/leaderboard`, {
    cache: "no-store",
  });

  if (!res.ok) {
    // Handle error gracefully
    return <div>Error fetching leaderboard data: {JSON.stringify(res)}</div>;
  }

  const { leaderboardData, practiceSummary, dailyPoints, stackedData, practiceTypes } = await res.json();

  // Calculate total across all users
  const totalPoints = leaderboardData.reduce((sum: number, user: any) => sum + user.totalPoints, 0);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="flex flex-row items-end justify-end w-3/4 my-4">
        <ButtonAccount />
      </div>

      <h1 className="text-4xl font-bold text-white mb-6">Leaderboard</h1>
      <Image src="/images/hbi_transparent.webp" alt="Saigo Logo" width={200} height={200} />
      <div className="flex flex-row items-center justify-center w-full py-5">
        <Countdown />
      </div>
      <LeaderboardTable data={leaderboardData} />
      <div className="w-full max-w-4xl mx-auto mt-4 bg-gray-800 rounded-lg p-4">
        <div className="flex justify-between items-center text-gray-300 font-bold border-t-2 border-gray-600 py-3 px-4">
          <span>Alisone</span>
          <span>{totalPoints}</span>
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
                {practice.totalPoints} <span className="text-sm">mins</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-row items-center justify-center w-full gap-6 flex-wrap">

        {/* Stacked Bar Chart Section */}
        <div className="mt-8">
          <PracticeTypesStackedBarChart data={stackedData} practiceTypes={practiceTypes} />
        </div>

        {/* Line Graph Section */}
        <div className="mt-8">
          <LineGraph data={dailyPoints} />
        </div>



        {/* Pie Chart Section */}
        <div className="mt-8">
          <PracticeSummaryPieChart data={practiceSummary} />
        </div>


      </div>

      <div className="flex flex-row items-center justify-center w-full gap-6 flex-wrap">
        {/* Cumulative Area Chart Section */}
        <div className="mt-8">
          <CumulativePointsAreaChart dailyPoints={dailyPoints} />
        </div>

        {/* Radar Chart Section */}
        <div className="mt-8">
          <PracticeTypesRadarChart data={practiceSummary} />
        </div>
      </div>

    </div>
  );
}
