# Structure Migration

Migrate from legacy scattered structure to consolidated Astro content collections.

---

## Frontmatter

```yaml
context: main
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
```

---

## Prerequisites

- Existing class folders with `scripts.js` containing `window.NARRATION_SCRIPTS`
- Existing presentations in `src/pages/class-{n}-{topic}/`
- Audio files in `class-{n}-{topic}/audio/` or `public/audio/class-{n}/`

---

## Instructions

### Phase 1: Create Content Collection Structure

1. Create `src/content/config.ts` with collection schemas
2. Create `src/content/classes/` directory

### Phase 2: Convert Narration Scripts

For each class with a `scripts.js`:

1. Read `class-{n}-{topic}/scripts.js`
2. Parse `window.NARRATION_SCRIPTS` object
3. Generate `narration.json` with structure:

```json
{
  "classNumber": 4,
  "topic": "competitive-positioning",
  "voice": "Rachel",
  "model": "eleven_multilingual_v2",
  "slides": {
    "1": {
      "ssml": "Welcome to Class 4...",
      "plainText": "Welcome to Class 4...",
      "estimatedDuration": null
    }
  }
}
```

4. Write to `src/content/classes/{n}-{topic}/narration.json`

### Phase 3: Generate Audio Manifests

For each class:

1. Find all existing audio files
2. Hash the corresponding narration text
3. Extract slide signature from presentation
4. Generate `audio-manifest.json`:

```json
{
  "generatedAt": "2024-01-20T14:30:00Z",
  "voiceId": "Rachel",
  "sourceNarrationHash": "abc123",
  "slides": {
    "1": {
      "audioFile": "slide-01.mp3",
      "narrationTextHash": "def456",
      "slideSignature": {
        "number": 1,
        "title": "Introduction",
        "type": "slide-title"
      },
      "status": "current"
    }
  }
}
```

### Phase 4: Move Spec Files

For each class:

1. Move `class-{n}-{topic}/lesson-plan-{topic}.md` → `src/content/classes/{n}-{topic}/lesson-plan.md`
2. Move `class-{n}-{topic}/presentation-spec-{topic}.md` → `src/content/classes/{n}-{topic}/presentation-spec.md`
3. If `class-{n}-{topic}/script.md` exists, archive to `src/content/classes/{n}-{topic}/script.md.archive`

### Phase 5: Consolidate Audio

1. If audio in `class-{n}-{topic}/audio/`, move to `public/audio/class-{n}/`
2. Ensure consistent naming: `slide-01.mp3`, `slide-02.mp3`, etc.

### Phase 6: Handle Visualization Scripts

For each class with D3 visualizations in `scripts.js`:

1. Extract non-narration JS (D3 code, etc.)
2. Create `src/scripts/visualizations/class-{n}/index.ts`
3. Update presentation.astro imports

### Phase 7: Cleanup

1. Delete redundant `public/class-{n}-{topic}/scripts.js`
2. Delete empty legacy `class-{n}-{topic}/` folders (after confirming migration)
3. Update `.gitignore` if needed

---

## Output Files

| File | Location | Purpose |
|------|----------|---------|
| `config.ts` | `src/content/` | Collection schemas |
| `narration.json` | `src/content/classes/{n}-{topic}/` | Slide narration text |
| `audio-manifest.json` | `src/content/classes/{n}-{topic}/` | Audio sync tracking |
| `lesson-plan.md` | `src/content/classes/{n}-{topic}/` | Instructional design |
| `presentation-spec.md` | `src/content/classes/{n}-{topic}/` | Slide specifications |

---

## Rollback

If migration fails:
1. Content collection files are additive (don't delete originals until verified)
2. Git history preserves all original files
3. Run `/artifact-status` to verify completeness before cleanup

---

## Post-Migration Verification

Run `/artifact-status` which will check:
- All classes have content in new location
- All narration.json files are valid
- All audio-manifest.json files exist
- Audio sync status for each slide
