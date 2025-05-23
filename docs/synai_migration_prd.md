# Synai Page Migration PRD

## Overview
Migrate the standalone `synai.html` file into a fully integrated Next.js page within the Oceanheart.ai website, maintaining the design aesthetics while adapting to the existing site architecture and styling system.

## Current State
- Standalone HTML file at `docs/synai.html`
- Self-contained CSS styling with custom variables and animations
- Independent header/navigation
- Marketing-focused landing page for "Synai: Your Personal AI Coach"

## Target State
- Integrated Next.js page at `/synai`
- Uses existing site header with "Synai" added to navigation with glowing white effect
- Converted to Tailwind CSS + DaisyUI styling system
- Responsive design consistent with site patterns
- Maintains visual impact and marketing messaging

## Content Structure Analysis

### 1. Hero Section
- **Headline**: "Meet Synai"
- **Subtitle**: "Your Personal AI Coach, Engineered for You"
- **Description**: Value proposition about personalized AI
- **CTA**: "Discover Your Personal AI" → Calendar link

### 2. Problem/Solution Comparison
- **Title**: "Generic AI vs. Personal AI"
- **Content**: Two-column comparison (Generic AI vs Synai)
- **Visual**: Card-based layout with contrasting colors

### 3. How It Works Features
- **Title**: "How Synai Works"
- **Content**: 6 feature cards with icons and descriptions
- **Layout**: Responsive grid layout

### 4. Process Steps
- **Title**: "Your Journey to Personal AI"
- **Content**: 3-step process with numbered indicators
- **Layout**: Progressive step visualization

### 5. Technical Details
- **Title**: "The Engineering Behind the Magic"
- **Content**: Prompt architecture visualization
- **Visual**: Code-like XML structure display

### 6. Final CTA
- **Content**: Final conversion section
- **CTAs**: Primary (Calendar) + Secondary (Learn About Kai)

## Design System Mapping

### Color Palette Translation
```css
/* Original Variables → Tailwind/DaisyUI Equivalents */
--primary-color: #1a1f2e → text-base-content, bg-base-300
--accent-color: #4f6df5 → primary, btn-primary
--secondary-color: #7c3aed → secondary, accent
--cosmic-purple: #6366f1 → primary variant
--text-light: #64748b → text-base-content/70
--text-dark: #0f172a → text-base-content
--bg-light: #f8fafc → bg-base-100
--gradient-hero: linear-gradient(135deg, #4f6df5 0%, #7c3aed 100%) → bg-gradient-to-br from-primary to-secondary
```

### Component Patterns
1. **Hero Section** → Use existing hero patterns with gradient background
2. **Feature Cards** → Adapt existing card components with hover effects
3. **Comparison Cards** → Custom card variants with accent borders
4. **Process Steps** → Timeline/stepper component pattern
5. **Technical Display** → Code block styling with syntax highlighting

## Navigation Integration

### Header Modification
- Add "Synai" link to existing navigation array in `components/Header.tsx`
- Position: Between "Consulting" and existing links
- Special styling: Glowing white effect similar to HDI nav styling

### Glowing Effect Implementation
```css
.synai-nav-link {
  position: relative;
  color: white;
  font-weight: bold;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.8), 0 0 10px rgba(255, 255, 255, 0.6);
}

.synai-nav-link::before {
  content: '';
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  border-radius: 6px;
  background: white;
  z-index: -1;
  opacity: 0;
  filter: blur(6px);
  animation: synai-glow 2s infinite;
}
```

## Technical Requirements

### File Structure
```
app/synai/
├── layout.tsx (optional, inherit from root)
├── page.tsx (main component)
└── components/ (if needed)
    ├── SynaiHero.tsx
    ├── ComparisonSection.tsx
    ├── FeaturesSection.tsx
    ├── ProcessSection.tsx
    ├── TechnicalSection.tsx
    └── CTASection.tsx
```

### Dependencies
- Existing: Next.js, Tailwind CSS, DaisyUI, Framer Motion
- New: None required
- Icons: Use existing icon system or emoji fallbacks

### SEO Requirements
- Page title: "Synai: Your Personal AI Coach | Oceanheart.ai"
- Meta description: Extract from hero description
- Open Graph tags: Generate appropriate social media preview
- Structured data: Service/Product schema

## Success Criteria

### Functional Requirements
✅ Page accessible at `/synai`
✅ Responsive design (mobile, tablet, desktop)
✅ Navigation integration with glowing effect
✅ All CTAs functional (calendar links)
✅ Consistent with site styling system
✅ SEO optimized

### Visual Requirements
✅ Maintains visual impact of original design
✅ Smooth animations and transitions
✅ Proper typography hierarchy
✅ Consistent spacing and layout
✅ Hover states and interactions
✅ Loading states if needed

### Performance Requirements
✅ Page load speed < 3 seconds
✅ Lighthouse score > 90
✅ Accessibility compliance (WCAG 2.1 AA)
✅ Mobile-first responsive design

## Implementation Phases

### Phase 1: Foundation (2-3 hours)
1. Create basic page structure
2. Set up routing and navigation
3. Implement header integration with glow effect
4. Create component architecture

### Phase 2: Content Migration (3-4 hours)
1. Hero section implementation
2. Comparison cards section
3. Features grid section
4. Process steps section

### Phase 3: Advanced Features (2-3 hours)
1. Technical visualization section
2. Final CTA section
3. Animation and interaction polish
4. Responsive design refinement

### Phase 4: Testing & Optimization (1-2 hours)
1. Cross-browser testing
2. Mobile responsiveness verification
3. Performance optimization
4. SEO verification
5. Accessibility audit

## Risk Mitigation

### Potential Issues
1. **CSS Conflicts**: Custom animations may conflict with existing styles
   - Solution: Use Tailwind utilities and custom CSS classes with specific prefixes

2. **Performance Impact**: Heavy animations might affect page speed
   - Solution: Use CSS transforms and optimize animation performance

3. **Responsive Breakpoints**: Original design may not translate well to all screen sizes
   - Solution: Implement mobile-first design with progressive enhancement

4. **Browser Compatibility**: Custom CSS effects may not work in all browsers
   - Solution: Provide fallbacks and progressive enhancement

## Acceptance Criteria

### Must Have
- [ ] Page loads correctly at `/synai`
- [ ] Navigation includes "Synai" with glowing white effect
- [ ] All sections present and functional
- [ ] Responsive design works on all devices
- [ ] CTAs link to correct destinations
- [ ] SEO meta tags implemented

### Should Have
- [ ] Smooth scroll animations
- [ ] Hover effects on interactive elements
- [ ] Loading states where appropriate
- [ ] Performance optimized
- [ ] Accessibility compliant

### Could Have
- [ ] Enhanced animations beyond original
- [ ] Additional interactive elements
- [ ] A/B testing framework integration
- [ ] Analytics tracking implementation

## Post-Launch

### Monitoring
- Page views and engagement metrics
- Conversion rate from CTAs
- Performance monitoring
- User feedback collection

### Future Enhancements
- Integration with booking system
- Personalization based on user data
- A/B testing of different messaging
- Additional interactive elements

---

*This PRD serves as the blueprint for migrating the Synai HTML page into the Next.js ecosystem while maintaining its marketing effectiveness and visual appeal.*