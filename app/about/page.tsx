import Image from "next/image";
import config from "@/config";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="bg-base-100">
      {/* Intro Section */}
      <section className="pt-20 px-4 sm:px-8 max-w-7xl mx-auto text-center">
        <h1 className="font-extrabold text-4xl md:text-6xl tracking-tight mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-gradient">
          About Kai: Your Guide in the Age of AI
        </h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg md:text-xl opacity-90 mx-auto mb-8 leading-relaxed text-left">
            Let's be honest. The world of Artificial Intelligence is exhilarating, but it's also overwhelming. It feels like a relentless online scramble, with new tools, 'latest things,' and complex jargon appearing daily. Technology is changing at a pace that can make even the developments from three months ago seem outdated.
          </p>
          <p className="text-lg md:text-xl opacity-90 mx-auto mb-8 leading-relaxed text-left">
            Many people are using these advancements successfully, but it's easy to wonder: Will Big Tech swallow everything? And more importantly, where does this leave you? How do you keep up, make sense of it all, and find your place without sacrificing your human values or well-being?
          </p>
        </div>
      </section>

      {/* Profile & Story Section */}
      <section className="flex flex-col md:flex-row items-center gap-12 max-w-7xl mx-auto px-4 sm:px-8 py-20">
        <div className="md:w-2/5">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-30"></div>
            <Image
              src="/images/kai_profile.jpeg"
              alt="Profile picture of Kai - Conscious AI Integration Specialist"
              width={600}
              height={600}
              className="rounded-full mx-auto relative shadow-lg hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </div>
        <div className="md:w-3/5 space-y-10 mt-10 md:mt-0">
          <article className="bg-base-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h2 className="font-bold text-2xl md:text-3xl mb-4 border-b border-primary/20 pb-2">My Origin Story</h2>
            <p className="text-base md:text-lg leading-relaxed">
              For 15 years, I sat with human stories as a psychotherapist. Then, as a software engineer, I built with data. But it was my 20 years in contemplative practice that showed me the common thread: consciousness. Now, I fuse these worlds, guiding professionals like you to integrate AI not just as a tool, but as an extension of mindful, human-centered work.
            </p>
          </article>
          <article className="bg-base-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h2 className="font-bold text-2xl md:text-3xl mb-4 border-b border-primary/20 pb-2">The Crossover Skillset</h2>
            <ul className="text-base md:text-lg leading-relaxed list-disc pl-5 space-y-4">
              <li><span className="font-bold">Psychotherapist:</span> Deep understanding of human experience, resistance, and the relational aspects of learning.</li>
              <li><span className="font-bold">Software Engineer:</span> Practical, first-principles grasp of AI technology, demystifying the complex.</li>
              <li><span className="font-bold">Contemplative Practitioner:</span> Grounded in ethical awareness, fostering presence and conscious choice amidst rapid change.</li>
            </ul>
            <p className="text-base md:text-lg leading-relaxed mt-4">
              This blend allows me to translate AI's power into your language, for your specific needs, ensuring technology serves your humanity.
            </p>
          </article>
          <article className="bg-base-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h2 className="font-bold text-2xl md:text-3xl mb-4 border-b border-primary/20 pb-2">Philosophy Statement</h2>
            <p className="text-base md:text-lg leading-relaxed">
              True AI mastery isn't just about clever prompts. It's about weaving your unique Story (experience) with timeless Spirit (values) and clear Science (understanding). My "Art of Personal AI" framework helps you amplify your intelligence and sensitivity by consciously engaging with AI's context, models, and your own evolving consciousness.
            </p>
            <p className="text-base md:text-lg italic mt-4">
              I occasionally find myself explaining complex AI concepts to my cat, who remains unimpressed but a very good listener.
            </p>
          </article>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-gradient-to-r from-neutral to-neutral-focus text-neutral-content py-20 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto text-center p-8 bg-black/20 backdrop-blur-sm rounded-xl">
          <h2 className="font-bold text-3xl md:text-4xl mb-6">Ready to integrate consciously?</h2>
          <p className="mb-8 text-lg md:text-xl leading-relaxed">
            The AI revolution doesn't have to be something that happens to you. It can be something you actively and confidently participate in. Let's talk about how you can move from overwhelm to clarity.
          </p>
          <a
            href="https://calendar.app.google/85ZdaqYK5vfNk4aH9"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-wide btn-lg hover:scale-105 transition-transform"
          >
            Book a Call
          </a>
          <div className="mt-4">
            <Link
              href="/#pricing"
              className="text-blue-200 hover:text-blue-100 underline"
            >
              View All Offerings
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
