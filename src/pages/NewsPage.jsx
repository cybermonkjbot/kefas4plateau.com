import { pressItems } from "../data/site.js";
import { withBasePath } from "../lib/sitePaths.js";
import { PageHero } from "./PageShell.jsx";

export function NewsPage() {
  return (
    <>
      <PageHero
        title="News"
        intro="Recent coverage and updates."
      />
      <section className="section">
        <div className="container">
          <div className="press-list">
            {pressItems.map((item) => (
              <a className="press-item" href={withBasePath(item.href)} key={`${item.outlet}-${item.title}`}>
                <span>{item.outlet} · {item.date}</span>
                <h2>{item.title}</h2>
                <p>{item.type}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
