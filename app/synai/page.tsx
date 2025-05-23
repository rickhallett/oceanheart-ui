import type { Metadata } from "next";
import SynaiHero from "./components/SynaiHero";
import ComparisonSection from "./components/ComparisonSection";
import FeaturesSection from "./components/FeaturesSection";
import ProcessSection from "./components/ProcessSection";
import TechnicalSection from "./components/TechnicalSection";

export const metadata: Metadata = {
  title: "Synai: Your Personal AI Coach | Oceanheart.ai",
  description: "What if you had an AI that truly understood your unique patterns, values, and goals? Not generic advice, but deeply personalized guidance built from a clinical assessment of who you are.",
  openGraph: {
    title: "Synai: Your Personal AI Coach",
    description: "Your Personal AI Coach, Engineered for You. Deeply personalized guidance built from clinical assessment.",
    url: "https://oceanheart.ai/synai",
    siteName: "Oceanheart.ai",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Synai: Your Personal AI Coach",
    description: "Your Personal AI Coach, Engineered for You. Deeply personalized guidance built from clinical assessment.",
  },
};

export default function SynaiPage() {
  return (
    <main className="min-h-screen">
      <SynaiHero />
      <ComparisonSection />
      <FeaturesSection />
      <ProcessSection />
      <TechnicalSection />
    </main>
  );
}