import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const courses = [
  {
    id: '30-day-challenge',
    title: 'The 30-Day Integration Challenge',
    prompt: 'A serene, minimalist abstract image representing daily spiritual practice and integration. Soft gradient from ocean blue to jade green. Clean, modern aesthetic with subtle geometric patterns suggesting growth and consistency. Light, peaceful, contemplative mood. No text, no people.',
    size: '1792x1024'
  },
  {
    id: '90-day-transformation',
    title: 'The 90-Day Transformation',
    prompt: 'An elegant abstract representation of personal transformation and mastery. Rich gradient flowing from deep plum to warm gold. Suggests journey, evolution, and profound change. Organic flowing forms meeting structured elements. Sophisticated, inspiring, premium feeling. No text, no people.',
    size: '1792x1024'
  },
  {
    id: 'ai-human-edge',
    title: 'AI & The Human Edge',
    prompt: 'Modern abstract image balancing technology and humanity. Gradient from ocean blue to deep plum. Suggests integration of AI with human consciousness. Clean geometric shapes merging with organic forms. Futuristic yet grounded, hopeful and conscious. No text, no people.',
    size: '1792x1024'
  },
  {
    id: 'view-intensive',
    title: 'The View Intensive: Awakening to What You Are',
    prompt: 'Abstract spiritual awakening imagery. Deep purple to violet gradient (#667eea to #764ba2). Represents non-dual awareness and direct recognition. Infinite space, vast openness, luminous emptiness. Zen-like simplicity with mystical depth. No text, no people.',
    size: '1792x1024'
  },
  {
    id: 'compass-mastery',
    title: 'The Compass Mastery: ACT for Real Life',
    prompt: 'Abstract representation of psychological clarity and values-aligned living. Gradient from vibrant jade to clear ocean blue. Suggests navigation, direction, inner wisdom. Compass-like radial patterns, pathways, alignment. Clear, purposeful, empowering. No text, no people.',
    size: '1792x1024'
  },
  {
    id: 'ground-awakening',
    title: 'The Ground Awakening: Somatic Mastery',
    prompt: 'Organic abstract image of embodiment and nervous system healing. Warm earth tones flowing from rich brown (#a8714a) to healing jade green. Represents grounding, safety, body wisdom. Flowing, gentle, nurturing forms. Earthy yet vibrant. No text, no people.',
    size: '1792x1024'
  },
  {
    id: 'integrated-leadership',
    title: 'Integrated Leadership',
    prompt: 'Sophisticated abstract representation of conscious leadership. Gradient from radiant gold to deep plum. Suggests presence, authority, wisdom. Balanced composition with strong center and radiating influence. Professional, powerful, grounded. No text, no people.',
    size: '1792x1024'
  },
  {
    id: 'integrated-relationships',
    title: 'Integrated Relationships',
    prompt: 'Abstract image of intimate connection and conscious relating. Soft gradient from pink (#f093fb) to warm coral (#f5576c). Represents interweaving, union, harmony. Flowing forms that meet and merge. Tender, intimate, authentic. No text, no people.',
    size: '1792x1024'
  },
  {
    id: 'certified-practitioner',
    title: 'The Kaishin Method Certified Practitioner',
    prompt: 'Premium abstract image representing mastery and teaching lineage. Elegant gradient from luminous gold to deep ocean blue. Suggests wisdom transmission, expertise, certification. Mandala-like sacred geometry, professional excellence. Prestigious, refined, transformative. No text, no people.',
    size: '1792x1024'
  }
];

async function downloadImage(url, filepath) {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  fs.writeFileSync(filepath, Buffer.from(buffer));
}

async function generateCourseImages() {
  const outputDir = path.join(__dirname, '..', 'public', 'images', 'courses');

  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('🎨 Starting course image generation...\n');

  for (const course of courses) {
    try {
      console.log(`Generating: ${course.title}`);
      console.log(`Prompt: ${course.prompt.substring(0, 80)}...`);

      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: course.prompt,
        n: 1,
        size: course.size,
        quality: "hd",
        style: "natural"
      });

      const imageUrl = response.data[0].url;
      const filepath = path.join(outputDir, `${course.id}.png`);

      await downloadImage(imageUrl, filepath);

      console.log(`✅ Saved: ${course.id}.png`);
      console.log(`   URL: ${imageUrl}\n`);

      // Add delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));

    } catch (error) {
      console.error(`❌ Error generating ${course.id}:`, error.message);
      if (error.response) {
        console.error('   Response:', error.response.data);
      }
    }
  }

  console.log('\n✨ Course image generation complete!');
  console.log(`Images saved to: ${outputDir}`);
}

generateCourseImages();
