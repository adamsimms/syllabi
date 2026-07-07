export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addGlobalData("courseTitle", "As Seen on Screens: Cyberspace & Image Economy");

  return {
    dir: {
      input: "pages",
      output: "_site",
      includes: "../_includes",
      layouts: "../_includes",
    },
    htmlTemplateEngine: "njk",
  };
}
