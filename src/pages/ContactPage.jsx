import { contactMethods } from "../data/site.js";
import { InfoGrid, PageHero } from "./PageShell.jsx";

export function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact"
        intro="General enquiries, media requests, partnerships, and direct messages."
      />
      <section className="section">
        <div className="container contact-layout">
          <div>
            <InfoGrid items={contactMethods} />
          </div>
          <form className="contact-form">
            <label>
              Name
              <input type="text" placeholder="Your name" />
            </label>
            <label>
              Email
              <input type="email" placeholder="you@example.com" />
            </label>
            <label>
              Message
              <textarea rows="5" placeholder="How can we help?" />
            </label>
            <button type="button">Send Message</button>
          </form>
        </div>
      </section>
    </>
  );
}
