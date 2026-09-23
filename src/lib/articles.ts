import { getCollection, type CollectionEntry } from 'astro:content';
import { SITE, CATEGORIES, categoryFor } from '../site.config.mjs';

export type Article = CollectionEntry<'articles'>;
export type Product = Article['data']['products'][number];

const updated = (a: Article) => (a.data.updatedDate ?? a.data.publishDate).getTime();

export async function getAllArticles(): Promise<Article[]> {
  const all = await getCollection('articles');
  return all.sort((a, b) => updated(b) - updated(a));
}

export async function getLiveArticles(): Promise<Article[]> {
  return (await getAllArticles()).filter((a) => a.data.status === 'live');
}

export const articleUrl = (slug: string) => `/${slug}/`;
export const absoluteUrl = (path: string) => new URL(path, SITE.url).href;
export const categoryUrl = (id: string) => `/category/${id}/`;
export { categoryFor, CATEGORIES };

export function affiliateUrl(p: Product): string | undefined {
  if (p.url) return p.url;
  if (!p.asin) return undefined;
  const base = `https://www.amazon.com/dp/${encodeURIComponent(p.asin.trim())}`;
  return SITE.amazonTag ? `${base}?tag=${encodeURIComponent(SITE.amazonTag)}` : base;
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60);
}

export const productAnchor = (p: Product, i: number) => `pick-${i + 1}-${slugify(p.shortName ?? p.name).slice(0, 40)}`;

export function shortName(p: Product) {
  if (p.shortName) return p.shortName;
  // "Brand Something, 9 Slot" → text before first comma, capped
  const base = p.name.split(/,| - | – /)[0].trim();
  return base.length > 48 ? base.slice(0, 46).replace(/\s+\S*$/, '') + '…' : base;
}

export function formatDate(d: Date) {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

export function readingTime(a: Article) {
  const parts = [
    a.body ?? '',
    ...a.data.products.flatMap((p) => [p.name, p.bestFor, p.note ?? '', ...p.pros, ...p.cons]),
    ...a.data.buyingGuide.flatMap((g) => [g.heading, g.text]),
    ...a.data.faq.flatMap((f) => [f.q, f.a]),
  ];
  const words = parts.join(' ').split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.round(words / 225));
}

export async function relatedArticles(current: Article, limit = 3): Promise<Article[]> {
  const live = (await getLiveArticles()).filter((a) => a.id !== current.id);
  const cat = categoryFor(current).id;
  const picked: Article[] = [];
  const add = (a?: Article) => {
    if (a && !picked.includes(a) && picked.length < limit) picked.push(a);
  };
  current.data.related.forEach((slug) => add(live.find((a) => a.id === slug)));
  live.filter((a) => categoryFor(a).id === cat).forEach(add);
  live.forEach(add); // fall back to most recently updated
  return picked;
}

/** Plain text for JSON-LD (strip markdown syntax). */
export const plain = (s: string) =>
  s
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`#>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
