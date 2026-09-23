// Lightweight inline-SVG illustrations, one per category.
// Used as article/card artwork (no external image requests → fast LCP, zero CLS)
// and by scripts/make-og.mjs to render Open Graph / Pinterest PNGs.
// Generic organized-room scenes only — no product photos (Amazon ToS until approval).

const C = {
  bg: '#EFE6D8',
  wall: '#F6F0E6',
  sage: '#8BA88F',
  sageD: '#3F5A45',
  terra: '#D98B5F',
  wood: '#C9A27A',
  woodD: '#A57F58',
  cream: '#FBF8F3',
  ink: '#2F3A33',
  glass: '#DCE7E0',
};

const frame = (inner) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" role="presentation" aria-hidden="true" focusable="false">` +
  `<rect width="400" height="240" fill="${C.wall}"/>` +
  `<rect y="196" width="400" height="44" fill="${C.bg}"/>` +
  `<line x1="0" y1="196" x2="400" y2="196" stroke="${C.woodD}" stroke-opacity=".25" stroke-width="2"/>` +
  inner +
  `</svg>`;

const plant = (x, y) =>
  `<g transform="translate(${x} ${y})"><path d="M14 0c-10-14-2-30 0-34 2 4 10 20 0 34z" fill="${C.sage}"/><path d="M14 2c-16-6-22-20-20-26 6 2 18 10 20 26z" fill="${C.sageD}" opacity=".8"/><path d="M14 2c14-6 22-18 22-26-8 2-18 10-22 26z" fill="${C.sage}" opacity=".9"/><path d="M2 2h24l-3 22H5z" fill="${C.terra}"/></g>`;

const jar = (x, y, h, fill) =>
  `<g transform="translate(${x} ${y})"><rect x="0" y="8" width="30" height="${h}" rx="6" fill="${C.glass}" stroke="${C.ink}" stroke-opacity=".15"/><rect x="3" y="${8 + h * 0.35}" width="24" height="${h * 0.62}" rx="4" fill="${fill}"/><rect x="-2" y="0" width="34" height="10" rx="3" fill="${C.wood}"/></g>`;

export const ILLUSTRATIONS = {
  kitchen: frame(
    `<rect x="40" y="70" width="190" height="8" rx="2" fill="${C.woodD}"/>` +
      jar(52, 26, 36, '#E8D3A9') + jar(92, 20, 42, '#C98A5E') + jar(132, 30, 32, '#F2E6CF') + jar(172, 24, 38, '#9DB59F') +
      `<rect x="40" y="120" width="210" height="76" rx="6" fill="${C.cream}" stroke="${C.ink}" stroke-opacity=".12"/>` +
      `<rect x="40" y="120" width="210" height="36" rx="6" fill="${C.sage}"/><rect x="128" y="134" width="34" height="6" rx="3" fill="${C.cream}"/>` +
      `<rect x="54" y="164" width="182" height="24" rx="4" fill="${C.wood}"/>` +
      `<rect x="60" y="168" width="40" height="16" rx="2" fill="${C.woodD}"/><rect x="104" y="168" width="40" height="16" rx="2" fill="${C.woodD}"/><rect x="148" y="168" width="82" height="16" rx="2" fill="${C.woodD}"/>` +
      plant(290, 140) +
      `<circle cx="330" cy="70" r="28" fill="${C.cream}" stroke="${C.woodD}" stroke-width="4"/><path d="M330 52v18l12 8" stroke="${C.ink}" stroke-width="3" fill="none" stroke-linecap="round"/>`
  ),
  closet: frame(
    `<rect x="40" y="40" width="220" height="156" rx="4" fill="${C.cream}" stroke="${C.ink}" stroke-opacity=".12"/>` +
      `<line x1="50" y1="62" x2="250" y2="62" stroke="${C.woodD}" stroke-width="5" stroke-linecap="round"/>` +
      [['#8BA88F', 60], ['#D98B5F', 104], ['#E9DCC7', 148], ['#3F5A45', 192]]
        .map(([f, x]) => `<path d="M${x + 18} 62v6" stroke="${C.ink}" stroke-width="2"/><path d="M${x} 72l18-6 18 6v74h-36z" fill="${f}" stroke="${C.ink}" stroke-opacity=".12"/>`)
        .join('') +
      `<rect x="50" y="162" width="200" height="6" rx="2" fill="${C.woodD}"/>` +
      [64, 104, 144, 184, 222].map((x, i) => `<rect x="${x}" y="176" width="26" height="12" rx="6" fill="${i % 2 ? C.terra : C.sageD}"/>`).join('') +
      `<rect x="290" y="90" width="70" height="106" rx="4" fill="${C.wood}"/>` +
      [100, 134, 168].map((y) => `<rect x="298" y="${y}" width="54" height="24" rx="3" fill="${C.cream}"/><circle cx="325" cy="${y + 12}" r="3" fill="${C.woodD}"/>`).join('')
  ),
  garage: frame(
    `<rect x="30" y="34" width="150" height="96" rx="4" fill="${C.wood}"/>` +
      Array.from({ length: 6 }, (_, r) => Array.from({ length: 10 }, (_, c) => `<circle cx="${42 + c * 14}" cy="${44 + r * 15}" r="1.8" fill="${C.woodD}"/>`).join('')).join('') +
      `<rect x="48" y="56" width="8" height="46" rx="3" fill="${C.sageD}"/><circle cx="90" cy="70" r="14" fill="none" stroke="${C.terra}" stroke-width="5"/><rect x="124" y="54" width="36" height="8" rx="3" fill="${C.ink}" opacity=".7"/><rect x="138" y="62" width="8" height="40" rx="3" fill="${C.ink}" opacity=".7"/>` +
      [[210, 150, C.sageD], [300, 150, C.sageD], [210, 104, C.terra], [300, 104, C.sage], [255, 58, C.sageD]]
        .map(([x, y, f]) => `<rect x="${x}" y="${y + 8}" width="84" height="38" rx="5" fill="${f}"/><rect x="${x - 3}" y="${y}" width="90" height="12" rx="4" fill="#E7C66A"/>`)
        .join('')
  ),
  bathroom: frame(
    `<ellipse cx="150" cy="70" rx="44" ry="50" fill="${C.glass}" stroke="${C.wood}" stroke-width="6"/>` +
      `<rect x="70" y="124" width="160" height="72" rx="6" fill="${C.sage}"/><rect x="60" y="116" width="180" height="12" rx="4" fill="${C.cream}" stroke="${C.ink}" stroke-opacity=".12"/>` +
      `<line x1="150" y1="130" x2="150" y2="196" stroke="${C.sageD}" stroke-width="2"/><circle cx="140" cy="160" r="3" fill="${C.cream}"/><circle cx="160" cy="160" r="3" fill="${C.cream}"/>` +
      `<rect x="96" y="100" width="12" height="16" rx="3" fill="${C.terra}"/><rect x="190" y="96" width="14" height="20" rx="4" fill="${C.cream}" stroke="${C.ink}" stroke-opacity=".2"/>` +
      `<rect x="270" y="80" width="80" height="116" rx="4" fill="${C.cream}" stroke="${C.ink}" stroke-opacity=".12"/>` +
      [96, 134, 172].map((y, i) => `<rect x="280" y="${y}" width="60" height="22" rx="5" fill="${[C.wood, C.sageD, C.terra][i]}"/>`).join('')
  ),
  office: frame(
    `<rect x="40" y="130" width="280" height="10" rx="3" fill="${C.woodD}"/><rect x="56" y="140" width="8" height="56" fill="${C.woodD}"/><rect x="296" y="140" width="8" height="56" fill="${C.woodD}"/>` +
      `<rect x="120" y="54" width="116" height="70" rx="6" fill="${C.ink}"/><rect x="126" y="60" width="104" height="58" rx="3" fill="${C.sage}"/><rect x="170" y="124" width="16" height="6" fill="${C.ink}"/>` +
      `<rect x="62" y="96" width="24" height="34" rx="4" fill="${C.terra}"/><line x1="68" y1="96" x2="64" y2="80" stroke="${C.ink}" stroke-width="3"/><line x1="76" y1="96" x2="80" y2="78" stroke="${C.sageD}" stroke-width="3"/>` +
      `<path d="M252 130v-40h36v40" fill="${C.wood}"/><rect x="258" y="84" width="6" height="46" fill="${C.cream}"/><rect x="268" y="80" width="6" height="50" fill="${C.cream}"/><rect x="278" y="86" width="6" height="44" fill="${C.cream}"/>` +
      `<path d="M346 196v-90l-20-26" stroke="${C.ink}" stroke-width="4" fill="none"/><path d="M308 70h36l-8 18h-20z" fill="${C.terra}"/>`
  ),
  kids: frame(
    `<rect x="50" y="56" width="180" height="140" rx="4" fill="${C.wood}"/>` +
      [0, 1, 2].map((r) => [0, 1, 2].map((c) => `<rect x="${58 + c * 58}" y="${64 + r * 44}" width="50" height="38" rx="3" fill="${C.cream}"/>`).join('')).join('') +
      [[58, 64, C.terra], [116, 108, C.sage], [174, 64, '#E7C66A'], [58, 152, C.sageD], [174, 152, C.terra]]
        .map(([x, y, f]) => `<rect x="${x + 3}" y="${y + 6}" width="44" height="32" rx="4" fill="${f}"/><rect x="${x + 17}" y="${y + 12}" width="16" height="5" rx="2" fill="${C.cream}" opacity=".8"/>`)
        .join('') +
      `<circle cx="296" cy="176" r="20" fill="${C.terra}"/><path d="M276 176h40M296 156v40" stroke="${C.cream}" stroke-width="3"/>` +
      `<rect x="262" y="84" width="46" height="46" rx="6" fill="${C.sage}" transform="rotate(-8 285 107)"/><text x="285" y="115" text-anchor="middle" font-family="Georgia,serif" font-size="26" fill="${C.cream}" transform="rotate(-8 285 107)">A</text>`
  ),
  home: frame(
    `<rect x="40" y="60" width="150" height="8" rx="3" fill="${C.woodD}"/>` +
      [60, 100, 140, 176].map((x) => `<path d="M${x} 68v12a6 6 0 0 0 12 0" stroke="${C.ink}" stroke-width="3" fill="none"/>`).join('') +
      `<path d="M54 86h30l-4 50H58z" fill="${C.terra}"/><path d="M60 86c0-10 18-10 18 0" stroke="${C.terra}" stroke-width="3" fill="none"/>` +
      `<ellipse cx="106" cy="92" rx="22" ry="8" fill="${C.sageD}"/><path d="M92 92c0-18 28-18 28 0" fill="${C.sageD}"/>` +
      `<rect x="56" y="150" width="120" height="46" rx="4" fill="${C.wood}"/><rect x="50" y="146" width="132" height="10" rx="4" fill="${C.sage}"/>` +
      [[230, 150], [310, 150], [230, 106], [310, 106], [270, 62]]
        .map(([x, y], i) => `<rect x="${x}" y="${y}" width="72" height="42" rx="5" fill="${C.glass}" stroke="${C.ink}" stroke-opacity=".18"/><rect x="${x + 6}" y="${y + 18}" width="60" height="20" rx="3" fill="${[C.terra, C.sage, C.wood, '#E7C66A', C.sageD][i]}" opacity=".85"/><rect x="${x + 24}" y="${y + 6}" width="24" height="7" rx="2" fill="${C.cream}"/>`)
        .join('')
  ),
};

export const illustrationFor = (categoryId) => ILLUSTRATIONS[categoryId] ?? ILLUSTRATIONS.home;
