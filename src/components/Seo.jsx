import { useEffect } from "react";
import { getPageSeo, seoSite } from "../data/seo.js";

export function Seo({ path }) {
  useEffect(() => {
    const meta = getPageSeo(path);

    document.documentElement.lang = seoSite.language;
    document.title = meta.title;

    upsertMeta('meta[name="description"]', { name: "description", content: meta.description, "data-seo": "description" });
    upsertMeta('meta[name="robots"]', { name: "robots", content: meta.robots, "data-seo": "robots" });
    upsertMeta('meta[name="googlebot"]', { name: "googlebot", content: meta.robots, "data-seo": "googlebot" });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website", "data-seo": "og:type" });
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: seoSite.locale, "data-seo": "og:locale" });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: seoSite.siteName, "data-seo": "og:site_name" });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: meta.title, "data-seo": "og:title" });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: meta.description,
      "data-seo": "og:description",
    });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: meta.canonicalUrl, "data-seo": "og:url" });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: meta.imageUrl, "data-seo": "og:image" });
    upsertMeta('meta[property="og:image:alt"]', {
      property: "og:image:alt",
      content: meta.imageAlt,
      "data-seo": "og:image:alt",
    });
    upsertMeta('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
      "data-seo": "twitter:card",
    });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: meta.title, "data-seo": "twitter:title" });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: meta.description,
      "data-seo": "twitter:description",
    });
    upsertMeta('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: meta.imageUrl,
      "data-seo": "twitter:image",
    });
    upsertMeta('meta[name="twitter:image:alt"]', {
      name: "twitter:image:alt",
      content: meta.imageAlt,
      "data-seo": "twitter:image:alt",
    });
    upsertMeta('meta[name="theme-color"]', {
      name: "theme-color",
      content: meta.themeColor,
      "data-seo": "theme-color",
    });

    upsertLink('link[rel="canonical"]', { rel: "canonical", href: meta.canonicalUrl, "data-seo": "canonical" });
    upsertLink('link[rel="alternate"][hreflang="en-NG"]', {
      rel: "alternate",
      hreflang: seoSite.language,
      href: meta.canonicalUrl,
      "data-seo": "hreflang",
    });
    upsertLink('link[rel="alternate"][hreflang="x-default"]', {
      rel: "alternate",
      hreflang: "x-default",
      href: meta.canonicalUrl,
      "data-seo": "x-default",
    });

    document.querySelectorAll("script[data-seo-jsonld]").forEach((node) => node.remove());

    meta.jsonLd.forEach((item, index) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seoJsonld = String(index);
      script.textContent = JSON.stringify(item);
      document.head.append(script);
    });
  }, [path]);

  return null;
}

function upsertMeta(selector, attributes) {
  const element = document.head.querySelector(selector) || document.createElement("meta");
  setAttributes(element, attributes);

  if (!element.parentNode) {
    document.head.append(element);
  }
}

function upsertLink(selector, attributes) {
  const element = document.head.querySelector(selector) || document.createElement("link");
  setAttributes(element, attributes);

  if (!element.parentNode) {
    document.head.append(element);
  }
}

function setAttributes(element, attributes) {
  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });
}
