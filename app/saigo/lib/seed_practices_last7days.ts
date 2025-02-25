import { config } from "dotenv";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { randomInt } from 'crypto';

// Helper function to get a random integer between min and max (inclusive)
function getRandomInt(min: number, max: number): number {
  return randomInt(min, max + 1);
}

// Load env variables from one of multiple possible .env paths
const envPaths = [".env", "../.env", "../../.env", "../../../.env"].map(p =>
  path.resolve(process.cwd(), p)
);
for (const envPath of envPaths) {
  config({ path: envPath });
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) break;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seedLast7Days() {
  // 1. Fetch all users from the saigo_users table.
  // Fetch all users
  const { data: allUsers, error: allUsersError } = await supabase
    .from("saigo_users")
    .select("id, username");

  if (allUsersError) {
    console.error("Error fetching users:", allUsersError);
    process.exit(1);
  }
  console.log(`Fetched ${allUsers!.length} users`);

  // 2. Define today as current date in UTC and calculate the start date (6 days before today)
  const now = new Date();
  const today = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  ));
  const startDate = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() - 6
  ));

  console.log(`Generating practices from ${startDate.toISOString()} to ${today.toISOString()}`);

  // 3. Define an array of practice types (optional selection).
  const practiceTypes = [
    "Meditation",
    "Sitting in the Rain",
    "Energy movements",
    "High Guard",
    "Jumping",
    "Projection"
  ];

  // For each user, create random practice records over the last 7 days
  for (const user of allUsers!) {
    if (user.username === "sereneWisdom42") {
      continue;
    }
    const practices = [];

    // Assign an activity level to each user (1: Low, 2: Medium, 3: High)
    const activityLevel = getRandomInt(1, 3);

    // Set ranges based on activity level
    let practicesPerDayRange: [number, number];
    let pointsRange: [number, number];
    let practiceDaysProbability: number;

    if (activityLevel === 1) {
      // Low activity
      practicesPerDayRange = [0, 1];
      pointsRange = [5, 20];
      practiceDaysProbability = 50; // 50% chance to practice on any day
    } else if (activityLevel === 2) {
      // Medium activity
      practicesPerDayRange = [1, 2];
      pointsRange = [10, 35];
      practiceDaysProbability = 70; // 70% chance
    } else {
      // High activity
      practicesPerDayRange = [1, 3];
      pointsRange = [20, 50];
      practiceDaysProbability = 90; // 90% chance
    }

    for (let i = 0; i < 7; i++) {
      // Randomly decide if the user practiced on this day
      const practicedToday = getRandomInt(1, 100) <= practiceDaysProbability;
      if (!practicedToday) {
        continue; // Skip to the next day
      }

      // Calculate the date for the practice (UTC)
      const date = new Date(Date.UTC(
        startDate.getUTCFullYear(),
        startDate.getUTCMonth(),
        startDate.getUTCDate() + i
      ));

      // Random number of practices for this day
      const practicesPerDay = getRandomInt(practicesPerDayRange[0], practicesPerDayRange[1]);

      for (let j = 0; j < practicesPerDay; j++) {
        // Random time within the day
        const hours = getRandomInt(0, 23);
        const minutes = getRandomInt(0, 59);
        const seconds = getRandomInt(0, 59);

        const recordDate = new Date(Date.UTC(
          date.getUTCFullYear(),
          date.getUTCMonth(),
          date.getUTCDate(),
          hours,
          minutes,
          seconds
        ));

        // Random points for the practice
        const points = getRandomInt(pointsRange[0], pointsRange[1]);

        // Randomly select a practice type
        const type = practiceTypes[getRandomInt(0, practiceTypes.length - 1)];

        practices.push({
          user_id: user.id,
          type,
          points,
          created_at: recordDate
        });
      }
    }

    // Ensure at least one practice per user if none were generated
    if (practices.length === 0) {
      const randomDate = new Date(Date.UTC(
        today.getUTCFullYear(),
        today.getUTCMonth(),
        today.getUTCDate() - getRandomInt(0, 6)
      ));

      const hours = getRandomInt(0, 23);
      const minutes = getRandomInt(0, 59);
      const seconds = getRandomInt(0, 59);

      randomDate.setUTCHours(hours, minutes, seconds);

      const points = getRandomInt(10, 50);
      const type = practiceTypes[getRandomInt(0, practiceTypes.length - 1)];

      practices.push({
        user_id: user.id,
        type,
        points,
        created_at: randomDate
      });

      console.log(`No practices generated for user ${user.id}. Assigned a default practice.`);
    }

    // Insert the practices for the current user
    const { error: insertError } = await supabase
      .from("practices")
      .insert(practices.map(practice => ({
        ...practice,
        created_at: practice.created_at.toISOString(),
      })));
    if (insertError) {
      console.error(`Error inserting practices for user ${user.id}:`, insertError);
    } else {
      console.log(`Inserted ${practices.length} practice records for user ${user.id} (Activity Level: ${activityLevel})`);
    }
  }

  console.log("Finished seeding mock practice data for the last 7 days.");
}

seedLast7Days()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  });
