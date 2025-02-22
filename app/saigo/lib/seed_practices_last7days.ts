import { config } from "dotenv";
import path from "path";
import { createClient } from "@supabase/supabase-js";

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
  const { data: users, error: usersError } = await supabase
    .from("saigo_users")
    .select("id");

  if (usersError) {
    console.error("Error fetching users:", usersError);
    process.exit(1);
  }
  console.log(`Fetched ${users!.length} users`);

  // 2. Define today as current date in UTC and calculate the start date (6 days before today)
  const today = new Date(Date.UTC(
    new Date().getUTCFullYear(),
    new Date().getUTCMonth(),
    new Date().getUTCDate()
  ));
  const startDate = new Date(Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate() - 6
  ));

  // 3. Define an array of practice types (optional selection).
  const practiceTypes = [
    "Meditation",
    "Sitting in the rain",
    "Energy movements",
    "High Guard",
    "Jumping",
    "Projection"
  ];

  // 4. For each user, create 7 practice records—one for each day from startDate to today.
  for (const user of users!) {
    const practices = [];

    for (let i = 0; i < 7; i++) {
      // Calculate the record date as startDate + i days.
      const recordDate = new Date(Date.UTC(
        startDate.getUTCFullYear(),
        startDate.getUTCMonth(),
        startDate.getUTCDate() + i,
        0, 0, 0 // Time set to 00:00:00 UTC
      ));

      // Set points to steadily increase: e.g., 10, 20, 30, ..., 70.
      const points = 100 + i * 10;

      // Choose a practice type in a cyclic fashion (optional).
      const type = practiceTypes[i % practiceTypes.length];

      practices.push({
        user_id: user.id,
        type,
        points,
        created_at: recordDate
      });
    }

    // Insert the 7 practice records for the current user.
    const { error: insertError } = await supabase
      .from("practices")
      .insert(practices.map(practice => ({
        ...practice,
        created_at: practice.created_at.toISOString(),
      })));
    if (insertError) {
      console.error(`Error inserting practices for user ${user.id}:`, insertError);
    } else {
      console.log(`Inserted 7 practice records for user ${user.id}`);
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
