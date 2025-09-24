import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  author: string;
  description: string;
  image: string;
  published: boolean;
  content: string;
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
}

export interface BlogFrontmatter {
  title: string;
  date: string;
  tags: string[];
  author: string;
  description: string;
  image: string;
  published?: boolean;
}

/**
 * Generate slug from filename
 * Format: YYYY-MM-DD-title-kebab-case.md -> title-kebab-case
 */
export function generateSlugFromFilename(filename: string): string {
  // Remove .md extension and date prefix
  const nameWithoutExt = filename.replace(/\.md$/, '');
  const parts = nameWithoutExt.split('-');
  
  // Skip first 3 parts (YYYY-MM-DD) if they match date pattern
  if (parts.length > 3 && /^\d{4}$/.test(parts[0]) && /^\d{2}$/.test(parts[1]) && /^\d{2}$/.test(parts[2])) {
    return parts.slice(3).join('-');
  }
  
  return nameWithoutExt;
}

/**
 * Get all blog post slugs
 */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  
  const filenames = fs.readdirSync(postsDirectory);
  return filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => generateSlugFromFilename(filename));
}

/**
 * Get blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!fs.existsSync(postsDirectory)) {
    return null;
  }
  
  const filenames = fs.readdirSync(postsDirectory);
  const filename = filenames.find(fn => generateSlugFromFilename(fn) === slug);
  
  if (!filename) {
    return null;
  }
  
  const fullPath = path.join(postsDirectory, filename);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // Parse frontmatter
  const { data, content } = matter(fileContents);
  const frontmatter = data as BlogFrontmatter;
  
  // Process markdown to HTML
  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();
  
  // Calculate reading time
  const stats = readingTime(content);
  
  return {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    tags: frontmatter.tags || [],
    author: frontmatter.author,
    description: frontmatter.description,
    image: frontmatter.image,
    published: frontmatter.published !== false, // Default to true if not specified
    content: contentHtml,
    readingTime: stats
  };
}

/**
 * Get all blog posts sorted by date
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  const slugs = getAllPostSlugs();
  const posts = await Promise.all(
    slugs.map(slug => getPostBySlug(slug))
  );
  
  return posts
    .filter((post): post is BlogPost => post !== null)
    .filter(post => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get posts by tag
 */
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => 
    post.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

/**
 * Get all unique tags from all posts
 */
export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllPosts();
  const tags = new Set<string>();
  
  allPosts.forEach(post => {
    post.tags.forEach(tag => tags.add(tag));
  });
  
  return Array.from(tags).sort();
}