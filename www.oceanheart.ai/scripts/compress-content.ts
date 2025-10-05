import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

async function compressContent() {
  const contentDir = path.join(process.cwd(), 'docs/content');
  const outputPath = path.join(process.cwd(), 'public/ai/content-summary.json');

  try {
    // Read markdown files
    const kaishinMethod = await fs.readFile(path.join(contentDir, 'the-kaishin-method.md'), 'utf-8');
    const circles = await fs.readFile(path.join(contentDir, 'circles-of-mastery.md'), 'utf-8');
    const transformation = await fs.readFile(path.join(contentDir, '90-day-transformation.md'), 'utf-8');

    // Parse frontmatter
    const kaishinParsed = matter(kaishinMethod);
    const circlesParsed = matter(circles);
    const transformationParsed = matter(transformation);

    // Compress content (remove extra whitespace, truncate if needed)
    const compress = (text: string, maxLength = 1000) => {
      return text
        .replace(/\n\s*\n/g, '\n') // Remove empty lines
        .replace(/\s+/g, ' ')       // Collapse whitespace
        .slice(0, maxLength);       // Truncate
    };

    const summary = {
      aiSolutions: `## AI Solutions for Business
Richard specializes in custom Claude AI integrations, intelligent automation, and agentic workflows. Expertise includes RAG systems, prompt engineering, and production-grade AI applications built with TypeScript/Python. Services include AI consulting, custom chatbot development, workflow automation, and AI strategy for businesses looking to leverage cutting-edge language models.`,

      somaticTherapy: `## Somatic Therapy & Healing
Body-centered therapeutic practices drawing from somatic experiencing, trauma healing, and consciousness expansion. Integrative approach combines psychology, embodiment, and spiritual development. Sessions focus on releasing stored trauma from the body, developing somatic awareness, and cultivating presence through breathwork, movement, and guided awareness practices.`,

      webDevelopment: `## Web & App Development
15+ years building modern web applications with Next.js, React, TypeScript, and full-stack technologies. Specializes in high-performance applications, exceptional developer experience, and clean architecture. Portfolio includes enterprise SaaS platforms, AI-integrated applications, e-commerce solutions, and custom web applications. Tech stack expertise: Next.js 15, React 19, TypeScript, Tailwind CSS, Node.js, PostgreSQL, Supabase, Vercel deployment.`,

      professionalProfile: `## Professional Profile
Senior Software Engineer with expertise in AI integration, full-stack development, and technical leadership. 15+ years of experience building production applications. Available for consulting, fractional CTO roles, and complex development projects. Skills include: React/Next.js, TypeScript, Python, AI/ML integration, system architecture, team leadership, and agile development. Open to remote opportunities and project-based work.`,

      kaishinMethod: `## The Kaishin Method
${compress(kaishinParsed.content, 800)}

### Eight Circles of Mastery
${compress(circlesParsed.content, 600)}

### 90-Day Transformation
${compress(transformationParsed.content, 400)}`,
    };

    // Ensure output directory exists
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    // Write compressed content
    await fs.writeFile(outputPath, JSON.stringify(summary, null, 2));

    console.log('✅ Content compressed successfully to public/ai/content-summary.json');
  } catch (error) {
    console.error('❌ Error compressing content:', error);
    process.exit(1);
  }
}

compressContent().catch(console.error);
