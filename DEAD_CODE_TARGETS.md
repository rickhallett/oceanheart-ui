# Potential Dead Code Targets

This document lists components, functions, variables, styles, or other code segments identified as potential candidates for removal due to being unused.

**Verification is required before removal.** Use IDE features ('Find Usages'), static analysis tools (`ts-prune`), and manual code searching to confirm items listed here are truly unused before deleting.

## Potentially Obsolete/Unused Root-Level Files

*These files appear unusual at the root level in a standard Next.js App Router project and might be leftovers from previous structures. Verify they are not used by any scripts or configurations.* 

*   [ ] `page.tsx` - Root level `page.tsx` is typically in `app/`. Is this used?
*   [ ] `globals.css` - Global CSS is typically in `app/globals.css`. Is this file imported/used?
*   [ ] `names.db` - 0-byte file. Likely safe to remove?
*   [ ] `reasoning-effort` - 0-byte file. Likely safe to remove?
*   [ ] `blog.prompt.xml` - Purpose unclear. Used by a build script or generation process?
*   [ ] `gitflow.mdc` - Documentation. Is it still relevant/up-to-date?
*   [ ] `.aider.*` files/dirs - Specific to the 'Aider' tool. Still in use?
*   [ ] `session.aider`, `aider.session`, `bak.aider.model.settings.yml` - Specific to 'Aider'. Still needed?

## Potentially Unused Components (`components/`)

*Verify if these components are imported and used anywhere in the `app/` directory or other components.*

*   [ ] `components/Testimonials11.tsx` - Is this specific version used, or replaced by `Testimonials1.tsx`/`Testimonials3.tsx`?
*   [ ] `components/Testimonial1Small.tsx` - Is this specific variant used?
*   [ ] `components/IntroVideo.tsx` - Is this component currently embedded on any page?
*   [ ] `components/WhyOceanheartVideo.tsx` - Is this component currently embedded on any page?
*   [ ] `components/PracticeTypesRadarChart.tsx` - Verify usage (e.g., in Dashboard).
*   [ ] `components/PracticeTypesStackedBarChart.tsx` - Verify usage.
*   [ ] `components/CumulativePointsAreaChart.tsx` - Verify usage.
*   [ ] `components/PracticeSummaryPieChart.tsx` - Verify usage.
*   [ ] `components/LineGraph.tsx` - Verify usage.

## Functions/Utilities (`libs/` or elsewhere)

*Use `ts-prune` and IDE features to identify unused exported functions/variables.*

*   [ ] `path/to/file.ts` - `functionName` - Reason/Note (Example: Found via ts-prune)

## Variables

*Use IDE features and `ts-prune`.*

*   [ ] `path/to/file.ts` - `variableName` - Reason/Note

## CSS Classes (`globals.css` or component styles)

*Difficult to track automatically. Manual review or specialized tools might be needed.*

*   [ ] `.some-unused-class` - Reason/Note

## Other

*   [ ] `path/to/asset` - Check if images/fonts/etc. in `public/` are referenced. 