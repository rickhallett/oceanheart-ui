"use client";
import { useState, useRef } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaRegComments, FaBrain, FaSearch, FaRegLightbulb, FaListAlt, FaChalkboardTeacher, FaUserCheck, FaProjectDiagram, FaLaptopCode, FaUsers, FaRegArrowAltCircleRight } from "react-icons/fa";
import Link from "next/link";

const ConversationsPage = () => {
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(null);

  const differentiators = [
    {
      icon: <FaChalkboardTeacher className="w-8 h-8 text-primary" />,
      title: "Experiential Learning, Not Just Information Transfer",
      typical: "Present techniques (like lectures) and then give you exercises.",
      ours: "You learn by doing from the very first moment. Each module is a guided \"Conversation\" with AI within our integrated platform. Techniques aren't just explained; they are discovered as natural solutions when you encounter interaction challenges. The focus is on your direct experience and the insights you generate.",
    },
    {
      icon: <FaBrain className="w-8 h-8 text-primary" />,
      title: "Mindful Interaction, Not Just Technical Skill",
      typical: "Ignore the human element – the potential frustration, confusion, or cognitive biases that arise during learning.",
      ours: "We integrate principles from mindfulness and psychology (ACT, CBT) directly into the learning process. We help you observe AI responses – and your own internal reactions – with non-judgmental awareness. Brief, optional somatic cues keep you grounded. You'll learn to navigate challenges with psychological flexibility, turning potential frustration into fuel for curiosity.",
    },
    {
      icon: <FaSearch className="w-8 h-8 text-primary" />,
      title: "Focus on the Process of Discovery, Not Just the Output",
      typical: "Emphasize getting the \"right\" output quickly.",
      ours: "The process of interaction is where the deepest learning happens. We guide you through a natural 5-step cycle for each interaction: Intend -> Converse -> Observe -> Gain Insight -> Iterate. \"Failed\" prompts aren't errors; they are crucial pieces of information. We positively reinforce the learning gained from every interaction, not just the successful outputs.",
    },
    {
      icon: <FaRegComments className="w-8 h-8 text-primary" />,
      title: "Intuitive Dialogue Skills, Not Just a Library of Prompts",
      typical: "Offer lists of \"power prompts\" or aim for productivity shortcuts.",
      ours: "We aim for a deeper, embodied understanding of how to engage in effective dialogue. You'll develop the confidence to communicate nuances, critically evaluate responses, and build a more sophisticated, relational interaction style with AI, going far beyond simple commands.",
    },
    {
      icon: <FaListAlt className="w-8 h-8 text-primary" />,
      title: "Cohesive, Reflective Learning Ecosystem",
      typical: "Often require juggling external tools and separate note-taking.",
      ours: "Engage, reflect, and track your progress all in one place. Our platform captures your unique journey – your anticipations, prompts, observations, and insights – automatically compiling them into a personal Learning Journal. See your own thought process unfold and your skills grow via the \"AI Dialogue Skill Path,\" reinforcing your progress in a meaningful way.",
    },
  ];

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-base-100 py-20 md:py-16 overflow-hidden relative">
          {/* Background decorative elements */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-secondary/10 rounded-full opacity-60 blur-3xl z-0"></div>
          <div className="absolute top-1/3 right-10 w-40 h-40 bg-primary/10 rounded-full opacity-40 blur-2xl z-0"></div>
          <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-base-200 rounded-full opacity-70 blur-3xl z-0"></div>

          <div className="max-w-4xl mx-auto px-8 relative z-10">
            <div className="text-center">
              <div className="relative mb-8">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-12 relative z-10">
                  <span className="text-secondary">Conversations with AI<sup className="text-sm md:text-2xl align-super ml-1">™</sup></span>
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-base-content/80 mb-8">
                  Mastering AI Through Mindful Dialogue, Not Memorization
                </h2>
                <div className="absolute -top-6 -left-6 w-20 h-20 bg-base-200 rounded-full opacity-50 blur-xl z-0"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/10 rounded-full opacity-30 blur-xl z-0"></div>
              </div>

              <div className="flex flex-col md:flex-row gap-8 justify-center items-center mb-10">
                <div className="flex-1 max-w-xl">
                  <div className="bg-base-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 text-left">
                    <p className="text-lg opacity-90 leading-relaxed">
                      The world is flooded with AI courses promising mastery through endless lists of "prompt hacks" and technical jargon.<br /><br />They often feel overwhelming, abstract, and disconnected from the human experience of learning.
                    </p>
                  </div>
                </div>

                <div className="flex-1 max-w-xl">
                  <div className="flex flex-col gap-3 border-l-4 border-secondary pl-4 py-2 text-left">
                    <p className="text-lg opacity-90 leading-relaxed">
                      <span className="font-semibold text-secondary">'Conversations with AI'</span> offers a fundamentally different path. <br /><br />Designed specifically for therapists, healers, coaches, creatives, and anyone seeking a more intuitive, insightful, and human-centered way to engage with Artificial Intelligence.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Differentiators Section */}
        <section className="bg-base-200 py-24 md:py-32 space-y-2 md:space-y-8 overflow-hidden relative" id="features">
          {/* Background decorative elements */}
          <div className="absolute top-16 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl opacity-60 z-0"></div>
          <div className="absolute bottom-24 right-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl opacity-40 z-0"></div>

          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight mb-12 md:mb-16 text-center">
              <span className="text-primary">Conversations</span> with AI:
              <span className="bg-neutral text-neutral-content px-2 md:px-4 ml-2 md:ml-2 leading-relaxed inline-block mt-2">
                A <span className="text-primary">Unique</span> Learning Experience
              </span>
            </h2>

            {/* Simple Version Dropdown - Enhanced */}
            <div className="max-w-3xl mx-auto mb-16 md:mb-20">
              <details className="collapse collapse-arrow bg-base-100 border border-base-300/50 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <summary className="collapse-title text-xl md:text-2xl font-semibold cursor-pointer text-base-content group hover:text-primary transition-colors">
                  <span className="relative">
                    The Essence of Our Approach
                    <span className="text-primary text-lg ml-2">(Simple Version)</span>
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                  </span>
                </summary>
                <div className="collapse-content px-8 py-8 md:p-10 prose prose-sm md:prose-base max-w-none text-base-content/90">
                  <p className="text-lg leading-relaxed mb-6">
                    Think of learning to interact effectively with AI less like studying a technical manual, and more like learning a new form of dialogue or even a subtle craft.
                  </p>
                  <p className="mb-6">
                    Many courses will give you lists of rules, commands, or "prompts to copy." While sometimes helpful, this often feels like memorizing phrases without truly understanding the flow of conversation.
                  </p>
                  <p className="mb-6">
                    Our approach is distinctive. We focus on the <strong className="text-primary">experience of the interaction itself</strong>:
                  </p>
                  <ul className="space-y-4 mb-6">
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1 text-lg">•</span>
                      <span><strong className="text-primary">You engage directly:</strong> You'll try expressing your intentions to the AI within our guided platform.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1 text-lg">•</span>
                      <span><strong className="text-primary">You observe mindfully:</strong> We encourage you to pay close attention – not just to what the AI says back, but how it responds, and even how you feel or react during the exchange.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1 text-lg">•</span>
                      <span><strong className="text-primary">You gain insight from the process:</strong> Instead of just judging the outcome as "right" or "wrong," we treat every interaction as information. What worked? What led to confusion? What subtle shift in your approach might create a different result next time?</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1 text-lg">•</span>
                      <span><strong className="text-primary">You learn iteratively:</strong> Skill develops through this cycle of trying, observing, reflecting, and adjusting – much like refining any subtle communication skill.</span>
                    </li>
                  </ul>
                  <p className="text-lg mt-8 font-medium leading-relaxed">
                    Essentially, we're helping you develop an intuitive feel for communicating with AI. You'll build genuine understanding and confidence through direct, mindful practice, rather than just collecting technical tricks. It's about cultivating a more conscious and effective way to engage in this new kind of dialogue.
                  </p>
                </div>
              </details>
            </div>

            {/* Detailed Differentiators Accordion - Styled to Match FeaturesAccordion */}
            <div className="max-w-3xl mx-auto relative">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-10 md:mb-12">
                The <span className="text-primary">Five Key Distinctions</span> Explained
              </h3>
              <ul className="space-y-3">
                {differentiators.map((item, index) => {
                  const isOpen = index === openAccordionIndex;
                  const contentRef = useRef<HTMLDivElement>(null);

                  return (
                    <li key={index} className="bg-base-100 border border-base-300/20 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                      <button
                        className="w-full py-5 px-6 text-left flex items-center gap-4 cursor-pointer"
                        onClick={() => setOpenAccordionIndex(isOpen ? null : index)}
                        aria-expanded={isOpen}
                      >
                        {/* Icon */}
                        {item.icon &&
                          <span className={`w-8 h-8 flex-shrink-0 transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-base-content/70'}`}>{
                            item.icon
                          }</span>
                        }
                        {/* Title */}
                        <span className={`flex-1 text-lg md:text-xl font-semibold transition-colors duration-300 ${isOpen ? 'text-primary font-bold' : 'text-base-content'}`}>
                          {item.title}
                        </span>
                        {/* Arrow Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`}>
                          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                      </button>

                      {/* Content */}
                      <div
                        ref={contentRef}
                        className="transition-all duration-300 ease-in-out overflow-hidden"
                        style={{
                          maxHeight: isOpen ? contentRef.current?.scrollHeight + "px" : "0px",
                          opacity: isOpen ? 1 : 0,
                        }}
                      >
                        <div className="px-6 pt-0 pb-6 space-y-4">
                          <div className="border-l-4 border-red-400/60 pl-4 py-3 bg-red-50/40 rounded-r-md">
                            <p className="text-sm font-semibold text-red-700/90 mb-1">Typical AI Courses:</p>
                            <p className="text-base-content/90 italic leading-relaxed">{item.typical}</p>
                          </div>
                          <div className="border-l-4 border-primary/60 pl-4 py-3 bg-primary/5 rounded-r-md">
                            <p className="text-sm font-semibold text-primary mb-1">Our Approach:</p>
                            <p className="text-base-content/90 leading-relaxed">{item.ours}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

          </div>
        </section>

        {/* Summary/Metaphor Section - Enhanced */}
        <section className="bg-neutral text-neutral-content py-24 md:py-28 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-12 bg-gradient-to-b from-base-200 to-transparent opacity-70"></div>

          <div className="max-w-3xl mx-auto px-8 relative">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10 text-center">
              In <span className="text-primary">Simple Terms</span>:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
              <div className="bg-base-100/10 p-6 md:p-8 rounded-xl shadow-inner text-left transform transition-transform hover:-translate-y-1 duration-300">
                <h3 className="font-semibold text-xl mb-4 flex items-center gap-3">
                  <FaLaptopCode className="text-red-300 w-6 h-6" />
                  <span>Typical Courses</span>
                </h3>
                <p className="opacity-90 leading-relaxed text-lg">Teach you AI like you're learning to operate complex machinery – focusing on buttons and functions.</p>
              </div>
              <div className="bg-base-100/10 p-6 md:p-8 rounded-xl shadow-inner text-left transform transition-transform hover:-translate-y-1 duration-300">
                <h3 className="font-semibold text-xl mb-4 flex items-center gap-3">
                  <FaUsers className="text-primary w-6 h-6" />
                  <span>Conversations with AI</span>
                </h3>
                <p className="opacity-90 leading-relaxed text-lg">Teaches you like you're learning to dance with a new partner. We guide you through the steps, help you feel the rhythm, and find your own way</p>
              </div>
            </div>
          </div>
        </section>

        {/* Closing/CTA Section - Enhanced */}
        <section className="bg-base-100 py-20 md:py-28 relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-primary/5 rounded-full blur-3xl opacity-70 z-0"></div>

          <div className="max-w-3xl mx-auto px-8 text-center relative z-10">
            <p className="text-xl md:text-2xl opacity-90 leading-relaxed mb-10 max-w-2xl mx-auto">
              If you're seeking more than just technical instructions – if you desire <span className="font-semibold text-primary">genuine understanding</span>, confidence, and a <span className="font-semibold text-primary">mindful approach</span> to engaging with AI – then <span className="font-bold text-primary">'Conversations with AI'</span> is designed for you.
            </p>
            <Link href="/#pricing" className="btn btn-primary btn-lg shadow-md hover:shadow-lg transition-all duration-300 rounded-xl text-lg px-8">
              Explore Offerings <FaRegArrowAltCircleRight className="ml-2" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default ConversationsPage; 