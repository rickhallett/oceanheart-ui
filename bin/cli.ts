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
      case 'Exit':
        process.exit(0);
    }
  }
}

main().catch(console.error);
