import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import path from 'path';

let db: Database | null = null;

export async function getDB() {
  if (db) return db;
  
  // Open the database
  db = await open({
    filename: path.join(process.cwd(), 'hdi_names.sqlite'),
    driver: sqlite3.Database
  });
  
  // Create the table if it doesn't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS hdi_names (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  // Insert initial data if the table is empty
  const count = await db.get('SELECT COUNT(*) as count FROM hdi_names');
  if (count.count === 0) {
    await db.exec(`
      INSERT INTO hdi_names (name) VALUES 
      ('Human Digital Interface'),
      ('Higher Defiance Institute'),
      ('Hyperconsciousness Design Initiative'),
      ('Heart Data Integrated')
    `);
  }
  
  return db;
}
