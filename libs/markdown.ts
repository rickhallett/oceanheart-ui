import { readFile } from 'fs/promises'
import { join } from 'path'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'
import DOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'
import { createHighlighter, bundledLanguages, bundledThemes } from 'shiki'
import { getProjectDocumentationFile } from './portfolio'

// Create a DOM environment for DOMPurify to work in Node.js
const window = new JSDOM('').window
const DOMPurifyServer = DOMPurify(window as any)

// Initialize Shiki highlighter with cached instance
let highlighterPromise: Promise<any> | null = null

async function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-dark', 'github-light'],
      langs: [
        'javascript',
        'typescript',
        'python',
        'go',
        'sql',
        'bash',
        'shell',
        'sh',
        'json',
        'html',
        'css',
        'markdown',
        'yaml',
        'dockerfile',
        'rust',
        'java',
        'cpp',
        'text',
        'plaintext'
      ]
    })
  }
  return highlighterPromise
}

export interface ProjectReadmeContent {
  html: string
  exists: boolean
  error?: string
}

/**
 * Process HTML content to add syntax highlighting to code blocks
 * @param html The HTML content with code blocks
 * @returns HTML with highlighted code blocks
 */
async function highlightCodeBlocks(html: string): Promise<string> {
  const highlighter = await getHighlighter()
  const dom = new JSDOM(html)
  const document = dom.window.document
  
  // Find all pre > code elements AND standalone pre elements
  const preElements = document.querySelectorAll('pre')
  
  for (const pre of preElements) {
    // Check if this pre contains a code element
    const codeBlock = pre.querySelector('code')
    
    let code: string
    let lang: string = 'text'
    
    if (codeBlock) {
      // Standard markdown code block with language
      code = codeBlock.textContent || ''
      const className = codeBlock.className
      
      // Extract language from class name (e.g., "language-javascript")
      const langMatch = className.match(/language-(\w+)/)
      if (langMatch) {
        lang = langMatch[1]
      }
    } else {
      // Plain pre element without code child (common in basic markdown)
      code = pre.textContent || ''
      // Try to detect language from content patterns if no language specified
      if (code.includes('function') || code.includes('const') || code.includes('let')) {
        lang = 'javascript'
      } else if (code.includes('def ') || code.includes('import ')) {
        lang = 'python'
      } else if (code.includes('func ') || code.includes('package ')) {
        lang = 'go'
      } else if (code.includes('SELECT') || code.includes('FROM')) {
        lang = 'sql'
      }
    }
    
    // Handle language aliases and fallbacks
    const langAliases: Record<string, string> = {
      'js': 'javascript',
      'ts': 'typescript',
      'py': 'python',
      'yml': 'yaml',
      'dockerfile': 'dockerfile',
      'plaintext': 'text',
      'txt': 'text'
    }
    
    if (langAliases[lang]) {
      lang = langAliases[lang]
    }
    
    try {
      // Generate highlighted HTML using Shiki
      const highlighted = await highlighter.codeToHtml(code, {
        lang,
        theme: 'github-dark',
        transformers: [
          {
            pre(node: any) {
              // Add custom classes for styling
              node.properties.class = 'shiki overflow-x-auto rounded-lg p-4'
              // Preserve the language class for potential future use
              node.properties['data-language'] = lang
            },
            code(node: any) {
              // Ensure code element has proper display
              node.properties.class = 'block'
            }
          }
        ]
      })
      
      // Create a temporary container to parse the highlighted HTML
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = highlighted
      const highlightedPre = tempDiv.firstElementChild
      
      if (highlightedPre && pre.parentElement) {
        pre.parentElement.replaceChild(highlightedPre, pre)
      }
    } catch (error) {
      // If highlighting fails for any reason, keep the original code block
      console.warn(`Failed to highlight code block with language '${lang}':`, error)
    }
  }
  
  return dom.serialize()
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

      // Apply syntax highlighting to code blocks
      const highlightedHtml = await highlightCodeBlocks(processed.toString())

      // Sanitize the HTML to prevent XSS attacks
      const sanitizedHtml = DOMPurifyServer.sanitize(highlightedHtml, {
        // Allow Shiki's style attributes for syntax highlighting and standard HTML attributes
        ALLOWED_ATTR: ['class', 'style', 'data-language', 'href', 'target', 'rel', 'src', 'alt', 'title'],
        ALLOWED_TAGS: ['pre', 'code', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
                       'p', 'a', 'ul', 'ol', 'li', 'blockquote', 'em', 'strong', 'del',
                       'table', 'thead', 'tbody', 'tr', 'th', 'td', 'hr', 'br', 'img']
      })

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