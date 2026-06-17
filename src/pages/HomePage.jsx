import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { Button } from "../components/Button.jsx";
import { VentureMediaGrid } from "../components/VentureMediaGrid.jsx";
import { agendaAreas, featuredPressOutlets, projects } from "../data/site.js";
import { featuredVentureMedia } from "../data/ventureMedia.js";
import { getFallbackPresentedCount } from "../lib/pledgeFallback.js";
import { withBasePath } from "../lib/sitePaths.js";
import juthImage from "../../assets/juth-ae-unit.jpg";
import kefasPortraitImage from "../../assets/kefas-2026-stonereporters-form.jpg";
import foundationThumbImage from "../../assets/kefiano-foundation-video-thumb.jpg";
import foundationBackdropImage from "../../assets/kefiano-creative-hub.jpg";
import campaignFormImage from "../../assets/kefas-2026-afripost-form.jpg";

function renderHeroTitle(title, accent) {
  if (!accent || !title.includes(accent)) return title;

  const [before, after] = title.split(accent, 2);
  return (
    <>
      {before}
      <a className="home-hero-title-accent" href={withBasePath("/plateau")}>
        {accent}
      </a>
      {after}
    </>
  );
}

const homeStats = [
  { value: "119", label: "Youth trained in creative and digital skills" },
  { value: "1,190+", label: "Widows reached across three LGAs" },
  { value: "2023-25", label: "Food relief and outreach across Plateau" },
  { value: "JUTH", label: "A&E renovation delivered in Jos" },
];

const heroSignals = [
  "Build skills",
  "Try ideas",
  "Find support",
];

const heroSlides = [
  {
    id: "intro",
    kind: "split",
    title: "The People of Plateau want Kefas for governor.",
    titleAccent: "Plateau",
    text:
      "I'm Kefas Ropshik, backing real options for young people in Plateau. Healthcare, enterprise, training, and community support, with a clear focus on helping young people build skills, test ideas, and create work that lasts here at home.",
    primaryCta: { href: "/public-service", label: "See the Work", withIcon: true },
    secondaryCta: { href: "/about", label: "My Story" },
    signals: heroSignals,
    image: {
      href: "/about",
      src: kefasPortraitImage,
      alt: "Portrait of Kefas Ropshik in white attire.",
      title: "Kefas Ropshik",
      text: "Businessman, builder, and community figure in Plateau.",
    },
  },
  {
    id: "jobs",
    kind: "centered",
    title: "I'm bringing more jobs to Plateau, and more real openings for young people.",
    text:
      "The goal is simple: more useful skills, more strong local work, and more chances for young people to build something here at home.",
    primaryCta: { href: "/pledge", label: "Join the Pledge" },
    secondaryCta: { href: "/agenda/jobs-enterprise", label: "See Jobs Focus" },
    highlights: ["Jobs & enterprise", "Youth opportunity", "Local growth"],
  },
  {
    id: "business",
    kind: "centered",
    title: "I'm bringing the business discipline that gets results into government.",
    text:
      "That means clearer priorities, faster execution, and backing practical ideas that people can use, measure, and grow from.",
    primaryCta: { href: "/about", label: "Why It Matters" },
    secondaryCta: { href: "/public-service", label: "See Results" },
    stats: [
      { value: "Chillers", label: "Hospitality venture in Jos" },
      { value: "Kefiano Autos", label: "Auto business serving customers in Plateau" },
      { value: "Creative Hub", label: "Youth training and media work" },
    ],
  },
];

const recentWorkVisuals = [
  {
    src: foundationThumbImage,
    alt: "Kefas Ropshik during a community outreach visit with families indoors.",
    label: "Household support outreach",
    width: 1920,
    height: 1080,
  },
  {
    src: foundationBackdropImage,
    alt: "Kefas Ropshik speaking in front of a Kefiano Global Foundation community backdrop.",
    label: "Direct community support",
    width: 2048,
    height: 1536,
  },
  {
    src: kefasPortraitImage,
    alt: "Portrait of Kefas Ropshik used across recent work coverage.",
    label: "Relief work across Plateau",
    width: 447,
    height: 447,
  },
  {
    src: campaignFormImage,
    alt: "Kefas Ropshik holding documents during a public-facing campaign moment.",
    label: "Enterprise and livelihood support",
    width: 2560,
    height: 1706,
  },
];

export function HomePage() {
  const [pledgeCount, setPledgeCount] = useState(() => getFallbackPresentedCount());
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [activeCommunitySlide, setActiveCommunitySlide] = useState(0);
  const heroGestureStart = useRef({ x: 0, y: 0, interactive: false });
  const recordProjects = projects.slice(0, 4);
  const communityProjects = projects.slice(4, 8);
  const recentWorkSlides = communityProjects.map((project, index) => ({
    ...project,
    ...recentWorkVisuals[index],
  }));
  const currentHeroSlide = heroSlides[activeHeroSlide];
  const currentCommunitySlide = recentWorkSlides[activeCommunitySlide];

  useEffect(() => {
    document.body.classList.add("home-page-body");
    return () => document.body.classList.remove("home-page-body");
  }, []);

  useEffect(() => {
    let active = true;

    async function loadPledgeCount() {
      try {
        const response = await fetch("/api/pledges/count", {
          headers: { Accept: "application/json" },
        });

        if (!response.ok) {
          if (active) {
            setPledgeCount(getFallbackPresentedCount());
          }
          return;
        }

        const payload = await response.json();

        if (active && Number.isFinite(payload.count)) {
          setPledgeCount(payload.count);
        }
      } catch {
        if (active) {
          setPledgeCount(getFallbackPresentedCount());
        }
      }
    }

    function syncPledgeCount(event) {
      if (Number.isFinite(event?.detail?.count)) {
        setPledgeCount(event.detail.count);
        return;
      }

      loadPledgeCount();
    }

    loadPledgeCount();
    window.addEventListener("kefas-pledge-count-updated", syncPledgeCount);

    return () => {
      active = false;
      window.removeEventListener("kefas-pledge-count-updated", syncPledgeCount);
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveCommunitySlide((current) => (current + 1) % recentWorkSlides.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, [recentWorkSlides.length]);

  function goToHeroSlide(index) {
    setActiveHeroSlide(index);
  }

  function goToPrevHeroSlide() {
    setActiveHeroSlide((current) => (current - 1 + heroSlides.length) % heroSlides.length);
  }

  function goToNextHeroSlide() {
    setActiveHeroSlide((current) => (current + 1) % heroSlides.length);
  }

  function startHeroGesture(point, target) {
    heroGestureStart.current = {
      x: point.clientX,
      y: point.clientY,
      interactive: Boolean(target.closest("a, button")),
    };
  }

  function finishHeroGesture(point) {
    if (typeof window !== "undefined" && window.innerWidth > 900) return;

    const deltaX = point.clientX - heroGestureStart.current.x;
    const deltaY = point.clientY - heroGestureStart.current.y;

    if (heroGestureStart.current.interactive) return;
    if (Math.abs(deltaX) < 52 || Math.abs(deltaY) > 44) return;

    if (deltaX < 0) {
      goToNextHeroSlide();
      return;
    }

    goToPrevHeroSlide();
  }

  function handleHeroTouchStart(event) {
    const touch = event.touches[0];
    startHeroGesture(touch, event.target);
  }

  function handleHeroTouchEnd(event) {
    const touch = event.changedTouches[0];
    finishHeroGesture(touch);
  }

  function handleHeroPointerDown(event) {
    startHeroGesture(event, event.target);
  }

  function handleHeroPointerUp(event) {
    if (event.pointerType === "mouse" && typeof window !== "undefined" && window.innerWidth > 900) return;

    finishHeroGesture(event);
  }

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="container">
          <div className="home-hero-carousel">
            <div className="home-hero-controls" aria-label="Hero carousel controls">
              <button className="home-hero-control" type="button" onClick={goToPrevHeroSlide} aria-label="Previous slide">
                <ArrowLeft aria-hidden="true" size={18} strokeWidth={2.4} />
              </button>
              <div className="home-hero-dots">
                {heroSlides.map((slide, index) => (
                  <button
                    aria-label={`Go to slide ${index + 1}`}
                    aria-pressed={index === activeHeroSlide}
                    className={`home-hero-dot ${index === activeHeroSlide ? "is-active" : ""}`}
                    key={slide.id}
                    type="button"
                    onClick={() => goToHeroSlide(index)}
                  />
                ))}
              </div>
              <button className="home-hero-control" type="button" onClick={goToNextHeroSlide} aria-label="Next slide">
                <ArrowRight aria-hidden="true" size={18} strokeWidth={2.4} />
              </button>
            </div>

            <div
              className={`home-hero-slide home-hero-slide--${currentHeroSlide.kind}`}
              onPointerDown={handleHeroPointerDown}
              onPointerUp={handleHeroPointerUp}
              onTouchEnd={handleHeroTouchEnd}
              onTouchStart={handleHeroTouchStart}
            >
              {currentHeroSlide.kind === "split" ? (
                <div className="home-hero-grid">
                  <div className="home-hero-copy">
                    <h1>{renderHeroTitle(currentHeroSlide.title, currentHeroSlide.titleAccent)}</h1>
                    <p className="home-hero-text">{currentHeroSlide.text}</p>

                    <div className="actions home-actions">
                      <Button
                        href={currentHeroSlide.primaryCta.href}
                        variant="primary"
                        withIcon={currentHeroSlide.primaryCta.withIcon}
                      >
                        {currentHeroSlide.primaryCta.label}
                      </Button>
                      <Button href={currentHeroSlide.secondaryCta.href} variant="secondary">
                        {currentHeroSlide.secondaryCta.label}
                      </Button>
                    </div>

                    <div className="home-hero-signals" aria-label="Hero highlights">
                      {currentHeroSlide.signals.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </div>

                  <aside className="home-hero-visuals" aria-label="Featured visuals">
                    <div className="home-hero-panel-shell">
                      <a className="home-hero-panel home-hero-panel--portrait home-hero-panel--solo" href={withBasePath(currentHeroSlide.image.href)}>
                        <img
                          src={currentHeroSlide.image.src}
                          alt={currentHeroSlide.image.alt}
                          width="447"
                          height="447"
                          decoding="async"
                        />
                        <div className="home-hero-panel-copy">
                          <strong>{currentHeroSlide.image.title}</strong>
                          <span>{currentHeroSlide.image.text}</span>
                        </div>
                      </a>

                      <a className="home-hero-panel-play" href={withBasePath("/watch")} aria-label="Open full-screen video player">
                        <Play size={18} strokeWidth={2.4} fill="currentColor" />
                        <span className="home-hero-panel-play-label">Play</span>
                      </a>
                    </div>
                  </aside>
                </div>
              ) : (
                <div className="home-hero-centered">
                  <div className="home-hero-centered-copy">
                    <h1>{renderHeroTitle(currentHeroSlide.title, currentHeroSlide.titleAccent)}</h1>
                    <p className="home-hero-text">{currentHeroSlide.text}</p>

                    <div className="actions home-actions">
                      <Button href={currentHeroSlide.primaryCta.href} variant="primary">
                        {currentHeroSlide.primaryCta.label}
                      </Button>
                      <Button href={currentHeroSlide.secondaryCta.href} variant="secondary">
                        {currentHeroSlide.secondaryCta.label}
                      </Button>
                    </div>
                  </div>

                  {currentHeroSlide.highlights ? (
                    <div className="home-hero-signals home-hero-signals--centered" aria-label="Slide highlights">
                      {currentHeroSlide.highlights.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  ) : null}

                  {currentHeroSlide.stats ? (
                    <div className="home-hero-success-strip" aria-label="Business highlights">
                      {currentHeroSlide.stats.map((item) => (
                        <div className="home-hero-success-item" key={item.value}>
                          <strong>{item.value}</strong>
                          <span>{item.label}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="home-pledge-count" aria-label="Pledge count">
        <div className="container">
          <div className="home-pledge-banner">
            <p className="home-pledge-label">People who have pledged so far</p>
            <div className="home-pledge-tally" aria-hidden="true">
              <strong className="home-pledge-total">{pledgeCount.toLocaleString()}</strong>
              <span className="home-pledge-callout">People want</span>
            </div>
            <p className="home-pledge-text">
              Join the people volunteering, organizing, creating, and backing the work.
            </p>
            <div className="home-pledge-action">
              <Button href="/pledge" variant="primary">
                Make Your Pledge
              </Button>
            </div>

            <div className="home-pledge-art" aria-hidden="true">
              <img src={withBasePath("/decorative/kefiano4gov-pledge.png")} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="home-priorities" aria-labelledby="home-priorities-title">
        <div className="container">
          <div className="home-priorities-head">
            <div>
              <p className="home-pledge-label">My priorities for Plateau</p>
              <h2 id="home-priorities-title">The work I want to move faster.</h2>
            </div>
            <p>
              Security, safer nightlife, jobs, healthcare, agriculture, and real opportunity for young people and tech founders across the state.
            </p>
          </div>

          <div className="home-priorities-grid">
            {agendaAreas.map((area) => (
              <a className="home-priorities-item" href={withBasePath(area.href)} key={area.title}>
                <div>
                  <strong>{area.title}</strong>
                  <span>{area.priority}</span>
                </div>
                <ArrowUpRight aria-hidden="true" size={18} strokeWidth={2.2} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="home-proof" aria-label="Proof points">
        <div className="container">
          <div className="home-proof-grid">
            {homeStats.map((stat) => (
              <div className="home-proof-item" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-media">
        <div className="container">
          <div className="home-section-copy">
            <h2>Businesses and community work.</h2>
            <p>Explore a few of the ventures and projects linked to Kefas Ropshik.</p>
          </div>
          <VentureMediaGrid items={featuredVentureMedia} />
        </div>
      </section>

      <section className="home-ledger">
        <div className="container home-ledger-grid">
          <div className="home-section-copy">
            <h2>Recent projects.</h2>
            <p>
              Projects across healthcare,
              youth development, community support, and enterprise.
            </p>

            <div className="home-ledger-list">
              {recordProjects.map((project) => (
                <a className="home-ledger-item" href={withBasePath(`/projects/${project.slug}`)} key={project.slug}>
                  <div>
                    <span>{project.category}</span>
                    <h3>{project.title}</h3>
                  </div>
                  <p>{project.summary}</p>
                </a>
              ))}
            </div>
          </div>

          <aside className="home-agenda">
            <div className="home-section-copy">
              <h2>Key priorities.</h2>
              <p>
                Healthcare, jobs, agriculture, safer communities, and practical
                opportunity for young people and new tech startups.
              </p>
            </div>

            <div className="home-agenda-list">
              {agendaAreas.map((area) => (
                <a className="home-agenda-item" href={withBasePath(area.href)} key={area.title}>
                  <div>
                    <h3>{area.title}</h3>
                    <p>{area.summary}</p>
                  </div>
                  <ArrowUpRight aria-hidden="true" size={18} strokeWidth={2.2} />
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="home-spotlight">
        <div className="container home-spotlight-grid">
          <div className="home-spotlight-copy">
            <h2>A clear example of delivery.</h2>
            <p>
              The JUTH Accident and Emergency Unit shows the kind of practical,
              visible improvement people can point to in Jos.
            </p>

            <dl className="home-spotlight-meta">
              <div>
                <dt>Project</dt>
                <dd>JUTH Accident and Emergency Unit</dd>
              </div>
              <div>
                <dt>Location</dt>
                <dd>Jos University Teaching Hospital</dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>Completed</dd>
              </div>
            </dl>

            <div className="actions home-actions">
              <Button href="/projects/juth-accident-emergency-unit-renovation" variant="primary">
                View Project
              </Button>
              <a className="text-link" href={withBasePath("/public-service/healthcare")}>
                More on Healthcare
              </a>
            </div>
          </div>

          <div className="home-spotlight-visual">
            <img
              src={juthImage}
              alt="JUTH Accident and Emergency Unit signage after renovation."
              width="2048"
              height="1365"
              decoding="async"
            />
            <div className="home-spotlight-caption">Practical delivery in Jos</div>
          </div>
        </div>
      </section>

      <section className="home-community" data-header-tone="green">
        <div className="container home-community-grid">
          <div className="home-community-main">
            <div className="home-section-copy">
              <h2>Recent work.</h2>
              <p>
                Recent work spans healthcare support, skills training, household
                relief, and enterprise.
              </p>
            </div>

            <div className="home-community-visual-wrap">
              <a className="home-community-visual" href={withBasePath(`/projects/${currentCommunitySlide.slug}`)}>
                <img
                  src={currentCommunitySlide.src}
                  alt={currentCommunitySlide.alt}
                  width={currentCommunitySlide.width}
                  height={currentCommunitySlide.height}
                  decoding="async"
                />
                <div className="home-community-visual-copy">
                  <span>{currentCommunitySlide.label}</span>
                  <strong>{currentCommunitySlide.title}</strong>
                  <p>{currentCommunitySlide.summary}</p>
                </div>
              </a>

              <div className="home-community-dots" aria-label="Recent work carousel controls">
                {recentWorkSlides.map((project, index) => (
                  <button
                    aria-label={`Show ${project.title}`}
                    aria-pressed={index === activeCommunitySlide}
                    className={`home-community-dot ${index === activeCommunitySlide ? "is-active" : ""}`}
                    key={project.slug}
                    type="button"
                    onClick={() => setActiveCommunitySlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="home-community-list">
            {recentWorkSlides.map((project, index) => (
              <a
                className={`home-community-item ${index === activeCommunitySlide ? "is-active" : ""}`}
                href={withBasePath(`/projects/${project.slug}`)}
                key={project.slug}
                onFocus={() => setActiveCommunitySlide(index)}
                onMouseEnter={() => setActiveCommunitySlide(index)}
              >
                <span>{project.period}</span>
                <strong>{project.title}</strong>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="home-cta">
        <div className="container home-cta-row">
          <div className="home-cta-copy">
            <h2>In the news.</h2>
            <p>Coverage, interviews, and recent updates.</p>

            <div className="home-press-strip" aria-label="News outlets covering Kefas Ropshik">
              {featuredPressOutlets.map((item) => (
                <a
                  className="home-press-mark"
                  data-outlet={item.outlet.toLowerCase().replace(/\s+/g, "-")}
                  href={item.href}
                  key={item.outlet}
                  aria-label={item.outlet}
                >
                  {item.logoSrc ? (
                    <img
                      src={withBasePath(item.logoSrc)}
                      alt={`${item.outlet} logo`}
                      width={item.logoWidth}
                      height={item.logoHeight}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <span>{item.mark}</span>
                  )}
                </a>
              ))}
            </div>
          </div>
          <div className="actions home-actions">
            <Button href="/news" variant="primary">
              News
            </Button>
          </div>
        </div>
      </section>

      <section className="home-statement" aria-labelledby="home-statement-title">
        <div className="container">
          <a className="home-statement-card" href={withBasePath("/agenda")}>
            <blockquote id="home-statement-title">
              “I don't want to be remembered for how much money I have, but how many lives I have
              touched.”
            </blockquote>
            <img
              className="home-statement-signature"
              src={withBasePath("/generated/decorative/kefas-signature.png")}
              alt="Signature of Chief Kefas Wungak Ropshik"
              width="1856"
              height="378"
              loading="lazy"
              decoding="async"
            />
            <span className="home-statement-link">See Priorities</span>
          </a>
        </div>
      </section>
    </div>
  );
}
