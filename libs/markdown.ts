import { readFile } from 'fs/promises'
import { join } from 'path'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'
import DOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'
import { getProjectDocumentationFile } from './portfolio'

// Create a DOM environment for DOMPurify to work in Node.js
const window = new JSDOM('').window
const DOMPurifyServer = DOMPurify(window as any)

export interface ProjectReadmeContent {
  html: string
  exists: boolean
  error?: string
}

/**
 * Loads and processes README content for a project
 * @param slug The project slug (e.g., "apps-watson")
 * @returns Processed HTML content, existence status, and any errors
 */
export async function getProjectReadmeContent(slug: string): Promise<ProjectReadmeContent> {
  try {
    // Get the documentation file name from the mapping
    const docFileName = getProjectDocumentationFile(slug)

    if (!docFileName) {
      return {
        html: generateFallbackContent(slug),
        exists: false,
        error: 'No documentation file mapped for this project'
      }
    }

    // Build the full path to the documentation file
    const docPath = join(process.cwd(), 'docs', 'projects', docFileName)

    try {
      // Read the markdown file
      const markdownContent = await readFile(docPath, 'utf8')

      // Process the markdown with remark
      const processed = await remark()
        .use(remarkGfm) // Support GitHub Flavored Markdown
        .use(remarkHtml, { sanitize: false }) // Don't sanitize yet, we'll use DOMPurify
        .process(markdownContent)

      // Sanitize the HTML to prevent XSS attacks
      const sanitizedHtml = DOMPurifyServer.sanitize(processed.toString())

      return {
        html: sanitizedHtml,
        exists: true
      }
    } catch (fileError: any) {
      console.error(`Error reading documentation file ${docFileName}:`, fileError)

      return {
        html: generateFallbackContent(slug),
        exists: false,
        error: `Documentation file not found: ${docFileName}`
      }
    }
  } catch (error: any) {
    console.error('Error processing project README:', error)

    return {
      html: generateFallbackContent(slug),
      exists: false,
      error: error.message || 'Unknown error processing documentation'
    }
  }
}

/**
 * Generates fallback HTML content when documentation is not available
 * @param slug The project slug
 * @returns Fallback HTML content
 */
function generateFallbackContent(slug: string): string {
  return `
    <div class="bg-base-200 rounded-xl p-6 mb-8">
      <h3 class="text-lg font-semibold mb-3">📚 Documentation Coming Soon</h3>
      <p class="text-base-content/80">
        Detailed documentation for this project is currently being prepared.
        In the meantime, you can explore the project details and technical information available above.
      </p>
      <p class="text-xs text-base-content/60 mt-3">
        Project slug: <code class="bg-base-300 px-2 py-1 rounded">${slug}</code>
      </p>
    </div>
  `
}

/**
 * Validates if a project has available documentation
 * @param slug The project slug
 * @returns Boolean indicating if documentation exists
 */
export function hasProjectDocumentation(slug: string): boolean {
  return getProjectDocumentationFile(slug) !== null
}