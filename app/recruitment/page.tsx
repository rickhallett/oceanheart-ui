'use client';

import React, { useState } from 'react';

// --- Data from previous analysis (copied from cxo.html) ---
const candidatesData = [
  // Top Tier
  { rank: 1, name: "Ayshe Ibrahim", country: "UK (London)", tel: "07957 490638", email: "ayseosteo@gmail.com", linkedIn: "Searchable", overview: "Highly motivated and enthusiastic Osteopath with over 23 years of clinical and entrepreneurial experience... founder and director... As a heart-led leader and Sufi student, I bring a spiritual and intuitive approach... building bridges between science, spirituality and service.", weightedScore: 51, cultureFit: 9, seniority: 7, healthcareYrs: 10, overallFit: 9.5, greenFlags: ["holistic care, and business leadership", "heart-led leader and Sufi student", "spiritual and intuitive approach", "experience with diverse cultural communities", "building bridges between science, spirituality and service", "Strategic leadership & healthcare entrepreneurship", "Spirituality, Sufi teachings, and embodied leadership"], redFlags: ["Less explicit strategic *design* focus across diverse stakeholder journeys (more clinical/own business leadership)."] },
  { rank: 2, name: "Peter Nsanze", country: "UK", tel: "+447833230739", email: "peternsanze@gmail.com", linkedIn: "https://www.linkedin.com/in/peternsanze", overview: "Peter is a strategic designer renowned for his ability to guide teams towards realising an improved product, service, or business vision... shaping the future trajectory of an ecosystem... seamless overall customer experience, and fostering a culture of continuous enhancement... advocates for user-centred design principles... ardent proponent of system thinking, design systems and frameworks.", weightedScore: 42, cultureFit: 8, seniority: 9, healthcareYrs: 0, overallFit: 8.5, greenFlags: ["strategic designer", "guide teams towards realising an improved product, service, or business vision", "seamless overall customer experience", "fostering a culture of continuous enhancement", "user-centred design principles", "system thinking, design systems and frameworks", "Chief Experience Officer (Current Role)"], redFlags: ["Complete lack of healthcare/wellness sector experience."] },
  { rank: 3, name: "Marco Colombo", country: "UK (London)", tel: "+44 750 881 8608", email: "clmb.marco@gmail.com", linkedIn: "https://www.linkedin.com/in/marcoclmb", overview: "1. a service and behaviour designer specialised in learning experiences and attitudinal change; 2. an expert of the human and behavioural side of data science... 3. a well-rounded, creative human being, with a strong passion for social change and mentoring. Mission: Help people and drive social change through memorable and engaging experiences.", weightedScore: 41, cultureFit: 8, seniority: 8, healthcareYrs: 1, overallFit: 8.0, greenFlags: ["service and behaviour designer", "expert of the human and behavioural side", "passion for social change and mentoring", "memorable and engaging experiences", "Integrity & authenticity", "Empathy & compassion", "Service design", "User research", "user-centric"], redFlags: ["Limited direct healthcare experience.", "Gamification skill needs careful alignment."] },
  { rank: 4, name: "Christopher Tacca, PHD", country: "UK (Southampton)", tel: "+44 07450 814462", email: "tacca.chris@gmail.com", linkedIn: "https://linkedin.com/in/christophertacca/", overview: "Health and wellness technology innovator with experience leading VR and AR immersive health technology projects... Passionate about putting the human first in design and using technology to help people live happier and healthier lives.", weightedScore: 46, cultureFit: 9, seniority: 6, healthcareYrs: 7, overallFit: 8.0, greenFlags: ["Health and wellness technology innovator", "leading VR and AR immersive health technology projects", "startup space", "Passionate about putting the human first in design", "using technology to help people live happier and healthier lives", "Research Fellow in HCI for Wellbeing Technology", "Drive human-centred research and development", "focused on user experience", "Mental Health Technology Expert Consultant", "deeper therapeutic engagement"], redFlags: ["Experience weighted towards R&D/academic/tech dev, less clear evidence of setting broad *corporate* CX/EX strategy across *all* touchpoints."] },
  { rank: 5, name: "Hamid Hafeez", country: "UK (Manchester)", tel: "07988849219", email: "hamid.hfz@gmail.com", linkedIn: "Via References", overview: "I am a practitioner with 15 years of experience crafting impactful, user-centered solutions that align with business goals. I research, I design, I test, I validate and deliver... honed my ability to adapt, lead, and deliver value... Whether hands on, or off - I get results.", weightedScore: 42, cultureFit: 8, seniority: 9, healthcareYrs: 0, overallFit: 7.5, greenFlags: ["15 years of experience", "crafting impactful, user-centered solutions", "I research, I design, I test, I validate and deliver", "adapt, lead, and deliver value", "UX + PRODUCT DESIGN + SERVICE + STRATEGY", "Leadership and mentoring", "Stakeholder Management", "Value propositioning", "Responsible for end-to-end", "Built and scaled research and design operations"], redFlags: ["Lack of healthcare/wellness industry experience.", "Focus on UX/Product in SaaS/tech might be narrower than holistic CXO."] },
  { rank: 6, name: "Dea Kacorri", country: "UK (London)", tel: "(+44) 07864212381", email: "d.kacorri@gmail.com", linkedIn: "Check CV Header", overview: "I'm a Design Strategy leader with over 14 years of experience helping organisations transform how they work and connect with people... expertise lies in using Design Thinking philosophies alongside ethnographic research... passionate about bringing people together, aligning diverse perspectives...", weightedScore: 43, cultureFit: 7, seniority: 9, healthcareYrs: 4, overallFit: 7.0, greenFlags: ["Design Strategy leader", "connect with people", "driving meaningful, sustainable change", "Design Thinking", "ethnographic research", "uncover real, unarticulated human needs", "align business goals with everyday experiences", "collaboration is key", "bringing people together, aligning diverse perspectives", "champion Design excellence", "create transformative experiences", "Service Design, Research, User Experience, Product, Innovation and Organisational Design"], redFlags: ["Less explicit alignment with deeper values/spirituality.", "Healthcare is one sector among many."] },
  { rank: 7, name: "Moinuddin Bhuiyan", country: "UK (London)", tel: "+447751856099", email: "bhuiyan.moin@gmail.com", linkedIn: "https://linkedin.com/in/moinb", overview: "Multilingual UX leader with over 18 years... including 9+ years of impactful leadership... setting long-term strategic visons... driving innovation. A practitioner of user-centred design... I adopt a data-informed, contextual approach...", weightedScore: 40, cultureFit: 7, seniority: 9, healthcareYrs: 1, overallFit: 6.5, greenFlags: ["UX leader", "impactful leadership experience", "setting long-term strategic visons", "driving innovation", "practitioner of user-centred design", "interdisciplinary, cross-cultural experiences", "data-informed, contextual approach", "Advisor/Lead, User Research and Service Design", "digital healthcare startup", "Head of Service Design & UX", "Built, coached, and led a 10-member multidisciplinary team", "elevating user research as a strategic asset"], redFlags: ["Bulk of deep experience is within the Telecoms industry, healthcare is recent/advisory.", "UX/Research focus potentially narrower than holistic CXO."] },
  { rank: 8, name: "Natasha Junejo", country: "UK", tel: "Not Provided", email: "Check CV Header", linkedIn: "Check CV Header", overview: "Highly motivated professional committed to creating access and opportunity in literature, education, and the arts. Strong communicator and creative campaigner... leading and delivering complex global projects... Interested in social action, advocacy, human rights, and ED&I...", weightedScore: 36, cultureFit: 8, seniority: 6, healthcareYrs: 0, overallFit: 5.5, greenFlags: ["creating access and opportunity", "Strong communicator and creative campaigner", "leading and delivering complex global projects", "social action, advocacy, human rights, and ED&I", "ED&I Strategy Development", "Speaker/Chair", "Communications", "Civic Engagement & Social Action", "move towards conscious social change", "Managing high profile online communities", "Building partnerships"], redFlags: ["No direct CX/UX/EX *design strategy* experience in corporate/product context.", "No healthcare/wellness industry experience.", "Significant role mismatch for CXO design focus."] },
  // Mid/Lower Tier
  { rank: 9, name: "Ola Bayoji", country: "UK (Rochester)", tel: "+44 7903 085610", email: "hi@olabayoji.com", linkedIn: "https://www.linkedin.com/in/olabayoji", overview: "Transformational business leader with 10+ years... directing organisational change and digital innovation... architecting customer-centric business transformations...", weightedScore: 34, cultureFit: 6, seniority: 8, healthcareYrs: 0, overallFit: 5.0, greenFlags: ["Transformational business leader", "architecting customer-centric business transformations", "Leading cross-functional teams", "Spearheading global CX transformation", "focusing on customer-centric outcomes", "Customer Success Manager"], redFlags: ["Strong focus on Ops/Partnerships/P&L. Less on holistic *design*.", "No healthcare.", "Meta background could be cultural question mark."] },
  { rank: 10, name: "Dave Pollard", country: "UK (Coventry)", tel: "07983400623", email: "DAVEKPOLLARD@GMAIL.COM", linkedIn: "Not Provided", overview: "An experienced Customer Experience specialist from a marketing background... firm believer in customer centricity... experience developing customer strategy and value propositions...", weightedScore: 32, cultureFit: 6, seniority: 7, healthcareYrs: 0, overallFit: 4.5, greenFlags: ["Customer Experience specialist", "firm believer in customer centricity", "developing customer strategy", "bring customer journeys to life", "Customer Insight", "Voice of the customer program"], redFlags: ["Strong focus purely on CX (less EX/UX integration evident).", "No healthcare.", "Marketing background prominent."] },
  { rank: 11, name: "Jessica Burn", country: "UK", tel: "Not Provided", email: "jburn026@gmail.com", linkedIn: "https://www.linkedin.com/in/jessica-burn-ux", overview: "A strategic and analytical UX Researcher with close to 6 years of leading research projects in cross functional teams...", weightedScore: 32, cultureFit: 6, seniority: 6, healthcareYrs: 2, overallFit: 4.0, greenFlags: ["strategic and analytical UX Researcher", "leading research projects", "cross functional teams", "storyteller to influence key decision-making", "Collaborative", "Stakeholder management", "Leadership: Managing multiple research streams", "Educating stakeholders on value of UX"], redFlags: ["Heavily focused on *research* not *strategy/design*.", "Less leadership experience.", "Limited healthcare."] },
  { rank: 12, name: "Shiffali Razdan", country: "UK (London)", tel: "+447473268198", email: "shiffali.razdan1@gmail.com", linkedIn: "Not Provided", overview: "Experienced manager and consultant with background in government/public sector consulting, investment analysis, business development...", weightedScore: 28, cultureFit: 4, seniority: 7, healthcareYrs: 2, overallFit: 3.0, greenFlags: ["carrying out analytics, valuations and modelling", "Liased with senior government officials", "Implemented strategy, business development and investment monitoring"], redFlags: ["Focus on finance, investment, policy, consulting.", "Little evidence of experience *design*.", "Major role mismatch."] },
  { rank: 13, name: "Jiten Mistry (Jit)", country: "UK", tel: "07732068201", email: "JitenMistry@hotmail.co.uk", linkedIn: "Searchable", overview: "An experienced... revenue/commercial and operations leader... skills across... Operations and Enablement, Revenue, Commercial..., Analytics...", weightedScore: 30, cultureFit: 5, seniority: 7, healthcareYrs: 1, overallFit: 3.0, greenFlags: ["personable revenue/commercial and operations leader", "collaborate with and influence stakeholders (including C-Level)", "leader of teams", "good communicator, strategic", "Being customer centric"], redFlags: ["Heavy focus on RevOps/SalesOps/BI/Finance.", "No design experience.", "Major role mismatch."] },
  { rank: 14, name: "Chantelle Gillespie", country: "UK", tel: "07415 111 557", email: "CHANTELLEGILLESPIE@ICLOUD.COM", linkedIn: "Not Provided", overview: "Experienced professional with skills in content creation, EDI strategy, stakeholder management... primarily within a Building Society context...", weightedScore: 28, cultureFit: 6, seniority: 5, healthcareYrs: 0, overallFit: 2.5, greenFlags: ["passion for high quality content creation", "all things EDI", "Strong interpersonal and communication skills", "Leading on the creation and development of the first EDI Strategy", "Regular engagement with senior stakeholders"], redFlags: ["No CX/UX/EX design strategy experience.", "Wrong industry.", "Less seniority.", "Major role mismatch."] },
  { rank: 15, name: "Marcus Seaton", country: "UK (Glasgow)", tel: "07770 976642", email: "Marcus.Seaton1@gmail.com", linkedIn: "Check CV Header", overview: "I'm a dynamic and results-driven director experienced in leading SaaS sales, operations, e-commerce and strategy...", weightedScore: 30, cultureFit: 4, seniority: 8, healthcareYrs: 2, overallFit: 2.5, greenFlags: ["experienced in leading SaaS sales, operations, e-commerce and strategy", "building high-performing teams", "Led cross functional collaborations", "Developed team and individual sales enablement strategies"], redFlags: ["Overwhelming focus on Sales/Ops/Revenue/P&L.", "No design focus.", "Major role mismatch."] },
  { rank: 16, name: "Milad Kh", country: "UK (London)", tel: "Not Provided", email: "Mkhodkameh.ibs@gmail.com", linkedIn: "Not Provided", overview: "As a Creative Director with over ten years of experience in events and marketing management... planning and executing high-impact events and marketing campaigns...", weightedScore: 29, cultureFit: 5, seniority: 7, healthcareYrs: 0, overallFit: 2.0, greenFlags: ["Creative Director", "developing strategic marketing plans", "leading cross-functional teams", "create compelling visual content", "oversee cohesive brand storytelling", "crafting memorable experiences"], redFlags: ["Focus on Marketing/Events/Visuals.", "Not strategic CX/EX/UX design.", "Wrong industry.", "Major role mismatch."] },
  { rank: 17, name: "Sufyaan Makda", country: "UK (Blackburn)", tel: "07900793924", email: "Sufyaan.makda@gmail.com", linkedIn: "Not Provided", overview: "I believe success comes from hard work... excel at building partnerships, strengthening client relationships... experience in project management, I have strong leadership skills...", weightedScore: 27, cultureFit: 5, seniority: 6, healthcareYrs: 0, overallFit: 1.5, greenFlags: ["building partnerships, strengthening client relationships", "strong leadership skills, motivating teams", "Adaptable and resilient", "Strong relationship management skills", "Experienced working with individuals from diverse backgrounds", "Strong leadership and management capabilities"], redFlags: ["Heavy Ops/Manufacturing/Project Management focus.", "No design.", "Wrong industry.", "Major role mismatch."] },
  { rank: 18, name: "Ghada White", country: "UK (Lichfield)", tel: "+4407765 995900", email: "ghada.white@icloud.com", linkedIn: "Not Provided", overview: "Results-driven Business Development Manager with over 20 years of experience in B2B sales, stakeholder management, and logistics...", weightedScore: 23, cultureFit: 3, seniority: 7, healthcareYrs: 0, overallFit: 1.0, greenFlags: ["stakeholder management", "develop profitable client relationships", "Leadership & communication skills", "Stakeholder Engagement"], redFlags: ["Overwhelming Sales/BD/Logistics focus.", "No mention of CX/UX/EX design or strategy.", "No experience in healthcare/wellness/tech sectors.", "Major role mismatch."] }
];

type Candidate = typeof candidatesData[0];

// --- React Component Definitions ---

const FlagList = ({ flags, type }: { flags: string[], type: 'green' | 'red' }) => (
  <ul className="list-none p-0 m-0 text-xs">
    {flags.map((flag, index) => (
      <li key={index} className="mb-1 leading-tight">
        {type === 'green' ? (
          <span className="text-cyan-500 font-medium whitespace-normal break-words">✅ {flag}</span>
        ) : (
          <span className="text-pink-600 italic whitespace-normal break-words">❌ {flag}</span>
        )}
      </li>
    ))}
  </ul>
);

// Updated CandidateRow props
interface CandidateRowProps {
  candidate: Candidate;
  isExpanded: boolean;
  onToggleExpand: (rank: number) => void;
}

const CandidateRow = ({ candidate, isExpanded, onToggleExpand }: CandidateRowProps) => {
  const { rank, name, country, tel, email, linkedIn, overview, weightedScore, cultureFit, seniority, healthcareYrs, overallFit, greenFlags, redFlags } = candidate;

  const getScoreClass = (score: number | undefined) => {
    const roundedScore = Math.max(0, Math.min(10, Math.round(score || 0)));
    if (roundedScore >= 8) return 'bg-cyan-800/80';
    if (roundedScore >= 5) return 'bg-yellow-700/80';
    return 'bg-pink-800/80';
  };

  const getWeightedScoreClass = (score: number | undefined) => {
    const scoreValue = score || 0;
    if (scoreValue >= 40) return 'bg-cyan-800/80 font-bold';
    if (scoreValue >= 25) return 'bg-yellow-700/80';
    return 'bg-pink-800/80';
  };

  const linkedInElement = linkedIn && linkedIn !== "Searchable" && linkedIn !== "Via References" && linkedIn !== "Check CV Header" && linkedIn !== "Not Provided"
    ? <a href={linkedIn.startsWith('http') ? linkedIn : `https://${linkedIn}`} target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:text-cyan-400 underline">Profile</a>
    : <em className="text-gray-400">{linkedIn || 'Not Provided'}</em>;

  const totalColumns = 11;

  return (
    <React.Fragment>
      {/* Main visible row (clickable) */}
      <tr
        className="bg-purple-950/80 even:bg-purple-900/80 hover:bg-pink-900/80 text-gray-200 cursor-pointer"
        onClick={() => onToggleExpand(rank)} // Use handler from props
      >
        <td className={`rank-cell text-center font-bold text-sm border border-purple-700 p-2 align-top ${getScoreClass(overallFit)}`}>{rank}</td>
        <td className="border border-purple-700 p-2 align-top text-xs">{name}</td>
        <td className="contact-info text-xs whitespace-nowrap border border-purple-700 p-2 align-top">
          {country}<br />
          T: {tel || 'N/A'}<br />
          E: {email || 'N/A'}<br />
          L: {linkedInElement}
        </td>
        <td className="overview text-xs max-w-sm whitespace-normal leading-snug border border-purple-700 p-2 align-top hidden md:table-cell">{overview}</td>
        <td className={`border border-purple-700 p-2 align-top text-xs hidden md:table-cell ${getWeightedScoreClass(weightedScore)}`}>{weightedScore}</td>
        <td className={`border border-purple-700 p-2 align-top text-xs hidden md:table-cell ${getScoreClass(cultureFit)}`}>{cultureFit}</td>
        <td className={`border border-purple-700 p-2 align-top text-xs hidden md:table-cell ${getScoreClass(seniority)}`}>{seniority}</td>
        <td className={`border border-purple-700 p-2 align-top text-xs hidden md:table-cell ${getScoreClass(healthcareYrs)}`}>{healthcareYrs}</td>
        <td className={`border border-purple-700 p-2 align-top text-xs hidden md:table-cell ${getScoreClass(overallFit)}`}>{overallFit}</td>
        <td className="border border-purple-700 p-2 align-top hidden md:table-cell"><FlagList flags={greenFlags} type="green" /></td>
        <td className="border border-purple-700 p-2 align-top hidden md:table-cell"><FlagList flags={redFlags} type="red" /></td>
      </tr>

      {/* Collapsible row for details */}
      {/* Use isExpanded prop to determine visibility */}
      {isExpanded && (
        <tr className="bg-purple-800/90">
          <td colSpan={totalColumns} className="p-2 border border-purple-700 border-t-0">
            <div className="md:hidden max-w-[80vw]">
              <h4 className="text-xs font-semibold text-cyan-400 mb-1">Overview:</h4>
              <p className="text-xs mb-2 whitespace-normal leading-snug">{overview}</p>

              <div className="flex flex-col gap-2 space-y-1 mb-2 text-xs">
                <div><span className="font-semibold text-cyan-400 w-24 inline-block">Overall Fit:</span> <span className={`p-1 rounded ${getScoreClass(overallFit)}`}>{overallFit}</span></div>
                <div><span className="font-semibold text-cyan-400 w-24 inline-block">Weighted Score:</span> <span className={`p-1 rounded ${getWeightedScoreClass(weightedScore)}`}>{weightedScore}</span></div>
                <div><span className="font-semibold text-cyan-400 w-24 inline-block">Culture Fit:</span> <span className={`p-1 rounded ${getScoreClass(cultureFit)}`}>{cultureFit}</span></div>
                <div><span className="font-semibold text-cyan-400 w-24 inline-block">Seniority:</span> <span className={`p-1 rounded ${getScoreClass(seniority)}`}>{seniority}</span></div>
                <div><span className="font-semibold text-cyan-400 w-24 inline-block">Health Yrs:</span> <span className={`p-1 rounded ${getScoreClass(healthcareYrs)}`}>{healthcareYrs}</span></div>
              </div>

              <div className="mb-2">
                <h4 className="text-xs font-semibold text-cyan-400 mb-1">Green Flags:</h4>
                <FlagList flags={greenFlags} type="green" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-cyan-400 mb-1">Red Flags:</h4>
                <FlagList flags={redFlags} type="red" />
              </div>
            </div>
            <div className="hidden md:block text-center text-gray-500 text-xs italic">
              (Details shown in main columns)
            </div>
          </td>
        </tr>
      )}
    </React.Fragment>
  );
};

const RecruitmentPage = () => {
  // State to track the currently expanded row rank
  const [expandedRank, setExpandedRank] = useState<number | null>(null);

  // Handler to toggle the expanded state
  const handleToggleExpand = (rank: number) => {
    setExpandedRank(prevRank => (prevRank === rank ? null : rank));
  };

  return (
    <div className="m-3 md:m-5 font-sans leading-relaxed from-gray-950 to-purple-950 text-gray-300 p-1 rounded-lg">
      <h1 className="text-center text-cyan-500 mb-8 text-3xl font-bold tracking-wider">CXO Candidate Compatibility Matrix</h1>
      <p className="text-center text-gray-400 mb-8 text-sm">
        This is a list of candidates that we have reviewed for the CXO role.
        The scores are based on a combination of their skills, experience, and cultural fit.
        The candidates are ranked by their overall fit score.
      </p>
      <p className="text-center text-gray-400 mb-8 text-sm">Click on a candidate to view their details.</p>

      <div className="overflow-x-auto shadow-lg shadow-purple-500/20 rounded-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-purple-800/90 text-cyan-400">
              <th className="border border-purple-700 p-2 text-left align-top text-xs font-bold whitespace-nowrap uppercase tracking-wider">Rank</th>
              <th className="border border-purple-700 p-2 text-left align-top text-xs font-bold whitespace-nowrap uppercase tracking-wider">Name</th>
              <th className="border border-purple-700 p-2 text-left align-top text-xs font-bold whitespace-nowrap uppercase tracking-wider">Contact</th>
              <th className="border border-purple-700 p-2 text-left align-top text-xs font-bold whitespace-nowrap uppercase tracking-wider hidden md:table-cell">Overview</th>
              <th className="border border-purple-700 p-2 text-left align-top text-xs font-bold whitespace-nowrap uppercase tracking-wider hidden md:table-cell">Score (/60)</th>
              <th className="border border-purple-700 p-2 text-left align-top text-xs font-bold whitespace-nowrap uppercase tracking-wider hidden md:table-cell">Culture (/10)</th>
              <th className="border border-purple-700 p-2 text-left align-top text-xs font-bold whitespace-nowrap uppercase tracking-wider hidden md:table-cell">Seniority (/10)</th>
              <th className="border border-purple-700 p-2 text-left align-top text-xs font-bold whitespace-nowrap uppercase tracking-wider hidden md:table-cell">Health Yrs (/10)</th>
              <th className="border border-purple-700 p-2 text-left align-top text-xs font-bold whitespace-nowrap uppercase tracking-wider hidden md:table-cell">Overall (/10)</th>
              <th className="border border-purple-700 p-2 text-left align-top text-xs font-bold whitespace-nowrap uppercase tracking-wider hidden md:table-cell">Green Flags</th>
              <th className="border border-purple-700 p-2 text-left align-top text-xs font-bold whitespace-nowrap uppercase tracking-wider hidden md:table-cell">Red Flags</th>
            </tr>
          </thead>
          <tbody>
            {candidatesData.map(candidate => (
              // Pass down relevant props
              <CandidateRow
                key={candidate.rank}
                candidate={candidate}
                isExpanded={expandedRank === candidate.rank}
                onToggleExpand={handleToggleExpand}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecruitmentPage;