# {WORKFLOW_NAME} Architecture

## Overview

{WORKFLOW_DESCRIPTION}

---

## Workflow Diagram

```mermaid
graph TD
    subgraph Research
        R1[{research-skill-1}]
        R2[{research-skill-2}]
    end

    subgraph Plan
        P1[{plan-skill-1}]
        P2[{plan-skill-2}]
    end

    subgraph Implement
        I1[{implement-skill-1}]
        I2[{implement-skill-2}]
    end

    subgraph Verify
        V1[{verify-skill-1}]
        V2[{verify-skill-2}]
    end

    R1 --> P1
    R2 --> P2
    P1 --> G1{Gate 1}
    G1 -->|Pass| I1
    G1 -->|Fail| P1
    P2 --> I2
    I1 --> V1
    I2 --> V2
```

---

## Skill Catalog

| Skill | Type | Purpose | Primary Output |
|-------|------|---------|----------------|
| {skill-1} | research | {purpose} | `{output-path}` |
| {skill-2} | plan | {purpose} | `{output-path}` |
| {skill-3} | implement | {purpose} | `{output-path}` |
| {skill-4} | verify | {purpose} | `{output-path}` |

---

## Dependency Matrix

| Skill | Depends On | Blocks | Gate |
|-------|------------|--------|------|
| {skill-1} | - | {skill-2} | - |
| {skill-2} | {skill-1} | {skill-3} | Gate 1 |
| {skill-3} | {skill-2} | {skill-4} | Gate 2 |
| {skill-4} | {skill-3} | - | - |

---

## Gate Definitions

### Gate 1: {GATE_1_NAME}

**Trigger**: After {skill-2}, before {skill-3}

**Validation Checklist**:
- [ ] {Check 1}
- [ ] {Check 2}
- [ ] {Check 3}

**Pass Criteria**: All checks pass

**On Failure**:
- Return to {skill-2}
- Provide specific feedback on failed checks
- Re-run gate after fixes

### Gate 2: {GATE_2_NAME}

**Trigger**: After {skill-3}, before {skill-4}

**Validation Checklist**:
- [ ] {Check 1}
- [ ] {Check 2}

**Pass Criteria**: All checks pass

**On Failure**:
- Distinguish verification vs validation failure
- Verification fail: Fix implementation, re-run gate
- Validation fail: Fix spec first, then implementation

---

## Configuration Points

These aspects are configurable via `rpiv-config.json`:

| Config Path | Purpose | Default |
|-------------|---------|---------|
| `{path.to.config}` | {what it controls} | `{default}` |
| `{path.to.config}` | {what it controls} | `{default}` |

---

## Artifact Paths

### Course-Level Artifacts
| Artifact | Path | Created By |
|----------|------|------------|
| {artifact-1} | `{path}` | {skill} |
| {artifact-2} | `{path}` | {skill} |

### Class-Level Artifacts
| Artifact | Path Pattern | Created By |
|----------|--------------|------------|
| {artifact-1} | `{path-with-{topic}}` | {skill} |
| {artifact-2} | `{path-with-{topic}}` | {skill} |

---

## Usage Patterns

### Full Workflow (New Course)
```bash
/course-init                    # Scaffold project
/course-research               # Research pedagogy
/course-plan                   # Create course philosophy
/syllabus-build               # Map sessions
/master-spec                  # Design system

# Per class:
/class-research {topic}       # Research topic
/lesson-plan {topic}          # Plan instruction
/presentation-spec {topic}    # Spec slides
/presentation-build {topic}   # Build presentation
/presentation-review {topic}  # Validate & verify
```

### Single Class Addition
```bash
/artifact-status              # Check what exists
/class-research {new-topic}   # Start RPIV for new class
# ... continue with lesson-plan, etc.
```

### Validation Only
```bash
/gate-check all               # Run all gates on existing artifacts
/presentation-review {topic}  # Full V&V on specific class
```

---

## Extension Points

To add new skills to this workflow:

1. Identify where in RPIV the skill belongs
2. Define its inputs (prerequisites) and outputs
3. Add to dependency matrix
4. Update blocking rules in `rpiv-config.json`
5. Create skill using `/skill-builder`
6. Update this diagram
