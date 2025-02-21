# Saigo Username Page Specification
> Ingest the information from this file to build the new username page as part of the Saigo authentication flow. This page will describe and integrate the AI-generated username approach, and it must use its own layout within the saigo directory.

## High-Level Objective
- Build a new username page for the Saigo flow that provides users with an interface to generate their unique username via an LLM-based service. This page will also indicate success or error states without obstructing the overall user experience.

## Mid-Level Objectives
- Create a new page at app/saigo/username/page.tsx, using a dedicated layout (duplicated and adjusted from app/saigo/signin/layout.tsx).
- Display an explanation of the username generation process and present an interactive UI element (e.g., a "Generate Username" button) to initiate the LLM-based logic.
- Reserve space for displaying the generated username and any messages from the generation process.  
- Ensure integration with the Supabase Username table for storing the generated username in a unique manner (the actual insertion logic will be handled in later development).

## Implementation Notes
- Use the existing saigo layout file (e.g., duplicate app/saigo/signin/layout.tsx into a new file at app/saigo/username/layout.tsx) and update its canonicalUrlRelative property to "/saigo/username".
- The page should follow the same UI/UX patterns and daisy UI theme used in other Saigo pages.
- Prepare the page as a client component (include "use client" at the top) if interactive behavior is required.
- Do not implement the LLM integration or Supabase insertion yet; instead, provide clear placeholder components (for example, a placeholder button and result text section) with comments for future integration.
- Follow existing coding standards, error handling practices, and component naming conventions.

## Context

### Beginning Context
- The Saigo flow currently has a sign‑in page with its own layout in app/saigo/signin/ (duplicated from the main sign‑in flow). The username generation page does not yet exist.

### Ending Context
- A new Saigo username page will be available at app/saigo/username/page.tsx, accompanied by its layout at app/saigo/username/layout.tsx.
- The page will describe the AI-generated username approach and include interactive elements to trigger the username generation process.
- Placeholders for dynamic username generation and associated messages will be in place, allowing for a future step-by-step integration of the LLM service and username uniqueness checks.

## Low-Level Tasks
> Ordered step-by-step

1. Create the Layout for the Username Page  
```aider
What prompt would you run to complete this task?
What file do you want to CREATE or UPDATE? -> Create a new file at app/saigo/username/layout.tsx
What function do you want to CREATE or UPDATE? -> Duplicate the layout from app/saigo/signin/layout.tsx and update the canonicalUrlRelative to "/saigo/username" and the title to describe the username process.
What are details you want to add to drive the code changes? -> Ensure the layout mimics the existing structure for consistency and applies the saigo-specific SEO adjustments.
```

2. Create the Saigo Username Page  
```aider
What prompt would you run to complete this task?
What file do you want to CREATE or UPDATE? -> Create a new file at app/saigo/username/page.tsx
What function do you want to CREATE or UPDATE? -> Build the new page component that renders the username generation UI.
What are details you want to add to drive the code changes? -> Include a header that explains the username generation process and insert a button (e.g., "Generate Username") along with a placeholder area for the generated username result.
```

3. Add Placeholder and Future Integration Points  
```aider
What prompt would you run to complete this task?
What file do you want to CREATE or UPDATE? -> app/saigo/username/page.tsx
What function do you want to CREATE or UPDATE? -> In the page component's render logic.
What are details you want to add to drive the code changes? -> Insert comments and placeholder code where the integration with the LLM-based service and Supabase username insertion will occur later. Ensure appropriate error handling and result messaging is planned but not fully implemented at this stage.
```

4. Validate Layout and Navigation  
```aider
What prompt would you run to complete this task?
What file do you want to CREATE or UPDATE? -> No file update; this is a QA/test step.
What function do you want to CREATE or UPDATE? -> Verify that navigating to /saigo/username loads the new page with the appropriate layout and placeholder content.
What are details you want to add to drive the code changes? -> Manually test navigation from the sign‑in flow to ensure the new username page is accessible and displays its placeholder elements.
```
