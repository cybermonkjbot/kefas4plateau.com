import { ArrowUpRight, BriefcaseBusiness, HandHeart, HeartPulse, MapPin } from "lucide-react";
import aboutHeroImage from "../../assets/kefiano-creative-hub.jpg";
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
    text: "Youth-focused civic platform publicly presenting Kefas as lead mentor.",
    href: "https://theconsensus.africa/",
    logo: consensusLogo,
  },
  {
    name: "Kefiano Farms",
    text: "Agriculture-facing venture connected to the wider Kefiano brand.",
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

export function AboutPage() {
  return (
    <>
      <PageHero
        title="About Kefiano"
        intro="Plateau roots, business experience, and community work."
        className="page-hero--about"
        style={{ "--page-hero-image": `url(${aboutHeroImage})` }}
      />

      <section className="section">
        <div className="container narrative-grid">
          <article>
            <h2>Leadership Story</h2>
            <p>
              Chief Kefas Wungak Ropshik, fondly known as Kefiano, is a prominent Nigerian
              entrepreneur, philanthropist, and politician from Plateau State. Born in the late
              1970s, he rose from a humble background to build a public profile rooted in business,
              philanthropy, and community influence.
            </p>
            <p>
              He is best known for building the Kefiano Group, which includes Kefiano Autos,
              Kefiano Farms, and Chillers by New Yorkers, and for using the Kefiano Global
              Foundation as a vehicle for healthcare support, poverty alleviation, and direct
              humanitarian intervention.
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
              Kefiano was the last child in his family and grew up experiencing financial hardship,
              an experience that shaped both his ambition and his later commitment to philanthropy.
            </p>
            <p>
              Starting with N200,000 from his father&apos;s retirement benefits, he built the
              Kefiano brand from scratch into a wider business group spanning automobile sales,
              agriculture, food, and hospitality. Today, the group is publicly associated with a
              strong automobile presence in Abuja and a broader footprint across multiple sectors.
            </p>
          </article>

          <div className="page-side">
            <div className="useful-note">
              <h3>Business footprint</h3>
              <p>
                The Kefiano Group is presented as a practical blend of commerce, local investment,
                and platform-building across autos, farming, food, and hospitality.
              </p>
            </div>
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
                Official sites and public pages where they are available.
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
            <p>Public institutions and initiatives connected to the work shown on this site.</p>
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
              Through the Kefiano Global Foundation, his public reputation is closely tied to
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
              The political message associated with him centers on moving Plateau from a consumer
              state to a stronger production hub, while keeping a humanity-first approach at the
              heart of governance, jobs, and public service.
            </p>
          </article>

          <div className="page-side">
            <div className="useful-note">
              <h3>Political focus</h3>
              <p>
                Production, jobs, healthcare, and practical community support, carried by a public
                philosophy that treats leadership as service.
              </p>
            </div>
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
