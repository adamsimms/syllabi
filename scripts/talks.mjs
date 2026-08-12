import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SITE_ORIGIN } from "./course-seo.mjs";
import { buildUmamiScriptTag } from "./analytics.mjs";
import {
  HUB_SITE_NAME,
  HUB_THEME_COLOR,
  HUB_OG_IMAGE,
  HUB_OG_IMAGE_PATH,
  HUB_OG_IMAGE_WIDTH,
  HUB_OG_IMAGE_HEIGHT,
  INSTRUCTOR_NAME,
  INSTRUCTOR_URL,
} from "./hub-seo.mjs";
import {
  FONT_FACE_CSS,
  ROOT_VARS_CSS,
  ART_NAV_CSS,
  ART_FOOTER_CSS,
  renderArtNav,
  renderArtFooter,
} from "./site-chrome.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export function loadTalks() {
  const file = path.join(rootDir, "talks.json");
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

// Minimal inline emphasis: *text* -> <em>text</em> (escapes first).
function renderInline(value) {
  return escapeHtml(value).replace(/\*(.+?)\*/g, "<em>$1</em>");
}

function talkMetaLine(talk) {
  const parts = [talk.venue, talk.date].filter(Boolean);
  return parts.map((part) => escapeHtml(part)).join(" · ");
}

// Extra CSS injected into the hub index <style> so the Talks section matches.
export const TALKS_HUB_CSS = `
    .section-heading {
      margin: clamp(3rem, 8vw, 5rem) 0 1.25rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--border);
      font-family: var(--font-body);
      font-size: var(--type-caption);
      font-weight: 500;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--muted);
    }

    .talks {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .talk-card {
      display: block;
      padding: 0.85rem 0;
      color: inherit;
      text-decoration: none;
      border: none;
    }

    .talk-card + .talk-card,
    .talks li + li .talk-card {
      border-top: 1px solid var(--border);
    }

    .talk-card .meta {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem 0.65rem;
      margin-bottom: 0.2rem;
      font-size: var(--type-caption);
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--muted);
    }

    .talk-card .title {
      font-family: var(--font-display);
      font-size: var(--type-title);
      font-weight: 520;
      letter-spacing: -0.02em;
      line-height: 1.2;
      color: var(--text);
      transition: color 0.15s ease;
    }

    .talk-card:hover .title,
    .talk-card:focus-visible .title {
      color: var(--link);
    }`;

export function renderTalksSection(talks) {
  if (!talks?.length) return "";
  const items = talks
    .map((talk) => {
      const kind = talk.kind || "Talk";
      return `<li>
  <a class="talk-card" href="/talks/${talk.slug}/">
    <span class="meta">
      <span class="code">${escapeHtml(kind)}</span>
      <span class="term">${talkMetaLine(talk)}</span>
    </span>
    <span class="title">${escapeHtml(talk.title)}</span>
  </a>
</li>`;
    })
    .join("\n");

  return `
      <h2 class="section-heading">Talks</h2>
      <ul class="talks">
${items}
      </ul>`;
}

export function talkRedirects(talks) {
  return talks.flatMap((talk) => [
    `/talks/${talk.slug}/ /talks/${talk.slug}/index.html 200`,
    `/talks/${talk.slug} /talks/${talk.slug}/index.html 200`,
  ]);
}

export function talkSitemapUrls(talks) {
  return talks.map(
    (talk) =>
      `<url><loc>${SITE_ORIGIN}/talks/${talk.slug}/</loc><changefreq>yearly</changefreq><priority>0.6</priority></url>`
  );
}

function talkJsonLd(talk) {
  const node = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: talk.title,
    description: talk.description,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: talk.venue,
      ...(talk.venueUrl ? { url: talk.venueUrl } : {}),
    },
    performer: { "@type": "Person", name: INSTRUCTOR_NAME, url: INSTRUCTOR_URL },
    organizer: {
      "@type": "Organization",
      name: talk.venue,
      ...(talk.venueUrl ? { url: talk.venueUrl } : {}),
    },
    url: `${SITE_ORIGIN}/talks/${talk.slug}/`,
    ...(talk.tags?.length ? { keywords: talk.tags.join(", ") } : {}),
  };
  return node;
}

function metaRow(label, value) {
  if (!value) return "";
  return `      <div class="meta-row"><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`;
}

function renderTalkPage(talk, analyticsConfig) {
  const pageUrl = `${SITE_ORIGIN}/talks/${talk.slug}/`;
  const ogImage = talk.ogImage ? `${SITE_ORIGIN}${talk.ogImage}` : HUB_OG_IMAGE;
  const title = `${talk.title} — ${talk.kind || "Talk"} — Adam Simms`;

  const summary = (talk.summary || [])
    .map((para) => `        <p>${renderInline(para)}</p>`)
    .join("\n");

  const courseLine = talk.courseNote
    ? `${talk.course} (${talk.courseNote})`
    : talk.course;

  const metaRows = [
    metaRow("Venue", talk.venue),
    metaRow("Context", courseLine),
    metaRow("Date", talk.date),
    metaRow("Format", talk.format),
    metaRow("Audience", talk.audience),
  ]
    .filter(Boolean)
    .join("\n");

  const resourceLinks = [];
  if (talk.slidesUrl) {
    resourceLinks.push(
      `<li><a href="${escapeHtml(talk.slidesUrl)}" rel="noopener">Slides (Figma)</a></li>`
    );
  }
  for (const resource of talk.resources || []) {
    resourceLinks.push(
      `<li><a href="${escapeHtml(resource.url)}" rel="noopener">${escapeHtml(resource.label)}</a></li>`
    );
  }
  if (talk.relatedCourse) {
    resourceLinks.push(
      `<li><a href="/${talk.relatedCourse.slug}/">${escapeHtml(
        `${talk.relatedCourse.code} — ${talk.relatedCourse.title}`
      )}</a> (related course)</li>`
    );
  }
  if (talk.sourceUrl) {
    resourceLinks.push(
      `<li><a href="${escapeHtml(talk.sourceUrl)}" rel="noopener">Notes &amp; handouts on GitHub</a></li>`
    );
  }

  const resourcesSection = resourceLinks.length
    ? `
      <h2 class="section-heading">Materials</h2>
      <ul class="resource-list">
        ${resourceLinks.join("\n        ")}
      </ul>`
    : "";

  const kicker = [talk.kind, talk.venue].filter(Boolean).map(escapeHtml).join(" · ");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(talk.description)}">
  <meta name="author" content="${escapeHtml(INSTRUCTOR_NAME)}">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="${HUB_THEME_COLOR}">
  <meta name="color-scheme" content="light">
  <link rel="canonical" href="${pageUrl}">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="${HUB_OG_IMAGE_PATH}">
  <meta property="og:title" content="${escapeHtml(talk.title)}">
  <meta property="og:description" content="${escapeHtml(talk.description)}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:site_name" content="${escapeHtml(HUB_SITE_NAME)}">
  <meta property="og:locale" content="en">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="${HUB_OG_IMAGE_WIDTH}">
  <meta property="og:image:height" content="${HUB_OG_IMAGE_HEIGHT}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${escapeHtml(talk.title)}">
  <meta name="twitter:description" content="${escapeHtml(talk.description)}">
  <meta name="twitter:image" content="${ogImage}">
  ${buildUmamiScriptTag(analyticsConfig)}
  <script type="application/ld+json">
  ${JSON.stringify(talkJsonLd(talk), null, 2)}
  </script>
  <style>
${FONT_FACE_CSS}
${ROOT_VARS_CSS}
${ART_NAV_CSS}
${ART_FOOTER_CSS}

    * { box-sizing: border-box; }

    html {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      height: 100%;
    }

    body {
      margin: 0;
      min-height: 100%;
      min-height: 100dvh;
      padding: 0;
      font-family: var(--font-body);
      font-size: var(--type-body);
      line-height: 1.65;
      color: var(--text);
      background: var(--bg);
    }

    main {
      box-sizing: border-box;
      width: 100%;
      margin: 0;
      padding: 0 var(--page-inset) var(--page-inset);
    }

    .talk {
      max-width: 38rem;
    }

    .talk a {
      color: var(--text);
      text-decoration: none;
      border-bottom: 1px solid color-mix(in srgb, var(--text) 22%, transparent);
      transition: color 0.15s ease, border-bottom-color 0.15s ease;
    }

    .talk a:hover, .talk a:focus-visible {
      color: var(--link);
      border-bottom-color: var(--link);
    }

    .kicker {
      margin: 0 0 0.5rem;
      font-size: var(--type-caption);
      font-weight: 500;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--muted);
    }

    h1 {
      margin: 0 0 0.85rem;
      font-family: var(--font-body);
      font-size: 1.85rem;
      font-style: normal;
      font-weight: 700;
      font-synthesis: none;
      letter-spacing: -0.03em;
      line-height: 1.15;
    }

    .lede {
      margin: 0 0 2rem;
      color: var(--muted);
    }

    .talk-meta {
      margin: 0 0 2rem;
      padding: 0;
      display: grid;
      gap: 0.55rem;
    }

    .meta-row {
      display: grid;
      grid-template-columns: 6.5rem minmax(0, 1fr);
      gap: 0.5rem 1rem;
      padding-bottom: 0.55rem;
      border-bottom: 1px solid var(--border);
    }

    .meta-row dt {
      font-size: var(--type-caption);
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--muted);
      padding-top: 0.15rem;
    }

    .meta-row dd { margin: 0; }

    .talk-summary p { margin: 0 0 1rem; }
    .talk-summary p:last-child { margin-bottom: 0; }

    .section-heading {
      margin: 2.75rem 0 1rem;
      padding-top: 2rem;
      border-top: 1px solid var(--border);
      font-family: var(--font-body);
      font-size: var(--type-caption);
      font-weight: 500;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--muted);
    }

    .resource-list { margin: 0; padding: 0; list-style: none; }
    .resource-list li { padding: 0.5rem 0; border-top: 1px solid var(--border); }
    .resource-list li:first-child { border-top: none; }

    .back {
      margin: 2.5rem 0 0;
      font-size: 0.85rem;
    }

    .back a {
      color: var(--muted);
      border-bottom: none;
    }

    .back a:hover, .back a:focus-visible { color: var(--text); }

    @media (max-width: 720px) {
      .meta-row { grid-template-columns: 1fr; gap: 0.15rem; }
    }
  </style>
</head>
<body>
${renderArtNav()}
  <main>
    <article class="talk">
      <p class="kicker">${kicker}</p>
      <h1>${escapeHtml(talk.title)}</h1>
      <p class="lede">${escapeHtml(talk.description)}</p>
      <dl class="talk-meta">
${metaRows}
      </dl>
      <div class="talk-summary">
${summary}
      </div>
      ${resourcesSection}
      <p class="back"><a href="/">&larr; All courses</a></p>
    </article>
  </main>
${renderArtFooter("syllabi")}
</body>
</html>`;
}

export function writeTalkPages(distDir, analyticsConfig, talks = loadTalks()) {
  for (const talk of talks) {
    const dir = path.join(distDir, "talks", talk.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), renderTalkPage(talk, analyticsConfig));
  }
  return talks.length;
}
