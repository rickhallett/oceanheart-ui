import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import TwoPathways from "@/components/TwoPathways";
import BigHeartBigTech from "@/components/BigHeartBigTech";
import FeaturesAccordion from "@/components/FeaturesAccordion";
import FAQ from "@/components/FAQ";

export default function Home() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main>
        <Hero />
        <TwoPathways />
        <BigHeartBigTech />
        <FeaturesAccordion />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
