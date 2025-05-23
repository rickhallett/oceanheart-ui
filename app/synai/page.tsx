import type { Metadata } from "next";

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
      {/* Page content will be added in subsequent phases */}
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center">Synai Page - Under Development</h1>
        <p className="text-center mt-4 text-lg text-base-content/70">
          Your Personal AI Coach page is being built...
        </p>
      </div>
    </main>
  );
}