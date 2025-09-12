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
  // Ensure max 3 items and stable order
  const items = projects.slice(0, 3);

  return (
    <section className="px-4 sm:px-8 max-w-7xl mx-auto mb-20">
      <div className="text-center mb-10">
        <h2 className="font-extrabold text-3xl md:text-4xl tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Featured Work
        </h2>
        <p className="text-base-content/80 max-w-3xl mx-auto mt-3">
          Three flagship pieces demonstrating impact, design, and technical depth.
        </p>
      </div>

      {/* Irregular mosaic layout for poppy feel */}
      <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-4 md:gap-6">
        {items.map((p, i) => {
          // Layout: 0 = tall left, 1 = top-right, 2 = bottom-right
          const isTall = i === 0;
          const baseClasses =
            "group relative overflow-hidden rounded-3xl bg-base-200/90 shadow-xl transition-all will-change-transform transform-gpu";
          const ringClasses =
            "before:absolute before:inset-0 before:rounded-3xl before:p-[1px] before:bg-gradient-to-br before:from-primary/40 before:to-secondary/40 before:opacity-0 group-hover:before:opacity-100 before:transition-opacity";

          const card = (
            <article
              key={`${p.sectionId}-${p.id}`}
              className={`${baseClasses} ${ringClasses} hover:shadow-2xl hover:-translate-y-1 hover:rotate-[0.2deg]`}
            >
              <div className={`relative ${isTall ? "h-[520px]" : "h-[250px] md:h-[250px]"}`}>
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover scale-105 group-hover:scale-110 transition-transform duration-500 ease-out"
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
              <div key={`${p.sectionId}-${p.id}-wrap`} className="md:col-span-3 md:row-span-2">
                {card}
              </div>
            );
          }
          if (i === 1) {
            return (
              <div key={`${p.sectionId}-${p.id}-wrap`} className="md:col-span-3 md:row-span-1">
                {card}
              </div>
            );
          }
          return (
            <div key={`${p.sectionId}-${p.id}-wrap`} className="md:col-span-3 md:row-span-1">
              {card}
            </div>
          );
        })}
      </div>
    </section>
  );
}
