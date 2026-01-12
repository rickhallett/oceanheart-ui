"use client";
import { Navigation, Footer, PageTransition } from "@/components/kaishin";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { motion } from "framer-motion";

export default function SynAIPage() {
  return (
    <PageTransition>
      <main className="relative bg-black antialiased">
        <Navigation />

        {/* Hero Section with Background Effects */}
        <section className="min-h-screen flex items-center justify-center relative pt-32 pb-20 px-4 overflow-hidden">
          <BackgroundBeams className="opacity-20" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-zinc-100 mb-6">
                SynAI
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto">
                Exploring the intersection of artificial intelligence and human transformation.
              </p>
            </motion.div>

            <div className="mt-12">
              <p className="text-center text-zinc-500 text-lg">
                SynAI content will be migrated from oceanheart-ui soon.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  );
}
