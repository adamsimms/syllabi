import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import MarkdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const courseDir = path.resolve(__dirname, "../..");

const md = new MarkdownIt({ html: true, linkify: true }).use(markdownItAnchor, {
  slugify: (s) =>
    s
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-"),
});

export function stripRepoNav(content) {
  return content.replace(
    /^\[Syllabus\]\(README\.md\)[^\n]*\n\n---\n\n/m,
    ""
  );
}

export function rewriteMdLinks(html) {
  return html
    .replace(/href="([^"]+)\.md(#[^"]*)?"/g, (_, file, hash) => {
      const map = {
        "README.md": "index.html",
        "assignments.md": "assignments.html",
        "schedule.md": "schedule.html",
        "resources.md": "resources.html",
      };
      const target = map[file] || file.replace(/\.md$/, ".html");
      return `href="${target}${hash || ""}"`;
    })
    .replace(/href="README\.md"/g, 'href="index.html"');
}

export function renderCourseFile(filename) {
  const raw = fs.readFileSync(path.join(courseDir, filename), "utf8");
  const withoutNav = stripRepoNav(raw);
  return rewriteMdLinks(md.render(withoutNav));
}
