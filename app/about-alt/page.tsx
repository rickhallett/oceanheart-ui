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
              About Kai: Navigating the <span className="">Age of AI</span>
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
            <p className="text-lg md:text-xl opacity-90 mb-6 leading-relaxed">
              Clarity, purpose, and a human-centered approach to a fast-moving technology.
            </p>
          </div>
          <div className="md:w-3/5 order-1 md:order-2">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-2xl blur opacity-20"></div>
              <Image
                src="/images/greece_profile2.jpeg"
                alt="Profile picture of Kai"
                width={700}
                height={700}
                className="rounded-2xl mx-auto relative shadow-lg hover:scale-[1.01] transition-transform duration-300"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="py-16 px-4 sm:px-8 bg-base-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 sticky top-24">
            <h2 className="font-bold text-3xl md:text-4xl mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              The Challenge
            </h2>
            <div className="h-1 w-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
          </div>
          <div className="md:w-2/3 space-y-6">
            <p className="text-lg leading-relaxed">
              AI is exciting—and overwhelming. New tools and jargon appear every week, making recent breakthroughs feel old overnight.
              It’s easy to wonder whether Big Tech will dominate and where that leaves you. How do you stay informed, choose what matters,
              and keep your values intact?
            </p>
          </div>
        </div>
      </section>

      {/* My Why */}
      <section className="py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row-reverse gap-8">
          <div className="md:w-1/3 sticky top-24">
            <h2 className="font-bold text-3xl md:text-4xl mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              My Why
            </h2>
            <div className="h-1 w-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
          </div>
          <div className="md:w-2/3 space-y-6">
            <p className="text-lg leading-relaxed">
              I’ve spent 15 years as a psychotherapist, years as a software engineer, and two decades in contemplative practice.
              The common thread is consciousness. I now help people integrate AI not just as a tool but as a mindful extension of
              their work and life—building resilience, critical thinking, and ethical awareness.
            </p>
          </div>
        </div>
      </section>

      {/* How I Help */}
      <section className="py-16 px-4 sm:px-8 bg-base-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-bold text-3xl md:text-4xl mb-10 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            How I Help
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              ["Demystify AI", "Clear explanations of tools, concepts, and trends."],
              ["Personal Roadmaps", "Guidance tailored to your career or business."],
              ["Core Skills", "Prompting, critical evaluation, and AI ethics."],
              ["Adaptive Mindset", "Psychological flexibility and growth."],
              ["Human–AI Collaboration", "Use AI to amplify, not replace, human strengths."],
              ["Ethical Integration", "Align technology with your values."]
            ].map(([title, body]) => (
              <div key={title} className="bg-base-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow hover:scale-[1.01] duration-300">
                <div className="h-2 w-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
                <h3 className="font-bold text-xl mb-4">{title}</h3>
                <p className="leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-black/5 p-6 rounded-xl text-center">
            <p className="text-lg italic">
              I act as your thinking partner and strategic guide—filtering noise, connecting dots, and helping you move forward with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-2/5">
            <h2 className="font-bold text-3xl md:text-4xl mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Who It’s For
            </h2>
            <div className="h-1 w-16 bg-gradient-to-r from-primary to-secondary rounded-full mb-6"></div>
            <div className="relative mt-10 hidden md:block">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-20 rotate-12"></div>
              <Image
                src="/images/kai_profile.jpeg"
                alt="Profile picture of Kai"
                width={400}
                height={400}
                className="rounded-full mx-auto relative shadow-lg hover:scale-[1.02] transition-transform duration-300 rotate-12"
              />
            </div>
          </div>
          <div className="md:w-3/5 space-y-4">
            {[
              "Professionals, entrepreneurs, creatives, or lifelong learners feeling overloaded by the pace of AI.",
              "Anyone wanting to understand AI beyond buzzwords and use it effectively.",
              "People who value human insight and ethical use, not just technical specs.",
              "Those who see creativity, empathy, and critical thinking as core strengths.",
              "Anyone ready to turn confusion into clarity and purposeful action."
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-gradient-to-r from-primary to-secondary flex-shrink-0 mt-1"></div>
                <p className="leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Invitation */}
      <section className="py-20 px-4 sm:px-8 bg-gradient-to-r from-neutral to-neutral-focus text-neutral-content">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-bold text-3xl md:text-4xl mb-4">Your Invitation</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6"></div>
          <p className="text-lg md:text-xl leading-relaxed mb-6">
            The AI revolution doesn’t have to happen to you. It can be something you join with confidence and purpose.
          </p>
          <p className="text-lg leading-relaxed mb-8">
            Book a free 20-minute clarity call to discuss your goals, explore my approach, and ask questions—no pressure, just a conversation.
          </p>
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
        </div>
      </section>
    </main>
  );
}
