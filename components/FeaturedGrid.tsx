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
  // Ensure max 9 items for three different display styles (3 per row)
  const items = projects.slice(0, 9);

  // Split projects into three groups of 3 for different display styles
  const row1Projects = items.slice(0, 3);
  const row2Projects = items.slice(3, 6); 
  const row3Projects = items.slice(6, 9);

  return (
    <section className="px-4 sm:px-8 max-w-7xl mx-auto mb-20 space-y-16">
      <div className="text-center mb-10">
        <h2 className="font-extrabold text-3xl md:text-4xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Featured Work
        </h2>
        <p className="text-base-content/80 max-w-3xl mx-auto mt-3">
          Three flagship pieces demonstrating impact, design, and technical depth.
        </p>
      </div>

      {/* ROW 1: Original irregular mosaic layout with object-cover for better image display */}
      {row1Projects.length > 0 && (
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Mosaic Layout</h3>
          <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-4 md:gap-6">
            {row1Projects.map((p, i) => {
              // Layout: 0 = tall left, 1 = top-right, 2 = bottom-right
              const isTall = i === 0;
              const baseClasses =
                "group relative overflow-hidden rounded-3xl bg-base-200/90 shadow-xl transition-all will-change-transform transform-gpu";
              const ringClasses =
                "before:absolute before:inset-0 before:rounded-3xl before:p-[1px] before:bg-gradient-to-br before:from-primary/40 before:to-secondary/40 before:opacity-0 group-hover:before:opacity-100 before:transition-opacity";

              const card = (
                <article
                  key={`row1-${p.sectionId}-${p.id}`}
                  className={`${baseClasses} ${ringClasses} hover:shadow-2xl hover:-translate-y-1 hover:rotate-[0.2deg]`}
                >
                  <div className={`relative ${isTall ? "h-[520px]" : "h-[200px] md:h-[400px]"}`}>
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover scale-100 group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Glow and gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="pointer-events-none absolute -inset-10 opacity-0 group-hover:opacity-20 blur-2xl bg-gradient-to-r from-primary to-secondary transition-opacity" />

                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-white font-black text-2xl drop-shadow-sm tracking-tight">
                        {p.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-5 md:p-6 flex flex-col gap-4">
                    <p className="text-sm md:text-base text-base-content/80 leading-relaxed">
                      {p.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {p.tech.slice(0, 4).map((t) => (
                        <span
                          key={t}
                          className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary/20 transition-colors"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto">
                      <Link
                        href={p.externalUrl || `/portfolio/${p.slug}`}
                        target={p.externalUrl ? "_blank" : undefined}
                        rel={p.externalUrl ? "noopener noreferrer" : undefined}
                        className="btn btn-primary btn-sm w-full group-hover:scale-[1.02] transition-transform"
                      >
                        {p.externalUrl ? "Open Live App" : "View Case Study"}
                      </Link>
                    </div>
                  </div>
                </article>
              );

              // Responsive placement wrappers
              if (i === 0) {
                return (
                  <div key={`row1-${p.sectionId}-${p.id}-wrap`} className="md:col-span-3 md:row-span-2">
                    {card}
                  </div>
                );
              }
              if (i === 1) {
                return (
                  <div key={`row1-${p.sectionId}-${p.id}-wrap`} className="md:col-span-3 md:row-span-1">
                    {card}
                  </div>
                );
              }
              return (
                <div key={`row1-${p.sectionId}-${p.id}-wrap`} className="md:col-span-3 md:row-span-1">
                  {card}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ROW 2: Carousel with 4 visible cards */}
      {row2Projects.length > 0 && (
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Carousel View</h3>
          <div className="relative overflow-hidden">
            {/* Gradient fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-base-100 via-base-100/50 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-base-100 via-base-100/50 to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {/* Show 4 cards by duplicating to fill if needed */}
              {[...row2Projects, ...row2Projects.slice(0, Math.max(0, 4 - row2Projects.length))].slice(0, 4).map((p, i) => (
                <div
                  key={`row2-${p.sectionId}-${p.id}-${i}`}
                  className="group bg-base-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex-shrink-0 flex flex-col"
                  style={{ width: '280px', height: '480px' }}
                >
                  {/* Project Image */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="280px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Project Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex-1 space-y-3">
                      <h3 className="font-bold text-lg text-base-content group-hover:text-primary transition-colors duration-300">
                        {p.title}
                      </h3>

                      <p className="text-base-content/80 leading-relaxed text-sm">
                        {p.description}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {p.tech.slice(0, 3).map((tech, techIndex) => (
                          <span
                            key={`${tech}-row2-${i}-${techIndex}`}
                            className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-colors duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4">
                      <Link
                        href={p.externalUrl || `/portfolio/${p.slug}`}
                        target={p.externalUrl ? "_blank" : undefined}
                        rel={p.externalUrl ? "noopener noreferrer" : undefined}
                        className="w-full btn btn-outline btn-sm group-hover:btn-primary transition-all duration-300"
                      >
                        <span className="group-hover:scale-110 transition-transform duration-300">View Details</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ROW 3: Hexagonal/Honeycomb Layout */}
      {row3Projects.length > 0 && (
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Honeycomb Layout</h3>
          <div className="flex justify-center">
            <div className="relative max-w-4xl">
              {/* Honeycomb pattern using CSS Grid with hexagonal positioning */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center">
                {row3Projects.map((p, i) => (
                  <div
                    key={`row3-${p.sectionId}-${p.id}`}
                    className={`group relative ${i === 1 ? 'md:col-start-2 md:-mt-16' : ''} ${i === 2 ? 'md:col-start-3 md:-mt-16' : ''}`}
                  >
                    {/* Hexagonal container */}
                    <div className="relative w-64 h-64 mx-auto">
                      {/* Hexagon background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 transform rotate-12 rounded-3xl group-hover:rotate-6 transition-transform duration-500"></div>
                      <div className="absolute inset-2 bg-base-200 rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500">
                        
                        {/* Image section */}
                        <div className="relative h-32 overflow-hidden">
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            sizes="256px"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </div>
                        
                        {/* Content section */}
                        <div className="p-4 h-32 flex flex-col">
                          <h3 className="font-bold text-base text-base-content group-hover:text-primary transition-colors mb-2">
                            {p.title}
                          </h3>
                          <p className="text-xs text-base-content/80 leading-relaxed flex-1 overflow-hidden">
                            {p.description.slice(0, 80)}...
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {p.tech.slice(0, 2).map((tech, techIndex) => (
                              <span
                                key={`${tech}-row3-${i}-${techIndex}`}
                                className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          <Link
                            href={p.externalUrl || `/portfolio/${p.slug}`}
                            target={p.externalUrl ? "_blank" : undefined}
                            rel={p.externalUrl ? "noopener noreferrer" : undefined}
                            className="btn btn-xs btn-outline mt-2 group-hover:btn-primary transition-all duration-300"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
