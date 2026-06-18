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
  { id: "media", label: "Media" },
  { id: "coverage", label: "Coverage" },
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
    author: "Consensus Feed",
    time: "Now",
    location: "Plateau",
    title: "This page now holds the signal in one place.",
    body:
      "Projects, public priorities, field notes, media coverage, and useful next steps sit together here so people can scan what matters without bouncing through separate rooms.",
    href: "/pledge",
    hrefLabel: "Add your support",
  },
  {
    id: "post-2",
    filter: "updates",
    kind: "photo",
    author: "Public service update",
    time: juthProject.period,
    location: juthProject.location,
    title: juthProject.title,
    body: juthProject.summary,
    mediaSrc: stagePortraitImage,
    mediaAlt: "Kefas Ropshik speaking during a public event.",
    href: `/projects/${juthProject.slug}`,
    hrefLabel: "Open project",
  },
  {
    id: "post-3",
    filter: "media",
    kind: "video",
    author: "Video",
    time: "Latest video",
    location: "Watch",
    title: videoFeedItems[0]?.title || "Message to Plateau",
    body:
      "A direct message framed for people who want the larger argument in a quicker format: trust, confidence, and a steadier path for Plateau.",
    mediaSrc: videoFeedItems[0]?.poster || stagePortraitImage,
    mediaAlt: "Poster image for a Plateau message video.",
    href: "/watch#trust-confidence",
    hrefLabel: "Watch video",
  },
  {
    id: "post-4",
    filter: "media",
    kind: "audio",
    author: "Radio conversation",
    time: "Dr Fish FM",
    location: "Interview",
    title: "What the economic agenda sounds like in conversation.",
    body:
      "For people who would rather listen than read, this works like the feed's talk format: context, priorities, and a clearer sense of where the message is heading.",
    mediaSrc: drFishInterviewPosterImage,
    mediaAlt: "Dr Fish FM interview poster.",
    href: "/watch#dr-fish-interview",
    hrefLabel: "Listen in",
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
      "The feed should carry community support as plainly as it carries speeches or press. People need to see the actual work, not just hear the claims.",
    mediaSrc: communityReliefImage,
    mediaAlt: "Community relief gathering in Plateau.",
    href: `/projects/${widowsProject.slug}`,
    hrefLabel: "See details",
  },
  {
    id: "post-6",
    filter: "updates",
    kind: "photo",
    author: "Youth and work",
    time: youthProject.period,
    location: youthProject.location,
    title: youthProject.title,
    body:
      "Training, skills, and enterprise support need to appear in the same flow as public expectations, because that is how people actually judge whether the message is real.",
    mediaSrc: creativeHubImage,
    mediaAlt: "Creative hub training environment in Plateau.",
    href: `/projects/${youthProject.slug}`,
    hrefLabel: "Open project",
  },
  {
    id: "post-7",
    filter: "updates",
    kind: "text",
    author: "Priority",
    time: "What people keep asking for",
    location: jobsPriority?.title || "Jobs & Enterprise",
    title: jobsPriority?.title || "Jobs & Enterprise",
    body:
      jobsPriority?.summary ||
      "A stronger jobs and enterprise focus keeps the conversation tied to real openings, useful work, and growth people can actually feel.",
    href: "/agenda/jobs-enterprise",
    hrefLabel: "See priority",
  },
  {
    id: "post-8",
    filter: "updates",
    kind: "text",
    author: "Priority",
    time: "Public need",
    location: healthcarePriority?.title || "Healthcare",
    title: healthcarePriority?.title || "Healthcare",
    body:
      healthcarePriority?.summary ||
      "Healthcare belongs in the same flow as jobs, security, and youth opportunity because people experience them together.",
    href: "/agenda/healthcare",
    hrefLabel: "See priority",
  },
  {
    id: "post-9",
    filter: "updates",
    kind: "text",
    author: "Priority",
    time: "State signal",
    location: securityPriority?.title || "Security & Peace",
    title: securityPriority?.title || "Security & Peace",
    body:
      securityPriority?.summary ||
      "People need a clearer picture of safety, calm, and public confidence wherever they live and work.",
    href: "/agenda/security-peace",
    hrefLabel: "See priority",
  },
  {
    id: "post-10",
    filter: "coverage",
    kind: "coverage",
    author: guardianCoverage.outlet,
    time: guardianCoverage.date,
    location: guardianCoverage.type,
    title: guardianCoverage.title,
    body: "External reporting that adds public signal around the campaign moment and how it is being read.",
    href: guardianCoverage.href,
    hrefLabel: "Read coverage",
  },
  {
    id: "post-11",
    filter: "coverage",
    kind: "coverage",
    author: vanguardCoverage.outlet,
    time: vanguardCoverage.date,
    location: vanguardCoverage.type,
    title: vanguardCoverage.title,
    body: "A cleaner feed should also surface useful outside acknowledgement of the work already done.",
    href: vanguardCoverage.href,
    hrefLabel: "Read coverage",
  },
  {
    id: "post-12",
    filter: "coverage",
    kind: "coverage",
    author: juthCoverage.outlet,
    time: juthCoverage.date,
    location: juthCoverage.type,
    title: juthCoverage.title,
    body: "Institutional acknowledgement belongs in the stream because it helps people separate noise from evidence.",
    href: juthCoverage.href,
    hrefLabel: "Read coverage",
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
        intro="One live feed for updates, media, coverage, and what Plateau should be paying attention to next."
      />

      <section className="section consensus-section">
        <div className="container consensus-feed-shell">
          <div className="consensus-feed-head">
            <div>
              <div className="section-rule" aria-hidden="true" />
              <h2>The feed stays simple.</h2>
              <p>
                Scroll the signal, open what matters, and move when something deserves a response.
              </p>
            </div>

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
            <a href={withBasePath("/pledge")}>Pledge</a>
            <a href={withBasePath("/contact")}>Contact</a>
          </div>

          <div className="consensus-stream">
            {visibleItems.map((item) => (
              <FeedPost item={item} key={item.id} />
            ))}
          </div>

          <div className="consensus-feed-footer">
            <p>The right next step should never be buried.</p>
            <div>
              <a href={withBasePath("/pledge")}>Join the pledge</a>
              <a href={withBasePath("/contact")}>Send something in</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FeedPost({ item }) {
  return (
    <article className={`consensus-post consensus-post--${item.kind}`}>
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
        <a href={withBasePath(item.href)}>
          {item.hrefLabel}
          <ArrowUpRight aria-hidden="true" size={16} strokeWidth={2.4} />
        </a>
      </footer>
    </article>
  );
}
