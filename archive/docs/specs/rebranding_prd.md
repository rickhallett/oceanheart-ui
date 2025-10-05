Okay, I've analyzed the existing structure, your new branding/copywriting requirements, and the context of your A/B testing setup.

Here is a Product Requirements Document (PRD) designed to guide the repositioning of Oceanheart.ai. This PRD is structured to be compatible with your Task Manager system.

```markdown
# PRD: Oceanheart.ai Repositioning - "The Art of Personal AI"

## 1. High-Level Objectives

1.  **Reposition Oceanheart.ai:** Implement new branding and messaging centered around "The Art of Personal AI" framework and Kai's human-centric AI coaching services. This involves shifting from a philosophical AI safety focus to practical, Human-Centred Transformation guidance.
2.  **Redesign Landing Page (`/`):** Update the main landing page with new copy and a focused hero section reflecting the "Art of Personal AI" branding. Decommission the previous A/B tested hero section.
3.  **Revamp About Page (`/about`):** Update the "About Me" page to align with the new coaching focus, highlighting Kai's unique background (Psychotherapist, Software Engineer, Contemplative Practitioner) and "The Art of Personal AI" philosophy.
4.  **Update Core UI Components:** Modify shared components (`Hero`, `Problem`, `FeaturesAccordion`, `Pricing`, `FAQ`, `CTA`, `Header`, `Footer`) with the new copy, branding, and offerings. Ensure import paths for these components in `app/page.tsx` and `app/layout.tsx` point to their updated locations in `components/`.
5.  **Configuration & Content Alignment:**
    *   Update `config.ts` (appName, appDescription, Stripe plans, potentially theme) to match the new positioning and service offerings.
    *   Ensure content in `components/Pricing.tsx` accurately reflects the new coaching packages/services derived from "The Art of Personal AI".
6.  **A/B Testing Infrastructure:** Preserve the existing A/B testing framework (`libs/abTesting.tsx`, `/api/ab-tracking` route, `/app/ab-testing/page.tsx` dashboard) for potential future use. The current A/B test for landing page headlines will be superseded by the new single, focused landing page design.

## 2. Mid-Level Objectives

### 2.1. Landing Page Content Implementation
    *   Implement the new headline, sub-headline, problem block, solution block (introducing "The Art of Personal AI" & Kai's role), and framework snapshot (3 layers) on the landing page.
    *   Update the primary Call to Action (CTA) button text and the secondary link ("Learn about Kai →").
    *   Ensure `app/page.tsx` imports and uses the updated `Hero`, `Problem`, `FeaturesAccordion`, `Pricing`, `FAQ`, and `CTA` components from the `components/` directory.

### 2.2. About Me Page Content Implementation
    *  use the about_me_page_content.md file for copy and structure, and add a call-out box CTA on the "About Me" page (`app/about/page.tsx`).

### 2.3. Core Component Updates
    *   **`components/Hero.tsx`**: Replace content with the new landing page headline, sub-headline, and introductory paragraphs.
    *   **`components/Problem.tsx`**: Update with the new "Problem Block" copy.
    *   **`components/FeaturesAccordion.tsx`**: Adapt to showcase the new core offerings/services derived from "The Art of Personal AI" (e.g., Executive Guidance, Workshops, Courses), or create a new dedicated "Offerings" component if `FeaturesAccordion` is not suitable for this.
    *   **`components/Pricing.tsx`**: Update content and structure to reflect the new service packages. This will require new data for `config.ts` under `stripe.plans`.
    *   **`components/FAQ.tsx`**: Update with new questions and answers relevant to the AI coaching services.
    *   **`components/CTA.tsx`**: Update with the new primary and secondary call-to-action buttons.
    *   **`components/Header.tsx` & `components/Footer.tsx`**: Review and update links, branding, and potentially the theme reference for a lighter aesthetic. Ensure `app/page.tsx` and `app/layout.tsx` correctly import these from `components/`.

### 2.4. Configuration Updates
    *   Modify `config.ts`:
        *   Update `appName` and `appDescription`.
        *   Overhaul `stripe.plans` to match new service offerings (Executive Guidance, Workshop, Course). Define names, descriptions, prices, features for each.
        *   Consider changing `colors.theme` to a lighter theme (e.g., "cupcake", "emerald", or a custom light theme) if "synthwave" doesn't align with the "light palette, ample whitespace" aesthetic.

### 2.5. A/B Testing System Management
    *   Remove or refactor `components/HeroABTest.tsx`. The landing page will use `components/Hero.tsx` directly.
    *   Ensure `app/page.tsx` no longer attempts to use `HeroABTest.tsx` for variant display.
    *   Verify that `libs/abTesting.tsx` and related API/dashboard pages remain functional but are not actively splitting traffic for the main hero section without new configuration.

## 3. Implementation Notes

*   **Target Component Location:** All primary UI component updates (Hero, Problem, etc.) should target the files located in `components/`. Import paths in `app/page.tsx` and other layout/page files must be updated accordingly (e.g., from `@/components/` to `@/components/`).
*   **Copy Integration:** Use the exact copy provided in the "elite brand copywriter" prompt for the landing page and "About Me" page sections.
*   **Styling & Theme:**
    *   Adhere to the desired aesthetic: "minimal, clean, light palette, ample whitespace, micro-humor, calm authority."
    *   If the current DaisyUI theme (`synthwave` in `config.ts`) conflicts with this, update `config.ts` to a more suitable light theme, or customize Tailwind/DaisyUI.
*   **A/B Testing:** The immediate goal is to launch the *new, single version* of the landing page. The existing A/B testing infrastructure (`libs/abTesting.tsx`, API, dashboard) should be preserved for *future* A/B tests on the new content, not for deploying multiple versions of this initial rebrand. If future tests require more than 2 variants, `libs/abTesting.tsx` will need the previously discussed modification.
*   **Pricing Section:** The `components/Pricing.tsx` component and the `config.ts` `stripe.plans` section will require significant updates to reflect the new coaching offerings. The PRD assumes new plan details (names, prices, features) will be provided or developed as part of implementing these tasks.
*   **Responsive Design:** Ensure all updated pages and components are fully responsive.
*   **Accessibility:** Maintain or improve accessibility standards.

## 4. Content Strategy (Generated Copy)

### 4.1. Landing Page Copy

*   **A. Headline (≤ 12 words):**
    Human-Centred Transformation: Your Human Edge, Amplified.
*   **B. Sub-headline (≤ 25 words):**
    Overwhelmed by AI's pace? Master it with heart, clarity, and Kai’s unique guidance.
*   **C. Problem Block (50-70 words):**
    The AI revolution is here—fast, furious, and often confusing. Endless tools, shifting jargon, and the pressure to adapt can feel like drowning. You know AI is vital, but how do you engage meaningfully without losing your human core or your sanity?
*   **D. Solution Block (70-90 words):**
    I'm Kai, your specialist in Human-Centred Transformation. With 15 years as a psychotherapist, 5 as a software engineer, and two decades of contemplative practice, I bridge the technical with the deeply human. "The Art of Personal AI" isn't another course; it’s my framework to help you intuitively understand and master AI.
*   **E. Framework Snapshot (3 layers, ≤ 40 words total):**
    *   Story · Spirit · Science → Amplified Consciousness
    *   Prompt · Context · Model → Amplified Sensitivity
    *   IQ · EQ · AI → Amplified Intelligence
*   **G. Primary CTA Button Text (3 words):**
    Integrate AI Now
*   **Secondary Link Text:**
    Learn about Kai → (links to `/about`)

### 4.2. About Me Page Copy

*   **A. Short Origin Story (60-80 words):**
    For 15 years, I sat with human stories as a psychotherapist. Then, as a software engineer, I built with data. But it was my 20 years in contemplative practice that showed me the common thread: consciousness. Now, I fuse these worlds, guiding professionals like you to integrate AI not just as a tool, but as an extension of mindful, human-centered work.
*   **B. The Crossover Skillset (90-110 words):**
    *   **Psychotherapist:** Deep understanding of human experience, resistance, and the relational aspects of learning.
    *   **Software Engineer:** Practical, first-principles grasp of AI technology, demystifying the complex.
    *   **Contemplative Practitioner:** Grounded in ethical awareness, fostering presence and conscious choice amidst rapid change.
    This blend allows me to translate AI's power into your language, for your specific needs, ensuring technology serves your humanity.
*   **C. Philosophy Statement (60-80 words):**
    True AI mastery isn't just about clever prompts. It's about weaving your unique Story (experience) with timeless Spirit (values) and clear Science (understanding). My "Art of Personal AI" framework helps you amplify your intelligence and sensitivity by consciously engaging with AI's context, models, and your own evolving consciousness.
*   **D. Personal Quirks (1 sentence):**
    I occasionally find myself explaining complex AI concepts to my cat, who remains unimpressed but a very good listener.
*   **E. Call-out Box CTA:**
    Ready to integrate consciously? → Book a Call

## 5. Context

### 5.1. Beginning Context
*   Current website focused on AI Safety, Consciousness, AGI with a philosophical tone.
*   Landing page may be using `components/HeroABTest.tsx` or a different Hero component.
*   Core components exist in `components/` and `components/` (PRD targets `components/` for updates).
*   `config.ts` has existing appName, appDescription, and Stripe plans.
*   A/B testing infrastructure (`libs/abTesting.tsx`, API, dashboard) is present.
*   `app/page.tsx` and `app/layout.tsx` import components, likely from root `components/`.

### 5.2. Ending Context
*   Website repositioned to human-centric AI coaching with "The Art of Personal AI" framework.
*   Landing page (`app/page.tsx` using `components/Hero.tsx`) and About page (`app/about/page.tsx`) updated with new copy.
*   Core UI components in `components/` (Hero, Problem, FeaturesAccordion, Pricing, FAQ, CTA, Header, Footer) updated with new content and styling.
*   `app/page.tsx` and relevant layouts import components from `components/`.
*   `config.ts` reflects new appName, appDescription, and crucially, new Stripe plans for coaching services.
*   A/B testing infrastructure is preserved but the previous headline test is inactive.

## 6. Low-Level Tasks
> Ordered from start to finish

1.  **Update `config.ts` with New Branding and Initial Service Structure**
    ```aider
    What prompt would you run to complete this task? Update appName, appDescription, and stripe.plans in config.ts.
    What file do you want to CREATE or UPDATE? -> config.ts
    What function do you want to CREATE or UPDATE? -> N/A (Data update)
    What are details you want to add to drive the code changes? ->
    - appName: "Oceanheart.ai - Human-Centred Transformation" (or similar based on character limits/preference)
    - appDescription: "Human-centric AI coaching with Kai. Master AI with heart, clarity, and purpose using 'The Art of Personal AI' framework. Integrate Story, Spirit, and Science."
    - stripe.plans:
        - Define at least 3 new plans based on "The Art of Personal AI" offerings:
            1.  Name: "Executive Guidance Partnership", Description: "1:1 strategic partnership for wellbeing leaders.", Price: (Define), Frequency: (e.g., "per month" or "package"), Features: ["Personalized AI strategy", "Ethical framework integration", "Transformative coaching"].
            2.  Name: "'Bridging Worlds' Workshop", Description: "Immersive group learning for AI discernment.", Price: (Define), Frequency: "per workshop", Features: ["Integrate tech & wisdom", "Build confidence", "Connect with peers"].
            3.  Name: "First Principles AI Course", Description: "Self-paced foundational AI learning.", Price: (Define), Frequency: "one-time", Features: ["Core AI concepts", "Ethical integration practices", "Lifetime access"].
        - Remove or comment out old/irrelevant plans.
    - Consider `colors.theme`: If 'synthwave' is too dark, suggest changing to a lighter theme like 'cupcake' or 'emerald' to align with "light palette." For now, retain 'synthwave' but note for review.
    ```

2.  **Update `components/Header.tsx` Content and Styling**
    ```aider
    What prompt would you run to complete this task? Refactor components/Header.tsx with updated links and ensure it aligns with the new branding.
    What file do you want to CREATE or UPDATE? -> components/Header.tsx
    What function do you want to CREATE or UPDATE? -> Header component
    What are details you want to add to drive the code changes? ->
    - Update `links` array:
        - { href: "/#pricing", label: "Offerings" }
        - { href: "/about", label: "About Kai" } (or "My Approach")
        - { href: "https://www.oceanheart.blog/", label: "Blog" }
        - { href: "/consulting", label: "Consulting" } // Or a contact page link
        - { href: "/#contact", label: "Contact", className: "hdi-nav-link relative" } // if #contact exists
    - Ensure `config.appName` is used for logo alt text and title.
    - Verify CTA button (`ButtonSignin`) is appropriate or if it should be a "Book a Call" link. For header, `ButtonSignin` is likely fine.
    ```

3.  **Update `components/Footer.tsx` Content and Styling**
    ```aider
    What prompt would you run to complete this task? Refactor components/Footer.tsx with updated links and ensure it aligns with the new branding.
    What file do you want to CREATE or UPDATE? -> components/Footer.tsx
    What function do you want to CREATE or UPDATE? -> SuspendedFooter component
    What are details you want to add to drive the code changes? ->
    - Update displayed links to be consistent with Header and new offerings.
        - Support: `mailto:${config.resend.supportEmail}`
        - Offerings: `/#pricing`
        - Blog: `https://www.oceanheart.blog/`
        - About Kai: `/about`
    - Ensure `config.appName` and `config.appDescription` are used.
    - Confirm `privacyLink` logic is still appropriate.
    ```

4.  **Update `components/Hero.tsx` with New Landing Page Copy**
    ```aider
    What prompt would you run to complete this task? Implement the new landing page hero copy in components/Hero.tsx.
    What file do you want to CREATE or UPDATE? -> components/Hero.tsx
    What function do you want to CREATE or UPDATE? -> Hero component
    What are details you want to add to drive the code changes? ->
    - Replace existing h1 with: "Human-Centred Transformation: Your Human Edge, Amplified."
    - Replace existing sub-headline p tag with: "Overwhelmed by AI's pace? Master it with heart, clarity, and Kai’s unique guidance."
    - Add new p tags for the value proposition points related to integrity, first principles, and Kai's background.
    - Update the primary CTA button to: Text "Integrate AI Now", href: "https://calendar.app.google/85ZdaqYK5vfNk4aH9" (or a dynamic link from config).
    - Add secondary link: Text "Learn about Kai →", href: "/about".
    - Update placeholder image `src="/images/placeholder_hero.png"` and alt text if a more suitable image is available or to match the new theme.
    ```

5.  **Update `components/Problem.tsx` with New Problem Block Copy**
    ```aider
    What prompt would you run to complete this task? Implement the new problem statement in components/Problem.tsx.
    What file do you want to CREATE or UPDATE? -> components/Problem.tsx
    What function do you want to CREATE or UPDATE? -> Problem component
    What are details you want to add to drive the code changes? ->
    - Replace the main h2 headline with: "We Need Big Heart to Meet Big Tech".
    - Replace agitation point h2 with: "Tired of simplistic, tech-first approaches that overlook the complexity of human connection?".
    - Replace the subsequent paragraphs with the new problem description: "The AI revolution offers immense possibilities... navigate the chasm alone."
    - Update the "Step" components if the emojis/text need to align better with the new problem statement (e.g., "AI Overwhelm", "Ethical Fog", "Human Disconnect", "Seeking Clarity"). For now, use the provided copy verbatim.
    ```

6.  **Update `components/FeaturesAccordion.tsx` (or create new component for Solution/Framework)**
    ```aider
    What prompt would you run to complete this task? Adapt components/FeaturesAccordion.tsx to present the 'Solution Block' and 'Framework Snapshot' from the new copy, or advise if a new component is better.
    What file do you want to CREATE or UPDATE? -> components/FeaturesAccordion.tsx
    What function do you want to CREATE or UPDATE? -> FeaturesAccordion component and its `features` data array.
    What are details you want to add to drive the code changes? ->
    - Current `FeaturesAccordion` lists specific services. The new requirement is to show the "Solution Block" and "Framework Snapshot".
    - Option A (Modify Existing):
        - Update the main headline of the section: "The Art of Personal AI: Your Path to Conscious Integration"
        - Modify the `features` array:
            - Item 1 Title: "Kai's Guidance: Your Conscious AI Integrator", Description: (Content of "Solution Block")
            - Item 2 Title: "The Framework: Amplify Your Human Edge", Description: (Bulleted list of the 3 layers: "Story · Spirit · Science → Amplified Consciousness", etc.)
            - Replace icons (FaUserTie, FaCompass etc.) and images/alt text to be more conceptual or related to Kai/Framework.
    - Option B (New Component): If `FeaturesAccordion` is to remain for specific *service features*, then a new component (e.g., `SolutionFramework.tsx`) should be created to house the "Solution Block" and "Framework Snapshot" and placed before `FeaturesAccordion` on the landing page.
    - **Chosen Path for this task: Modify Existing `FeaturesAccordion.tsx` (Option A). This is a more direct change for now.**
    - The existing `features` array in `FeaturesAccordion.tsx` lists 5 items like "Executive Guidance Partnership". This should be changed to reflect the Solution Block and Framework description.
    - New `features` data:
      ```javascript
      const features: Feature[] = [
        {
          title: "Your Guide: Human-Centred Transformation with Kai",
          description: "I'm Kai, your specialist in Human-Centred Transformation. With 15 years as a psychotherapist, 5 as a software engineer, and two decades of contemplative practice, I bridge the technical with the deeply human. 'The Art of Personal AI' isn't another course; it’s my framework to help you intuitively understand and master AI.",
          svg: <FaUserTie className="w-6 h-6" />, // Placeholder icon
          type: "image", // Or 'svg' if no specific image
          path: "/images/kai_profile.jpeg", // Example image
          alt: "Kai, Human-Centred Transformation Specialist",
        },
        {
          title: "The Framework: The Art of Personal AI",
          description: "Unlock your potential with a 3-layer model:\n• Story · Spirit · Science → Amplified Consciousness\n• Prompt · Context · Model → Amplified Sensitivity\n• IQ · EQ · AI → Amplified Intelligence",
          svg: <FaCompass className="w-6 h-6" />, // Placeholder icon
          type: "image", // Or 'svg'
          path: "/images/framework_visual_placeholder.jpg", // Placeholder for a framework visual
          alt: "The Art of Personal AI Framework",
        },
      ];
      ```
    - The `FeaturesAccordion.tsx` component might need its internal structure reviewed if it's hardcoded for 5 features or if the display style (accordion vs. static block) is not ideal for the new content. For now, assume content replacement.
    ```

7.  **Update `components/Pricing.tsx` Content**
    ```aider
    What prompt would you run to complete this task? Update components/Pricing.tsx to reflect the new service offerings based on config.ts.
    What file do you want to CREATE or UPDATE? -> components/Pricing.tsx
    What function do you want to CREATE or UPDATE? -> Pricing component
    What are details you want to add to drive the code changes? ->
    - This component dynamically renders plans from `config.stripe.plans`.
    - The main task is to ensure that the `config.ts` (Task 1) has the correct new plans.
    - Review the rendering logic in `Pricing.tsx` to ensure it gracefully handles the new plan structures (e.g., if some plans now have a "Book a Call" CTA instead of a direct purchase).
    - Update any introductory text or section headline within `Pricing.tsx` to align with the "Offerings" terminology. Example headline: "Explore Your Path to Human-Centred Transformation".
    ```

8.  **Update `components/FAQ.tsx` Content**
    ```aider
    What prompt would you run to complete this task? Update the questions and answers in components/FAQ.tsx.
    What file do you want to CREATE or UPDATE? -> components/FAQ.tsx
    What function do you want to CREATE or UPDATE? -> N/A (Data update in `faqList` array)
    What are details you want to add to drive the code changes? ->
    - Replace the existing `faqList` with new Q&A relevant to AI coaching:
      1.  Q: "What is 'The Art of Personal AI'?"
          A: "It's Kai's unique 3-layer framework (Story/Spirit/Science, Prompt/Context/Model, IQ/EQ/AI) for integrating AI consciously, amplifying your human intelligence and sensitivity."
      2.  Q: "Who is this AI coaching for?"
          A: "Smart professionals, therapists, coaches, and creatives feeling overwhelmed by AI, who seek to understand and use it meaningfully without losing their human core."
      3.  Q: "How is this different from other AI courses?"
          A: "We focus on *your* integration of AI, blending deep human understanding (from psychotherapy & contemplative practice) with practical tech know-how, rather than just listing tools."
      4.  Q: "What if I'm not technical?"
          A: "Perfect. This coaching is designed to demystify AI. Kai translates complex concepts into your language, focusing on principles over fleeting tech trends."
      5.  Q: "How do I get started?"
          A: "Book a free, no-obligation 20-minute Clarity Call with Kai to discuss your needs and see if this is the right fit for you. [Link to calendar]"
    ```

9.  **Update `components/CTA.tsx` Content**
    ```aider
    What prompt would you run to complete this task? Update the Call To Action content in components/CTA.tsx.
    What file do you want to CREATE or UPDATE? -> components/CTA.tsx
    What function do you want to CREATE or UPDATE? -> CTA component
    What are details you want to add to drive the code changes? ->
    - Update Headline: "Ready to Integrate AI Consciously?"
    - Update Subheading: "Move from AI overwhelm to amplified human potential. Book your discovery call with Kai."
    - Update Button: Text "Book Your Free Discovery Call", href: "https://calendar.app.google/85ZdaqYK5vfNk4aH9" (or config link).
    - Remove or update secondary link if not relevant. The previous "Explore Workshops & Courses" could link to `/#pricing`.
    - Update background image and alt text to something more aligned with clarity, connection, or conscious tech.
    ```

10. **Update `app/about/page.tsx` with New "About Me" Copy**
    ```aider
    What prompt would you run to complete this task? Implement the new 'About Me' page copy in app/about/page.tsx.
    What file do you want to CREATE or UPDATE? -> app/about/page.tsx
    What function do you want to CREATE or UPDATE? -> AboutPage component
    What are details you want to add to drive the code changes? ->
    - Replace existing sections with the new content:
        - Section 1 (Intro): Use "The Challenge We All Face" copy.
        - Section 2 (Profile & Story): Use "Origin Story", "Crossover Skillset", and "Philosophy Statement" copy. The current page has a "My Journey", "Our Vision", "Private Consulting" structure. This needs to be adapted. The new copy is more personal and focused.
        - The `WhyOceanheartVideo` component might need to be re-evaluated or its context adjusted.
        - Ensure the new page title is one of the suggested options (e.g., "About Kai: Your Guide in the Age of AI").
        - Update profile image if needed. Current is `about_me_profile_2.jpeg`.
        - Incorporate the "Personal Quirks" line.
        - Add the "Call-out Box CTA" prominently.
    ```

11. **Update `app/page.tsx` and `app/layout.tsx` Component Import Paths**
    ```aider
    What prompt would you run to complete this task? Update import paths in app/page.tsx and app/layout.tsx to point to components/.
    What file do you want to CREATE or UPDATE? -> app/page.tsx AND app/layout.tsx
    What function do you want to CREATE or UPDATE? -> N/A (Import path updates)
    What are details you want to add to drive the code changes? ->
    - In `app/page.tsx`: Change imports for `Header`, `Hero`, `Problem`, `FeaturesAccordion`, `Pricing`, `FAQ`, `CTA`, `Footer` from ` "@/components/..."` to ` "@/components/..."`.
    - In `app/layout.tsx`: If `Header` or `Footer` are imported there (they are via `ClientLayout`, which might import them, or directly), update those paths too. The current `app/layout.tsx` imports `ClientLayout from "@/components/LayoutClient"`. If `LayoutClient.tsx` imports Header/Footer from root `components/`, its imports need to change too, or the components need to be moved to `components` and `LayoutClient.tsx` updated.
    - **Focus for this task:** Directly update `app/page.tsx`. Analyze `ClientLayout` if it also uses these components and update its imports if necessary. If `Header` and `Footer` are directly in `app/layout.tsx`, update them there.
    - For `app/page.tsx`:
        ```diff
        --- a/app/page.tsx
        +++ b/app/page.tsx
        @@ -1,12 +1,12 @@
         import { Suspense } from "react";
        -import Header from "@/components/Header";
        -// import HeroABTest from "@/components/HeroABTest"; // To be removed or refactored
        -import Problem from "@/components/Problem";
        -import FeaturesAccordion from "@/components/FeaturesAccordion";
        -import Pricing from "@/components/Pricing";
        -import FAQ from "@/components/FAQ";
        -import CTA from "@/components/CTA";
        -import Footer from "@/components/Footer";
        -// import LandingHero from "@/docs/components/LandingHero"; // Likely unused now
        -import Hero from "@/components/Hero";
        +import Header from "@/components/Header";
        +import Problem from "@/components/Problem";
        +import FeaturesAccordion from "@/components/FeaturesAccordion";
        +import Pricing from "@/components/Pricing";
        +import FAQ from "@/components/FAQ";
        +import CTA from "@/components/CTA";
        +import Footer from "@/components/Footer";
        +import Hero from "@/components/Hero";
         
         export default function Home() {
           return (
        ```
    - For `app/layout.tsx`:
        ```diff
        --- a/app/layout.tsx
        +++ b/app/layout.tsx
        @@ -4,7 +4,7 @@
         import { SpeedInsights } from "@vercel/speed-insights/next";
         import { Viewport } from "next";
         import { getSEOTags } from "@/libs/seo";
        -import ClientLayout from "@/components/LayoutClient";
        +import ClientLayout from "@/components/LayoutClient"; // Assuming LayoutClient is moved or its internal imports are updated
         import config from "@/config";
         import Script from "next/script";
         import { ABTestProvider } from "@/libs/abTesting";
        ```
        (This assumes `LayoutClient.tsx` is also moved to `components` or its internal imports are updated if it uses Header/Footer from the root `components` dir). It is safer to assume `LayoutClient` will be moved to `components/LayoutClient.tsx` and its internal imports (if any to Header/Footer) will be from `components/`.

12. **Decommission Old Hero A/B Test and Update `app/page.tsx`**
    ```aider
    What prompt would you run to complete this task? Remove HeroABTest usage from app/page.tsx.
    What file do you want to CREATE or UPDATE? -> app/page.tsx
    What function do you want to CREATE or UPDATE? -> Home component rendering
    What are details you want to add to drive the code changes? ->
    - Remove the import for `HeroABTest`.
    - Ensure the page directly renders the updated `Hero` component (imported from `components/Hero.tsx`).
    - Delete `components/HeroABTest.tsx` if it's no longer needed, or refactor its content if any part is reusable in the new `components/Hero.tsx`. For this PRD, assume removal/replacement.
    ```

13. **Review and Test**
    ```aider
    What prompt would you run to complete this task? This is a manual review and testing step.
    What file do you want to CREATE or UPDATE? -> N/A
    What function do you want to CREATE or UPDATE? -> N/A
    What are details you want to add to drive the code changes? ->
    - Thoroughly review all updated pages (Landing, About) and components for correct content, styling, and responsiveness.
    - Test all links, especially CTAs.
    - Verify the theme application.
    - Check console for errors.
    - Ensure the A/B testing infrastructure is not causing errors on the live site, even if not actively testing the hero.
    ```
```