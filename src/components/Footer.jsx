import marvengreyExpertsStrip from "../../assets/marvengrey-experts-strip.png";
import { footerSections } from "../data/site.js";
import { withBasePath } from "../lib/sitePaths.js";

export function Footer() {
  return (
    <>
      <div className="footer-scene" aria-hidden="true">
        <img src={withBasePath("/decorative/plateau-footer-silhouette.svg")} alt="" width="1600" height="220" decoding="async" />
      </div>
      <footer className="footer">
        <div className="container">
          <div className="footer-grid-wrap">
            <div className="footer-wordmark" aria-hidden="true" data-wordmark="Kefiano4Plateau">
              Kefiano4Plateau
            </div>
            <div className="footer-grid">
            <div>
              <h2>Kefas Ropshik</h2>
              <p>
                Public service, priorities, and ways to get in touch.
              </p>
            </div>
            {footerSections.map((section) => (
              <nav key={section.title} aria-label={`${section.title} footer navigation`}>
                <h3>{section.title}</h3>
                {section.links.map((link) => (
                  <a href={withBasePath(link.href)} key={link.label}>
                    {link.label}
                  </a>
                ))}
              </nav>
            ))}
            </div>
          </div>
          <div className="copyright">
            © 2026 Kefas Wungak Ropshik. All rights reserved.
          </div>
        </div>
      </footer>
      <div className="footer-support-strip">
        <div className="container">
          <div className="footer-support">
            <img
              className="footer-support-banner"
              src={marvengreyExpertsStrip}
              alt="From the Experts at Marven Grey"
              width="1198"
              height="138"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </>
  );
}
