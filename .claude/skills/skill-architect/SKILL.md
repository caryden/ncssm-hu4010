# Skill Architect

Design skill sets for complex workflows, identifying skill boundaries, dependencies, and interaction patterns.

---

## Frontmatter

```yaml
context: main
allowed-tools: Read, Write, Edit, Glob, Grep, AskUserQuestion
```

---

## Prerequisites

- Understanding of the workflow to be automated
- Access to any existing skills that may need integration

---

## Instructions

You are designing a set of Claude Code skills to automate a complex workflow. Your goal is to create a coherent skill architecture that is modular, maintainable, and follows RPIV principles.

### Step 1: Analyze the Workflow

1. **Identify the Overall Goal**: What is the end-to-end process being automated?
2. **Map the Phases**: Break down into Research, Plan, Implement, Verify/Validate phases
3. **List All Artifacts**: What files/outputs does the workflow produce?
4. **Identify Decision Points**: Where does the workflow need human input?

### Step 2: Define Skill Boundaries

Apply these principles to identify individual skills:

#### Single Responsibility
Each skill should do ONE thing well:
- ✅ `class-research` - Research a single class topic
- ❌ `class-setup` - Research, plan, AND build a class (too broad)

#### Clear Inputs/Outputs
Each skill should have:
- Explicit prerequisites (what must exist before)
- Defined outputs (what it creates)
- No hidden side effects

#### Appropriate Granularity
- Too fine: `write-slide-title`, `write-slide-content` (tedious)
- Too coarse: `build-entire-course` (unmanageable)
- Just right: `presentation-build` (one presentation, clear scope)

### Step 3: Map Dependencies

Create a dependency graph showing:

```
[course-research] → [course-plan] → [syllabus-build]
                                  ↘
                                    [master-spec]
                                        ↓
[class-research] → [lesson-plan] → [presentation-spec] → [presentation-build] → [presentation-review]
                      Gate 1           Gate 2                Gate 3             Gates 4-5
```

Document for each dependency:
- **Type**: Sequential (must complete first) or Parallel (can run together)
- **Artifact**: What file creates the dependency
- **Gate**: What quality check validates the transition

### Step 4: Assign Skill Types

For each skill, determine:

| Skill | Type | Context | Key Tools |
|-------|------|---------|-----------|
| {name} | research/plan/implement/verify | main/fork | {tools} |

Type Guidelines:
- **Research**: Forked context, web tools, produces research docs
- **Plan**: Main context, read-heavy, produces specs/plans
- **Implement**: Main context, write-heavy, produces code/content
- **Verify**: Main context, read-only, produces reports/logs

### Step 5: Design Interaction Patterns

#### Sequential Skills
```
/skill-a → produces artifact-a.md
/skill-b → reads artifact-a.md, produces artifact-b.md
```

#### Gated Transitions
```
/skill-a → produces artifact-a.md
/gate-check gate-1 → validates artifact-a.md
/skill-b → only runs if gate-1 passes
```

#### Orchestrated Workflows
```
/rpiv-workflow → calls skill-a, then gate-check, then skill-b
```

### Step 6: Document the Architecture

Create a workflow diagram document with:

1. **Visual Diagram**: Mermaid or ASCII diagram of skill flow
2. **Skill Catalog**: Table of all skills with purposes
3. **Dependency Matrix**: What depends on what
4. **Gate Definitions**: Each gate's criteria
5. **Configuration Points**: What's customizable

---

## Output Specification

This skill produces:

- **Primary Output**: `.claude/skills/{workflow-name}/workflow-diagram.md`
- **Secondary Output**: Updated `rpiv-config.json` with new blocking rules

### Output Template

```markdown
# {Workflow Name} Architecture

## Overview

{Brief description of what this skill set accomplishes}

## Workflow Diagram

\`\`\`mermaid
graph LR
    A[Skill A] --> B[Skill B]
    B --> C{Gate 1}
    C -->|Pass| D[Skill C]
    C -->|Fail| B
\`\`\`

## Skill Catalog

| Skill | Type | Purpose | Output |
|-------|------|---------|--------|
| skill-a | research | {purpose} | `artifact-a.md` |
| skill-b | implement | {purpose} | `artifact-b.html` |

## Dependency Matrix

| Skill | Depends On | Blocks |
|-------|------------|--------|
| skill-a | - | skill-b |
| skill-b | skill-a | skill-c |

## Gate Definitions

### Gate 1: {Name}
- **Trigger**: After skill-b, before skill-c
- **Checks**: {list of validations}
- **On Fail**: Return to skill-b with feedback

## Configuration

These aspects are configurable via `rpiv-config.json`:
- {config point 1}
- {config point 2}
```

---

## Quality Gates

### Architecture Review Checklist

- [ ] Every skill has a single, clear responsibility
- [ ] All dependencies are explicitly documented
- [ ] No circular dependencies exist
- [ ] Gates exist at all critical transitions
- [ ] Configuration points are identified
- [ ] Skill types match their purposes
- [ ] Forked context used only for long-running tasks

---

## Examples

### Example: Course Development Workflow

**Input**: "Design skills for building educational presentations"

**Analysis Output**:
```
Phases Identified:
1. Research: course-research, class-research
2. Plan: course-plan, syllabus-build, lesson-plan, presentation-spec
3. Implement: master-spec, presentation-build, narration-build
4. Verify: artifact-status, gate-check, presentation-review

Key Artifacts:
- curriculum-design-research.md (course level)
- course-plan.md (course level)
- SYLLABUS.md (course level)
- master-presentation-spec.md (course level)
- research-{topic}.md (per class)
- lesson-plan-{topic}.md (per class)
- presentation-spec-{topic}.md (per class)
- presentation.astro (per class)
- reviewlog.md (per class)

Decision Points:
- Topic selection (human decides class order)
- Research focus (human approves sources)
- Design system (human approves spec)
- Final review (human validates teaching quality)
```

**Architecture Output**: Full workflow diagram with 15 skills, 5 gates, dependency matrix
