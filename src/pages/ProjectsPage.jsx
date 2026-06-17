import { projects } from "../data/site.js";
import { withBasePath } from "../lib/sitePaths.js";
import { PageHero } from "./PageShell.jsx";

export function ProjectsPage({ slug }) {
  const selected = slug ? projects.find((project) => project.slug === slug) : null;

  if (slug && selected) {
    return <ProjectDetail project={selected} />;
  }

  return (
    <>
      <PageHero
        title="Projects"
        intro="Healthcare, youth, enterprise, and community support projects."
      />

      <section className="section">
        <div className="container project-records project-records--grid">
          {projects.map((project) => (
            <a className="project-record" href={withBasePath(`/projects/${project.slug}`)} key={project.slug}>
              {project.image ? (
                <div className="project-record-media">
                  <img
                    src={withBasePath(project.image)}
                    alt={project.imageAlt}
                    width="768"
                    height="768"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : null}
              <span>{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <dl>
                <div>
                  <dt>Period</dt>
                  <dd>{project.period}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{project.status}</dd>
                </div>
              </dl>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}

function ProjectDetail({ project }) {
  return (
    <>
      <PageHero
        title={project.title}
        intro={project.summary}
        aside={
          <>
            <strong>{project.category}</strong>
            <span>{project.location}</span>
            <span>{project.period}</span>
          </>
        }
      />
      <section className="section">
        <div className="container narrative-grid">
          <article>
            {project.image ? (
              <div className="project-detail-visual">
                <img src={withBasePath(project.image)} alt={project.imageAlt} width="768" height="768" decoding="async" />
              </div>
            ) : null}
            <h2>Project Overview</h2>
            <p>{project.summary}</p>
            <p>
              Key details about the project are shown here.
            </p>
          </article>
          <div className="record-table">
            <div><strong>Status</strong><span>{project.status}</span></div>
            <div><strong>Location</strong><span>{project.location}</span></div>
            <div><strong>Period</strong><span>{project.period}</span></div>
            <div><strong>Focus</strong><span>{project.usefulFor}</span></div>
          </div>
        </div>
      </section>
    </>
  );
}
