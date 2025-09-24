import { Suspense } from "react";
import Header from "@/components/Header";
import Problem from "@/components/Problem";
import FeaturesAccordion from "@/components/FeaturesAccordion";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import KnowledgeGapSection from "@/components/KnowledgeGapSection";
import CompoundingHoursSection from "@/components/CompoundingHoursSection";

export default function Home() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main>
        <Hero />
        <Problem />
        <FeaturesAccordion />
        {/* <KnowledgeGapSection /> */}
        <CompoundingHoursSection />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
