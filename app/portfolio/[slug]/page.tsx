import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug } from "@/libs/portfolio";

type Props = { params: { slug: string } }

export default function PortfolioDetailPage({ params }: Props) {
  const project = getProjectBySlug(params.slug)

  if (!project) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Project not found</h1>
        <p className="mb-8">The project you’re looking for doesn’t exist.</p>
        <Link href="/portfolio" className="btn btn-primary">Back to Portfolio</Link>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <Link href="/portfolio" className="btn btn-ghost mb-6">← Back to Portfolio</Link>
      <h1 className="text-4xl font-extrabold mb-4">{project.title}</h1>
      <p className="text-base-content/80 mb-8 leading-relaxed">{project.description}</p>

      <div className="relative w-full h-64 mb-8 rounded-xl overflow-hidden">
        <Image src={project.image} alt={project.title} fill className="object-cover" />
      </div>

      <h2 className="text-2xl font-bold mb-3">Tech Stack</h2>
      <div className="flex flex-wrap gap-2 mb-10">
        {project.tech.map((t) => (
          <span key={t} className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20">
            {t}
          </span>
        ))}
      </div>

      <div className="alert alert-info">
        <div>
          <span>
            This is a concise detail view. If you want richer content, we can expand this page per project (images, metrics, links).
          </span>
        </div>
      </div>
    </main>
  )
}

