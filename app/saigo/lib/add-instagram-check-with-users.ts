#!/usr/bin/env bun

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

// Load environment variables
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

async function addInstagramCheckWithUsers(username: string, usernames: string[]) {
  // Create Supabase client with service role key for admin privileges
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    // First, lookup user IDs from usernames
    const { data: userIds, error: userError } = await supabase
      .from('saigo_username')
      .select('saigo_user_id, username')
      .in('username', usernames);

    if (userError) {
      console.error('Error looking up users:', userError);
      process.exit(1);
    }

    if (!userIds || userIds.length === 0) {
      console.error('No users found with the provided usernames');
      process.exit(1);
    }

    // Map of found usernames to their IDs for validation
    const foundUsers = userIds.reduce((acc, { username, saigo_user_id }) => {
      acc[username] = saigo_user_id;
      return acc;
    }, {} as Record<string, string>);

    // Check for any missing users
    const missingUsers = usernames.filter(username => !foundUsers[username]);
    if (missingUsers.length > 0) {
      console.warn(`Warning: The following users were not found: ${missingUsers.join(', ')}`);
    }

    // Create the Instagram check
    const { data: checkData, error: checkError } = await supabase
      .from('instagram_page_checks')
      .insert({
        page_username: username,
        page_found: false,
        last_check_time: new Date().toISOString()
      })
      .select()
      .single();

    if (checkError) {
      console.error('Error adding Instagram check:', checkError);
      process.exit(1);
    }

    console.log('Successfully added Instagram check:', checkData);

    // Associate users with the check
    const userAssociations = userIds.map(({ saigo_user_id }) => ({
      instagram_check_id: checkData.id,
      user_id: saigo_user_id,
      points_reset: false
    }));

    const { error: associationError } = await supabase
      .from('instagram_affected_users')
      .insert(userAssociations);

    if (associationError) {
      console.error('Error associating users with Instagram check:', associationError);
      process.exit(1);
    }

    console.log(`Successfully associated ${userIds.length} users with the Instagram check`);
    userIds.forEach(({ username, saigo_user_id }) => {
      console.log(`- ${username} (${saigo_user_id})`);
    });

  } catch (error) {
    console.error('Unexpected error:', error);
    process.exit(1);
  }
}

// Get username and user IDs from command line arguments
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Usage: npm run add-instagram-check-with-users [instagram_username] [username1] [username2] ...');
  process.exit(1);
}

const instagramUsername = args[0];
const usernames = args.slice(1);

// Run the script
addInstagramCheckWithUsers(instagramUsername, usernames); 