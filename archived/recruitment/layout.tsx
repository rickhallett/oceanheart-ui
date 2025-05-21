import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Recruitment - Oceanheart.ai",
  description: "Candidate evaluation",
};

export default function RecruitmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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