import Image from "next/image";
import Link from "next/link";

type FeaturedProject = {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  externalUrl?: string;
  sectionId: string;
  slug: string;
};

interface FeaturedGridProps {
  projects: FeaturedProject[];
}

export default function FeaturedGrid({ projects }: FeaturedGridProps) {
  // Use projects for the adaptive height grid layout
  const items = projects;

  return (
    <section className="px-4 sm:px-8 max-w-7xl mx-auto mb-20 space-y-16">
      <div className="text-center mb-10">
        <h2 className="font-extrabold text-3xl md:text-4xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Featured Work
        </h2>
        <p className="text-base-content/80 max-w-3xl mx-auto mt-3">
          Flagship pieces demonstrating impact, design, and technical depth.
        </p>
      </div>

      {/* Adaptive Height Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((p, i) => (
          <div
            key={`adaptive-${p.sectionId}-${p.id}-${i}`}
            className="group bg-base-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col"
          >
            {/* Large Image Size to show more content */}
            <div className="relative h-72 overflow-hidden">
              <Image
                src={p.image}
                alt={p.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Adaptive Content Area */}
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex-1 space-y-4">
                <h3 className="font-bold text-lg text-base-content group-hover:text-primary transition-colors duration-300">
                  {p.title}
                </h3>

                {/* Full description - card height adapts */}
                <div className="text-base-content/80 leading-relaxed text-sm">
                  {p.description}
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {p.tech.slice(0, 4).map((tech, techIndex) => (
                    <span
                      key={`${tech}-adaptive-${i}-${techIndex}`}
                      className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button - Always at bottom */}
              <div className="pt-4 mt-auto">
                <Link
                  href={p.externalUrl || `/portfolio/${p.slug}`}
                  target={p.externalUrl ? "_blank" : undefined}
                  rel={p.externalUrl ? "noopener noreferrer" : undefined}
                  className="w-full btn btn-outline btn-sm group-hover:btn-primary transition-all duration-300"
                >
                  <span className="group-hover:scale-110 transition-transform duration-300">View Project</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
