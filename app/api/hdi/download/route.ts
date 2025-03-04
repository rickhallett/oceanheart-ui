import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // Path to the PDF file (not accessible from client side)
    const filePath = path.join(process.cwd(), 'private', 'hdi-v0.1.pdf');
    
    // Read the file
    const fileBuffer = fs.readFileSync(filePath);
    
    // Create response with appropriate headers
    const response = new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="hdi-v0.1.pdf"',
      },
    });
    
    return response;
  } catch (error) {
    console.error('Error serving PDF:', error);
    return new NextResponse(JSON.stringify({ error: 'File not found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
