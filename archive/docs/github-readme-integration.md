# GitHub README Integration

## Overview
The portfolio section now dynamically fetches README files from GitHub repositories instead of using static markdown files. This ensures documentation is always up-to-date with the actual project repositories.

## How It Works

1. **Project Configuration**: Each project in `libs/portfolio.ts` can specify:
   - `githubRepo`: The GitHub repository in `owner/repo` format
   - `githubBranch`: The branch to fetch from (defaults to `main`)

2. **Fetching Process**:
   - When a portfolio page is accessed, the system first checks for a GitHub repo configuration
   - If configured, it fetches the README directly from GitHub
   - Falls back to local markdown files if GitHub fetch fails
   - Results are cached for performance (1 hour in production, 5 minutes in development)

3. **Processing Pipeline**:
   - Raw markdown from GitHub is processed with the same Shiki syntax highlighting
   - HTML is sanitized for security
   - GitHub source indicator is displayed on the page

## Configuration

### Adding GitHub Integration to a Project

In `libs/portfolio.ts`, add the GitHub repository information:

```typescript
{
  id: 101,
  title: "Your Project",
  description: "Project description",
  // ... other fields
  githubRepo: "your-org/your-repo",
  githubBranch: "main", // optional, defaults to main
}
```

### Environment Variables (Optional)

For private repositories or to increase API rate limits, add a GitHub token:

```bash
# .env.local
GITHUB_TOKEN=your_github_personal_access_token
```

Without a token, the system is limited to 60 requests per hour per IP.

## Cache Management

### Automatic Caching
- Production: 1 hour cache duration
- Development: 5 minutes cache duration
- Uses Next.js built-in caching mechanisms

### Manual Cache Revalidation

To manually refresh a project's README:

```bash
# GET endpoint to check configuration
curl 'http://localhost:4444/api/revalidate-readme?slug=apps-watson'

# POST endpoint to trigger revalidation
curl -X POST 'http://localhost:4444/api/revalidate-readme' \
  -H 'Content-Type: application/json' \
  -d '{"slug": "apps-watson"}'
```

For production with a secret:
```bash
curl -X POST 'https://your-domain.com/api/revalidate-readme' \
  -H 'Content-Type: application/json' \
  -d '{"slug": "apps-watson", "secret": "your-revalidate-secret"}'
```

## Fallback Behavior

The system maintains backward compatibility with local markdown files:

1. First attempts to fetch from GitHub if configured
2. Falls back to local files in `docs/projects/` if:
   - GitHub fetch fails
   - No GitHub repo is configured
   - Network issues occur

## Benefits

- **Always Current**: Documentation stays synchronized with the repository
- **Single Source of Truth**: README in GitHub is the authoritative source
- **Reduced Maintenance**: No need to manually update documentation files
- **Graceful Degradation**: Falls back to local files if GitHub is unavailable

## Troubleshooting

### README Not Fetching
- Verify the repository exists and is public (or token is configured for private repos)
- Check the branch name is correct
- Ensure README file exists in the repository root
- Check API rate limits if many requests are made

### Rate Limiting
- Without authentication: 60 requests/hour
- With GitHub token: 5,000 requests/hour
- Check current limits: `curl https://api.github.com/rate_limit`

### Supported README Formats
The system looks for these filenames in order:
- README.md
- readme.md
- Readme.md
- README.MD

## Future Enhancements

- Support for fetching documentation from subdirectories
- Webhook integration for instant updates
- Support for multiple documentation files per project
- Caching optimization based on repository activity