"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { IconChevronDown } from "@tabler/icons-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  variant?: "path" | "program";
}

const pathFAQs: FAQItem[] = [
  {
    question: "How is this different from meditation apps or therapy?",
    answer: "Most approaches focus on a single dimension—meditation apps target the mind, therapy targets emotions and behavior, fitness programs target the body. The Kaishin Method integrates all five dimensions (Mental, Emotional, Physical, Energetic, Spiritual) simultaneously through three complementary pillars: Zen (The View), ACT Psychology (The Compass), and Somatic Practice (The Ground). This creates complete transformation, not just improvement in isolated areas."
  },
  {
    question: "Do I need prior experience with meditation or therapy?",
    answer: "No prior experience is required. The method is designed to meet you wherever you are. Whether you're completely new to contemplative practice or have years of experience, the structured progression through the Eight Circles ensures you build a solid foundation before advancing to more sophisticated practices."
  },
  {
    question: "What if I miss a day of practice?",
    answer: "Life happens, and the method is designed to be sustainable, not rigid. The key is consistent engagement, not perfection. If you miss a day, simply resume where you left off. The practices are designed to build cumulative progress, and occasional gaps won't derail your transformation—abandoning the practice will."
  },
  {
    question: "Is this a religious or spiritual program?",
    answer: "While the method draws from Zen and contemplative traditions, it's not religious. You don't need to adopt any belief system or religious framework. The View (non-dual awareness) is a experiential practice, not a doctrine. Many practitioners are secular, while others integrate it with their existing faith traditions."
  },
  {
    question: "How much time do I need to commit each day?",
    answer: "The 30-Day Challenge requires just 15 minutes daily. The 90-Day Transformation program requires 30-45 minutes daily. Quality and consistency matter more than duration—15 minutes of focused, integrated practice yields far better results than an hour of fragmented, distracted effort."
  },
  {
    question: "What are the Eight Circles?",
    answer: "The Eight Circles represent progressive levels of integration and mastery across all five bodies. Circle 1 is foundational consistency, Circle 3 is intermediate integration (achieved in the 90-Day program), Circle 5 is advanced mastery, and Circle 8 represents complete integration. Each circle has specific milestones and practices."
  }
];

const programFAQs: FAQItem[] = [
  {
    question: "What's included in each program tier?",
    answer: "The 30-Day Challenge includes daily guided practices, progress tracking, and Circle 1 certification. The 90-Day Transformation includes structured month-by-month curriculum (Ground → Compass → View), community access, and bi-weekly group sessions. Pillar courses include deep-dive content, 1-on-1 mentorship, and advanced techniques. Mastery programs include retreat intensives and certification pathways."
  },
  {
    question: "Can I pay in installments?",
    answer: "Yes. The 90-Day Transformation offers a 3-month payment plan (£177/month). Pillar courses and Mastery programs have flexible payment options. Contact us to discuss custom arrangements if needed."
  },
  {
    question: "What if I don't see results?",
    answer: "We offer a 30-day money-back guarantee. If you complete the practices consistently for 30 days and don't see measurable progress, you get a full refund—no questions asked. We're confident the method works because it integrates proven approaches across three complementary pillars."
  },
  {
    question: "Do I need to complete programs in order?",
    answer: "We strongly recommend starting with the 30-Day Challenge to build your foundation, then progressing to the 90-Day Transformation. Pillar courses and Mastery programs require Circle 3 attainment (completion of 90-Day Transformation). Skipping foundations leads to fragmented progress."
  },
  {
    question: "How is the program delivered?",
    answer: "All programs are delivered through our member portal with on-demand video lessons, guided audio practices, written materials, progress trackers, and community forums. The 90-Day Transformation and higher tiers include live group sessions via Zoom. You can access everything on desktop or mobile."
  },
  {
    question: "What's the time commitment for the 90-Day Transformation?",
    answer: "Expect 30-45 minutes daily for solo practice plus 2 hours bi-weekly for live group sessions. Month 1 (Ground) emphasizes somatic work, Month 2 (Compass) emphasizes psychological skills, Month 3 (View) emphasizes contemplative practice. The curriculum is structured to build progressively."
  },
  {
    question: "Can I get a refund after 30 days?",
    answer: "The 30-day guarantee covers the first month. After that, refunds are evaluated case-by-case based on your engagement and progress. If you've stopped practicing and want a refund months later, we can't help—the method requires commitment. If you've practiced diligently and still aren't seeing results, contact us to discuss options."
  }
];

interface FAQItemComponentProps extends FAQItem {
  isOpen: boolean;
  onClick: () => void;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemComponentProps) {
  return (
    <div className="border-b border-white/[0.1]">
      <button
        onClick={onClick}
        className="w-full py-6 px-4 sm:px-6 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors min-h-[56px]"
        aria-expanded={isOpen}
      >
        <span className="text-base sm:text-lg font-light text-zinc-100 pr-4">{question}</span>
        <IconChevronDown
          className={`flex-shrink-0 text-zinc-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          size={20}
        />
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-4 pb-6 text-zinc-400 font-light leading-relaxed">
          {answer}
        </div>
      </motion.div>
    </div>
  );
}

export function FAQSection({ variant = "path" }: FAQSectionProps) {
  const faqs = variant === "path" ? pathFAQs : programFAQs;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-6 bg-black relative">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-zinc-100 mb-4">
            Common <span className="text-gold">Questions</span>
          </h2>
          <p className="text-lg text-zinc-400 font-light">
            Everything you need to know about the Kaishin Method
          </p>
        </div>

        <div className="bg-void border border-white/[0.05]">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              {...faq}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-zinc-400 font-light mb-4">
            Still have questions?
          </p>
          <a
            href="/app/support"
            className="inline-block text-gold hover:text-gold/80 transition-colors font-medium"
          >
            Contact Support →
          </a>
        </div>
      </div>
    </section>
  );
}
