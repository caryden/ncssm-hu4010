# Artifact Status

Check the completeness of RPIV artifacts, identify what exists, what's missing, and what's blocked.

---

## Frontmatter

```yaml
context: main
allowed-tools: Read, Bash, Glob, Grep
```

---

## Prerequisites

- Project with `.claude/rpiv-config.json`
- At minimum, project structure should exist

---

## Instructions

You are checking the status of RPIV curriculum artifacts. Your goal is to provide a clear picture of project completeness and identify the next actionable steps.

### Step 1: Load Configuration

Read `.claude/rpiv-config.json` to understand:
- Expected artifact paths
- Blocking rules
- Required elements

### Step 2: Check Course-Level Artifacts

Scan for existence and completeness of:

| Artifact | Expected Path | Required For |
|----------|---------------|--------------|
| Research | `curriculum-design-research.md` | course-plan |
| Course Plan | `course-plan.md` | lesson-plans |
| Syllabus | `SYLLABUS.md` | class-research |
| Master Spec | `master-presentation-spec.md` | presentations |
| Config | `.claude/rpiv-config.json` | everything |

For each artifact:
1. Check if file exists
2. If exists, verify it has expected sections (not just a stub)
3. Record status: ✅ Complete, 🔄 Partial, ❌ Missing

### Step 3: Parse Syllabus for Classes

If `SYLLABUS.md` exists:
1. Extract list of classes with numbers and topics
2. Build expected artifact list for each class
3. Note any classes marked as "TBD" or incomplete

### Step 4: Check Class-Level Artifacts

For each class identified in syllabus:

| Artifact | Path Pattern | Gate |
|----------|--------------|------|
| Research | `research/research-{topic}.md` | - |
| Lesson Plan | `class-{n}-{topic}/lesson-plan-{topic}.md` | 1 |
| Spec | `class-{n}-{topic}/presentation-spec-{topic}.md` | 2 |
| Presentation | `class-{n}-{topic}/presentation.astro` | 3 |
| Review Log | `class-{n}-{topic}/reviewlog.md` | 4-5 |
| Script | `class-{n}-{topic}/script.md` | - |
| Audio | `public/audio/class-{n}/` | - |

Check both old HTML structure and new Astro structure.

### Step 5: Apply Blocking Rules

For any missing artifact, check if its prerequisites exist:

```
lesson-plan requires: course-plan.md + research-{topic}.md
presentation-spec requires: lesson-plan-{topic}.md
presentation requires: presentation-spec-{topic}.md
reviewlog requires: presentation.*
script requires: presentation.* + reviewlog.md
```

Mark blocked items with 🚫 and note what's blocking them.

### Step 6: Generate Status Report

Output a structured report:

```
# RPIV Artifact Status Report

Generated: {timestamp}

## Course Foundation

| Artifact | Status | Notes |
|----------|--------|-------|
| curriculum-design-research.md | ✅ | 3 sources cited |
| course-plan.md | ✅ | |
| SYLLABUS.md | ✅ | 15 classes defined |
| master-presentation-spec.md | ✅ | |

Foundation Status: COMPLETE ✅

## Classes

### Class 1: {topic}
| Artifact | Status | Blocker |
|----------|--------|---------|
| research-{topic}.md | ✅ | |
| lesson-plan-{topic}.md | ✅ | Gate 1: ✅ |
| presentation-spec-{topic}.md | ✅ | Gate 2: ✅ |
| presentation.astro | ✅ | Gate 3: ✅ |
| reviewlog.md | ✅ | Gates 4-5: ✅ |
| script.md | ❌ | |
| audio/ | ❌ | Blocked by script.md |

Class 1 Status: READY FOR NARRATION 🎙️

### Class 2: {topic}
...

## Summary

- Course Foundation: ✅ Complete
- Classes Complete: 3/15 (20%)
- Classes In Progress: 2/15 (13%)
- Classes Not Started: 10/15 (67%)

## Next Actions

1. Class 4 ({topic}): Run `/presentation-build {topic}` - spec complete
2. Class 5 ({topic}): Run `/lesson-plan {topic}` - research complete
3. Class 1 ({topic}): Run `/narration-build {topic}` - ready for audio
```

---

## Output Specification

This skill produces:

- **Console Output**: Formatted status report
- **No files created**: This is a read-only verification skill

---

## Status Codes

| Code | Meaning | Next Action |
|------|---------|-------------|
| ✅ | Complete and valid | Move to next step |
| 🔄 | Partial/incomplete | Complete the artifact |
| ❌ | Missing | Create with appropriate skill |
| 🚫 | Blocked | Complete blocker first |
| ⚠️ | Gate failed | Re-run gate after fixes |

---

## Examples

### Example: Early Project

```
$ /artifact-status

# RPIV Artifact Status Report

## Course Foundation

| Artifact | Status | Notes |
|----------|--------|-------|
| curriculum-design-research.md | ❌ | Missing |
| course-plan.md | 🚫 | Blocked by research |
| SYLLABUS.md | 🚫 | Blocked by course-plan |
| master-presentation-spec.md | 🚫 | Blocked by course-plan |

Foundation Status: NOT STARTED ❌

## Next Actions

1. Run `/course-research` to begin curriculum research
```

### Example: Mid-Project

```
$ /artifact-status

# RPIV Artifact Status Report

## Course Foundation
[All ✅]

## Classes

### Class 1-3: Complete ✅
### Class 4: customer-discovery
| Artifact | Status | Blocker |
|----------|--------|---------|
| research-customer-discovery.md | ✅ | |
| lesson-plan-customer-discovery.md | ✅ | Gate 1: ✅ |
| presentation-spec-customer-discovery.md | 🔄 | Missing viz specs |

Class 4 Status: IN PROGRESS (at spec)

## Next Actions

1. Complete presentation-spec for customer-discovery (add visualization specs)
2. Then run Gate 2 check
```
