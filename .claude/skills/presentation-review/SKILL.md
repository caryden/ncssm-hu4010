# Presentation Review

Validate and verify presentation implementation, running Gates 4 (Verification) and 5 (Validation).

---

## Frontmatter

```yaml
context: main
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
```

---

## Prerequisites

- `presentation.astro` (or `.html`) must exist
- Presentation must pass Gate 3 (Implementation Match)
- Lesson plan and spec must exist for context

---

## Instructions

You are reviewing a completed presentation to verify it was built correctly (Gate 4) and validate it achieves teaching objectives (Gate 5).

### Usage

```
/presentation-review {topic}
```

### Understanding V&V

**Verification (Gate 4)**: "Did we build the thing right?"
- Focus on CODE QUALITY
- Technical correctness
- If fails: Fix CODE

**Validation (Gate 5)**: "Did we build the right thing?"
- Focus on TEACHING EFFECTIVENESS
- Achieving objectives
- If fails: Fix SPEC first, then CODE

### Step 1: Gather Context

Read these files:
- `presentation.astro` (or `.html`) - The implementation
- `presentation-spec-{topic}.md` - What it should do
- `lesson-plan-{topic}.md` - Learning objectives
- `master-presentation-spec.md` - Design standards

### Step 2: Run Gate 4 (Verification)

Check technical quality:

#### Code Conventions
- [ ] Valid HTML5
- [ ] CSS follows project patterns
- [ ] JavaScript is clean and commented
- [ ] No deprecated patterns

#### Accessibility
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] All images have alt text
- [ ] Keyboard navigation complete
- [ ] Focus states visible
- [ ] Screen reader compatible

#### Performance
- [ ] No render-blocking resources
- [ ] Images optimized
- [ ] Fonts preloaded
- [ ] No large blocking scripts

#### Error-Free
- [ ] No JavaScript console errors
- [ ] No CSS warnings
- [ ] All resources load
- [ ] No 404s

#### Font Sizes (CRITICAL)
- [ ] No sizes below 1rem
- [ ] D3 labels ≥ 1.25rem
- [ ] Body text ≥ 1.5rem
- [ ] Titles ≥ 2.5rem

#### Responsive
- [ ] Works on different screen sizes
- [ ] Zoom-friendly (Zoom streaming)
- [ ] SVGs use viewBox

**Gate 4 Result**: PASS / FAIL

If FAIL: Document specific code fixes needed.

### Step 3: Run Gate 5 (Validation)

Check teaching effectiveness:

#### Accuracy
- [ ] Content is factually correct
- [ ] No misleading simplifications
- [ ] Expert would approve

#### Clarity
- [ ] Explanations clear for student level
- [ ] Jargon defined before use
- [ ] Examples are relatable

#### Visualization Effectiveness
- [ ] Visuals communicate concepts
- [ ] Animations support understanding (not distract)
- [ ] Charts are readable and meaningful

#### Pacing
- [ ] Content fits in class time
- [ ] Not too rushed
- [ ] Not too slow
- [ ] Breaks for interaction

#### Objective Achievement
For each learning objective:
- [ ] Objective 1: Can be achieved with this content
- [ ] Objective 2: Can be achieved with this content
- [ ] Objective 3: Can be achieved with this content

**Gate 5 Result**: PASS / FAIL

If FAIL: Document what SPEC change is needed (not just code fix).

### Step 4: Create Review Log Entry

Append to `src/pages/class-{n}-{topic}/reviewlog.md`:

```markdown
## Review: {Date}

### Gate 4: Verification

**Status**: PASS / FAIL

**Checklist Results**:
- [x] Code conventions
- [x] Accessibility
- [x] Performance
- [ ] Error-free: {issue found}
- [x] Font sizes
- [x] Responsive

**Issues Found**:
1. {Issue description}
   - Location: {file:line}
   - Fix: {what to do}

**Actions Taken**:
- {Fix applied}

### Gate 5: Validation

**Status**: PASS / FAIL

**Checklist Results**:
- [x] Accuracy
- [x] Clarity
- [ ] Visualization effectiveness: {issue}
- [x] Pacing
- [x] Objective achievement

**Issues Found**:
1. {Issue description}
   - Impact: {teaching impact}
   - Fix: {spec change needed}

**Actions Taken**:
- {Spec updated}
- {Code updated to match}

### Final Status

- Gate 4: {PASS/FAIL}
- Gate 5: {PASS/FAIL}
- Overall: {READY FOR NARRATION / NEEDS FIXES}

**Reviewer**: Claude (presentation-review skill)
**Reviewed**: {timestamp}
```

### Step 5: Apply Fixes (If Needed)

If Gate 4 fails (Verification):
1. Fix the CODE directly
2. Document fix in review log
3. Re-run Gate 4

If Gate 5 fails (Validation):
1. FIRST: Update the SPEC to correct the design issue
2. THEN: Update the CODE to match the new spec
3. Re-run Gate 3, then Gate 4, then Gate 5

### Step 6: Report Results

Provide summary to user:

```
# Presentation Review Complete

## Class {N}: {Topic}

### Gate 4 (Verification): {PASS/FAIL}
{Summary of technical quality}

### Gate 5 (Validation): {PASS/FAIL}
{Summary of teaching effectiveness}

### Overall Status: {READY / NEEDS WORK}

{If NEEDS WORK}
### Required Actions

1. {Action 1}
2. {Action 2}

Next step: {what to do next}

{If READY}
### Next Steps

- Run `/narration-build {topic}` to add voice narration
- Or proceed to next class with `/class-research {next-topic}`
```

---

## Output Specification

This skill produces:

- **Primary Output**: Updated `reviewlog.md`
- **Code Fixes**: Direct edits if Gate 4 issues found
- **Spec Updates**: If Gate 5 issues found (spec then code)
- **Status Report**: Console output for user

---

## V&V Decision Tree

```
Problem Found
    │
    ├── Is it a code quality issue?
    │   └── YES → Gate 4 → Fix CODE only
    │
    ├── Is code missing something from spec?
    │   └── YES → Gate 3 → Fix CODE only
    │
    └── Does spec fail to support objectives?
        └── YES → Gate 5 → Fix SPEC, then CODE
```

---

## Common Issues

### Gate 4 Failures

| Issue | Detection | Fix |
|-------|-----------|-----|
| Small fonts | Grep for px values < 16 | Change to rem |
| Console errors | Browser console | Debug JS |
| Missing alt text | Grep for <img> without alt | Add alt text |
| Poor contrast | Visual inspection | Adjust colors |

### Gate 5 Failures

| Issue | Detection | Fix |
|-------|-----------|-----|
| Objective not achievable | Compare objectives to slides | Add/modify slides in spec |
| Confusing explanation | Read through as student | Rewrite in spec, update code |
| Ineffective visualization | Does it help understanding? | Redesign in spec, rebuild |
| Pacing issues | Time estimates vs content | Adjust content in spec |

---

## Examples

### Example: Gate 4 Failure

```markdown
## Review: 2026-01-20

### Gate 4: Verification

**Status**: FAIL

**Issues Found**:
1. Font size violation in D3 visualization
   - Location: presentation.html:234
   - Current: .attr('font-size', '12px')
   - Fix: Change to .attr('font-size', '1.25rem')

2. Console error on slide 8
   - Error: "Cannot read property 'length' of undefined"
   - Location: presentation.html:456
   - Fix: Add null check before accessing data.length

**Actions Taken**:
- Fixed font size at line 234
- Added null check at line 456
- Re-tested: No more console errors

### Gate 4 Re-run: PASS
```

### Example: Gate 5 Failure

```markdown
## Review: 2026-01-20

### Gate 5: Validation

**Status**: FAIL

**Issues Found**:
1. Objective 2 not achievable
   - Objective: "Calculate SAM using bottom-up approach"
   - Problem: No slide demonstrates bottom-up calculation
   - Impact: Students cannot learn this skill
   - Fix: Add slide demonstrating bottom-up with example

**Actions Taken**:
1. Updated presentation-spec-tam.md:
   - Added Slide 9a: "Bottom-Up Calculation Example"
   - Specified step-by-step calculation walkthrough

2. Updated presentation.html:
   - Added new slide after slide 9
   - Implemented calculation animation
   - Updated slide numbering

### Gate 3 Re-run: PASS
### Gate 4 Re-run: PASS
### Gate 5 Re-run: PASS
```
