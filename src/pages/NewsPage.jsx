import { pressItems } from "../data/site.js";
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
              <a className="press-item" href={item.href} key={`${item.outlet}-${item.title}`}>
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
