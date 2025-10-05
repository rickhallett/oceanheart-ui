import * as cheerio from 'cheerio';
import { promises as fs } from 'fs';
import path from 'path';

export interface Testimonial {
  name: string;
  quote: string;
  title?: string;
  rating: number;
  date?: string;
}

const CACHE_FILE = path.join(process.cwd(), 'tmp', 'testimonials-cache.json');
const CACHE_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const TRUSTPILOT_URL = 'https://uk.trustpilot.com/review/richardhallett.net';

// Fallback testimonials (existing static ones from the landing page)
const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah M.",
    quote: "I'd been meditating for years but still felt like something was missing. Kaishin helped me see that I was making awakening into another achievement. The View isn't about getting somewhere—it's recognizing you're already here.",
    title: "Meditation Teacher • Circle 4",
    rating: 5,
  },
  {
    name: "Lisa K.",
    quote: "Talk therapy got me to understanding, but my body was still in survival mode. The somatic work Kaishin guided me through finally helped my nervous system feel safe. That's when real change became possible.",
    title: "Entrepreneur • Circle 3",
    rating: 5,
  },
  {
    name: "David P.",
    quote: "I came to Kaishin fragmented—spiritual insights that didn't help my anxiety, therapy that didn't touch the existential questions. The integration of View, Compass, and Ground gave me wholeness.",
    title: "Tech Leader • Circle 3",
    rating: 5,
  },
];

interface CacheData {
  testimonials: Testimonial[];
  timestamp: number;
}

/**
 * Smart truncation algorithm to extract the "top chunk" of a testimonial
 * Aims for ~50-80 words while preserving sentence integrity
 */
export function extractTopChunk(text: string, targetWords: number = 65): string {
  // Remove extra whitespace and normalize
  const normalized = text.trim().replace(/\s+/g, ' ');

  // Split into sentences (rough heuristic)
  const sentences = normalized.split(/(?<=[.!?])\s+/);

  let chunk = '';
  let wordCount = 0;

  for (const sentence of sentences) {
    const sentenceWords = sentence.split(/\s+/).length;

    // If adding this sentence keeps us under target, include it
    if (wordCount + sentenceWords <= targetWords) {
      chunk += sentence + ' ';
      wordCount += sentenceWords;
    } else {
      // If we have nothing yet, include at least the first sentence
      if (wordCount === 0) {
        chunk = sentence;
      }
      break;
    }
  }

  return chunk.trim();
}

/**
 * Scrape testimonials from Trustpilot page
 */
export async function scrapeTrustpilotTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await fetch(TRUSTPILOT_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const testimonials: Testimonial[] = [];

    // Trustpilot uses article tags for reviews
    $('article[data-service-review-card-paper]').each((_, element) => {
      const $review = $(element);

      // Extract reviewer name
      const nameElement = $review.find('[data-consumer-name-typography]');
      const name = nameElement.text().trim();

      // Extract review text
      const textElement = $review.find('[data-service-review-text-typography]');
      const fullText = textElement.text().trim();

      // Extract rating (count filled stars)
      const ratingElement = $review.find('[data-service-review-rating]');
      const ratingImg = ratingElement.find('img');
      const ratingAlt = ratingImg.attr('alt') || '';
      const ratingMatch = ratingAlt.match(/(\d+)\s+out\s+of\s+5\s+stars/i);
      const rating = ratingMatch ? parseInt(ratingMatch[1], 10) : 5;

      // Extract date
      const dateElement = $review.find('time');
      const date = dateElement.attr('datetime') || dateElement.text().trim();

      if (name && fullText) {
        // Extract top chunk for display
        const quote = extractTopChunk(fullText);

        testimonials.push({
          name,
          quote,
          rating,
          date,
        });
      }
    });

    return testimonials;
  } catch (_error) {

    return [];
  }
}

/**
 * Get cached testimonials if they exist and are fresh
 */
async function getCachedTestimonials(): Promise<Testimonial[] | null> {
  try {
    const cacheContent = await fs.readFile(CACHE_FILE, 'utf-8');
    const cacheData: CacheData = JSON.parse(cacheContent);

    const age = Date.now() - cacheData.timestamp;

    if (age < CACHE_DURATION_MS) {
      
      return cacheData.testimonials;
    } else {
      
      return null;
    }
  } catch (_error) {
    // Cache file doesn't exist or is invalid
    return null;
  }
}

/**
 * Save testimonials to cache
 */
async function cacheTestimonials(testimonials: Testimonial[]): Promise<void> {
  try {
    const cacheDir = path.dirname(CACHE_FILE);
    await fs.mkdir(cacheDir, { recursive: true });

    const cacheData: CacheData = {
      testimonials,
      timestamp: Date.now(),
    };

    await fs.writeFile(CACHE_FILE, JSON.stringify(cacheData, null, 2));
    
  } catch (_error) {
    
  }
}

/**
 * Get testimonials with cascade fallback:
 * 1. Try fresh cache
 * 2. Try scraping fresh data
 * 3. Try stale cache
 * 4. Use static fallback testimonials
 */
export async function getTestimonials(limit: number = 10): Promise<Testimonial[]> {
  // Try fresh cache first
  const cached = await getCachedTestimonials();
  if (cached) {
    return cached.slice(0, limit);
  }

  // Try scraping fresh data
  try {
    
    const scraped = await scrapeTrustpilotTestimonials();

    if (scraped.length > 0) {
      // Cache the successful scrape
      await cacheTestimonials(scraped);
      return scraped.slice(0, limit);
    }
  } catch (_error) {
    
  }

  // Try reading stale cache (better than nothing)
  try {
    const cacheContent = await fs.readFile(CACHE_FILE, 'utf-8');
    const cacheData: CacheData = JSON.parse(cacheContent);
    
    return cacheData.testimonials.slice(0, limit);
  } catch {
    // Fall through to static fallback
  }

  // Final fallback to static testimonials
  
  return FALLBACK_TESTIMONIALS;
}
