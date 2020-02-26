const path = require("path");
const sitemapGenerator = require("nextjs-sitemap-generator");

const baseUrl = "https://www.dithmarschenhanf.de";

sitemapGenerator({
  baseUrl,
  pagesDirectory: path.join(__dirname, "pages"),
  targetDirectory: "public/"
});
