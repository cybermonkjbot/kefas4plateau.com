import { withBasePath } from "../lib/sitePaths.js";

export function PageHero({ title, intro, aside, className = "", style }) {
  return (
    <section className={`page-hero ${className}`.trim()} style={style}>
      <div className="container page-hero-grid">
        <div>
          <div className="section-rule" aria-hidden="true" />
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
        {aside ? <aside className="page-hero-aside">{aside}</aside> : null}
      </div>
    </section>
  );
}

export function InfoGrid({ items, className = "" }) {
  return (
    <div className={`info-grid ${className}`}>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <article className="info-panel" key={item.title}>
            {Icon ? (
              <span className="service-mark">
                <Icon aria-hidden="true" size={21} strokeWidth={2.4} />
              </span>
            ) : null}
            <h3>{item.title}</h3>
            <p>{item.text || item.summary}</p>
            {item.href ? <a href={withBasePath(item.href)}>View details</a> : null}
          </article>
        );
      })}
    </div>
  );
}
