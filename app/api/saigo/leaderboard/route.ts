import { NextResponse } from "next/server";
import { createServiceClient } from "@/libs/supabase/server";

export async function GET() {
  const supabase = createServiceClient();

  // Calculate date range for last 7 days in UTC (inclusive)
  const today = new Date(Date.UTC(
    new Date().getUTCFullYear(),
    new Date().getUTCMonth(),
    new Date().getUTCDate()
  ));
  const sevenDaysAgo = new Date(Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate() - 6
  ));

  const startDateStr = sevenDaysAgo.toISOString();
  const endDateStr = new Date(today.getTime() + 86400000 - 1).toISOString(); // End of today

  // Fetch raw practice data with joined username from saigo_users
  const { data: practicesData, error: practicesError } = await supabase
    .from('practices')
    .select(`
      user_id,
      points,
      type,
      created_at,
      saigo_users!inner (
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

  // Aggregate points per user using the joined username
  const usersWithPointsMap: Record<string, number> = {};
  (practicesData ?? []).forEach((entry: any) => {
    // Use the joined data, falling back to a partial ID only if necessary
    const username = entry.saigo_user?.username || `User_${String(entry.user_id).substring(0, 8)}`;
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
    const date = new Date(Date.UTC(
      sevenDaysAgo.getUTCFullYear(),
      sevenDaysAgo.getUTCMonth(),
      sevenDaysAgo.getUTCDate() + i,
      0, 0, 0
    ));
    const dateStr = date.toISOString().split('T')[0];
    dailyPointsMap[dateStr] = 0;
  }

  // Aggregate points per day
  (practicesData ?? []).forEach((practice: any) => {
    const practiceDate = new Date(practice.created_at);
    const dateStr = practiceDate.toISOString().split('T')[0];
    if (dailyPointsMap.hasOwnProperty(dateStr)) {
      dailyPointsMap[dateStr] += practice.points || 0;
    }
  });

  // Create ordered array of dates
  const orderedDates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(Date.UTC(
      sevenDaysAgo.getUTCFullYear(),
      sevenDaysAgo.getUTCMonth(),
      sevenDaysAgo.getUTCDate() + i,
      0, 0, 0
    ));
    const dateStr = date.toISOString().split('T')[0];
    orderedDates.push(dateStr);
  }

  // Create data for stacked bar chart
  const stackedData = orderedDates.map(date => {
    const dayData: Record<string, any> = {
      day: new Date(date).toLocaleDateString('en-US', { weekday: 'short' })
    };

    // Initialize all practice types to 0
    practicesData?.forEach((practice: any) => {
      if (!dayData[practice.type]) {
        dayData[practice.type] = 0;
      }
    });

    // Sum points for each practice type on this day
    practicesData?.forEach((practice: any) => {
      const practiceDate = practice.created_at.split('T')[0];
      if (practiceDate === date) {
        dayData[practice.type] = (dayData[practice.type] || 0) + (practice.points || 0);
      }
    });

    return dayData;
  });

  // Create an ordered array of daily points
  const dailyPoints = orderedDates.map(date => dailyPointsMap[date]);

  // Get unique practice types
  const practiceTypesArray = Array.from(new Set(practicesData?.map((p: any) => p.type)));

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
    stackedData,
    practiceTypes: practiceTypesArray
  });
}
