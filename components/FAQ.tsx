"use client";

import { useRef, useState } from "react";
import type { JSX } from "react";

// <FAQ> component is a lsit of <Item> component
// Just import the FAQ & add your FAQ content to the const faqList arrayy below.

interface FAQItemProps {
  question: string;
  answer: JSX.Element;
}

const faqList: FAQItemProps[] = [
  {
    question: "What exactly is Data Angel?",
    answer: <div className="space-y-2 leading-relaxed">Data Angel is a privacy-first AI toolkit designed specifically for therapists, counselors, and wellness professionals. It enables you to harness powerful AI capabilities for note-taking, summarization, and documentation—all while keeping your clients' sensitive data 100% on your own device.</div>,
  },
  {
    question: "How is this different from other AI tools?",
    answer: <div className="space-y-2 leading-relaxed">Unlike most AI services that require sending data to cloud servers (often costing £300-£500/month for HIPAA compliance), Data Angel processes everything locally on your device. Your clients' data never leaves your control, making it inherently more secure and affordable than cloud alternatives.</div>,
  },
  {
    question: "What hardware do I need?",
    answer: (<div className="space-y-2 leading-relaxed">Data Angel is designed to work on most modern laptops. We'll help you determine if your current device is suitable during setup. For optimal performance, we recommend at least 16GB RAM and an i5/Ryzen 5 processor or better. We can also provide pre-configured hardware options if needed.</div>),
  },
  {
    question: "Can I get a refund?",
    answer: (
      <p>
        Yes! You can request a refund within 14 days of your purchase if you're not satisfied with Data Angel. Simply reach out to us by email.
      </p>
    ),
  },
  {
    question: "I have another question",
    answer: (
      <div className="space-y-2 leading-relaxed">We're here to help! Please email us at <a href="mailto:kai@oceanheart.ai">kai@oceanheart.ai</a> with any questions about Data Angel or to schedule a demo.</div>
    ),
  },
];

const FaqItem = ({ item }: { item: FAQItemProps }) => {
  const accordion = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        <span
          className={`flex-1 text-base-content ${isOpen ? "text-primary" : ""}`}
        >
          {item?.question}
        </span>
        <svg
          className={`flex-shrink-0 w-4 h-4 ml-auto fill-current`}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${isOpen && "rotate-180"
              }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${isOpen && "rotate-180 hidden"
              }`}
          />
        </svg>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out opacity-80 overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{item?.answer}</div>
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
