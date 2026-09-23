import type { APIRoute } from 'astro';
import { CATEGORIES } from '../site.config.mjs';
import { getLiveArticles, categoryFor, absoluteUrl } from '../lib/articles';

// Generated on every build from src/content/articles — drafts are excluded.
export const GET: APIRoute = async () => {
  const live = await getLiveArticles();
  const lastmod = (d: Date) => d.toISOString().slice(0, 10);
  const newest = live[0] ? live[0].data.updatedDate ?? live[0].data.publishDate : new Date();
  const urls: { loc: string; lastmod?: string }[] = [
    { loc: absoluteUrl('/'), lastmod: lastmod(newest) },
    ...live.map((a) => ({ loc: absoluteUrl(`/${a.id}/`), lastmod: lastmod(a.data.updatedDate ?? a.data.publishDate) })),
    ...CATEGORIES.filter((c) => live.some((a) => categoryFor(a).id === c.id)).map((c) => ({ loc: absoluteUrl(`/category/${c.id}/`) })),
    ...['/about/', '/how-we-pick/', '/affiliate-disclosure/', '/privacy-policy/'].map((p) => ({ loc: absoluteUrl(p) })),
  ];
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`).join('\n') +
    `\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
