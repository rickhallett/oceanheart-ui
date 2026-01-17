"use client";

import { cn } from "@/lib/utils";
import { getSkillsByCategory, type CVSkill } from "@/lib/cv-data";

interface SkillsMatrixProps {
  className?: string;
}

interface SkillColumnProps {
  title: string;
  command: string;
  skills: CVSkill[];
  accentColor: string;
}

function SkillColumn({ title, command, skills, accentColor }: SkillColumnProps) {
  return (
    <div className="bg-terminal-bg-secondary border border-white/10 rounded-sm overflow-hidden">
      <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-white/10">
        <div className="font-terminal text-xs text-terminal-muted mb-1 truncate">
          <span className="text-terminal-green">$</span> {command}
        </div>
        <h3 className={cn("font-terminal text-xs sm:text-sm", accentColor)}>{title}</h3>
      </div>
      <div className="p-3 sm:p-4">
        <ul className="space-y-1.5 sm:space-y-2">
          {skills.map((skill) => (
            <li key={skill.name} className="font-terminal text-xs sm:text-sm text-left">
              <span className={accentColor}>-</span>
              <span className="text-terminal-secondary ml-1.5 sm:ml-2">{skill.name}</span>
              {skill.description && (
                <span className="text-terminal-muted text-xs block sm:inline sm:ml-2">({skill.description})</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function SkillsMatrix({ className }: SkillsMatrixProps) {
  const agenticSkills = getSkillsByCategory("agentic");
  const coreSkills = getSkillsByCategory("core");
  const moderateSkills = getSkillsByCategory("moderate");
  const gapSkills = getSkillsByCategory("gap");

  return (
    <div className={cn("space-y-3 sm:space-y-4", className)}>
      {/* Primary Skills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <SkillColumn
          title="[agentic] - differentiator"
          command="cat ./skills/agentic.txt"
          skills={agenticSkills}
          accentColor="text-terminal-green"
        />
        <SkillColumn
          title="[core] - foundation"
          command="cat ./skills/core.txt"
          skills={coreSkills}
          accentColor="text-terminal-cyan"
        />
      </div>

      {/* Secondary Skills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <SkillColumn
          title="[moderate] - proficient"
          command="cat ./skills/moderate.txt"
          skills={moderateSkills}
          accentColor="text-terminal-blue"
        />
        <SkillColumn
          title="[gaps] - not for me"
          command="cat ./skills/gaps.txt"
          skills={gapSkills}
          accentColor="text-terminal-muted"
        />
      </div>
    </div>
  );
}
