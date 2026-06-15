import { projects, publicServiceDetails, serviceItems } from "../data/site.js";
import { stripBasePath, withBasePath } from "../lib/sitePaths.js";
import { InfoGrid, PageHero } from "./PageShell.jsx";

export function PublicServicePage({ currentPath }) {
  const path = currentPath || (typeof window === "undefined" ? "/public-service" : stripBasePath(window.location.pathname));
  const slug = path.startsWith("/public-service/") ? path.replace("/public-service/", "") : "";
  const detail = slug ? publicServiceDetails[slug] : null;

  if (detail) {
    return <PublicServiceDetail detail={detail} />;
  }

  return (
    <>
      <PageHero
        title="Public Service"
        intro="Work across healthcare, youth, community support, and enterprise."
      />
      <section className="section">
        <div className="container">
          <InfoGrid items={serviceItems} />
        </div>
      </section>
      <section className="section split-surface">
        <div className="container">
          <h2>Related Projects</h2>
          <div className="compact-list">
            {projects.slice(0, 6).map((project) => (
              <a href={withBasePath(`/projects/${project.slug}`)} key={project.slug}>
                <strong>{project.title}</strong>
                <span>{project.category} · {project.period}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function PublicServiceDetail({ detail }) {
  const relatedProjects = detail.relatedProjectSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter(Boolean);

  return (
    <>
      <PageHero
        title={detail.title}
        intro={detail.intro}
        className="page-hero--detail-overlay"
        aside={
          <>
            <strong>{detail.emphasis}</strong>
            <span>Sources and related projects are below.</span>
          </>
        }
      />

      <section className="section source-section split-surface">
        <div className="container">
          {detail.image ? (
            <div className="public-service-visual">
              <img src={withBasePath(detail.image)} alt={detail.imageAlt} width="900" height="900" decoding="async" />
            </div>
          ) : null}
          <h2>Coverage</h2>
          <div className="source-list">
            {detail.articles.map((article) => (
              <a
                className="source-row"
                href={withBasePath(article.href)}
                key={`${article.outlet}-${article.title}`}
                rel="noreferrer"
                target="_blank"
              >
                <div className="source-main">
                  <span>{article.outlet} · {article.date}</span>
                  <h3>{article.title}</h3>
                  <p>{article.summary}</p>
                </div>
                {article.quote ? <blockquote>{article.quote}</blockquote> : null}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Related Projects</h2>
          <div className="compact-list">
            {relatedProjects.map((project) => (
              <a href={withBasePath(`/projects/${project.slug}`)} key={project.slug}>
                <strong>{project.title}</strong>
                <span>{project.category} · {project.period}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
