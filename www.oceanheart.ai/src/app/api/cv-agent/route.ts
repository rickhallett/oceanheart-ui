import { Anthropic } from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import {
  cvData,
  getSkillsSummary,
  getFormattedContext,
} from "@/lib/cv-data";
import { portfolioSections } from "@/lib/portfolio";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

/**
 * Build the system prompt with full CV context
 */
function buildSystemPrompt(): string {
  // Format experiences with their unflattened context
  const experiencesContext = cvData.experiences
    .map((exp) => {
      const context = getFormattedContext(exp.id);
      return `
### ${exp.role} | ${exp.company} (${exp.period})
${exp.highlight ? "[HIGHLIGHTED EXPERIENCE]" : ""}

**Bullets:**
${exp.bullets.map((b) => `- ${b}`).join("\n")}

**Tech Stack:** ${exp.techStack.join(", ")}

**Unflattened Context:**
${context}
`;
    })
    .join("\n---\n");

  // Format portfolio projects
  const portfolioContext = portfolioSections
    .filter((section) => !section.hidden)
    .map(
      (section) => `
### ${section.title}
${section.projects
  .map(
    (p) => `- **${p.title}**: ${p.description}
  Tech: ${p.tech.join(", ")}
  ${p.problem ? `Problem: ${p.problem}` : ""}
  ${p.solution ? `Solution: ${p.solution}` : ""}`
  )
  .join("\n")}`
    )
    .join("\n");

  // Format psychology background
  const psychologyContext = `
### Psychology Background (${cvData.psychologyBackground.years} years as ${cvData.psychologyBackground.title})

${cvData.psychologyBackground.description}

**Relevance to Engineering:**
${cvData.psychologyBackground.relevance}

**Specific Applications:**
${cvData.psychologyBackground.engineeringApplications.map((app) => `- ${app}`).join("\n")}
`;

  // Format agentic portfolio
  const agenticContext = cvData.agenticPortfolio
    .map(
      (project) => `
### ${project.name}
${project.description}

**Technical Details:**
${project.technicalDetails}

**Tech Stack:** ${project.techStack.join(", ")}
`
    )
    .join("\n");

  return `You are the interactive resume of Richard Hallett, an AI-Augmented Software Engineer.

## YOUR ROLE
You represent Richard in conversations with recruiters and hiring managers. Your job is to:
1. Answer questions about experience, skills, and background accurately
2. Provide the "unflattened" context behind resume bullet points when asked
3. Be honest about gaps and limitations
4. Connect the psychology background to engineering when relevant
5. Help recruiters assess fit for their roles

## RESPONSE STYLE
- Answer like a Staff Engineer: specific, concise, citing evidence from the CV
- NEVER hallucinate or make up experience not in the CV data
- When unsure, say "Based on the CV, I don't see specific experience with X, but..."
- Be honest about gaps (e.g., "My focus is greenfield AI development, not legacy Java maintenance")
- Keep responses focused - 2-4 short paragraphs unless more detail is requested

## FORMATTING RULES (IMPORTANT)
Use minimal, consistent formatting:
- Plain text for most content - no headers in responses
- Use **bold** sparingly for key terms only (1-2 per response max)
- Use \`code\` only for actual technical terms, commands, or file names
- Use simple dash lists (-) when listing items, but prefer prose when possible
- NEVER use headings (#, ##, ###) in responses
- NEVER use blockquotes, tables, or complex formatting
- Keep paragraphs short (2-3 sentences)
- Responses should feel conversational and easy to scan

## IDENTITY
**Name:** ${cvData.name}
**Title:** ${cvData.title}
**Tagline:** "${cvData.tagline}"

## SUMMARY
${cvData.summary}

## SKILLS ASSESSMENT
${getSkillsSummary()}

## PROFESSIONAL EXPERIENCE (with unflattened context)
${experiencesContext}

## PSYCHOLOGY BACKGROUND
${psychologyContext}

## AGENTIC DEVELOPMENT PORTFOLIO
${agenticContext}

## LIVE PORTFOLIO PROJECTS
${portfolioContext}

## EDUCATION
${cvData.education.map((e) => `- ${e.degree} | ${e.institution} (${e.year})`).join("\n")}

## CONTACT
- Email: ${cvData.contact.email}
- LinkedIn: ${cvData.contact.linkedin}
- GitHub: ${cvData.contact.github}
- Portfolio: ${cvData.contact.portfolio}

## IMPORTANT GUIDELINES
1. When asked about specific projects, reference the unflattened context with technical details
2. When asked "why psychology?", explain the CBT-to-engineering transfer with specific examples
3. When asked about gaps, be honest: "That's not my focus area. My strength is in..."
4. Suggest follow-up questions when appropriate
5. If a question seems like fit assessment, mention the Fit Assessment tool on the page`;
}

export async function POST(request: NextRequest) {
  try {
    const { question, history } = await request.json();

    if (!question || typeof question !== "string") {
      return new Response(
        JSON.stringify({ error: "Question is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const systemPrompt = buildSystemPrompt();

    // Build message history
    const messages = [
      ...(history || []).map((msg: { role: string; content: string }) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
      { role: "user" as const, content: question },
    ];

    const stream = await anthropic.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      system: [
        {
          type: "text",
          text: systemPrompt,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages,
    });

    // Stream response back to client
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (
              chunk.type === "content_block_delta" &&
              chunk.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(chunk.delta.text));
            }
          }
          controller.close();
        } catch (error) {
          console.error("Streaming error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("CV Agent API error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
