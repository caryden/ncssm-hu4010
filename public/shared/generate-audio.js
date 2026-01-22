#!/usr/bin/env node
/**
 * NCSSM Entrepreneurship — Audio Generation Script
 * Generates MP3 files for all narration scripts via ElevenLabs API
 *
 * Usage:
 *   node shared/generate-audio.js --class 0              # Generate all audio for class 0
 *   node shared/generate-audio.js --class 1 --slide 5    # Regenerate just slide 5 for class 1
 *   node shared/generate-audio.js --class 2 --all        # Regenerate all slides for class 2
 *
 * Environment Variables (required):
 *   ELEVENLABS_API_KEY - Your ElevenLabs API key
 *   ELEVENLABS_VOICE_ID - Voice ID (default: UgBBYS2sOqTuMpoF3BR0 "Mark")
 */

const fs = require('fs');
const path = require('path');

// Load environment variables from .env file if present
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      process.env[key.trim()] = valueParts.join('=').trim();
    }
  });
}

// Configuration
const CONFIG = {
  apiKey: process.env.ELEVENLABS_API_KEY,
  voiceId: process.env.ELEVENLABS_VOICE_ID || 'UgBBYS2sOqTuMpoF3BR0', // Mark
  modelId: 'eleven_turbo_v2_5'
};

// Class directory mapping
const CLASS_DIRS = {
  0: 'class-0-introduction',
  1: 'class-1-market-segmentation',
  2: 'class-2-customer-persona',
  3: 'class-3-value-proposition',
  4: 'class-4-competitive-positioning',
  5: 'class-5-customer-acquisition',
  6: 'class-6-business-model',
  7: 'class-7-unit-economics',
  8: 'class-8-testing-mvbp',
  9: 'class-9-scale-pitch'
};

// Load scripts from a class's scripts.js
function loadScripts(classNum) {
  const classDir = CLASS_DIRS[classNum];
  if (!classDir) {
    throw new Error(`Unknown class number: ${classNum}`);
  }

  const scriptsPath = path.join(__dirname, '..', classDir, 'scripts.js');
  if (!fs.existsSync(scriptsPath)) {
    throw new Error(`Scripts file not found: ${scriptsPath}`);
  }

  const content = fs.readFileSync(scriptsPath, 'utf-8');

  // Execute in a sandbox to get the globals
  const sandbox = { window: {} };
  const script = new Function('window', content + '\nreturn { NARRATION_SCRIPTS: window.NARRATION_SCRIPTS };');
  return script(sandbox.window);
}

// Generate audio for a single script
async function generateAudio(text, outputPath) {
  console.log(`  Generating: ${path.basename(outputPath)}`);

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${CONFIG.voiceId}`, {
    method: 'POST',
    headers: {
      'Accept': 'audio/mpeg',
      'Content-Type': 'application/json',
      'xi-api-key': CONFIG.apiKey
    },
    body: JSON.stringify({
      text: text,
      model_id: CONFIG.modelId,
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
        style: 0.3,
        use_speaker_boost: true
      }
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`ElevenLabs API error: ${error}`);
  }

  const buffer = await response.arrayBuffer();
  fs.writeFileSync(outputPath, Buffer.from(buffer));
  console.log(`  ✓ Saved: ${path.basename(outputPath)}`);
}

// Generate audio for slides
async function generateSlides(scripts, outputDir, specificSlide = null) {
  console.log('\nGenerating slide audio...\n');

  const slideNums = Object.keys(scripts).map(n => parseInt(n)).sort((a, b) => a - b);

  for (const slideNum of slideNums) {
    if (specificSlide !== null && slideNum !== specificSlide) continue;

    const script = scripts[slideNum];
    const outputPath = path.join(outputDir, `slide-${slideNum}.mp3`);

    try {
      await generateAudio(script, outputPath);
      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 500));
    } catch (err) {
      console.error(`  ✗ Error on slide ${slideNum}: ${err.message}`);
    }
  }
}

// Print usage
function printUsage() {
  console.log(`
NCSSM Entrepreneurship — Audio Generation Script

Usage:
  node shared/generate-audio.js --class <N> [--slide <N>]

Options:
  --class <N>   Class number (0-9) - REQUIRED
  --slide <N>   Only regenerate a specific slide number
  --help        Show this help message

Examples:
  node shared/generate-audio.js --class 0              # Generate all slides for Class 0
  node shared/generate-audio.js --class 1 --slide 5    # Regenerate only slide 5 for Class 1

Environment Variables:
  ELEVENLABS_API_KEY   Your ElevenLabs API key (required)
  ELEVENLABS_VOICE_ID  Voice ID (default: UgBBYS2sOqTuMpoF3BR0 "Mark")

Create a .env file in the project root with:
  ELEVENLABS_API_KEY=your_api_key_here
`);
}

// Main
async function main() {
  // Parse args
  const args = process.argv.slice(2);
  let classNum = null;
  let specificSlide = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--class' && args[i+1]) {
      classNum = parseInt(args[i+1]);
    } else if (args[i] === '--slide' && args[i+1]) {
      specificSlide = parseInt(args[i+1]);
    } else if (args[i] === '--help' || args[i] === '-h') {
      printUsage();
      process.exit(0);
    }
  }

  // Validate args
  if (classNum === null || isNaN(classNum)) {
    console.error('Error: --class argument is required\n');
    printUsage();
    process.exit(1);
  }

  if (!CLASS_DIRS[classNum]) {
    console.error(`Error: Invalid class number ${classNum}. Valid range: 0-9`);
    process.exit(1);
  }

  // Check API key
  if (!CONFIG.apiKey) {
    console.error('Error: ELEVENLABS_API_KEY environment variable is required');
    console.error('Create a .env file in the project root with: ELEVENLABS_API_KEY=your_key');
    process.exit(1);
  }

  const classDir = CLASS_DIRS[classNum];
  const outputDir = path.join(__dirname, '..', classDir, 'audio');

  console.log(`\n📢 NCSSM Audio Generator`);
  console.log(`   Class: ${classNum} (${classDir})`);
  console.log(`   Voice: ${CONFIG.voiceId}`);
  console.log(`   Output: ${outputDir}`);

  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`   Created directory: ${outputDir}`);
  }

  // Load scripts
  console.log('\nLoading scripts...');
  const { NARRATION_SCRIPTS } = loadScripts(classNum);

  if (!NARRATION_SCRIPTS) {
    console.error('Error: Could not load NARRATION_SCRIPTS from scripts.js');
    process.exit(1);
  }

  const slideCount = Object.keys(NARRATION_SCRIPTS).length;
  console.log(`Found ${slideCount} slides`);

  // Generate audio
  if (specificSlide !== null) {
    if (!NARRATION_SCRIPTS[specificSlide]) {
      console.error(`Error: Slide ${specificSlide} not found in scripts.js`);
      process.exit(1);
    }
    console.log(`\nRegenerating slide ${specificSlide} only...`);
  }

  await generateSlides(NARRATION_SCRIPTS, outputDir, specificSlide);

  console.log('\n✅ Audio generation complete!\n');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
