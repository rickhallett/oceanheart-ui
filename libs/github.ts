import { cache } from 'react'

export interface GitHubReadmeResponse {
  content: string
  exists: boolean
  error?: string
  fromCache?: boolean
}


const GITHUB_API_BASE = 'https://api.github.com'
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com'

// Cache duration: 1 hour in production, 5 minutes in development
const CACHE_DURATION = process.env.NODE_ENV === 'production' ? 3600 : 300

/**
 * Fetches README content from a GitHub repository
 * Uses raw.githubusercontent.com for direct markdown access
 */
async function fetchReadmeFromGitHub(
  owner: string,
  repo: string,
  branch: string = 'main'
): Promise<string> {
  // Try multiple common README filenames
  const readmeVariants = ['README.md', 'readme.md', 'Readme.md', 'README.MD']
  
  for (const filename of readmeVariants) {
    const url = `${GITHUB_RAW_BASE}/${owner}/${repo}/${branch}/${filename}`
    
    try {
      const response = await fetch(url, {
        headers: {
          'Accept': 'text/plain',
          // Add GitHub token if available for higher rate limits
          ...(process.env.GITHUB_TOKEN && {
            'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
          })
        },
        // Cache the fetch request
        next: { revalidate: CACHE_DURATION }
      })
      
      if (response.ok) {
        return await response.text()
      }
    } catch (error) {
      // Continue to next variant
      continue
    }
  }
  
  // If no README found with direct access, try GitHub API
  return fetchReadmeViaAPI(owner, repo, branch)
}

/**
 * Fetches README via GitHub API (fallback method)
 * Useful for private repos or when direct access fails
 */
async function fetchReadmeViaAPI(
  owner: string,
  repo: string,
  _branch: string = 'main'
): Promise<string> {
  const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}/readme`
  
  try {
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/vnd.github.raw',
        ...(process.env.GITHUB_TOKEN && {
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
        })
      },
      next: { revalidate: CACHE_DURATION }
    })
    
    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}: ${response.statusText}`)
    }
    
    return await response.text()
  } catch (error: any) {
    throw new Error(`Failed to fetch README via API: ${error.message}`)
  }
}

/**
 * Main function to get README content from GitHub
 * Cached using React's cache function for request deduplication
 */
export const getGitHubReadme = cache(async (
  repoPath: string,
  branch?: string
): Promise<GitHubReadmeResponse> => {
  try {
    // Parse owner/repo format
    const [owner, repo] = repoPath.split('/')
    
    if (!owner || !repo) {
      return {
        content: '',
        exists: false,
        error: 'Invalid repository format. Expected: owner/repo'
      }
    }
    
    const content = await fetchReadmeFromGitHub(owner, repo, branch || 'main')
    
    return {
      content,
      exists: true,
      fromCache: false // Will be true on subsequent cached calls
    }
  } catch (error: any) {
    console.error(`Error fetching README for ${repoPath}:`, error)
    
    return {
      content: '',
      exists: false,
      error: error.message || 'Failed to fetch README from GitHub'
    }
  }
})

/**
 * Checks if a GitHub repository is accessible
 */
export async function checkGitHubRepo(
  repoPath: string
): Promise<boolean> {
  try {
    const [owner, repo] = repoPath.split('/')
    
    if (!owner || !repo) {
      return false
    }
    
    const url = `${GITHUB_API_BASE}/repos/${owner}/${repo}`
    
    const response = await fetch(url, {
      method: 'HEAD',
      headers: {
        ...(process.env.GITHUB_TOKEN && {
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
        })
      }
    })
    
    return response.ok
  } catch {
    return false
  }
}

/**
 * Get rate limit information from GitHub API
 */
export async function getGitHubRateLimit(): Promise<{
  limit: number
  remaining: number
  reset: Date
}> {
  try {
    const response = await fetch(`${GITHUB_API_BASE}/rate_limit`, {
      headers: {
        ...(process.env.GITHUB_TOKEN && {
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`
        })
      }
    })
    
    if (!response.ok) {
      throw new Error('Failed to fetch rate limit')
    }
    
    const data = await response.json()
    
    return {
      limit: data.rate.limit,
      remaining: data.rate.remaining,
      reset: new Date(data.rate.reset * 1000)
    }
  } catch (error) {
    console.error('Error fetching rate limit:', error)
    return {
      limit: 60, // Default for unauthenticated requests
      remaining: 0,
      reset: new Date()
    }
  }
}