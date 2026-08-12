import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SITE_ORIGIN } from "./course-seo.mjs";
import { syncHugoLayouts } from "./sync-hugo-layouts.mjs";
import {
  buildUmamiScriptTag,
  buildHeadersBlock,
  loadAnalyticsConfig,
  writeAnalyticsPartial,
} from "./analytics.mjs";
import {
  HUB_TITLE,
  HUB_HEADING,
  HUB_DESCRIPTION,
  HUB_URL,
  HUB_OG_IMAGE,
  HUB_OG_IMAGE_ALT,
  HUB_OG_IMAGE_WIDTH,
  HUB_OG_IMAGE_HEIGHT,
  HUB_THEME_COLOR,
  HUB_SITE_NAME,
  INSTRUCTOR_NAME,
  hubJsonLd,
} from "./hub-seo.mjs";
import {
  FONT_FACE_CSS,
  ROOT_VARS_CSS,
  ART_NAV_CSS,
  ART_FOOTER_CSS,
  renderArtNav,
  renderArtFooter,
} from "./site-chrome.mjs";
import {
  loadTalks,
  writeTalkPages,
  talkRedirects,
  talkSitemapUrls,
} from "./talks.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(rootDir, "dist");
const hugoBinDir = path.join(rootDir, "node_modules", ".bin");
const courses = JSON.parse(fs.readFileSync(path.join(rootDir, "courses.json"), "utf8"));
const talks = loadTalks();
const analyticsConfig = loadAnalyticsConfig(rootDir);

writeAnalyticsPartial(rootDir, analyticsConfig);
if (!analyticsConfig.umamiWebsiteId) {
  console.warn("Umami analytics skipped: set umamiWebsiteId in analytics.config.json or UMAMI_WEBSITE_ID");
}

const HUB_ASSETS_DIR = path.join(rootDir, "assets/hub");

function run(command, cwd) {
  execSync(command, {
    cwd,
    stdio: "inherit",
    env: {
      ...process.env,
      PATH: `${hugoBinDir}${path.delimiter}${process.env.PATH ?? ""}`,
    },
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function writeHubAssets() {
  const imagesDir = path.join(distDir, "images");
  const fontsDir = path.join(distDir, "fonts");
  fs.mkdirSync(imagesDir, { recursive: true });
  fs.mkdirSync(fontsDir, { recursive: true });

  for (const entry of fs.readdirSync(HUB_ASSETS_DIR, { withFileTypes: true })) {
    const sourcePath = path.join(HUB_ASSETS_DIR, entry.name);
    if (entry.isDirectory() && entry.name === "fonts") {
      for (const font of fs.readdirSync(sourcePath)) {
        fs.copyFileSync(path.join(sourcePath, font), path.join(fontsDir, font));
      }
      continue;
    }
    if (!entry.isFile()) continue;
    if (entry.name === "favicon.svg") {
      fs.copyFileSync(sourcePath, path.join(distDir, "favicon.svg"));
      continue;
    }
    fs.copyFileSync(sourcePath, path.join(imagesDir, entry.name));
  }
}

function writeCoursesIndex() {
  const items = courses
    .map(
      (course) => `<li>
  <a class="course-link" href="/${course.slug}/">
    <span class="code">${escapeHtml(course.code)}</span>
    <span class="title">${escapeHtml(course.title)}</span>
  </a>
</li>`
    )
    .join("\n");

  const jsonLd = hubJsonLd(courses);

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(HUB_TITLE)}</title>
  <meta name="description" content="${escapeHtml(HUB_DESCRIPTION)}">
  <meta name="author" content="${escapeHtml(INSTRUCTOR_NAME)}">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="${HUB_THEME_COLOR}">
  <meta name="color-scheme" content="light">
  <link rel="canonical" href="${HUB_URL}">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/images/og-square.jpg">
  <meta property="og:title" content="${escapeHtml(HUB_TITLE)}">
  <meta property="og:description" content="${escapeHtml(HUB_DESCRIPTION)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${HUB_URL}">
  <meta property="og:site_name" content="${escapeHtml(HUB_SITE_NAME)}">
  <meta property="og:locale" content="en">
  <meta property="og:image" content="${HUB_OG_IMAGE}">
  <meta property="og:image:width" content="${HUB_OG_IMAGE_WIDTH}">
  <meta property="og:image:height" content="${HUB_OG_IMAGE_HEIGHT}">
  <meta property="og:image:alt" content="${escapeHtml(HUB_OG_IMAGE_ALT)}">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${escapeHtml(HUB_TITLE)}">
  <meta name="twitter:description" content="${escapeHtml(HUB_DESCRIPTION)}">
  <meta name="twitter:image" content="${HUB_OG_IMAGE}">
  <meta name="twitter:image:alt" content="${escapeHtml(HUB_OG_IMAGE_ALT)}">
  ${buildUmamiScriptTag(analyticsConfig)}
  <script type="application/ld+json">
  ${JSON.stringify(jsonLd, null, 2)}
  </script>
  <style>
${FONT_FACE_CSS}
${ROOT_VARS_CSS}

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
      line-height: 1.55;
      color: var(--text);
      background: var(--bg);
    }

    main {
      box-sizing: border-box;
      width: 100%;
      min-height: calc(100dvh - 5rem);
      margin: 0;
      padding: 0 var(--page-inset) var(--page-inset);
      display: flex;
      flex-direction: column;
    }
${ART_NAV_CSS}

    h1 {
      margin: 0 0 clamp(2.5rem, 8vh, 5rem);
      font-family: var(--font-body);
      font-size: var(--type-display);
      font-style: normal;
      font-weight: 560;
      font-synthesis: none;
      letter-spacing: -0.03em;
      line-height: 1.05;
    }

    .courses {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .courses li + li {
      border-top: 1px solid var(--border);
    }

    .courses li:last-child {
      border-bottom: 1px solid var(--border);
    }

    .course-link {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      padding: clamp(1.1rem, 2.2vw, 1.5rem) 0;
      color: inherit;
      text-decoration: none;
      border: none;
    }

    .course-link .code {
      font-family: var(--font-body);
      font-size: var(--type-caption);
      font-weight: 500;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--muted);
    }

    .course-link .title {
      font-family: var(--font-body);
      font-size: clamp(1.45rem, 1.15rem + 1.2vw, 2.15rem);
      font-style: normal;
      font-weight: 560;
      font-synthesis: none;
      letter-spacing: -0.025em;
      line-height: 1.15;
      color: var(--text);
      transition: color 0.15s ease;
    }

    .course-link:hover .title,
    .course-link:focus-visible .title {
      color: var(--link);
    }

    @media (max-width: 720px) {
      .course-link .title {
        font-size: clamp(1.25rem, 4.8vw, 1.55rem);
        text-decoration: underline;
        text-decoration-color: color-mix(in srgb, var(--text) 28%, transparent);
        text-decoration-thickness: 1px;
        text-underline-offset: 0.18em;
      }
    }

    @media (hover: hover) and (pointer: fine) {
      .course-link .title {
        text-decoration: none;
      }
    }
${ART_FOOTER_CSS}
  </style>
</head>
<body>
${renderArtNav()}
  <main>
    <h1>${escapeHtml(HUB_HEADING)}</h1>
    <ul class="courses">
${items}
    </ul>
  </main>
${renderArtFooter("syllabi")}
</body>
</html>`;

  fs.writeFileSync(path.join(distDir, "index.html"), html);
}

function writeHeaders() {
  fs.writeFileSync(path.join(distDir, "_headers"), buildHeadersBlock());
}

function writeRedirects() {
  const rules = courses.flatMap((course) => [
    `/${course.slug}/ /${course.slug}/index.html 200`,
    `/${course.slug} /${course.slug}/index.html 200`,
  ]);

  // Readings live on the schedule; keep old /readings/ URLs working.
  rules.push("/phot331/readings /phot331/course/schedule/ 301");
  rules.push("/phot331/readings/ /phot331/course/schedule/ 301");
  rules.push("/phot332/readings /phot332/course/schedule/ 301");
  rules.push("/phot332/readings/ /phot332/course/schedule/ 301");
  rules.push("/phot398/readings /phot398/course/schedule/ 301");
  rules.push("/phot398/readings/ /phot398/course/schedule/ 301");
  rules.push("/phot400/readings /phot400/course/schedule/ 301");
  rules.push("/phot400/readings/ /phot400/course/schedule/ 301");

  // phot400 Class Participation page removed.
  rules.push("/phot400/assignments/class-participation /phot400/assignments/ 301");
  rules.push("/phot400/assignments/class-participation/ /phot400/assignments/ 301");

  // Delivery page removed for selected courses.
  rules.push("/phot331/course/delivery /phot331/course/overview/ 301");
  rules.push("/phot331/course/delivery/ /phot331/course/overview/ 301");
  rules.push("/phot300/course/delivery /phot300/course/overview/ 301");
  rules.push("/phot300/course/delivery/ /phot300/course/overview/ 301");
  rules.push("/phot332/course/delivery /phot332/course/overview/ 301");
  rules.push("/phot332/course/delivery/ /phot332/course/overview/ 301");
  rules.push("/phot398/course/delivery /phot398/course/overview/ 301");
  rules.push("/phot398/course/delivery/ /phot398/course/overview/ 301");

  // General Info pages removed across all courses.
  for (const course of courses) {
    rules.push(`/${course.slug}/general /${course.slug}/course/overview/ 301`);
    rules.push(`/${course.slug}/general/ /${course.slug}/course/overview/ 301`);
    rules.push(`/${course.slug}/general/faculty-of-fine-arts /${course.slug}/course/overview/ 301`);
    rules.push(`/${course.slug}/general/faculty-of-fine-arts/ /${course.slug}/course/overview/ 301`);
    rules.push(`/${course.slug}/general/photography-program /${course.slug}/course/overview/ 301`);
    rules.push(`/${course.slug}/general/photography-program/ /${course.slug}/course/overview/ 301`);
  }

  // Appointments moved under Course.
  for (const course of courses) {
    rules.push(`/${course.slug}/appointments /${course.slug}/course/appointments/ 301`);
    rules.push(`/${course.slug}/appointments/ /${course.slug}/course/appointments/ 301`);
  }

  rules.push(...talkRedirects(talks));

  fs.writeFileSync(path.join(distDir, "_redirects"), `${rules.join("\n")}\n`);
}

function writeRobotsTxt() {
  const body = `User-agent: *
Allow: /

Sitemap: ${SITE_ORIGIN}/sitemap.xml
`;
  fs.writeFileSync(path.join(distDir, "robots.txt"), body);
}

function writeSitemapIndex() {
  const today = new Date().toISOString().slice(0, 10);
  const entries = [
    `<sitemap><loc>${SITE_ORIGIN}/hub-sitemap.xml</loc><lastmod>${today}</lastmod></sitemap>`,
    ...courses.map(
      (course) =>
        `<sitemap><loc>${SITE_ORIGIN}/${course.slug}/sitemap.xml</loc><lastmod>${today}</lastmod></sitemap>`
    ),
  ];

  const index = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</sitemapindex>
`;
  fs.writeFileSync(path.join(distDir, "sitemap.xml"), index);

  const hubUrls = [
    `<url><loc>${HUB_URL}</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>`,
    ...courses.map(
      (course) =>
        `<url><loc>${SITE_ORIGIN}/${course.slug}/</loc><changefreq>monthly</changefreq><priority>0.9</priority></url>`
    ),
    ...talkSitemapUrls(talks),
  ];

  const hubSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${hubUrls.join("\n")}
</urlset>
`;
  fs.writeFileSync(path.join(distDir, "hub-sitemap.xml"), hubSitemap);
}

function pruneOversizedFiles(dir, maxBytes = 24 * 1024 * 1024) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      pruneOversizedFiles(entryPath, maxBytes);
      continue;
    }

    if (fs.statSync(entryPath).size > maxBytes) {
      console.warn(`Removing ${path.relative(distDir, entryPath)} from deploy output (>24 MiB)`);
      fs.rmSync(entryPath);
    }
  }
}

if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

for (const course of courses) {
  const sitePath = path.join(rootDir, course.siteDir);
  if (!fs.existsSync(sitePath)) {
    throw new Error(`Missing site directory: ${course.siteDir}`);
  }

  syncHugoLayouts(sitePath);

  console.log(`Building ${course.code} → /${course.slug}/`);
  const output = path.join(sitePath, "_site");
  // Hugo does not remove pages deleted from content; wipe publishDir first.
  if (fs.existsSync(output)) {
    fs.rmSync(output, { recursive: true, force: true });
  }
  run("npm run build", sitePath);

  const destination = path.join(distDir, course.slug);
  fs.cpSync(output, destination, { recursive: true });
}

writeHubAssets();
writeCoursesIndex();
writeTalkPages(distDir, analyticsConfig, talks);
writeRedirects();
writeHeaders();
writeRobotsTxt();
writeSitemapIndex();
pruneOversizedFiles(distDir);

console.log(
  `\nBuilt ${courses.length} course sites and ${talks.length} talk page(s) in ${distDir}`
);
