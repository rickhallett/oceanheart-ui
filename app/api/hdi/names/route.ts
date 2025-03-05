import { NextRequest, NextResponse } from 'next/server';
import { getDB } from '@/app/hdi/lib/db';

// GET endpoint to fetch all HDI names
export async function GET() {
  try {
    const db = await getDB();
    const names = await db.all('SELECT name FROM hdi_names ORDER BY created_at DESC');
    
    return NextResponse.json({ 
      names: names.map(item => item.name),
      count: names.length
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
    
    const db = await getDB();
    
    // Check if the name already exists
    const existing = await db.get('SELECT id FROM hdi_names WHERE name = ?', formattedName);
    if (existing) {
      return NextResponse.json({ error: 'This name already exists' }, { status: 409 });
    }
    
    // Insert the new name
    await db.run('INSERT INTO hdi_names (name) VALUES (?)', formattedName);
    
    // Get all names to return
    const names = await db.all('SELECT name FROM hdi_names ORDER BY created_at DESC');
    
    return NextResponse.json({ 
      success: true, 
      names: names.map(item => item.name),
      count: names.length
    });
  } catch (error) {
    console.error('Error adding HDI name:', error);
    return NextResponse.json({ error: 'Failed to add HDI name' }, { status: 500 });
  }
}
