import { renderCourseFile } from "../lib/markdown.js";

export const data = {
  layout: "layout.njk",
  permalink: "resources.html",
  title: "Resources",
  page: { file: "resources.md" },
  pageContent: renderCourseFile("resources.md"),
};
