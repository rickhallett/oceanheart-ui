import { createClient } from '@supabase/supabase-js';
import { faker } from '@faker-js/faker';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function seed() {
  const numberOfUsers = 10;
  const numberOfPractices = 100;
  const practiceTypes = [
    "Meditation",
    "Sitting in the rain",
    "Energy movements",
    "High Guard",
    "Jumping",
    "Projection"
  ];

  const createdUsers: any[] = [];

  // 1. Create 10 new supabase auth users
  for (let i = 0; i < numberOfUsers; i++) {
    const email = faker.internet.email();
    const password = "password123"; // default password
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    });
    if (authError) {
      console.error("Error creating auth user:", authError);
      continue;
    }
    if (authUser) {
      createdUsers.push(authUser.user);
      console.log(`Created auth user: ${authUser.user.email}`);
    }
  }

  // 2. Create corresponding saigo_users with made-up usernames
  for (const user of createdUsers) {
    const username = faker.internet.userName();
    const { error: userError } = await supabase.from('saigo_users').insert({
      id: user.id,     // associating the auth user's ID
      email: user.email,
      username,        // made-up username
      force: 0
    });
    if (userError) {
      console.error(`Error inserting saigo_user for user ${user.id}:`, userError);
    } else {
      console.log(`Inserted saigo_user for ${user.email}`);
    }
  }

  // 3. Create 100 practice records with random data
  const practices = [];
  for (let i = 0; i < numberOfPractices; i++) {
    // randomly pick one created user
    const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
    if (!randomUser) continue; // skip if no user
    const randomType = practiceTypes[Math.floor(Math.random() * practiceTypes.length)];
    const randomPoints = Math.floor(Math.random() * (120 - 5 + 1)) + 5; // random int between 5 and 120

    practices.push({
      user_id: randomUser.id,
      type: randomType,
      points: randomPoints
      // created_at will default to now in the database
    });
  }

  const { error: practicesError } = await supabase
    .from('practices')
    .insert(practices);
  if (practicesError) {
    console.error("Error inserting practices:", practicesError);
  } else {
    console.log(`Inserted ${practices.length} practice records successfully.`);
  }

  console.log("Database seeding complete!");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  });
