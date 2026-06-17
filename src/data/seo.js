import { agendaAreas } from "./agenda.js";
import { pressItems, projects, publicServiceDetails } from "./site.js";

export const seoSite = {
  language: "en-NG",
  locale: "en_NG",
  siteName: "Kefas4Plateau",
  siteAlternateNames: ["Kefiano4Gov", "Kefas4Gov", "Kefiano4Plateau"],
  personName: "Chief Kefas Wungak Ropshik",
  personShortName: "Kefas Ropshik",
  alternateNames: ["Kefiano", "Kefas Ropshik", "Kefas4Gov", "Kefiano4Gov", "Kefas4Plateau"],
  brandKeywords: [
    "Kefiano4Gov",
    "Kefas4Gov",
    "Kefas4Plateau",
    "Kefiano4Plateau",
    "Kefiano",
    "Chief Kefas Wungak Ropshik",
    "Kefas Wungak Ropshik",
    "Kefas Ropshik",
  ],
  siteUrl: "https://kefiano4gov.name.ng",
  defaultImage: "/social/site-share.jpg",
  defaultThemeColor: "#0f6a4f",
};

const defaultRobots = "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";

const staticPageSeo = {
  "/": {
    title: "Kefas Wungak Ropshik | Public Service and Priorities for Plateau",
    description:
      "Explore Kefas Ropshik's public service record, priorities for Plateau State, projects, news coverage, and ways to get involved.",
    image: seoSite.defaultImage,
    pageType: "WebPage",
    breadcrumbs: [{ name: "Home", path: "/" }],
    topicKeywords: ["Plateau State", "public service", "governorship campaign", "Plateau priorities"],
  },
  "/about": {
    title: "About Kefas Ropshik | Background, Business, and Community Work",
    description:
      "Learn about Kefas Ropshik's background, business experience, philanthropy, healthcare support, and public life in Plateau State.",
    image: seoSite.defaultImage,
    pageType: "AboutPage",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "About Kefiano", path: "/about" },
    ],
    topicKeywords: ["biography", "philanthropy", "business background", "Plateau State"],
  },
  "/public-service": {
    title: "Public Service | Healthcare, Youth, Community, and Enterprise",
    description:
      "See the public service work linked to Kefas Ropshik across healthcare, youth opportunity, community support, and enterprise in Plateau State.",
    image: seoSite.defaultImage,
    pageType: "CollectionPage",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Public Service", path: "/public-service" },
    ],
    itemList: serviceItemList(),
    topicKeywords: ["healthcare", "youth development", "community support", "enterprise support"],
  },
  "/agenda": {
    title: "Priorities for Plateau | Security, Jobs, Healthcare, and Growth",
    description:
      "Review the Plateau priorities presented on this site, including security, youth empowerment, jobs, healthcare, and agriculture.",
    image: seoSite.defaultImage,
    pageType: "CollectionPage",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Priorities", path: "/agenda" },
    ],
    itemList: agendaAreas.map((area) => ({
      name: area.title,
      path: area.href,
      description: area.summary,
    })),
    topicKeywords: ["security", "jobs", "healthcare", "agriculture", "Plateau priorities"],
  },
  "/news": {
    title: "News and Coverage | Kefas Ropshik",
    description:
      "Read recent coverage, public reports, and media references connected to Kefas Ropshik's projects, outreach, and Plateau priorities.",
    image: seoSite.defaultImage,
    pageType: "CollectionPage",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "News", path: "/news" },
    ],
    itemList: pressItems.map((item) => ({
      name: item.title,
      url: item.href,
      description: `${item.outlet} · ${item.date}`,
    })),
    topicKeywords: ["news coverage", "media coverage", "Plateau politics", "public updates"],
  },
  "/gallery": {
    title: "Gallery | Projects, Outreach, and Public Moments",
    description:
      "Browse a gallery of healthcare work, youth programmes, outreach, ventures, and public moments connected to Kefas Ropshik.",
    image: seoSite.defaultImage,
    pageType: "CollectionPage",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Gallery", path: "/gallery" },
    ],
    topicKeywords: ["photo gallery", "projects", "outreach", "public moments"],
  },
  "/plateau": {
    title: "Plateau First | Safer Communities, Jobs, Healthcare, and Opportunity",
    description:
      "A clearer view of the Plateau this site points to: safer communities, stronger healthcare, useful jobs, and real opportunity for young people.",
    image: seoSite.defaultImage,
    pageType: "WebPage",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Plateau First", path: "/plateau" },
    ],
    topicKeywords: ["Plateau State", "jobs", "healthcare", "security", "youth opportunity"],
  },
  "/contact": {
    title: "Contact | Media, Partnerships, and Enquiries",
    description:
      "Contact the team for enquiries, media requests, partnerships, or direct messages related to Kefas Ropshik and this site.",
    image: seoSite.defaultImage,
    pageType: "ContactPage",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ],
    topicKeywords: ["contact", "media requests", "partnerships", "Plateau State"],
  },
  "/pledge": {
    title: "Join the Pledge | Support Kefas Ropshik in Plateau",
    description:
      "Join the pledge, share how you want to help, and support Plateau-focused work around youth opportunity, jobs, healthcare, and community support.",
    image: "/decorative/kefiano4gov-pledge.png",
    pageType: "WebPage",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Pledge", path: "/pledge" },
    ],
    topicKeywords: ["pledge", "support", "volunteer", "campaign"],
  },
  "/account": {
    title: "Account | Secure Access and Recovery Passphrase",
    description:
      "Create an account, receive a 12-word recovery passphrase, and use that passphrase to sign in on any new device.",
    image: seoSite.defaultImage,
    pageType: "WebPage",
    robots: "noindex,follow",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Account", path: "/account" },
    ],
    topicKeywords: ["account", "passphrase", "recovery", "login"],
  },
  "/admin": {
    title: "Admin Dashboard | Kefas4Plateau",
    description: "Private dashboard for reviewing pledge activity and supporter details.",
    image: seoSite.defaultImage,
    pageType: "WebPage",
    robots: "noindex,nofollow",
    breadcrumbs: [{ name: "Home", path: "/" }],
    topicKeywords: ["admin"],
  },
  "/watch": {
    title: "Watch | Kefas Ropshik",
    description: "Watch short video updates connected to Kefas Ropshik in a full-screen vertical player.",
    image: seoSite.defaultImage,
    pageType: "VideoGallery",
    robots: "noindex,follow",
    breadcrumbs: [{ name: "Home", path: "/" }],
    topicKeywords: ["video", "updates", "Plateau State"],
  },
  "/404": {
    title: "Page Not Found | Kefas4Plateau",
    description:
      "The page you requested could not be found. Explore the main sections of the Kefas4Plateau site instead.",
    image: seoSite.defaultImage,
    pageType: "WebPage",
    robots: "noindex,follow",
    breadcrumbs: [{ name: "Home", path: "/" }],
    topicKeywords: ["not found"],
  },
};

export function getAllSeoRoutes() {
  return [
    "/",
    "/about",
    "/public-service",
    ...Object.keys(publicServiceDetails).map((slug) => `/public-service/${slug}`),
    "/agenda",
    ...agendaAreas.map((area) => area.href),
    "/news",
    "/gallery",
    "/plateau",
    "/watch",
    "/pledge",
    "/account",
    "/admin",
    "/contact",
    ...projects.map((project) => `/projects/${project.slug}`),
  ];
}

export function getPageSeo(inputPath) {
  const path = normalizePath(inputPath);

  if (staticPageSeo[path]) {
    return finalizeSeo(path, staticPageSeo[path]);
  }

  if (path.startsWith("/public-service/")) {
    const slug = path.replace("/public-service/", "");
    const detail = publicServiceDetails[slug];

    if (!detail) return finalizeSeo("/404", staticPageSeo["/404"]);

    return finalizeSeo(path, {
      title: `${detail.title} | Public Service in Plateau`,
      description: detail.summary,
      image: detail.image || seoSite.defaultImage,
      pageType: "WebPage",
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Public Service", path: "/public-service" },
        { name: detail.title, path },
      ],
      topicKeywords: [detail.title, "public service", "Plateau State"],
      service: {
        name: detail.title,
        description: detail.summary,
      },
    });
  }

  if (path.startsWith("/agenda/")) {
    const slug = path.replace("/agenda/", "");
    const detail = agendaAreas.find((area) => area.slug === slug);

    if (!detail) return finalizeSeo("/404", staticPageSeo["/404"]);

    return finalizeSeo(path, {
      title: `${detail.title} | Priorities for Plateau`,
      description: detail.storyBody,
      image: detail.sceneAsset || seoSite.defaultImage,
      pageType: "WebPage",
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: "Priorities", path: "/agenda" },
        { name: detail.title, path },
      ],
      topicKeywords: [detail.title, detail.focus, "Plateau priorities"],
    });
  }

  if (path.startsWith("/projects/")) {
    const slug = path.replace("/projects/", "");
    const project = projects.find((item) => item.slug === slug);

    if (!project) return finalizeSeo("/404", staticPageSeo["/404"]);

    return finalizeSeo(path, {
      title: `${project.title} | Projects by Kefas Ropshik`,
      description: `${project.summary} ${project.location}. ${project.period}.`,
      image: project.image || seoSite.defaultImage,
      pageType: "WebPage",
      breadcrumbs: [
        { name: "Home", path: "/" },
        { name: project.title, path },
      ],
      topicKeywords: [project.title, project.category, project.usefulFor, "Plateau State"],
      project,
    });
  }

  if (path === "/projects") {
    return finalizeSeo(path, {
      title: "Projects Redirect | Kefas4Plateau",
      description: "This route redirects to the public service overview.",
      image: seoSite.defaultImage,
      pageType: "WebPage",
      robots: "noindex,follow",
      canonicalPath: "/public-service",
      breadcrumbs: [{ name: "Home", path: "/" }],
      topicKeywords: ["redirect"],
    });
  }

  return finalizeSeo("/404", staticPageSeo["/404"]);
}

export function renderSeoHead(meta) {
  const tags = [
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta data-seo="description" name="description" content="${escapeHtml(meta.description)}" />`,
    `<meta data-seo="robots" name="robots" content="${escapeHtml(meta.robots)}" />`,
    `<meta data-seo="googlebot" name="googlebot" content="${escapeHtml(meta.robots)}" />`,
    `<link data-seo="canonical" rel="canonical" href="${escapeHtml(meta.canonicalUrl)}" />`,
    `<link data-seo="hreflang" rel="alternate" hreflang="${escapeHtml(seoSite.language)}" href="${escapeHtml(meta.canonicalUrl)}" />`,
    `<link data-seo="x-default" rel="alternate" hreflang="x-default" href="${escapeHtml(meta.canonicalUrl)}" />`,
    `<meta data-seo="og:type" property="og:type" content="website" />`,
    `<meta data-seo="og:locale" property="og:locale" content="${escapeHtml(seoSite.locale)}" />`,
    `<meta data-seo="og:site_name" property="og:site_name" content="${escapeHtml(seoSite.siteName)}" />`,
    `<meta data-seo="og:title" property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta data-seo="og:description" property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta data-seo="og:url" property="og:url" content="${escapeHtml(meta.canonicalUrl)}" />`,
    `<meta data-seo="og:image" property="og:image" content="${escapeHtml(meta.imageUrl)}" />`,
    `<meta data-seo="og:image:alt" property="og:image:alt" content="${escapeHtml(meta.imageAlt)}" />`,
    `<meta data-seo="keywords" name="keywords" content="${escapeHtml(meta.keywords.join(", "))}" />`,
    `<meta data-seo="twitter:card" name="twitter:card" content="summary_large_image" />`,
    `<meta data-seo="twitter:title" name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta data-seo="twitter:description" name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `<meta data-seo="twitter:image" name="twitter:image" content="${escapeHtml(meta.imageUrl)}" />`,
    `<meta data-seo="twitter:image:alt" name="twitter:image:alt" content="${escapeHtml(meta.imageAlt)}" />`,
    `<meta data-seo="theme-color" name="theme-color" content="${escapeHtml(meta.themeColor)}" />`,
  ];

  return `${tags.join("\n      ")}\n${renderJsonLdScripts(meta.jsonLd)}`;
}

function finalizeSeo(path, config) {
  const canonicalPath = normalizePath(config.canonicalPath ?? path);
  const image = config.image || seoSite.defaultImage;
  const title = config.title || staticPageSeo["/"].title;
  const description = config.description || staticPageSeo["/"].description;

  const meta = {
    path,
    title,
    description,
    image,
    imageUrl: absoluteUrl(image),
    imageAlt: `${title} preview image`,
    robots: config.robots || defaultRobots,
    canonicalPath,
    canonicalUrl: absoluteUrl(canonicalPath),
    pageType: config.pageType || "WebPage",
    breadcrumbs: config.breadcrumbs || [{ name: "Home", path: "/" }],
    themeColor: config.themeColor || seoSite.defaultThemeColor,
    keywords: Array.from(new Set([...seoSite.brandKeywords, ...(config.topicKeywords || [])])),
    itemList: config.itemList || null,
    project: config.project || null,
    service: config.service || null,
  };

  meta.jsonLd = buildJsonLd(meta);
  return meta;
}

function buildJsonLd(meta) {
  const entries = [buildPageJsonLd(meta)];

  if (meta.path === "/") {
    entries.unshift({
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: seoSite.siteName,
      alternateName: seoSite.siteAlternateNames,
      url: seoSite.siteUrl,
      inLanguage: seoSite.language,
      keywords: seoSite.brandKeywords,
    });
  }

  if (meta.path === "/" || meta.path === "/about") {
    entries.push({
      "@context": "https://schema.org",
      "@type": "Person",
      name: seoSite.personName,
      alternateName: seoSite.alternateNames,
      url: seoSite.siteUrl,
      image: absoluteUrl(seoSite.defaultImage),
      description:
        "Nigerian entrepreneur, philanthropist, and public figure associated with healthcare, youth opportunity, enterprise, and community support in Plateau State.",
      keywords: seoSite.brandKeywords,
      homeLocation: {
        "@type": "Place",
        name: "Plateau State, Nigeria",
      },
    });
  }

  if (meta.itemList?.length) {
    entries.push({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: meta.title,
      itemListElement: meta.itemList.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.path ? absoluteUrl(item.path) : item.url,
        description: item.description,
      })),
    });
  }

  if (meta.project) {
    entries.push({
      "@context": "https://schema.org",
      "@type": "Project",
      name: meta.project.title,
      description: meta.project.summary,
      url: meta.canonicalUrl,
      image: meta.imageUrl,
      location: {
        "@type": "Place",
        name: meta.project.location,
      },
      keywords: meta.project.usefulFor,
      temporalCoverage: meta.project.period,
    });
  }

  if (meta.service) {
    entries.push({
      "@context": "https://schema.org",
      "@type": "Service",
      name: meta.service.name,
      description: meta.service.description,
      provider: {
        "@type": "Person",
        name: seoSite.personName,
        url: seoSite.siteUrl,
      },
      areaServed: {
        "@type": "Place",
        name: "Plateau State, Nigeria",
      },
      url: meta.canonicalUrl,
    });
  }

  if (meta.breadcrumbs.length > 1) {
    entries.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: meta.breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: absoluteUrl(item.path),
      })),
    });
  }

  return entries;
}

function buildPageJsonLd(meta) {
  return {
    "@context": "https://schema.org",
    "@type": meta.pageType,
    name: meta.title,
    description: meta.description,
    url: meta.canonicalUrl,
    inLanguage: seoSite.language,
    keywords: meta.keywords,
    isPartOf: {
      "@type": "WebSite",
      name: seoSite.siteName,
      alternateName: seoSite.siteAlternateNames,
      url: seoSite.siteUrl,
    },
    about: {
      "@type": "Person",
      name: seoSite.personName,
      alternateName: seoSite.alternateNames,
      url: seoSite.siteUrl,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: meta.imageUrl,
    },
  };
}

function renderJsonLdScripts(items) {
  return items
    .map(
      (item, index) =>
        `      <script data-seo-jsonld="${index}" type="application/ld+json">${serializeJsonLd(item)}</script>`,
    )
    .join("\n");
}

function serviceItemList() {
  return Object.entries(publicServiceDetails).map(([slug, detail]) => ({
    name: detail.title,
    path: `/public-service/${slug}`,
    description: detail.summary,
  }));
}

function normalizePath(path) {
  if (!path || path === "/") return "/";

  const trimmed = path.replace(/\/+$/, "");
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

function absoluteUrl(path) {
  if (!path) return seoSite.siteUrl;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${seoSite.siteUrl}${normalizePath(path)}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("\"", "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function serializeJsonLd(value) {
  return JSON.stringify(value)
    .replaceAll("<", "\\u003c")
    .replaceAll(">", "\\u003e")
    .replaceAll("&", "\\u0026")
    .replaceAll("</script", "<\\/script");
}
