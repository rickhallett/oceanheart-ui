import Image from "next/image";
import config from "@/config";
import { WhyOceanheartVideo } from "@/components/WhyOceanheartVideo";

export default function AboutPage() {
  return (
    <main className="bg-base-100">
      {/* Intro Section */}
      <section className="pt-20 px-4 sm:px-8 max-w-7xl mx-auto text-center">
        <h1 className="font-extrabold text-4xl md:text-6xl tracking-tight mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-gradient">
          Why Oceanheart?
        </h1>
        <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8 leading-relaxed">
          Welcome! I'm <a className="font-medium text-primary hover:text-primary-focus transition-colors" href="https://www.linkedin.com/in/richardhallett86/" target="_blank" rel="noopener noreferrer">Richard (Kai)</a>, the founder behind {config.appName}. I am passionate about leveraging technology to empower everybody working in the wellbeing space.
        </p>
        <div className="flex flex-col md:flex-row gap-6 p-4 justify-center items-center">
          <div className="hidden lg:block shadow-xl rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
            <WhyOceanheartVideo width={560 * 1.5} height={315 * 1.5} />
          </div>
          <div className="hidden md:block lg:hidden shadow-xl rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
            <WhyOceanheartVideo width={560} height={315} />
          </div>
          <div className="block md:hidden shadow-xl rounded-lg overflow-hidden">
            <WhyOceanheartVideo width={560 / 1.6} height={315 / 1.6} />
          </div>
        </div>
      </section>

      {/* Profile & Story Section */}
      <section className="flex flex-col md:flex-row items-center gap-12 max-w-7xl mx-auto px-4 sm:px-8 py-20">
        <div className="md:w-2/5">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-30"></div>
            <Image
              src="/images/about_me_profile_2.jpeg"
              alt="Profile picture of Richard (Kai)"
              width={400}
              height={400}
              className="rounded-full mx-auto relative shadow-lg hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </div>
        <div className="md:w-3/5 space-y-10 mt-10 md:mt-0">
          <article className="bg-base-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h2 className="font-bold text-2xl md:text-3xl mb-4 border-b border-primary/20 pb-2">My Journey</h2>
            <p className="text-base md:text-lg leading-relaxed">
              I'm a psychologist and software engineer with a passion for building tools that help people. I've always been interested in the intersection of technology and psychology, and I'm excited to see how AI can transform the way we approach mental health.
            </p>
            <p className="text-base md:text-lg leading-relaxed mt-4">
              Find out more about me <a className="font-medium text-primary hover:text-primary-focus transition-colors" href="https://www.oceanheart.online/about" target="_blank" rel="noopener noreferrer">here</a>.
            </p>
          </article>
          <article className="bg-base-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h2 className="font-bold text-2xl md:text-3xl mb-4 border-b border-primary/20 pb-2">Our Vision</h2>
            <p className="text-base md:text-lg leading-relaxed">
              I've worked in the mental health space for 15 years, so I've seen firsthand the challenges that therapists face.
            </p>
            <p className="text-base md:text-lg leading-relaxed mt-4">
              I've been thoroughly nerding out on AI tools for a while in my own practice - I am continually amazed by what is possible and I want make it easier for both therapists and their clients to experience the difference.
            </p>
          </article>
          <article className="bg-base-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <h2 className="font-bold text-2xl md:text-3xl mb-4 border-b border-primary/20 pb-2">Private Consulting</h2>
            <p className="text-base md:text-lg leading-relaxed">
              I offer <a className="font-medium text-primary hover:text-primary-focus transition-colors" href="mailto:kai@oceanheart.ai" target="_blank" rel="noopener noreferrer">private consulting services</a> to therapists and their teams. Want help with AI tools? Need a custom AI workflow? Good chance I have used it. I've got you covered. Don't waste time reinventing the wheel or figuring things out from the ground up.
            </p>
            <p className="text-base md:text-lg leading-relaxed mt-4">
              I specialise in Acceptance and Commitment Therapy (ACT); if you are looking for something different to CBT, <a className="font-medium text-primary hover:text-primary-focus transition-colors" href="mailto:kai@oceanheart.ai" target="_blank" rel="noopener noreferrer">I'm here to help</a>.
            </p>
          </article>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-gradient-to-r from-neutral to-neutral-focus text-neutral-content py-20 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto text-center p-8 bg-black/20 backdrop-blur-sm rounded-xl">
          <h2 className="font-bold text-3xl md:text-4xl mb-6">Get in Touch</h2>
          <p className="mb-8 text-lg md:text-xl leading-relaxed">
            Have questions or want to collaborate? Reach out via email or follow me on social media.
          </p>
          <a
            href="mailto:kai@oceanheart.ai"
            className="btn btn-primary btn-wide btn-lg hover:scale-105 transition-transform"
          >
            Contact Me
          </a>
        </div>
      </section>
    </main>
  );
}
