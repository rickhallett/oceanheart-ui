import { HoverEffect } from "@/components/ui/card-hover-effect";

export default function ComparisonSection() {
  const genericAIFeatures = [
    {
      title: "One-size-fits-all responses",
      description: "Generic advice that doesn't account for your unique situation",
      link: "#"
    },
    {
      title: "Surface-level advice",
      description: "Sounds good but doesn't fit your specific context or needs",
      link: "#"
    },
    {
      title: "No understanding of values",
      description: "Lacks insight into your personal patterns and core beliefs",
      link: "#"
    },
    {
      title: "Starts from zero",
      description: "Every conversation begins without context or memory",
      link: "#"
    },
    {
      title: "Symptom-focused",
      description: "Addresses surface issues rather than root causes",
      link: "#"
    }
  ];

  const synaiFeatures = [
    {
      title: "Evidence-based foundation",
      description: "Built from your professional psychological evaluation",
      link: "#"
    },
    {
      title: "Deep personal knowledge",
      description: "Understands your history, values, and life goals",
      link: "#"
    },
    {
      title: "Tailored guidance",
      description: "Advice specifically designed for your unique patterns",
      link: "#"
    },
    {
      title: "ACT therapy grounded",
      description: "Based on Acceptance & Commitment Therapy principles",
      link: "#"
    },
    {
      title: "Evolves with you",
      description: "Grows and adapts through ongoing dialogue",
      link: "#"
    },
    {
      title: "Root cause focused",
      description: "Addresses unconscious blocks and deeper patterns",
      link: "#"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-950 dark:to-neutral-900">
      <div className="container mx-auto px-6 md:px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
            Generic AI vs. Personal AI
          </h2>
          <p className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-4xl mx-auto leading-relaxed">
            The difference between asking ChatGPT for life advice and having a coach who's studied you for years
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Generic AI Card */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-red-600 dark:text-red-400 mb-8 text-center">
              Generic AI Coaching
            </h3>
            <HoverEffect items={genericAIFeatures} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1" />
          </div>

          {/* Synai Card */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-8 text-center">
              Synai: Your Personal AI
            </h3>
            <HoverEffect items={synaiFeatures} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1" />
          </div>
        </div>
      </div>
    </section>
  );
}