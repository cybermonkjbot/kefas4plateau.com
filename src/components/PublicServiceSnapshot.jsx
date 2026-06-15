import { serviceItems } from "../data/site.js";

export function PublicServiceSnapshot() {
  return (
    <section className="section snapshot" id="public-service">
      <div className="container">
        <div className="section-head">
          <h2>Public Service</h2>
          <p>
            Work across healthcare, youth, community support, and enterprise.
          </p>
        </div>

        <div className="service-list">
          {serviceItems.map((item) => {
            const Icon = item.icon;
            return (
              <a className="service-item" href={item.href} key={item.title}>
                <span className="service-mark">
                  <Icon aria-hidden="true" size={21} strokeWidth={2.4} />
                </span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
