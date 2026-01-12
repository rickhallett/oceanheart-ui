"use client";
import { Navigation, PageTransition } from "@/components/kaishin";
import { TerminalFooter } from "@/components/terminal";
import { motion } from "framer-motion";
import { IconMail, IconBrandLinkedin, IconBrandGithub, IconExternalLink } from "@tabler/icons-react";

export default function CVPage() {
  return (
    <PageTransition>
      <main className="relative bg-black antialiased">
        <Navigation />

        {/* Hero Section */}
        <section className="min-h-[40vh] flex items-center justify-center relative pt-32 pb-16 px-6 sm:px-4">
          <div className="absolute top-10 left-0 w-96 h-96 bg-ocean-blue/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-0 w-80 h-80 bg-plum/10 rounded-full blur-3xl" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-zinc-100 mb-4">
                Richard Hallett
              </h1>
              <p className="text-xl md:text-2xl text-ocean-blue font-light mb-6">
                AI Systems Engineer | Technical Strategist
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-zinc-400">
                <a href="mailto:rickhallett@icloud.com" className="flex items-center gap-2 hover:text-ocean-blue transition-colors">
                  <IconMail className="w-5 h-5" />
                  <span className="text-sm">rickhallett@icloud.com</span>
                </a>
                <a href="https://linkedin.com/in/richardhallett86" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-ocean-blue transition-colors">
                  <IconBrandLinkedin className="w-5 h-5" />
                  <span className="text-sm">linkedin.com/in/richardhallett86</span>
                </a>
                <a href="https://github.com/rickhallett" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-ocean-blue transition-colors">
                  <IconBrandGithub className="w-5 h-5" />
                  <span className="text-sm">github.com/rickhallett</span>
                </a>
                <a href="/portfolio" className="flex items-center gap-2 hover:text-ocean-blue transition-colors">
                  <IconExternalLink className="w-5 h-5" />
                  <span className="text-sm">oceanheart.ai/portfolio</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Summary */}
        <section className="py-16 px-6 sm:px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-light text-zinc-100 mb-6">Summary</h2>
              <p className="text-zinc-300 font-light leading-relaxed text-lg">
                AI Systems Engineer specializing in the strategic direction of LLM and agentic workflows to build robust, scalable applications. My engineering process leverages AI as a powerful implementation tool, allowing me to focus on the most critical aspects of senior-level work: deep problem decomposition, rigorous evaluation of architectural trade-offs, and ensuring final solutions are maintainable and aligned with business goals. My 15-year background in Cognitive Behavioural Therapy provides a unique foundation for designing human-centered AI systems and crafting nuanced, effective prompts.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Core Competencies */}
        <section className="py-16 px-6 sm:px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ocean-blue/5 to-transparent" />
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-light text-zinc-100 mb-8">Core Competencies</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl md:text-2xl font-light text-ocean-blue mb-4">AI Strategy & Orchestration</h3>
                  <ul className="space-y-3 text-zinc-300 font-light">
                    <li className="flex gap-3">
                      <span className="text-ocean-blue mt-1.5">•</span>
                      <span><strong className="text-zinc-100">Agentic Workflow Architecture:</strong> Designing multi-agent systems and orchestrating external API integrations, focusing on resilient process flows and comprehensive error handling.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-ocean-blue mt-1.5">•</span>
                      <span><strong className="text-zinc-100">Strategic Prompt Design:</strong> Crafting and refining structured prompts to guide AI behavior, reduce ambiguity, and ensure reliable, predictable outputs.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-ocean-blue mt-1.5">•</span>
                      <span><strong className="text-zinc-100">LLM Evaluation & Optimization:</strong> Orchestrating multiple LLM APIs (OpenAI, Claude, Anthropic) and evaluating their performance for specific tasks, including few-shot optimization and fine-tuning strategies.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-ocean-blue mt-1.5">•</span>
                      <span><strong className="text-zinc-100">End-to-End AI System Design:</strong> Leading the development of AI applications from initial concept and rapid prototyping through to deployment and user testing.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl font-light text-plum mb-4">Technical Architecture & Oversight</h3>
                  <ul className="space-y-3 text-zinc-300 font-light">
                    <li className="flex gap-3">
                      <span className="text-plum mt-1.5">•</span>
                      <span><strong className="text-zinc-100">Full-Stack Systems Knowledge:</strong> Deep understanding of React, TypeScript, and Python ecosystems to effectively guide AI in generating high-quality, idiomatic code and ensure seamless API integration.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-plum mt-1.5">•</span>
                      <span><strong className="text-zinc-100">API & Data Architecture:</strong> Designing RESTful APIs and data schemas, ensuring robust integration between front-end applications, back-end services, and external data sources.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-plum mt-1.5">•</span>
                      <span><strong className="text-zinc-100">Quality Assurance & Code Review:</strong> Establishing processes to review and validate AI-generated code for correctness, performance, and adherence to architectural patterns.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-plum mt-1.5">•</span>
                      <span><strong className="text-zinc-100">Modern DevOps & CI/CD:</strong> Overseeing development pipelines using Git, Docker, and CI/CD workflows to ensure consistent and reliable deployments.</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl md:text-2xl font-light text-jade mb-4">Domain Expertise</h3>
                  <ul className="space-y-3 text-zinc-300 font-light">
                    <li className="flex gap-3">
                      <span className="text-jade mt-1.5">•</span>
                      <span><strong className="text-zinc-100">Human-Centered AI Design:</strong> Applying principles of UX psychology and accessibility to architect AI systems that are intuitive, effective, and align with user mental models.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-jade mt-1.5">•</span>
                      <span><strong className="text-zinc-100">NLP Applications:</strong> Directing the development of NLP solutions for text analysis, data extraction, and the creation of sophisticated conversational interfaces.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-jade mt-1.5">•</span>
                      <span><strong className="text-zinc-100">Data Privacy & AI Ethics:</strong> Integrating GDPR awareness and ethical design principles throughout the application lifecycle.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Professional Experience */}
        <section className="py-16 px-6 sm:px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-light text-zinc-100 mb-8">Professional Experience</h2>

              <div className="space-y-12">
                {/* Oceanheart.ai */}
                <div className="border-l-2 border-ocean-blue pl-6">
                  <h3 className="text-xl md:text-2xl font-light text-zinc-100 mb-1">Founder & AI Systems Engineer</h3>
                  <p className="text-ocean-blue font-semibold mb-1">Oceanheart.ai</p>
                  <p className="text-zinc-500 text-sm mb-4">April 2024 – Present</p>
                  <ul className="space-y-2 text-zinc-300 font-light">
                    <li className="flex gap-3">
                      <span className="text-ocean-blue mt-1.5">•</span>
                      <span><strong className="text-zinc-100">Architected</strong> multi-agent LLM workflows by decomposing high-level requirements into discrete, testable tasks for AI implementation.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-ocean-blue mt-1.5">•</span>
                      <span><strong className="text-zinc-100">Directed</strong> the AI-driven development of full-stack prototypes, focusing on the seamless orchestration of LLM backends (OpenAI, Claude) with React frontends.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-ocean-blue mt-1.5">•</span>
                      <span><strong className="text-zinc-100">Refined</strong> prompt engineering strategies through iterative analysis, moving from reactive code fixes to proactive prompt design to improve the reliability of conversational interfaces.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-ocean-blue mt-1.5">•</span>
                      <span><strong className="text-zinc-100">Ensured</strong> the application of data privacy principles and ethical AI considerations throughout the development lifecycle of AI-powered wellbeing applications.</span>
                    </li>
                  </ul>
                </div>

                {/* EDITED */}
                <div className="border-l-2 border-zinc-700 pl-6">
                  <h3 className="text-xl md:text-2xl font-light text-zinc-100 mb-1">Software Engineer</h3>
                  <p className="text-zinc-300 font-semibold mb-1">EDITED (AI-Driven Retail Analytics SaaS)</p>
                  <p className="text-zinc-500 text-sm mb-4">November 2023 – March 2024</p>
                  <ul className="space-y-2 text-zinc-300 font-light">
                    <li className="flex gap-3">
                      <span className="text-zinc-500 mt-1.5">•</span>
                      <span><strong className="text-zinc-100">Guided</strong> the development of new React/TypeScript features for an ML-powered retail analytics platform.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-zinc-500 mt-1.5">•</span>
                      <span><strong className="text-zinc-100">Oversaw</strong> the creation of complex data visualization components, enabling clients to effectively interpret AI/ML-driven insights.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-zinc-500 mt-1.5">•</span>
                      <span><strong className="text-zinc-100">Collaborated</strong> with Python/Django backend engineers to define and optimize API endpoints for large-scale, unstructured data processing.</span>
                    </li>
                  </ul>
                </div>

                {/* Brandwatch */}
                <div className="border-l-2 border-zinc-700 pl-6">
                  <h3 className="text-xl md:text-2xl font-light text-zinc-100 mb-1">Software Engineer</h3>
                  <p className="text-zinc-300 font-semibold mb-1">Brandwatch (Enterprise Data Platform)</p>
                  <p className="text-zinc-500 text-sm mb-4">June 2021 – November 2023</p>
                  <ul className="space-y-2 text-zinc-300 font-light">
                    <li className="flex gap-3">
                      <span className="text-zinc-500 mt-1.5">•</span>
                      <span><strong className="text-zinc-100">Directed</strong> the modernization of a legacy codebase, architecting scalable React components for an enterprise data visualization platform while ensuring backward compatibility.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-zinc-500 mt-1.5">•</span>
                      <span><strong className="text-zinc-100">Mentored</strong> junior developers on modern software practices, an experience that now informs my process for <strong className="text-zinc-100">guiding AI agents</strong> by providing clear context, defining constraints, and reviewing outputs for quality.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-zinc-500 mt-1.5">•</span>
                      <span><strong className="text-zinc-100">Contributed</strong> to the design and refinement of APIs built for large-scale data processing.</span>
                    </li>
                  </ul>
                </div>

                {/* Telesoft */}
                <div className="border-l-2 border-zinc-700 pl-6">
                  <h3 className="text-xl md:text-2xl font-light text-zinc-100 mb-1">Full Stack Engineer</h3>
                  <p className="text-zinc-300 font-semibold mb-1">Telesoft (Cybersecurity Applications)</p>
                  <p className="text-zinc-500 text-sm mb-4">September 2020 – February 2021</p>
                  <ul className="space-y-2 text-zinc-300 font-light">
                    <li className="flex gap-3">
                      <span className="text-zinc-500 mt-1.5">•</span>
                      <span><strong className="text-zinc-100">Led</strong> the delivery of secure features for cybersecurity applications using TypeScript, Angular, and Node.js.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-zinc-500 mt-1.5">•</span>
                      <span><strong className="text-zinc-100">Engineered</strong> Python utilities to automate complex data processing and workflow optimization tasks.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Psychology Background */}
        <section className="py-16 px-6 sm:px-4 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-plum/5 to-transparent" />
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-light text-zinc-100 mb-6">Relevant Psychology Background</h2>
              <div className="border-l-2 border-plum pl-6">
                <h3 className="text-xl md:text-2xl font-light text-zinc-100 mb-1">Cognitive Behavioural Therapist</h3>
                <p className="text-plum font-semibold mb-4">15 Years</p>
                <p className="text-zinc-300 font-light leading-relaxed">
                  Extensive experience in human behaviour analysis, communication patterns, and structured problem-solving—directly applicable to designing conversational AI interfaces, understanding user needs for AI applications, and ensuring ethical AI deployment.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Education */}
        <section className="py-16 px-6 sm:px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-light text-zinc-100 mb-8">Education & Training</h2>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 border-l-2 border-zinc-700 pl-6 py-2">
                  <div>
                    <h3 className="text-lg font-light text-zinc-100">PGDip Cognitive Behavioural Therapy</h3>
                    <p className="text-zinc-400">Royal Holloway, University of London</p>
                  </div>
                  <p className="text-zinc-500 text-sm">2015</p>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 border-l-2 border-zinc-700 pl-6 py-2">
                  <div>
                    <h3 className="text-lg font-light text-zinc-100">PGCert Cognitive Behavioural Therapy</h3>
                    <p className="text-zinc-400">University of Central Lancashire</p>
                  </div>
                  <p className="text-zinc-500 text-sm">2013</p>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 border-l-2 border-zinc-700 pl-6 py-2">
                  <div>
                    <h3 className="text-lg font-light text-zinc-100">BSc Psychology</h3>
                    <p className="text-zinc-400">University of the West of England</p>
                  </div>
                  <p className="text-zinc-500 text-sm">2008</p>
                </div>

                <div className="border-l-2 border-jade pl-6 py-2 mt-6">
                  <h3 className="text-lg font-light text-zinc-100 mb-2">Ongoing Self-Directed Training</h3>
                  <p className="text-zinc-300 font-light">
                    AI/ML Application Development, LLM Orchestration (Langchain, Agent Frameworks), Modern System Design and API Architecture.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-6 sm:px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ocean-blue/5 to-transparent" />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-light text-zinc-100 mb-6">
                Let's <span className="text-ocean-blue">collaborate</span>
              </h2>
              <p className="text-zinc-400 font-light leading-relaxed mb-8">
                Looking for an AI systems engineer who combines technical excellence with human-centered design? Let's discuss how I can contribute to your team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:rickhallett@icloud.com"
                  className="px-8 py-3 bg-ocean-blue text-black border border-ocean-blue hover:bg-ocean-blue/90 hover:shadow-[0_0_20px_rgba(79,195,247,0.8)] transition-all duration-300 font-semibold rounded-full"
                >
                  Get in Touch
                </a>
                <a
                  href="/portfolio"
                  className="px-8 py-3 bg-white/20 text-zinc-100 border border-white/40 hover:bg-white/30 transition-all duration-300 font-semibold rounded-full"
                >
                  View Portfolio
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <TerminalFooter />
      </main>
    </PageTransition>
  );
}
