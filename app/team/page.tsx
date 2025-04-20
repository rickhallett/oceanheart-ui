"use client"; // This page requires client-side interactivity

import { useState, useEffect, useRef, useCallback, useMemo, MouseEvent } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaArrowLeft } from "react-icons/fa";
import RoleSection from '../../components/team/RoleSection';
// Import data and types from the new file
import { RoleDetail, Section, leadershipStructure, allRoles, rolesById } from '@/lib/teamData';

// Define the structure for stored positions
interface RolePositionInfo {
  topCenter: { x: number; y: number };
  bottomCenter: { x: number; y: number };
}

const TeamPage = () => {
  // State for sidebar (same as before)
  const [selectedRole, setSelectedRole] = useState<RoleDetail | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [rolePositions, setRolePositions] = useState<Record<string, RolePositionInfo>>({});
  const roleRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the main container
  const [hoveredRoleId, setHoveredRoleId] = useState<string | null>(null);

  // Function to update role positions
  const updatePositions = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newPositions: Record<string, RolePositionInfo> = {};
    allRoles.forEach(role => {
      const element = roleRefs.current[role.id];
      if (element) {
        const rect = element.getBoundingClientRect();
        const x = rect.left - containerRect.left; // X relative to container
        const y = rect.top - containerRect.top; // Y relative to container
        newPositions[role.id] = {
          // Top-center point
          topCenter: { x: x + rect.width / 2, y: y },
          // Bottom-center point
          bottomCenter: { x: x + rect.width / 2, y: y + rect.height },
        };
      }
    });
    setRolePositions(prevPositions => {
      if (JSON.stringify(prevPositions) === JSON.stringify(newPositions)) {
        return prevPositions;
      }
      return newPositions;
    });
  }, []);

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

    // Use bottom-center of the hovered (manager) role
    const managerPos = rolePositions[hoveredRoleId]?.bottomCenter;
    if (!managerPos) return []; // Ensure manager position exists

    const reportingRoles = allRoles.filter(role => role.reportsTo?.includes(hoveredRoleId));

    return reportingRoles.map(report => {
      // Use top-center of the reporting role
      const reportPos = rolePositions[report.id]?.topCenter;
      if (!reportPos) return null; // Skip if report position is unknown

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

        {/* --- Apply Now Button (Conditional) --- */}
        {role.memberName?.toLowerCase() === "position available" && (
          <div className="mt-8 mb-4 pt-4 border-t border-base-content/20 text-center">
            <a
              href={`mailto:kai@oceanheart.ai?subject=${encodeURIComponent(`Job Application: ${sidebarTitle}`)}`}
              className="btn btn-primary"
            >
              Apply Now
            </a>
            <p className="text-xs text-base-content/60 mt-4">Interested in this role? Let us know!</p>
          </div>
        )}
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
        <h1 className="text-4xl font-bold mb-4 text-center"><span className="text-secondary">Meritocracy</span> &gt; <span className="text-primary">Hierarchy</span>: Our Company Structure</h1>
        <p className="text-md text-center text-base-content/80 max-w-3xl mx-auto mb-12">
          Our structure reflects a blend of core leadership, specialized expertise, valued multi-disciplinary advisors, designed from the start to serve by far the most important layer: the "<span className="text-secondary">OceanHeart Wellbeing Alliance</span>".
        </p>
        <p className="text-md text-center text-base-content/80 max-w-3xl mx-auto mb-12">

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

      </main>
      <Footer />
    </>
  );
};

export default TeamPage; 