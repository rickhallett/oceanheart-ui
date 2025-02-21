import Header from "@/components/Header";
import SuspendedFooter from "@/components/Footer";

export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 py-8">
          {children}
        </div>
      </main>
      <SuspendedFooter />
    </>
  );
}
