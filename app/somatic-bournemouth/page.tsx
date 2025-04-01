import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaLeaf, FaWater, FaWind, FaFire, FaYinYang } from "react-icons/fa";

const ElementCard = ({ icon, title, text }: { icon: React.ReactNode, title: string, text: string }) => (
  <div className="flex flex-col items-center text-center p-6 rounded-lg bg-base-200 shadow-lg">
    <div className="text-primary text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="opacity-80">{text}</p>
  </div>
);

export default function SomaticBournemouthPage() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main className="bg-base-100">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/psychedelicmind.avif"
              alt="Somatic Ecstatic"
              fill
              className="object-cover opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-base-100/90 via-base-100/50 to-base-100/90"></div>
          </div>

          <div className="container mx-auto px-8 py-20 relative z-10 text-center">
            <h1 className="font-extrabold text-4xl md:text-6xl tracking-tight mb-6">
              Somatic <span className="text-primary">Ecstatic</span>
            </h1>
            <p className="text-xl md:text-2xl opacity-80 max-w-2xl mx-auto mb-8">
              A journey into embodied presence through movement, breath, and awareness
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="#experience" className="btn btn-primary">
                Discover the Experience
              </Link>
              <Link href="mailto:kai@oceanheart.ai?subject=Somatic%20Ecstatic%20Inquiry" className="btn btn-outline">
                Join a Session
              </Link>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 md:py-24 px-8 bg-base-200" id="experience">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-bold text-3xl md:text-4xl mb-8">
              Beyond Ordinary <span className="text-primary">Meditation</span>
            </h2>
            <p className="text-lg mb-6 opacity-80">
              Somatic Ecstatic is not just another meditation class. It's an immersive exploration of consciousness through the wisdom of the body.
            </p>
            <p className="text-lg mb-6 opacity-80">
              Each session weaves together elements from two decades of experience in psychotherapy, meditation, movement practices, and embodied processing—creating a unique tapestry of experience that must be felt to be understood.
            </p>
            <p className="text-lg mb-12 opacity-80">
              No two journeys are the same. Each class is thoughtfully crafted to guide you into new territories of awareness and sensation.
            </p>

            <div className="flex justify-center">
              <FaYinYang className="text-5xl text-primary animate-pulse" />
            </div>
          </div>
        </section>

        {/* Elements Section */}
        <section className="py-16 md:py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-bold text-3xl md:text-4xl text-center mb-16">
              The <span className="text-primary">Elements</span> of Our Practice
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <ElementCard
                icon={<FaLeaf />}
                title="Gentle Movement"
                text="Intuitive yoga-inspired sequences that awaken the body's innate intelligence and release stored tension."
              />
              <ElementCard
                icon={<FaWater />}
                title="Fluid Awareness"
                text="Guided meditations that help you navigate the ever-changing currents of sensation and emotion with grace."
              />
              <ElementCard
                icon={<FaWind />}
                title="Breath Work"
                text="Conscious breathing techniques that expand your capacity for presence and vitality."
              />
              <ElementCard
                icon={<FaFire />}
                title="Ecstatic Integration"
                text="The transformative alchemy that happens when movement, breath, music, and awareness come together in the present moment."
              />
            </div>
          </div>
        </section>

        {/* Testimonial/Quote Section */}
        <section className="py-16 md:py-24 px-8 bg-neutral text-neutral-content">
          <div className="max-w-4xl mx-auto text-center">
            <blockquote className="text-2xl md:text-3xl italic font-light mb-8">
              "The body is not a thing, it is a situation: it is our grasp on the world and the outline of our projects."
            </blockquote>
            <p className="text-lg">— Simone de Beauvoir</p>
          </div>
        </section>

        {/* What to Expect Section */}
        <section className="py-16 md:py-24 px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-bold text-3xl md:text-4xl text-center mb-12">
              What to <span className="text-primary">Expect</span>
            </h2>

            <div className="space-y-8">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/3 flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-primary-content text-3xl font-bold">
                    1
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="font-bold text-xl mb-2">A Safe Container</h3>
                  <p className="opacity-80">
                    Each session begins with the creation of a sacred space where exploration can happen freely. All bodies, all abilities, all experiences are welcome.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/3 flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-primary-content text-3xl font-bold">
                    2
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="font-bold text-xl mb-2">Guided Experience</h3>
                  <p className="opacity-80">
                    You'll be skillfully led through a flowing sequence of mindful movement, breath awareness, and meditative states—no prior experience necessary.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/3 flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-primary-content text-3xl font-bold">
                    3
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="font-bold text-xl mb-2">Individual Journey</h3>
                  <p className="opacity-80">
                    While we move as a collective, each person's experience is unique. You're invited to listen deeply to your own body's wisdom and needs.
                  </p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-1/3 flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-primary-content text-3xl font-bold">
                    4
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="font-bold text-xl mb-2">Integration</h3>
                  <p className="opacity-80">
                    We close with time for reflection and integration, allowing the experience to settle into your system and extend its benefits into your everyday life.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-8 bg-primary text-primary-content">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-bold text-3xl md:text-4xl mb-6">
              Ready to Experience It?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              The only way to truly understand Somatic Ecstatic is to experience it firsthand. Classes are held weekly in Bournemouth with limited spaces to ensure personalized attention.
            </p>
            <Link href="mailto:kai@oceanheart.ai?subject=Somatic%20Ecstatic%20Booking" className="btn bg-neutral text-neutral-content btn-wide">
              Reserve Your Space
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 px-8 bg-base-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-bold text-3xl text-center mb-12">
              Common Questions
            </h2>

            <div className="space-y-6">
              <div className="collapse collapse-plus bg-base-100">
                <input type="radio" name="faq-accordion" defaultChecked />
                <div className="collapse-title font-medium text-lg">
                  Do I need prior experience with yoga or meditation?
                </div>
                <div className="collapse-content">
                  <p>Not at all. Somatic Ecstatic is designed to be accessible to everyone, regardless of experience level. The practice meets you where you are and invites you to explore at your own pace.</p>
                </div>
              </div>

              <div className="collapse collapse-plus bg-base-100">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title font-medium text-lg">
                  What should I wear and bring?
                </div>
                <div className="collapse-content">
                  <p>Wear comfortable clothing that allows for free movement. Bring a yoga mat if you have one (some are available to borrow), a water bottle, and an open mind. Everything else is provided.</p>
                </div>
              </div>

              <div className="collapse collapse-plus bg-base-100">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title font-medium text-lg">
                  How is this different from regular yoga or meditation?
                </div>
                <div className="collapse-content">
                  <p>Somatic Ecstatic integrates elements from various modalities but follows no single tradition. Each session is a unique composition that responds to the collective energy of the group while drawing on deep psychological understanding and somatic awareness.</p>
                </div>
              </div>

              <div className="collapse collapse-plus bg-base-100">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title font-medium text-lg">
                  Where and when are classes held?
                </div>
                <div className="collapse-content">
                  <p>Classes are currently held in central Bournemouth on Wednesday evenings. The exact location details are provided upon registration. Private sessions and workshops are also available by arrangement.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 