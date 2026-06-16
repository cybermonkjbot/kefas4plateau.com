import { ArrowUpRight } from "lucide-react";
import { agendaAreas } from "../data/agenda.js";
import { plateauLgaMap } from "../data/plateauLgaMap.js";
import { withBasePath } from "../lib/sitePaths.js";

const plateauMapPalette = [
  {
    fill: "#cfe9db",
    fillActive: "#0f8c61",
    stroke: "rgba(14, 61, 42, 0.24)",
    strokeActive: "#0f6a4f",
  },
  {
    fill: "#ece1c9",
    fillActive: "#c88728",
    stroke: "rgba(91, 66, 34, 0.24)",
    strokeActive: "#9b6318",
  },
  {
    fill: "#efd0cb",
    fillActive: "#c94e45",
    stroke: "rgba(99, 42, 35, 0.24)",
    strokeActive: "#9f2f28",
  },
  {
    fill: "#d9e5f2",
    fillActive: "#4b79b8",
    stroke: "rgba(45, 67, 96, 0.22)",
    strokeActive: "#345c94",
  },
  {
    fill: "#dce7d0",
    fillActive: "#6d9736",
    stroke: "rgba(52, 70, 34, 0.22)",
    strokeActive: "#577824",
  },
];

const interactiveLgas = plateauLgaMap.lgas.map((lga, index) => ({
  ...lga,
  theme: plateauMapPalette[index % plateauMapPalette.length],
}));

export function PlateauPage() {
  return (
    <div className="plateau-page" data-header-tone="green">
      <section className="plateau-blueprint-hero">
        <div className="container plateau-blueprint-copy">
          <p className="plateau-blueprint-kicker">Plateau first</p>
          <h1>Kefas blueprint for Plateau.</h1>
          <p className="plateau-blueprint-intro">
            A clearer view of Plateau, mapped by local government area and grounded in the priorities
            this campaign is building toward.
          </p>
        </div>
      </section>

      <section className="plateau-map-section">
        <div className="container plateau-map-shell">
          <div className="plateau-map-wrap">
            <div className="plateau-map-halo" aria-hidden="true" />

            <div className="plateau-map-frame">
              <svg
                className="plateau-map-svg"
                viewBox={plateauLgaMap.viewBox}
                role="img"
                aria-label="Interactive map of Plateau State showing each local government area."
              >
                {interactiveLgas.map((lga) => {
                  return (
                    <path
                      key={lga.id}
                      className="plateau-map-region"
                      d={lga.path}
                      aria-label={lga.name}
                      style={{
                        "--region-fill": lga.theme.fill,
                        "--region-fill-active": lga.theme.fillActive,
                        "--region-stroke": lga.theme.stroke,
                        "--region-stroke-active": lga.theme.strokeActive,
                      }}
                    >
                      <title>{lga.name}</title>
                    </path>
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="plateau-map-actions">
            <a className="button button--primary" href={withBasePath("/agenda")}>
              <span>See all priorities</span>
            </a>
          </div>

          <div className="plateau-priority-grid">
            {agendaAreas.map((area) => {
              return (
                <a className="plateau-priority-outline" href={withBasePath(area.href)} key={area.slug}>
                  <strong>{area.title}</strong>
                  <p>{area.summary}</p>
                  <span className="plateau-priority-link">
                    Explore
                    <ArrowUpRight aria-hidden="true" size={16} strokeWidth={2.4} />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
