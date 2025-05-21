import Image from "next/image";
import Link from "next/link";

export default function AboutAltPage() {
  return (
    <main className="bg-base-100">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-2/5 order-2 md:order-1">
            <h1 className="font-extrabold text-4xl md:text-5xl tracking-tight mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-gradient">
              About Kai: Your Guide in the <span className="italic">Age of AI</span>
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
            <p className="text-lg md:text-xl opacity-90 mb-6 leading-relaxed">
              Navigate the <span className="font-semibold text-primary">AI revolution</span> with <span className="italic">clarity</span>, <span className="italic">purpose</span>, and a <span className="font-semibold text-secondary">human-centered</span> approach.
            </p>
          </div>
          <div className="md:w-3/5 order-1 md:order-2">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-20"></div>
              <Image
                src="/images/greece_profile2.jpeg"
                alt="Profile picture of Kai - Conscious AI Integration Specialist"
                width={700}
                height={700}
                className="rounded-2xl mx-auto relative shadow-lg hover:scale-[1.01] transition-transform duration-300"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: The Challenge We All Face */}
      <section className="py-16 px-4 sm:px-8 bg-base-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="sticky top-24">
                <h2 className="font-bold text-3xl md:text-4xl mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  The Challenge We All Face
                </h2>
                <div className="h-1 w-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
              </div>
            </div>
            <div className="md:w-2/3 space-y-6">
              <p className="text-lg leading-relaxed">
                Let&apos;s be honest. The world of <span className="font-semibold text-primary">Artificial Intelligence</span> is exhilarating, but it&apos;s also overwhelming. It feels like a relentless online scramble, with new tools, &apos;latest things,&apos; and complex jargon appearing daily. <span className="italic">Technology</span> is changing at a pace that can make even the developments from three months ago seem outdated. From <span className="font-semibold">prompt engineering</span> to the rise of <span className="font-semibold text-primary">autonomous agents</span> and new protocols, it&apos;s a whirlwind.
              </p>
              <p className="text-lg leading-relaxed">
                Many people are using these advancements successfully, but it&apos;s easy to wonder: Will <span className="font-semibold">Big Tech</span> swallow everything? And more importantly, where does this leave <span className="italic">you</span>? How do you keep up, make sense of it all, and find your place without sacrificing your <span className="font-semibold text-secondary">human values</span> or well-being? You might even be weighing up whether focusing on this is more valuable than just getting a coding job for stable income. These are the very real questions I&apos;m here to help you explore.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: My "Why" */}
      <section className="py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row-reverse gap-8">
            <div className="md:w-1/3">
              <div className="sticky top-24">
                <h2 className="font-bold text-3xl md:text-4xl mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  My &quot;Why&quot;
                </h2>
                <div className="h-1 w-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
              </div>
            </div>
            <div className="md:w-2/3 space-y-6">
              <p className="text-lg leading-relaxed">
                For 15 years, I sat with <span className="italic">human stories</span> as a <span className="font-semibold text-primary">psychotherapist</span>. Then, as a <span className="font-semibold text-primary">software engineer</span>, I built with data. But it was my 20 years in <span className="font-semibold text-secondary">contemplative practice</span> that showed me the common thread: <span className="italic font-semibold text-secondary">consciousness</span>. Now, I fuse these worlds, guiding professionals like you to integrate AI not just as a tool, but as an extension of <span className="italic">mindful, human-centered work</span>.
              </p>
              <p className="text-lg leading-relaxed">
                My journey has shown me that true mastery of AI isn&apos;t just about understanding the <span className="font-semibold">technology</span>; it&apos;s about understanding <span className="italic">ourselves</span> in relation to it. It&apos;s about fostering <span className="font-semibold text-secondary">psychological resilience</span>, developing <span className="font-semibold">critical thinking</span>, and learning how to integrate these powerful tools in ways that <span className="italic">enhance</span> our lives and work, rather than diminish them.
              </p>
              <p className="text-lg leading-relaxed">
                I believe the &apos;mad scramble&apos; often misses the most important element: the <span className="font-semibold text-secondary">human being</span> at the center. That&apos;s why I&apos;ve chosen to coach. I want to be your navigator through the hype, your curator of what truly matters, and your partner in building a <span className="font-semibold">confident</span>, <span className="italic font-semibold text-secondary">human-first</span> relationship with AI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: What I Do & How I Help */}
      <section className="py-16 px-4 sm:px-8 bg-base-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-bold text-3xl md:text-4xl mb-10 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            What I Do &amp; How I Help
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-base-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow hover:scale-[1.01] duration-300">
              <div className="h-2 w-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
              <h3 className="font-bold text-xl mb-4">Demystifying <span className="text-primary">AI</span></h3>
              <p className="leading-relaxed">
                I break down complex <span className="font-semibold">AI concepts</span>, tools (like <span className="italic">prompt engineering</span>, <span className="italic">agents</span>, <span className="italic">APIs</span>), and trends into understandable language. No more feeling lost in the jargon.
              </p>
            </div>
            <div className="bg-base-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow hover:scale-[1.01] duration-300">
              <div className="h-2 w-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
              <h3 className="font-bold text-xl mb-4"><span className="text-secondary">Personalized</span> Roadmaps</h3>
              <p className="leading-relaxed">
                We&apos;ll explore how AI can specifically benefit <span className="italic">your goals</span>, <span className="italic">your career</span>, or <span className="italic">your business</span>. This isn&apos;t a one-size-fits-all approach.
              </p>
            </div>
            <div className="bg-base-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow hover:scale-[1.01] duration-300">
              <div className="h-2 w-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
              <h3 className="font-bold text-xl mb-4">Developing Core <span className="text-primary">AI Literacies</span></h3>
              <p className="leading-relaxed">
                Tools change, but <span className="font-semibold text-secondary">principles</span> don&apos;t. We&apos;ll work on skills like <span className="italic">effective prompting</span>, <span className="italic">critical evaluation</span> of AI outputs, and understanding <span className="font-semibold">AI ethics</span> – skills that endure.
              </p>
            </div>
            <div className="bg-base-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow hover:scale-[1.01] duration-300">
              <div className="h-2 w-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
              <h3 className="font-bold text-xl mb-4">Building <span className="text-secondary">Adaptive Mindsets</span></h3>
              <p className="leading-relaxed">
                The pace of change requires <span className="font-semibold text-secondary">psychological flexibility</span>. I&apos;ll draw on my psychological experience to help you build <span className="italic">resilience</span>, manage <span className="italic">overwhelm</span>, and cultivate a <span className="font-semibold">growth mindset</span> towards AI.
              </p>
            </div>
            <div className="bg-base-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow hover:scale-[1.01] duration-300">
              <div className="h-2 w-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
              <h3 className="font-bold text-xl mb-4"><span className="text-secondary">Human</span>-<span className="text-primary">AI</span> Collaboration</h3>
              <p className="leading-relaxed">
                Learn how to make AI your <span className="italic">co-pilot</span>, augmenting your <span className="font-semibold text-secondary">unique human skills</span> rather than feeling threatened by automation.
              </p>
            </div>
            <div className="bg-base-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow hover:scale-[1.01] duration-300">
              <div className="h-2 w-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
              <h3 className="font-bold text-xl mb-4"><span className="text-secondary">Ethical</span> &amp; <span className="text-secondary">Responsible</span> Integration</h3>
              <p className="leading-relaxed">
                We&apos;ll discuss how to use AI <span className="italic">thoughtfully</span> and <span className="italic">responsibly</span>, aligning its power with your <span className="font-semibold text-secondary">values</span>.
              </p>
            </div>
          </div>
          <div className="mt-10 bg-black/5 p-6 rounded-xl text-center">
            <p className="text-lg italic">
              I act as your <span className="font-semibold text-primary">thinking partner</span>, your <span className="font-semibold text-secondary">learning guide</span>, and your <span className="font-semibold">strategic advisor</span> in this rapidly evolving space. Think of me as the person who helps you filter the noise, connect the dots, and find your confident footing.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Who Is This For? */}
      <section className="py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-2/5">
              <h2 className="font-bold text-3xl md:text-4xl mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Who Is This For?
              </h2>
              <div className="h-1 w-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
              <div className="relative mt-10 hidden md:block">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-20 rotate-12"></div>
                <Image
                  src="/images/kai_profile.jpeg"
                  alt="Profile picture of Kai - Conscious AI Integration Specialist"
                  width={400}
                  height={400}
                  className="rounded-full mx-auto relative shadow-lg hover:scale-[1.02] transition-transform duration-300 rotate-12"
                />
              </div>
            </div>
            <div className="md:w-3/5 space-y-6">
              <p className="text-lg leading-relaxed">
                This coaching is for <span className="italic">you</span> if:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0 mt-1"></div>
                  <p className="leading-relaxed">You&apos;re a <span className="font-semibold">professional</span>, <span className="font-semibold">entrepreneur</span>, <span className="font-semibold">creative</span>, or <span className="font-semibold">lifelong learner</span> feeling overwhelmed by the speed of AI development.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0 mt-1"></div>
                  <p className="leading-relaxed">You want to <span className="italic">understand</span> AI beyond the surface level and learn how to <span className="font-semibold text-primary">leverage it effectively</span>.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0 mt-1"></div>
                  <p className="leading-relaxed">You&apos;re looking for guidance that values <span className="font-semibold text-secondary">human insight</span> and <span className="font-semibold text-secondary">ethical considerations</span>, not just technical specs.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0 mt-1"></div>
                  <p className="leading-relaxed">You believe that your <span className="italic font-semibold text-secondary">unique human skills</span> (creativity, empathy, critical thinking) are your greatest assets and want to learn how AI can amplify them.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0 mt-1"></div>
                  <p className="leading-relaxed">You&apos;re ready to move from <span className="italic">confusion</span> and <span className="italic">anxiety</span> to <span className="font-semibold text-primary">clarity</span> and <span className="font-semibold text-secondary">purposeful action</span> in the age of AI.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Your Invitation */}
      <section className="py-20 px-4 sm:px-8 bg-gradient-to-r from-neutral to-neutral-focus text-neutral-content">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-bold text-3xl md:text-4xl mb-4">Your Invitation</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6"></div>
          </div>
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8">
            <p className="text-lg md:text-xl leading-relaxed mb-6 text-center">
              The <span className="font-semibold text-primary">AI revolution</span> doesn&apos;t have to be something that happens <span className="italic">to you</span>. It can be something you <span className="font-semibold text-secondary">actively</span> and <span className="font-semibold">confidently</span> participate in.
            </p>
            <p className="text-lg leading-relaxed mb-8">
              If you&apos;re ready to stop feeling overwhelmed and start navigating the AI landscape with <span className="font-semibold text-primary">clarity</span> and a <span className="italic font-semibold text-secondary">human-first approach</span>, I invite you to a free, no-obligation 20-minute <span className="font-semibold">Clarity Call</span>.
            </p>

            <div className="bg-black/20 p-6 rounded-xl mb-8">
              <h3 className="font-bold text-xl mb-4 text-center">During this call, we can:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0 mt-1"></div>
                  <p>Discuss your <span className="italic">specific challenges</span> and <span className="italic">goals</span> related to AI.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0 mt-1"></div>
                  <p>Explore how my <span className="font-semibold text-primary">coaching approach</span> can support you.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0 mt-1"></div>
                  <p>You can ask any questions you have.</p>
                </li>
              </ul>
              <p className="text-center mt-4 italic">
                There&apos;s no pressure. It&apos;s simply an opportunity for us to <span className="font-semibold text-secondary">connect</span> and see if we&apos;re a good fit to work together.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <a
                href="https://calendar.app.google/85ZdaqYK5vfNk4aH9"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg hover:scale-105 transition-transform"
              >
                Schedule Your Free 20-Min Video Call
              </a>
              <Link
                href="/#contact"
                className="btn btn-outline btn-lg hover:scale-105 transition-transform"
              >
                Send Me a Message
              </Link>
            </div>

            <p className="text-center mt-8 text-lg">
              I look forward to helping you find your <span className="font-semibold text-primary">power</span> and <span className="font-semibold text-secondary">purpose</span> in this new era.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
} 