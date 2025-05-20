import { Suspense } from "react";
import Header from "@/src/components/Header";
import Problem from "@/src/components/Problem";
import FeaturesAccordion from "@/src/components/FeaturesAccordion";
import Pricing from "@/src/components/Pricing";
import FAQ from "@/src/components/FAQ";
import CTA from "@/src/components/CTA";
import Footer from "@/src/components/Footer";
import Hero from "@/src/components/Hero";

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
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
