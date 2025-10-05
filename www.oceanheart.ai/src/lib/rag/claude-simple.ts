import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

// Load Kaishin Method specification content (cached at module load time)
let kaishinContent: string | null = null;

function getKaishinContent(): string {
  if (kaishinContent) return kaishinContent;

  const specFiles = [
    'docs/specs/the-kaishin-method.md',
    'docs/specs/circles-of-mastery.md',
    'docs/specs/mastery-architecture.md'
  ];

  const contents: string[] = [];

  for (const file of specFiles) {
    const filePath = path.join(process.cwd(), file);

    if (!fs.existsSync(filePath)) {
      throw new Error(`Specification file not found: ${file}`);
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    contents.push(`# ${path.basename(file, '.md')}\n\n${content}`);
  }

  kaishinContent = contents.join('\n\n---\n\n');
  return kaishinContent;
}

export interface AskBookResult {
  answer: string;
  usage: {
    input_tokens: number;
    output_tokens: number;
    cache_creation_input_tokens?: number;
    cache_read_input_tokens?: number;
  };
}

export async function askBook(question: string): Promise<AskBookResult> {
  const content = getKaishinContent();

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 2048,
    system: [
      {
        type: 'text',
        text: `You are the Kaishin AI Companion, an expert guide for The Kaishin Method.

Answer questions based ONLY on The Kaishin Method specifications provided below.
The method consists of:
- Three Pillars: The View (Zen & Non-Duality), The Compass (ACT & Psychology), The Ground (Somatic Work)
- Eight Circles of Mastery: Progressive stages from Foundation to Embodied Wisdom
- Five Bodies: Mental, Emotional, Energetic, Physical, Spiritual

Always cite specific sections, circles, or pillars when making claims.
If the answer isn't clearly in the specifications, say so and suggest what related topics the method does cover.
Be concise but thorough. Structure your answers clearly with practical guidance.`,
        cache_control: { type: 'ephemeral' }
      },
      {
        type: 'text',
        text: `KAISHIN METHOD SPECIFICATIONS:\n\n${content}`,
        cache_control: { type: 'ephemeral' }
      }
    ],
    messages: [{ role: 'user', content: question }],
  });

  return {
    answer: message.content[0].type === 'text' ? message.content[0].text : '',
    usage: {
      input_tokens: message.usage.input_tokens,
      output_tokens: message.usage.output_tokens,
      cache_creation_input_tokens: message.usage.cache_creation_input_tokens ?? undefined,
      cache_read_input_tokens: message.usage.cache_read_input_tokens ?? undefined,
    },
  };
}

export async function askBookStreaming(question: string) {
  const content = getKaishinContent();

  return anthropic.messages.stream({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 2048,
    system: [
      {
        type: 'text',
        text: `You are the Kaishin AI Companion, an expert guide for The Kaishin Method.

Answer questions based ONLY on The Kaishin Method specifications provided below.
The method consists of:
- Three Pillars: The View (Zen & Non-Duality), The Compass (ACT & Psychology), The Ground (Somatic Work)
- Eight Circles of Mastery: Progressive stages from Foundation to Embodied Wisdom
- Five Bodies: Mental, Emotional, Energetic, Physical, Spiritual

Always cite specific sections, circles, or pillars when making claims.
If the answer isn't clearly in the specifications, say so and suggest what related topics the method does cover.
Be concise but thorough. Structure your answers clearly with practical guidance.`,
        cache_control: { type: 'ephemeral' }
      },
      {
        type: 'text',
        text: `KAISHIN METHOD SPECIFICATIONS:\n\n${content}`,
        cache_control: { type: 'ephemeral' }
      }
    ],
    messages: [{ role: 'user', content: question }],
  });
}
