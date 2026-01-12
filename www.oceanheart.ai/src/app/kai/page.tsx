"use client";
import { Navigation, Footer, PageTransition, RevealOnScroll } from "@/components/kaishin";

export default function KaiPage() {
  return (
    <PageTransition>
      <main className="relative bg-black antialiased">
        {/* Bamboo pattern background */}
        <div className="fixed top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none -z-10 bg-[repeating-linear-gradient(90deg,#f9f7fd_0px,#f9f7fd_2px,transparent_2px,transparent_80px)]" />

        <Navigation />

        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center justify-center px-6 sm:px-4 pt-32 pb-20 relative overflow-hidden">
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <span className="absolute -top-20 -right-10 text-8xl md:text-9xl text-zinc-800/30 font-serif-jp">
              改
            </span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-zinc-100 mb-6 leading-tight">
              The Path Is Here.<br />Where Are You?
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 font-light italic leading-relaxed mb-12 max-w-2xl mx-auto">
              An integrated path for those who have exhausted the maps of self-improvement and are ready for the real journey home.
            </p>
            <a
              href="#story"
              className="inline-block px-8 py-3 bg-ocean-blue text-black border border-ocean-blue hover:bg-ocean-blue/90 hover:shadow-[0_0_20px_rgba(79,195,247,0.8)] transition-all duration-300 font-semibold rounded-full"
            >
              Explore the Path
            </a>
          </div>
        </section>

        {/* Story Section */}
        <div id="story" className="pt-20 bg-gradient-to-b from-black to-charcoal/50">
          <RevealOnScroll>
            <div className="text-center mb-20 px-6 sm:px-4">
              <h2 className="text-4xl md:text-5xl font-serif font-light text-zinc-100 mb-6">
                From System Crash to Solid Ground
              </h2>
            </div>
          </RevealOnScroll>

          {/* Story Section 1: The Seeker & The Crash */}
          <section className="py-20 md:py-32 px-6 sm:px-4 bg-charcoal/30">
            <RevealOnScroll>
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-center">
                <div className="[writing-mode:vertical-rl] [text-orientation:mixed] font-serif text-4xl md:text-5xl text-ocean-blue tracking-[0.5em] mx-auto md:mx-0">
                  道
                </div>
                <div>
                  <h3 className="text-3xl md:text-4xl font-serif font-light text-zinc-100 mb-6">
                    The Seeker & The Crash
                  </h3>
                  <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed mb-6">
                    My story isn&apos;t a tidy hero&apos;s journey. It&apos;s the map of a territory I learned by getting lost in it. From a young age, I was a seeker, but my first real test was a crushing depression at sixteen. I patched the system with CBT and willpower, building a functional life on a fragile foundation.
                  </p>
                  <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed">
                    My search for &ldquo;more&rdquo; led to a full-scale system overload: a spiritual emergency so powerful it left me completely destabilized. The hardware of my nervous system couldn&apos;t handle the voltage. It became clear that chasing profound experiences without an equally profound foundation of ground and stability is a dangerous game.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </section>

          {/* Story Section 2: The Search for Ground */}
          <section className="py-20 md:py-32 px-6 sm:px-4 bg-black">
            <RevealOnScroll>
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-12 md:gap-20 items-center">
                <div className="md:order-1">
                  <h3 className="text-3xl md:text-4xl font-serif font-light text-zinc-100 mb-6">
                    The Search for Ground
                  </h3>
                  <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed mb-6">
                    Seeking a safety valve, I swung to the other extreme: hard rationalism. I trained as a psychologist, mastering the logical blueprints of the mind. I thought if I could just understand the machine, I could fix it. And it was useful; it provided a detailed map of my cognitive distortions.
                  </p>
                  <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed">
                    But it was like having a perfect schematic for a life I wasn&apos;t actually living. It described the cage beautifully but offered no real key to the door. It was missing a soul.
                  </p>
                </div>
                <div className="md:order-2 [writing-mode:vertical-rl] [text-orientation:mixed] font-serif text-4xl md:text-5xl text-ocean-blue tracking-[0.5em] mx-auto md:mx-0">
                  知
                </div>
              </div>
            </RevealOnScroll>
          </section>

          {/* Story Section 3: The Integration */}
          <section className="py-20 md:py-32 px-6 sm:px-4 bg-charcoal/30">
            <RevealOnScroll>
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-20 items-center">
                <div className="[writing-mode:vertical-rl] [text-orientation:mixed] font-serif text-4xl md:text-5xl text-ocean-blue tracking-[0.5em] mx-auto md:mx-0">
                  見
                </div>
                <div>
                  <h3 className="text-3xl md:text-4xl font-serif font-light text-zinc-100 mb-6">
                    The Integration
                  </h3>
                  <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed mb-6">
                    The real shift started when I found Zen. It wasn&apos;t another belief system; it was the direct practice of seeing the cartographer. Zen introduced the direct experience of <strong className="font-medium text-zinc-100">non-duality</strong>: the simple seeing that you are not your thoughts, but the silent, aware space in which they appear.
                  </p>
                  <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed">
                    <strong className="font-medium text-zinc-100">But a beautiful view from a mountaintop doesn&apos;t help you navigate the tangled forest below.</strong> For years, I still struggled. The recognition of this Aware space was there, but my human conditioning—addiction, anxiety, self-doubt—was deeply grooved. My nervous system was still running old, fearful programs. This is where my personal journey became the framework I now offer.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </section>
        </div>

        {/* Framework Section */}
        <section id="framework" className="py-20 md:py-32 px-6 sm:px-4 bg-black">
          <div className="max-w-6xl mx-auto">
            <RevealOnScroll>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-serif font-light text-zinc-100 mb-6">
                  The Integrated Framework
                </h2>
                <p className="text-lg md:text-xl text-zinc-400 font-light max-w-3xl mx-auto">
                  The View, The Compass, and The Ground. A complete method born from a life of inquiry, designed for a whole life.
                </p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 bg-charcoal/50 backdrop-blur-sm border border-white/10 rounded-xl">
                  <div className="text-sm font-light tracking-wide text-ocean-blue/70 bg-ocean-blue/10 px-3 py-1 rounded-full mb-4 inline-block">
                    The View
                  </div>
                  <h3 className="text-2xl font-serif font-light text-zinc-100 mb-4">
                    Zen & Non-Duality
                  </h3>
                  <p className="text-zinc-400 font-light leading-relaxed">
                    The practice of seeing what is already here. We shift our identity from the content of experience to the silent, aware context in which it arises. This is the source of unshakable peace.
                  </p>
                </div>
                <div className="p-8 bg-charcoal/50 backdrop-blur-sm border border-white/10 rounded-xl">
                  <div className="text-sm font-light tracking-wide text-ocean-blue/70 bg-ocean-blue/10 px-3 py-1 rounded-full mb-4 inline-block">
                    The Compass
                  </div>
                  <h3 className="text-2xl font-serif font-light text-zinc-100 mb-4">
                    Acceptance & Commitment (ACT)
                  </h3>
                  <p className="text-zinc-400 font-light leading-relaxed">
                    The science-backed skills for a meaningful life. We learn to unhook from difficult thoughts, clarify our values, and take committed action in that direction, even when fear is present.
                  </p>
                </div>
                <div className="p-8 bg-charcoal/50 backdrop-blur-sm border border-white/10 rounded-xl">
                  <div className="text-sm font-light tracking-wide text-ocean-blue/70 bg-ocean-blue/10 px-3 py-1 rounded-full mb-4 inline-block">
                    The Ground
                  </div>
                  <h3 className="text-2xl font-serif font-light text-zinc-100 mb-4">
                    Somatic Work
                  </h3>
                  <p className="text-zinc-400 font-light leading-relaxed">
                    The practice of coming home to the body. We gently release stored tension from the nervous system, building its capacity to handle life. A settled body is the foundation for a quiet mind.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* Deep Dive Section */}
        <section id="deep-dive" className="py-20 md:py-32 px-6 sm:px-4 bg-charcoal/30">
          <RevealOnScroll>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-serif font-light text-zinc-100 mb-6">
                  The Practice of Coming Home
                </h2>
              </div>
              <div className="space-y-12">
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif font-light text-zinc-100 mb-4">
                    The View: Zen and the End of the Search
                  </h3>
                  <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed">
                    The heart of this work is the direct recognition of your true nature. Through guided inquiry and silent presence, we look past the busy surface of the personality to the vast, open Awareness that you are. This isn&apos;t about attaining a future state; it&apos;s about recognizing the freedom that is already the ground of your being. It&apos;s the end of the exhausting project of self-improvement and the beginning of a life lived from a place of inherent wholeness.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif font-light text-zinc-100 mb-4">
                    The Compass: Navigating Your Human Life with ACT
                  </h3>
                  <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed">
                    Knowing you are Awareness is profound, but it doesn&apos;t pay the bills or mend relationships. For that, we need a practical compass. <strong className="font-medium text-zinc-100">Acceptance & Commitment Therapy (ACT)</strong> provides the tools to stop struggling with your thoughts and feelings. Instead of fighting them, we learn to make space for them while choosing actions aligned with what you deeply care about. It is the bridge between boundless freedom and a meaningful, effective life in the world.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-serif font-light text-zinc-100 mb-4">
                    The Ground: Finding Safety in the Body with Somatic Work
                  </h3>
                  <p className="text-base md:text-lg text-zinc-400 font-light leading-relaxed">
                    Insights remain conceptual if the body is living in the past. Trauma, stress, and anxiety are not just in the mind; they are physiological patterns stored in the nervous system. Through <strong className="font-medium text-zinc-100">Somatic work</strong>, we learn to listen to the body&apos;s language. We use breath and gentle attention to help the nervous system release stored survival energy and return to a state of natural balance and safety. This is the essential foundation that allows spiritual insights to become truly embodied and lived.
                  </p>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 md:py-32 px-6 sm:px-4 bg-black">
          <div className="max-w-6xl mx-auto">
            <RevealOnScroll>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-serif font-light text-zinc-100 mb-6">
                  Investment in Your Journey
                </h2>
                <p className="text-lg text-zinc-400 font-light">
                  Each session is a full hour of deep, focused work tailored to your unique path.
                </p>
              </div>
            </RevealOnScroll>
            <RevealOnScroll>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="p-8 bg-charcoal/50 backdrop-blur-sm border border-white/10 rounded-xl">
                  <div className="text-sm font-light tracking-wide text-ocean-blue uppercase mb-4">
                    Standard Rate
                  </div>
                  <div className="text-5xl font-light text-zinc-100 mb-2">£80</div>
                  <div className="text-sm text-zinc-500 mb-6">per hour</div>
                  <p className="text-zinc-400 font-light leading-relaxed">
                    For those who can afford to invest fully in their transformation and support the accessibility of this work for others.
                  </p>
                </div>
                <div className="p-8 bg-charcoal/50 backdrop-blur-sm border border-white/10 rounded-xl">
                  <div className="text-sm font-light tracking-wide text-ocean-blue uppercase mb-4">
                    Concession Rate
                  </div>
                  <div className="text-5xl font-light text-zinc-100 mb-2">£40</div>
                  <div className="text-sm text-zinc-500 mb-6">per hour</div>
                  <p className="text-zinc-400 font-light leading-relaxed">
                    For students, those on low income, or anyone for whom the standard rate would be a barrier to this work.
                  </p>
                </div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll>
              <div className="max-w-2xl mx-auto">
                <div className="p-8 bg-charcoal/50 backdrop-blur-sm border border-white/10 rounded-xl relative">
                  <div className="absolute -top-3 right-8 px-3 py-1 bg-ocean-blue text-black text-sm font-semibold rounded-full">
                    Save 20%
                  </div>
                  <div className="text-sm font-light tracking-wide text-ocean-blue uppercase mb-4">
                    6-Session Package
                  </div>
                  <div className="text-5xl font-light text-zinc-100 mb-2">£384</div>
                  <div className="text-sm text-zinc-500 mb-6">6 sessions</div>
                  <p className="text-zinc-400 font-light leading-relaxed">
                    Commit to deeper work with a discounted package. Standard rate with £96 savings, or £192 for concession rate (saving £48).
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* CTA Section */}
        <section id="begin" className="py-20 md:py-32 px-6 sm:px-4 bg-gradient-to-b from-charcoal/30 to-black">
          <RevealOnScroll>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-serif font-light text-zinc-100 mb-6">
                The Way is Made by Walking
              </h2>
              <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
                This path is not a quick fix, but a commitment to doing the real work of integration. If this story resonates, and you&apos;re ready to move beyond theory into a direct, embodied practice of freedom, let us sit together.
              </p>
              <a
                href="https://calendar.app.google/MfUZEtV7nYdYHhkH9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-ocean-blue text-black border border-ocean-blue hover:bg-ocean-blue/90 hover:shadow-[0_0_20px_rgba(79,195,247,0.8)] transition-all duration-300 font-semibold rounded-full"
              >
                Schedule a Conversation
              </a>
            </div>
          </RevealOnScroll>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
}
