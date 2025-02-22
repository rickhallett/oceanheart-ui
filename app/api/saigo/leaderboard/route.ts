import { NextResponse } from "next/server";
import { createServiceClient } from "@/libs/supabase/server";

export async function GET() {
  const supabase = createServiceClient();

  // 1) Fetch leaderboard data: total points per user
  const { data: leaderboardData, error: leaderboardError } = await supabase
    .from('practices')
    .select(`
      user_id,
      total_points: sum(points),
      saigo_users (
        username
      )
    `);

  if (leaderboardError) {
    return NextResponse.json(
      { error: leaderboardError.message },
      { status: 400 }
    );
  }

  // Map leaderboard data
  const usersWithPointsMap: Record<string, number> = {};
  (leaderboardData ?? []).forEach((entry: any) => {
    const username = entry.saigo_users?.username || "Unknown";
    if (usersWithPointsMap[username]) {
      usersWithPointsMap[username] += entry.total_points;
    } else {
      usersWithPointsMap[username] = entry.total_points;
    }
  });

  const usersWithPoints = Object.entries(usersWithPointsMap).map(([username, totalPoints]) => ({
    username,
    totalPoints,
  }));

  // Sort users by totalPoints in descending order
  usersWithPoints.sort((a, b) => b.totalPoints - a.totalPoints);

  // 2) Fetch daily points over the last 7 days
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setUTCDate(today.getUTCDate() - 6);

  const startDateStr = sevenDaysAgo.toISOString();
  const endDateStr = today.toISOString();

  const { data: dailyPointsData, error: dailyPointsError } = await supabase
    .from('practices')
    .select(`
      date: created_at::date,
      total_points: sum(points)
    `)
    .gte('created_at', startDateStr)
    .lte('created_at', endDateStr);

  if (dailyPointsError) {
    return NextResponse.json(
      { error: dailyPointsError.message },
      { status: 400 }
    );
  }

  // Build dailyPoints array ordered by date
  const dailyPointsMap: Record<string, number> = {};
  for (let i = 0; i < 7; i++) {
    const date = new Date(sevenDaysAgo);
    date.setUTCDate(sevenDaysAgo.getUTCDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    dailyPointsMap[dateStr] = 0;
  }

  // Fill in the aggregated points
  (dailyPointsData ?? []).forEach((entry: any) => {
    const dateStr = entry.date;
    if (dailyPointsMap.hasOwnProperty(dateStr)) {
      dailyPointsMap[dateStr] = entry.total_points;
    }
  });

  // Create an ordered array of daily points
  const orderedDates = Object.keys(dailyPointsMap).sort();
  const dailyPoints = orderedDates.map(date => dailyPointsMap[date]);

  // 3) Fetch practice summary
  const { data: practiceSummaryData, error: practiceSummaryError } = await supabase
    .from('practices')
    .select(`
      type,
      total_points: sum(points)
    `);

  if (practiceSummaryError) {
    return NextResponse.json(
      { error: practiceSummaryError.message },
      { status: 400 }
    );
  }

  // Aggregate points per practice type
  const practiceSummaryMap: Record<string, number> = {};
  (practiceSummaryData ?? []).forEach((entry: any) => {
    const type = entry.type || "Unknown";
    if (practiceSummaryMap[type]) {
      practiceSummaryMap[type] += entry.total_points;
    } else {
      practiceSummaryMap[type] = entry.total_points;
    }
  });

  const practiceSummary = Object.entries(practiceSummaryMap).map(([type, totalPoints]) => ({
    type,
    totalPoints,
  }));

  // Sort practice types by totalPoints in descending order
  practiceSummary.sort((a, b) => b.totalPoints - a.totalPoints);

  return NextResponse.json({
    leaderboardData: usersWithPoints,
    practiceSummary,
    dailyPoints,
  });
}
