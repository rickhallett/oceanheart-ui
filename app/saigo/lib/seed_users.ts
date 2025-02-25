import { config } from "dotenv";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from 'uuid';
import { faker } from "@faker-js/faker";

// Load env variables
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

// Parse the command-line parameter --n
const args = process.argv.slice(2);
let n = 5; // default number of users
args.forEach((arg, index) => {
  if (arg === "--n") {
    n = parseInt(args[index + 1], 10);
  }
});
if (isNaN(n) || n <= 0) {
  console.error("Please provide a valid number greater than 0 using the --n parameter.");
  process.exit(1);
}

async function seedUsers() {
  // Generate n users programmatically
  const users = Array.from({ length: n }).map(() => {
    const username = faker.internet.userName();
    return {
      id: uuidv4(),
      email: `${username.toLowerCase()}@example.com`,
      username,
    }
  });

  const { error } = await supabase.from('saigo_users').insert(users);
  if (error) {
    console.error('Error inserting users:', error);
    process.exit(1);
  } else {
    console.log(`Inserted ${users.length} users into saigo_users.`);
    process.exit(0);
  }
}

seedUsers()
  .catch(err => {
    console.error('Seeding users failed:', err);
    process.exit(1);
  });
