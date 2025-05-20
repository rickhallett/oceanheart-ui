# A/B/C/D Testing Implementation Guide

This document provides technical guidance for implementing the four-variant testing for the OceanHeart.ai landing page using our internal A/B testing library.

## Implementation Approach

We will use the existing A/B testing hooks in `libs/abTesting.tsx` with modifications to support four variants (A/B/C/D) rather than the current two-variant setup.

## Implementation Steps

### 1. Modify the A/B Testing Library

The current A/B testing library in `libs/abTesting.tsx` supports only two variants (A/B). We need to modify it to support four variants:

```typescript
// Update the Variant type
type Variant = "A" | "B" | "C" | "D";

// Update the random variant assignment
const variant: Variant = (() => {
  const random = Math.random();
  if (random < 0.25) return "A";
  if (random < 0.5) return "B";
  if (random < 0.75) return "C";
  return "D";
})();
```

### 2. Component Implementation

Create a component for the landing page hero section that uses the A/B testing hook:

```tsx
import React from 'react';
import { useABTest } from '@/libs/abTesting';

// Define the content for each variant
const headlineVariants = {
  A: "Feeling Lost in the AI Wave? Find Your Clarity & Confidence.",
  B: "Navigating the AI Revolution, Together. Human-First Guidance in a Tech-Driven World.",
  C: "Mastering AI Isn't Just About Code. It's About You. Let's Navigate the Change.",
  D: "AI is Changing Everything. Overwhelmed? I'll Help You Adapt & Thrive."
};

const subheadlineVariants = {
  A: "The world of AI is moving at lightning speed. New tools, new jargon, new anxieties. I'm here to help you cut through the noise, understand what matters for you, and build the skills to thrive in this new era – with your humanity intact.",
  B: "Technology is advancing faster than ever, and it's easy to feel left behind. As your AI coach, I bring a human-centered approach, blending psychological insight with practical guidance to help you confidently integrate AI into your life and work.",
  C: "Beyond the hype and the headlines, there's a human being – you – trying to make sense of it all. With my background in psychology and teaching, I'll help you understand AI from the inside out and find your unique path forward.",
  D: "The constant stream of AI developments can be exhausting. If you're looking for a guide to help you understand, adapt, and leverage AI without losing your footing, you're in the right place."
};

export default function LandingHero() {
  const { getVariant, recordEvent } = useABTest();
  const testId = "landing_headline_test";
  const variant = getVariant(testId);
  
  // Record view event when component mounts
  React.useEffect(() => {
    recordEvent(testId, "view");
  }, [recordEvent, testId]);
  
  const headline = headlineVariants[variant];
  const subheadline = subheadlineVariants[variant];
  
  const handleCTAClick = () => {
    // Record click event
    recordEvent(testId, "click");
  };
  
  return (
    <div className="landing-container">
      <h1 id="landing-headline">
        {headline}
      </h1>
      
      <p id="landing-subheadline">
        {subheadline}
      </p>
      
      {/* Common sections remain the same across variants */}
      <div id="value-proposition">
        {/* "What I Do" section - same across all variants */}
        <p>You're feeling the pressure: The online "mad scramble" to keep up with AI is real. Things change in months, and it's hard to know where to focus.</p>
        {/* Rest of the content... */}
      </div>
      
      <div id="cta-section">
        <h3>Ready to Make Sense of AI? Let's Talk.</h3>
        <p>Book a Free 20-Minute Clarity Call</p>
        <a 
          href={`/schedule?utm_campaign=landing_test&utm_content=variant_${variant.toLowerCase()}`} 
          id="schedule-call-button" 
          className="cta-button"
          onClick={handleCTAClick}
        >
          Schedule Your Free Call Now
        </a>
        <p className="small-text">
          No obligation, just a chance to see how I can help you navigate the AI revolution. Choose a time that works for you, or send me a written message if you prefer.
        </p>
      </div>
    </div>
  );
}
```

### 3. Setup Tracking API Endpoint

Ensure the API endpoint at `/api/ab-tracking` is properly set up to handle the tracking data. If not already implemented, create it:

```typescript
// app/api/ab-tracking/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { testId, variant, event } = await request.json();
    
    // Log the event
    console.log(`A/B Test: ${testId}, Variant: ${variant}, Event: ${event}`);
    
    // Here you would typically store this data in a database
    // Example: await db.insert({ testId, variant, event, timestamp: new Date() }).into('ab_test_events');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking A/B test event:', error);
    return NextResponse.json({ success: false, error: 'Failed to track event' }, { status: 500 });
  }
}
```

### 4. Wrap Your Application with the Provider

Ensure your application is wrapped with the A/B testing provider:

```tsx
// app/layout.tsx
import { ABTestProvider } from '@/libs/abTesting';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ABTestProvider>
          {children}
        </ABTestProvider>
      </body>
    </html>
  );
}
```

### 5. Track Conversions

For conversion tracking on the scheduling page:

```tsx
// app/schedule/page.tsx
'use client';

import { useABTest } from '@/libs/abTesting';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function SchedulePage() {
  const { recordEvent } = useABTest();
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Extract the test information from UTM parameters
    const campaign = searchParams.get('utm_campaign');
    const content = searchParams.get('utm_content');
    
    if (campaign === 'landing_test' && content?.startsWith('variant_')) {
      // Record the conversion
      recordEvent('landing_headline_test', 'conversion');
    }
  }, [recordEvent, searchParams]);
  
  // Rest of the scheduling page component...
}
```

### 6. UTM Parameter Integration

Continue using UTM parameters for external analytics and as a fallback:

1. Append UTM parameters to all CTA links as shown in the component example:
   - Variant A: `?utm_campaign=landing_test&utm_content=variant_a`
   - Variant B: `?utm_campaign=landing_test&utm_content=variant_b`
   - Variant C: `?utm_campaign=landing_test&utm_content=variant_c`
   - Variant D: `?utm_campaign=landing_test&utm_content=variant_d`

2. Ensure these parameters are passed through to the scheduling page

### 7. QA Checklist

Before launching:

- [ ] Modified A/B testing library supports four variants
- [ ] A/B test provider is wrapping the application
- [ ] Landing page correctly displays different content based on variant
- [ ] View, click, and conversion events are being tracked
- [ ] API endpoint is correctly receiving and storing event data
- [ ] UTM parameters are correctly appended to links
- [ ] All variants render correctly on desktop, tablet, and mobile
- [ ] All links work properly across all variants

### 8. Data Analysis

Since we're using our own A/B testing implementation, we need to set up data analysis:

1. Export the event data from your database regularly (e.g., weekly)
2. Create a spreadsheet or use a BI tool to calculate:
   - Views per variant
   - Click-through rate (clicks / views) per variant
   - Conversion rate (conversions / clicks) per variant
3. Run statistical significance tests to determine if differences between variants are meaningful

### 9. Test Duration and Sample Size

- Minimum test duration: 2 weeks
- Recommended minimum sample size: 100 conversions per variant
- Statistical significance threshold: 95% confidence level

### 10. Post-Test Actions

1. Declare a winner based on the highest conversion rate with statistical significance
2. Document learnings from the test
3. Implement the winning variant as the standard landing page
4. Plan follow-up tests based on insights gained 