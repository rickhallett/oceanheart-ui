import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSEOTags } from "@/libs/seo";
import config from "@/config";

export const metadata = getSEOTags({
  title: `Meet the Team | ${config.appName}`,
  description: `Learn about the structure and members of the ${config.appName} team.`,
  canonicalUrlRelative: "/team",
});

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* <Suspense>
        <Header />
      </Suspense> */}

      <main className="min-h-screen">{children}</main>

      {/* <Suspense>
        <Footer />
      </Suspense> */}
    </>
  );
} 