import { Button } from "./Button.jsx";
import { withBasePath } from "../lib/sitePaths.js";
import { LandscapeVisual } from "./Visuals.jsx";

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-copy">
          <h1>Kefas Ropshik</h1>
          <p>
            Public service work, projects, and priorities for Plateau State.
          </p>
          <div className="actions">
            <Button href="/public-service" variant="primary">
              Public Service
            </Button>
            <Button href="/about" variant="secondary">
              About Kefiano
            </Button>
            <a className="text-link" href={withBasePath("/news")}>
              News
            </a>
          </div>
        </div>
        <LandscapeVisual />
      </div>
    </section>
  );
}
