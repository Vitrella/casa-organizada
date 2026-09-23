// Renders Open Graph images (1200x630) per category + home, plus logo.png.
// Run once locally (npm run og) and commit public/og/*.png — not part of the Cloudflare build.
import sharp from 'sharp';
import { mkdirSync, readFileSync } from 'node:fs';
import { ILLUSTRATIONS } from '../src/lib/illustrations.mjs';
import { CATEGORIES, SITE } from '../src/site.config.mjs';

mkdirSync('public/og', { recursive: true });
const inner = (svg) => svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/’/g, "'");

async function og(file, illuKey, kicker, headline) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#fbf8f3"/>
    <rect x="600" y="0" width="600" height="630" fill="#F6F0E6"/><rect x="600" y="384" width="600" height="246" fill="#EFE6D8"/>
    <svg x="600" y="90" width="600" height="360" viewBox="0 0 400 240">${inner(ILLUSTRATIONS[illuKey])}</svg>
    <rect x="0" y="0" width="600" height="630" fill="#fbf8f3"/>
    <g transform="translate(64 70) scale(2)"><path d="M16 3 3 13.5V29h26V13.5z" fill="#3c5642"/><rect x="8.5" y="14" width="15" height="4" rx="1.2" fill="#fbf8f3"/><rect x="8.5" y="19.3" width="15" height="4" rx="1.2" fill="#e6eee6"/><rect x="8.5" y="24.6" width="15" height="3.4" rx="1.2" fill="#f0922b"/></g>
    <text x="140" y="120" font-family="DejaVu Serif, Georgia, serif" font-size="36" font-weight="bold" fill="#232b26">${SITE.name}</text>
    <text x="64" y="250" font-family="DejaVu Sans, Arial, sans-serif" font-size="26" font-weight="bold" letter-spacing="3" fill="#3c5642">${esc(kicker.toUpperCase())}</text>
    ${headline.map((l, i) => `<text x="64" y="${330 + i * 68}" font-family="DejaVu Serif, Georgia, serif" font-size="56" font-weight="bold" fill="#232b26">${esc(l)}</text>`).join('')}
    <rect x="64" y="540" width="160" height="10" rx="5" fill="#f0922b"/>
  </svg>`;
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(`public/og/${file}.png`);
}

await og('home', 'closet', 'Home organization guides', ['Honest picks for', 'every room.']);
for (const c of CATEGORIES) await og(c.id, c.id, `${c.name} guides`, ['Real products,', 'compared plainly.']);
const logo = readFileSync('public/favicon.svg', 'utf8').replace('<svg ', '<svg width="512" height="512" ');
await sharp(Buffer.from(logo)).png().toFile('public/logo.png');
console.log('OG images written to public/og/');
