# Master Presentation Specification

## Overview
This document defines the common styling, fonts, layout, and technical guidelines for all HTML presentations in the Applications in Entrepreneurship course. Each class-specific presentation spec should reference this document for consistency.

**Brand Integration:** This spec combines NCSSM's official brand guidelines with a modern startup aesthetic appropriate for entrepreneurship education.

---

## NCSSM Brand Reference

Based on [NCSSM's official branding kit](https://brand.ncssm.edu/):

- **Primary Colors:** Royal Blue and Gray (School colors: "Royal and Gray")
- **Brand Blue:** Chambray Blue `#356093`
- **Typography:** Montserrat (primary), Georgia (secondary), Verdana (fallback)
- **Mascot:** Unicorns
- **Style:** Clean, professional, academically rigorous with innovation energy

---

## Design Philosophy

### NCSSM + Startup Aesthetic
- **Dark mode** primary design - reduces eye strain, modern feel, focuses attention
- **NCSSM Royal Blue** as primary accent - connects to school identity
- **Bold, confident typography** - using Montserrat for headings, Georgia for body
- **Dynamic animations** - purposeful motion that reinforces learning
- **Clean, minimal chrome** - content is the hero
- **Accessible** - keyboard navigation, high contrast, semantic HTML

### Visual Principles
1. **Contrast** - Dark backgrounds with NCSSM blue and bright text
2. **Hierarchy** - Use scale (3.5rem → 1.5rem) not just color for importance
3. **Whitespace** - Generous padding, centered max-width containers
4. **Consistency** - Same patterns across all presentations
5. **Academic Credibility** - Professional feel befitting NCSSM's reputation

---

## Color Palette

```css
:root {
  /* ===== NCSSM Brand Colors ===== */
  --ncssm-blue: #356093;           /* Official Chambray Blue */
  --ncssm-blue-light: #4a7ab8;     /* Lighter variant */
  --ncssm-blue-dark: #264570;      /* Darker variant */
  --ncssm-blue-glow: rgba(53, 96, 147, 0.4);
  --ncssm-gray: #6b7280;           /* Brand gray */
  --ncssm-gray-light: #9ca3af;     /* Light gray */
  --ncssm-gray-dark: #4b5563;      /* Dark gray */

  /* ===== Backgrounds (Dark Mode) ===== */
  --bg-primary: #0c1220;           /* Main slide - deep blue-black */
  --bg-secondary: #141c2e;         /* Cards, sidebar - blue-tinted dark */
  --bg-tertiary: #1c2640;          /* Nested content, code blocks */
  --bg-hover: #243352;             /* Interactive hover states */

  /* ===== Text ===== */
  --text-primary: #ffffff;         /* Main headings, emphasis */
  --text-secondary: #b8c4d6;       /* Body text, descriptions (blue-tinted) */
  --text-tertiary: #6b7a94;        /* Captions, metadata */
  --text-dim: #4a5568;             /* Inactive, placeholder */

  /* ===== Primary Accent (NCSSM Blue) ===== */
  --accent: #356093;               /* Primary accent - NCSSM Chambray Blue */
  --accent-bright: #4a7ab8;        /* Bright variant for hover/emphasis */
  --accent-glow: rgba(53, 96, 147, 0.4);

  /* ===== Secondary Accent (Entrepreneurship Gold) ===== */
  --accent-secondary: #d4a028;     /* Gold - innovation, success, energy */
  --accent-secondary-bright: #e8b84a;
  --accent-secondary-glow: rgba(212, 160, 40, 0.3);

  /* ===== Status Colors ===== */
  --success: #22c55e;              /* Green - positive, growth, validation */
  --warning: #f59e0b;              /* Amber - caution, attention */
  --danger: #ef4444;               /* Red - risk, problems, failure */
  --info: #356093;                 /* NCSSM Blue - information */

  /* ===== Gradients ===== */
  --gradient-hero: linear-gradient(135deg, #356093 0%, #d4a028 100%);
  --gradient-ncssm: linear-gradient(135deg, #264570 0%, #4a7ab8 100%);
  --gradient-text: linear-gradient(135deg, #ffffff 0%, #d4a028 100%);
  --gradient-dark: linear-gradient(180deg, #0c1220 0%, #141c2e 100%);
}
```

---

## Typography

### Fonts (NCSSM Brand Guidelines)
```css
/* Primary font - headings and display (NCSSM: Montserrat) */
--font-display: 'Montserrat', Verdana, -apple-system, BlinkMacSystemFont, sans-serif;

/* Secondary font - body text (NCSSM: Georgia) */
--font-body: 'Georgia', 'Times New Roman', serif;

/* Monospace - numbers, data, code */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Font Loading
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

**Note:** Georgia is a system font and doesn't require loading. The combination of Montserrat (modern, geometric sans-serif) for headings with Georgia (classic, readable serif) for body text creates the professional-yet-innovative feel appropriate for NCSSM.

### Type Scale
```css
/* Hero/Title */
.slide-title h1 {
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

/* Major Statement */
.statement {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
}

/* Section Heading */
.slide h2 {
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1.3;
}

/* Primary Text */
.primary-text {
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.4;
}

/* Secondary Text */
.secondary-text {
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--text-secondary);
}

/* Body Text */
.body-text {
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.6;
}

/* Caption */
.caption {
  font-size: 1rem;
  font-weight: 400;
  color: var(--text-tertiary);
}

/* Big Numbers (for statistics, metrics) */
.big-number {
  font-size: 6rem;
  font-weight: 800;
  font-family: var(--font-mono);
  background: var(--gradient-hero);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### Minimum Font Sizes (Classroom Readability)

**Context:** These presentations are delivered on ~80" TVs in classrooms (students 10-30 feet away) AND simultaneously over Zoom to the Morganton campus. All text must be readable in both contexts.

| Element Type | Minimum Size | Notes |
|--------------|--------------|-------|
| **Titles/Headlines** | `2.5rem` (40px) | Slide titles, section headers |
| **Primary Content** | `1.5rem` (24px) | Main text, bullet points, key messages |
| **Secondary Content** | `1.25rem` (20px) | Supporting text, descriptions |
| **Labels & Captions** | `1.25rem` (20px) | Chart labels, diagram annotations, D3 text |
| **Absolute Minimum** | `1rem` (16px) | Only for non-essential metadata (e.g., keyboard hints) |

**Critical Rules:**
1. **No pixel values under 16px** - Ever. For any visible text.
2. **Use rem units** - Scales properly with browser/display settings
3. **D3 visualizations** - All `.attr('font-size', ...)` must use rem: `'1.25rem'` minimum
4. **Chart labels** - Must be readable from back of room; prefer `1.25rem` or larger
5. **Test readability** - Preview on actual classroom TV before final delivery

**Code Review Checklist:**
```javascript
// BAD - Too small for classroom
.attr('font-size', '12px')
.attr('font-size', '14px')
.style('font-size', '0.8rem')

// GOOD - Classroom readable
.attr('font-size', '1.25rem')
.attr('font-size', '1.5rem')
.style('font-size', '1.25rem')
```

```css
/* BAD - Too small */
font-size: 12px;
font-size: 0.75rem;
font-size: 14px;

/* GOOD - Classroom readable */
font-size: 1rem;      /* Absolute minimum */
font-size: 1.25rem;   /* Labels, captions */
font-size: 1.5rem;    /* Body text */
```

---

## Layout System

### Slide Container
```css
.slide {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  background: var(--bg-primary);
}

.slide-content {
  max-width: 1200px;
  width: 100%;
  text-align: center;
}
```

### Slide Types

1. **Title Slide** (`.slide-title`)
   - Large title, subtitle, course branding
   - Used for: Course title, chapter intros

2. **Statement Slide** (`.slide-statement`)
   - Single powerful statement
   - Used for: Key concepts, memorable quotes

3. **Two-Part Slide** (`.slide-two-part`)
   - Primary + secondary text, optional icon
   - Used for: Definitions, explanations

4. **Visual Slide** (`.slide-visual`)
   - Title + large visualization area + caption
   - Used for: Charts, diagrams, animations

5. **List Slide** (`.slide-list`)
   - Heading + bullet points (animated entrance)
   - Used for: Steps, principles, criteria

6. **Comparison Slide** (`.slide-comparison`)
   - Two columns for contrast
   - Used for: Before/after, good/bad, problem/solution

7. **Quote Slide** (`.slide-quote`)
   - Large quote + attribution
   - Used for: Expert quotes, inspiration

8. **Number Slide** (`.slide-number`)
   - Big statistic + context
   - Used for: Market size, metrics, data points

9. **Exercise Slide** (`.slide-exercise`)
   - Interactive prompt for class activity
   - Used for: Workshops, group work

---

## Animation Guidelines

### Transition Timings
```css
--transition-fast: 150ms ease;
--transition-normal: 300ms ease;
--transition-slow: 500ms ease;
--transition-enter: 600ms cubic-bezier(0.16, 1, 0.3, 1);
```

### Slide Transitions
```css
.slide {
  opacity: 0;
  visibility: hidden;
  transform: translateX(30px);
  transition:
    opacity var(--transition-slow),
    transform var(--transition-slow),
    visibility var(--transition-slow);
}

.slide.active {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
}

.slide.prev {
  transform: translateX(-30px);
}
```

### Content Entrance Animations
```css
/* Fade up (default for content) */
@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scale in (for icons, numbers) */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Staggered list items */
.slide.active .list-item {
  animation: fadeUp 500ms ease forwards;
}
.slide.active .list-item:nth-child(1) { animation-delay: 100ms; }
.slide.active .list-item:nth-child(2) { animation-delay: 200ms; }
.slide.active .list-item:nth-child(3) { animation-delay: 300ms; }
/* ... continue pattern */
```

### D3.js Animation Patterns
```javascript
// Standard easing functions to use
d3.easeQuadOut      // Deceleration (entering)
d3.easeQuadIn       // Acceleration (exiting)
d3.easeQuadInOut    // Smooth both ways
d3.easeElastic      // Bouncy, attention-grabbing

// Recommended durations
const DURATION_FAST = 300;
const DURATION_NORMAL = 600;
const DURATION_SLOW = 1000;
const STAGGER_DELAY = 150;

// Pattern: Staggered entrance
elements.forEach((el, i) => {
  d3.select(el)
    .attr('opacity', 0)
    .transition()
    .delay(i * STAGGER_DELAY)
    .duration(DURATION_NORMAL)
    .ease(d3.easeQuadOut)
    .attr('opacity', 1);
});
```

---

## Common Components

### Cards
```css
.card {
  background: var(--bg-secondary);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 2rem;
  transition: transform var(--transition-normal),
              box-shadow var(--transition-normal);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.card-highlight {
  border-color: var(--accent);
  box-shadow: 0 0 30px var(--accent-glow);
}
```

### Buttons
```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  transition: all var(--transition-fast);
}

.btn-primary {
  background: var(--accent);
  color: var(--bg-primary);
}

.btn-primary:hover {
  background: var(--accent-bright);
  transform: translateY(-2px);
}
```

### Progress Indicators
```css
.progress-bar {
  height: 8px;
  background: var(--bg-tertiary);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--gradient-hero);
  transition: width var(--transition-slow);
}
```

### Icons
Use Lucide Icons (https://lucide.dev) for consistency:
```html
<script src="https://unpkg.com/lucide@latest"></script>
<script>lucide.createIcons();</script>

<!-- Usage -->
<i data-lucide="rocket"></i>
<i data-lucide="users"></i>
<i data-lucide="target"></i>
<i data-lucide="trending-up"></i>
```

---

## Required Libraries

```html
<!-- D3.js for visualizations -->
<script src="https://d3js.org/d3.v7.min.js"></script>

<!-- Lucide icons -->
<script src="https://unpkg.com/lucide@latest"></script>

<!-- Optional: Cola.js for force-directed layouts -->
<script src="https://unpkg.com/webcola@3.4.0/WebCola/cola.min.js"></script>

<!-- Optional: Mermaid for diagrams -->
<script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
```

---

## Keyboard Navigation

All presentations support these keyboard shortcuts:

| Key | Action |
|-----|--------|
| `← →` | Previous/Next slide |
| `↑ ↓` | Previous/Next slide (or appendix slide when appendix is open) |
| `Space` | Next slide |
| `Home` | First slide |
| `End` | Last slide |
| `T` | Toggle Table of Contents (TOC) overlay from left |
| `S` | Return to course syllabus (index.html) |
| `A` | Toggle Appendix overlay from right |
| `F` | Toggle fullscreen |
| `Escape` | Close any open overlay |
| `Enter` | Close appendix overlay (alternative to Escape) |

---

## Navigation Overlays

### TOC Overlay (T key)
The Table of Contents provides quick navigation within the presentation:
- **Trigger:** Press `T` key
- **Position:** Slides in from the left side
- **Features:**
  - Shows all slides organized by section
  - Highlights current slide
  - Click any item to navigate directly
  - Link at bottom to return to course syllabus
- **Close:** Press `T`, `Escape`, or click backdrop

### Appendix Overlay (A key)
The Appendix provides supplementary content for Q&A or deeper dives:
- **Trigger:** Press `A` key
- **Position:** Slides in from the right side
- **Features:**
  - Contains extra slides not in the normal flow
  - Navigate with `↑ ↓` arrow keys while open
  - Shows slide counter (e.g., "2 / 5")
- **Close:** Press `A`, `Escape`, `Enter`, or click backdrop

### Implementation Notes
Both overlays:
- Use a semi-transparent backdrop
- Support click-outside-to-close
- Are mutually exclusive (opening one closes the other)

---

## Shared Resources

All presentations use common shared resources for consistency and maintainability:

### File Structure
```
managua/
├── shared/
│   ├── styles.css          # Common CSS for all presentations
│   └── presentation.js     # Navigation, TOC, appendix functionality
├── index.html              # Course syllabus homepage
├── master-presentation-spec.md
├── SYLLABUS.md
└── class-{n}-{topic}/
    ├── lesson-plan-{topic}.md
    ├── presentation-spec-{topic}.md
    └── presentation.html    # Uses shared resources
```

### Including Shared Resources
Each presentation.html should include:
```html
<!-- Shared styles -->
<link rel="stylesheet" href="../shared/styles.css">

<!-- Presentation-specific theme color override -->
<style>
:root {
    --theme-color: #7c3aed;        /* e.g., Purple for Theme 2 */
    --theme-color-light: #a78bfa;
}
/* Additional presentation-specific styles */
</style>

<!-- At end of body -->
<script src="https://d3js.org/d3.v7.min.js"></script>
<script src="../shared/presentation.js"></script>
```

### Required HTML Structure
Each presentation must include these elements for TOC and Appendix:

```html
<!-- Overlay backdrop -->
<div id="overlay-backdrop" class="overlay-backdrop"></div>

<!-- TOC Overlay -->
<div id="toc-overlay" class="toc-overlay">
    <button id="toc-close" class="toc-close">&times;</button>
    <div class="toc-header">
        <h3>Table of Contents</h3>
        <div class="class-info">Class N: Topic Name</div>
    </div>
    <div id="toc-content" class="toc-content">
        <!-- Auto-generated from slide data -->
    </div>
    <div class="toc-footer">
        <a href="../index.html">← Back to Course Syllabus</a>
    </div>
</div>

<!-- Appendix Overlay -->
<div id="appendix-overlay" class="appendix-overlay">
    <div class="appendix-header">
        <h3>Appendix</h3>
        <button id="appendix-close" class="appendix-close">&times;</button>
    </div>
    <div id="appendix-content" class="appendix-content">
        <!-- Auto-generated from appendix slides -->
    </div>
    <div class="appendix-nav">
        <button id="appendix-prev" class="appendix-nav-btn">← Prev</button>
        <span id="appendix-counter" class="appendix-counter">1 / 3</span>
        <button id="appendix-next" class="appendix-nav-btn">Next →</button>
    </div>
</div>
```

### Slide Data Attributes
Slides can include data attributes for TOC organization:
```html
<div class="slide" data-slide="1" data-section="Opening" data-title="Introduction">
    <!-- slide content -->
</div>

<!-- Appendix slides are hidden from normal flow -->
<div class="slide" data-appendix="true" data-title="Additional Resources">
    <!-- appendix content -->
</div>
```

---

## File Structure (Legacy - Single File)

For self-contained presentations (not using shared resources):
```
class{n}-{topic}/
├── lesson-plan-{topic}.md           # Lesson plan document
├── presentation-spec-{topic}.md     # Presentation specification
└── presentation.html                # Self-contained HTML presentation
```

---

## Entrepreneurship-Specific Visual Elements

### The 24 Steps Wheel
- Circular visualization showing Bill Aulet's 24 steps
- Color-coded by the 6 themes
- Highlight current step(s) in each class

### DE Framework Theme Colors
The 6 themes of Disciplined Entrepreneurship, styled to complement NCSSM brand:

```css
/* Theme colors - each represents one of the 6 fundamental questions */
--theme-1-customer: #356093;      /* NCSSM Blue - Who is your customer? */
--theme-2-value: #7c3aed;         /* Purple - What can you do? */
--theme-3-acquire: #059669;       /* Emerald - How do they acquire? */
--theme-4-money: #d4a028;         /* Gold - How make money? */
--theme-5-build: #dc2626;         /* Red - How design & build? */
--theme-6-scale: #0891b2;         /* Cyan - How scale? */
```

**Theme Color Usage:**
- Theme 1 uses NCSSM Blue to anchor the framework in school identity
- Theme 4 (money) uses the gold secondary accent
- Other themes provide visual variety while maintaining harmony with brand

### Common Diagrams to Include
1. **Market Segmentation Matrix** - Grid with segments rated on criteria
2. **Persona Card** - Visual profile of target customer
3. **Customer Journey Map** - Full life cycle visualization
4. **Competitive Position Chart** - 2x2 matrix or spider chart
5. **Business Model Canvas** - DE Canvas adaptation
6. **Unit Economics Calculator** - LTV/COCA visualization
7. **Assumption Matrix** - Risk vs. impact grid
8. **Product Roadmap** - Timeline visualization

---

## Accessibility Requirements

1. **Color contrast** - Minimum 4.5:1 ratio for text
2. **Focus indicators** - Visible focus states for keyboard nav
3. **Alt text** - All images and visualizations described
4. **Semantic HTML** - Proper heading hierarchy, landmarks
5. **Reduced motion** - Respect `prefers-reduced-motion` media query

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Branding Elements

### NCSSM Identity
**North Carolina School of Science and Mathematics**

| Element | Value |
|---------|-------|
| Primary Color | Chambray Blue `#356093` |
| Secondary Color | Gray family |
| Typography | Montserrat + Georgia |
| Mascot | Unicorns |
| School Colors | Royal Blue and Gray |

**Logo Usage:**
- Include NCSSM logo on title slides (available at [brand.ncssm.edu/logos](https://brand.ncssm.edu/logos))
- Use logo with adequate clear space
- Do not modify colors or proportions

### Course Title
**Applications in Entrepreneurship**
Subtitle: Based on Bill Aulet's Disciplined Entrepreneurship

### Visual Identity Summary
The presentations blend:
1. **NCSSM's Academic Credibility** - Royal blue, professional typography
2. **Startup Energy** - Dark mode, dynamic animations, modern feel
3. **Entrepreneurship Theme** - Gold accent for innovation/success
4. **MIT Framework** - Credit to Bill Aulet and Disciplined Entrepreneurship

### Title Slide Template
```
[NCSSM Logo]

Applications in Entrepreneurship
Class [N]: [Topic]
Based on Bill Aulet's Disciplined Entrepreneurship

[Instructor Name] | [Date]
```

### Attribution
- Credit Bill Aulet and MIT on framework slides
- Link to free resources (d-eship.com, MIT MOOCs)
- NCSSM Communications: communications@ncssm.edu for brand questions

---

## Sources

- [NCSSM Branding Kit](https://brand.ncssm.edu/)
- [NCSSM Fonts and Colors](https://brand.ncssm.edu/fonts-and-colors)
- [NCSSM Logos](https://brand.ncssm.edu/logos)
- [Disciplined Entrepreneurship Framework](https://www.d-eship.com/)
