import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { IconBrandGithub, IconExternalLink, IconArrowLeft } from "@tabler/icons-react";
import { Navigation, PageTransition } from "@/components/kaishin";
import { TerminalFooter } from "@/components/terminal";
import { getAllProjects, getProjectBySlug, ProjectStatus } from "@/lib/portfolio";
import { getGitHubReadmeAsHtml } from "@/lib/github";

// Generate static params for all projects
export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | oceanheart.ai",
    };
  }

  return {
    title: `${project.title} | Portfolio | oceanheart.ai`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.image ? [project.image] : undefined,
    },
  };
}

const statusBadgeColors: Record<ProjectStatus, string> = {
  production: "border-terminal-green/30 text-terminal-green bg-terminal-green/10",
  prototype: "border-terminal-blue/30 text-terminal-blue bg-terminal-blue/10",
  experiment: "border-terminal-purple/30 text-terminal-purple bg-terminal-purple/10",
  archived: "border-white/10 text-terminal-muted bg-white/5",
};

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Fetch README content if available
  let readmeContent: { html: string; exists: boolean; error?: string } = {
    html: "",
    exists: false
  };
  if (project.githubRepo) {
    readmeContent = await getGitHubReadmeAsHtml(
      project.githubRepo,
      project.githubBranch || "main"
    );
  }

  const status = project.status || "prototype";

  return (
    <PageTransition>
      <main className="relative bg-terminal-bg antialiased min-h-screen">
        <Navigation />

        {/* Back navigation */}
        <div className="max-w-5xl mx-auto px-6 pt-28 pb-4">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 font-terminal text-sm text-terminal-muted hover:text-terminal-cyan transition-colors"
          >
            <IconArrowLeft className="w-4 h-4" />
            <span>
              <span className="text-terminal-green">$</span> cd ../portfolio
            </span>
          </Link>
        </div>

        {/* Hero section with project image */}
        <section className="relative">
          {project.image && (
            <div className="max-w-5xl mx-auto px-6">
              <div className="relative h-64 sm:h-80 md:h-96 rounded-sm overflow-hidden border border-white/10">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-terminal-bg via-terminal-bg/50 to-transparent" />

                {/* Status and building badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`font-terminal text-xs px-3 py-1.5 border rounded-sm backdrop-blur-sm ${statusBadgeColors[status]}`}>
                    [{status}]
                  </span>
                  {project.currentlyBuilding && (
                    <span className="font-terminal text-xs px-3 py-1.5 bg-terminal-orange/20 border border-terminal-orange/30 text-terminal-orange rounded-sm backdrop-blur-sm flex items-center gap-2">
                      <span className="w-2 h-2 bg-terminal-orange rounded-full animate-pulse" />
                      building...
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Main content */}
        <section className="max-w-5xl mx-auto px-6 py-8">
          {/* Terminal command header */}
          <div className="font-terminal text-terminal-muted text-sm mb-4">
            <span className="text-terminal-green">$</span> cat ./projects/{project.title.toLowerCase().replace(/\s+/g, '-')}/README.md
          </div>

          {/* Project header */}
          <header className="mb-8">
            <h1 className="font-terminal text-3xl sm:text-4xl text-terminal mb-4">
              {project.title}
            </h1>
            <p className="font-terminal text-lg text-terminal-secondary leading-relaxed max-w-3xl">
              {project.description}
            </p>
          </header>

          {/* Quick actions */}
          <div className="flex flex-wrap gap-3 mb-8">
            {project.externalUrl && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 font-terminal text-sm bg-terminal-cyan/10 border border-terminal-cyan/30 text-terminal-cyan hover:bg-terminal-cyan/20 hover:shadow-[0_0_20px_rgba(125,207,255,0.2)] transition-all rounded-sm"
              >
                <IconExternalLink className="w-4 h-4" />
                <span>View Live Site</span>
              </a>
            )}
            {project.githubRepo && (
              <a
                href={`https://github.com/${project.githubRepo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 font-terminal text-sm bg-transparent border border-white/20 text-terminal-secondary hover:border-white/40 hover:text-terminal transition-all rounded-sm"
              >
                <IconBrandGithub className="w-4 h-4" />
                <span>View Source</span>
              </a>
            )}
          </div>

          {/* Problem/Solution */}
          {(project.problem || project.solution) && (
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {project.problem && (
                <div className="p-5 bg-terminal-bg-secondary border border-white/5 rounded-sm">
                  <span className="font-terminal text-xs text-terminal-red block mb-2">## Problem</span>
                  <p className="font-terminal text-terminal-muted text-sm leading-relaxed">{project.problem}</p>
                </div>
              )}
              {project.solution && (
                <div className="p-5 bg-terminal-bg-secondary border border-white/5 rounded-sm">
                  <span className="font-terminal text-xs text-terminal-green block mb-2">## Solution</span>
                  <p className="font-terminal text-terminal-muted text-sm leading-relaxed">{project.solution}</p>
                </div>
              )}
            </div>
          )}

          {/* Impact */}
          {project.impact && (
            <div className="mb-8 p-5 bg-terminal-cyan/5 border border-terminal-cyan/20 rounded-sm">
              <span className="font-terminal text-xs text-terminal-cyan block mb-2">## Impact</span>
              <p className="text-terminal-cyan font-terminal">{project.impact}</p>
            </div>
          )}

          {/* Tech Stack */}
          <div className="mb-8">
            <span className="font-terminal text-xs text-terminal-muted block mb-3">## Stack</span>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="font-terminal text-sm px-3 py-1.5 bg-terminal-bg-tertiary text-terminal-secondary border border-white/10 rounded-sm hover:border-terminal-cyan/30 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* README Content */}
          {readmeContent.exists && readmeContent.html && (
            <div className="mt-12 border-t border-white/10 pt-8">
              <div className="font-terminal text-terminal-muted text-sm mb-6">
                <span className="text-terminal-green">$</span> # Fetched from github.com/{project.githubRepo}
              </div>

              <div
                className="terminal-prose prose prose-invert max-w-none font-terminal
                  prose-headings:font-terminal prose-headings:text-terminal prose-headings:font-normal prose-headings:border-b prose-headings:border-white/10 prose-headings:pb-2 prose-headings:mb-4
                  prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
                  prose-p:font-terminal prose-p:text-terminal-secondary prose-p:leading-relaxed
                  prose-a:text-terminal-cyan prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-terminal prose-strong:font-medium
                  prose-code:text-terminal-purple prose-code:bg-terminal-bg-tertiary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-terminal-bg-secondary prose-pre:border prose-pre:border-white/10 prose-pre:rounded-sm
                  prose-ul:font-terminal prose-ul:text-terminal-secondary prose-ol:font-terminal prose-ol:text-terminal-secondary
                  prose-li:font-terminal prose-li:marker:text-terminal-muted
                  prose-blockquote:font-terminal prose-blockquote:border-terminal-cyan prose-blockquote:text-terminal-muted prose-blockquote:bg-terminal-bg-secondary prose-blockquote:py-1 prose-blockquote:rounded-r-sm
                  prose-table:text-sm prose-th:text-terminal prose-th:font-terminal prose-td:font-terminal prose-td:text-terminal-secondary
                  prose-hr:border-white/10
                  prose-img:rounded-sm prose-img:border prose-img:border-white/10
                "
                dangerouslySetInnerHTML={{ __html: readmeContent.html }}
              />
            </div>
          )}

          {/* No README fallback */}
          {!readmeContent.exists && project.githubRepo && (
            <div className="mt-12 border-t border-white/10 pt-8">
              <div className="p-6 bg-terminal-bg-secondary border border-white/10 rounded-sm text-center">
                <p className="font-terminal text-terminal-muted text-sm mb-4">
                  <span className="text-terminal-red">error:</span> README.md not found in repository
                </p>
                <a
                  href={`https://github.com/${project.githubRepo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-terminal text-sm text-terminal-cyan hover:text-terminal-blue transition-colors"
                >
                  <IconBrandGithub className="w-4 h-4" />
                  <span>View repository on GitHub</span>
                </a>
              </div>
            </div>
          )}
        </section>

        {/* Related projects could go here in the future */}

        <TerminalFooter />
      </main>
    </PageTransition>
  );
}
