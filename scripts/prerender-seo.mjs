import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getAllSeoRoutes, getPageSeo, renderSeoHead, seoSite } from "../src/data/seo.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");
const distIndexPath = path.join(distDir, "index.html");
const distSsrDir = path.join(projectRoot, "dist-ssr");
const serverEntryPath = path.join(distSsrDir, "entry-server.js");
const today = new Date().toISOString().slice(0, 10);

const template = await readFile(distIndexPath, "utf8");
const { render } = await import(pathToFileUrl(serverEntryPath));

for (const route of getAllSeoRoutes()) {
  const outputPath = route === "/" ? distIndexPath : path.join(distDir, route.slice(1), "index.html");
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, withSeo(template, getPageSeo(route), render(route)), "utf8");
}

await writeFile(path.join(distDir, "404.html"), withSeo(template, getPageSeo("/404"), render("/404")), "utf8");
await writeFile(path.join(distDir, "projects", "index.html"), buildRedirectPage(template), "utf8");
await writeFile(path.join(distDir, "sitemap.xml"), buildSitemap(), "utf8");
await writeFile(path.join(distDir, "robots.txt"), buildRobots(), "utf8");
await writeFile(path.join(distDir, "site.webmanifest"), buildManifest(), "utf8");

function withSeo(html, meta, appHtml) {
  return html
    .replace(
    /<!-- SEO_HEAD_START -->[\s\S]*?<!-- SEO_HEAD_END -->/,
    `<!-- SEO_HEAD_START -->\n      ${renderSeoHead(meta)}\n      <!-- SEO_HEAD_END -->`,
    )
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

function buildRedirectPage(html) {
  const redirectMeta = getPageSeo("/projects");
  const enhanced = withSeo(html, redirectMeta, "");

  return enhanced.replace(
    "</head>",
    `      <meta http-equiv="refresh" content="0; url=/public-service" />\n    </head>`,
  );
}

function pathToFileUrl(filePath) {
  const normalized = path.resolve(filePath).replace(/\\/g, "/");
  return `file://${normalized}`;
}

function buildSitemap() {
  const urls = getAllSeoRoutes()
    .map((route) => getPageSeo(route))
    .filter((meta) => !meta.robots.startsWith("noindex"))
    .map(
      (meta) => `  <url>
    <loc>${meta.canonicalUrl}</loc>
    <lastmod>${today}</lastmod>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function buildRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${seoSite.siteUrl}/sitemap.xml
`;
}

function buildManifest() {
  return JSON.stringify(
    {
      name: seoSite.siteName,
      short_name: "Kefas4Plateau",
      description: "Public service record, priorities, projects, and updates for Plateau State.",
      start_url: "/",
      scope: "/",
      display: "standalone",
      background_color: "#f5f3ee",
      theme_color: seoSite.defaultThemeColor,
      icons: [
        {
          src: "/icon-192.png",
          type: "image/png",
          sizes: "192x192",
          purpose: "any",
        },
        {
          src: "/icon-512.png",
          type: "image/png",
          sizes: "512x512",
          purpose: "any",
        },
      ],
    },
    null,
    2,
  );
}
