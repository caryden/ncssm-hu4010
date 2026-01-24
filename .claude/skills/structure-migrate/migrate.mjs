#!/usr/bin/env node

/**
 * RPIV Structure Migration Script
 *
 * Migrates from legacy scattered structure to consolidated Astro content collections.
 *
 * Usage: node migrate.mjs [--dry-run] [--class=N]
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { createHash } from 'crypto';

const DRY_RUN = process.argv.includes('--dry-run');
const CLASS_FILTER = process.argv.find(a => a.startsWith('--class='))?.split('=')[1];

const ROOT = process.cwd();

// Helper: SHA256 hash of text
function hashText(text) {
  return createHash('sha256').update(text).digest('hex').slice(0, 16);
}

// Helper: Strip SSML tags for plain text
function ssmlToPlainText(ssml) {
  return ssml
    .replace(/<break[^>]*\/>/g, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Helper: Parse scripts.js to extract NARRATION_SCRIPTS
function parseNarrationScripts(jsContent) {
  // Extract the object from window.NARRATION_SCRIPTS = { ... };
  const match = jsContent.match(/window\.NARRATION_SCRIPTS\s*=\s*\{([\s\S]*)\};?\s*$/);
  if (!match) return null;

  const scripts = {};
  // Parse each slide entry: N: `text`,
  const slideRegex = /(\d+):\s*`([^`]+)`/g;
  let slideMatch;
  while ((slideMatch = slideRegex.exec(match[1])) !== null) {
    const slideNum = slideMatch[1];
    const ssml = slideMatch[2].trim();
    scripts[slideNum] = {
      ssml,
      plainText: ssmlToPlainText(ssml),
      estimatedDuration: null,
    };
  }
  return scripts;
}

// Helper: Extract slide signatures from presentation.astro
function extractSlideSignatures(astroContent) {
  const signatures = {};
  // Match: <section class="slide slide-{type}" ... data-title="{title}"
  const slideRegex = /<section[^>]*class="slide\s+slide-([^"]+)"[^>]*data-title="([^"]+)"[^>]*>/g;
  let match;
  let slideNum = 1;
  while ((match = slideRegex.exec(astroContent)) !== null) {
    signatures[String(slideNum)] = {
      number: slideNum,
      type: `slide-${match[1]}`,
      title: match[2],
    };
    slideNum++;
  }
  return signatures;
}

// Helper: Find audio files for a class
function findAudioFiles(classDir) {
  const audioDir = join(classDir, 'audio');
  if (!existsSync(audioDir)) return {};

  const files = {};
  for (const file of readdirSync(audioDir)) {
    if (file.endsWith('.mp3')) {
      const match = file.match(/slide-(\d+)\.mp3/);
      if (match) {
        files[match[1]] = file;
      }
    }
  }
  return files;
}

// Helper: Ensure directory exists
function ensureDir(dir) {
  if (!DRY_RUN && !existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

// Helper: Write file (respects dry run)
function writeFileSafe(path, content) {
  console.log(`  ${DRY_RUN ? '[DRY RUN] Would write' : 'Writing'}: ${path}`);
  if (!DRY_RUN) {
    ensureDir(dirname(path));
    writeFileSync(path, content, 'utf-8');
  }
}

// Helper: Copy file (respects dry run)
function copyFileSafe(src, dest) {
  console.log(`  ${DRY_RUN ? '[DRY RUN] Would copy' : 'Copying'}: ${src} -> ${dest}`);
  if (!DRY_RUN) {
    ensureDir(dirname(dest));
    copyFileSync(src, dest);
  }
}

// Discover all classes
function discoverClasses() {
  const classes = [];
  const dirs = readdirSync(ROOT).filter(d => d.match(/^class-\d+-/));

  for (const dir of dirs) {
    const match = dir.match(/^class-(\d+)-(.+)$/);
    if (match) {
      classes.push({
        number: parseInt(match[1]),
        topic: match[2],
        legacyDir: join(ROOT, dir),
        astroPage: join(ROOT, 'src/pages', dir),
        contentDir: join(ROOT, 'src/content/classes', `${match[1]}-${match[2]}`),
      });
    }
  }

  return classes.sort((a, b) => a.number - b.number);
}

// Migrate a single class
function migrateClass(cls) {
  console.log(`\n== Class ${cls.number}: ${cls.topic} ==`);

  const results = {
    narration: false,
    audioManifest: false,
    lessonPlan: false,
    presentationSpec: false,
    audioMoved: 0,
  };

  // 1. Convert scripts.js to narration.json
  const scriptsPath = join(cls.legacyDir, 'scripts.js');
  if (existsSync(scriptsPath)) {
    console.log('  Found scripts.js, converting to narration.json...');
    const jsContent = readFileSync(scriptsPath, 'utf-8');
    const slides = parseNarrationScripts(jsContent);

    if (slides && Object.keys(slides).length > 0) {
      const narration = {
        classNumber: cls.number,
        topic: cls.topic,
        voice: 'Rachel',
        model: 'eleven_multilingual_v2',
        generatedFrom: `class-${cls.number}-${cls.topic}/scripts.js`,
        slides,
      };

      writeFileSafe(
        join(cls.contentDir, 'narration.json'),
        JSON.stringify(narration, null, 2)
      );
      results.narration = true;
    } else {
      console.log('    No NARRATION_SCRIPTS found in scripts.js');
    }
  }

  // 2. Generate audio-manifest.json
  const audioFiles = findAudioFiles(cls.legacyDir);
  const presentationPath = join(cls.astroPage, 'presentation.astro');

  if (Object.keys(audioFiles).length > 0 && existsSync(presentationPath)) {
    console.log('  Generating audio-manifest.json...');

    const astroContent = readFileSync(presentationPath, 'utf-8');
    const slideSignatures = extractSlideSignatures(astroContent);

    // Read narration for hashing (from legacy or just created)
    let narrationSlides = {};
    const narrationPath = join(cls.contentDir, 'narration.json');
    if (existsSync(narrationPath)) {
      narrationSlides = JSON.parse(readFileSync(narrationPath, 'utf-8')).slides;
    } else if (existsSync(scriptsPath)) {
      narrationSlides = parseNarrationScripts(readFileSync(scriptsPath, 'utf-8')) || {};
    }

    const manifestSlides = {};
    for (const [slideNum, audioFile] of Object.entries(audioFiles)) {
      const narrationText = narrationSlides[slideNum]?.plainText || '';
      const signature = slideSignatures[slideNum] || { number: parseInt(slideNum), title: 'Unknown', type: 'unknown' };

      manifestSlides[slideNum] = {
        audioFile,
        narrationTextHash: hashText(narrationText),
        slideSignature: signature,
        status: 'current', // Assume current on initial migration
      };
    }

    const manifest = {
      classNumber: cls.number,
      topic: cls.topic,
      generatedAt: new Date().toISOString(),
      voiceId: 'Rachel',
      audioPath: `audio/class-${cls.number}/`,
      slides: manifestSlides,
    };

    writeFileSafe(
      join(cls.contentDir, 'audio-manifest.json'),
      JSON.stringify(manifest, null, 2)
    );
    results.audioManifest = true;
  }

  // 3. Move lesson plan
  const lessonPlanSrc = join(cls.legacyDir, `lesson-plan-${cls.topic}.md`);
  if (existsSync(lessonPlanSrc)) {
    copyFileSafe(lessonPlanSrc, join(cls.contentDir, 'lesson-plan.md'));
    results.lessonPlan = true;
  }

  // 4. Move presentation spec
  const specSrc = join(cls.legacyDir, `presentation-spec-${cls.topic}.md`);
  if (existsSync(specSrc)) {
    copyFileSafe(specSrc, join(cls.contentDir, 'presentation-spec.md'));
    results.presentationSpec = true;
  }

  // 5. Move audio files to public/audio/class-{n}/
  if (Object.keys(audioFiles).length > 0) {
    const destAudioDir = join(ROOT, 'public/audio', `class-${cls.number}`);
    for (const [slideNum, audioFile] of Object.entries(audioFiles)) {
      const src = join(cls.legacyDir, 'audio', audioFile);
      const dest = join(destAudioDir, audioFile);
      if (!existsSync(dest)) {
        copyFileSafe(src, dest);
        results.audioMoved++;
      }
    }
  }

  return results;
}

// Main
console.log('RPIV Structure Migration');
console.log('========================');
if (DRY_RUN) console.log('** DRY RUN MODE - No files will be written **\n');

const classes = discoverClasses();
console.log(`Found ${classes.length} classes`);

if (CLASS_FILTER) {
  const filtered = classes.filter(c => c.number === parseInt(CLASS_FILTER));
  if (filtered.length === 0) {
    console.error(`No class found with number ${CLASS_FILTER}`);
    process.exit(1);
  }
  console.log(`Filtering to class ${CLASS_FILTER} only`);
}

const allResults = [];
for (const cls of classes) {
  if (CLASS_FILTER && cls.number !== parseInt(CLASS_FILTER)) continue;
  allResults.push({ class: cls.number, topic: cls.topic, ...migrateClass(cls) });
}

// Summary
console.log('\n== Migration Summary ==');
console.log('| Class | Narration | Audio Manifest | Lesson Plan | Spec | Audio Moved |');
console.log('|-------|-----------|----------------|-------------|------|-------------|');
for (const r of allResults) {
  console.log(`| ${r.class} | ${r.narration ? '✅' : '❌'} | ${r.audioManifest ? '✅' : '❌'} | ${r.lessonPlan ? '✅' : '❌'} | ${r.presentationSpec ? '✅' : '❌'} | ${r.audioMoved} |`);
}

if (DRY_RUN) {
  console.log('\n** This was a dry run. Run without --dry-run to apply changes. **');
}
