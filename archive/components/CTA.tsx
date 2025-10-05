import Image from "next/image";
import config from "@/config"; // Keep config import if needed for links etc.
import Link from "next/link"; // Added Link import

const CTA = () => {
  return (
    <section className="relative hero overflow-hidden min-h-screen">
      {/* Background Image */}
      <Image
        src="/images/universe.jpg"
        alt="Cosmic background representing the vast potential of Human-Centred Transformation"
        className="object-cover w-full"
        fill
      />
      <div className="relative hero-overlay bg-neutral bg-opacity-70"></div>
      <div className="relative hero-content text-center text-neutral-content p-8">
        <div className="flex flex-col items-center max-w-xl p-8 md:p-0">
          {/* Headline */}
          <h2 className="font-bold text-3xl md:text-5xl tracking-tight mb-8 md:mb-12">
            Ready to Integrate AI <span className="text-blue-400">Consciously</span>?
          </h2>
          {/* Subheading */}
          <p className="text-lg opacity-90 mb-12 md:mb-16">
            Move from AI overwhelm to amplified human potential. Book your discovery call with Kai.
          </p>

          {/* Primary CTA Button */}
          <a href="https://calendar.app.google/RMwsbtUZ76G6VZzb7" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-wide">
            Book Your Free Discovery Call
          </a>
          <Link href="/#pricing" className="link link-hover text-blue-200 mt-4">
            View All Offerings
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA; 