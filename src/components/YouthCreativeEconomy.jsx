import { Button } from "./Button.jsx";
import { TrainingVisual } from "./Visuals.jsx";
import { youthFacts } from "../data/site.js";

export function YouthCreativeEconomy() {
  return (
    <section className="section youth" id="youth">
      <div className="container youth-grid">
        <div>
          <h2>Youth And Creative Economy</h2>
          <p>
            Creative, digital, and enterprise training for Plateau youths.
          </p>
          <div className="fact-list">
            {youthFacts.map((fact) => (
              <div className="fact-row" key={fact}>
                {fact}
              </div>
            ))}
          </div>
          <div className="actions">
            <Button href="/projects/plateau-youth-creative-digital-skills-training" variant="primary">
              Youth Impact
            </Button>
          </div>
        </div>
        <TrainingVisual />
      </div>
    </section>
  );
}
