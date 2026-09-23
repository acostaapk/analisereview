import { defineCollection, z } from 'astro:content';

const reviews = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    product: z.string(),
    company: z.string(),
    benefits: z.array(z.string()).min(1),
    category: z.string(),
    updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    description: z.string(),
    affiliateUrl: z.string().url(),
    image: z.string().optional(),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).min(1),
  }),
});

export const collections = { reviews };
