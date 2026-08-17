import fs from "node:fs";
import path from "node:path";

export const UMAMI_SCRIPT_URL = "https://cloud.umami.is/script.js";
export const UMAMI_DOMAINS = "adamsimms.xyz,syllabi.adamsimms.xyz";
export const UMAMI_CONNECT_SRC =
  "https://cloud.umami.is https://gateway.umami.is https://api-gateway.umami.dev";
export const GHOSTPANE_SCRIPT_URL = "https://analytics.adamsimms.xyz/gp.js";

export function loadAnalyticsConfig(rootDir) {
  const configPath = path.join(rootDir, "analytics.config.json");
  const defaults = {
    umamiWebsiteId: "",
    umamiScriptUrl: UMAMI_SCRIPT_URL,
    domains: UMAMI_DOMAINS,
    ghostpaneSiteId: "",
    ghostpaneScriptUrl: GHOSTPANE_SCRIPT_URL,
  };

  let file = defaults;
  if (fs.existsSync(configPath)) {
    file = { ...defaults, ...JSON.parse(fs.readFileSync(configPath, "utf8")) };
  }

  return {
    umamiWebsiteId: process.env.UMAMI_WEBSITE_ID || file.umamiWebsiteId || "",
    umamiScriptUrl: file.umamiScriptUrl || UMAMI_SCRIPT_URL,
    domains: file.domains || UMAMI_DOMAINS,
    ghostpaneSiteId: process.env.GHOSTPANE_SITE_ID || file.ghostpaneSiteId || "",
    ghostpaneScriptUrl: file.ghostpaneScriptUrl || GHOSTPANE_SCRIPT_URL,
  };
}

export function buildUmamiScriptTag(config) {
  if (!config.umamiWebsiteId) {
    return "";
  }

  return `<script defer src="${config.umamiScriptUrl}" data-website-id="${config.umamiWebsiteId}" data-domains="${config.domains}" data-do-not-track="true"></script>`;
}

export function buildGhostpaneScripts(config) {
  if (!config.ghostpaneSiteId) {
    return "";
  }

  const stub =
    '<script>window.ghostpane=window.ghostpane||function(){(window.ghostpane.q=window.ghostpane.q||[]).push(arguments)}</script>';
  const tag = `<script defer data-site="${config.ghostpaneSiteId}" data-outbound data-vitals data-video src="${config.ghostpaneScriptUrl}"></script>`;
  return `${stub}\n${tag}`;
}

export function writeAnalyticsPartial(rootDir, config) {
  const partialPath = path.join(rootDir, "templates/hugo-layouts/partials/analytics.html");
  const umami = buildUmamiScriptTag(config);
  const ghostpane = buildGhostpaneScripts(config);
  const parts = [umami, ghostpane].filter(Boolean);
  const content = parts.length
    ? `${parts.join("\n")}\n`
    : "{{/* Analytics: set website IDs in analytics.config.json */}}\n";

  fs.mkdirSync(path.dirname(partialPath), { recursive: true });
  fs.writeFileSync(partialPath, content);
}

export function buildHeadersBlock() {
  return `/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cloud.umami.is https://analytics.adamsimms.xyz; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data: https:; connect-src 'self' https://cloud.umami.is https://gateway.umami.is https://api-gateway.umami.dev https://analytics.adamsimms.xyz; media-src 'self'; worker-src 'self'
`;
}
