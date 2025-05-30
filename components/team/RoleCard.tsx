import { RoleDetail } from '@/lib/teamData'; // Use the correct path to the data file
import React from 'react'; // Import React for forwardRef
import Image from 'next/image'; // Import Image component
// --- Import Icons ---
import { FaXTwitter, FaInstagram, FaYoutube, FaLink, FaUser, FaBriefcase, FaLinkedin } from "react-icons/fa6";

interface RoleCardProps {
  role: RoleDetail;
  onSelectRole: (role: RoleDetail) => void;
  isDimmed?: boolean;
  isHighlighted?: boolean;
  isAvailable?: boolean;
  // No need to accept ref as prop directly if using forwardRef
}

// Define the placeholder URL outside the component if it's constant
const placeholderAvatarUrl = "/api/placeholder/80/80";

// --- Helper Function to Clean URL ---
const cleanUrlForDisplay = (urlString?: string): string => {
  if (!urlString) return '';
  try {
    const url = new URL(urlString);
    // Combine hostname and pathname, remove trailing slash if it exists
    const displayUrl = (url.hostname + url.pathname).replace(/\/$/, '');
    return displayUrl;
  } catch (e) {
    // Handle invalid URLs gracefully, maybe return the original string or part of it
    console.error("Invalid URL for display:", urlString);
    return urlString.replace(/^https?:\/\//, '').split('?')[0].replace(/\/$/, ''); // Basic fallback
  }
};
// --- End Helper Function ---

// Use forwardRef to allow passing ref to the underlying div
const RoleCard = React.forwardRef<HTMLDivElement, RoleCardProps>(
  ({ role, onSelectRole, isDimmed, isHighlighted, isAvailable }, ref) => {
    // --- Determine if position is available ---
    const isAvailableRole = role.memberName?.toLowerCase() === "position available" && !role.avatarUrl;

    // --- Updated Title Logic ---
    let displayTitle = role.title || role.advisorTitle || 'Role'; // Default fallback
    // Handle pure advisor case (overrides previous logic if applicable)
    if (role.isPureAdvisor && role.advisorTitle) displayTitle = role.advisorTitle;
    // Handle alliance case (overrides previous logic if applicable)
    if (role.isAlliance && role.title) displayTitle = role.title;
    // --- End Updated Title Logic ---

    // Apply conditional styling based on props
    const cardClasses = `
        card ${isAvailable ? 'bg-base-200' : 'bg-base-100'} shadow-md border border-base-300/50
        transition-all duration-300 cursor-pointer flex flex-col
        ${isAvailable ? 'p-3' : 'p-5 h-full'} /* Adjust padding and remove h-full if available */
        ${isHighlighted && !isAvailable ? 'transform -translate-y-1 scale-[1.02] shadow-xl border-primary ring-2 ring-primary ring-offset-2 ring-offset-base-100' : (!isAvailable ? 'hover:shadow-lg hover:-translate-y-1' : '')} /* Adjust hover/highlight effects */
        ${isDimmed ? 'opacity-40' : 'opacity-100'} /* Simplified opacity */
    `;

    // --- Check if we have a real avatar ---
    const hasRealAvatar = role.avatarUrl && role.avatarUrl !== placeholderAvatarUrl && !role.avatarUrl.startsWith('/api/placeholder');

    return (
      <div
        ref={ref}
        className={cardClasses}
        onClick={() => onSelectRole(role)}
        data-role-id={role.id}
      >
        {/* Use card-body only for non-available cards for padding consistency */}
        <div className={`${isAvailable ? 'flex-grow flex flex-col' : 'card-body p-0 flex-grow flex flex-col'}`}>
          {/* Top content */}
          <div className="flex-grow pointer-events-none">
            <h3 className={`card-title ${isAvailable ? 'text-base' : 'text-lg'} font-bold pb-2 ${isHighlighted && !isAvailable ? 'text-primary-focus' : 'text-primary'}`}>
              {/* Display Acronym first if it exists */}
              {role.acronym && !role.isPureAdvisor && !role.isAlliance && (
                <span className="text-primary/80 font-medium mr-1">{role.acronym}:</span>
              )}
              {/* Always display the main title */}
              {displayTitle}
            </h3>
            {/* Advisor Perspective (only show if it's *not* the main display title AND not available) */}
            {role.title && role.advisorTitle && role.advisorTitle !== displayTitle && !role.isPureAdvisor && !role.isAlliance && !isAvailable && (
              <p className="text-xs font-medium text-accent -mt-1 mb-2">
                Perspective: {role.advisorTitle}
              </p>
            )}

            {/* Description (Only show if NOT available) */}
            {!isAvailable && (
              <p className="text-base-content/90 text-sm mt-2">
                {role.description}
              </p>
            )}

            {/* Advisor Description Snippet (Only show if NOT available and conditions met) */}
            {role.advisorDescription && role.advisorDescription !== role.description && !role.isPureAdvisor && !role.isAlliance && !isAvailable && (
              <div className="mt-3 pt-3 border-t border-base-content/10">
                <p className="text-xs text-base-content/70 italic">
                  <span className="font-semibold text-accent/80">Advisor Focus:</span> {role.advisorDescription}
                </p>
              </div>
            )}
          </div>

          {/* --- Background Section (Only show if NOT available) --- */}
          {role.background && !isAvailable && (
            <div className="mt-3 pt-3 border-t border-base-content/10 pointer-events-none">
              <h4 className="text-xs font-semibold uppercase text-base-content/60 mb-1">Background</h4>
              <p className="text-sm text-base-content/80 italic">
                {role.background}
              </p>
            </div>
          )}
          {/* --- End Background Section --- */}

          {/* --- Member Info Section (Only show if NOT available) --- */}
          {!isAvailable && (role.memberName || !role.avatarUrl) && (
            // Apply flex-col when showing large placeholder OR real avatar
            <div className={`mt-4 pt-4 border-t border-base-content/10 ${(hasRealAvatar || (role.memberName?.toLowerCase() === "position available" && !hasRealAvatar)) ? 'flex flex-col items-center text-center' : 'flex items-center gap-3'}`}>
              {/* Avatar Area */}
              <div className={`avatar placeholder pointer-events-none ${!hasRealAvatar && role.memberName?.toLowerCase() !== "position available" ? '' : 'flex flex-col items-center text-center w-full'}`}>
                <div className={`${(hasRealAvatar || role.memberName?.toLowerCase() === "position available") ? 'w-52 h-52' : 'w-10 h-10 bg-neutral text-neutral-content'} mb-3 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1 flex items-center justify-center`}>
                  {hasRealAvatar && role.avatarUrl ? (
                    <Image
                      src={role.avatarUrl}
                      alt={role.memberName || 'Avatar'}
                      width={hasRealAvatar ? 208 : 40} // Adjusted size based on hasRealAvatar only
                      height={hasRealAvatar ? 208 : 40}
                      className="rounded-full object-cover"
                      unoptimized={role.avatarUrl?.startsWith('/api/placeholder')}
                    />
                  ) : (
                    <FaUser className="w-5 h-5" />
                  )}
                </div>
              </div>

              {/* Name / Position Available Text Area (Simplified: Only shows name now) */}
              {role.memberName && (
                <span className={`text-sm font-semibold text-base-content/90 ${hasRealAvatar ? 'mt-2 block' : ''} pointer-events-none`}>
                  {role.memberName}
                </span>
              )}

              {/* --- Socials and Website (Only if real avatar) --- */}
              {hasRealAvatar && (
                <div className="mt-3 space-y-2 w-full pointer-events-auto"> {/* Enable pointer events here */}
                  {/* Social Icons */}
                  <div className="flex justify-center items-center space-x-3">
                    {role.socialXUrl && (
                      <a href={role.socialXUrl} target="_blank" rel="noopener noreferrer" className="text-base-content/70 hover:text-primary transition-colors" aria-label={`${role.memberName} on X`}>
                        <FaXTwitter className="w-4 h-4" />
                      </a>
                    )}
                    {role.socialLinkedInUrl && (
                      <a href={role.socialLinkedInUrl} target="_blank" rel="noopener noreferrer" className="text-base-content/70 hover:text-primary transition-colors" aria-label={`${role.memberName} on LinkedIn`}>
                        <FaLinkedin className="w-4 h-4" />
                      </a>
                    )}
                    {role.socialInstagramUrl && (
                      <a href={role.socialInstagramUrl} target="_blank" rel="noopener noreferrer" className="text-base-content/70 hover:text-primary transition-colors" aria-label={`${role.memberName} on Instagram`}>
                        <FaInstagram className="w-4 h-4" />
                      </a>
                    )}
                    {role.socialYouTubeUrl && (
                      <a href={role.socialYouTubeUrl} target="_blank" rel="noopener noreferrer" className="text-base-content/70 hover:text-primary transition-colors" aria-label={`${role.memberName} on YouTube`}>
                        <FaYoutube className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  {/* Website Link */}
                  {role.websiteUrl && (
                    <a
                      href={role.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1 text-xs text-info hover:text-info-focus hover:underline transition-colors truncate px-2"
                      aria-label={`${role.memberName} Website`}
                    >
                      <FaLink className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">
                        {cleanUrlForDisplay(role.websiteUrl)}
                      </span>
                    </a>
                  )}
                </div>
              )}
              {/* --- End Socials and Website --- */}
            </div>
          )}
        </div>
      </div>
    );
  });

RoleCard.displayName = "RoleCard"; // Good practice for forwardRef

export default RoleCard; 