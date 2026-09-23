// SEO lint for articles: title/description length, keyword presence, products, disclosure prerequisites.
// Usage: npm run check:content   (warnings only — never blocks the build/robot)
import { readdirSync, readFileSync } from 'node:fs';
import yaml from 'js-yaml';

const dir = 'src/content/articles';
let warnings = 0;
const warn = (f, m) => { warnings++; console.log(`⚠  ${f}: ${m}`); };

for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
  const src = readFileSync(`${dir}/${file}`, 'utf8');
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) { warn(file, 'missing frontmatter'); continue; }
  let d;
  try { d = yaml.load(m[1]); } catch (e) { warn(file, 'invalid frontmatter: ' + e.message); continue; }
  if (d.status === 'draft') { console.log(`·  ${file}: draft (skipped)`); continue; }
  const title = d.seoTitle ?? (d.title.length + 19 <= 65 ? `${d.title} | Casa Organizada` : d.title);
  if (title.length < 45 || title.length > 65) warn(file, `<title> is ${title.length} chars (aim for 55-60): "${title}"`);
  const dl = (d.description ?? '').length;
  if (dl < 140 || dl > 165) warn(file, `description is ${dl} chars (aim for 150-160)`);
  if (d.keyword) {
    const kw = d.keyword.toLowerCase().replace(/^best /, '');
    if (!d.title.toLowerCase().includes(kw.split(' ').slice(0, 2).join(' '))) warn(file, 'title may not contain the main keyword');
    if (!(d.description ?? '').toLowerCase().includes(kw.split(' ').slice(0, 2).join(' '))) warn(file, 'description may not contain the main keyword');
  }
  if (!d.products?.length) warn(file, 'live article with no products');
  (d.products ?? []).forEach((p, i) => {
    if (!p.asin && !p.url) warn(file, `product ${i + 1} has no asin/url`);
    if (/placeholder|\[/.test(p.name)) warn(file, `product ${i + 1} looks like a placeholder`);
  });
  if (!d.faq?.length) warn(file, 'no FAQ (recommended: 2-4 questions)');
}
console.log(warnings ? `\n${warnings} warning(s).` : '\nAll articles look good.');
