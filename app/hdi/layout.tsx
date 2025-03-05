import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

export const metadata = getSEOTags({
  title: `${config.appName} HDI - Human Digital Interface`,
  description: "The next generation of human-computer interaction",
  canonicalUrlRelative: "/hdi",
});

export default function HDILayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Suspense>
        <Header />
      </Suspense>

      <main className="min-h-screen p-2">{children}</main>

      <Suspense>
        <Footer showHDIForm={true} />
      </Suspense>
    </div>
  );
}
