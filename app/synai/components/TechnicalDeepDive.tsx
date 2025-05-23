"use client";

import { useState } from "react";

export default function TechnicalDeepDive() {
  const [isExpanded, setIsExpanded] = useState(false);

  const engineeringTechniques = [
    {
      name: "XML Tagging / Structured Data Input",
      description: "The entire prompt is encased in custom XML tags that structure the prompt into logical, parsable sections for the AI.",
      score: "10/10",
      category: "Architecture"
    },
    {
      name: "Role-Playing / Persona Assignment", 
      description: "Explicitly defines the AI's identity, mission, operational framework (ACT), stance, and interaction style.",
      score: "10/10",
      category: "Identity"
    },
    {
      name: "Goal Setting / Task Definition",
      description: "High-level goals with specific tasks broken down into manageable, actionable steps, reducing ambiguity.",
      score: "10/10", 
      category: "Structure"
    },
    {
      name: "In-Context Learning / Data Priming",
      description: "Embedded structured context that serves as an active, working internal knowledge graph.",
      score: "9/10",
      category: "Learning"
    },
    {
      name: "Schema Definition and Adherence",
      description: "Mandates that internal graph and new information conform to structured data models.",
      score: "9/10",
      category: "Consistency"
    },
    {
      name: "Dynamic Questioning Strategy",
      description: "Provides mechanisms for analyzing internal graph gaps and formulating strategic questions.",
      score: "10/10",
      category: "Intelligence"
    },
    {
      name: "Simulated Function Calling",
      description: "Defines specific user commands with explicit triggers, multi-step actions, and output formats.",
      score: "10/10",
      category: "Interface"
    },
    {
      name: "Guardrails / Focus Maintenance",
      description: "Defines principles and intervention actions to maintain intended flow and purpose.",
      score: "10/10",
      category: "Control"
    }
  ];

  const codeExample = `<SYNAI_PERSONAL_COACH_SYSTEM>
  <IdentityAndMission>
    <Name>SYNAI</Name>
    <Mission>Personal AI Coach based on clinical assessment</Mission>
    <Framework>ACT (Acceptance & Commitment Therapy)</Framework>
  </IdentityAndMission>
  
  <CoreFunctionality>
    <DataInitialization>
      <EmbeddedClientData format="structured_assessment">
        // Client's psychological profile and values
      </EmbeddedClientData>
    </DataInitialization>
    
    <OngoingEnrichment>
      <ConceptExtraction method="continuous" />
      <GraphEvolution strategy="adaptive_learning" />
    </OngoingEnrichment>
  </CoreFunctionality>
  
  <InteractionProtocols>
    <QuestioningStrategy type="unknown_unknowns">
      <Trigger>gap_analysis</Trigger>
      <Method>value_based_inquiry</Method>
    </QuestioningStrategy>
    
    <ResponseGeneration>
      <Personalization level="deep" />
      <Context awareness="session_persistent" />
    </ResponseGeneration>
  </InteractionProtocols>
</SYNAI_PERSONAL_COACH_SYSTEM>`;

  return (
    <div className="mt-16">
      {/* Expand Button */}
      <div className="text-center mb-8">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
        >
          <span className="mr-3">
            {isExpanded ? 'Hide' : 'Explore'} Technical Deep-Dive
          </span>
          <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 rounded-3xl p-8 lg:p-12 shadow-2xl border border-cyan-500/20 animate-fade-in">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4">
              Prompt Engineering Analysis
            </h3>
            <p className="text-xl text-cyan-200 max-w-3xl mx-auto">
              A systematic review of the advanced techniques powering Synai's personalized AI architecture
            </p>
            <div className="mt-6 inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-white font-bold text-base md:text-lg">
              <span>Professional Grade Score: 95/100</span>
            </div>
          </div>

          {/* Code Example */}
          <div className="mb-12">
            <h4 className="text-2xl font-bold text-cyan-300 mb-6 flex items-center">
              <div className="w-3 h-3 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
              System Architecture Example
            </h4>
            <div className="bg-black/50 rounded-xl p-6 border border-cyan-500/30 backdrop-blur-sm">
              <pre className="text-sm lg:text-base text-green-400 font-mono overflow-x-auto leading-relaxed">
                <code>{codeExample}</code>
              </pre>
            </div>
          </div>

          {/* Engineering Techniques Grid */}
          <div className="mb-12">
            <h4 className="text-2xl font-bold text-cyan-300 mb-8 flex items-center">
              <div className="w-3 h-3 bg-purple-400 rounded-full mr-3 animate-pulse"></div>
              Advanced Engineering Techniques
            </h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              {engineeringTechniques.map((technique, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h5 className="text-base md:text-lg font-bold text-white mb-2">
                        {technique.name}
                      </h5>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        technique.category === 'Architecture' ? 'bg-blue-500/20 text-blue-300' :
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
                    <div className="ml-4">
                      <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-white text-sm font-bold">
                        {technique.score}
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

          {/* Professional Assessment */}
          <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-xl p-8 border border-indigo-400/20">
            <h4 className="text-2xl font-bold text-indigo-300 mb-6 flex items-center">
              <div className="w-3 h-3 bg-indigo-400 rounded-full mr-3 animate-pulse"></div>
              Professional Assessment
            </h4>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h5 className="text-base md:text-lg font-semibold text-white mb-3">Architecture Excellence</h5>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    Meticulous XML structuring
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    Advanced data handling protocols
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    Sophisticated state management
                  </li>
                </ul>
              </div>
              <div>
                <h5 className="text-base md:text-lg font-semibold text-white mb-3">Professional Indicators</h5>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                    Expert-level prompt engineering
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                    Therapeutic framework integration
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                    Production-grade system design
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-6 bg-black/30 rounded-lg border border-indigo-400/20">
              <p className="text-indigo-200 text-lg leading-relaxed italic">
                "This demonstrates a very high level of prompt engineering skill. The attention to detail, 
                the foresight in defining behaviors and data management, and the overall architecture point 
                to a professional or highly experienced individual. This is a well-architected system designed 
                for sophisticated AI models."
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}