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

For each class identified in syllabus, check artifacts in **Astro structure**:

| Artifact | Path Pattern | Gate |
|----------|--------------|------|
| Lesson Plan | `src/content/classes/{n}-{topic}/lesson-plan.md` | 1 |
| Spec | `src/content/classes/{n}-{topic}/presentation-spec.md` | 2 |
| Presentation | `src/pages/class-{n}-{topic}/presentation.astro` | 3 |
| Review Log | `src/content/classes/{n}-{topic}/reviewlog.md` | 4-5 |
| Narration | `src/content/classes/{n}-{topic}/narration.json` | - |
| Audio Manifest | `src/content/classes/{n}-{topic}/audio-manifest.json` | - |
| Audio Files | `public/audio/class-{n}/slide-*.mp3` | - |

### Step 5: Check Narration & Audio Freshness

For each class with `narration.json` and `audio-manifest.json`:

1. **Count slides in narration.json** - Number of entries in `slides` object
2. **Count entries in audio-manifest.json** - Should match narration slide count
3. **Check audio file count** - Count `slide-*.mp3` files in `public/audio/class-{n}/`
4. **Check freshness status** - Read `status` field for each slide in audio-manifest.json:
   - `"current"` = Audio matches narration text (hash verified)
   - `"stale"` = Narration changed, audio needs regeneration

**Audio Status Codes:**
- ✅ All slides have `"status": "current"` and files exist
- ⚠️ Some slides are `"stale"` (need regeneration)
- 🔄 Slide count mismatch between narration and manifest
- ❌ Missing narration.json or audio-manifest.json

### Step 6: Apply Blocking Rules

For any missing artifact, check if its prerequisites exist:

```
lesson-plan requires: course-plan.md
presentation-spec requires: lesson-plan.md
presentation requires: presentation-spec.md
reviewlog requires: presentation.astro
narration requires: presentation.astro
audio requires: narration.json
```

Mark blocked items with 🚫 and note what's blocking them.

### Step 7: Generate Status Report

Output a structured report:

```
# RPIV Artifact Status Report

Generated: {timestamp}

## Course Foundation

| Artifact | Status | Notes |
|----------|--------|-------|
| curriculum-design-research.md | ✅ | 4 sources cited |
| course-plan.md | ✅ | |
| SYLLABUS.md | ✅ | 10 classes defined |
| master-presentation-spec.md | ✅ | |

Foundation Status: COMPLETE ✅

## Classes

| Class | Topic | Lesson | Spec | Presentation | Narration | Audio |
|-------|-------|:------:|:----:|:------------:|:---------:|:-----:|
| 0 | introduction | ✅ | ✅ | ✅ | ✅ | ✅ 26 |
| 1 | market-segmentation | ✅ | ✅ | ✅ | ✅ | ⚠️ 2 stale |
| 2 | customer-persona | ✅ | ✅ | ✅ | ❌ | 🚫 |

## Audio Freshness Details

### Classes with Stale Audio
| Class | Topic | Stale Slides | Action |
|-------|-------|--------------|--------|
| 1 | market-segmentation | 5, 12 | Run `/narration-build` |

### Classes Missing Audio
| Class | Topic | Blocker |
|-------|-------|---------|
| 2 | customer-persona | Missing narration.json |

## Summary

- Course Foundation: ✅ Complete
- Classes with all artifacts: 8/10 (80%)
- Classes with stale audio: 1/10 (10%)
- Classes missing audio: 1/10 (10%)

## Next Actions

1. Class 1 (market-segmentation): Run `/narration-build` - 2 slides stale
2. Class 2 (customer-persona): Run `/narration-build` - no narration.json
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
| ⚠️ | Stale (audio needs regen) | Run `/narration-build` |

---

## Audio Manifest Structure

The `audio-manifest.json` file tracks audio generation state:

```json
{
  "classNumber": 0,
  "topic": "introduction",
  "generatedAt": "2026-01-24T23:16:36.855Z",
  "voiceId": "Rachel",
  "audioPath": "audio/class-0/",
  "slides": {
    "1": {
      "audioFile": "slide-1.mp3",
      "narrationTextHash": "df8ef2a01399f40d",
      "slideSignature": {
        "number": 1,
        "type": "slide-title",
        "title": "Based on Bill Aulet"
      },
      "status": "current"
    }
  }
}
```

**Key fields for freshness check:**
- `narrationTextHash`: SHA256 hash of the narration text (first 16 chars)
- `status`: `"current"` or `"stale"`
- `audioFile`: Expected file in `public/audio/class-{n}/`

---

## Narration JSON Structure

The `narration.json` file contains the actual scripts:

```json
{
  "classNumber": 0,
  "topic": "introduction",
  "voice": "Rachel",
  "model": "eleven_multilingual_v2",
  "slides": {
    "1": {
      "ssml": "<speak>...</speak>",
      "plainText": "...",
      "estimatedDuration": null
    }
  }
}
```

**Narration is complete when:**
- All presentation slides have corresponding entries
- Each entry has both `ssml` and `plainText`

---

## Examples

### Example: All Fresh

```
## Classes

| Class | Topic | Lesson | Spec | Presentation | Narration | Audio |
|-------|-------|:------:|:----:|:------------:|:---------:|:-----:|
| 0 | introduction | ✅ | ✅ | ✅ | ✅ | ✅ 26 |
| 1 | market-segmentation | ✅ | ✅ | ✅ | ✅ | ✅ 33 |

Audio Status: ALL CURRENT ✅
```

### Example: Some Stale

```
## Classes

| Class | Topic | Lesson | Spec | Presentation | Narration | Audio |
|-------|-------|:------:|:----:|:------------:|:---------:|:-----:|
| 0 | introduction | ✅ | ✅ | ✅ | ✅ | ✅ 26 |
| 1 | market-segmentation | ✅ | ✅ | ✅ | ✅ | ⚠️ 3 stale |

## Audio Freshness Details

### Classes with Stale Audio
| Class | Stale Slides | Reason |
|-------|--------------|--------|
| 1 | 5, 12, 18 | Narration text changed |

## Next Actions
1. Run `/narration-build market-segmentation` to regenerate stale audio
```

### Example: Missing Narration

```
## Classes

| Class | Topic | Lesson | Spec | Presentation | Narration | Audio |
|-------|-------|:------:|:----:|:------------:|:---------:|:-----:|
| 3 | value-proposition | ✅ | ✅ | ✅ | ❌ | 🚫 |

## Next Actions
1. Run `/narration-build value-proposition` to create narration and audio
```
