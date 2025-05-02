#!/usr/bin/env node

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import path from 'path';
import schedule from 'node-schedule';

// --- Configuration ---
const BOTS = [
  { name: 'Good Start', dailyMinutes: 30 },
  { name: 'Growth Pattern', dailyMinutes: 90 },
  { name: 'Elite Conditioning', dailyMinutes: 180 },
];

const PRACTICE_TYPES_FOR_BOTS = ['Meditation', 'Sitting In The Rain'];
const RUN_HOUR = 6; // 6 AM
const RUN_MINUTE = 0;
// --- End Configuration ---

// Load env variables (same logic as cli.ts)
const envPaths = ['.env', '../.env', '../../.env', '../../../.env'].map(p =>
  path.resolve(process.cwd(), p)
);
for (const envPath of envPaths) {
  config({ path: envPath });
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) break;
}

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    'Error: Supabase URL or Service Role Key not found in environment variables.'
  );
  console.error('Ensure your .env file is correctly set up.');
  process.exit(1);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface BotConfig {
  name: string;
  dailyMinutes: number;
}

interface BotData extends BotConfig {
  id: string; // Supabase user ID
}

async function ensureBotsExist(
  supabaseClient: SupabaseClient,
  botConfigs: BotConfig[]
): Promise<BotData[]> {
  console.log('Checking for existing bots...');
  const botNames = botConfigs.map(b => b.name);
  const botData: BotData[] = [];

  const { data: existingUsers, error: fetchError } = await supabaseClient
    .from('saigo_users')
    .select('id, username')
    .in('username', botNames);

  if (fetchError) {
    console.error('Error fetching existing bots:', fetchError);
    throw fetchError; // Stop execution if we can't check
  }

  const existingUserMap = new Map(existingUsers?.map(u => [u.username, u.id]));
  console.log(`Found ${existingUserMap.size} existing bot users.`);

  for (const config of botConfigs) {
    const existingId = existingUserMap.get(config.name);
    if (existingId) {
      console.log(`Bot "${config.name}" already exists with ID: ${existingId}`);
      botData.push({ ...config, id: existingId });
    } else {
      console.log(`Bot "${config.name}" not found. Creating...`);
      // Create a simple email based on the name
      const email = `${config.name.toLowerCase().replace(/\s+/g, '-')}@bot.local`;
      const { data: newUser, error: createError } = await supabaseClient
        .from('saigo_users')
        .insert({
          username: config.name,
          email: email,
          // Add any other required fields for saigo_users if necessary
          // force: 0, // Initialize force if needed
        })
        .select('id')
        .single();

      if (createError || !newUser) {
        console.error(`Error creating bot "${config.name}":`, createError);
        // Decide if we should continue or stop; for now, log and skip this bot
        continue;
      }
      console.log(`Created bot "${config.name}" with ID: ${newUser.id}`);
      botData.push({ ...config, id: newUser.id });
    }
  }

  return botData;
}

async function addDailyPractices(
  supabaseClient: SupabaseClient,
  bots: BotData[]
) {
  console.log(`\\n--- ${new Date().toISOString()} ---`);
  console.log(`Running daily practice addition for ${bots.length} bots...`);

  if (PRACTICE_TYPES_FOR_BOTS.length === 0) {
    console.warn('No practice types defined for bots. Skipping practice addition.');
    return;
  }

  const practicesToInsert = [];
  const now = new Date().toISOString();

  for (const bot of bots) {
    const pointsPerType = Math.floor(bot.dailyMinutes / PRACTICE_TYPES_FOR_BOTS.length);
    if (pointsPerType <= 0) {
      console.warn(`Calculated points per type is 0 for bot "${bot.name}". Skipping.`);
      continue;
    }

    for (const type of PRACTICE_TYPES_FOR_BOTS) {
      practicesToInsert.push({
        user_id: bot.id,
        type: type,
        points: pointsPerType,
        created_at: now,
      });
    }
    console.log(`  - Preparing ${pointsPerType} points each for "${PRACTICE_TYPES_FOR_BOTS.join('", "')}" for bot "${bot.name}" (ID: ${bot.id})`);
  }

  if (practicesToInsert.length > 0) {
    console.log(`Inserting ${practicesToInsert.length} practice entries...`);
    const { error } = await supabaseClient
      .from('practices')
      .insert(practicesToInsert);

    if (error) {
      console.error('Error inserting practice entries:', error);
    } else {
      console.log('Successfully inserted practice entries.');
    }
  } else {
    console.log('No practice entries to insert.');
  }
}

async function main() {
  console.log('Starting Bot Runner...');

  let botData: BotData[] = [];
  try {
    botData = await ensureBotsExist(supabase, BOTS);
  } catch (error) {
    console.error('Failed to ensure bots exist. Exiting.', error);
    process.exit(1);
  }

  if (botData.length === 0) {
    console.error('No valid bot configurations found or created. Exiting.');
    process.exit(1);
  }

  const scheduleRule = new schedule.RecurrenceRule();
  scheduleRule.hour = RUN_HOUR;
  scheduleRule.minute = RUN_MINUTE;
  scheduleRule.tz = 'Etc/UTC'; // Use UTC to avoid timezone issues unless explicitly needed

  console.log(`Scheduling daily practice addition for ${RUN_HOUR.toString().padStart(2, '0')}:${RUN_MINUTE.toString().padStart(2, '0')} UTC...`);

  const job = schedule.scheduleJob(scheduleRule, async () => {
    try {
      await addDailyPractices(supabase, botData);
    } catch (error) {
      console.error('Error during scheduled practice addition:', error);
    }
  });

  console.log(`Bot Runner started. Next run scheduled for: ${job.nextInvocation()?.toISOString()}`);
  console.log('Script will now run in the background. Press Ctrl+C to stop.');

  // Optional: Run once immediately on startup if desired
  // console.log('\\nRunning initial practice addition...');
  // try {
  //   await addDailyPractices(supabase, botData);
  // } catch (error) {
  //   console.error('Error during initial practice addition:', error);
  // }

  // Keep the process alive. node-schedule does this implicitly,
  // but adding an interval can make it more explicit if needed.
  // setInterval(() => {}, 1000 * 60 * 60); // Keep alive check every hour
}

main().catch(error => {
  console.error('Unhandled error in main function:', error);
  process.exit(1);
}); 