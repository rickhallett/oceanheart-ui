"use client";

import { useState } from "react";

export default function TechnicalDeepDive() {
  const [isExpanded, setIsExpanded] = useState(false);

  const engineeringTechniques = [
    { name: "Structured sections", description: "Clear XML-like blocks keep context organized.", score: "", category: "Architecture" },
    { name: "Roles & goals", description: "Defined identity, mission, and tasks reduce ambiguity.", score: "", category: "Identity" },
    { name: "Data priming", description: "Embedded client data keeps responses consistent.", score: "", category: "Learning" },
    { name: "Schema rules", description: "Stable fields for safe updates over time.", score: "", category: "Consistency" },
    { name: "Sequenced steps", description: "Ordered instructions for setup and use.", score: "", category: "Structure" },
    { name: "Question heuristics", description: "Prompts for finding gaps and asking useful questions.", score: "", category: "Intelligence" },
    { name: "Command patterns", description: "Predictable triggers and outputs.", score: "", category: "Interface" },
    { name: "Guardrails", description: "Simple rules to stay on task.", score: "", category: "Control" }
  ];

  const codeExample = `<SYNAI_PERSONAL_COACH_SYSTEM>
  <Identity name="SYNAI" purpose="Personal AI coach" />
  <Framework>ACT-informed principles</Framework>

  <ClientProfile source="structured_intake">
    <!-- values, goals, constraints -->
  </ClientProfile>

  <Operation>
    <Init>load_profile</Init>
    <Update>append_new_signals</Update>
    <Questioning>gap_analysis</Questioning>
  </Operation>

  <Responses context="persistent" personalization="on" />
</SYNAI_PERSONAL_COACH_SYSTEM>`;

  return (
    <div className="mt-16">
      <div className="text-center mb-8">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
        >
          <span className="mr-3">
            {isExpanded ? 'Hide' : 'Technical overview'}
          </span>
          <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
      </div>

      {isExpanded && (
        <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-3xl p-8 lg:p-12 shadow-2xl border border-cyan-500/20 animate-fade-in">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4">
              Prompt Engineering Overview
            </h3>
            <p className="text-xl text-cyan-200 max-w-3xl mx-auto">
              How the system stays clear, consistent, and adaptable.
            </p>
          </div>

          <div className="mb-12">
            <h4 className="text-2xl font-bold text-cyan-300 mb-6 flex items-center">
              <div className="w-3 h-3 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
              System Skeleton
            </h4>
            <div className="bg-black/50 rounded-xl p-6 border border-cyan-500/30 backdrop-blur-sm">
              <pre className="text-sm lg:text-base text-green-400 font-mono overflow-x-auto leading-relaxed">
                <code>{codeExample}</code>
              </pre>
            </div>
          </div>

          <div className="mb-12">
            <h4 className="text-2xl font-bold text-cyan-300 mb-8 flex items-center">
              <div className="w-3 h-3 bg-purple-400 rounded-full mr-3 animate-pulse"></div>
              Techniques
            </h4>

            <div className="grid md:grid-cols-2 gap-6">
              {engineeringTechniques.map((technique, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h5 className="text-base md:text-lg font-bold text-white mb-2">
                        {technique.name}
                      </h5>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${technique.category === 'Architecture' ? 'bg-blue-500/20 text-blue-300' :
                          technique.category === 'Identity' ? 'bg-purple-500/20 text-purple-300' :
                            technique.category === 'Structure' ? 'bg-green-500/20 text-green-300' :
                              technique.category === 'Learning' ? 'bg-orange-500/20 text-orange-300' :
                                technique.category === 'Consistency' ? 'bg-red-500/20 text-red-300' :
                                  technique.category === 'Intelligence' ? 'bg-cyan-500/20 text-cyan-300' :
                                    technique.category === 'Interface' ? 'bg-yellow-500/20 text-yellow-300' :
                                      'bg-indigo-500/20 text-indigo-300'
                        }`}>
                        {technique.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {technique.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-xl p-8 border border-indigo-400/20">
            <h4 className="text-2xl font-bold text-indigo-300 mb-6 flex items-center">
              <div className="w-3 h-3 bg-indigo-400 rounded-full mr-3 animate-pulse"></div>
              Design Notes
            </h4>
            <ul className="space-y-2 text-gray-300">
              <li>Prefer clear fields over clever tricks.</li>
              <li>Keep updates small and observable.</li>
              <li>Make failure modes obvious and recoverable.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}