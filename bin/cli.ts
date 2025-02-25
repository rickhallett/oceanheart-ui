#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import inquirer from 'inquirer';
import Table from 'cli-table3';
import path from 'path';

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

async function addPracticeEntry() {
  // Prompt for practice type and minutes
  const { practiceType, minutesEntered } = await inquirer.prompt([
    {
      type: 'list',
      name: 'practiceType',
      message: 'Choose a practice type:',
      choices: [
        "Meditation",
        "Sitting in the rain",
        "Energy movements",
        "High Guard",
        "Jumping",
        "Projection",
        "Conscious Dance",
        "Yoga",
        "Teaching"
      ]
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

async function main() {
  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'List Users',
          'List Recent Practices',
          'Delete Practice',
          'Add Practice Entry for kai@oceanheart.ai',
          'Exit'
        ]
      }
    ]);

    switch (action) {
      case 'List Users':
        await displayUsers();
        break;
      case 'List Recent Practices':
        await displayPractices();
        break;
      case 'Delete Practice':
        await deletePractice();
        break;
      case 'Add Practice Entry for kai@oceanheart.ai':
        await addPracticeEntry();
        break;
      case 'Exit':
        process.exit(0);
    }
  }
}

main().catch(console.error);
