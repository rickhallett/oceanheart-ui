import { RoleDetail } from '@/app/team/page'; // Adjust path if needed
import React from 'react'; // Import React for forwardRef

interface RoleCardProps {
  role: RoleDetail;
  onSelectRole: (role: RoleDetail) => void;
  isDimmed?: boolean;
  isHighlighted?: boolean;
  // No need to accept ref as prop directly if using forwardRef
}

// Use forwardRef to allow passing ref to the underlying div
const RoleCard = React.forwardRef<HTMLDivElement, RoleCardProps>(
  ({ role, onSelectRole, isDimmed, isHighlighted }, ref) => {
    // Determine the primary title to display on the card
    let cardTitle = role.title || role.advisorTitle || 'Role';
    if (role.isPureAdvisor && role.advisorTitle) cardTitle = role.advisorTitle;
    if (role.isAlliance && role.title) cardTitle = role.title;

    // Apply conditional styling based on props
    const cardClasses = `
        card bg-base-100 shadow-md hover:shadow-lg border border-base-300/50
        transition-all duration-300 cursor-pointer h-full flex flex-col
        ${isHighlighted ? 'transform -translate-y-1 scale-[1.02] shadow-xl border-primary ring-2 ring-primary ring-offset-2 ring-offset-base-100' : 'hover:-translate-y-1'}
        ${isDimmed ? 'opacity-40' : 'opacity-100'}
    `;

    return (
      <div
        ref={ref}
        className={cardClasses}
        onClick={() => {
          // Keep click log if needed
          // console.log("Card Clicked:", role.id);
          onSelectRole(role);
        }}
        data-role-id={role.id}
      >
        <div className="card-body p-5 flex-grow pointer-events-none">
          {/* Title Area */}
          <h3 className={`card-title text-lg font-bold ${isHighlighted ? 'text-primary-focus' : 'text-primary'}`}>
            {cardTitle}
          </h3>
          {/* Display secondary title (e.g., advisor perspective) if applicable */}
          {role.title && role.advisorTitle && role.title !== cardTitle && !role.isPureAdvisor && !role.isAlliance && (
            <p className="text-xs font-medium text-accent -mt-1 mb-2">
              Perspective: {role.advisorTitle}
            </p>
          )}
          {/* OR display core title if advisor title was primary */}
          {role.title && role.advisorTitle && role.advisorTitle === cardTitle && !role.isPureAdvisor && !role.isAlliance && (
            <p className="text-xs font-medium text-secondary -mt-1 mb-2">
              Core Role: {role.title}
            </p>
          )}

          {/* Description */}
          <p className="text-base-content/90 text-sm flex-grow">
            {role.description}
          </p>

          {/* Advisor Description Snippet (only if different from main description) */}
          {role.advisorDescription && role.advisorDescription !== role.description && !role.isPureAdvisor && !role.isAlliance && (
            <div className="mt-3 pt-3 border-t border-base-content/10">
              <p className="text-xs text-base-content/70 italic">
                <span className="font-semibold text-accent/80">Advisor Focus:</span> {role.advisorDescription.substring(0, 70)}{role.advisorDescription.length > 70 ? '...' : ''}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  });

RoleCard.displayName = "RoleCard"; // Good practice for forwardRef

export default RoleCard; 