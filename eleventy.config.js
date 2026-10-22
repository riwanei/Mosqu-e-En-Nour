// Configuration Eleventy du site de la mosquée En-Nour.
const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

export default function (eleventyConfig) {
  eleventyConfig.addFilter("head", (arr, n) => (Array.isArray(arr) ? arr.slice(0, n) : []));
  eleventyConfig.addGlobalData("annee", () => new Date().getFullYear());
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.ignores.add("src/admin/**");
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({
    "node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-500-normal.woff2": "assets/fonts/cormorant-500.woff2",
    "node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff2": "assets/fonts/cormorant-600.woff2",
    "node_modules/@fontsource-variable/source-sans-3/files/source-sans-3-latin-wght-normal.woff2": "assets/fonts/source-sans-3.woff2",
  });

  // Date lisible en français : « 21 octobre 2026 ».
  eleventyConfig.addFilter("dateFr", (value) => {
    const d = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    return `${d.getUTCDate()} ${MOIS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  });
  eleventyConfig.addFilter("dateIso", (value) => {
    const d = value instanceof Date ? value : new Date(value);
    return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
  });
  eleventyConfig.addFilter("telHref", (tel) => "tel:" + String(tel || "").replace(/[^+\d]/g, ""));
  eleventyConfig.addFilter("absoluteUrl", (path, base) => new URL(path, base).href);

  // Actualités publiées, de la plus récente à la plus ancienne. Les brouillons ne sont pas publiés.
  eleventyConfig.addCollection("actualites", (api) =>
    api.getFilteredByGlob("src/actualites/*.md")
      .filter((item) => !item.data.brouillon)
      .sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addPreprocessor("brouillons", "md", (data) => {
    if (data.brouillon && process.env.ELEVENTY_RUN_MODE === "build") return false;
  });

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
