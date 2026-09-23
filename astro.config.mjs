import { defineConfig } from 'astro/config';
import { readdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { SITE } from './src/site.config.mjs';

/**
 * Writes dist/_redirects (Cloudflare Pages) at build time:
 * every article gets a 301 from the old "/slug.html" URL to the new clean "/slug/" URL.
 * Built from src/content/articles, so new robot-published articles are covered automatically.
 */
function cloudflareRedirects() {
  return {
    name: 'cloudflare-redirects',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const outDir = fileURLToPath(dir);
        const slugs = readdirSync('./src/content/articles')
          .filter((f) => f.endsWith('.md'))
          .map((f) => f.replace(/\.md$/, ''));
        const manual = existsSync('./redirects.txt') ? readFileSync('./redirects.txt', 'utf8').trim() + '\n' : '';
        const lines = [
          '# Generated at build time by astro.config.mjs — do not edit dist/_redirects by hand.',
          '/index.html / 301',
          ...slugs.map((s) => `/${s}.html /${s}/ 301`),
        ];
        writeFileSync(`${outDir}/_redirects`, manual + lines.join('\n') + '\n');
      },
    },
  };
}

export default defineConfig({
  site: SITE.url,
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  compressHTML: true,
  integrations: [cloudflareRedirects()],
});
