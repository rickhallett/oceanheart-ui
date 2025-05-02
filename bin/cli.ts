#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import inquirer from 'inquirer';
import Table from 'cli-table3';
import path from 'path';
import { PRACTICE_TYPES } from '@/libs/chartColors';

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

async function displayUsers() {
  const { data: users, error } = await supabase
    .from('saigo_users')
    .select('*');

  if (error) {
    console.error('Error fetching users:', error);
    return;
  }

  const table = new Table({
    head: ['ID', 'Username', 'Email', 'Force']
  });

  users?.forEach(user => {
    table.push([
      user.id,
      user.username || 'N/A',
      user.email || 'N/A',
      user.force || '0'
    ]);
  });

  console.log(table.toString());
}

async function displayPractices() {
  const { data: practices, error } = await supabase
    .from('practices')
    .select(`
      *,
      saigo_user:saigo_users!practices_user_id_fkey (
        username
      )
    `)
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) {
    console.error('Error fetching practices:', error);
    return;
  }

  const table = new Table({
    head: ['ID', 'User', 'Type', 'Points', 'Created At']
  });

  practices?.forEach(practice => {
    table.push([
      practice.id,
      practice.saigo_user?.username || 'Unknown',
      practice.type,
      practice.points,
      new Date(practice.created_at).toLocaleString()
    ]);
  });

  console.log(table.toString());
}

async function displayMonthlyLeaderboard() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const { data, error } = await supabase
    .from('practices')
    .select(`
      user_id,
      points,
      saigo_user:saigo_users!practices_user_id_fkey (
        username
      )
    `)
    .gte('created_at', startOfMonth.toISOString()); // Filter for practices this month

  if (error) {
    console.error('Error fetching monthly leaderboard data:', error);
    return;
  }

  if (!data || data.length === 0) {
    console.log('No practice points recorded yet for the current month.');
    return;
  }

  // Aggregate points per user
  const leaderboard = data.reduce((acc, practice) => {
    const userId = practice.user_id;
    if (!userId) return acc; // Skip if user_id is null

    // Adjust type assertion for potential array from relation
    const userRelation = practice.saigo_user as { username: string | null }[] | { username: string | null } | null;
    let username = `User ID: ${userId}`;
    if (Array.isArray(userRelation) && userRelation.length > 0) {
      username = userRelation[0].username || username;
    } else if (userRelation && !Array.isArray(userRelation)) {
      username = userRelation.username || username;
    }

    acc[userId] = acc[userId] || { username: username, totalPoints: 0 };
    acc[userId].totalPoints += practice.points || 0;
    return acc;
  }, {} as { [userId: string]: { username: string; totalPoints: number } });

  // Sort by points descending
  const sortedLeaderboard = Object.values(leaderboard).sort((a, b) => b.totalPoints - a.totalPoints);

  const table = new Table({
    head: ['Rank', 'User', 'Monthly Points']
  });

  sortedLeaderboard.forEach((entry, index) => {
    table.push([
      index + 1,
      entry.username,
      entry.totalPoints
    ]);
  });

  console.log(`\n--- Monthly Leaderboard (${now.toLocaleString('default', { month: 'long', year: 'numeric' })}) ---`);
  console.log(table.toString());
}

async function deletePractice() {
  const { practiceId } = await inquirer.prompt([
    {
      type: 'input',
      name: 'practiceId',
      message: 'Enter the practice ID to delete:'
    }
  ]);

  const { error } = await supabase
    .from('practices')
    .delete()
    .eq('id', practiceId);

  if (error) {
    console.error('Error deleting practice:', error);
  } else {
    console.log('Practice deleted successfully');
  }
}

async function resetMonthlyPoints() {
  console.log('Calculating points from the previous month...');

  const now = new Date();
  const firstDayOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  // Go back one millisecond to get the end of the previous month
  const lastDayOfPreviousMonth = new Date(firstDayOfCurrentMonth.getTime() - 1);
  // Get the first day of the previous month
  const firstDayOfPreviousMonth = new Date(lastDayOfPreviousMonth.getFullYear(), lastDayOfPreviousMonth.getMonth(), 1);

  console.log(`Calculating points between ${firstDayOfPreviousMonth.toISOString()} and ${lastDayOfPreviousMonth.toISOString()}`);

  const { data: monthlyTotals, error: totalsError } = await supabase
    .from('practices')
    .select('user_id, points')
    .gte('created_at', firstDayOfPreviousMonth.toISOString())
    .lte('created_at', lastDayOfPreviousMonth.toISOString());

  if (totalsError) {
    console.error('Error fetching previous month\'s practice data:', totalsError);
    return;
  }

  if (!monthlyTotals || monthlyTotals.length === 0) {
    console.log('No practices recorded in the previous month. No forces updated.');
    return;
  }

  // Aggregate points per user
  const userTotals = monthlyTotals.reduce((acc, practice) => {
    if (practice.user_id) {
      acc[practice.user_id] = (acc[practice.user_id] || 0) + (practice.points || 0);
    }
    return acc;
  }, {} as { [userId: string]: number });

  console.log(`Found points for ${Object.keys(userTotals).length} users from the previous month.`);

  let successCount = 0;
  let errorCount = 0;

  // Update force for each user
  for (const userId in userTotals) {
    const pointsToAdd = userTotals[userId];
    if (pointsToAdd > 0) {
      console.log(`Adding ${pointsToAdd} points to force for user ${userId}...`);
      // Revert to object, but order keys as potentially expected by the first error message
      const { error: updateError } = await supabase.rpc('increment_user_force', {
        points_to_add: pointsToAdd, // Key order swapped
        user_id_param: userId
      });

      if (updateError) {
        console.error(`Failed to update force for user ${userId}:`, updateError.message);
        errorCount++;
      } else {
        successCount++;
      }
    }
  }

  console.log(`\nMonthly points reset complete.`);
  console.log(`Successfully updated force for ${successCount} users.`);
  if (errorCount > 0) {
    console.log(`Failed to update force for ${errorCount} users.`);
  }
  console.log(`The leaderboard will now show points accumulated from ${firstDayOfCurrentMonth.toLocaleDateString()} onwards.`);
}

async function addPracticeEntry() {
  // Prompt for practice type and minutes
  const { practiceType, minutesEntered } = await inquirer.prompt([
    {
      type: 'list',
      name: 'practiceType',
      message: 'Choose a practice type:',
      choices: PRACTICE_TYPES
    },
    {
      type: 'input',
      name: 'minutesEntered',
      message: 'Enter the number of minutes practiced:',
      validate: (input: string) => {
        const parsed = Number(input);
        return !isNaN(parsed) && parsed > 0 ? true : 'Please enter a positive number';
      }
    }
  ]);

  const minutes = Number(minutesEntered);

  // Look up the user in saigo_users by email
  const { data: userProfile, error: userError } = await supabase
    .from('saigo_users')
    .select('id')
    .eq('email', 'kai@oceanheart.ai')
    .single();

  if (userError || !userProfile) {
    console.error('Error fetching profile for kai@oceanheart.ai:', userError);
    return;
  }

  // Insert the new practice entry
  const { error } = await supabase.from('practices').insert({
    type: practiceType,
    points: minutes,
    user_id: userProfile.id,
    created_at: new Date().toISOString(),
  });

  if (error) {
    console.error('Error inserting practice entry:', error);
  } else {
    console.log('Practice entry added successfully for kai@oceanheart.ai!');
  }
}

async function addPracticeEntryForOtherUser() {
  // Fetch list of users from the database
  const { data: users, error: usersError } = await supabase
    .from('saigo_users')
    .select('id, username, email');

  if (usersError || !users || users.length === 0) {
    console.error('Error fetching users:', usersError || 'No users found');
    return;
  }

  // Create user choices for selection menu, showing both username and email for clarity
  const userChoices = users.map(user => ({
    name: `${user.username || 'No username'} (${user.email || 'No email'})`,
    value: user.id
  }));

  // Add a back option
  userChoices.push({ name: 'Back to main menu', value: 'back' });

  // Prompt for user selection
  const { selectedUserId } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedUserId',
      message: 'Select a user:',
      choices: userChoices
    }
  ]);

  // Return to main menu if back option selected
  if (selectedUserId === 'back') {
    return;
  }

  // Find the selected user for display purposes
  const selectedUser = users.find(user => user.id === selectedUserId);

  if (!selectedUser) {
    console.error('Selected user not found');
    return;
  }

  // Display which user was selected
  console.log(`Adding practice for: ${selectedUser.username || 'No username'} (${selectedUser.email || 'No email'})`);

  // Prompt for practice type and minutes
  const { practiceType, minutesEntered } = await inquirer.prompt([
    {
      type: 'list',
      name: 'practiceType',
      message: 'Choose a practice type:',
      choices: PRACTICE_TYPES
    },
    {
      type: 'input',
      name: 'minutesEntered',
      message: 'Enter the number of minutes practiced:',
      validate: (input: string) => {
        const parsed = Number(input);
        return !isNaN(parsed) && parsed > 0 ? true : 'Please enter a positive number';
      }
    }
  ]);

  const minutes = Number(minutesEntered);

  // Insert the new practice entry
  const { error } = await supabase.from('practices').insert({
    type: practiceType,
    points: minutes,
    user_id: selectedUserId,
    created_at: new Date().toISOString(),
  });

  if (error) {
    console.error('Error inserting practice entry:', error);
  } else {
    console.log(`Practice entry added successfully for ${selectedUser.username || selectedUser.email || 'selected user'}!`);
  }
}

async function main() {
  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'Add Practice Entry for kai@oceanheart.ai',
          'Add Practice Entry for Another User',
          'Show Monthly Leaderboard',
          'List Recent Practice Entries',
          'List Users',
          'Delete Practice',
          'Reset Monthly Points',
          'Exit'
        ]
      }
    ]);

    switch (action) {
      case 'List Users':
        await displayUsers();
        break;
      case 'Show Monthly Leaderboard':
        await displayMonthlyLeaderboard();
        break;
      case 'List Recent Practice Entries':
        await displayPractices();
        break;
      case 'Delete Practice':
        await deletePractice();
        break;
      case 'Add Practice Entry for kai@oceanheart.ai':
        await addPracticeEntry();
        break;
      case 'Add Practice Entry for Another User':
        await addPracticeEntryForOtherUser();
        break;
      case 'Reset Monthly Points':
        await resetMonthlyPoints();
        break;
      case 'Exit':
        process.exit(0);
    }
  }
}

main().catch(console.error);
