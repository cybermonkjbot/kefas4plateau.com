import { Button } from "./Button.jsx";
import { closingGroups } from "../data/site.js";
import { withBasePath } from "../lib/sitePaths.js";

export function ClosingSection() {
  return (
    <section className="section closing">
      <div className="container">
        <div className="closing-grid">
          {closingGroups.map((group) => (
            <div className="closing-group" key={group.title}>
              <h3>{group.title}</h3>
              <p>{group.text}</p>
              <div className="closing-links">
                {group.links.map((link) => (
                  <a href={withBasePath(link.href)} key={link.label}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="actions">
          <Button href="/public-service" variant="light">
            Public Service
          </Button>
          <Button href="/news" variant="ghost">
            News
          </Button>
        </div>
      </div>
    </section>
  );
}
