import sqlite3 from 'sqlite3';
import fs from 'fs';

// Create or open the database
const db = new sqlite3.Database('./hdi-names.db');

// Initialize the database if it doesn't exist
if (!fs.existsSync('./hdi-names.db')) {
  // Create the table
  db.run(`
    CREATE TABLE IF NOT EXISTS hdi_names (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Insert initial data
  db.run(`
    INSERT INTO hdi_names (name) VALUES 
    ('Human Digital Interface'),
    ('Higher Defiance Institute'),
    ('Hyperconsciousness Design Initiative'),
    ('Heart Data Integrated')
  `);
}

// Helper function to execute queries with async/await
export async function query<T>(sql: string, params: any[] = []): Promise<T[]> {
  return new Promise<T[]>((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows as T[]);
    });
  });
}

// Helper function for single row queries
export async function queryOne<T>(sql: string, params: any[] = []): Promise<T | null> {
  return new Promise<T | null>((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row as T | null);
    });
  });
}

// Helper function for executing commands (insert, update, delete)
export async function execute(sql: string, params: any[] = []): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve();
    });
  });
}
