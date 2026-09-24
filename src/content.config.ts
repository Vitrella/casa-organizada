import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * ARTICLE FORMAT — see docs/FORMATO-DE-ARTIGO.md for the full spec.
 *
 * One file per article: src/content/articles/<slug>.md
 * The file name IS the URL: best-kitchen-drawer-organizers.md → /best-kitchen-drawer-organizers/
 * The Markdown body (after the frontmatter) is the introduction.
 *
 * The schema is intentionally forgiving so the publishing robot can copy
 * entries from product-bank.json as-is (e.g. rating "4.7 out of 5 (42,700+ ratings)").
 */

const ratingField = z.union([z.number(), z.string()]).optional();

const product = z
  .object({
    name: z.string().min(1),
    shortName: z.string().optional(),
    asin: z.string().optional(),
    url: z.string().url().startsWith('https://').optional(), // optional full URL override (non-Amazon or custom link) — https only
    price: z.string().optional(), // "$25.99" — kept as text, exactly as listed
    rating: ratingField, // 4.7 or "4.7 out of 5 (42,700+ ratings)"
    ratingCount: z.string().optional(), // "42,700+" (auto-extracted from rating text if absent)
    bestFor: z.string().default(''),
    note: z.string().optional(), // 2-3 sentences about the product (same key as product-bank.json)
    pros: z.array(z.string()).default([]),
    cons: z.array(z.string()).default([]),
  })
  .passthrough()
  .transform((p) => {
    let ratingValue: number | undefined;
    let ratingCount = p.ratingCount;
    if (typeof p.rating === 'number') ratingValue = p.rating;
    else if (typeof p.rating === 'string') {
      const m = p.rating.match(/(\d(?:\.\d)?)/);
      if (m) ratingValue = parseFloat(m[1]);
      const c = p.rating.match(/\(([\d.,]+\+?)\s*ratings?/i);
      if (!ratingCount && c) ratingCount = c[1];
    }
    if (ratingValue !== undefined && (ratingValue < 0 || ratingValue > 5)) ratingValue = undefined;
    const priceValue = p.price ? parseFloat(p.price.replace(/[^0-9.]/g, '')) || undefined : undefined;
    return { ...p, ratingValue, ratingCount, priceValue };
  });

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string().min(5), // H1 and default <title>
    seoTitle: z.string().optional(), // optional shorter <title> (55-60 chars ideal)
    description: z.string().min(20), // meta description (150-160 chars ideal)
    keyword: z.string().optional(), // main keyword (used for category auto-detection)
    category: z.string().optional(), // garage | bathroom | office | kids | kitchen | closet | home (auto if absent)
    status: z.enum(['live', 'draft']).default('live'), // draft = noindex, hidden from homepage/sitemap
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    products: z.array(product).default([]),
    buyingGuide: z
      .array(z.object({ heading: z.string(), text: z.string() }))
      .default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    related: z.array(z.string()).default([]), // optional slugs to force in "Related articles"
    methodology: z.string().optional(), // override the site-wide "How we pick" sentence
  }),
});

export const collections = { articles };
