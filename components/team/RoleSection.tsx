import { Section, RoleDetail, rolesById } from '@/app/team/page'; // Import rolesById
import RoleCard from './RoleCard';
import { MutableRefObject } from 'react'; // Import Ref type

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
          {section.roles.map((role) => {
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
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RoleSection; 