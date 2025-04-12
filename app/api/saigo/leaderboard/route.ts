import { NextResponse } from "next/server";
import { createServiceClient } from "@/libs/supabase/server";

// --- Type Definitions ---

interface PracticeEntry {
  user_id: string;
  points: number;
  type: string | null;
  created_at: string;
  saigo_user: {
    username: string | null;
  } | null;
}

interface LeaderboardEntry {
  username: string;
  totalPoints: number;
}

interface StackedDayData {
  day: string;
  [key: string]: number | string; // Allows for dynamic practice type keys
}

interface PracticeSummaryEntry {
  type: string;
  totalPoints: number;
}

// --- Helper Functions ---

/**
 * Filters out practice entries with type 'HDI'.
 */
const filterHdiPractices = (practices: PracticeEntry[]): PracticeEntry[] => {
  return practices.filter((practice) => practice.type !== 'HDI');
};

/**
 * Aggregates points per user and sorts for the leaderboard.
 */
const calculateLeaderboardData = (practices: PracticeEntry[]): LeaderboardEntry[] => {
  const usersWithPointsMap = practices.reduce<Record<string, number>>((acc, entry) => {
    const username = entry.saigo_user?.username || `User_${String(entry.user_id).substring(0, 8)}`;
    const points = entry.points || 0;
    acc[username] = (acc[username] || 0) + points;
    return acc;
  }, {});

  const leaderboardData = Object.entries(usersWithPointsMap).map(([username, totalPoints]) => ({
    username,
    totalPoints,
  }));

  // Sort users by totalPoints in descending order
  leaderboardData.sort((a, b) => b.totalPoints - a.totalPoints);
  return leaderboardData;
};

/**
 * Calculates the start date N days ago from a given end date (UTC).
 */
const getStartDateNDaysAgo = (endDate: Date, days: number): Date => {
  return new Date(Date.UTC(
    endDate.getUTCFullYear(),
    endDate.getUTCMonth(),
    endDate.getUTCDate() - (days - 1) // Subtract days-1 to make it inclusive
  ));
};

/**
 * Filters practices to include only those within the last N days.
 */
const filterPracticesLastNDays = (practices: PracticeEntry[], endDate: Date, days: number): PracticeEntry[] => {
  const startDate = getStartDateNDaysAgo(endDate, days);
  const startDateStr = startDate.toISOString();
  const endDateStr = new Date(endDate.getTime() + 86400000 - 1).toISOString(); // End of today

  return practices.filter((practice) => {
    const practiceDate = new Date(practice.created_at);
    // Ensure comparison happens correctly against UTC day boundaries
    return practice.created_at >= startDateStr && practice.created_at <= endDateStr;
  });
};

/**
 * Generates an array of date strings (YYYY-MM-DD) for the last N days.
 */
const getOrderedDates = (startDate: Date, days: number): string[] => {
  const dates: string[] = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(Date.UTC(
      startDate.getUTCFullYear(),
      startDate.getUTCMonth(),
      startDate.getUTCDate() + i
    ));
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

/**
 * Calculates the total points aggregated per day for the last N days.
 */
const calculateDailyPoints = (practices: PracticeEntry[], startDate: Date, days: number): number[] => {
  const orderedDates = getOrderedDates(startDate, days);
  const dailyPointsMap = orderedDates.reduce<Record<string, number>>((acc, dateStr) => {
    acc[dateStr] = 0; // Initialize all dates
    return acc;
  }, {});

  practices.forEach((practice) => {
    const dateStr = new Date(practice.created_at).toISOString().split('T')[0];
    if (dailyPointsMap.hasOwnProperty(dateStr)) {
      dailyPointsMap[dateStr] += practice.points || 0;
    }
  });

  return orderedDates.map(date => dailyPointsMap[date]);
};

/**
 * Calculates data formatted for the stacked bar chart for the last N days.
 */
const calculateStackedData = (practices: PracticeEntry[], startDate: Date, days: number): StackedDayData[] => {
  const orderedDates = getOrderedDates(startDate, days);
  const practiceTypesInPeriod = Array.from(new Set(practices.map(p => p.type).filter(Boolean))) as string[];

  return orderedDates.map(date => {
    const dayData: StackedDayData = {
      day: new Date(date + 'T00:00:00Z').toLocaleDateString('en-US', { weekday: 'short' })
    };

    // Initialize all practice types found in the period to 0 for this day
    practiceTypesInPeriod.forEach(type => {
      dayData[type] = 0;
    });

    // Sum points for each practice type on this day
    practices.forEach((practice) => {
      const practiceDateStr = new Date(practice.created_at).toISOString().split('T')[0];
      if (practiceDateStr === date && practice.type) {
        // Ensure the existing value is treated as a number before adding
        dayData[practice.type] = (Number(dayData[practice.type]) || 0) + (practice.points || 0);
      }
    });

    return dayData;
  });
};

/**
 * Extracts unique practice types from a list of practices.
 */
const getUniquePracticeTypes = (practices: PracticeEntry[]): string[] => {
  return Array.from(new Set(practices.map(p => p.type).filter(Boolean))) as string[];
};

/**
 * Aggregates total points per practice type and sorts the summary.
 */
const calculatePracticeSummary = (practices: PracticeEntry[]): PracticeSummaryEntry[] => {
  const practiceSummaryMap = practices.reduce<Record<string, number>>((acc, practice) => {
    const type = practice.type || "Unknown";
    const points = practice.points || 0;
    acc[type] = (acc[type] || 0) + points;
    return acc;
  }, {});

  const practiceSummary = Object.entries(practiceSummaryMap).map(([type, totalPoints]) => ({
    type,
    totalPoints,
  }));

  // Sort practice types by totalPoints in descending order
  practiceSummary.sort((a, b) => b.totalPoints - a.totalPoints);
  return practiceSummary;
};

// --- API Route Handler ---

export async function GET() {
  const supabase = createServiceClient();
  const daysForGraphs = 7;

  // --- 1. Fetch Data ---
  const competitionStartDate = new Date("2025-03-18T09:30:00Z");
  const today = new Date(Date.UTC(
    new Date().getUTCFullYear(),
    new Date().getUTCMonth(),
    new Date().getUTCDate()
  ));
  const endDateStr = new Date(today.getTime() + 86400000 - 1).toISOString(); // End of today UTC

  const { data: rawPracticesData, error: practicesError } = await supabase
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
    .gte('created_at', competitionStartDate.toISOString())
    .lte('created_at', endDateStr)
    // Cast the fetched data to our defined type
    .returns<PracticeEntry[]>();

  if (practicesError) {
    console.error('Error fetching practices:', practicesError);
    return NextResponse.json(
      { error: `Database error: ${practicesError.message}` },
      { status: 500 } // Use 500 for server-side DB errors
    );
  }

  if (!rawPracticesData) {
    return NextResponse.json({ error: "No practice data found" }, { status: 404 });
  }

  // --- 2. Initial Filtering ---
  const allValidPractices = filterHdiPractices(rawPracticesData);

  // --- 3. Calculate All-Time Data ---
  const leaderboardData = calculateLeaderboardData(allValidPractices);
  const practiceSummary = calculatePracticeSummary(allValidPractices);

  // --- 4. Calculate 7-Day Graph Data ---
  const last7DaysStartDate = getStartDateNDaysAgo(today, daysForGraphs);
  const last7DaysPractices = filterPracticesLastNDays(allValidPractices, today, daysForGraphs);

  const dailyPoints = calculateDailyPoints(last7DaysPractices, last7DaysStartDate, daysForGraphs);
  const stackedData = calculateStackedData(last7DaysPractices, last7DaysStartDate, daysForGraphs);
  const practiceTypes = getUniquePracticeTypes(last7DaysPractices);

  // --- 5. Return Response ---
  return NextResponse.json({
    leaderboardData, // All-time leaderboard rankings
    practiceSummary, // All-time practice summary for pie chart
    dailyPoints,     // 7-day graph data
    stackedData,     // 7-day graph data
    practiceTypes    // 7-day practice types for stacked chart keys
  });
}
