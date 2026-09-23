import { defineCollection, z } from 'astro:content';

const reviews = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    product: z.string(),
    author: z.string(),
    price: z.number().positive(),
    priceCurrency: z.string().default('BRL'),
    reviewCount: z.number().int().nonnegative(),
    score: z.number().min(0).max(10),
    subscores: z.object({
      conteudo: z.number().min(0).max(10),
      suporte: z.number().min(0).max(10),
      garantia: z.number().min(0).max(10),
      custoBeneficio: z.number().min(0).max(10),
    }),
    pros: z.array(z.string()).min(1),
    cons: z.array(z.string()),
    verdict: z.string(),
    recommended: z.boolean(),
    affiliateUrl: z.string().url(),
    category: z.string(),
    updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    description: z.string(),
  }),
});

export const collections = { reviews };
