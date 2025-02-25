import { createClient } from '@supabase/supabase-js';
import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function seed() {
  const numberOfUsers = 10;
  const practicesPerUser = 25;
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
    const username = faker.internet.username();
    const { error: userError } = await supabase.from('saigo_users').insert({
      id: uuidv4(),
      user_id: user.id,     // associating the auth user's ID
      email: user.email,
      username,        // made-up username
    });
    if (userError) {
      console.error(`Error inserting saigo_user for user ${user.id}:`, userError);
    } else {
      console.log(`Inserted saigo_user for ${user.email}`);
    }
  }

  // 3. Create exactly 25 practice records for each user
  const practices = [];
  for (const user of createdUsers) {
    for (let i = 0; i < practicesPerUser; i++) {
      const randomType = practiceTypes[Math.floor(Math.random() * practiceTypes.length)];
      const randomPoints = Math.floor(Math.random() * (120 - 5 + 1)) + 5; // random int between 5 and 120

      practices.push({
        user_id: user.id,
        type: randomType,
        points: randomPoints
        // created_at will default to now in the database
      });
    }
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
