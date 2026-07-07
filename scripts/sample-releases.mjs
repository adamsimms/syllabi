import path from "node:path";

/**
 * Large sample archives live on GitHub Releases instead of Git LFS so
 * Cloudflare Pages clones stay fast. Keys are course folder names.
 */
const RELEASES = {
  "PHOT 332 – Digital Photography II": {
    tag: "phot332-winter-2025-samples",
    baseUrl: "https://github.com/adamsimms/syllabi/releases/download/phot332-winter-2025-samples",
    files: new Set([
      "samples/example-raw-files.zip",
      "samples/week-03-sample-images.zip",
      "samples/week-04-sample-images.zip",
      "samples/week-05-sample-images.zip",
    ]),
  },
};

export function externalAssetUrl(courseFolder, assetPath) {
  const release = RELEASES[courseFolder];
  if (!release?.files.has(assetPath)) {
    return null;
  }
  return `${release.baseUrl}/${path.basename(assetPath)}`;
}

export function listExternalAssets(courseFolder) {
  const release = RELEASES[courseFolder];
  return release ? [...release.files] : [];
}
