# Presentation Build

Implement presentation from specification, creating Astro/HTML with proper D3 visualizations.

---

## Frontmatter

```yaml
context: main
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
```

---

## Prerequisites

- `presentation-spec-{topic}.md` must exist and pass Gate 2
- `master-presentation-spec.md` must exist (design system)
- Shared resources must be available (`shared/styles.css`, `shared/presentation.js`)

---

## Instructions

You are implementing a presentation from its specification. The goal is to produce working code that exactly matches the spec while adhering to all design standards.

### Usage

```
/presentation-build {topic}
```

### Step 1: Review Prerequisites

Read these files:
- `presentation-spec-{topic}.md` - What to build
- `master-presentation-spec.md` - Design constraints
- `shared/styles.css` - Available CSS classes
- `shared/presentation.js` - Navigation functionality (if exists)

### Step 2: Create Presentation File

Create `src/pages/class-{n}-{topic}/presentation.astro` (or `.html` for non-Astro projects).

### Step 3: Implement Base Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Class {N}: {Topic} | {Course Name}</title>
  <link rel="stylesheet" href="../../shared/styles.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --theme-color: {theme-color-from-spec};
    }
    /* Any presentation-specific styles */
  </style>
</head>
<body>
  <!-- Progress bar -->
  <div class="progress-bar" id="progress"></div>

  <!-- Slides -->
  {slides go here}

  <!-- TOC Overlay -->
  <div class="toc-overlay" id="toc">...</div>

  <!-- Keyboard hints -->
  <div class="keyboard-hints">...</div>

  <!-- Scripts -->
  <script src="https://d3js.org/d3.v7.min.js"></script>
  <script src="../../shared/presentation.js"></script>
  <script>
    // Presentation-specific JavaScript
  </script>
</body>
</html>
```

### Step 4: Implement Each Slide

For each slide in the spec:

1. **Create slide container** with proper type class
2. **Add content** exactly as specified
3. **Set data attributes** for TOC integration
4. **Add speaker notes** as comments (or data attribute)

```html
<section class="slide slide-{type}" id="slide-{n}" data-title="{Title}">
  <div class="slide-content">
    {content from spec}
  </div>
  <!-- Speaker notes: {notes from spec} -->
</section>
```

### Step 5: Implement Visualizations

For each D3 visualization:

1. **Create container**:
```html
<div id="{viz-name}" class="viz-container"></div>
```

2. **Implement D3 code** following spec:
```javascript
function draw{VizName}() {
  const container = d3.select('#{viz-name}');
  const width = 600;
  const height = 400;

  const svg = container.append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');

  // CRITICAL: Use rem for font sizes
  svg.selectAll('text')
    .style('font-size', '1.25rem');

  // Implementation per spec...
}
```

3. **Hook to slide navigation**:
```javascript
const originalGoToSlide = window.Presentation.goToSlide;
window.Presentation.goToSlide = function(n) {
  originalGoToSlide(n);
  if (n === {viz-slide-number}) {
    setTimeout(draw{VizName}, 300);
  }
};
```

### Step 6: Implement Navigation

Ensure keyboard navigation works:
- Arrow keys for navigation
- T for TOC
- A for Appendix (if exists)
- S for Syllabus (if exists)
- F for fullscreen
- 0-9 for direct slide access

### Step 7: Verify Font Sizes

**CRITICAL**: Check all font sizes:

```javascript
// REJECT patterns:
.attr('font-size', '12px')
.attr('font-size', '14px')
.style('font-size', '0.8rem')

// ACCEPT patterns:
.attr('font-size', '1.25rem')  // Labels
.attr('font-size', '1.5rem')   // Body
.attr('font-size', '2.5rem')   // Titles
```

### Step 8: Test Presentation

Run local preview:
```bash
npm run dev
```

Verify:
- All slides render
- Navigation works
- Visualizations display
- No console errors
- Responsive on resize

---

## Output Specification

This skill produces:

- **Primary Output**: `src/pages/class-{n}-{topic}/presentation.astro` (or `.html`)
- **Format**: Valid HTML with embedded CSS and JavaScript
- **Gate**: Must pass Gate 3 before proceeding to presentation-review

---

## Code Quality Standards

### HTML
- Valid HTML5
- Semantic elements where appropriate
- ARIA labels for accessibility
- All images have alt text

### CSS
- Use CSS variables for colors
- rem units for font sizes
- Flexbox for layout
- Mobile-responsive

### JavaScript
- No console errors
- Clean variable names
- Comments for complex logic
- D3 v7 patterns

---

## Common Patterns

### Slide Types

```html
<!-- Title slide -->
<section class="slide slide-title" id="slide-1" data-title="Introduction">
  <h1>Class {N}</h1>
  <h2>{Topic Title}</h2>
</section>

<!-- Content slide -->
<section class="slide slide-content" id="slide-2" data-title="Agenda">
  <h2>Today We'll Cover</h2>
  <ul>
    <li>Point 1</li>
    <li>Point 2</li>
  </ul>
</section>

<!-- Visual slide -->
<section class="slide slide-visual" id="slide-3" data-title="Visualization">
  <h2>{Title}</h2>
  <div id="viz-container" class="viz-container"></div>
</section>

<!-- Quote slide -->
<section class="slide slide-quote" id="slide-4" data-title="Quote">
  <blockquote>
    "{Quote text}"
  </blockquote>
  <cite>— Author Name</cite>
</section>
```

### Responsive D3 Pattern

```javascript
function createVisualization() {
  const width = 600;
  const height = 400;
  const scale = Math.min(width, height);

  const svg = d3.select('#container')
    .append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('width', '100%')
    .style('max-width', `${width}px`);

  // Calculate positions as proportions
  const margin = { top: scale * 0.1, right: scale * 0.1, bottom: scale * 0.15, left: scale * 0.1 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // All text uses rem
  g.selectAll('.label')
    .style('font-size', '1.25rem')
    .style('font-family', 'var(--font-body, Inter, sans-serif)');
}
```

---

## Gate 3 Checklist

After building, verify:

- [ ] All slides from spec are implemented
- [ ] D3 visualizations match spec descriptions
- [ ] Font sizes meet minimums (1.25rem labels, 1.5rem body)
- [ ] Keyboard navigation works (T, A, S, arrows)
- [ ] Responsive layout works
- [ ] All assets load
- [ ] No console errors

---

## Examples

### Example: Animated Funnel Visualization

```javascript
function drawFunnel() {
  const container = d3.select('#funnel-container');
  container.selectAll('*').remove();

  const width = 600;
  const height = 400;

  const svg = container.append('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('width', '100%');

  const data = [
    { name: 'TAM', value: 50e9, label: 'Total Addressable Market' },
    { name: 'SAM', value: 5e9, label: 'Serviceable Available Market' },
    { name: 'SOM', value: 500e6, label: 'Serviceable Obtainable Market' }
  ];

  const colors = ['#356093cc', '#35609399', '#35609366'];

  const funnelHeight = height * 0.6;
  const maxWidth = width * 0.8;
  const minWidth = width * 0.3;

  data.forEach((d, i) => {
    const topWidth = maxWidth - (i * (maxWidth - minWidth) / data.length);
    const bottomWidth = maxWidth - ((i + 1) * (maxWidth - minWidth) / data.length);
    const y = height * 0.15 + (i * funnelHeight / data.length);
    const segmentHeight = funnelHeight / data.length;

    const trapezoid = svg.append('polygon')
      .attr('points', `
        ${width/2 - topWidth/2},${y}
        ${width/2 + topWidth/2},${y}
        ${width/2 + bottomWidth/2},${y + segmentHeight}
        ${width/2 - bottomWidth/2},${y + segmentHeight}
      `)
      .attr('fill', colors[i])
      .attr('opacity', 0);

    trapezoid.transition()
      .delay(i * 300)
      .duration(800)
      .attr('opacity', 1);

    // Label - CRITICAL: 1.25rem minimum
    svg.append('text')
      .attr('x', width * 0.1)
      .attr('y', y + segmentHeight / 2)
      .attr('dy', '0.35em')
      .style('font-size', '1.25rem')
      .style('font-weight', '600')
      .text(d.name)
      .attr('opacity', 0)
      .transition()
      .delay(i * 300 + 400)
      .duration(400)
      .attr('opacity', 1);

    // Value - 1.5rem for emphasis
    svg.append('text')
      .attr('x', width * 0.9)
      .attr('y', y + segmentHeight / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'end')
      .style('font-size', '1.5rem')
      .style('font-weight', '700')
      .text(`$${(d.value / 1e9).toFixed(1)}B`)
      .attr('opacity', 0)
      .transition()
      .delay(i * 300 + 400)
      .duration(400)
      .attr('opacity', 1);
  });
}
```
