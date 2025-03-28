import { NextResponse } from 'next/server';
import { createClient } from '@/libs/supabase/server';
import { OpenAI } from 'openai';
import fs from 'fs';
import path from 'path';
import { XMLParser } from 'fast-xml-parser';

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Supabase
export async function POST() {
  const supabase = createClient();
  try {
    // Get user
    const { data: user, error: userError } = await supabase.auth.getUser();
    console.log("👤 User email:", user.user.email);

    if (userError) {
      throw userError;
    }

    // Check if email has a predefined username
    const predefinedUsername = checkPredefinedUsername(user.user.email);
    if (predefinedUsername) {
      // Store predefined username in Supabase
      const { error } = await supabase
        .from('saigo_users')
        .update({ username: predefinedUsername })
        .eq('email', user.user.email);

      if (error) {
        throw error;
      }

      return NextResponse.json({ "created": predefinedUsername });
    }

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
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
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

    const username = completion.choices[0].message?.content?.trim();
    console.log("🔑 Generated username:", username);

    if (!username) {
      throw new Error(`Failed to generate username: ${JSON.stringify(completion)}`);
    }

    // Store in Supabase
    const { data: updatedUser, error } = await supabase
      .from('saigo_users')
      .update({ username: username })
      .eq('email', user.user.email);

    console.log("🔑 Updated user:", updatedUser);

    if (error) {
      throw error;
    }

    return NextResponse.json({ "created": username });
  } catch (error) {
    console.error('Username generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate username' },
      { status: 500 }
    );
  }
}

/**
 * Checks if the user's email has a predefined username mapping
 * @param email User's email address
 * @returns Predefined username if it exists, otherwise null
 */
function checkPredefinedUsername(email: string): string | null {
  // Get email mappings from environment variables
  // Format: EMAIL_MAPPINGS=email1:username1,email2:username2,email3:username3
  const emailMappingsStr = process.env.EMAIL_MAPPINGS || '';

  if (!emailMappingsStr) {
    return null;
  }

  // Parse the mappings string into a Record object
  const emailMappings: Record<string, string> = {};
  emailMappingsStr.split(',').forEach(mapping => {
    const [mappedEmail, username] = mapping.split(':');
    if (mappedEmail && username) {
      emailMappings[mappedEmail.trim()] = username.trim();
    }
  });

  return emailMappings[email] || null;
}
