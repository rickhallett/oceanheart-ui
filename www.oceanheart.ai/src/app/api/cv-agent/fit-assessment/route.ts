import { Anthropic } from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { cvData, getSkillsSummary, assessFitFromKeywords } from "@/lib/cv-data";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface FitEvidence {
  requirement: string;
  match: boolean;
  detail: string;
}

export interface FitAssessmentResult {
  matchLevel: "strong" | "moderate" | "weak";
  overallScore: number;
  summary: string;
  evidence: FitEvidence[];
  honestGaps: string[];
  recommendation: string;
  suggestedQuestions: string[];
}

/**
 * Build the system prompt for fit assessment
 */
function buildFitAssessmentPrompt(): string {
  const experiencesSummary = cvData.experiences
    .map(
      (exp) => `
- **${exp.role} | ${exp.company}** (${exp.period})
  Tech: ${exp.techStack.join(", ")}
  Key achievements: ${exp.bullets.slice(0, 2).join("; ")}`
    )
    .join("\n");

  return `You are an honest job fit assessment tool for Richard Hallett's resume.

## YOUR ROLE
Analyze a job description against Richard's CV and provide an honest, evidence-based assessment.
Be brutally honest about mismatches - this saves everyone's time.

## RICHARD'S PROFILE

**Title:** ${cvData.title}
**Summary:** ${cvData.summary}

**Skills:**
${getSkillsSummary()}

**Experience:**
${experiencesSummary}

**Psychology Background:** ${cvData.psychologyBackground.years} years as ${cvData.psychologyBackground.title}
Relevance: ${cvData.psychologyBackground.relevance}

## ASSESSMENT GUIDELINES

**Strong Match Indicators:**
- AI/LLM/Agent development roles
- React/TypeScript frontend positions
- Python automation/backend roles
- Greenfield/startup environments
- Roles valuing prompt engineering or context engineering
- Positions where psychology background adds value (UX, AI ethics, user research)

**Weak Match Indicators:**
- Heavy Java/C#/.NET requirements
- Legacy system maintenance focus
- On-premise infrastructure management
- Large team management (10+ direct reports)
- Native mobile development (iOS/Android)
- DevOps/SRE primary focus

## OUTPUT FORMAT
You must respond with valid JSON matching this structure:
{
  "matchLevel": "strong" | "moderate" | "weak",
  "overallScore": <number 0-100>,
  "summary": "<2-3 sentence assessment>",
  "evidence": [
    {
      "requirement": "<JD requirement>",
      "match": true | false,
      "detail": "<specific evidence from CV>"
    }
  ],
  "honestGaps": ["<gap 1>", "<gap 2>"],
  "recommendation": "<actionable recommendation>",
  "suggestedQuestions": ["<question to explore fit further>"]
}

## IMPORTANT
- Be specific about evidence - cite actual experience, not generic claims
- If a requirement is a dealbreaker, say so clearly
- For moderate matches, explain what would need to be true for it to work
- Always include at least one honest gap, even for strong matches
- Suggest questions that would help clarify fit`;
}

export async function POST(request: NextRequest) {
  try {
    const { jobDescription } = await request.json();

    if (!jobDescription || typeof jobDescription !== "string") {
      return new Response(
        JSON.stringify({ error: "Job description is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Quick keyword-based pre-assessment
    const keywordAssessment = assessFitFromKeywords(jobDescription);

    const systemPrompt = buildFitAssessmentPrompt();

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      system: [
        {
          type: "text",
          text: systemPrompt,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [
        {
          role: "user",
          content: `Please analyze this job description and provide a fit assessment:

---
${jobDescription}
---

Preliminary keyword analysis:
- Strong fit keywords found: ${keywordAssessment.strongMatches.join(", ") || "none"}
- Potential mismatch keywords: ${keywordAssessment.weakMatches.join(", ") || "none"}
- Keyword-based score: ${keywordAssessment.score}/100

Now provide your detailed assessment as JSON.`,
        },
      ],
    });

    // Extract the text content
    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";

    // Parse the JSON response
    let assessment: FitAssessmentResult;
    try {
      // Extract JSON from the response (handle potential markdown code blocks)
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in response");
      }
      assessment = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error("Failed to parse assessment JSON:", parseError);
      // Return a fallback assessment based on keyword analysis
      assessment = {
        matchLevel:
          keywordAssessment.score >= 70
            ? "strong"
            : keywordAssessment.score >= 40
              ? "moderate"
              : "weak",
        overallScore: keywordAssessment.score,
        summary:
          "Assessment based on keyword analysis. The AI analysis encountered an issue.",
        evidence: keywordAssessment.strongMatches.map((kw) => ({
          requirement: kw,
          match: true,
          detail: `Keyword "${kw}" found in job description matches CV skills`,
        })),
        honestGaps: keywordAssessment.weakMatches.map(
          (kw) => `Role mentions "${kw}" which is not a primary focus area`
        ),
        recommendation:
          keywordAssessment.score >= 50
            ? "Worth exploring further"
            : "May not be the best fit",
        suggestedQuestions: [
          "What's the team's approach to AI-augmented development?",
        ],
      };
    }

    return new Response(JSON.stringify(assessment), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Fit Assessment API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process fit assessment" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
