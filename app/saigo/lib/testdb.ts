import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import path from "path";

// Try multiple possible locations for the .env file
const envPaths = [
  '.env',
  '../.env',
  '../../.env',
  '../../../.env',
].map(p => path.resolve(process.cwd(), p));

for (const envPath of envPaths) {
  config({ path: envPath });
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) break;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function getUserPractices(userId: string) {
  const { data: practices, error } = await supabase
    .from('practices')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching practices:', error);
    return null;
  }

  return practices;
}

export async function getUser(userId: string) {
  const { data: user, error } = await supabase
    .from('saigo_users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }

  return user;
}

async function main() {
  const nebs = await getUser("5160a692-ecde-42bb-b7a9-3e1bbf052011");
  console.log(nebs);
  const practices = await getUserPractices("5160a692-ecde-42bb-b7a9-3e1bbf052011");
  console.log(practices);
}

main();
