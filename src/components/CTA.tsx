import Image from "next/image";
import config from "@/config"; // Keep config import if needed for links etc.
import Link from "next/link"; // Added Link import

const CTA = () => {
  return (
    <section className="relative hero overflow-hidden min-h-screen">
      {/* Background Image - Choose something evocative */}
      <Image
        // Replace with a suitable background image
        src="/images/placeholder_cta_background.jpg" // Placeholder
        alt="Evocative background image suggesting growth, connection or clarity" // UPDATED Alt
        className="object-cover w-full"
        fill
      />
      <div className="relative hero-overlay bg-neutral bg-opacity-70"></div>
      <div className="relative hero-content text-center text-neutral-content p-8">
        <div className="flex flex-col items-center max-w-xl p-8 md:p-0">
          {/* UPDATED Headline */}
          <h2 className="font-bold text-3xl md:text-5xl tracking-tight mb-8 md:mb-12">
            Ready to Navigate AI with <span className="text-blue-400">Confidence & Integrity</span>?
          </h2>
          {/* UPDATED Subheading */}
          <p className="text-lg opacity-90 mb-12 md:mb-16">
            Move beyond overwhelm. Embrace the future of wellbeing, grounded in wisdom and authentic human connection.
          </p>

          {/* UPDATED Button - Link to primary call to action */}
          <a href="https://calendar.app.google/85ZdaqYK5vfNk4aH9" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-wide">
            Book Your Free Discovery Call
          </a>
          <Link href="/#pricing" className="link link-hover text-blue-200 mt-4"> {/* Adjusted color for contrast */}
            Or Explore Workshops & Courses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA; 