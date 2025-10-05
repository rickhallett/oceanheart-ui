"use client";
import { Navigation, Footer, PageTransition } from "@/components/kaishin";
import { motion } from "framer-motion";
import { useState } from "react";
import { IconBrain, IconClock, IconLock, IconUsers, IconBuilding, IconRocket, IconRobot, IconCode, IconChartLine } from "@tabler/icons-react";

const ServiceAccordion = ({ icon, title, description, isOpen, onClick }: { icon: React.ReactNode; title: string; description: string; isOpen: boolean; onClick: () => void }) => (
  <div className="border-b border-white/10">
    <button
      onClick={onClick}
      className="flex items-center justify-between cursor-pointer py-6 w-full text-left group"
    >
      <div className="flex items-center gap-3 sm:gap-4 flex-1">
        <div className="text-ocean-blue flex-shrink-0">{icon}</div>
        <h3 className="font-serif font-light text-base sm:text-lg text-zinc-100 group-hover:text-ocean-blue transition-colors">{title}</h3>
      </div>
      <svg
        className={`w-5 h-5 transition-transform duration-500 ease-out text-zinc-400 flex-shrink-0 ml-2 ${isOpen ? 'rotate-90' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
      </svg>
    </button>
    <motion.div
      initial={false}
      animate={{
        height: isOpen ? 'auto' : 0,
        opacity: isOpen ? 1 : 0
      }}
      transition={{
        height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
        opacity: { duration: 0.3, ease: 'easeOut' }
      }}
      className="overflow-hidden"
    >
      <div className="pb-6 pl-8 sm:pl-12 pr-2">
        <p className="text-zinc-400 font-light leading-relaxed text-sm sm:text-base">
          {description}
        </p>
      </div>
    </motion.div>
  </div>
);

export default function ConsultingPage() {
  const [openService, setOpenService] = useState<string | null>(null);
  const [openClient, setOpenClient] = useState<string | null>(null);

  return (
    <PageTransition>
      <main className="relative bg-black antialiased">
        <Navigation />

        {/* Hero Section */}
        <section className="min-h-[70vh] flex items-center justify-center relative pt-32 pb-20 px-6 sm:px-4">
          <div className="absolute top-10 right-0 w-96 h-96 bg-ocean-blue/10 rounded-full blur-3xl" />

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <motion.div
                className="md:w-2/3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-zinc-100 mb-6">
                  Private <span className="text-ocean-blue">AI Consulting</span> for Your Unique Needs
                </h1>
                <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed mb-8">
                  Cut the repetition. Eliminate the boring parts. Focus on what truly matters in your work and life.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#services" className="px-8 py-3 bg-ocean-blue text-black border border-ocean-blue hover:bg-ocean-blue/90 hover:shadow-[0_0_20px_rgba(79,195,247,0.8)] transition-all duration-300 font-semibold rounded-full text-center">
                    Explore Services
                  </a>
                  <a href="mailto:kai@oceanheart.ai" className="px-8 py-3 bg-white/20 text-zinc-100 border border-white/40 hover:bg-white/30 transition-all duration-300 font-semibold rounded-full text-center">
                    Get in Touch
                  </a>
                </div>
              </motion.div>
              <motion.div
                className="md:w-1/3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <img
                  src="/images/about_me_profile_2.jpeg"
                  alt="AI Consultant"
                  className="rounded-full mx-auto max-w-[300px] w-full border-2 border-ocean-blue/20"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Me Section */}
        <section className="py-20 px-6 sm:px-4 bg-gradient-to-b from-transparent via-charcoal/30 to-transparent">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-serif font-light text-zinc-100 mb-6">
                Why Choose <span className="text-ocean-blue">My Consulting</span> Services?
              </h2>
              <p className="text-lg text-zinc-400 font-light max-w-3xl mx-auto">
                I&apos;ve spent years at the intersection of psychology and technology, building AI solutions that actually work for real-world problems.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: <IconBrain className="w-12 h-12" />, title: "Dual Expertise", description: "With backgrounds in both psychology and software engineering, I bridge the gap between human needs and technical solutions." },
                { icon: <IconClock className="w-12 h-12" />, title: "Time-Saving Focus", description: "I don't waste your time with flashy demos. We focus on practical solutions that give you back precious hours each week." },
                { icon: <IconLock className="w-12 h-12" />, title: "Privacy-First Approach", description: "I design solutions with privacy built-in from the ground up, especially important for those handling sensitive data." }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex flex-col items-center p-6 bg-charcoal/50 backdrop-blur-sm border border-white/[0.1] rounded-xl hover:border-ocean-blue/50 transition-all duration-300"
                >
                  <div className="text-ocean-blue mb-4">{item.icon}</div>
                  <h3 className="font-serif font-light text-xl text-zinc-100 mb-2">{item.title}</h3>
                  <p className="text-zinc-400 font-light text-center leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How I Help Section */}
        <section className="py-20 px-6 sm:px-4" id="services">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-5xl font-serif font-light text-center mb-12 text-zinc-100"
            >
              How I Can <span className="text-ocean-blue">Help You</span>
            </motion.h2>

            <div className="mb-16">
              <ServiceAccordion
                icon={<IconRobot className="w-5 h-5" />}
                title="AI Integration Assessment"
                description="A comprehensive analysis of your current workflow to identify where AI can make the biggest impact with the least disruption. We'll map your daily tasks, identify repetitive patterns, and find opportunities for meaningful automation."
                isOpen={openService === 'assessment'}
                onClick={() => setOpenService(openService === 'assessment' ? null : 'assessment')}
              />
              <ServiceAccordion
                icon={<IconCode className="w-5 h-5" />}
                title="Custom AI Solution Design"
                description="Tailored AI tools designed specifically for your unique needs, whether for note-taking, data analysis, or client interactions. No generic solutions—everything is built to fit your specific context and workflow."
                isOpen={openService === 'design'}
                onClick={() => setOpenService(openService === 'design' ? null : 'design')}
              />
              <ServiceAccordion
                icon={<IconChartLine className="w-5 h-5" />}
                title="AI Implementation & Training"
                description="Hands-on setup and training to ensure you and your team can effectively use and maintain your new AI tools. I'll be there every step of the way, from installation to mastery."
                isOpen={openService === 'training'}
                onClick={() => setOpenService(openService === 'training' ? null : 'training')}
              />
              <ServiceAccordion
                icon={<IconRocket className="w-5 h-5" />}
                title="Ongoing Support & Optimization"
                description="Regular check-ins and adjustments to ensure your AI solutions continue to evolve with your changing needs. Technology moves fast, and your tools should keep pace with both innovation and your growth."
                isOpen={openService === 'support'}
                onClick={() => setOpenService(openService === 'support' ? null : 'support')}
              />
            </div>

            {/* Who I Work With */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-serif font-light mb-6 text-zinc-100"
            >
              Who I Work With
            </motion.h3>

            <div>
              <ServiceAccordion
                icon={<IconUsers className="w-5 h-5" />}
                title="Individual Practitioners"
                description="Therapists, coaches, and solo professionals looking to streamline documentation, enhance client experiences, and focus more on their craft. I help you reclaim hours each week from administrative tasks."
                isOpen={openClient === 'individual'}
                onClick={() => setOpenClient(openClient === 'individual' ? null : 'individual')}
              />
              <ServiceAccordion
                icon={<IconBuilding className="w-5 h-5" />}
                title="Small & Medium Enterprises"
                description="Teams that want to reduce administrative overhead, improve internal processes, and leverage data they already have for better decision-making. Perfect for organizations ready to work smarter, not harder."
                isOpen={openClient === 'sme'}
                onClick={() => setOpenClient(openClient === 'sme' ? null : 'sme')}
              />
              <ServiceAccordion
                icon={<IconRocket className="w-5 h-5" />}
                title="Forward-Thinking Organizations"
                description="Any group looking to stay ahead of technological change while prioritizing ethical implementation and meaningful human connections. If you believe technology should enhance humanity, not replace it, we're aligned."
                isOpen={openClient === 'forward'}
                onClick={() => setOpenClient(openClient === 'forward' ? null : 'forward')}
              />
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-6 sm:px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-transparent to-gold/10" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-light text-zinc-100 mb-6">
                Ready to transform your work?
              </h2>
              <p className="text-lg text-zinc-400 font-light mb-8 max-w-2xl mx-auto">
                Let&apos;s discuss how AI can help you reclaim your time, enhance your effectiveness, and find more joy in what you do.
              </p>
              <a
                href="mailto:kai@oceanheart.ai"
                className="inline-block px-8 py-3 bg-ocean-blue text-black border border-ocean-blue hover:bg-ocean-blue/90 hover:shadow-[0_0_20px_rgba(79,195,247,0.8)] transition-all duration-300 font-semibold rounded-full"
              >
                Book a Free Consultation
              </a>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
}
