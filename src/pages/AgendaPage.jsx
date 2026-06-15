import { Suspense, lazy, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../components/Button.jsx";
import { agendaAreaBySlug, agendaAreas } from "../data/agenda.js";
import { stripBasePath, withBasePath } from "../lib/sitePaths.js";

const AgendaAmbientScene = lazy(() =>
  import("../components/AgendaAmbientScene.jsx").then((module) => ({ default: module.AgendaAmbientScene })),
);

const agendaInvestmentMessage = {
  headline: "Plateau can become a place people build in again.",
  body:
    "If you grew up here and love this state, you remember when Plateau carried stronger investor confidence and clearer economic momentum. The task now is to move past the fear created by insecurity, restore trust in public leadership, and make Plateau feel safe, investable, and full of promise again.",
  closing:
    "Security, jobs, healthcare, youth opportunity, and productive industry all point to one bigger goal: bringing long-term belief back home.",
};

const agendaInvestmentPalette = {
  "--agenda-page-bg": "#ede8de",
  "--agenda-page-surface": "rgba(255, 252, 246, 0.84)",
  "--agenda-page-line": "rgba(14, 67, 49, 0.14)",
  "--agenda-page-ink": "#102a1f",
  "--agenda-page-muted": "#526458",
  "--agenda-page-accent": "#0f6a4f",
  "--agenda-page-accent-soft": "rgba(15, 106, 79, 0.14)",
  "--agenda-page-glow": "rgba(74, 160, 124, 0.16)",
  "--agenda-page-glow-strong": "rgba(15, 106, 79, 0.24)",
};

function paletteStyle(area) {
  return {
    "--agenda-page-bg": area.palette.bg,
    "--agenda-page-surface": area.palette.surface,
    "--agenda-page-line": area.palette.line,
    "--agenda-page-ink": area.palette.ink,
    "--agenda-page-muted": area.palette.muted,
    "--agenda-page-accent": area.palette.accent,
    "--agenda-page-accent-soft": area.palette.accentSoft,
    "--agenda-page-glow": area.palette.glow,
    "--agenda-page-glow-strong": area.palette.glowStrong,
  };
}

function AgendaAmbientSceneLayer({ activeIndex, palette }) {
  return (
    <Suspense fallback={null}>
      <AgendaAmbientScene activeIndex={activeIndex} palette={palette} />
    </Suspense>
  );
}

function scrollPageTop() {
  window.scrollTo(0, 0);
  window.requestAnimationFrame(() => window.scrollTo(0, 0));
  window.setTimeout(() => window.scrollTo(0, 0), 0);
}

export function AgendaPage({ currentPath }) {
  const path = currentPath || (typeof window === "undefined" ? "/agenda" : stripBasePath(window.location.pathname));
  const slug = path.startsWith("/agenda/") ? path.replace("/agenda/", "") : "";
  const detail = slug ? agendaAreaBySlug[slug] : null;

  useEffect(() => {
    if (typeof window === "undefined") return;
    scrollPageTop();
  }, [path]);

  useEffect(() => {
    document.body.classList.add("immersive-agenda-page");

    return () => {
      document.body.classList.remove("immersive-agenda-page");
    };
  }, []);

  if (slug && !detail) {
    return <AgendaRouteRedirect href="/agenda" />;
  }

  if (detail) {
    return <AgendaDetailPage detail={detail} />;
  }

  return <AgendaOverviewPage />;
}

function AgendaOverviewPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef([]);
  const mobilePanelRefs = useRef([]);
  const mobileRailRefs = useRef([]);
  const closingSectionRef = useRef(null);
  const activeArea = agendaAreas[activeIndex];
  const nextArea = agendaAreas[(activeIndex + 1) % agendaAreas.length];
  const isLastArea = activeIndex === agendaAreas.length - 1;

  function focusStep(index) {
    const normalizedIndex = (index + agendaAreas.length) % agendaAreas.length;
    setActiveIndex(normalizedIndex);
    stepRefs.current[normalizedIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  function focusMobilePanel(index) {
    const normalizedIndex = (index + agendaAreas.length) % agendaAreas.length;
    setActiveIndex(normalizedIndex);
    mobilePanelRefs.current[normalizedIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function focusClosingSection() {
    closingSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  useEffect(() => {
    function handleKeyDown(event) {
      const targetTag = event.target?.tagName?.toLowerCase();
      if (targetTag === "input" || targetTag === "textarea" || event.metaKey || event.ctrlKey || event.altKey) return;
      if (window.innerWidth <= 980) return;

      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        if (activeIndex >= agendaAreas.length - 1) {
          focusClosingSection();
          return;
        }

        focusStep(activeIndex + 1);
      }

      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        if (activeIndex <= 0) {
          focusStep(0);
          return;
        }

        focusStep(activeIndex - 1);
      }

      if (event.key === "Home") {
        event.preventDefault();
        focusStep(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        focusStep(agendaAreas.length - 1);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (window.innerWidth <= 980) return;

        const nextEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (!nextEntry) return;

        const nextIndex = Number.parseInt(nextEntry.target.getAttribute("data-agenda-index") ?? "0", 10);
        if (!Number.isNaN(nextIndex)) {
          setActiveIndex(nextIndex);
        }
      },
      {
        threshold: [0.3, 0.55, 0.8],
        rootMargin: "-18% 0px -18% 0px",
      },
    );

    stepRefs.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (window.innerWidth > 980) return;

        const nextEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (!nextEntry) return;

        const nextIndex = Number.parseInt(nextEntry.target.getAttribute("data-agenda-mobile-index") ?? "0", 10);
        if (!Number.isNaN(nextIndex)) {
          setActiveIndex(nextIndex);
        }
      },
      {
        threshold: [0.45, 0.7],
        rootMargin: "-16% 0px -16% 0px",
      },
    );

    mobilePanelRefs.current.forEach((panel) => {
      if (panel) observer.observe(panel);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    mobileRailRefs.current[activeIndex]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeIndex]);

  return (
    <>
      <section
        className="agenda-overview"
        data-header-tone="green"
        style={paletteStyle(activeArea)}
      >
        <div className="agenda-stage-shell">
          <div className="agenda-stage-sticky">
            <AgendaAmbientSceneLayer palette={activeArea.palette} activeIndex={activeIndex} />
            <div className="container agenda-stage-grid">
              <div className="agenda-stage-copy">
                <p className="agenda-kicker">Kefiano&apos;s Priorities</p>
                <div className="agenda-stage-copy-main">
                  <span className="agenda-stage-count">0{activeIndex + 1}</span>
                  <div>
                    <h1>{activeArea.storyHeadline}</h1>
                    <p className="agenda-stage-summary">{activeArea.storyBody}</p>
                  </div>
                </div>
                <div className="agenda-stage-meta">
                  <div>
                    <span>Focus</span>
                    <strong>{activeArea.focus}</strong>
                  </div>
                  <div>
                    <span>Priority</span>
                    <strong>{activeArea.priority}</strong>
                  </div>
                </div>
                <div className="home-actions agenda-stage-actions">
                  <Button href={activeArea.href} variant="primary" withIcon>
                    Explore {activeArea.shortLabel}
                  </Button>
                  {isLastArea ? (
                    <button className="button button--secondary" type="button" onClick={focusClosingSection}>
                      Why investment returns
                    </button>
                  ) : (
                    <button
                      className="button button--secondary"
                      type="button"
                      onClick={() => focusStep(activeIndex + 1)}
                    >
                      See {nextArea.shortLabel}
                    </button>
                  )}
                </div>
              </div>

              <div className="agenda-stage-visuals">
                <div className="agenda-stage-progress" aria-hidden="true">
                  <span
                    className="agenda-stage-progress-bar"
                    style={{ "--agenda-progress": `${((activeIndex + 1) / agendaAreas.length) * 100}%` }}
                  />
                </div>
                <div className="agenda-stage-index" aria-label="Priority index">
                  {agendaAreas.map((area, index) => (
                    <button
                      aria-label={`Jump to ${area.title}`}
                      aria-current={index === activeIndex ? "true" : undefined}
                      className={`agenda-stage-index-item ${index === activeIndex ? "is-active" : ""}`}
                      key={area.slug}
                      type="button"
                      onClick={() => focusStep(index)}
                    >
                      <span>{`0${index + 1}`}</span>
                      <strong>{area.shortLabel}</strong>
                    </button>
                  ))}
                </div>

                <div className="agenda-scene-stack">
                  {agendaAreas.map((area, index) => (
                    <AgendaSceneCard
                      active={index === activeIndex}
                      area={area}
                      key={area.slug}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="agenda-scroll-steps" aria-hidden="true">
            {agendaAreas.map((area, index) => (
              <article
                className={`agenda-scroll-step ${index === activeIndex ? "is-active" : ""}`}
                data-agenda-index={index}
                key={area.slug}
                ref={(element) => {
                  stepRefs.current[index] = element;
                }}
              >
                <div className="agenda-scroll-step-copy">
                  <span>{area.shortLabel}</span>
                  <strong>{area.title}</strong>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="agenda-mobile-stack" id="agenda-mobile-scenes" style={paletteStyle(activeArea)}>
        <div className="container">
          <div className="agenda-mobile-rail" aria-label="Priority navigation">
            {agendaAreas.map((area, index) => (
              <button
                aria-current={index === activeIndex ? "true" : undefined}
                className={`agenda-mobile-rail-item ${index === activeIndex ? "is-active" : ""}`}
                key={area.slug}
                ref={(element) => {
                  mobileRailRefs.current[index] = element;
                }}
                type="button"
                onClick={() => focusMobilePanel(index)}
              >
                <span>{`0${index + 1}`}</span>
                <strong>{area.shortLabel}</strong>
              </button>
            ))}
          </div>
          {agendaAreas.map((area, index) => (
            <article
              className="agenda-mobile-panel"
              data-agenda-mobile-index={index}
              data-header-tone="green"
              id={`agenda-mobile-${area.slug}`}
              key={area.slug}
              ref={(element) => {
                mobilePanelRefs.current[index] = element;
              }}
              style={paletteStyle(area)}
            >
              <div className="agenda-mobile-visual">
                <img src={withBasePath(area.sceneAsset)} alt={area.sceneAlt} width="1024" height="1024" decoding="async" />
                <div className="agenda-mobile-overlay" />
                <div className="agenda-mobile-badge">{`0${index + 1}`}</div>
              </div>

              <div className="agenda-mobile-copy">
                <p className="agenda-kicker">{area.title}</p>
                <h2>{area.storyHeadline}</h2>
                <p className="agenda-mobile-body">{area.storyBody}</p>
                <div className="agenda-mobile-meta">
                  <div>
                    <span>Focus</span>
                    <strong>{area.focus}</strong>
                  </div>
                  <div>
                    <span>Priority</span>
                    <strong>{area.priority}</strong>
                  </div>
                </div>
                <div className="agenda-stage-highlights agenda-stage-highlights--mobile" aria-label={`${area.title} highlights`}>
                  {area.highlights.map((highlight) => (
                    <span key={highlight}>{highlight}</span>
                  ))}
                </div>
                <a className="button button--primary" href={withBasePath(area.href)}>
                  Explore {area.shortLabel}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="agenda-investment-section agenda-investment-section--mobile"
        data-header-tone="green"
        style={agendaInvestmentPalette}
      >
        <div className="container">
          <AgendaInvestmentSectionContent />
        </div>
      </section>

      <section
        className="agenda-investment-section"
        data-header-tone="green"
        id="agenda-investment"
        ref={closingSectionRef}
        style={agendaInvestmentPalette}
      >
        <div className="container">
          <AgendaInvestmentSectionContent />
        </div>
      </section>
    </>
  );
}

function AgendaDetailPage({ detail }) {
  const nextArea = agendaAreaBySlug[detail.nextSlug];
  const previousArea = agendaAreaBySlug[detail.previousSlug];
  const detailStyle = useMemo(() => paletteStyle(detail), [detail]);

  return (
    <div className="agenda-detail-page" data-header-tone="green" style={detailStyle}>
      <section className="agenda-detail-hero">
        <AgendaAmbientSceneLayer palette={detail.palette} activeIndex={detail.index} />
        <div className="container agenda-detail-grid">
          <div className="agenda-detail-copy">
            <a className="agenda-back-link" href={withBasePath("/agenda")}>
              <ArrowLeft aria-hidden="true" size={16} strokeWidth={2.4} />
              Back to all priorities
            </a>
            <p className="agenda-kicker">{detail.title}</p>
            <h1>{detail.storyHeadline}</h1>
            <p className="agenda-detail-intro">{detail.storyBody}</p>
            <div className="agenda-detail-meta">
              <div>
                <span>Focus</span>
                <strong>{detail.focus}</strong>
              </div>
              <div>
                <span>Priority</span>
                <strong>{detail.priority}</strong>
              </div>
            </div>
            <div className="agenda-stage-highlights agenda-detail-highlights" aria-label={`${detail.title} highlights`}>
              {detail.highlights.map((highlight) => (
                <span key={highlight}>{highlight}</span>
              ))}
            </div>
          </div>

          <AgendaSceneCard active area={detail} detailMode />
        </div>
      </section>

      <section className="agenda-detail-narrative">
        <div className="container">
          <div className="agenda-detail-head">
            <div>
              <p className="agenda-kicker">On the ground</p>
              <h2>How this priority should feel in everyday life.</h2>
            </div>
            <p>
              The test is whether people can see the change clearly, trust it quickly, and feel the difference in daily life.
            </p>
          </div>

          <div className="agenda-detail-track">
            {detail.detailSections.map((section, index) => (
              <article className="agenda-detail-block" key={section.title}>
                <span>{`0${index + 1}`}</span>
                <div>
                  <h3>{section.title}</h3>
                  <p>{section.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="agenda-detail-nav">
        <div className="container agenda-detail-nav-row">
          <a className="agenda-detail-nav-link" href={withBasePath(previousArea.href)}>
            <div className="agenda-detail-nav-media" aria-hidden="true">
              <img
                src={withBasePath(previousArea.sceneAsset)}
                alt=""
                width="1024"
                height="1024"
                decoding="async"
                style={{ objectPosition: previousArea.palette.scenePosition }}
              />
              <div className="agenda-detail-nav-scrim" />
            </div>
            <div className="agenda-detail-nav-copy">
              <span>Previous</span>
              <strong>{previousArea.title}</strong>
            </div>
          </a>
          <a className="button button--primary" href={withBasePath("/agenda")}>
            All priorities
          </a>
          <a className="agenda-detail-nav-link agenda-detail-nav-link--next" href={withBasePath(nextArea.href)}>
            <div className="agenda-detail-nav-media" aria-hidden="true">
              <img
                src={withBasePath(nextArea.sceneAsset)}
                alt=""
                width="1024"
                height="1024"
                decoding="async"
                style={{ objectPosition: nextArea.palette.scenePosition }}
              />
              <div className="agenda-detail-nav-scrim" />
            </div>
            <div className="agenda-detail-nav-copy">
              <span>Next</span>
              <strong>{nextArea.title}</strong>
              <ArrowRight aria-hidden="true" size={16} strokeWidth={2.4} />
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}

function AgendaSceneCard({ area, active, detailMode = false }) {
  const Icon = area.icon;

  return (
    <article className={`agenda-scene-card ${active ? "is-active" : ""} ${detailMode ? "is-detail" : ""}`}>
      <div className="agenda-scene-media">
        <img
          src={withBasePath(area.sceneAsset)}
          alt={area.sceneAlt}
          width="1024"
          height="1024"
          decoding="async"
          style={{ objectPosition: area.palette.scenePosition }}
        />
        <div className="agenda-scene-scrim" />
      </div>

      <div className="agenda-scene-frame" aria-hidden="true" />
      <div className="agenda-scene-content">
        <span className="agenda-scene-chip">
          <Icon aria-hidden="true" size={14} strokeWidth={2.4} />
          {area.shortLabel}
        </span>
        <strong>{area.title}</strong>
        <p>{area.summary}</p>
      </div>
    </article>
  );
}

function AgendaInvestmentSectionContent() {
  return (
    <div className="agenda-investment-shell">
      <div className="agenda-investment-map-wrap" aria-hidden="true">
        <div className="agenda-investment-map-halo" />
        <img
          className="agenda-investment-map"
          src={withBasePath("/generated/decorative/plateau-state-map-overlay.png")}
          alt=""
          width="625"
          height="399"
          decoding="async"
        />
      </div>
      <div className="agenda-investment-copy">
        <h2>{agendaInvestmentMessage.headline}</h2>
        <p>{agendaInvestmentMessage.body}</p>
        <p>{agendaInvestmentMessage.closing}</p>
      </div>
    </div>
  );
}

function AgendaRouteRedirect({ href }) {
  useEffect(() => {
    const targetHref = withBasePath(href);

    if (window.location.pathname !== targetHref) {
      window.location.replace(targetHref);
    }
  }, [href]);

  return null;
}
