import { Anthropic } from '@anthropic-ai/sdk';
import { NextRequest } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { question, history } = await request.json();

    // Load compressed content summary
    const contentPath = path.join(process.cwd(), 'public/ai/content-summary.json');
    let contentSummary;

    try {
      const contentFile = await fs.readFile(contentPath, 'utf-8');
      contentSummary = JSON.parse(contentFile);
    } catch (error) {
      console.error('Error loading content summary:', error);
      // Fallback content if file doesn't exist
      contentSummary = {
        aiSolutions: "## AI Solutions for Business\nRichard specializes in custom Claude AI integrations, intelligent automation, and agentic workflows.",
        somaticTherapy: "## Somatic Therapy & Healing\nBody-centered therapeutic practices drawing from somatic experiencing, trauma healing, and consciousness expansion.",
        webDevelopment: "## Web & App Development\n15+ years building modern web applications with Next.js, React, TypeScript, and full-stack technologies.",
        professionalProfile: "## Professional Profile\nSenior Software Engineer with expertise in AI integration, full-stack development, and technical leadership.",
        kaishinMethod: "## The Kaishin Method\nA transformative journey through consciousness, mastery, and embodied awakening."
      };
    }

    const systemPrompt = `You are Oceanheart AI, an intelligent assistant representing Richard Hallett's multifaceted work.

Your purpose: Help visitors understand offerings and direct them to relevant content.

# Content Areas

${contentSummary.aiSolutions}

${contentSummary.somaticTherapy}

${contentSummary.webDevelopment}

${contentSummary.professionalProfile}

${contentSummary.kaishinMethod}

# Response Guidelines
- Be concise (2-4 sentences for most answers)
- Always end responses with a suggested next action (e.g., "Visit /program to learn more")
- Use markdown formatting for readability
- Match the tone to the question (technical for dev questions, warm for therapy, professional for business)
- If unsure, ask clarifying questions
- Proactively suggest related content areas
- When suggesting pages, use these routes:
  - AI Solutions: /consulting
  - Somatic Therapy: /somatic
  - Web Development: /portfolio
  - Professional Profile: /profile (or mention LinkedIn)
  - Kaishin Method: /program
`;

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    // Build message history
    const messages = [
      ...(history || []).map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: 'user', content: question },
    ];

    const stream = await anthropic.messages.stream({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: systemPrompt,
      messages,
    });

    // Stream response back to client
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta') {
              controller.enqueue(encoder.encode(chunk.delta.text));
            }
          }
          controller.close();
        } catch (error) {
          console.error('Streaming error:', error);
          controller.error(error);
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error('API error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process request' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
