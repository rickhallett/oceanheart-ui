export const runtime = 'nodejs';  // Force Node.js runtime, not Edge

import { NextRequest, NextResponse } from 'next/server';
import BetterSqlite3 from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

// GET endpoint to fetch all HDI names
export async function GET() {
  try {
    // Get the directory of the current file
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Connect to the database in the same directory as this file
    const dbPath = path.join(__dirname, 'names.db');

    const db = new BetterSqlite3(dbPath);

    const names = db.prepare('SELECT name FROM Name ORDER BY created_at DESC').all();

    db.close();

    return NextResponse.json({
      names: names.map((row: { name: string }) => row.name),
    });
  } catch (error) {
    console.error('Error fetching HDI names:', error);
    return NextResponse.json({
      // Fallback to hardcoded values in case of error
      names: [
        "Human Digital Interface",
        "Higher Defiance Institute",
        "Hyperconsciousness Design Initiative",
        "Heart Data Integrated",
      ],
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    // Get the directory of the current file
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Connect to the database in the same directory as this file
    const dbPath = path.join(__dirname, 'names.db');
    const db = new BetterSqlite3(dbPath);

    // Insert the new name
    const result = db.prepare('INSERT INTO Name (name) VALUES (?)').run(name);

    // Get updated list of names
    const names = db.prepare('SELECT name FROM Name ORDER BY created_at DESC').all();

    db.close();

    return NextResponse.json({
      success: true,
      names: names.map((row: { name: string }) => row.name),
    });
  } catch (error) {
    console.error('Error adding HDI name:', error);
    return NextResponse.json(
      { error: 'Failed to add HDI name' },
      { status: 500 }
    );
  }
}
