# Audio Sync Check

Verify that audio narrations are in sync with narration scripts and slide content.

---

## Frontmatter

```yaml
context: main
allowed-tools: Read, Bash, Glob, Grep
```

---

## Prerequisites

- `src/content/classes/{n}-{topic}/narration.json` - Narration scripts
- `src/content/classes/{n}-{topic}/audio-manifest.json` - Audio tracking
- `public/audio/class-{n}/slide-*.mp3` - Audio files
- `src/pages/class-{n}-{topic}/presentation.astro` - Presentations

---

## Instructions

### Step 1: Load All Audio Manifests

For each class with an `audio-manifest.json`:
1. Load the manifest
2. Load corresponding `narration.json`
3. Load presentation.astro for slide signatures

### Step 2: Verify Each Slide

For each slide in the manifest:

1. **Check audio file exists**
   ```
   public/audio/class-{n}/slide-{nn}.mp3
   ```

2. **Hash current narration text**
   ```javascript
   currentHash = sha256(narration.slides[n].plainText).slice(0, 16)
   ```

3. **Compare to stored hash**
   ```
   if (currentHash !== manifest.slides[n].narrationTextHash) {
     status = 'stale'
     reason = 'narration text changed'
   }
   ```

4. **Check slide signature**
   - Extract current slide title and type from presentation.astro
   - Compare to stored signature
   - If slide number moved or title changed, mark stale

### Step 3: Detect New/Removed Slides

- Slides in narration.json but not in manifest → "missing audio"
- Slides in manifest but not in narration.json → "orphaned audio"

### Step 4: Generate Report

```
# Audio Sync Status Report

Generated: {timestamp}

## Summary

| Status | Count |
|--------|-------|
| Current | 45 |
| Stale | 3 |
| Missing | 2 |
| Orphaned | 0 |

## Class 4: Competitive Positioning

| Slide | Title | Audio | Hash Match | Signature Match | Status |
|-------|-------|-------|------------|-----------------|--------|
| 1 | Introduction | ✅ | ✅ | ✅ | Current |
| 2 | The Challenge | ✅ | ❌ | ✅ | STALE: narration changed |
| 3 | New Slide | ❌ | - | - | MISSING |

**Action Required**: Regenerate slides 2, 3

## Class 5: Customer Acquisition

[All current ✅]

---

## Regeneration Commands

To regenerate stale/missing audio:

```bash
# Class 4, slides 2-3
npx ts-node scripts/generate-audio.ts --class=4 --slides=2,3

# Or regenerate entire class
npx ts-node scripts/generate-audio.ts --class=4 --all
```
```

---

## Hash Algorithm

**Narration Text Hash**:
- Input: `narration.slides[n].plainText`
- Algorithm: SHA256
- Truncate: First 16 characters

**Why plainText not SSML?**
- SSML formatting changes (break times, etc.) shouldn't trigger regeneration
- Only actual content changes should

**Slide Signature**:
- Combines: slide number + title + type
- Purpose: Detect slide reordering or major changes
- A title change likely means content changed

---

## Status Codes

| Status | Meaning | Action |
|--------|---------|--------|
| `current` | Audio matches narration and slide | None |
| `stale` | Narration or slide changed | Regenerate |
| `missing` | No audio file exists | Generate |
| `orphaned` | Audio exists but no narration | Review/delete |

---

## Integration with artifact-status

When running `/artifact-status`, include audio sync summary:

```
## Audio Status

| Class | Total Slides | Current | Stale | Missing |
|-------|--------------|---------|-------|---------|
| 0 | 26 | 26 | 0 | 0 |
| 1 | 22 | 22 | 0 | 0 |
| 4 | 29 | 27 | 2 | 0 |

⚠️ Class 4 has stale audio. Run `/audio-sync-check class-4` for details.
```
