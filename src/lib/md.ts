// Tiny, safe inline-markdown renderer for short frontmatter strings
// (buying guide paragraphs, FAQ answers, product notes).
// Supports: paragraphs (blank line), **bold**, *italic*, [link](https://...), and "- " bullet lists.

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function inline(s: string) {
  return esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*(?!\s)(.+?)\*/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\(((?:https?:\/\/|\/)[^\s)]+)\)/g, (_m, text, href) => {
      const external = href.startsWith('http');
      return `<a href="${href}"${external ? ' rel="noopener" target="_blank"' : ''}>${text}</a>`;
    });
}

export function md(src: string | undefined): string {
  if (!src) return '';
  return src
    .trim()
    .split(/\n\s*\n/)
    .map((block) => {
      const lines = block.split('\n').map((l) => l.trim());
      if (lines.every((l) => /^[-*]\s+/.test(l))) {
        return `<ul>${lines.map((l) => `<li>${inline(l.replace(/^[-*]\s+/, ''))}</li>`).join('')}</ul>`;
      }
      return `<p>${inline(lines.join(' '))}</p>`;
    })
    .join('');
}

export const mdInline = (s: string | undefined) => (s ? inline(s.trim()) : '');
