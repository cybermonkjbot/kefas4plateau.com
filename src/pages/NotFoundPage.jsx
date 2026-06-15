export function NotFoundPage() {
  return (
    <section className="section">
      <div className="container narrative-grid">
        <article>
          <h1>Page not found</h1>
          <p>The link you followed does not match a page on this site.</p>
          <p>
            Use the main sections below to keep exploring the public service work, priorities, and updates.
          </p>
        </article>

        <div className="page-side">
          <div className="useful-note">
            <h2>Quick links</h2>
            <div className="compact-list">
              <a href="/about">
                <strong>About Kefiano</strong>
                <span>Background and public story</span>
              </a>
              <a href="/public-service">
                <strong>Public Service</strong>
                <span>Healthcare, youth, community, and enterprise</span>
              </a>
              <a href="/agenda">
                <strong>Priorities</strong>
                <span>Security, jobs, healthcare, and growth</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
