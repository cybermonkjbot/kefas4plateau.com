import { useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import communityReliefImage from "../../assets/about/community-relief.jpg";
import stagePortraitImage from "../../assets/about/stage-portrait.jpg";
import creativeHubImage from "../../assets/kefiano-creative-hub.jpg";
import drFishInterviewPosterImage from "../../assets/dr-fish-fm-interview-poster.jpg";
import { agendaAreas, pressItems, projects } from "../data/site.js";
import { videoFeedItems } from "../data/videoFeed.js";
import { withBasePath } from "../lib/sitePaths.js";
import { PageHero } from "./PageShell.jsx";

const filters = [
  { id: "all", label: "All" },
  { id: "updates", label: "Updates" },
  { id: "media", label: "Video & Audio" },
  { id: "coverage", label: "News" },
];

const jobsPriority = agendaAreas.find((area) => area.slug === "jobs-enterprise");
const healthcarePriority = agendaAreas.find((area) => area.slug === "healthcare");
const securityPriority = agendaAreas.find((area) => area.slug === "security-peace");

const juthProject = projects.find((project) => project.slug === "juth-accident-emergency-unit-renovation") || projects[0];
const youthProject = projects.find((project) => project.slug === "plateau-youth-creative-digital-skills-training") || projects[0];
const widowsProject = projects.find((project) => project.slug === "new-year-support-widows-shendam-pankshin-kanke") || projects[0];

const guardianCoverage = pressItems.find((item) => item.outlet === "Guardian") || pressItems[0];
const vanguardCoverage = pressItems.find((item) => item.outlet === "Vanguard") || pressItems[0];
const juthCoverage = pressItems.find((item) => item.outlet === "JUTH") || pressItems[0];

const feedItems = [
  {
    id: "post-1",
    filter: "updates",
    kind: "text",
    author: "From the team",
    time: "Now",
    location: "Across Plateau",
    title: "A clearer read on what is moving across Plateau.",
    body:
      "Projects, priorities, media, and next steps now sit in one stream so it is easier to see what matters and where the work is heading.",
    href: "/pledge",
    hrefLabel: "Add your support",
    engageHref: "/contact",
    engageLabel: "Contact the team",
  },
  {
    id: "post-2",
    filter: "updates",
    kind: "photo",
    author: "Healthcare",
    time: juthProject.period,
    location: juthProject.location,
    title: juthProject.title,
    body: juthProject.summary,
    mediaSrc: stagePortraitImage,
    mediaAlt: "Kefas Ropshik speaking during a public event.",
    href: `/projects/${juthProject.slug}`,
    hrefLabel: "View the work",
    engageHref: "/pledge",
    engageLabel: "Support this work",
  },
  {
    id: "post-3",
    filter: "media",
    kind: "video",
    author: "Video update",
    time: "New video",
    location: "Watch now",
    title: videoFeedItems[0]?.title || "Message to Plateau",
    body:
      "A short message on trust, confidence, and a steadier path for Plateau.",
    mediaSrc: videoFeedItems[0]?.poster || stagePortraitImage,
    mediaAlt: "Poster image for a Plateau message video.",
    href: "/watch#trust-confidence",
    hrefLabel: "Watch video",
    engageHref: "/pledge",
    engageLabel: "Join the campaign",
  },
  {
    id: "post-4",
    filter: "media",
    kind: "audio",
    author: "On air",
    time: "Dr Fish FM",
    location: "Radio interview",
    title: "What the economic agenda sounds like in conversation.",
    body:
      "A radio conversation on jobs, opportunity, and the direction of the campaign.",
    mediaSrc: drFishInterviewPosterImage,
    mediaAlt: "Dr Fish FM interview poster.",
    href: "/watch#dr-fish-interview",
    hrefLabel: "Listen now",
    engageHref: "/contact",
    engageLabel: "Share your view",
  },
  {
    id: "post-5",
    filter: "updates",
    kind: "photo",
    author: "Community support",
    time: widowsProject.period,
    location: widowsProject.location,
    title: widowsProject.title,
    body:
      "Community support belongs in full view. People should be able to see the work, not just hear about it.",
    mediaSrc: communityReliefImage,
    mediaAlt: "Community relief gathering in Plateau.",
    href: `/projects/${widowsProject.slug}`,
    hrefLabel: "See the details",
    engageHref: "/pledge",
    engageLabel: "Support this work",
  },
  {
    id: "post-6",
    filter: "updates",
    kind: "photo",
    author: "Youth opportunity",
    time: youthProject.period,
    location: youthProject.location,
    title: youthProject.title,
    body:
      "Skills, training, and enterprise support matter because they create real openings for young people close to home.",
    mediaSrc: creativeHubImage,
    mediaAlt: "Creative hub training environment in Plateau.",
    href: `/projects/${youthProject.slug}`,
    hrefLabel: "View the work",
    engageHref: "/pledge",
    engageLabel: "Get involved",
  },
  {
    id: "post-7",
    filter: "updates",
    kind: "text",
    author: "What matters most",
    time: "Jobs and enterprise",
    location: jobsPriority?.title || "Jobs & Enterprise",
    title: jobsPriority?.title || "Jobs & Enterprise",
    body:
      jobsPriority?.summary ||
      "A stronger jobs and enterprise focus keeps the conversation tied to real openings and useful work.",
    href: "/agenda/jobs-enterprise",
    hrefLabel: "See the plan",
    engageHref: "/pledge",
    engageLabel: "Support this focus",
  },
  {
    id: "post-8",
    filter: "updates",
    kind: "text",
    author: "What matters most",
    time: "Healthcare",
    location: healthcarePriority?.title || "Healthcare",
    title: healthcarePriority?.title || "Healthcare",
    body:
      healthcarePriority?.summary ||
      "Healthcare belongs near the top because people feel it every day.",
    href: "/agenda/healthcare",
    hrefLabel: "See the plan",
    engageHref: "/contact",
    engageLabel: "Share your view",
  },
  {
    id: "post-9",
    filter: "updates",
    kind: "text",
    author: "What matters most",
    time: "Security and peace",
    location: securityPriority?.title || "Security & Peace",
    title: securityPriority?.title || "Security & Peace",
    body:
      securityPriority?.summary ||
      "People need to feel safer where they live, work, and move.",
    href: "/agenda/security-peace",
    hrefLabel: "See the plan",
    engageHref: "/contact",
    engageLabel: "Share your view",
  },
  {
    id: "post-10",
    filter: "coverage",
    kind: "coverage",
    author: guardianCoverage.outlet,
    time: guardianCoverage.date,
    location: guardianCoverage.type,
    title: guardianCoverage.title,
    body: "Coverage tracking how this campaign moment is being read in public.",
    href: guardianCoverage.href,
    hrefLabel: "Read coverage",
    engageHref: "/contact",
    engageLabel: "Share your view",
  },
  {
    id: "post-11",
    filter: "coverage",
    kind: "coverage",
    author: vanguardCoverage.outlet,
    time: vanguardCoverage.date,
    location: vanguardCoverage.type,
    title: vanguardCoverage.title,
    body: "Coverage tied to youth training and skills work already on the ground.",
    href: vanguardCoverage.href,
    hrefLabel: "Read coverage",
    engageHref: "/pledge",
    engageLabel: "Get involved",
  },
  {
    id: "post-12",
    filter: "coverage",
    kind: "coverage",
    author: juthCoverage.outlet,
    time: juthCoverage.date,
    location: juthCoverage.type,
    title: juthCoverage.title,
    body: "An institutional record of the JUTH work and how it was acknowledged publicly.",
    href: juthCoverage.href,
    hrefLabel: "Read coverage",
    engageHref: "/contact",
    engageLabel: "Contact the team",
  },
];

export function ConsensusFeedPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const visibleItems = activeFilter === "all"
    ? feedItems
    : feedItems.filter((item) => item.filter === activeFilter);

  return (
    <>
      <PageHero
        title="Consensus Feed"
        intro="Updates, videos, interviews, and news from the work happening across Plateau."
      />

      <section className="section consensus-section">
        <div className="container consensus-feed-shell">
          <div className="consensus-feed-head">
            <nav className="consensus-tabs" aria-label="Consensus feed filters">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  className={`consensus-tab${activeFilter === filter.id ? " is-active" : ""}`}
                  type="button"
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="consensus-mobile-actions" aria-label="Consensus feed quick actions">
            <a href={withBasePath("/watch")}>Watch</a>
            <a href={withBasePath("/pledge")}>Join</a>
            <a href={withBasePath("/contact")}>Contact</a>
          </div>

          <div className="consensus-engage-strip">
            <p>Want to support the work or get in touch?</p>
            <div>
              <a href={withBasePath("/contact")}>Contact the team</a>
              <a href={withBasePath("/pledge")}>Join the pledge</a>
            </div>
          </div>

          <div className="consensus-stream">
            {visibleItems.map((item) => (
              <FeedPost item={item} key={item.id} />
            ))}
          </div>

          <div className="consensus-feed-footer">
            <p>Keep up with the work and take part.</p>
            <div>
              <a href={withBasePath("/pledge")}>Join the pledge</a>
              <a href={withBasePath("/contact")}>Contact the team</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FeedPost({ item }) {
  const [shareState, setShareState] = useState("idle");

  async function handleShare() {
    if (typeof window === "undefined") return;

    const shareUrl = `${window.location.origin}${withBasePath("/consensus-feed")}#${item.id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: item.title,
          url: shareUrl,
        });
        setShareState("shared");
        window.setTimeout(() => setShareState("idle"), 1800);
        return;
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setShareState("copied");
        window.setTimeout(() => setShareState("idle"), 1800);
      }
    } catch {
      setShareState("idle");
    }
  }

  return (
    <article className={`consensus-post consensus-post--${item.kind}`} id={item.id}>
      <header className="consensus-post-head">
        <p>
          <span>{item.author}</span>
          <span>{item.time}</span>
          <span>{item.location}</span>
        </p>
        <h3>{item.title}</h3>
      </header>

      {item.kind === "photo" ? (
        <a className="consensus-media consensus-media--photo" href={withBasePath(item.href)}>
          <img src={item.mediaSrc} alt={item.mediaAlt} />
        </a>
      ) : null}

      {item.kind === "video" ? (
        <a className="consensus-media consensus-media--video" href={withBasePath(item.href)}>
          <img src={item.mediaSrc} alt={item.mediaAlt} />
          <span className="consensus-media-play">
            <Play aria-hidden="true" size={18} strokeWidth={2.4} />
            Watch
          </span>
        </a>
      ) : null}

      {item.kind === "audio" ? (
        <a className="consensus-media consensus-media--audio" href={withBasePath(item.href)}>
          <img src={item.mediaSrc} alt={item.mediaAlt} />
          <div className="consensus-audio-panel">
            <div className="consensus-audio-wave" aria-hidden="true">
              {Array.from({ length: 18 }).map((_, index) => (
                <span key={index} style={{ height: `${12 + ((index * 7) % 28)}px` }} />
              ))}
            </div>
            <strong>Listen now</strong>
          </div>
        </a>
      ) : null}

      <div className="consensus-post-body">
        <p>{item.body}</p>
      </div>

      <footer className="consensus-post-footer">
        <div className="consensus-post-actions">
          <a className="consensus-post-action consensus-post-action--primary" href={withBasePath(item.href)}>
            {item.hrefLabel}
            <ArrowUpRight aria-hidden="true" size={16} strokeWidth={2.4} />
          </a>

          {item.engageHref ? (
            <a className="consensus-post-action" href={withBasePath(item.engageHref)}>
              {item.engageLabel}
            </a>
          ) : null}

          <button className="consensus-post-action" type="button" onClick={handleShare}>
            {shareState === "idle" ? "Share" : shareState === "shared" ? "Shared" : "Link copied"}
          </button>
        </div>
      </footer>
    </article>
  );
}
