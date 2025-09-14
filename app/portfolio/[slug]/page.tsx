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
    <main className="max-w-4xl mx-auto px-6 py-16">
      {/* Navigation */}
      <nav className="mb-8">
        <Link href="/portfolio" className="btn btn-ghost mb-6">
          ← Back to Portfolio
        </Link>
      </nav>

      {/* Project Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {project.title}
        </h1>
        <p className="text-xl text-base-content/80 mb-6 leading-relaxed">
          {project.description}
        </p>
      </header>

      {/* External Application Access */}
      {project.externalUrl && (
        <section className="mb-8">
          <div className="bg-base-200 rounded-xl p-6 border-l-4 border-primary">
            <h2 className="text-lg font-semibold mb-3 flex items-center">
              🚀 Live Application
            </h2>
            <p className="text-base-content/80 mb-4">
              This project is live and available for exploration. Try it out to see the implementation in action.
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
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Project Details</h2>
        {readmeContent.exists ? (
          <div
            className="prose prose-lg max-w-none prose-headings:text-base-content prose-p:text-base-content/80 prose-strong:text-base-content prose-code:text-primary prose-pre:bg-base-200"
            dangerouslySetInnerHTML={{ __html: readmeContent.html }}
          />
        ) : (
          <div dangerouslySetInnerHTML={{ __html: readmeContent.html }} />
        )}
      </section>

      {/* Tech Stack Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
        <div className="flex flex-wrap gap-3">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="inline-block px-4 py-2 text-sm font-medium bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border border-primary/20 rounded-full hover:bg-primary/20 transition-colors"
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

