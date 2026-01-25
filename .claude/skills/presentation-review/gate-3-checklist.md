# Gate 3: Implementation Match Checklist

Use this checklist before running Gate 4 (Verification) to ensure the presentation matches its spec.

---

## Prerequisites

- [ ] `presentation-spec-{topic}.md` exists and passed Gate 2
- [ ] `presentation.astro` (or `.html`) exists
- [ ] `master-presentation-spec.md` was followed

---

## Slide Count Match

From spec: **{N} slides expected**

```bash
# Count slides in presentation
grep -c 'class="slide' presentation.astro
```

| Expected | Actual | Match |
|----------|--------|-------|
| {N} | {N} | [ ] |

---

## Slide-by-Slide Verification

| # | Spec Title | Impl Title | Type Match | Content Match |
|---|------------|------------|------------|---------------|
| 1 | {from spec} | {from impl} | [ ] | [ ] |
| 2 | {from spec} | {from impl} | [ ] | [ ] |
| 3 | {from spec} | {from impl} | [ ] | [ ] |
| ... | ... | ... | ... | ... |

---

## Visualization Implementation

For each visualization in spec:

### {Visualization Name}

**Spec Requirements**:
- Type: {from spec}
- Data structure: {from spec}
- Animation: {from spec}
- Interaction: {from spec}

**Implementation Check**:
- [ ] Container exists with correct ID
- [ ] D3 code implements the visual
- [ ] Data structure matches spec
- [ ] Animation sequence matches spec
- [ ] Interactions work as specified

**Font Size Check**:
```bash
# Search for font-size declarations
grep -n 'font-size' presentation.astro
```

- [ ] All labels ≥ 1.25rem
- [ ] All text ≥ 1rem
- [ ] No px values below 16px

---

## Font Size Compliance

### Automated Check

```bash
# Find potentially small font sizes
grep -n -E "font-size:\s*(1[0-4]|[0-9])px" presentation.astro
grep -n -E "font-size:\s*0\.[0-8]rem" presentation.astro
grep -n -E "\.attr\(['\"]font-size['\"],\s*['\"]?(1[0-4]|[0-9])px" presentation.astro
```

**Expected Result**: No matches

**Violations Found**:
| Line | Current Value | Required Value |
|------|---------------|----------------|
| {N} | {value} | {minimum} |

- [ ] No violations found

---

## Navigation Implementation

### Keyboard Shortcuts

| Key | Expected Action | Works |
|-----|-----------------|-------|
| → / Space | Next slide | [ ] |
| ← | Previous slide | [ ] |
| T | Toggle TOC | [ ] |
| A | Toggle Appendix | [ ] |
| S | Toggle Syllabus | [ ] |
| F | Toggle Fullscreen | [ ] |
| 0-9 | Jump to slide | [ ] |
| Escape | Close overlays | [ ] |

### Components

- [ ] Progress bar updates on navigation
- [ ] TOC overlay exists and populates
- [ ] Keyboard hints visible
- [ ] Hash navigation works (#slide-N)

---

## Responsive Check

- [ ] Slides use flexbox centering
- [ ] Content doesn't overflow on resize
- [ ] SVGs use viewBox (not fixed width/height)
- [ ] Text remains readable at different sizes

```bash
# Check for viewBox usage
grep -n "viewBox" presentation.astro
```

---

## Asset Loading

- [ ] All images load (no 404s)
- [ ] Fonts load correctly
- [ ] External scripts load (D3)
- [ ] Stylesheets load

---

## Console Check

Open browser console and verify:
- [ ] No JavaScript errors
- [ ] No CSS warnings
- [ ] No failed resource loads

---

## Gate 3 Result

### PASS Criteria

All checkboxes checked:
- [ ] Slide count matches
- [ ] All slides implemented per spec
- [ ] Visualizations match spec
- [ ] Font sizes compliant
- [ ] Navigation works
- [ ] Responsive layout works
- [ ] Assets load
- [ ] No console errors

### FAIL Actions

| Issue | Action |
|-------|--------|
| Missing slides | Add slides per spec |
| Visualization mismatch | Implement per spec |
| Font size violation | Change to rem ≥ 1.25 |
| Navigation broken | Fix JavaScript handlers |
| Assets missing | Add or fix paths |
| Console errors | Debug and fix |

---

## Sign-Off

**Gate 3 Status**: [ ] PASS / [ ] FAIL

**Reviewer**: _______________
**Date**: _______________

---

After Gate 3 passes, proceed to Gate 4 (Verification) in presentation-review.
