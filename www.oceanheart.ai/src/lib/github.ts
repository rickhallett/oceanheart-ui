/**
 * GitHub README fetching utilities for portfolio projects
 */

export interface GitHubReadmeResult {
  html: string;
  exists: boolean;
  error?: string;
}

/**
 * Fetch README content from a GitHub repository
 * @param repo - Repository in format "owner/repo"
 * @param branch - Branch name (defaults to "main", falls back to "master")
 * @returns Parsed README content as HTML
 */
export async function fetchGitHubReadme(
  repo: string,
  branch: string = "main"
): Promise<GitHubReadmeResult> {
  // Branches to try in order
  const branchesToTry = [branch];
  if (branch === "main") branchesToTry.push("master");
  if (branch === "master") branchesToTry.push("main");

  // README filenames to try
  const readmeNames = ["README.md", "readme.md", "Readme.md"];

  for (const branchName of branchesToTry) {
    for (const readmeName of readmeNames) {
      try {
        const rawUrl = `https://raw.githubusercontent.com/${repo}/${branchName}/${readmeName}`;

        const response = await fetch(rawUrl, {
          next: { revalidate: 3600 }, // Cache for 1 hour
        });

        if (response.ok) {
          const markdown = await response.text();
          return {
            html: markdown,
            exists: true,
          };
        }
      } catch {
        // Continue to next attempt
      }
    }
  }

  return {
    html: "",
    exists: false,
    error: `README not found in ${repo}`,
  };
}

/**
 * Process markdown to HTML with syntax highlighting
 * This is a server-side function
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const { unified } = await import("unified");
  const remarkParse = (await import("remark-parse")).default;
  const remarkRehype = (await import("remark-rehype")).default;
  const remarkGfm = (await import("remark-gfm")).default;
  const rehypeHighlight = (await import("rehype-highlight")).default;
  const rehypeStringify = (await import("rehype-stringify")).default;

  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(markdown);

  return result.toString();
}

/**
 * Fetch and process GitHub README to HTML
 */
export async function getGitHubReadmeAsHtml(
  repo: string,
  branch: string = "main"
): Promise<GitHubReadmeResult> {
  const readme = await fetchGitHubReadme(repo, branch);

  if (!readme.exists) {
    return readme;
  }

  try {
    const html = await markdownToHtml(readme.html);
    return {
      html,
      exists: true,
    };
  } catch (error) {
    return {
      html: "",
      exists: false,
      error: error instanceof Error ? error.message : "Failed to parse markdown",
    };
  }
}
