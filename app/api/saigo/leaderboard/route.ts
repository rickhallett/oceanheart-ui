import { NextResponse } from "next/server";
import { createServiceClient } from "@/libs/supabase/server";

export async function GET() {
  const supabase = createServiceClient(); // Uses service role key under the hood

  // 1) Fetch leaderboard data
  const { data: leaderboardData, error: leaderboardError } = await supabase
    .from("saigo_users")
    .select(`
      id,
      username,
      practices (
        points
      )
    `);

  if (leaderboardError) {
    return NextResponse.json(
      { error: leaderboardError.message },
      { status: 400 }
    );
  }

  // Calculate total points per user and sort
  const usersWithPoints = (leaderboardData ?? []).map((user) => ({
    username: user.username,
    totalPoints:
      user.practices?.reduce(
        (sum, practice) => sum + (practice.points || 0),
        0
      ) || 0,
  })).sort((a, b) => b.totalPoints - a.totalPoints);

  // 2) Fetch practice summary
  const { data: practiceData, error: practiceError } = await supabase
    .from("practices")
    .select("type, points, created_at");

  if (practiceError) {
    return NextResponse.json(
      { error: practiceError.message },
      { status: 400 }
    );
  }

  // Calculate daily points over the past 7 days
  const dailyPointsMap: Record<string, number> = {};
  const today = new Date();
  // Initialize keys for today and the previous 6 days
  for (let i = 0; i < 7; i++) {
    const d = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() - i));
    const dayStr = d.toISOString().split("T")[0];
    dailyPointsMap[dayStr] = 0;
  }
  // Aggregate points for practices created in these days
  (practiceData ?? []).forEach((practice: any) => {
    if (practice.created_at) {
      const dateStr = practice.created_at.split("T")[0];
      if (dailyPointsMap.hasOwnProperty(dateStr)) {
        dailyPointsMap[dateStr] += practice.points || 0;
      }
    }
  });
  // Build an array ordered from oldest to newest
  const orderedDays = Object.keys(dailyPointsMap).sort();
  const dailyPoints = orderedDays.map(day => dailyPointsMap[day]);

  // Aggregate practices by type
  const summary = (practiceData ?? []).reduce((acc, practice) => {
    if (!practice.type) return acc;
    acc[practice.type] = (acc[practice.type] || 0) + (practice.points || 0);
    return acc;
  }, {} as Record<string, number>);

  const practiceSummary = Object.entries(summary).map(([type, totalPoints]) => ({
    type,
    totalPoints,
  }));

  return NextResponse.json({
    leaderboardData: usersWithPoints,
    practiceSummary,
    dailyPoints
  });
}
