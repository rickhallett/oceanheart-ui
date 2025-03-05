import { NextRequest, NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import { Database } from 'sqlite3';
import path from 'path';

// Helper function to get database connection
function getDb(): Database {
  const dbPath = path.resolve('./hdi-names.db');
  return new sqlite3.Database(dbPath);
}

// GET endpoint to fetch all HDI names
export async function GET() {
  try {
    const db = getDb();
    
    return new Promise((resolve) => {
      db.all('SELECT name FROM hdi_names ORDER BY created_at DESC', [], (err, rows) => {
        db.close();
        
        if (err) {
          console.error('Error fetching HDI names:', err);
          resolve(NextResponse.json({ error: 'Failed to fetch HDI names' }, { status: 500 }));
        } else {
          const names = rows.map((row: any) => row.name);
          resolve(NextResponse.json({
            names: names,
            count: names.length
          }));
        }
      });
    });
  } catch (error) {
    console.error('Error fetching HDI names:', error);
    return NextResponse.json({ error: 'Failed to fetch HDI names' }, { status: 500 });
  }
}

// POST endpoint to add a new HDI name
export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ error: 'Invalid name provided' }, { status: 400 });
    }

    // Format the name to capitalize each word
    const formattedName = name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    const db = getDb();
    
    return new Promise((resolve) => {
      // Check if the name already exists
      db.get('SELECT id FROM hdi_names WHERE name = ?', [formattedName], (err, row) => {
        if (err) {
          db.close();
          console.error('Error checking for existing name:', err);
          resolve(NextResponse.json({ error: 'Failed to add HDI name' }, { status: 500 }));
          return;
        }
        
        if (row) {
          db.close();
          resolve(NextResponse.json({ error: 'This name already exists' }, { status: 409 }));
          return;
        }
        
        // Insert the new name
        db.run('INSERT INTO hdi_names (name) VALUES (?)', [formattedName], function(err) {
          if (err) {
            db.close();
            console.error('Error inserting name:', err);
            resolve(NextResponse.json({ error: 'Failed to add HDI name' }, { status: 500 }));
            return;
          }
          
          // Fetch updated list
          db.all('SELECT name FROM hdi_names ORDER BY created_at DESC', [], (err, rows) => {
            db.close();
            
            if (err) {
              console.error('Error fetching updated names:', err);
              resolve(NextResponse.json({ error: 'Name added but failed to fetch updated list' }, { status: 500 }));
            } else {
              const names = rows.map((row: any) => row.name);
              resolve(NextResponse.json({
                success: true,
                names: names,
                count: names.length
              }));
            }
          });
        });
      });
    });
  } catch (error) {
    console.error('Error adding HDI name:', error);
    return NextResponse.json({ error: 'Failed to add HDI name' }, { status: 500 });
  }
}
