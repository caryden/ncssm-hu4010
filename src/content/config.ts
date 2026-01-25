import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Design documents collection - course-level design and planning docs
 * Located at: src/content/design/*.mdx
 */
const designCollection = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/design' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    docType: z.enum(['research', 'plan', 'syllabus', 'spec']),
    order: z.number(),
    // Optional metadata fields
    generated: z.coerce.date().optional(),
    version: z.string().optional(),
    date: z.coerce.date().optional(),
    semester: z.string().optional(),
    course: z.string().optional(),
    courseCode: z.string().optional(),
    institution: z.string().optional(),
    targetAudience: z.string().optional(),
    basedOn: z.string().optional(),
    guestInstructor: z.string().optional(),
    ncssmInstructor: z.string().optional(),
    schedule: z.string().optional(),
    workSessions: z.string().optional(),
    duration: z.string().optional(),
    location: z.string().optional(),
    classSize: z.string().optional(),
    brandIntegration: z.string().optional(),
  }),
});

/**
 * Lesson plans collection - per-class teaching guides
 * Located at: src/content/classes/{n}-{topic}/lesson-plan.md
 */
const lessonPlanCollection = defineCollection({
  loader: glob({ pattern: '*/lesson-plan.md', base: './src/content/classes' }),
  schema: z.object({
    // Lesson plans use markdown without frontmatter, so we extract info from path
  }).optional(),
});

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
  design: designCollection,
  'lesson-plans': lessonPlanCollection,
  narration: narrationCollection,
  'audio-manifest': audioManifestCollection,
};

// Type exports for use in components
export type NarrationSlide = z.infer<typeof narrationSlideSchema>;
export type AudioManifestSlide = z.infer<typeof audioManifestSlideSchema>;
