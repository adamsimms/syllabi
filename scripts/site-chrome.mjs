/** Shared design tokens + self-hosted fonts aligned with art.adamsimms.xyz / adamsimms.xyz */

export const ART_ORIGIN = "https://art.adamsimms.xyz";

export const SITE_TOKENS = {
  text: "#1a1a1a",
  muted: "#666",
  bg: "#fafafa",
  border: "#e5e5e5",
  link: "#f05f40",
  hover: "#e04a2c",
};

export const FONT_FACE_CSS = `/* Self-hosted latin (+ latin-ext) — aligned with art.adamsimms.xyz */
@font-face {
  font-family: 'Google Sans Flex';
  font-style: normal;
  font-weight: 1 1000;
  font-display: swap;
  src: url('/fonts/google-sans-flex-latin.woff2') format('woff2');
  unicode-range:
    U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329,
    U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: 'Google Sans Flex';
  font-style: normal;
  font-weight: 1 1000;
  font-display: swap;
  src: url('/fonts/google-sans-flex-latin-ext.woff2') format('woff2');
  unicode-range:
    U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF,
    U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

@font-face {
  font-family: Inter;
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url('/fonts/inter-latin.woff2') format('woff2');
  unicode-range:
    U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329,
    U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: Inter;
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url('/fonts/inter-latin-ext.woff2') format('woff2');
  unicode-range:
    U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF,
    U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}

@font-face {
  font-family: Inter;
  font-style: italic;
  font-weight: 100 900;
  font-display: swap;
  src: url('/fonts/inter-latin-italic.woff2') format('woff2');
  unicode-range:
    U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329,
    U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: Inter;
  font-style: italic;
  font-weight: 100 900;
  font-display: swap;
  src: url('/fonts/inter-latin-ext-italic.woff2') format('woff2');
  unicode-range:
    U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF,
    U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
}`;

export const ROOT_VARS_CSS = `
    :root {
      --text: ${SITE_TOKENS.text};
      --muted: ${SITE_TOKENS.muted};
      --bg: ${SITE_TOKENS.bg};
      --border: ${SITE_TOKENS.border};
      --link: ${SITE_TOKENS.link};
      --hover: ${SITE_TOKENS.hover};
      --accent: var(--link);
      --font-display: 'Google Sans Flex', system-ui, sans-serif;
      --font-body: Inter, system-ui, sans-serif;
      --type-display: clamp(2.75rem, 1.4rem + 6vw, 6.5rem);
      --type-title: clamp(1.35rem, 1.05rem + 1.4vw, 2.25rem);
      --type-body: clamp(0.95rem, 0.9rem + 0.2vw, 1.05rem);
      --type-caption: clamp(0.72rem, 0.68rem + 0.15vw, 0.8rem);
      --type-brand: clamp(1.2rem, 1.0977rem + 0.4545vw, 1.45rem);
      --type-nav: clamp(0.9rem, 0.8795rem + 0.0909vw, 0.95rem);
      --tracking-nav: 0.08em;
      --tracking-label: 0.06em;
      --page-inset: clamp(1.25rem, 4vw, 3.5rem);
      --footer-bg: #0b1c2c;
      --footer-accent: #f05f40;
      --step--2: clamp(0.6944rem, 0.684rem + 0.0465vw, 0.72rem);
      --space-s: clamp(1rem, 0.9489rem + 0.2273vw, 1.125rem);
      --space-m: clamp(1.5rem, 1.4233rem + 0.3409vw, 1.6875rem);
      --space-l: clamp(2rem, 1.8977rem + 0.4545vw, 2.25rem);
      --space-xl: clamp(3rem, 2.8466rem + 0.6818vw, 3.375rem);
      --leading-body: 1.5;
      --leading-tight: 1;
    }`;

export const ART_NAV_CSS = `
    .site-header {
      position: relative;
      z-index: 3;
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 1.5rem;
      padding: clamp(1.25rem, 3vw, 2rem) var(--page-inset) 1rem;
      background: transparent;
    }

    .site-title {
      font-family: var(--font-display);
      font-size: var(--type-brand);
      font-weight: 600;
      font-optical-sizing: auto;
      letter-spacing: 0;
      line-height: 1;
      text-decoration: none;
      border-bottom: none;
      text-transform: uppercase;
      color: inherit;
      transition: color 1s cubic-bezier(0.22, 1, 0.36, 1) 0.2s;
    }

    .site-title__mark {
      display: inline-grid;
      grid-template-areas: "label";
    }

    .site-title__mono,
    .site-title__full {
      grid-area: label;
      white-space: nowrap;
    }

    .site-title__mono {
      opacity: 1;
      transition: opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .site-title__full {
      opacity: 0;
      transition: opacity 0s;
    }

    .site-title:is(:hover, :focus-visible) .site-title__mono {
      opacity: 0;
      transition: opacity 0s;
    }

    .site-title:is(:hover, :focus-visible) .site-title__full {
      opacity: 1;
      transition: opacity 2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .site-nav ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      gap: 1.75rem;
      margin: 0;
      padding: 0;
      list-style: none;
    }

    .site-nav a {
      position: relative;
      font-family: var(--font-display);
      font-size: var(--type-nav);
      font-weight: 600;
      font-optical-sizing: auto;
      letter-spacing: var(--tracking-nav);
      text-decoration: none;
      text-transform: uppercase;
      color: inherit;
      border: none;
      transition: color 0.45s cubic-bezier(0.22, 1, 0.36, 1);
    }

    @media (hover: none) {
      .site-nav a::before {
        content: "";
        position: absolute;
        inset: -0.7rem -0.45rem;
      }
    }

    .site-nav a::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -0.35em;
      width: 100%;
      height: 1px;
      background: currentColor;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .site-nav a:is(:hover, :focus-visible)::after,
    .site-nav a[aria-current="page"]::after {
      transform: scaleX(1);
    }

    @media (max-width: 40rem) {
      .site-nav ul {
        gap: 1.25rem;
      }
    }`;

/**
 * Art-site header. `current` should be one of: works | about | cv
 */
export function renderArtNav(current = "") {
  const links = [
    { href: `${ART_ORIGIN}/works`, label: "Works", id: "works" },
    { href: `${ART_ORIGIN}/about`, label: "About", id: "about" },
    { href: `${ART_ORIGIN}/cv`, label: "CV", id: "cv" },
  ];

  const items = links
    .map((link) => {
      const currentAttr = link.id === current ? ' aria-current="page"' : "";
      return `      <li><a href="${link.href}"${currentAttr}>${link.label}</a></li>`;
    })
    .join("\n");

  return `<header class="site-header">
  <a class="site-title" href="${ART_ORIGIN}/" aria-label="Adam Simms">
    <span class="site-title__mark" aria-hidden="true">
      <span class="site-title__mono">AS</span>
      <span class="site-title__full">Adam Simms</span>
    </span>
  </a>
  <nav class="site-nav" aria-label="Main">
    <ul>
${items}
    </ul>
  </nav>
</header>`;
}

const BERRY_LOBES = [
  "M51.9,29.6 C55.8,35.2 54.4,43 48.7,46.9 C43,50.8 35.3,49.5 31.4,43.8 C27.5,38.2 28.9,30.5 34.6,26.5 C40.3,22.6 48,23.9 51.9,29.6 Z",
  "M27.3,32.4 C25.2,39.9 28.8,47 35.3,50.2 C33.3,54.7 26.8,58.5 20.1,56.1 C13.7,53.8 10.4,46.8 12.7,40.3 C15,33.9 22.1,30.9 27.3,32.4 Z",
  "M14.9,33.1 C11.7,29.9 10.4,26.1 11.3,21.6 C12.4,15.7 17.8,11.4 23.8,11.5 C29.8,11.6 34.8,16 35.8,21.8 C35.9,22.6 35.8,23 35,23.4 C32.4,24.7 30.3,26.6 28.9,29.1 C28.5,29.8 28.2,30 27.4,29.8 C23.1,29 19.1,29.9 15.6,32.6 C15.3,32.8 15.1,32.9 14.9,33.1 Z",
  "M49.6,24.1 C46,22 42.3,21.4 38.3,22.3 C37.7,17.9 35.6,14.4 32,11.8 C34.7,8.7 40.7,7.1 45.7,10.3 C50.3,13.1 52,19.2 49.6,24.1 Z",
  "M13.1,34.8 C10.2,39 9.8,40.3 9.5,45.6 C5.9,45.5 0.9,41.9 0.3,36.1 C-0.3,29.8 4.2,25.1 8.6,24.2 C8.6,28.4 10.2,31.9 13.1,34.8 Z",
  "M52.4,14.7 C57.2,14.1 62.3,17.9 63.5,23 C64.8,28.4 61.7,34.2 56.7,35.8 C56.2,34.1 55.9,32.2 55.2,30.6 C54.4,28.9 53.1,27.5 52.1,25.9 C51.9,25.6 51.7,25.2 51.8,24.9 C53.2,21.6 53.5,18.2 52.3,14.8 C52.4,14.9 52.4,14.8 52.4,14.7 Z",
  "M50,55.5 C50.8,53.3 51.1,51.1 50.9,48.9 C50.9,48.6 51.1,48.2 51.3,48 C53.9,45.7 55.6,42.8 56.3,39.4 C56.4,39.1 56.7,38.7 57,38.6 C57.7,38.2 58.5,38 59.2,37.5 C59.9,37.1 60.3,37.2 60.7,37.8 C64.1,42.1 63.7,48.8 59.6,52.6 C57,55 53.8,56 50,55.5 Z",
  "M2.8,24 C0.4,20.9 1.3,14.6 4.7,11.2 C8.5,7.4 14.7,6.7 18.9,9.8 C18.4,10 17.9,10.2 17.5,10.5 C13,12.6 10.2,16.1 9,20.9 C8.9,21.2 8.7,21.6 8.5,21.7 C6.6,22.5 4.7,23.2 2.8,24 Z",
  "M29.7,58.3 C33.3,56.8 36,54.4 37.8,51 C41.5,51.9 45,51.5 48.5,49.8 C49.2,53.8 46.1,58.8 41.9,60.6 C37.6,62.5 31.9,61.4 29.7,58.3 Z",
  "M38.6,6 C38.4,6 38.2,6.1 38,6.1 C34.9,6.5 32.2,7.8 30,10 C29.8,10.2 29.3,10.3 29.1,10.2 C27,9.4 24.8,9 22.5,9.2 C22.3,9.2 22,9.2 21.8,9 C20.9,8.3 20,7.6 19.1,6.9 C20.2,3.5 24.5,0.6 28.8,0.4 C32.9,0.3 37.3,2.8 38.6,6 Z",
  "M39.6,2.8 C43.3,1.2 47,1.3 50.4,3.5 C53.6,5.5 55.2,8.6 55.4,12.3 C54,12.3 52.8,12.3 51.5,12.2 C51.3,12.2 51,12 50.8,11.8 C48.6,8.8 45.7,6.9 42.1,6.2 C41.8,6.2 41.5,6 41.4,5.8 C40.8,4.9 40.3,3.9 39.6,2.8 Z",
];

function berryMarkSvg() {
  const lobes = BERRY_LOBES.map(
    (d, i) =>
      `<path class="berry-mark__lobe berry-mark__lobe--${i + 1}" d="${d}"></path>`
  ).join("");
  return `<svg class="berry-mark berry-mark--animated site-footer__berry-lg" width="80" height="80" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><g transform="translate(3 3.28125) scale(0.28125)" fill-rule="nonzero">${lobes}</g></svg>`;
}

export const ART_FOOTER_CSS = `
    .berry-mark { display: block; overflow: visible; }
    .berry-mark__lobe { fill: var(--hover); opacity: 1; }
    .berry-mark--animated .berry-mark__lobe--1 { animation: berry-lobe-fade 13.5s ease-in-out infinite; animation-delay: 0s; }
    .berry-mark--animated .berry-mark__lobe--2 { animation: berry-lobe-fade 17.7s ease-in-out infinite; animation-delay: -5.7s; }
    .berry-mark--animated .berry-mark__lobe--3 { animation: berry-lobe-fade 15.1s ease-in-out infinite; animation-delay: -2.1s; }
    .berry-mark--animated .berry-mark__lobe--4 { animation: berry-lobe-fade 19.8s ease-in-out infinite; animation-delay: -11.4s; }
    .berry-mark--animated .berry-mark__lobe--5 { animation: berry-lobe-fade 16.1s ease-in-out infinite; animation-delay: -8.8s; }
    .berry-mark--animated .berry-mark__lobe--6 { animation: berry-lobe-fade 21.8s ease-in-out infinite; animation-delay: -4.2s; }
    .berry-mark--animated .berry-mark__lobe--7 { animation: berry-lobe-fade 14s ease-in-out infinite; animation-delay: -13s; }
    .berry-mark--animated .berry-mark__lobe--8 { animation: berry-lobe-fade 18.7s ease-in-out infinite; animation-delay: -7.3s; }
    .berry-mark--animated .berry-mark__lobe--9 { animation: berry-lobe-fade 15.6s ease-in-out infinite; animation-delay: -1s; }
    .berry-mark--animated .berry-mark__lobe--10 { animation: berry-lobe-fade 20.8s ease-in-out infinite; animation-delay: -16.1s; }
    .berry-mark--animated .berry-mark__lobe--11 { animation: berry-lobe-fade 17.2s ease-in-out infinite; animation-delay: -9.9s; }
    @keyframes berry-lobe-fade {
      0%, 100% { opacity: 0.12; }
      40%, 55% { opacity: 1; }
    }
    @media (prefers-reduced-motion: reduce) {
      .berry-mark--animated .berry-mark__lobe { animation: none !important; opacity: 1; }
    }

    .site-footer {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-s);
      width: 100%;
      box-sizing: border-box;
      margin: clamp(4rem, 12vw, 8rem) 0 0;
      padding: 5rem var(--page-inset) 2rem;
      background: var(--footer-bg);
      color: #e8eef4;
      color-scheme: dark;
    }

    .site-footer__hero {
      display: flex;
      align-items: flex-start;
      color: inherit;
      text-decoration: none;
      border: none;
    }

    .site-footer__identity {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-s);
      width: 100%;
      min-width: 0;
    }

    .site-footer__identity nav { width: 100%; }

    .site-footer__bio {
      margin: 0;
      max-width: 28rem;
      font-size: var(--type-body);
      line-height: var(--leading-body);
      color: #fff;
      text-wrap: pretty;
    }

    .site-footer__tags {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      gap: 0.55rem 0;
      row-gap: 0.75rem;
      margin: var(--space-m) 0 0;
      padding: 0;
      list-style: none;
    }

    .site-footer__tags li {
      display: inline-flex;
      align-items: center;
      line-height: 1.65;
    }

    .site-footer__tags li:not(:last-child)::after {
      content: "·";
      margin-inline: 0.55rem;
      color: color-mix(in srgb, #e8eef4 40%, transparent);
      pointer-events: none;
    }

    .site-footer__tags a {
      position: relative;
      display: inline-block;
      padding-block: 0.2em;
      font-family: var(--font-display);
      font-size: var(--type-caption);
      font-weight: 500;
      line-height: 1.65;
      letter-spacing: var(--tracking-label);
      text-decoration: none;
      text-transform: uppercase;
      color: color-mix(in srgb, #e8eef4 78%, transparent);
      border: none;
      transition: color 0.45s cubic-bezier(0.22, 1, 0.36, 1);
      white-space: nowrap;
    }

    @media (hover: none) {
      .site-footer__tags a::before {
        content: "";
        position: absolute;
        inset: -0.65rem -0.45rem;
      }
    }

    .site-footer__tags a::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -0.35em;
      width: 100%;
      height: 1px;
      background: currentColor;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .site-footer__tags a:is(:hover, :focus-visible) { color: #fff; }
    .site-footer__tags a:is(:hover, :focus-visible)::after,
    .site-footer__tags a[aria-current="page"]::after { transform: scaleX(1); }
    .site-footer__tags a[aria-current="page"] { color: #fff; }

    .site-footer__hero:is(:hover, :focus-visible) .berry-mark__lobe { fill: #fff; }

    .site-footer__berry-lg,
    .site-footer__berry-lg.berry-mark {
      width: min(9vw, 3.75rem);
      height: auto;
      max-height: 8vh;
      transform: translate(-12.5%, -12.5%);
    }

    .site-footer .berry-mark__lobe { fill: var(--footer-accent); }

    .site-footer__mailto {
      position: relative;
      font-size: var(--type-body);
      font-weight: 400;
      letter-spacing: 0.01em;
      text-decoration: none;
      text-transform: none;
      color: var(--footer-accent);
      border: none;
      transition: color 0.45s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .site-footer__mailto::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -0.35em;
      width: 100%;
      height: 1px;
      background: currentColor;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .site-footer a.site-footer__mailto:is(:hover, :focus-visible) { color: #fff; }
    .site-footer a.site-footer__mailto:is(:hover, :focus-visible)::after { transform: scaleX(1); }

    .site-footer__bottom {
      display: flex;
      align-items: last baseline;
      justify-content: space-between;
      gap: 1rem;
      width: 100%;
      margin-top: var(--space-xl);
      padding-top: var(--space-s);
    }

    .site-footer__weather {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.45rem;
      margin: 0;
      min-width: 0;
      line-height: var(--leading-tight);
      color: #e8eef4;
    }

    .site-footer__weather [data-weather-label] {
      font-family: var(--font-display);
      font-size: var(--type-nav);
      font-weight: 600;
      letter-spacing: var(--tracking-nav);
      text-transform: uppercase;
    }

    .site-footer__weather [data-weather-meta] {
      font-size: var(--step--2);
      font-weight: 400;
      letter-spacing: 0.02em;
      line-height: 1;
      min-height: 1em;
      text-transform: none;
      color: color-mix(in srgb, #e8eef4 55%, transparent);
    }

    .site-footer__meta {
      display: flex;
      flex-shrink: 0;
      align-items: baseline;
      gap: 0.35rem;
      line-height: 1;
    }

    .site-footer__social {
      display: inline-flex;
      align-items: baseline;
      gap: 0.35rem;
      font-size: var(--step--2);
      letter-spacing: 0.02em;
      line-height: 1;
    }

    .site-footer__social a {
      color: color-mix(in srgb, #e8eef4 62%, transparent);
      text-decoration: none;
      border: none;
      transition: color 0.45s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .site-footer__social a:is(:hover, :focus-visible) { color: #fff; }

    .site-footer__social-sep {
      color: color-mix(in srgb, #e8eef4 28%, transparent);
      line-height: 1;
    }

    .site-footer__copy {
      margin: 0;
      font-size: var(--step--2);
      letter-spacing: 0.02em;
      line-height: 1;
      color: color-mix(in srgb, #e8eef4 62%, transparent);
    }

    @media (max-width: 60rem) {
      .site-footer__berry-lg,
      .site-footer__berry-lg.berry-mark {
        width: min(12vw, 3rem);
        max-height: 6vh;
      }
    }

    @media (max-width: 40rem) {
      .site-footer { padding: 3rem var(--page-inset) 1.5rem; }
      .site-footer__tags { row-gap: 0.9rem; }
      .site-footer__tags li,
      .site-footer__tags a { line-height: 1.8; }
      .site-footer__tags a { padding-block: 0.35em; }
      .site-footer__bottom {
        flex-wrap: wrap;
        align-items: flex-start;
        row-gap: 0;
        column-gap: 1rem;
        margin-top: var(--space-l);
      }
      .site-footer__weather { flex: 1 1 100%; min-width: 0; }
      .site-footer__meta { flex: 1 1 auto; margin-top: 1.25rem; }
      .site-footer__berry-lg,
      .site-footer__berry-lg.berry-mark {
        width: min(14vw, 2.75rem);
        max-height: 5vh;
      }
    }`;

export const ART_FOOTER_SCRIPT = `
<script>
(() => {
  const address = atob("aGVsbG9AYWRhbXNpbW1zLnh5eg==");
  document.querySelectorAll("[data-email-mailto]").forEach((node) => {
    if (!(node instanceof HTMLAnchorElement)) return;
    node.href = "mailto:" + address;
    node.textContent = address;
  });

  const root = document.querySelector("[data-pinchard-weather]");
  const meta = root?.querySelector("[data-weather-meta]");
  if (!(meta instanceof HTMLElement)) return;

  const format = (data) => {
    const current = data?.current;
    if (!current || current.temp_c == null || !Number.isFinite(Number(current.temp_c))) return null;
    const temp = Math.round(Number(current.temp_c)) + "° C";
    const condition = typeof current.condition === "string" ? current.condition.trim() : "";
    const parts = [temp];
    if (condition) parts.push(condition);
    const dir = typeof current.wind_dir === "string" ? current.wind_dir.trim() : "";
    const wind = current.wind_kph != null && Number.isFinite(Number(current.wind_kph))
      ? Math.round(Number(current.wind_kph)) : null;
    if (dir && wind != null) parts.push("Wind " + wind + " km/h " + dir);
    else if (wind != null) parts.push("Wind " + wind + " km/h");
    else if (dir) parts.push("Wind " + dir);
    return parts.join(" · ");
  };

  fetch("${ART_ORIGIN}/adrift/api/weather")
    .then((r) => (r.ok ? r.json() : null))
    .then((data) => {
      const line = format(data);
      if (line) meta.textContent = line;
    })
    .catch(() => {});
})();
</script>`;

/**
 * Art-site footer. `current` should be one of: works | about | cv | syllabi | collaborations
 */
export function renderArtFooter(current = "syllabi") {
  const year = new Date().getFullYear();
  const siteLinks = [
    { href: `${ART_ORIGIN}/works`, label: "Works", id: "works" },
    { href: `${ART_ORIGIN}/about`, label: "About", id: "about" },
    { href: `${ART_ORIGIN}/cv`, label: "CV", id: "cv" },
    { href: "/", label: "Syllabi", id: "syllabi" },
    { href: `${ART_ORIGIN}/collaborations`, label: "Collaborations", id: "collaborations" },
  ];
  const socialLinks = [
    { href: "https://www.linkedin.com/in/adamsimms", label: "LinkedIn" },
    { href: "https://www.concordia.ca/faculty/adam-simms.html", label: "Teaching" },
    { href: "https://github.com/adamsimms", label: "GitHub" },
  ];

  const tags = siteLinks
    .map((link) => {
      const currentAttr = link.id === current ? ' aria-current="page"' : "";
      return `<li><a href="${link.href}"${currentAttr}>${link.label}</a></li>`;
    })
    .join("");

  const social = socialLinks
    .map((link, index) => {
      const sep =
        index > 0
          ? `<span class="site-footer__social-sep" aria-hidden="true">·</span>`
          : "";
      return `${sep}<a href="${link.href}" target="_blank" rel="noopener noreferrer">${link.label}</a>`;
    })
    .join("");

  return `<footer class="site-footer">
  <a class="site-footer__hero" href="${ART_ORIGIN}/" aria-label="Home">
    ${berryMarkSvg()}
  </a>
  <div class="site-footer__identity">
    <p class="site-footer__bio">
      Adam Simms is a Canadian media artist.<br>His work focuses on belonging, displacement, and intangible culture.
    </p>
    <a class="site-footer__mailto" data-email-mailto href="#">Email</a>
    <nav aria-label="Links">
      <ul class="site-footer__tags">${tags}</ul>
    </nav>
  </div>
  <div class="site-footer__bottom">
    <p class="site-footer__weather" data-pinchard-weather>
      <span data-weather-label>Pinchard’s Island</span>
      <span data-weather-meta>—</span>
    </p>
    <div class="site-footer__meta">
      <nav class="site-footer__social" aria-label="Social">${social}</nav>
      <span class="site-footer__social-sep" aria-hidden="true">·</span>
      <p class="site-footer__copy">© ${year}</p>
    </div>
  </div>
</footer>${ART_FOOTER_SCRIPT}`;
}
