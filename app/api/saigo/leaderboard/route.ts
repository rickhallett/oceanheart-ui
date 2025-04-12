import { NextResponse } from "next/server";
import { createServiceClient } from "@/libs/supabase/server";

export async function GET() {
  const supabase = createServiceClient();

  // Competition start date (from Countdown.tsx)
  const competitionStartDate = new Date("2025-03-18T09:30:00Z");
  const competitionStartDateStr = competitionStartDate.toISOString();

  // Calculate end date (end of today UTC)
  const today = new Date(Date.UTC(
    new Date().getUTCFullYear(),
    new Date().getUTCMonth(),
    new Date().getUTCDate()
  ));
  const endDateStr = new Date(today.getTime() + 86400000 - 1).toISOString(); // End of today

  // Fetch ALL practices since the competition started
  const { data: allPracticesData, error: practicesError } = await supabase
    .from('practices')
    .select(`
      user_id,
      points,
      type,
      created_at,
      saigo_user:saigo_users!practices_user_id_fkey (
        username
      )
    `)
    .gte('created_at', competitionStartDateStr) // Use competition start date
    .lte('created_at', endDateStr);

  if (practicesError) {
    console.error('Error fetching practices:', practicesError);
    return NextResponse.json(
      { error: practicesError.message },
      { status: 400 }
    );
  }

  // Filter out HDI practices from the fetched data
  const filteredAllPracticesData = (allPracticesData ?? []).filter((practice: any) => practice.type !== 'HDI');

  // Aggregate points per user for the ALL-TIME leaderboard (using filtered data)
  const usersWithPointsMap: Record<string, number> = {};
  filteredAllPracticesData.forEach((entry: any) => {
    const username = entry.saigo_user?.username || `User_${String(entry.user_id).substring(0, 8)}`;
    const points = entry.points || 0;
    usersWithPointsMap[username] = (usersWithPointsMap[username] || 0) + points;
  });

  const leaderboardData = Object.entries(usersWithPointsMap).map(([username, totalPoints]) => ({
    username,
    totalPoints,
  }));

  // Sort users by totalPoints in descending order for the leaderboard
  leaderboardData.sort((a, b) => b.totalPoints - a.totalPoints);

  // --- Calculate data for GRAPHS based on the LAST 7 DAYS ---

  // Calculate start date for last 7 days in UTC (inclusive)
  const sevenDaysAgo = new Date(Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate() - 6
  ));
  const last7DaysStartDateStr = sevenDaysAgo.toISOString();

  // Filter practices to the last 7 days (from the already filtered data)
  const filteredLast7DaysPracticesData = filteredAllPracticesData.filter((practice: any) => {
    const practiceDate = new Date(practice.created_at);
    return practiceDate >= sevenDaysAgo && practiceDate.toISOString() <= endDateStr;
  });


  // Initialize and populate dailyPoints array for the last 7 days
  const dailyPointsMap: Record<string, number> = {};
  const orderedDates: string[] = []; // For ordering the graph data correctly

  for (let i = 0; i < 7; i++) {
    const date = new Date(Date.UTC(
      sevenDaysAgo.getUTCFullYear(),
      sevenDaysAgo.getUTCMonth(),
      sevenDaysAgo.getUTCDate() + i,
      0, 0, 0
    ));
    const dateStr = date.toISOString().split('T')[0];
    dailyPointsMap[dateStr] = 0;
    orderedDates.push(dateStr);
  }

  // Aggregate points per day using the last 7 days' data (filtered)
  filteredLast7DaysPracticesData.forEach((practice: any) => {
    const practiceDate = new Date(practice.created_at);
    const dateStr = practiceDate.toISOString().split('T')[0];
    if (dailyPointsMap.hasOwnProperty(dateStr)) {
      dailyPointsMap[dateStr] += practice.points || 0;
    }
  });

  // Create an ordered array of daily points for the last 7 days
  const dailyPoints = orderedDates.map(date => dailyPointsMap[date]);


  // Create data for stacked bar chart using the last 7 days' data
  const stackedData = orderedDates.map(date => {
    const dayData: Record<string, any> = {
      day: new Date(date + 'T00:00:00Z').toLocaleDateString('en-US', { weekday: 'short' }) // Ensure UTC interpretation
    };

    const practiceTypesInPeriod = new Set(filteredLast7DaysPracticesData.map((p: any) => p.type));

    // Initialize all practice types found in the period to 0 for this day
    practiceTypesInPeriod.forEach(type => {
      if (!dayData[type]) { // Check prevents overwriting if already exists (though unlikely here)
        dayData[type] = 0;
      }
    });


    // Sum points for each practice type on this day using the last 7 days' data (filtered)
    filteredLast7DaysPracticesData.forEach((practice: any) => {
      const practiceDate = new Date(practice.created_at).toISOString().split('T')[0];
      if (practiceDate === date && practice.type) { // Ensure type exists
        dayData[practice.type] = (dayData[practice.type] || 0) + (practice.points || 0);
      }
    });

    return dayData;
  });


  // Get unique practice types from the last 7 days' data (filtered)
  const practiceTypesArray = Array.from(new Set(filteredLast7DaysPracticesData.map((p: any) => p.type).filter(Boolean))); // <-- Use filtered data


  // Aggregate points per practice type using ALL data since competition start (filtered)
  const practiceSummaryMap: Record<string, number> = {};
  filteredAllPracticesData.forEach((practice: any) => {
    const type = practice.type || "Unknown";
    const points = practice.points || 0;
    practiceSummaryMap[type] = (practiceSummaryMap[type] || 0) + points;
  });

  const practiceSummary = Object.entries(practiceSummaryMap).map(([type, totalPoints]) => ({
    type,
    totalPoints,
  }));

  // Sort practice types by totalPoints in descending order (based on ALL data)
  practiceSummary.sort((a, b) => b.totalPoints - a.totalPoints);

  return NextResponse.json({
    leaderboardData, // All-time leaderboard rankings
    practiceSummary, // All-time practice summary for pie chart
    dailyPoints,     // 7-day graph data
    stackedData,     // 7-day graph data
    practiceTypes: practiceTypesArray // 7-day graph data for stacked chart keys
  });
}
