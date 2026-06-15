import { MapPin, Stethoscope } from "lucide-react";
import { Button } from "./Button.jsx";
import { HospitalVisual } from "./Visuals.jsx";

export function FeaturedProject() {
  return (
    <section className="section project-feature" id="featured-project">
      <div className="container project-grid">
        <HospitalVisual />
        <div className="project-content">
          <div className="section-rule" aria-hidden="true" />
          <h2>JUTH Accident And Emergency Unit</h2>
          <p>
            A practical healthcare intervention at Jos University Teaching
            Hospital.
          </p>
          <div className="metadata">
            <div>
              <strong>
                <Stethoscope aria-hidden="true" size={16} /> Category
              </strong>
              Healthcare
            </div>
            <div>
              <strong>
                <MapPin aria-hidden="true" size={16} /> Location
              </strong>
              Jos, Plateau State
            </div>
            <div>
              <strong>Status</strong>
              Completed
            </div>
          </div>
          <div className="actions">
            <Button href="/projects/juth-accident-emergency-unit-renovation" variant="primary">
              View Project
            </Button>
            <Button href="/public-service" variant="secondary">
              Public Service
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
