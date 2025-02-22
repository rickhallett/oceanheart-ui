import { NextResponse } from "next/server";
import { createServiceClient } from "@/libs/supabase/server";

export async function GET() {
  const supabase = createServiceClient();

  // Calculate date range for last 7 days (inclusive)
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0); // Set to UTC midnight
  const sevenDaysAgo = new Date(today.getTime() - 6 * 86400000); // 6 days before today

  const startDateStr = sevenDaysAgo.toISOString();
  const endDateStr = new Date(today.getTime() + 86400000 - 1).toISOString(); // End of today

  // Fetch raw practice data for the last 7 days
  const { data: practicesData, error: practicesError } = await supabase
    .from('practices')
    .select(`
      user_id,
      points,
      type,
      created_at,
      saigo_users (
        username
      )
    `)
    .gte('created_at', startDateStr)
    .lte('created_at', endDateStr);

  if (practicesError) {
    return NextResponse.json(
      { error: practicesError.message },
      { status: 400 }
    );
  }

  // Aggregate points per user
  const usersWithPointsMap: Record<string, number> = {};
  (practicesData ?? []).forEach((entry: any) => {
    const username = entry.saigo_users?.username || "Unknown";
    const points = entry.points || 0;
    usersWithPointsMap[username] = (usersWithPointsMap[username] || 0) + points;
  });

  const usersWithPoints = Object.entries(usersWithPointsMap).map(([username, totalPoints]) => ({
    username,
    totalPoints,
  }));

  // Sort users by totalPoints in descending order
  usersWithPoints.sort((a, b) => b.totalPoints - a.totalPoints);

  // Initialize and populate dailyPoints array
  const dailyPointsMap: Record<string, number> = {};

  // Calculate dates for the last 7 days
  for (let i = 0; i < 7; i++) {
    const date = new Date(sevenDaysAgo.getTime() + i * 86400000); // Add i days in milliseconds
    const dateStr = date.toISOString().split('T')[0];
    dailyPointsMap[dateStr] = 0;
  }

  // Aggregate points per day
  (practicesData ?? []).forEach((practice: any) => {
    const dateStr = new Date(practice.created_at).toISOString().split('T')[0];
    if (dailyPointsMap.hasOwnProperty(dateStr)) {
      dailyPointsMap[dateStr] += practice.points || 0;
    }
  });

  // Create an ordered array of daily points
  const orderedDates = Object.keys(dailyPointsMap).sort();
  const dailyPoints = orderedDates.map(date => dailyPointsMap[date]);

  // Aggregate points per practice type
  const practiceSummaryMap: Record<string, number> = {};
  (practicesData ?? []).forEach((practice: any) => {
    const type = practice.type || "Unknown";
    const points = practice.points || 0;
    practiceSummaryMap[type] = (practiceSummaryMap[type] || 0) + points;
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
