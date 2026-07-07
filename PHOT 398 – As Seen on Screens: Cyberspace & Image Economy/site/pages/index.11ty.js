import { renderCourseFile } from "../lib/markdown.js";

export const data = {
  layout: "layout.njk",
  permalink: "index.html",
  title: "Overview",
  page: { file: "README.md" },
  pageContent: renderCourseFile("README.md"),
};
