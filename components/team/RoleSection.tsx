import { Section, RoleDetail, rolesById } from '@/lib/teamData'; // Import rolesById from the new data file
import RoleCard from './RoleCard';
import { MutableRefObject, useMemo } from 'react'; // Import useMemo

interface RoleSectionProps {
  section: Section;
  onSelectRole: (role: RoleDetail) => void;
  roleRefs: MutableRefObject<Record<string, HTMLDivElement | null>>; // Accept refs
  hoveredRoleId: string | null;
}

const RoleSection: React.FC<RoleSectionProps> = ({
  section,
  onSelectRole,
  roleRefs,
  hoveredRoleId
}) => {
  // --- Split roles --- 
  const { filledRoles, availableRoles } = useMemo(() => {
    const filled: RoleDetail[] = [];
    const available: RoleDetail[] = [];
    section.roles.forEach(role => {
      if (role.memberName?.toLowerCase() !== "position available") {
        filled.push(role);
      } else {
        available.push(role);
      }
    });
    return { filledRoles: filled, availableRoles: available };
  }, [section.roles]);

  // Simple background mapping (can be expanded or moved to config)
  const bgClasses: { [key: string]: string } = {
    leadership: 'bg-primary/5 border-primary',
    operations: 'bg-secondary/5 border-secondary',
    specialized: 'bg-accent/5 border-accent',
    advisory: 'bg-neutral/5 border-neutral-content',
    alliance: 'bg-info/5 border-info',
  };
  const sectionBg = bgClasses[section.id] || 'bg-base-200 border-base-300';

  return (
    <section className={`rounded-xl shadow-sm overflow-hidden border-l-4 ${sectionBg} `}>
      <div className="p-6">
        <h2 className="text-2xl md:text-3xl font-bold text-base-content mb-2 border-b border-base-content/10 pb-2">
          {section.level}
        </h2>
        {section.description && (
          <p className="italic text-base-content/80 mb-6 max-w-prose">{section.description}</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {/* Render Filled Roles */}
          {filledRoles.map((role) => {
            // --- Logic moved here, using parent's hoveredRoleId ---
            const isHoveredCard = hoveredRoleId === role.id;
            const isReportingToHovered = role.reportsTo?.includes(hoveredRoleId || '') ?? false;
            const hoveredRole = hoveredRoleId ? rolesById.get(hoveredRoleId) : null;
            const isManagerOfHovered = hoveredRole?.reportsTo?.includes(role.id) ?? false; // Reinstate manager check

            // Highlight if it's the hovered card, or it reports to the hovered card,
            // or if it's the direct manager of the hovered card.
            const isHighlighted = hoveredRoleId !== null && (isHoveredCard || isReportingToHovered || isManagerOfHovered);

            // Dim if some card is hovered, but this card is not highlighted
            const isDimmed = hoveredRoleId !== null && !isHighlighted;
            // --- End Logic ---

            return (
              <RoleCard
                key={role.id}
                role={role}
                onSelectRole={onSelectRole}
                ref={(el) => { roleRefs.current[role.id] = el; }}
                isDimmed={isDimmed}
                isHighlighted={isHighlighted}
              // isAvailable is implicitly false here for filled roles
              />
            );
          })}
        </div>

        {/* --- Available Positions Section --- */}
        {availableRoles.length > 0 && (
          <div className="mt-8 pt-6 border-t border-base-content/20">
            <h3 className="text-xl font-semibold text-base-content/80 mb-4">Available Positions</h3>
            {/* Responsive layout: flex-col on small, flex-row wrap on medium+ */}
            <div className="flex flex-col md:flex-row md:flex-wrap gap-4">
              {availableRoles.map((role) => (
                <div key={role.id} className="w-full md:w-auto"> {/* Wrapper for consistent width/basis */}
                  <RoleCard
                    role={role}
                    onSelectRole={onSelectRole} // Still needed for potential future interactions?
                    ref={(el) => { roleRefs.current[role.id] = el; }} // Keep ref for potential layout calculations
                    isAvailable={true} // Pass the available variant flag
                  />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default RoleSection; 