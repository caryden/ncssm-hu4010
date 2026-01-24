#!/usr/bin/env node

/**
 * Update Audio Manifests with Proper Slide Signatures
 * Parses Astro component syntax to extract slide titles and types
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { createHash } from 'crypto';

const ROOT = process.cwd();

function hashText(text) {
  return createHash('sha256').update(text).digest('hex').slice(0, 16);
}

function extractSlideSignatures(astroContent) {
  const signatures = {};
  const astroSlideRegex = /<(TitleSlide|StandardSlide|StatementSlide|TwoPartSlide|Slide)\s+([^>]*?)(?:\/>|>)/g;

  let match;
  while ((match = astroSlideRegex.exec(astroContent)) !== null) {
    const componentType = match[1];
    const attrs = match[2];

    const idMatch = attrs.match(/id=["'](\d+)["']/);
    const titleMatch = attrs.match(/title=["']([^"']+)["']/);
    const isAppendix = attrs.includes('appendix={true}') || attrs.includes('appendix="true"');

    if (isAppendix) continue;

    const slideNum = idMatch ? idMatch[1] : null;
    const title = titleMatch ? titleMatch[1] : 'Untitled';

    const typeMap = {
      'TitleSlide': 'slide-title',
      'StandardSlide': 'slide-content',
      'StatementSlide': 'slide-statement',
      'TwoPartSlide': 'slide-two-part',
      'Slide': 'slide-generic',
    };

    if (slideNum) {
      signatures[slideNum] = {
        number: parseInt(slideNum),
        type: typeMap[componentType] || 'slide-unknown',
        title: title,
      };
    }
  }

  return signatures;
}

const classes = [
  { n: 0, topic: 'introduction' },
  { n: 1, topic: 'market-segmentation' },
  { n: 2, topic: 'customer-persona' },
  { n: 3, topic: 'value-proposition' },
  { n: 4, topic: 'competitive-positioning' },
  { n: 5, topic: 'customer-acquisition' },
  { n: 6, topic: 'business-model' },
  { n: 7, topic: 'unit-economics' },
  { n: 8, topic: 'testing-mvbp' },
  { n: 9, topic: 'scale-pitch' },
];

console.log('Updating audio manifests with proper slide signatures...\n');

for (const cls of classes) {
  const manifestPath = join(ROOT, 'src/content/classes', `${cls.n}-${cls.topic}`, 'audio-manifest.json');
  const narrationPath = join(ROOT, 'src/content/classes', `${cls.n}-${cls.topic}`, 'narration.json');
  const presentationPath = join(ROOT, 'src/pages', `class-${cls.n}-${cls.topic}`, 'presentation.astro');

  if (!existsSync(manifestPath)) {
    console.log(`Class ${cls.n}: No manifest found, skipping`);
    continue;
  }

  const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
  const narration = JSON.parse(readFileSync(narrationPath, 'utf-8'));
  const astroContent = readFileSync(presentationPath, 'utf-8');

  const signatures = extractSlideSignatures(astroContent);
  console.log(`Class ${cls.n}: Found ${Object.keys(signatures).length} slides`);

  // Update manifest with proper signatures
  let updated = 0;
  for (const [slideNum, slideData] of Object.entries(manifest.slides)) {
    const sig = signatures[slideNum];
    if (sig) {
      slideData.slideSignature = sig;
      updated++;
    }
    // Also update narration hash
    const narrationText = narration.slides[slideNum]?.plainText || '';
    slideData.narrationTextHash = hashText(narrationText);
  }

  manifest.generatedAt = new Date().toISOString();
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`  Updated ${updated} slide signatures`);
}

console.log('\nDone!');
