/**
 * Audio Tables Migration Script
 * Run with: npm run db:migrate-audio
 */

import { turso } from '../src/lib/turso';
import { readFileSync } from 'fs';
import { join } from 'path';

async function runMigration() {
  try {
    console.log('Starting audio tables migration...');

    const sqlPath = join(__dirname, 'migrations', 'create-audio-recordings.sql');
    const sql = readFileSync(sqlPath, 'utf-8');

    // Split by semicolon and execute each statement
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    for (const statement of statements) {
      console.log('Executing:', statement.substring(0, 50) + '...');
      await turso.execute(statement);
    }

    console.log('Migration completed successfully!');
    console.log('Created tables:');
    console.log('  - audio_recordings');
    console.log('  - audio_progress');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigration();
