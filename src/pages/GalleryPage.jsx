import { gallerySections } from "../data/gallery.js";
import { PageHero } from "./PageShell.jsx";

export function GalleryPage() {
  return (
    <>
      <PageHero
        title="Gallery"
        intro="A full visual library of portraits, projects, outreach, ventures, and public moments."
      />
      <section className="section gallery-page-section">
        <div className="container">
          <div className="gallery-stack">
            {gallerySections.map((section) => (
              <section className="gallery-section" key={section.title}>
                <div className="gallery-section-head">
                  <div>
                    <h2>{section.title}</h2>
                    <p>{section.text}</p>
                  </div>
                  <span>{section.items.length} images</span>
                </div>
                <div className="gallery-grid">
                  {section.items.map((item) => (
                    <figure className="gallery-item" key={`${section.title}-${item.src}`}>
                      <div className="gallery-item-media">
                        <img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
                      </div>
                      <figcaption>{item.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
