"use client";

import { useRef, useState } from "react";
import type { JSX } from "react";
import config from "@/config"; // Import config to use supportEmail

// <FAQ> component is a list of <Item> component
interface FAQItemProps {
  question: string;
  answer: JSX.Element;
}

// FAQ content bridging therapy and AI strategy services
const faqList: FAQItemProps[] = [
  {
    question: "Why do you offer both therapy and AI strategy?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        After 15 years as a psychologist and 5+ years as a software engineer, I've learned that the challenges of human change and technological change are surprisingly similar. Whether you're an individual seeking balance or a team exploring AI, my role is to help you navigate complexity and act with clarity.
      </div>
    ),
  },
  {
    question: "What's your unique approach?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        <strong>One practice. Two frontiers.</strong><br />
        Human transformation and AI adoption share the same core challenge: helping people move through uncertainty. I use the same skills—deep listening, clear thinking, and practical action—whether supporting personal growth or technological integration.
      </div>
    ),
  },
  {
    question: "Who are therapy sessions for?",
    answer: <div className="space-y-2 leading-relaxed">Individuals seeking support with life transitions, emotional resilience, relationships, or personal growth. Sessions draw on psychotherapy, contemplative practice, and somatic approaches to help you navigate inner change.</div>,
  },
  {
    question: "Who is AI strategy for?",
    answer: <div className="space-y-2 leading-relaxed">Organizations and teams wanting to adopt AI safely and effectively. From startups to established companies, I help bridge the gap between technical possibilities and human values, ensuring technology serves your mission.</div>,
  },
  {
    question: "What is 'The Art of Personal AI'?",
    answer: <div className="space-y-2 leading-relaxed">It's my framework for conscious integration that works for both individuals and organizations. Three layers: Story/Spirit/Science (consciousness), Prompt/Context/Model (sensitivity), and IQ/EQ/AI (intelligence) help you master the human-AI relationship.</div>,
  },
  {
    question: "How do I get started?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        For therapy sessions, visit <a href="https://awake.oceanheart.ai" className="text-primary underline">awake.oceanheart.ai</a>. For AI strategy and consulting, <a href="/consulting" className="text-primary underline">explore our consulting services</a> or <a href="https://calendar.app.google/RMwsbtUZ76G6VZzb7" target="_blank" rel="noopener noreferrer" className="text-primary underline">book a discovery call</a>.
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
            Frequently Asked Questions
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