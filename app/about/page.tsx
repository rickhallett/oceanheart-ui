import Image from "next/image";
import config from "@/config";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="bg-base-100">
      {/* Intro Section */}
      <section className="pt-20 px-4 sm:px-8 max-w-7xl mx-auto text-center">
        <h1 className="font-extrabold text-4xl md:text-6xl tracking-tight mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-gradient">
          About Kai: Your Guide in the <span className="italic">Age of AI</span>
        </h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg md:text-xl opacity-90 mx-auto mb-8 leading-relaxed text-left">
            Let's be honest. The world of <span className="font-semibold text-primary">Artificial Intelligence</span> is exhilarating, but it's also overwhelming. It feels like a relentless online scramble, with new tools, 'latest things,' and complex jargon appearing daily. <span className="italic">Technology</span> is changing at a pace that can make even the developments from three months ago seem outdated.
          </p>
          <p className="text-lg md:text-xl opacity-90 mx-auto mb-8 leading-relaxed text-left">
            Many people are using these advancements successfully, but it's easy to wonder: Will <span className="font-semibold">Big Tech</span> swallow everything? And more importantly, where does this leave <span className="italic">you</span>? How do you keep up, make sense of it all, and find your place without sacrificing your <span className="font-semibold text-secondary">human values</span> or well-being?
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
              alt="Profile picture of Kai - Human-Centred Transformation Specialist"
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
              For 15 years, I sat with <span className="italic">human stories</span> as a <span className="font-semibold text-primary">psychotherapist</span>. Then, as a <span className="font-semibold text-primary">software engineer</span>, I built with data. But it was my 20 years in <span className="font-semibold text-secondary">contemplative practice</span> that showed me the common thread: <span className="font-semibold text-secondary italic">consciousness</span>. Now, I fuse these worlds, guiding professionals like you to integrate AI not just as a tool, but as an extension of <span className="italic">mindful, human-centered work</span>.
            </p>
          </article>
          <article className="bg-base-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h2 className="font-bold text-2xl md:text-3xl mb-4 border-b border-primary/20 pb-2">The Crossover Skillset</h2>
            <ul className="text-base md:text-lg leading-relaxed list-disc pl-5 space-y-4">
              <li><span className="font-bold text-primary">Psychotherapist:</span> Deep understanding of <span className="italic">human experience</span>, resistance, and the relational aspects of learning.</li>
              <li><span className="font-bold text-primary">Software Engineer:</span> Practical, first-principles grasp of <span className="italic">AI technology</span>, demystifying the complex.</li>
              <li><span className="font-bold text-secondary">Contemplative Practitioner:</span> Grounded in <span className="italic">ethical awareness</span>, fostering presence and <span className="font-semibold">conscious choice</span> amidst rapid change.</li>
            </ul>
            <p className="text-base md:text-lg leading-relaxed mt-4">
              This blend allows me to translate AI's power into <span className="italic">your language</span>, for your specific needs, ensuring technology serves your <span className="font-semibold text-secondary">humanity</span>.
            </p>
          </article>
          <article className="bg-base-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h2 className="font-bold text-2xl md:text-3xl mb-4 border-b border-primary/20 pb-2">Philosophy Statement</h2>
            <p className="text-base md:text-lg leading-relaxed">
              True <span className="font-semibold text-primary">AI mastery</span> isn't just about clever prompts. It's about weaving your unique <span className="font-semibold">Story</span> (experience) with timeless <span className="font-semibold text-secondary">Spirit</span> (values) and clear <span className="font-semibold text-primary">Science</span> (understanding). My "<span className="italic">Art of Personal AI</span>" framework helps you amplify your intelligence and sensitivity by <span className="font-semibold text-secondary">consciously engaging</span> with AI's context, models, and your own evolving <span className="italic font-semibold text-secondary">consciousness</span>.
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
          <h2 className="font-bold text-3xl md:text-4xl mb-6">Ready to <span className="text-primary italic">integrate consciously</span>?</h2>
          <p className="mb-8 text-lg md:text-xl leading-relaxed">
            The <span className="font-semibold">AI revolution</span> doesn't have to be something that happens <span className="italic">to you</span>. It can be something you <span className="font-semibold text-primary">actively</span> and <span className="font-semibold text-secondary">confidently</span> participate in. Let's talk about how you can move from overwhelm to <span className="italic font-semibold text-secondary">clarity</span>.
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
