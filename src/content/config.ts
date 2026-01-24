import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Narration slide schema - represents one slide's narration content
 */
const narrationSlideSchema = z.object({
  ssml: z.string().describe('SSML-formatted text for voice synthesis'),
  plainText: z.string().describe('Plain text version for captions/display'),
  estimatedDuration: z.number().nullable().describe('Estimated duration in seconds'),
  captions: z.array(z.object({
    start: z.number(),
    end: z.number(),
    text: z.string(),
  })).optional().describe('Timed caption segments'),
});

/**
 * Audio manifest slide schema - tracks sync status for one slide
 */
const audioManifestSlideSchema = z.object({
  audioFile: z.string().describe('Filename of the MP3'),
  narrationTextHash: z.string().describe('SHA256 of narration plainText'),
  slideSignature: z.object({
    number: z.number(),
    title: z.string(),
    type: z.string(),
  }),
  status: z.enum(['current', 'stale', 'missing']),
  staleReason: z.string().optional(),
});

/**
 * Narration data collection - slide-by-slide narration scripts
 * Located at: src/content/classes/{n}-{topic}/narration.json
 */
const narrationCollection = defineCollection({
  loader: glob({ pattern: '*/narration.json', base: './src/content/classes' }),
  schema: z.object({
    classNumber: z.number(),
    topic: z.string(),
    voice: z.string().default('Rachel'),
    model: z.string().default('eleven_multilingual_v2'),
    generatedFrom: z.string().optional().describe('Source file this was converted from'),
    slides: z.record(z.string(), narrationSlideSchema),
  }),
});

/**
 * Audio manifest data collection - tracks audio file sync status
 * Located at: src/content/classes/{n}-{topic}/audio-manifest.json
 */
const audioManifestCollection = defineCollection({
  loader: glob({ pattern: '*/audio-manifest.json', base: './src/content/classes' }),
  schema: z.object({
    classNumber: z.number(),
    topic: z.string(),
    generatedAt: z.string(),
    voiceId: z.string(),
    audioPath: z.string().describe('Path to audio files relative to public/'),
    slides: z.record(z.string(), audioManifestSlideSchema),
  }),
});

export const collections = {
  narration: narrationCollection,
  'audio-manifest': audioManifestCollection,
};

// Type exports for use in components
export type NarrationSlide = z.infer<typeof narrationSlideSchema>;
export type AudioManifestSlide = z.infer<typeof audioManifestSlideSchema>;
