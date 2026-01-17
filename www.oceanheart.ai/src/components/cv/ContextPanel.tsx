"use client";

import { cn } from "@/lib/utils";
import type { CVContext } from "@/lib/cv-data";

interface ContextPanelProps {
  context: CVContext;
  className?: string;
}

export function ContextPanel({ context, className }: ContextPanelProps) {
  return (
    <div className={cn("mt-3 sm:mt-4 space-y-3 sm:space-y-4", className)}>
      {/* Situation */}
      <div className="bg-terminal-bg border border-white/10 rounded-sm p-3 sm:p-4">
        <div className="font-terminal text-xs text-terminal-muted mb-1.5 sm:mb-2">
          <span className="text-terminal-cyan">#</span> situation
        </div>
        <p className="font-terminal text-xs sm:text-sm text-terminal-secondary leading-relaxed text-left">
          {context.situation}
        </p>
      </div>

      {/* Methodology */}
      <div className="bg-terminal-bg border border-white/10 rounded-sm p-3 sm:p-4">
        <div className="font-terminal text-xs text-terminal-muted mb-1.5 sm:mb-2">
          <span className="text-terminal-purple">#</span> approach
        </div>
        <div className="font-terminal text-xs sm:text-sm text-terminal-secondary leading-relaxed whitespace-pre-line text-left">
          {context.methodology}
        </div>
      </div>

      {/* Lessons Learned */}
      <div className="bg-terminal-bg border border-white/10 rounded-sm p-3 sm:p-4">
        <div className="font-terminal text-xs text-terminal-muted mb-1.5 sm:mb-2">
          <span className="text-terminal-green">#</span> lessons
        </div>
        <p className="font-terminal text-xs sm:text-sm text-terminal-secondary leading-relaxed text-left">
          {context.lessonsLearned}
        </p>
      </div>

      {/* Technical Details */}
      {context.technicalDetails && (
        <div className="bg-terminal-bg border border-terminal-orange/20 rounded-sm p-3 sm:p-4">
          <div className="font-terminal text-xs text-terminal-orange mb-1.5 sm:mb-2">
            <span>$</span> cat technical_details.md
          </div>
          <pre className="font-terminal text-xs sm:text-sm text-terminal-secondary leading-relaxed whitespace-pre-wrap overflow-x-auto text-left">
            {context.technicalDetails}
          </pre>
        </div>
      )}
    </div>
  );
}
