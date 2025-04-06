"use client";

import { useRef, useState } from "react";
import type { JSX } from "react";
import config from "@/config"; // Import config to use supportEmail

// <FAQ> component is a list of <Item> component
interface FAQItemProps {
  question: string;
  answer: JSX.Element;
}

// 🚨 MAJOR UPDATE NEEDED HERE 🚨 - Update questions and answers
const faqList: FAQItemProps[] = [
  {
    question: "What is Oceanheart.ai?", // UPDATED Q&A
    answer: <div className="space-y-2 leading-relaxed">Oceanheart.ai offers human-centred guidance, training, and consulting for wellbeing professionals navigating the complexities of Artificial Intelligence. We focus on integrating technical understanding ('Science'), human experience ('Story'), and ethical wisdom ('Spirit').</div>,
  },
  {
    question: "How is this different from typical AI consulting or therapy?", // UPDATED Q&A
    answer: <div className="space-y-2 leading-relaxed">Our approach is unique due to Kai's rare background blending deep software engineering, psychotherapy, and spiritual practice. We don't just offer tech advice OR therapeutic support; we integrate them, focusing on ethical use, psychological impact, and maintaining human connection in the age of AI.</div>,
  },
  {
    question: "Who is this best suited for?", // NEW Q&A
    answer: (<div className="space-y-2 leading-relaxed">Therapists, coaches, counsellors, healers, and other wellbeing leaders who want to engage with AI thoughtfully, ethically, and effectively. It's for those seeking deeper understanding and practical skills beyond surface-level tech tutorials.</div>),
  },
  {
    question: "Is this therapy?", // NEW Q&A
    answer: (<div className="space-y-2 leading-relaxed">While informed by deep psychotherapeutic principles, the consulting and training are *not* therapy. The focus is on navigating AI in your professional practice. However, the approach inherently supports personal integration and wellbeing in relation to technology.</div>),
  },
  {
    question: "What does 'Science, Story, Spirit' mean practically?", // NEW Q&A
    answer: (<div className="space-y-2 leading-relaxed">It means we look at AI with technical clarity ('Science'), understand its impact on human feelings and relationships ('Story'), and ground our choices in timeless ethics and values ('Spirit'). Our offerings provide practical ways to apply this framework.</div>),
  },
  // Removed specific hardware/refund Qs about 'Data Angel' - update refund policy based on new offerings
  // {
  //   question: "Can I get a refund?",
  //   answer: ( <p> Refund policies vary by offering (course, workshop, 1:1 package). Please see specific terms upon enrollment or contact us for details. </p> ),
  // },
  {
    question: "I have more questions / Want to discuss 1:1 Guidance", // UPDATED Q
    answer: (
      <div className="space-y-2 leading-relaxed">
        We'd love to connect! Please book a free discovery call <a href="https://calendar.app.google/85ZdaqYK5vfNk4aH9" target="_blank" rel="noopener noreferrer" className="text-primary underline">here</a> or email us at <a href={`mailto:${config.resend.supportEmail}`} className="text-primary underline">{config.resend.supportEmail}</a>.
      </div> // UPDATED A
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
            Your Questions Answered
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