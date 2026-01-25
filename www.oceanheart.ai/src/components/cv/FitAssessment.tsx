"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { IconLoader2, IconCheck, IconX } from "@tabler/icons-react";

interface FitEvidence {
  requirement: string;
  match: boolean;
  detail: string;
}

interface FitAssessmentResult {
  matchLevel: "strong" | "moderate" | "weak";
  overallScore: number;
  summary: string;
  evidence: FitEvidence[];
  honestGaps: string[];
  recommendation: string;
  suggestedQuestions: string[];
}

interface FitAssessmentProps {
  className?: string;
}

export function FitAssessment({ className }: FitAssessmentProps) {
  const [jobDescription, setJobDescription] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<FitAssessmentResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!jobDescription.trim() || isAnalyzing) return;

    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/cv-agent/fit-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription: jobDescription.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze job description");
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An error occurred during analysis"
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setJobDescription("");
    setResult(null);
    setError(null);
  };

  const getMatchColor = (level: string) => {
    switch (level) {
      case "strong":
        return "text-terminal-green border-terminal-green/30";
      case "moderate":
        return "text-terminal-orange border-terminal-orange/30";
      case "weak":
        return "text-terminal-red border-terminal-red/30";
      default:
        return "text-terminal-muted border-white/10";
    }
  };

  if (result) {
    return (
      <div className={cn("space-y-3 sm:space-y-4", className)}>
        {/* Result header */}
        <div
          className={cn(
            "p-3 sm:p-4 bg-terminal-bg-secondary border rounded-sm",
            getMatchColor(result.matchLevel)
          )}
        >
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="font-terminal text-xs text-terminal-muted">
              <span className="text-terminal-green">$</span> fit-assessment --analyze
            </div>
            <span className={cn("font-terminal text-xl sm:text-2xl", getMatchColor(result.matchLevel).split(" ")[0])}>
              {result.overallScore}/100
            </span>
          </div>
          <div className="font-terminal">
            <span className={cn("text-xs sm:text-sm", getMatchColor(result.matchLevel).split(" ")[0])}>
              [{result.matchLevel.toUpperCase()}]
            </span>
            <p className="text-terminal-secondary text-xs sm:text-sm mt-2">{result.summary}</p>
          </div>
        </div>

        {/* Evidence */}
        <div className="bg-terminal-bg-secondary border border-white/10 rounded-sm p-3 sm:p-4">
          <div className="font-terminal text-xs text-terminal-muted mb-2 sm:mb-3">
            <span className="text-terminal-green">$</span> cat ./evidence.log
          </div>
          <div className="space-y-2">
            {result.evidence.map((item, index) => (
              <div key={index} className="flex items-start gap-2 font-terminal text-xs sm:text-sm">
                {item.match ? (
                  <IconCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-terminal-green mt-0.5 flex-shrink-0" />
                ) : (
                  <IconX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-terminal-red mt-0.5 flex-shrink-0" />
                )}
                <div className="min-w-0">
                  <span className={cn("block sm:inline", item.match ? "text-terminal-green" : "text-terminal-red")}>
                    {item.requirement}
                  </span>
                  <span className="text-terminal-muted block sm:inline sm:ml-2">- {item.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gaps */}
        {result.honestGaps.length > 0 && (
          <div className="bg-terminal-bg-secondary border border-white/10 rounded-sm p-3 sm:p-4">
            <div className="font-terminal text-xs text-terminal-muted mb-2 sm:mb-3">
              <span className="text-terminal-orange">!</span> honest gaps:
            </div>
            <div className="space-y-1">
              {result.honestGaps.map((gap, index) => (
                <div key={index} className="font-terminal text-xs sm:text-sm text-terminal-secondary">
                  <span className="text-terminal-orange">-</span> {gap}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendation */}
        <div className="bg-terminal-bg-secondary border border-terminal-cyan/20 rounded-sm p-3 sm:p-4">
          <div className="font-terminal text-xs text-terminal-cyan mb-1.5 sm:mb-2">recommendation:</div>
          <p className="font-terminal text-xs sm:text-sm text-terminal-secondary">{result.recommendation}</p>
        </div>

        {/* Reset */}
        <button
          onClick={handleReset}
          className="w-full py-2.5 sm:py-2 font-terminal text-xs sm:text-sm bg-terminal-bg-secondary border border-white/10 rounded-sm text-terminal-muted hover:text-terminal-cyan hover:border-terminal-cyan/30 transition-colors"
        >
          [analyze another role]
        </button>
      </div>
    );
  }

  return (
    <div className={cn("space-y-3 sm:space-y-4", className)}>
      <div className="font-terminal text-xs text-terminal-muted mb-1.5 sm:mb-2">
        <span className="text-terminal-green">$</span> paste job_description.txt
      </div>

      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="paste job description here..."
        rows={5}
        className="w-full bg-terminal-bg-secondary text-terminal font-terminal text-base sm:text-sm border border-white/10 rounded-sm p-3 sm:p-4 placeholder:text-terminal-muted focus:outline-none focus:border-terminal-cyan/30 resize-none"
      />

      {error && (
        <div className="p-2.5 sm:p-3 bg-terminal-red/10 border border-terminal-red/30 rounded-sm">
          <span className="font-terminal text-xs sm:text-sm text-terminal-red">error: {error}</span>
        </div>
      )}

      <button
        onClick={handleAnalyze}
        disabled={!jobDescription.trim() || isAnalyzing}
        className="w-full py-2.5 sm:py-3 font-terminal text-xs sm:text-sm bg-terminal-bg-secondary border border-white/10 rounded-sm text-terminal hover:border-terminal-cyan/30 hover:text-terminal-cyan disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
      >
        {isAnalyzing ? (
          <>
            <IconLoader2 className="w-4 h-4 animate-spin" />
            analyzing...
          </>
        ) : (
          <>[run fit-assessment]</>
        )}
      </button>

      <p className="font-terminal text-xs text-terminal-muted text-left sm:text-center">
        honest assessment including where I'm not the best fit
      </p>
    </div>
  );
}
