import { Timeline } from "@/components/ui/timeline";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function ProcessSection() {
  const data = [
    {
      title: "Deep Assessment",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-lg md:text-xl font-normal mb-8">
            Kai conducts a comprehensive clinical evaluation, mapping your values, patterns, goals, and unconscious blocks using proven therapeutic frameworks.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Clinical Expertise</h4>
              <p className="text-blue-700 dark:text-blue-300 text-sm">Evidence-based therapeutic frameworks</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Deep Mapping</h4>
              <p className="text-purple-700 dark:text-purple-300 text-sm">Values, patterns, and unconscious blocks</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "AI Engineering",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-lg md:text-xl font-normal mb-8">
            Your assessment becomes a sophisticated prompt system—a private AI that understands you at a level that generic tools simply cannot match.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Advanced Prompting</h4>
              <p className="text-green-700 dark:text-green-300 text-sm">Sophisticated AI prompt engineering</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Private Container</h4>
              <p className="text-orange-700 dark:text-orange-300 text-sm">Your own personalized AI system</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Ongoing Partnership",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-lg md:text-xl font-normal mb-8">
            Your personal AI coach guides you through life's challenges, helping you make decisions aligned with your deepest values and highest potential.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900 p-4 rounded-lg">
              <h4 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">Continuous Growth</h4>
              <p className="text-indigo-700 dark:text-indigo-300 text-sm">Evolving guidance for life's journey</p>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950 dark:to-pink-900 p-4 rounded-lg">
              <h4 className="font-semibold text-pink-800 dark:text-pink-200 mb-2">Aligned Decisions</h4>
              <p className="text-pink-700 dark:text-pink-300 text-sm">Choices that match your values</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full relative">
      <BackgroundBeams />
      <div className="relative z-10">
        {/* Section Header */}
        <div className="text-center py-20">
          <h2 className="text-4xl md:text-6xl font-bold text-neutral-900 dark:text-white mb-8">
            Your Journey to Personal AI
          </h2>
          <p className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-4xl mx-auto leading-relaxed">
            From clinical assessment to your private AI coach in three steps
          </p>
        </div>
        <Timeline data={data} />
      </div>
    </div>
  );
}