import { renderCourseFile } from "../lib/markdown.js";

export const data = {
  layout: "layout.njk",
  permalink: "assignments.html",
  title: "Assignments",
  page: { file: "assignments.md" },
  pageContent: renderCourseFile("assignments.md"),
};
