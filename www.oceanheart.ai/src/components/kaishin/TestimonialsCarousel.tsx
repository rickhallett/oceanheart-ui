"use client";

import { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

interface Testimonial {
  name: string;
  quote: string;
  title?: string;
  rating: number;
  date?: string;
}

export function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await fetch('/api/testimonials?limit=10');
        const data = await response.json();

        if (data.testimonials) {
          setTestimonials(data.testimonials);
        }
      } catch (_error) {

      } finally {
        setLoading(false);
      }
    }

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-6 bg-void relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-zinc-800 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-zinc-800 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-void relative overflow-hidden">
      {/* Background blur orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-jade/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-zinc-100 mb-4">
            <span className="text-gold">Transformation</span> Stories
          </h2>
          <p className="text-lg text-zinc-400 font-light">
            From students who&apos;ve <span className="text-jade">moved through the circles</span>
          </p>
        </div>

        <div className="relative">
          <InfiniteMovingCards
            items={testimonials.map(t => {
              // Approximate 8 lines at ~50 chars per line = 400 chars
              const maxChars = 300;
              const truncatedQuote = t.quote.length > maxChars
                ? t.quote.substring(0, maxChars).trim() + '...'
                : t.quote;

              return {
                quote: truncatedQuote,
                name: t.name,
                title: t.title || `⭐ ${t.rating}/5 on Trustpilot`,
              };
            })}
            direction="right"
            speed="slow"
            pauseOnHover={true}
            className="py-10"
          />
        </div>

        {/* Source attribution */}
        <div className="text-center mt-8">
          <p className="text-sm text-zinc-500 italic">
            Real reviews from <a
              href="https://uk.trustpilot.com/review/richardhallett.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold/80 transition-colors underline"
            >
              Trustpilot
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
