import { ArrowUpRight, BriefcaseBusiness, HandHeart, HeartPulse, MapPin } from "lucide-react";
import communityReliefImage from "../../assets/about/community-relief.jpg";
import celebrationFeastImage from "../../assets/about/celebration-feast.jpg";
import leadershipGuestsImage from "../../assets/about/leadership-guests.jpg";
import handshakeEventImage from "../../assets/about/handshake-event.jpg";
import communitySeatingImage from "../../assets/about/community-seating.jpg";
import ceremonialEntryImage from "../../assets/about/ceremonial-entry.jpg";
import stagePortraitImage from "../../assets/about/stage-portrait.jpg";
import communityAudienceImage from "../../assets/about/community-audience.jpg";
import outdoorVisitImage from "../../assets/about/outdoor-visit.jpg";
import juthLogo from "../../assets/juth-logo.png";
import foundationLogo from "../../assets/kefiano-global-foundation-logo.jpg";
import consensusLogo from "../../assets/the-consensus-logo.png";
import farmsLogo from "../../assets/kefiano-farms-logo.jpg";
import { affiliatedVentures } from "../data/site.js";
import { InfoGrid, PageHero } from "./PageShell.jsx";

const relatedOrganizations = [
  {
    name: "Kefiano Global Foundation",
    text: "Foundation work across healthcare, outreach, and community support.",
    href: "https://www.facebook.com/kefianofoundation/",
    logo: foundationLogo,
  },
  {
    name: "JUTH",
    text: "Institution linked to the Accident and Emergency Unit project in Jos.",
    href: "https://juth.gov.ng/",
    logo: juthLogo,
  },
  {
    name: "The Consensus",
    text: "Youth community featuring Kefas as a mentor.",
    href: "https://theconsensus.africa/",
    logo: consensusLogo,
  },
  {
    name: "Kefiano Farms",
    text: "Agriculture venture focused on farming and local production.",
    href: "https://www.youtube.com/@KefianoFarms",
    logo: farmsLogo,
  },
];

const quickFacts = [
  "Real Name: Chief Kefas Wungak Ropshik",
  "Moniker: Kefiano",
  "State of Origin: Plateau State, Nigeria",
  "Notable Businesses: Kefiano Group across automobiles, agriculture, and hospitality",
];

const impactMilestones = [
  "Free medical outreaches for more than 59,000 people.",
  "Sponsored surgeries for nearly 4,000 individuals.",
  "Renovated the Accident and Emergency Unit of Jos University Teaching Hospital.",
  "Annual support for more than 2,000 widows and care for numerous children.",
  "Helped secure the release and empowerment of over 120 inmates from correctional facilities.",
];

const leadPhotos = [
  {
    src: stagePortraitImage,
    alt: "Kefiano standing on a decorated event stage in white attire with a ceremonial staff.",
    caption: "Public life anchored in visibility, symbolism, and direct connection with people.",
    className: "about-photo-card about-photo-card--featured",
  },
  {
    src: outdoorVisitImage,
    alt: "Kefiano speaking with residents during an outdoor visit beside a public building.",
    caption: "Site visits and direct engagement on the ground.",
    className: "about-photo-card",
  },
  {
    src: communityReliefImage,
    alt: "A community support handover with branded relief materials during an outdoor gathering.",
    caption: "Community support that stays practical and visible.",
    className: "about-photo-card",
  },
];

const publicMoments = [
  {
    src: leadershipGuestsImage,
    alt: "Kefiano with guests at a public event under draped lighting.",
    caption: "Public moments that build relationships, trust, and wider recognition.",
  },
  {
    src: handshakeEventImage,
    alt: "Kefiano greeting another attendee during a formal event.",
    caption: "A style of leadership shaped by presence, access, and conversation.",
  },
  {
    src: celebrationFeastImage,
    alt: "A ceremonial celebration scene with a large feast carried through an event hall.",
    caption: "Large gatherings that signal reach, hospitality, and social capital.",
  },
];

function PhotoCard({ photo }) {
  return (
    <figure className={photo.className || "about-photo-card"}>
      <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
      <figcaption>{photo.caption}</figcaption>
    </figure>
  );
}

export function AboutPage() {
  return (
    <>
      <PageHero
        title="About Kefiano"
        intro="Plateau roots, business experience, and community work."
        className="page-hero--about"
        style={{ "--page-hero-image": `url(${stagePortraitImage})` }}
      />

      <section className="section about-photo-lead-section">
        <div className="container about-photo-lead">
          {leadPhotos.map((photo) => (
            <PhotoCard key={photo.src} photo={photo} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container narrative-grid">
          <article>
            <h2>Leadership Story</h2>
            <p>
              Chief Kefas Wungak Ropshik, widely known as Kefiano, is an entrepreneur,
              philanthropist, and political figure from Plateau State. He is known for business
              work, direct community engagement, and a record of giving.
            </p>
            <p>
              Over time, his work has expanded through business ventures, the Kefiano Global
              Foundation, and a broader public role that links philanthropy, leadership, and local
              development.
            </p>
          </article>

          <div className="page-side">
            <div className="useful-note">
              <h3>Quick facts</h3>
              <div className="fact-list">
                {quickFacts.map((fact) => (
                  <div className="fact-row" key={fact}>
                    {fact}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container narrative-grid">
          <article>
            <h2>Early Life And Business Career</h2>
            <p>
              Kefiano grew up in a modest setting, and that early experience is often linked to the
              urgency behind both his ambition and his humanitarian work.
            </p>
            <p>
              Starting with limited capital, he built the Kefiano name into a wider group with
              links to automobiles, agriculture, food, and hospitality. That business background
              remains a key part of his work and public life.
            </p>
          </article>

          <div className="page-side">
            <div className="useful-note">
              <h3>Business footprint</h3>
              <p>
                The Kefiano Group spans autos, farming, food, and hospitality, with a focus on
                local investment and growth.
              </p>
            </div>

            <figure className="about-inline-visual">
              <img
                src={communityAudienceImage}
                alt="A large seated audience gathered under a canopy during a community event."
                loading="lazy"
                decoding="async"
              />
              <figcaption>Community turnout and listening have remained a visible part of the work.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container narrative-grid">
          <article>
            <h2>Businesses And Institutions</h2>
            <p>
              These are the main ventures and institutions linked to Kefas
              Ropshik.
            </p>
          </article>

          <div className="page-side">
            <div className="useful-note">
              <h3>Links</h3>
              <p>
                Official links where available.
              </p>
            </div>
          </div>
        </div>

        <div className="container venture-list">
          {affiliatedVentures.map((venture) => (
            <a
              className="venture-row"
              href={venture.href}
              key={venture.title}
              rel="noreferrer"
              target="_blank"
            >
              <div>
                <h3>{venture.title}</h3>
                <p>{venture.text}</p>
              </div>
              <span>
                {venture.cta}
                <ArrowUpRight aria-hidden="true" size={18} strokeWidth={2.2} />
              </span>
            </a>
          ))}
        </div>

        <div className="container about-organizations">
          <div className="about-organizations-copy">
            <h3>Related organizations</h3>
            <p>Institutions and groups connected to this work.</p>
          </div>

          <div className="about-organizations-grid">
            {relatedOrganizations.map((organization) => (
              <a
                className="about-organization"
                href={organization.href}
                key={organization.name}
                rel="noreferrer"
                target="_blank"
              >
                <span className="about-organization-logo">
                  <img
                    src={organization.logo}
                    alt={`${organization.name} logo`}
                    width={organization.name === "JUTH" ? 180 : organization.name === "The Consensus" ? 170 : organization.name === "Kefiano Global Foundation" ? 500 : 900}
                    height={organization.name === "JUTH" ? 60 : organization.name === "The Consensus" ? 54 : organization.name === "Kefiano Global Foundation" ? 500 : 900}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <div>
                  <strong>{organization.name}</strong>
                  <p>{organization.text}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container narrative-grid">
          <article>
            <h2>Philanthropy And Healthcare</h2>
            <p>
              Through the Kefiano Global Foundation, his work is closely tied to
              large-scale humanitarian work in Plateau State and beyond, especially in healthcare,
              household support, and poverty alleviation.
            </p>
            <p>
              One of the most visible interventions linked to his name is the renovation of the
              Jos University Teaching Hospital Accident and Emergency Unit, alongside recurring
              support for widows, children, medical outreach, and vulnerable households.
            </p>
          </article>

          <div className="page-side">
            <div className="useful-note">
              <h3>Impact at a glance</h3>
              <div className="fact-list">
                {impactMilestones.map((fact) => (
                  <div className="fact-row" key={fact}>
                    {fact}
                  </div>
                ))}
              </div>
            </div>

            <figure className="about-inline-visual">
              <img
                src={communitySeatingImage}
                alt="Kefiano seated with supporters during a daytime gathering."
                loading="lazy"
                decoding="async"
              />
              <figcaption>Support work is often framed around access, closeness, and direct contact with people.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section split-surface">
        <div className="container narrative-grid">
          <article>
            <h2>Political Aspirations</h2>
            <p>
              After years of visible community intervention, Kefiano moved more directly into
              politics and emerged as the youngest gubernatorial aspirant in Plateau State for the
              2023 elections under the Peoples Democratic Party.
            </p>
            <p>
              His political focus centers on jobs, local production, and public service, with a
              people-first approach to governance.
            </p>
          </article>

          <div className="page-side">
            <div className="useful-note">
              <h3>Political focus</h3>
              <p>
                Production, jobs, healthcare, and practical community support, with leadership
                treated as service.
              </p>
            </div>

            <figure className="about-inline-visual">
              <img
                src={ceremonialEntryImage}
                alt="Kefiano making an entrance at a formal gathering in white attire with a ceremonial staff."
                loading="lazy"
                decoding="async"
              />
              <figcaption>Symbolic public appearances are used to reinforce identity, message, and momentum.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Moments From The Journey</h2>
              <p>
                A few scenes that show the mix of community presence, ceremony, and public
                engagement around the work.
              </p>
            </div>
          </div>

          <div className="about-moment-grid">
            {publicMoments.map((photo) => (
              <figure className="about-moment" key={photo.src}>
                <div className="about-moment-media">
                  <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
                </div>
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section split-surface">
        <div className="container">
          <h2>What Informs The Work</h2>
          <InfoGrid
            items={[
              {
                title: "Plateau Roots",
                text: "Local identity and community listening.",
                icon: MapPin,
              },
              {
                title: "Business Background",
                text: "Private-sector experience.",
                icon: BriefcaseBusiness,
              },
              {
                title: "Foundation Work",
                text: "Healthcare, youth, and community support.",
                icon: HandHeart,
              },
              {
                title: "Visible Delivery",
                text: "Practical work people can point to.",
                icon: HeartPulse,
              },
            ]}
          />
        </div>
      </section>
    </>
  );
}
