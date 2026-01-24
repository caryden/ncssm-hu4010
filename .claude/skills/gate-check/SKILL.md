# Gate Check

Run validation gates on RPIV artifacts, providing pass/fail feedback and remediation guidance.

---

## Frontmatter

```yaml
context: main
allowed-tools: Read, Bash, Glob, Grep
```

---

## Prerequisites

- Artifacts to validate must exist
- Gate checklist definitions in skill files

---

## Instructions

You are running quality gates on RPIV curriculum artifacts. Gates ensure that work at each stage meets quality standards before proceeding.

### Usage

```
/gate-check {scope}

Scopes:
  all           - Run all applicable gates on all artifacts
  course        - Run course-level gates only
  class-{n}     - Run gates for specific class number
  gate-{n}      - Run specific gate number on all applicable artifacts
  {topic}       - Run all gates for specific topic
```

### Gate Definitions

#### Gate 1: Lesson Plan Alignment

**Applies to**: `lesson-plan-{topic}.md`
**Prerequisite**: `course-plan.md`, `research-{topic}.md`

**Checklist**:
1. [ ] **Objective Tracing**: Each learning objective references a course plan principle
2. [ ] **Measurability**: Objectives use action verbs (identify, calculate, design, evaluate)
3. [ ] **Activity Alignment**: Each objective has at least one supporting activity
4. [ ] **Assessment Coverage**: Assessment methods exist for each objective
5. [ ] **Time Realism**: Time allocations sum to class duration (±5 min)
6. [ ] **Prerequisite Acknowledgment**: References prior class knowledge where applicable

**Validation Process**:
```
1. Read course-plan.md and extract guiding principles
2. Read lesson-plan-{topic}.md
3. For each objective:
   - Check it traces to a principle (may be implicit)
   - Verify action verb usage
   - Find corresponding activity
   - Find assessment method
4. Sum time allocations and compare to expected duration
5. Report findings
```

#### Gate 2: Spec Achievement

**Applies to**: `presentation-spec-{topic}.md`
**Prerequisite**: `lesson-plan-{topic}.md`

**Checklist**:
1. [ ] **Objective Coverage**: Every learning objective has ≥1 supporting slide
2. [ ] **Visualization Specs**: Complex concepts have D3/diagram specs
3. [ ] **Interaction Points**: Activities/questions marked in slide flow
4. [ ] **Flow Logic**: Slides build logically toward objectives
5. [ ] **Time Estimates**: Per-slide times sum to class duration
6. [ ] **Source Citations**: Expert content sources documented

**Validation Process**:
```
1. Read lesson-plan-{topic}.md and extract objectives
2. Read presentation-spec-{topic}.md
3. Build mapping: objective → supporting slides
4. Flag objectives with no slide coverage
5. Check for visualization definitions
6. Verify interaction markers exist
7. Sum slide times
8. Report gaps
```

#### Gate 3: Implementation Match

**Applies to**: `presentation.astro` or `presentation.html`
**Prerequisite**: `presentation-spec-{topic}.md`

**Checklist**:
1. [ ] **Slide Count**: All specified slides exist
2. [ ] **Visualization Implementation**: D3 specs are implemented
3. [ ] **Font Size Compliance**: Labels ≥1.25rem, body ≥1.5rem
4. [ ] **Navigation Working**: T (TOC), A (Appendix), S (Syllabus), arrows
5. [ ] **Responsive Layout**: Flexbox centering, viewBox on SVGs
6. [ ] **Asset Loading**: All images, fonts load without errors
7. [ ] **Console Clean**: No JavaScript errors

**Validation Process**:
```
1. Read presentation-spec-{topic}.md and count expected slides
2. Read presentation file
3. Count actual slides, compare
4. Search for D3 visualization code
5. Check font-size declarations (reject <1rem)
6. Verify keyboard event handlers
7. Check SVG viewBox attributes
8. Run in browser, check console (manual or script)
```

#### Gate 4: Verification

**Applies to**: `presentation.astro` or `presentation.html` (post-implementation)
**Question**: "Did we build the thing right?"

**Checklist**:
1. [ ] **Code Conventions**: Follows project style guide
2. [ ] **Accessibility**: Contrast ratios, alt text, keyboard navigation
3. [ ] **Performance**: No render-blocking resources, optimized images
4. [ ] **Error-Free**: No console errors or warnings
5. [ ] **Cross-Browser**: Works in Chrome, Firefox, Safari
6. [ ] **Remote-Friendly**: Readable over Zoom on 80" display

**On Failure**: Fix CODE, not spec

#### Gate 5: Validation

**Applies to**: Full presentation (content review)
**Question**: "Did we build the right thing?"

**Checklist**:
1. [ ] **Accuracy**: Subject expert would approve content
2. [ ] **Clarity**: Explanations clear for target audience
3. [ ] **Effectiveness**: Visualizations communicate concepts
4. [ ] **Pacing**: Content fits in class time
5. [ ] **Relevance**: Examples resonate with audience
6. [ ] **Achievability**: Students can meet objectives with this content

**On Failure**: Fix SPEC first, then CODE

---

## Output Specification

This skill produces:

- **Console Output**: Gate results with pass/fail for each check
- **Recommendations**: Specific fixes for failures
- **No files modified**: Read-only verification

### Output Format

```
# Gate Check Results

## Gate {N}: {Name}

Target: {artifact-path}
Status: PASS ✅ / FAIL ❌

### Checklist Results

- [x] {Check 1}: PASS
- [ ] {Check 2}: FAIL
  → Issue: {description of problem}
  → Fix: {specific remediation}
- [x] {Check 3}: PASS

### Summary

{N}/{total} checks passed

{If FAIL}
### Required Actions

1. {First thing to fix}
2. {Second thing to fix}

After fixes, re-run: `/gate-check gate-{N} {topic}`
```

---

## Gate Decision Logic

```
Gate failed → Determine failure type

If Gate 1 fails:
  → Fix lesson-plan-{topic}.md
  → Re-run /lesson-plan {topic} or manual edit
  → Re-run Gate 1

If Gate 2 fails:
  → Fix presentation-spec-{topic}.md
  → Re-run /presentation-spec {topic} or manual edit
  → Re-run Gate 2

If Gate 3 fails:
  → Fix presentation code
  → Re-run /presentation-build {topic} or manual edit
  → Re-run Gate 3

If Gate 4 fails (Verification):
  → This is a CODE problem
  → Fix implementation, not spec
  → Re-run Gate 4

If Gate 5 fails (Validation):
  → This is a DESIGN problem
  → Fix SPEC first
  → Then update CODE to match
  → Re-run Gates 3, 4, 5
```

---

## Examples

### Example: Gate 2 Check

```
$ /gate-check gate-2 market-sizing

# Gate Check Results

## Gate 2: Spec Achievement

Target: class-5-market-sizing/presentation-spec-market-sizing.md
Status: FAIL ❌

### Checklist Results

- [x] Objective Coverage: PASS (4/4 objectives have slides)
- [ ] Visualization Specs: FAIL
  → Issue: Objective "Calculate TAM/SAM/SOM" mentions funnel
           but no D3 visualization spec defined
  → Fix: Add visualization spec with funnel diagram details
- [x] Interaction Points: PASS (2 discussion questions marked)
- [x] Flow Logic: PASS
- [ ] Time Estimates: FAIL
  → Issue: Slide times sum to 55 min, class is 75 min
  → Fix: Add content or increase activity time
- [x] Source Citations: PASS

### Summary

4/6 checks passed

### Required Actions

1. Add D3 visualization spec for TAM/SAM/SOM funnel:
   - Funnel shape with 3 tiers
   - Labels: TAM (top), SAM (middle), SOM (bottom)
   - Animate from top to bottom on reveal

2. Adjust time allocations (+20 min):
   - Consider adding practice exercise (15 min)
   - Extend Q&A section (5 min)

After fixes, re-run: `/gate-check gate-2 market-sizing`
```

### Example: All Gates for Class

```
$ /gate-check class-3

# Gate Check Results

## Class 3: problem-statement

### Gate 1: Lesson Plan Alignment
Status: PASS ✅ (6/6 checks)

### Gate 2: Spec Achievement
Status: PASS ✅ (6/6 checks)

### Gate 3: Implementation Match
Status: FAIL ❌ (5/7 checks)

- [ ] Font Size Compliance: FAIL
  → Issue: D3 axis labels use 12px
  → Fix: Change to 1.25rem minimum

- [ ] Console Clean: FAIL
  → Issue: "Cannot read property 'transition' of undefined"
  → Fix: Add null check in visualization init

### Overall Status

Gates 1-2: PASS ✅
Gate 3: FAIL ❌
Gates 4-5: BLOCKED (Gate 3 must pass first)

### Required Actions

1. Fix font sizes in D3 visualization
2. Fix JavaScript error in transition code
3. Re-run: `/gate-check gate-3 problem-statement`
```
