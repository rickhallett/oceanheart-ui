import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";

export default function FeaturesSection() {
  const features = [
    {
      title: "Clinical Foundation",
      description: "Starts with Kai's professional assessment of your patterns, values, and goals using evidence-based therapeutic frameworks.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900"></div>,
      icon: <div className="h-4 w-4 rounded-full bg-blue-500 flex-shrink-0" />,
    },
    {
      title: "Advanced Prompt Engineering",
      description: "Your assessment becomes a sophisticated AI prompt—not just instructions, but a living knowledge graph of who you are.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900"></div>,
      icon: <div className="h-4 w-4 rounded-full bg-purple-500 flex-shrink-0" />,
    },
    {
      title: "Personalized Guidance",
      description: "Every conversation builds on deep understanding of your unique context, helping you uncover unknown unknowns about yourself.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900"></div>,
      icon: <div className="h-4 w-4 rounded-full bg-green-500 flex-shrink-0" />,
    },
    {
      title: "Continuous Evolution",
      description: "Your AI coach learns and adapts, updating its understanding as you grow and change through life's journey.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900"></div>,
      icon: <div className="h-4 w-4 rounded-full bg-orange-500 flex-shrink-0" />,
    },
    {
      title: "Contained & Secure",
      description: "Your personal AI exists only for you. Your own container, with all the depth of understanding you'd expect from years of therapy.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900"></div>,
      icon: <div className="h-4 w-4 rounded-full bg-red-500 flex-shrink-0" />,
    },
    {
      title: "Unprecedented Quality",
      description: "This isn't ChatGPT with a nice interface. It's a professionally engineered system that represents the cutting edge of personalized AI.",
      header: <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900"></div>,
      icon: <div className="h-4 w-4 rounded-full bg-indigo-500 flex-shrink-0" />,
    }
  ];

  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-950">
      <div className="container mx-auto px-6 md:px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
            How Synai Works
          </h2>
          <p className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-4xl mx-auto leading-relaxed">
            A fusion of clinical expertise, advanced AI engineering, and your unique psychological fingerprint
          </p>
        </div>

        {/* Features Bento Grid */}
        <BentoGrid className="max-w-7xl mx-auto">
          {features.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
              className={i === 3 || i === 6 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}