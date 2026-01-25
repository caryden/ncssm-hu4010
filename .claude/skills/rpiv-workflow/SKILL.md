# RPIV Workflow

Master orchestrator for the Research-Plan-Implement-Verify/Validate curriculum development process. Guides users through building complete courses and individual classes.

---

## Frontmatter

```yaml
context: main
allowed-tools: Read, Write, Skill, AskUserQuestion, Glob, Grep
```

---

## Prerequisites

- Project initialized with `.claude/rpiv-config.json`
- Understanding of what course/class to develop

---

## Instructions

You are the master orchestrator for RPIV curriculum development. Your role is to guide users through the complete workflow, ensuring proper sequencing, gate compliance, and artifact creation.

### Workflow Modes

Ask the user which mode they want to work in:

1. **Full Course Build**: Start from scratch, build entire course
2. **Single Class Build**: Add one class to existing course
3. **Resume Work**: Check status and continue where left off
4. **Validation Only**: Run gates on existing artifacts

### Mode: Full Course Build

Guide through these phases in order:

#### Phase 1: Course Foundation
```
1. /course-init          → Scaffold Astro project
2. /course-research      → Research pedagogical approaches
3. /course-plan          → Define teaching philosophy
4. /syllabus-build       → Create session schedule
5. /master-spec          → Establish design system
```

**Checkpoint**: Before proceeding to classes, verify:
- [ ] `course-plan.md` exists and is complete
- [ ] `SYLLABUS.md` maps all sessions
- [ ] `master-presentation-spec.md` defines components

#### Phase 2: Class Development (Repeat for Each Class)
```
For class N with topic T:
1. /class-research {T}        → Research topic deeply
2. /lesson-plan {T}           → Plan instruction (Gate 1)
3. /presentation-spec {T}     → Spec slides (Gate 2)
4. /presentation-build {T}    → Build presentation (Gate 3)
5. /presentation-review {T}   → Validate & verify (Gates 4-5)
6. /narration-build {T}       → Generate voice narration (optional)
```

**After Each Class**: Run `/artifact-status` to confirm completion

### Mode: Single Class Build

1. Run `/artifact-status` to verify course-level artifacts exist
2. If missing, prompt to complete course foundation first
3. Ask which class number and topic to develop
4. Guide through Phase 2 workflow for that class

### Mode: Resume Work

1. Run `/artifact-status` to see current state
2. Identify the next incomplete step
3. Check if any blockers need resolution
4. Guide user to the appropriate skill

### Mode: Validation Only

1. Ask which scope: `all`, `course`, or specific `class-{n}`
2. Run `/gate-check {scope}`
3. Report results and remediation steps

---

## Gate Enforcement

### Gate 1: Lesson Plan Alignment
**Runs after**: `lesson-plan` skill
**Checks**:
- Learning objectives trace to course plan
- Activities align with objectives
- Assessment methods defined
- Time allocations realistic

**On Fail**: Return to lesson-plan with specific feedback

### Gate 2: Spec Achievement
**Runs after**: `presentation-spec` skill
**Checks**:
- Every objective has supporting slides
- Visualizations defined for complex concepts
- Interaction points identified
- Flow supports learning progression

**On Fail**: Return to presentation-spec with gaps identified

### Gate 3: Implementation Match
**Runs after**: `presentation-build` skill
**Checks**:
- All specified slides exist
- D3 visualizations implemented
- Font sizes meet minimums (1.25rem for labels)
- Navigation working (T, A, S, arrows)
- Responsive layout correct

**On Fail**: Return to presentation-build with code fixes needed

### Gate 4: Verification
**Runs after**: `presentation-review` skill
**Question**: "Did we build the thing right?"
**Checks**:
- Code quality standards met
- Accessibility requirements satisfied
- Performance acceptable
- No console errors

**On Fail**: Fix CODE, not spec

### Gate 5: Validation
**Runs after**: `presentation-review` skill
**Question**: "Did we build the right thing?"
**Checks**:
- Teaching objectives achievable with content
- Explanations clear and accurate
- Visualizations effective
- Pacing appropriate

**On Fail**: Fix SPEC first, then update code to match

---

## Blocking Rules

These transitions are blocked until prerequisites exist:

| To Create... | Must First Have... |
|--------------|-------------------|
| lesson-plan-{topic}.md | course-plan.md + research-{topic}.md |
| presentation-spec-{topic}.md | lesson-plan-{topic}.md |
| presentation.astro | presentation-spec-{topic}.md |
| reviewlog.md entry | presentation.astro |
| script.md | presentation.astro + reviewlog.md |

When a blocking rule is violated:
1. Inform the user what's missing
2. Offer to run the prerequisite skill
3. Do NOT proceed until prerequisites exist

---

## Progress Tracking

After each skill completes, update status in user's view:

```
Course: Applications in Entrepreneurship
Status: In Progress

Course Foundation:
  ✅ course-plan.md
  ✅ SYLLABUS.md
  ✅ master-presentation-spec.md

Classes:
  Class 1 - Introduction: ✅ Complete (all gates passed)
  Class 2 - Customer Segments: 🔄 In Progress (at presentation-build)
  Class 3 - Problem Statement: ⏳ Not Started
  ...
```

---

## Output Specification

This skill produces:

- **No direct artifacts** - orchestrates other skills
- **User guidance** - tells user what to do next
- **Status reports** - shows progress and blockers

---

## Interaction Patterns

### Starting Fresh
```
User: /rpiv-workflow
Claude: Welcome to RPIV Curriculum Development! What would you like to do?
        1. Build a complete new course
        2. Add a single class to an existing course
        3. Resume work on an in-progress course
        4. Run validation on existing artifacts
User: 1
Claude: Great! Let's build a complete course. First, I'll scaffold the project structure...
        [Invokes /course-init]
```

### Hitting a Block
```
Claude: I see you want to create the presentation spec for "Market Sizing".
        However, lesson-plan-market-sizing.md doesn't exist yet.

        Would you like me to:
        1. Run /lesson-plan market-sizing first
        2. Check if research exists (may need /class-research first)
        3. Show full status of all artifacts
User: 1
Claude: [Invokes /lesson-plan market-sizing]
```

### Gate Failure
```
Claude: Gate 2 (Spec Achievement) found issues:

        ❌ Objective "Calculate TAM/SAM/SOM" has no supporting slides
        ❌ No visualization defined for market sizing funnel
        ✅ Flow supports learning progression

        The spec needs revision. Running /presentation-spec market-sizing
        with this feedback...
```

---

## Examples

### Example: Full Course Workflow

```
Day 1:
  /rpiv-workflow → Choose "Full Course Build"
  /course-init → Scaffold created
  /course-research → 3 sources analyzed
  /course-plan → Philosophy documented

Day 2:
  /rpiv-workflow → Choose "Resume Work"
  Status shows: course-plan complete, syllabus missing
  /syllabus-build → 15 sessions mapped
  /master-spec → Design system complete

Day 3+:
  /rpiv-workflow → Choose "Resume Work"
  Status shows: Ready for Class 1
  Loop: research → lesson-plan → spec → build → review
  Repeat for each class...
```

### Example: Handling Validation Failure

```
User: /presentation-review customer-discovery
Claude: Running verification and validation...

        Gate 4 (Verification): ✅ PASSED
        - Code quality: OK
        - Accessibility: OK
        - Performance: OK

        Gate 5 (Validation): ❌ FAILED
        - Teaching objectives achievable: NO
          Issue: "Conduct customer interview" objective but no
          interview framework slide exists

        This is a VALIDATION failure - the spec is incomplete.

        Recommended action:
        1. Update presentation-spec-customer-discovery.md to add
           interview framework slide
        2. Re-run /presentation-build customer-discovery
        3. Re-run /presentation-review customer-discovery

        Shall I start with updating the spec?
```
