import { NextResponse } from "next/server";
import { createServiceClient } from "@/libs/supabase/server";

export async function GET() {
  const supabase = createServiceClient(); // Uses service role key under the hood

  // 1) Fetch leaderboard data: total points per user
  const { data: leaderboardData, error: leaderboardError } = await supabase
    .from('practices')
    .select(`
      user_id,
      saigo_users (
        username
      ),
      total_points: sum(points)
    `)
    .order('total_points', { ascending: false });

  if (leaderboardError) {
    return NextResponse.json(
      { error: leaderboardError.message },
      { status: 400 }
    );
  }

  // Map leaderboard data
  const usersWithPoints = (leaderboardData ?? []).map((entry: any) => ({
    username: entry.saigo_users.username,
    totalPoints: entry.total_points,
  }));

  // 2) Fetch daily points over the last 7 days
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setUTCDate(today.getUTCDate() - 6); // Last 7 days including today

  // Convert dates to ISO strings
  const startDateStr = sevenDaysAgo.toISOString();
  const endDateStr = today.toISOString();

  const { data: dailyPointsData, error: dailyPointsError } = await supabase
    .from('practices')
    .select(`
      date: date_trunc('day', created_at),
      total_points: sum(points)
    `)
    .gte('created_at', startDateStr)
    .lte('created_at', endDateStr)
    .order('date', { ascending: true });

  if (dailyPointsError) {
    return NextResponse.json(
      { error: dailyPointsError.message },
      { status: 400 }
    );
  }

  // Build dailyPoints array ordered by date
  const dailyPointsMap: Record<string, number> = {};
  // Initialize the map with dates and zero points
  for (let i = 0; i < 7; i++) {
    const date = new Date(sevenDaysAgo);
    date.setUTCDate(sevenDaysAgo.getUTCDate() + i);
    const dateStr = date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
    dailyPointsMap[dateStr] = 0;
  }

  // Fill in the aggregated points
  (dailyPointsData ?? []).forEach((entry: any) => {
    const dateStr = entry.date.split('T')[0];
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
    `)
    .order('total_points', { ascending: false });

  if (practiceSummaryError) {
    return NextResponse.json(
      { error: practiceSummaryError.message },
      { status: 400 }
    );
  }

  const practiceSummary = (practiceSummaryData ?? []).map((entry: any) => ({
    type: entry.type,
    totalPoints: entry.total_points,
  }));

  return NextResponse.json({
    leaderboardData: usersWithPoints,
    practiceSummary,
    dailyPoints,
  });
}
