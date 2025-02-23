import { config } from "dotenv";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from 'uuid';

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

async function seedUsers() {
  const usernames = ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve'];
  const users = usernames.map(username => ({
    id: uuidv4(),
    email: `${username.toLowerCase()}@example.com`,
    username,
  }));

  const { error } = await supabase.from('saigo_users').insert(users);
  if (error) {
    console.error('Error inserting users:', error);
  } else {
    console.log(`Inserted ${users.length} users into saigo_users.`);
  }
}

seedUsers()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Seeding users failed:', err);
    process.exit(1);
  });
