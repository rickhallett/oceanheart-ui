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
    question: "What services do you offer?",
    answer: <div className="space-y-2 leading-relaxed">I provide consulting, training, and guidance for wellbeing professionals looking to integrate AI ethically and effectively into their practice. This includes personalized strategy sessions, workshops, and ongoing support to help you navigate AI with confidence and integrity.</div>,
  },
  {
    question: "Why is your background uniquely valuable?",
    answer: <div className="space-y-2 leading-relaxed">My 15 years as a psychotherapist, 5 years as a software engineer, and 25 years in contemplative practices gives me a rare perspective. I understand both technology and human dynamics deeply, allowing me to serve as a translator between these worlds in a way few others can.</div>,
  },
  {
    question: "How do you approach AI differently?",
    answer: (<div className="space-y-2 leading-relaxed">I focus on first principles rather than trends. By understanding AI through lived experience and critical reflection, I help you develop your human capacity to engage with these tools wisely. My approach prioritizes ethical considerations, keeping your expertise at the center, and ensuring technology serves human connection rather than replacing it.</div>),
  },
  {
    question: "Who can benefit from working with you?",
    answer: (
      <p>
        Therapists, coaches, healers, and wellbeing leaders who want to integrate AI with integrity, wisdom and authentic connection. If you're seeking clarity beyond surface-level solutions and want to navigate AI's possibilities while honoring your practice's values, my approach will resonate with you.
      </p>
    ),
  },
  {
    question: "How can I get started?",
    answer: (
      <div className="space-y-2 leading-relaxed">The best way to begin is by booking a free 20-minute call where we can discuss your specific needs and challenges. This allows us to determine if working together is a good fit. You can schedule this call directly through <a href="https://calendar.app.google/85ZdaqYK5vfNk4aH9" className="text-primary underline">my calendar</a>.</div>
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
