import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Schema for all project types
const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  // Support both image and video
  media: z.object({
    src: z.string(), // path to image or video
    type: z.enum(['image', 'video']),
    alt: z.string().optional(),
  }),
  tags: z.array(z.string()),
  url: z.string().url(), // Live site, Behance, or LinkedIn post
  category: z.enum(['website', 'branding', 'others']),
  order: z.number().default(0), // For custom ordering
});

// Define collections
const websites = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/websites' }),
  schema: projectSchema,
});

const branding = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/branding' }),
  schema: projectSchema,
});

const others = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/others' }),
  schema: projectSchema,
});

export const collections = { websites, branding, others };
