import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Configuration, OpenAIApi } from 'openai';
import fs from 'fs';
import path from 'path';
import { XMLParser } from 'fast-xml-parser';

// Initialize OpenAI
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST() {
  try {
    // Read and parse the XML prompt file
    const promptPath = path.join(process.cwd(), 'prompts', 'saigo_username_prompt.xml');
    const xmlContent = fs.readFileSync(promptPath, 'utf-8');
    const parser = new XMLParser();
    const promptData = parser.parse(xmlContent);

    // Extract prompt and instructions
    const basePrompt = promptData.saigo_username_prompt.prompt;
    const instructions = promptData.saigo_username_prompt.instructions.instruction;
    
    // Combine prompt and instructions
    const fullPrompt = `${basePrompt}\n\nInstructions:\n${instructions.join('\n')}`;

    // Generate username using OpenAI
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: fullPrompt
        },
        {
          role: "user",
          content: "Generate a unique username based on the given instructions."
        }
      ],
      temperature: 0.9,
      max_tokens: 50,
    });

    const username = completion.data.choices[0].message?.content?.trim();

    if (!username) {
      throw new Error('Failed to generate username');
    }

    // Store in Supabase
    const { data, error } = await supabase
      .from('saigo_usernames')
      .insert([{ username, created_at: new Date().toISOString() }]);

    if (error) {
      throw error;
    }

    return NextResponse.json({ username });
  } catch (error) {
    console.error('Username generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate username' },
      { status: 500 }
    );
  }
}
