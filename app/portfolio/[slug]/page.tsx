import Link from "next/link";
import { getProjectBySlug } from "@/libs/portfolio";
import { getProjectReadmeContent } from "@/libs/markdown";

type Props = { params: { slug: string } }

export default async function PortfolioDetailPage({ params }: Props) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Project not found</h1>
        <p className="mb-8">The project you're looking for doesn't exist.</p>
        <Link href="/portfolio" className="btn btn-primary">Back to Portfolio</Link>
      </main>
    )
  }

  // Load README content
  const readmeContent = await getProjectReadmeContent(params.slug)

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      {/* Navigation */}
      <nav className="mb-4">
        <Link href="/portfolio" className="btn btn-ghost">
          ← Back to Portfolio
        </Link>
      </nav>

      {/* Project Header */}
      <header className="mb-4">
        <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {project.title}
        </h1>
        <p className="text-lg text-base-content/80 leading-snug">
          {project.description}
        </p>
      </header>

      {/* External Application Access */}
      {project.externalUrl && (
        <section className="mb-4">
          <div className="bg-base-200 rounded-lg p-4 border-l-4 border-primary">
            <h2 className="text-base font-semibold mb-2 flex items-center">
              🚀 Live Application
            </h2>
            <p className="text-base text-base-content/80 mb-3">
              This project is live and available for exploration.
            </p>
            <Link
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Open Live App
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        </section>
      )}

      {/* Project Content (README) */}
      <section className="mb-4">
        <h2 className="text-2xl font-bold mb-3">Project Details</h2>
        {readmeContent.exists ? (
          <>
            {/* GitHub source indicator */}
            {project.githubRepo && (
              <div className="mb-4 text-sm text-base-content/60 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>Fetched from GitHub: {project.githubRepo}</span>
                {project.githubBranch && project.githubBranch !== 'main' && (
                  <span className="text-primary">(branch: {project.githubBranch})</span>
                )}
              </div>
            )}
            <div
              className="prose prose-base max-w-none prose-headings:text-base-content prose-headings:mt-4 prose-headings:mb-2 prose-p:text-base-content/80 prose-p:my-2 prose-strong:text-base-content prose-code:text-primary prose-pre:bg-base-200 prose-pre:my-3 prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5 prose-table:text-sm"
              dangerouslySetInnerHTML={{ __html: readmeContent.html }}
            />
          </>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: readmeContent.html }} />
        )}
      </section>

      {/* Tech Stack Section */}
      <section className="mb-4">
        <h2 className="text-2xl font-bold mb-3">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="inline-block px-3 py-1.5 text-sm font-medium bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border border-primary/20 rounded-full hover:bg-primary/20 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Related Projects - Future Enhancement */}
      {/* TODO: Implement related projects section in Phase 4 */}
    </main>
  )
}
