import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaBrain, FaUsers, FaBuilding, FaRobot, FaClock, FaLaptopCode, FaChartLine, FaRocket } from "react-icons/fa";

const ServiceCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-base-200 p-8 rounded-lg shadow-lg">
    <div className="flex items-center mb-4">
      <div className="mr-4 text-primary text-2xl">{icon}</div>
      <h3 className="font-bold text-xl">{title}</h3>
    </div>
    <p className="opacity-80">{description}</p>
  </div>
);

const ClientSection = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="flex flex-col md:flex-row items-center gap-6 py-6">
    <div className="text-4xl text-primary">{icon}</div>
    <div>
      <h3 className="font-bold text-xl mb-2">{title}</h3>
      <p className="opacity-80">{description}</p>
    </div>
  </div>
);

export default function ConsultingPage() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main className="bg-base-100">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-2/3">
                <h1 className="font-extrabold text-4xl md:text-6xl tracking-tight mb-6">
                  Private <span className="text-blue-400">AI Consulting</span> for Your Unique Needs
                </h1>
                <p className="text-lg md:text-xl opacity-80 mb-8">
                  Cut the repetition. Eliminate the boring parts. Focus on what truly matters in your work and life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="#services" className="btn btn-primary">
                    Explore Services
                  </Link>
                  <Link href="mailto:kai@oceanheart.ai" className="btn btn-outline">
                    Get in Touch
                  </Link>
                </div>
              </div>
              <div className="md:w-1/3">
                <Image
                  src="/images/about_me_profile_2.jpeg"
                  alt="AI Consultant"
                  width={400}
                  height={400}
                  className="rounded-full mx-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Me Section */}
        <section className="bg-neutral text-neutral-content py-16 md:py-24 px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="font-bold text-3xl md:text-5xl mb-8">
              Why Choose <span className="text-blue-400">My Consulting</span> Services?
            </h2>
            <p className="text-lg max-w-3xl mx-auto mb-12 opacity-90">
              I've spent years at the intersection of psychology and technology, building AI solutions that actually work for real-world problems.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col items-center p-6">
                <FaBrain className="text-5xl text-primary mb-4" />
                <h3 className="font-bold text-xl mb-2">Dual Expertise</h3>
                <p className="opacity-80">
                  With backgrounds in both psychology and software engineering, I bridge the gap between human needs and technical solutions.
                </p>
              </div>
              <div className="flex flex-col items-center p-6">
                <FaClock className="text-5xl text-primary mb-4" />
                <h3 className="font-bold text-xl mb-2">Time-Saving Focus</h3>
                <p className="opacity-80">
                  I don't waste your time with flashy demos. We focus on practical solutions that give you back precious hours each week.
                </p>
              </div>
              <div className="flex flex-col items-center p-6">
                <FaLaptopCode className="text-5xl text-primary mb-4" />
                <h3 className="font-bold text-xl mb-2">Privacy-First Approach</h3>
                <p className="opacity-80">
                  I design solutions with privacy built-in from the ground up, especially important for those handling sensitive data.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 md:py-24 px-8" id="services">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-bold text-3xl md:text-5xl text-center mb-12">
              My <span className="text-blue-400">Services</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <ServiceCard
                icon={<FaRobot />}
                title="AI Integration Assessment"
                description="A comprehensive analysis of your current workflow to identify where AI can make the biggest impact with the least disruption."
              />
              <ServiceCard
                icon={<FaLaptopCode />}
                title="Custom AI Solution Design"
                description="Tailored AI tools designed specifically for your unique needs, whether for note-taking, data analysis, or client interactions."
              />
              <ServiceCard
                icon={<FaChartLine />}
                title="AI Implementation & Training"
                description="Hands-on setup and training to ensure you and your team can effectively use and maintain your new AI tools."
              />
              <ServiceCard
                icon={<FaRocket />}
                title="Ongoing Support & Optimization"
                description="Regular check-ins and adjustments to ensure your AI solutions continue to evolve with your changing needs."
              />
            </div>

            <div className="bg-base-200 p-8 md:p-12 rounded-lg">
              <h3 className="font-bold text-2xl mb-6">
                Who I Work With
              </h3>

              <div className="space-y-4">
                <ClientSection
                  icon={<FaUsers />}
                  title="Individual Practitioners"
                  description="Therapists, coaches, and solo professionals looking to streamline documentation, enhance client experiences, and focus more on their craft."
                />
                <ClientSection
                  icon={<FaBuilding />}
                  title="Small & Medium Enterprises"
                  description="Teams that want to reduce administrative overhead, improve internal processes, and leverage data they already have for better decision-making."
                />
                <ClientSection
                  icon={<FaRocket />}
                  title="Forward-Thinking Organizations"
                  description="Any group looking to stay ahead of technological change while prioritizing ethical implementation and meaningful human connections."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials could go here in the future */}

        {/* Call-to-Action Section */}
        <section className="bg-primary text-primary-content py-16 md:py-24 px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="font-bold text-3xl md:text-4xl mb-6">
              Ready to transform your work?
            </h2>
            <p className="mb-8 text-lg max-w-2xl mx-auto">
              Let's discuss how AI can help you reclaim your time, enhance your effectiveness, and find more joy in what you do.
            </p>
            <Link href="mailto:kai@oceanheart.ai" className="btn bg-neutral text-neutral-content btn-wide">
              Book a Free Consultation
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 md:py-24 px-8 bg-base-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-bold text-3xl text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div className="collapse collapse-plus bg-base-100">
                <input type="radio" name="faq-accordion" defaultChecked />
                <div className="collapse-title font-medium text-lg">
                  Do I need technical knowledge to work with you?
                </div>
                <div className="collapse-content">
                  <p>Not at all! My job is to translate complex technical concepts into plain language and practical solutions. I handle the technical details so you can focus on the results.</p>
                </div>
              </div>

              <div className="collapse collapse-plus bg-base-100">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title font-medium text-lg">
                  How do you ensure privacy and data security?
                </div>
                <div className="collapse-content">
                  <p>Privacy is built into everything I do. I prioritize local processing where possible, implement proper encryption, and follow best practices for data handling. I'm transparent about how data flows through any system I design.</p>
                </div>
              </div>

              <div className="collapse collapse-plus bg-base-100">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title font-medium text-lg">
                  How much does it cost to work with you?
                </div>
                <div className="collapse-content">
                  <p>Pricing depends on the scope and complexity of your needs. I offer packages starting at £99 for initial assessments and recommendations, with implementation costs varying based on your specific requirements. I'm always transparent about costs and timelines.</p>
                </div>
              </div>

              <div className="collapse collapse-plus bg-base-100">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title font-medium text-lg">
                  How long does the process typically take?
                </div>
                <div className="collapse-content">
                  <p>Most clients see initial results within 2-4 weeks. Simple implementations can be completed in days, while more complex solutions may take 1-3 months. We'll establish clear timelines and milestones at the beginning of our work together.</p>
                </div>
              </div>

              <div className="collapse collapse-plus bg-base-100">
                <input type="radio" name="faq-accordion" />
                <div className="collapse-title font-medium text-lg">
                  Will I be locked into ongoing costs or subscriptions?
                </div>
                <div className="collapse-content">
                  <p>I design solutions with sustainability in mind. While some AI tools do require subscriptions, I'll clearly outline all ongoing costs and help you choose options that make sense for your budget. Many solutions can be implemented with minimal recurring expenses.</p>
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