import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getAllSeoRoutes, getPageSeo } from "../src/data/seo.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");

const failures = [];
const routes = getAllSeoRoutes();
const sitemap = await readText("sitemap.xml");

for (const route of routes) {
  const meta = getPageSeo(route);
  const html = await readText(routeToFile(route));
  const rootMarkup = extractRootMarkup(html);
  const titleText = decodeHtmlEntities(extractMatch(html, /<title>([\s\S]*?)<\/title>/));
  const descriptionText = decodeHtmlEntities(
    extractMatch(html, /<meta[^>]+name="description"[^>]+content="([^"]*)"/),
  );
  const canonicalHref = decodeHtmlEntities(
    extractMatch(html, /<link[^>]+rel="canonical"[^>]+href="([^"]*)"/),
  );

  assert(titleText === meta.title, `Missing route title for ${route}`);
  assert(descriptionText === meta.description, `Missing description for ${route}`);
  assert(canonicalHref === meta.canonicalUrl, `Missing canonical for ${route}`);
  assert(html.includes('type="application/ld+json"'), `Missing JSON-LD for ${route}`);
  assert(rootMarkup.trim().length > 0, `Missing prerendered body content for ${route}`);
  assert(
    /<(main|section|article|header|footer)\b/.test(rootMarkup),
    `Prerendered body content is empty for ${route}`,
  );

  if (!meta.robots.startsWith("noindex")) {
    assert(sitemap.includes(`<loc>${meta.canonicalUrl}</loc>`), `Sitemap missing ${route}`);
  }
}

const robots = await readText("robots.txt");
assert(robots.includes("Sitemap: https://kefas4plateau.com/sitemap.xml"), "robots.txt sitemap entry is missing");

const redirectHtml = await readText("projects/index.html");
assert(redirectHtml.includes('http-equiv="refresh" content="0; url=/public-service"'), "Projects redirect page is missing");

if (failures.length > 0) {
  console.error("SEO validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`SEO validation passed for ${routes.length} indexed routes plus redirects and crawl assets.`);

function routeToFile(route) {
  if (route === "/") return "index.html";
  return path.join(route.slice(1), "index.html");
}

async function readText(relativePath) {
  return readFile(path.join(distDir, relativePath), "utf8");
}

function extractRootMarkup(html) {
  const rootStart = html.indexOf('<div id="root">');
  const bodyEnd = html.indexOf("</body>");

  if (rootStart === -1 || bodyEnd === -1) return "";
  return html.slice(rootStart, bodyEnd);
}

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function extractMatch(html, pattern) {
  return html.match(pattern)?.[1] ?? "";
}

function decodeHtmlEntities(value) {
  return String(value)
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}
