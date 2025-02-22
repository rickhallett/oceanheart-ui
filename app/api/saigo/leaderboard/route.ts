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
    .select("type, points");

  if (practiceError) {
    return NextResponse.json(
      { error: practiceError.message },
      { status: 400 }
    );
  }

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
  });
}