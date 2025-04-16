"use client"; // This page requires client-side interactivity

import { useState, useEffect, useRef, useCallback, useMemo, MouseEvent } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaArrowLeft } from "react-icons/fa";
// Import new components
import RoleSection from '../../components/team/RoleSection';

// --- Interfaces (keep as defined in Iteration 1) ---
export interface RoleDetail { // Export for use in components
  id: string; // Unique identifier for the role (e.g., 'eng-lead')
  title?: string;
  advisorTitle?: string;
  description: string;
  advisorDescription?: string;
  isPureAdvisor?: boolean;
  isAlliance?: boolean;
  reportsTo?: string[]; // IDs of roles this role reports to
  // Placeholder for connection point calculation
  connectionPoint?: { x: number; y: number };
}

export interface Section { // Export for use in components
  level: string;
  description?: string;
  roles: RoleDetail[];
  id: string;
}

// --- Data Structure (keep as defined in Iteration 1) ---
const leadershipStructure: Section[] = [
  // ... (same data structure)
  {
    id: 'leadership',
    level: 'Leadership & Strategy',
    roles: [
      {
        id: 'ceo',
        title: 'CEO (Chief Executive Officer)',
        advisorTitle: 'Senior Advisor (Strategic Vision)',
        description: 'Leads overall vision, strategy, and execution. Represents the company, drives growth, and fosters culture.',
        advisorDescription: 'Offers perspective on overall direction, mission, and long-term goals. Acts as a sounding board for strategic choices.'
      },
    ],
  },
  {
    id: 'operations',
    level: 'Core Operations & Execution',
    roles: [
      { id: 'coo', title: 'COO', reportsTo: ['ceo'], advisorTitle: 'Advisor (Operational Efficiency)', description: 'Oversees daily operations, ensuring efficiency and execution.', advisorDescription: 'Shares insights on improving processes and efficiency.' },
      { id: 'cfo', title: 'CFO', reportsTo: ['ceo'], advisorTitle: 'Senior Advisor (Financial Perspective)', description: 'Manages financial strategy, planning, reporting, and risk.', advisorDescription: 'Lends financial acumen, offering perspective on fiscal matters.' },
      { id: 'cto', title: 'CTO', reportsTo: ['ceo'], advisorTitle: 'Advisor (Technology Insight)', description: 'Drives technology strategy, innovation, and development.', advisorDescription: 'Shares knowledge of tech trends and development practices.' },
      { id: 'cpo-prod', title: 'CPO (Product)', reportsTo: ['ceo'], advisorTitle: 'Advisor (Product Strategy)', description: 'Owns product vision, strategy, and roadmap.', advisorDescription: 'Provides perspective on user needs, market fit, and product direction.' },
      { id: 'cro-cgo', title: 'CRO/CGO', reportsTo: ['ceo'], advisorTitle: 'Advisor (Revenue Growth Perspective)', description: 'Oversees revenue generation, aligning sales, marketing, etc.', advisorDescription: 'Shares insights on growth strategies and market opportunities.' },
    ],
  },
  {
    id: 'specialized',
    level: 'Specialized Functions & Expertise',
    roles: [
      { id: 'eng-lead', title: 'Lead Engineer', reportsTo: ['cto'], description: 'Oversees the engineering team, ensuring technical excellence and project delivery.', advisorDescription: 'Provides technical guidance and mentorship.' },
      { id: 'frontend-dev', title: 'Frontend Developer', reportsTo: ['eng-lead'], description: 'Builds the user interface using modern web technologies.', advisorDescription: 'Focuses on usability and performance.' },
      { id: 'backend-dev', title: 'Backend Developer', reportsTo: ['eng-lead'], description: 'Manages server-side logic, APIs, and database interactions.', advisorDescription: 'Ensures scalability and security.' },
      { id: 'qa-engineer', title: 'QA Engineer', reportsTo: ['eng-lead'], description: 'Ensures software quality through rigorous testing procedures.', advisorDescription: 'Champions quality across the development lifecycle.' },
      { id: 'ux-designer', title: 'UX/UI Designer', reportsTo: ['cpo-prod'], description: 'Designs intuitive and visually appealing user experiences.', advisorDescription: 'Advocates for user-centered design principles.' },
      { id: 'caio', title: 'CAIO', reportsTo: ['cto'], advisorTitle: 'Advisor (AI Strategy & Ethics)', description: 'Leads AI strategy, development, implementation, and ethics.', advisorDescription: 'Offers perspective on AI applications and responsible use.' },
      { id: 'clo-learn', title: 'CLO (Learning)', reportsTo: ['coo'], advisorTitle: 'Advisor (Learning & Development)', description: 'Leads strategy for employee learning and skills development.', advisorDescription: 'Shares insights on effective training and continuous learning.' },
      { id: 'cxo', title: 'CXO', reportsTo: ['coo'], advisorTitle: 'Advisor (Holistic Experience)', description: 'Oversees holistic stakeholder experiences (Customer, Employee, User).', advisorDescription: 'Provides perspective on creating positive, people-centered experiences.' },
      { id: 'ciso', title: 'CISO', reportsTo: ['cto'], advisorTitle: 'Advisor (Info Security Insight)', description: 'Leads cybersecurity strategy and protects information assets.', advisorDescription: 'Helps consider best practices for protecting information.' },
      { id: 'clo-legal', title: 'CLO/CCO (Legal/Compliance)', reportsTo: ['ceo'], advisorTitle: 'Senior Advisor (Legal Perspective)', description: 'Manages legal affairs, compliance, and risk.', advisorDescription: 'Draws upon legal experience to offer perspective on potential legal considerations.' },
      { id: 'cmo', title: 'CMO', reportsTo: ['cro-cgo'], advisorTitle: 'Advisor (Marketing & Brand Strategy)', description: 'Leads marketing, branding, and communication efforts.', advisorDescription: 'Acts as a sounding board for marketing and brand ideas.' },
      { id: 'chro-people', title: 'CHRO/CPO (People)', reportsTo: ['coo'], advisorTitle: 'Advisor (People & Culture)', description: 'Oversees HR, talent, culture, and employee experience.', advisorDescription: 'Shares wisdom on fostering a positive workplace culture.' },
    ],
  },
  {
    id: 'advisory',
    level: 'Senior Advisory Circle',
    description: 'Individuals primarily offering perspective and guidance based on deep experience, often with minimal operational involvement.',
    roles: [
      {
        id: 'advisor-legal',
        advisorTitle: 'Senior Advisor (Legal Perspective)',
        description: 'Draws upon decades of invaluable experience as a solicitor, providing seasoned guidance and perspective to the team. Helps us navigate considerations with thoughtfulness and care.',
        isPureAdvisor: true
      },
    ],
  },
  {
    id: 'alliance',
    level: 'OceanHeart Wellbeing Alliance',
    description: 'A network of external professionals and ambassadors aligned with our mission, equipped through training to support and advocate for our human-centered approach.',
    roles: [
      {
        id: 'alliance-member',
        title: 'Wellbeing Alliance Member / Ambassador',
        description: 'Joins a community dedicated to advancing human-centered approaches to wellbeing in the age of AI. Members support our mission and champion effective and ethical human-AI interaction.',
        isAlliance: true
      },
    ],
  },
];

// Helper to flatten roles for easier lookup
const allRoles = leadershipStructure.flatMap(section => section.roles);
export const rolesById = new Map(allRoles.map(role => [role.id, role]));

const TeamPage = () => {
  // State for sidebar (same as before)
  const [selectedRole, setSelectedRole] = useState<RoleDetail | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [rolePositions, setRolePositions] = useState<Record<string, { x: number; y: number }>>({});
  const roleRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the main container
  const [hoveredRoleId, setHoveredRoleId] = useState<string | null>(null);

  // Function to update role positions
  const updatePositions = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newPositions: Record<string, { x: number; y: number }> = {};
    allRoles.forEach(role => {
      const element = roleRefs.current[role.id];
      if (element) {
        const rect = element.getBoundingClientRect();
        // Calculate center position relative to the containerRef
        newPositions[role.id] = {
          // Center X: element's left edge relative to container + half element width
          x: rect.left - containerRect.left + rect.width / 2,
          // Center Y: element's top edge relative to container + half element height
          y: rect.top - containerRect.top + rect.height / 2,
        };
      }
    });
    setRolePositions(prevPositions => {
      // Basic check to prevent unnecessary updates if positions haven't changed significantly
      if (JSON.stringify(prevPositions) === JSON.stringify(newPositions)) {
        return prevPositions;
      }
      return newPositions;
    });
  }, []); // Removed containerRef from dependencies as it's stable

  // Calculate positions on mount and window resize
  useEffect(() => {
    // Initial calculation might need a slight delay if grid layout takes time
    const timeoutId = setTimeout(updatePositions, 50);
    window.addEventListener('resize', updatePositions);

    // Use ResizeObserver for the container for more robust updates
    let resizeObserver: ResizeObserver;
    const containerElement = containerRef.current;
    if (containerElement) {
      resizeObserver = new ResizeObserver(() => {
        // Debounce or throttle updates if needed
        updatePositions();
      });
      resizeObserver.observe(containerElement);
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updatePositions);
      if (resizeObserver && containerElement) {
        resizeObserver.unobserve(containerElement);
      }
    };
  }, [updatePositions]);

  // Handlers (same as before)
  const handleSelectRole = (role: RoleDetail) => {
    console.log("handleSelectRole called:", role.id);
    setSelectedRole(role);
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
    setTimeout(() => setSelectedRole(null), 300);
  };

  // --- NEW: Container Hover Handlers ---
  const handleContainerMouseOver = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    // Find the closest parent (or self) with the data-role-id attribute
    const cardElement = target.closest<HTMLDivElement>('[data-role-id]');
    const roleId = cardElement?.dataset.roleId || null;

    // Only update state if the hovered role ID actually changes
    if (roleId !== hoveredRoleId) {
      // console.log("Container Mouse Over - Role ID:", roleId); // Keep for debugging if needed
      setHoveredRoleId(roleId);
    }
  };

  const handleContainerMouseLeave = () => {
    // console.log("Container Mouse Leave"); // Keep for debugging if needed
    setHoveredRoleId(null); // Clear hover when leaving the container
  };

  // Connection Logic (keep as is, depends on hoveredRoleId and rolePositions)
  const connections = useMemo(() => {
    if (!hoveredRoleId || !rolePositions[hoveredRoleId]) {
      return [];
    }
    const managerPos = rolePositions[hoveredRoleId];
    const reportingRoles = allRoles.filter(role => role.reportsTo?.includes(hoveredRoleId));
    return reportingRoles.map(report => {
      const reportPos = rolePositions[report.id];
      if (!reportPos || !managerPos) return null;
      return {
        key: `${hoveredRoleId}-to-${report.id}`,
        x1: managerPos.x,
        y1: managerPos.y,
        x2: reportPos.x,
        y2: reportPos.y,
      };
    }).filter(line => line !== null);
  }, [hoveredRoleId, rolePositions]);

  // --- Corrected Sidebar Content Generator ---
  const getSidebarContent = (role: RoleDetail | null): React.ReactNode => {
    if (!role) {
      return <p className="text-center italic text-base-content/60">Select a role to see details.</p>;
    }

    // Find Connections
    const directReports = allRoles.filter(r => r.reportsTo?.includes(role.id));
    const managers = (role.reportsTo || [])
      .map(managerId => rolesById.get(managerId))
      .filter((manager): manager is RoleDetail => manager !== undefined);

    // Determine title
    let sidebarTitle = role.title || role.advisorTitle || 'Role Details';
    if (role.isPureAdvisor && role.advisorTitle) sidebarTitle = role.advisorTitle;
    if (role.isAlliance && role.title) sidebarTitle = role.title;

    return (
      // Use a React Fragment shorthand
      <>
        {/* Top Section */}
        <h2 className="text-2xl font-bold mb-2 text-primary">{sidebarTitle}</h2>
        {role.title && role.title !== sidebarTitle && (
          <p className="text-lg font-semibold text-base-content/80 mb-4">{role.title}</p>
        )}
        {role.advisorTitle && role.advisorTitle !== sidebarTitle && !role.isPureAdvisor && (
          <p className="text-sm font-medium text-accent mb-1">Perspective: {role.advisorTitle}</p>
        )}
        <p className="text-base-content/90 mb-4 whitespace-pre-line">{role.description}</p>
        {role.advisorDescription && (
          <div className="mt-4 pt-4 border-t border-base-content/20">
            <h3 className="text-sm font-semibold uppercase text-base-content/60 mb-2">Advisor Focus</h3>
            <p className="text-sm text-base-content/80 whitespace-pre-line">{role.advisorDescription}</p>
          </div>
        )}

        {/* Connections Section */}
        <div className="mt-6 pt-4 border-t border-base-content/20">
          <h3 className="text-sm font-semibold uppercase text-base-content/60 mb-3">Connections</h3>
          {/* Reports To (Manager) */}
          {managers.length > 0 && (
            <div className="mb-3">
              <h4 className="text-xs font-semibold text-base-content/70 mb-1">Reports To:</h4>
              <ul className="list-disc list-inside space-y-1">
                {managers.map(manager => (
                  <li key={manager.id} className="text-sm text-base-content/90">
                    {manager.title || manager.advisorTitle || manager.id}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* Direct Reports */}
          {directReports.length > 0 && (
            <div className="mb-3">
              <h4 className="text-xs font-semibold text-base-content/70 mb-1">Direct Reports:</h4>
              <ul className="list-disc list-inside space-y-1">
                {directReports.map(report => (
                  <li key={report.id} className="text-sm text-base-content/90">
                    {report.title || report.advisorTitle || report.id}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {/* No connections message */}
          {managers.length === 0 && directReports.length === 0 && !role.isPureAdvisor && !role.isAlliance && (
            <p className="text-sm italic text-base-content/50">No direct connections defined.</p>
          )}
          {(role.isPureAdvisor || role.isAlliance) && (
            <p className="text-sm italic text-base-content/50">N/A for Advisory/Alliance roles.</p>
          )}
        </div>
      </> // End React Fragment
    );
  }; // End getSidebarContent function

  return (
    <>
      <Header />
      <main
        ref={containerRef}
        className="container mx-auto px-4 py-12 relative overflow-x-hidden"
        onMouseOver={handleContainerMouseOver}
        onMouseLeave={handleContainerMouseLeave}
      >
        {/* Header text (same as before) */}
        <h1 className="text-4xl font-bold mb-4 text-center">OceanHeart.ai Structure</h1>
        <p className="text-lg text-center text-base-content/80 max-w-3xl mx-auto mb-12">
          Our structure reflects a blend of core leadership, specialized expertise, valued advisors offering perspective, and a supportive external alliance.
        </p>

        {/* Sections Display - Pass down roleRefs */}
        <div className="space-y-12">
          {leadershipStructure.map((section) => (
            <RoleSection
              key={section.id}
              section={section}
              onSelectRole={handleSelectRole}
              roleRefs={roleRefs}
              hoveredRoleId={hoveredRoleId}
            />
          ))}
        </div>

        {/* Role Details Sidebar (same as before) */}
        <div
          className={`fixed top-0 right-0 h-full w-80 md:w-96 bg-base-300/95 backdrop-blur-sm shadow-lg p-6 transition-transform duration-300 ease-in-out z-40 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <button
            onClick={handleCloseSidebar}
            className="btn btn-sm btn-ghost absolute top-4 left-4"
            aria-label="Close details"
          >
            <FaArrowLeft className="mr-1" /> Back
          </button>
          <div className="mt-12 overflow-y-auto h-[calc(100%-4rem)]">
            {getSidebarContent(selectedRole)}
          </div>
        </div>

        {/* Overlay (same as before) */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-30"
            onClick={handleCloseSidebar}
            aria-hidden="true"
          />
        )}

        {/* SVG Lines (keep as is) */}
        <div className="absolute inset-0 top-0 left-0 w-full h-full pointer-events-none z-10">
          <svg width="100%" height="100%" className="absolute top-0 left-0 overflow-visible">
            {connections.map(line => (
              line && (
                <line
                  key={line.key}
                  x1={line.x1}
                  y1={line.y1}
                  x2={line.x2}
                  y2={line.y2}
                  stroke="currentColor"
                  className="text-primary/50 transition-opacity duration-300"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
              )
            ))}
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" className="fill-primary/50" />
              </marker>
            </defs>
          </svg>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TeamPage; 