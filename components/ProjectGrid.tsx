import Image from "next/image";
import Link from "next/link";

type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  externalUrl?: string;
};

interface ProjectGridProps {
  projects: Project[];
  sectionId: string;
}

export default function ProjectGrid({ projects, sectionId }: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div key={`${sectionId}-${project.id}`} className="group bg-base-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
          <div className="relative h-40">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <h3 className="text-white font-semibold text-lg drop-shadow-sm">{project.title}</h3>
            </div>
          </div>
          <div className="p-4 space-y-3">
            <p className="text-sm text-base-content/80 line-clamp-3">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.slice(0, 3).map((t) => (
                <span key={`${project.id}-${t}`} className="text-[11px] px-2.5 py-1 rounded-full bg-base-300 text-base-content/80">
                  {t}
                </span>
              ))}
            </div>
            <div className="pt-1">
              <Link
                href={project.externalUrl || `/portfolio/${sectionId}-${project.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')}`}
                target={project.externalUrl ? "_blank" : undefined}
                rel={project.externalUrl ? "noopener noreferrer" : undefined}
                className="btn btn-outline btn-sm w-full"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

