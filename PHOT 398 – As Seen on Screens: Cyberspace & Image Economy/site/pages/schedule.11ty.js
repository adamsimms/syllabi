import { renderCourseFile } from "../lib/markdown.js";

export const data = {
  layout: "layout.njk",
  permalink: "schedule.html",
  title: "Schedule",
  page: { file: "schedule.md" },
  pageContent: renderCourseFile("schedule.md"),
};
