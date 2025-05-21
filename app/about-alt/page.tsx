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
              About Kai: Your Guide in the Age of AI
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
            <p className="text-lg md:text-xl opacity-90 mb-6 leading-relaxed">
              Navigate the AI revolution with clarity, purpose, and a human-centered approach.
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
                Let&apos;s be honest. The world of Artificial Intelligence is exhilarating, but it&apos;s also overwhelming. It feels like a relentless online scramble, with new tools, &apos;latest things,&apos; and complex jargon appearing daily. Technology is changing at a pace that can make even the developments from three months ago seem outdated. From prompt engineering to the rise of autonomous agents and new protocols, it&apos;s a whirlwind.
              </p>
              <p className="text-lg leading-relaxed">
                Many people are using these advancements successfully, but it&apos;s easy to wonder: Will Big Tech swallow everything? And more importantly, where does this leave you? How do you keep up, make sense of it all, and find your place without sacrificing your human values or well-being? You might even be weighing up whether focusing on this is more valuable than just getting a coding job for stable income. These are the very real questions I&apos;m here to help you explore.
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
                For 15 years, I sat with human stories as a psychotherapist. Then, as a software engineer, I built with data. But it was my 20 years in contemplative practice that showed me the common thread: consciousness. Now, I fuse these worlds, guiding professionals like you to integrate AI not just as a tool, but as an extension of mindful, human-centered work.
              </p>
              <p className="text-lg leading-relaxed">
                My journey has shown me that true mastery of AI isn&apos;t just about understanding the technology; it&apos;s about understanding ourselves in relation to it. It&apos;s about fostering psychological resilience, developing critical thinking, and learning how to integrate these powerful tools in ways that enhance our lives and work, rather than diminish them.
              </p>
              <p className="text-lg leading-relaxed">
                I believe the &apos;mad scramble&apos; often misses the most important element: the human being at the center. That&apos;s why I&apos;ve chosen to coach. I want to be your navigator through the hype, your curator of what truly matters, and your partner in building a confident, human-first relationship with AI.
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
              <h3 className="font-bold text-xl mb-4">Demystifying AI</h3>
              <p className="leading-relaxed">
                I break down complex AI concepts, tools (like prompt engineering, agents, APIs), and trends into understandable language. No more feeling lost in the jargon.
              </p>
            </div>
            <div className="bg-base-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow hover:scale-[1.01] duration-300">
              <div className="h-2 w-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
              <h3 className="font-bold text-xl mb-4">Personalized Roadmaps</h3>
              <p className="leading-relaxed">
                We&apos;ll explore how AI can specifically benefit your goals, your career, or your business. This isn&apos;t a one-size-fits-all approach.
              </p>
            </div>
            <div className="bg-base-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow hover:scale-[1.01] duration-300">
              <div className="h-2 w-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
              <h3 className="font-bold text-xl mb-4">Developing Core AI Literacies</h3>
              <p className="leading-relaxed">
                Tools change, but principles don&apos;t. We&apos;ll work on skills like effective prompting, critical evaluation of AI outputs, and understanding AI ethics – skills that endure.
              </p>
            </div>
            <div className="bg-base-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow hover:scale-[1.01] duration-300">
              <div className="h-2 w-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
              <h3 className="font-bold text-xl mb-4">Building Adaptive Mindsets</h3>
              <p className="leading-relaxed">
                The pace of change requires psychological flexibility. I&apos;ll draw on my psychological experience to help you build resilience, manage overwhelm, and cultivate a growth mindset towards AI.
              </p>
            </div>
            <div className="bg-base-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow hover:scale-[1.01] duration-300">
              <div className="h-2 w-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
              <h3 className="font-bold text-xl mb-4">Human-AI Collaboration</h3>
              <p className="leading-relaxed">
                Learn how to make AI your co-pilot, augmenting your unique human skills rather than feeling threatened by automation.
              </p>
            </div>
            <div className="bg-base-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow hover:scale-[1.01] duration-300">
              <div className="h-2 w-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
              <h3 className="font-bold text-xl mb-4">Ethical &amp; Responsible Integration</h3>
              <p className="leading-relaxed">
                We&apos;ll discuss how to use AI thoughtfully and responsibly, aligning its power with your values.
              </p>
            </div>
          </div>
          <div className="mt-10 bg-black/5 p-6 rounded-xl text-center">
            <p className="text-lg italic">
              I act as your thinking partner, your learning guide, and your strategic advisor in this rapidly evolving space. Think of me as the person who helps you filter the noise, connect the dots, and find your confident footing.
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
                This coaching is for you if:
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0 mt-1"></div>
                  <p className="leading-relaxed">You&apos;re a professional, entrepreneur, creative, or lifelong learner feeling overwhelmed by the speed of AI development.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0 mt-1"></div>
                  <p className="leading-relaxed">You want to understand AI beyond the surface level and learn how to leverage it effectively.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0 mt-1"></div>
                  <p className="leading-relaxed">You&apos;re looking for guidance that values human insight and ethical considerations, not just technical specs.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0 mt-1"></div>
                  <p className="leading-relaxed">You believe that your unique human skills (creativity, empathy, critical thinking) are your greatest assets and want to learn how AI can amplify them.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0 mt-1"></div>
                  <p className="leading-relaxed">You&apos;re ready to move from confusion and anxiety to clarity and purposeful action in the age of AI.</p>
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
              The AI revolution doesn&apos;t have to be something that happens to you. It can be something you actively and confidently participate in.
            </p>
            <p className="text-lg leading-relaxed mb-8">
              If you&apos;re ready to stop feeling overwhelmed and start navigating the AI landscape with clarity and a human-first approach, I invite you to a free, no-obligation 20-minute Clarity Call.
            </p>

            <div className="bg-black/20 p-6 rounded-xl mb-8">
              <h3 className="font-bold text-xl mb-4 text-center">During this call, we can:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0 mt-1"></div>
                  <p>Discuss your specific challenges and goals related to AI.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0 mt-1"></div>
                  <p>Explore how my coaching approach can support you.</p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0 mt-1"></div>
                  <p>You can ask any questions you have.</p>
                </li>
              </ul>
              <p className="text-center mt-4 italic">There&apos;s no pressure. It&apos;s simply an opportunity for us to connect and see if we&apos;re a good fit to work together.</p>
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
              I look forward to helping you find your power and purpose in this new era.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
} 