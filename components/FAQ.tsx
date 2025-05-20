"use client";

import { useRef, useState } from "react";
import type { JSX } from "react";
import config from "@/config"; // Import config to use supportEmail

// <FAQ> component is a list of <Item> component
interface FAQItemProps {
  question: string;
  answer: JSX.Element;
}

// New Q&A content for "The Art of Personal AI"
const faqList: FAQItemProps[] = [
  {
    question: "What is 'The Art of Personal AI'?",
    answer: <div className="space-y-2 leading-relaxed">It's Kai's unique 3-layer framework (Story/Spirit/Science, Prompt/Context/Model, IQ/EQ/AI) for integrating AI consciously, amplifying your human intelligence and sensitivity.</div>,
  },
  {
    question: "Who is this AI coaching for?",
    answer: <div className="space-y-2 leading-relaxed">Smart professionals, therapists, coaches, and creatives feeling overwhelmed by AI, who seek to understand and use it meaningfully without losing their human core.</div>,
  },
  {
    question: "How is this different from other AI courses?",
    answer: (<div className="space-y-2 leading-relaxed">We focus on <em>your</em> integration of AI, blending deep human understanding (from psychotherapy & contemplative practice) with practical tech know-how, rather than just listing tools.</div>),
  },
  {
    question: "What if I'm not technical?",
    answer: (<div className="space-y-2 leading-relaxed">Perfect. This coaching is designed to demystify AI. Kai translates complex concepts into your language, focusing on principles over fleeting tech trends.</div>),
  },
  {
    question: "How do I get started?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        Book a free, no-obligation 20-minute Clarity Call with Kai to discuss your needs and see if this is the right fit for you. <a href="https://calendar.app.google/85ZdaqYK5vfNk4aH9" target="_blank" rel="noopener noreferrer" className="text-primary underline">Click here to book a call</a>.
      </div>
    ),
  },
];

// FaqItem component remains the same structurally
const FaqItem = ({
  item,
}: {
  item: FAQItemProps;
}) => {
  const accordion = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t border-base-content/10"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        <span className="flex-1 text-base-content">{item.question}</span>
        <svg
          className={`flex-shrink-0 w-4 h-4 ml-auto fill-current transition duration-200 ease-out ${isOpen ? "rotate-180" : ""
            }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#9ca3af"
        >
          <path d="M11.9997 13.1714L16.9495 8.22168L18.3637 9.63589L11.9997 15.9999L5.63574 9.63589L7.04996 8.22168L11.9997 13.1714Z"></path>
        </svg>
      </button>

      <div
        ref={accordion}
        className="transition-all duration-300 ease-in-out opacity-80 overflow-hidden"
        style={
          isOpen
            ? { maxHeight: accordion.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{item.answer}</div>
      </div>
    </li>
  );
};

const FAQ = () => {
  return (
    <section className="bg-base-200" id="faq">
      <div className="py-24 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        <div className="flex flex-col text-left basis-1/2">
          <p className="inline-block font-semibold text-primary mb-4">FAQ</p>
          <p className="sm:text-4xl text-3xl font-extrabold text-base-content">
            Common Questions About Conscious AI Integration
          </p>
        </div>

        <ul className="basis-1/2">
          {faqList.map((item, i) => (
            <FaqItem key={i} item={item} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default FAQ; 