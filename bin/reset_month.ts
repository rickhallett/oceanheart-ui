#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import path from 'path';
import inquirer from 'inquirer';

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

async function tallyPointsAndReset() {
  console.log('Tallying up points for all users...');

  // Get all users with their total points
  const { data: userPointTotals, error: pointsError } = await supabase
    .from('practices')
    .select(`
      user_id,
      points
    `);

  if (pointsError) {
    console.error('Error fetching user points:', pointsError);
    return;
  }

  if (!userPointTotals || userPointTotals.length === 0) {
    console.log('No practice points found to tally.');
    return;
  }

  // Aggregate points per user
  const userTotals = userPointTotals.reduce((acc, practice) => {
    if (practice.user_id) {
      acc[practice.user_id] = (acc[practice.user_id] || 0) + (practice.points || 0);
    }
    return acc;
  }, {} as { [userId: string]: number });

  console.log(`Found point totals for ${Object.keys(userTotals).length} users.`);

  // Get user details to include names
  const { data: users, error: usersError } = await supabase
    .from('saigo_users')
    .select('id, username')
    .in('id', Object.keys(userTotals));

  if (usersError) {
    console.error('Error fetching user details:', usersError);
    return;
  }

  // Prepare data for alisone table
  const alisoneEntries = users?.map(user => ({
    user_id: user.id,
    username: user.username,
    total_points: userTotals[user.id] || 0,
    created_at: new Date().toISOString()
  })) || [];

  console.log(`Prepared ${alisoneEntries.length} entries for alisone table.`);

  // Insert into alisone table
  if (alisoneEntries.length > 0) {
    const { error: insertError } = await supabase
      .from('alisone')
      .insert(alisoneEntries);

    if (insertError) {
      console.error('Error inserting into alisone table:', insertError);
      return;
    }

    console.log(`Successfully stored ${alisoneEntries.length} user totals in alisone table.`);
  }

  // Ask for confirmation before deleting all practices
  const { confirmDelete } = await inquirer.prompt([{
    type: 'confirm',
    name: 'confirmDelete',
    message: 'Are you sure you want to delete ALL practice entries? This cannot be undone!',
    default: false
  }]);

  if (confirmDelete) {
    // Delete all practices
    const { error: deleteError } = await supabase
      .from('practices')
      .delete()
      .gte('id', '00000000-0000-0000-0000-000000000000'); // This is a hack to delete all rows

    if (deleteError) {
      console.error('Error deleting practices:', deleteError);
      return;
    }

    console.log('Successfully deleted all practice entries. Starting fresh for the new month!');
  } else {
    console.log('Practice entries were NOT deleted. The totals were still saved to alisone table.');
  }
}

// Run the script
tallyPointsAndReset()
  .catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  })
  .finally(() => {
    console.log('Script completed.');
  }); 