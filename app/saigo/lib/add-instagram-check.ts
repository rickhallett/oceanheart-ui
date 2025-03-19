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

async function addInstagramCheck(username: string) {
  // Create Supabase client with service role key for admin privileges
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
    const { data, error } = await supabase
      .from('instagram_page_checks')
      .insert({
        page_username: username,
        page_found: false,
        last_check_time: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding Instagram check:', error);
      process.exit(1);
    }

    console.log('Successfully added Instagram check:');
    console.log(data);
  } catch (error) {
    console.error('Unexpected error:', error);
    process.exit(1);
  }
}

// Get username from command line arguments
const username = process.argv[2];

if (!username) {
  console.error('Usage: npm run add-instagram-check [username]');
  process.exit(1);
}

// Run the script
addInstagramCheck(username); 