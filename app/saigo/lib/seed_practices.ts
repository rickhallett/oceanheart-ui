import { config } from "dotenv";
import path from "path";
import { createClient } from "@supabase/supabase-js";

// Try multiple possible locations for the .env file
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

async function seedPracticeRecords() {
  // Fetch all the saigo_users
  const { data: users, error: usersError } = await supabase
    .from("saigo_users")
    .select("id");
  if (usersError) {
    console.error("Error fetching users:", usersError);
    process.exit(1);
  }
  console.log(`Fetched ${users!.length} users.`);

  // Define the practice types as in seed_db.ts
  const practiceTypes = [
    "Meditation",
    "Sitting In The Rain",
    "Energy Movements",
    "High Guard",
    "Feels Like",
    "Surrender",
    "Tonglen",
    "Scanning",
    "Manifestation",
    "The Tones",
    "Mind Projection",
    "Koan Meditation",
    "Conversations with God",
    "Time Stepping",
    "Brain Wiggle",
    "The White Fire",
    "Energise Water",
    "Aums",
    "Seeing Auras",
    "Watching Static",
    "Prana Walking",
    "Cloud Busting"
  ];

  // for each user, generate 1 practice record with all the practice types
  for (const user of users!) {
    const practices = [];
    for (const type of practiceTypes) {
      practices.push({
        user_id: user.id,
        type: type,
        points: 5,
        created_at: new Date().toISOString()
      });
    }
    const { error: insertError } = await supabase
      .from("practices")
      .insert(practices);
    if (insertError) {
      console.error(`Error inserting practices for user ${user.id}:`, insertError);
    } else {
      console.log(`Inserted ${practices.length} practices for user ${user.id}`);
    }
  }

  console.log("Practice seeding complete!");
}

seedPracticeRecords()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  });
