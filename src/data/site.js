import {
  BriefcaseBusiness,
  HandHeart,
  HeartPulse,
  Mail,
  Newspaper,
  ShieldCheck,
  Sprout,
  UsersRound,
} from "lucide-react";
import { agendaAreas } from "./agenda.js";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About Kefiano", href: "/about" },
  {
    label: "Public Service",
    href: "/public-service",
    key: "public-service",
    children: [
      { label: "Healthcare", href: "/public-service/healthcare" },
      { label: "Youth & Innovation", href: "/public-service/youth-innovation" },
      { label: "Community Support", href: "/public-service/community-support" },
      { label: "Enterprise Support", href: "/public-service/enterprise-support" },
    ],
  },
  {
    label: "Priorities",
    href: "/agenda",
    key: "agenda",
    children: agendaAreas.map((area) => ({ label: area.title, href: area.href })),
  },
];

export const serviceItems = [
  {
    title: "Healthcare",
    text: "Hospital support, including the JUTH Accident and Emergency Unit renovation.",
    href: "/public-service/healthcare",
    icon: HeartPulse,
  },
  {
    title: "Youth & Innovation",
    text: "Skills, mentorship, and enterprise training for young people.",
    href: "/public-service/youth-innovation",
    icon: UsersRound,
  },
  {
    title: "Community Support",
    text: "Support programmes for widows and other vulnerable households.",
    href: "/public-service/community-support",
    icon: HandHeart,
  },
  {
    title: "Enterprise Support",
    text: "Business experience and support for local enterprise.",
    href: "/about",
    icon: BriefcaseBusiness,
  },
];

export const youthFacts = [
  "Creative and digital training",
  "119 youth trainees",
  "Jos-based hub",
  "Mentorship and enterprise focus",
];

export const closingGroups = [
  {
    title: "Community Projects",
    text: "Food relief, household support, and small-business assistance.",
    links: [
      { label: "Widows Support", href: "/projects/new-year-support-widows-shendam-pankshin-kanke" },
      { label: "Food Relief", href: "/projects/rice-distribution-less-privileged-households" },
      { label: "Enterprise Support", href: "/projects/entrepreneurship-support-for-widows" },
    ],
    icon: HandHeart,
  },
  {
    title: "Public Priorities",
    text: "Security, youth opportunity, jobs, healthcare, agriculture, and inclusion.",
    links: [
      { label: "Security & Peace", href: "/agenda/security-peace", icon: ShieldCheck },
      { label: "Jobs & Enterprise", href: "/agenda/jobs-enterprise", icon: BriefcaseBusiness },
      { label: "Agriculture & Industry", href: "/agenda/agriculture-industry", icon: Sprout },
    ],
  },
];

export const footerSections = [
  {
    title: "Explore",
    links: [
      { label: "About Kefiano", href: "/about" },
      { label: "Public Service", href: "/public-service" },
      { label: "News", href: "/news" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Public Service",
    links: [
      { label: "Healthcare", href: "/public-service/healthcare" },
      { label: "Youth & Innovation", href: "/public-service/youth-innovation" },
      { label: "Community Support", href: "/public-service/community-support" },
      { label: "Enterprise Support", href: "/public-service/enterprise-support" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { label: "Pledge", href: "/pledge" },
      { label: "Contact", href: "/contact" },
      { label: "Media and partnerships", href: "/contact" },
    ],
  },
];

export const projects = [
  {
    title: "JUTH Accident And Emergency Unit",
    slug: "juth-accident-emergency-unit-renovation",
    category: "Healthcare",
    status: "Completed",
    location: "Jos University Teaching Hospital, Jos",
    period: "2024",
    summary:
      "Renovation and equipping of JUTH's Accident and Emergency Unit.",
    usefulFor: "Healthcare infrastructure",
    image: "/photos/projects/juth-ae-cover.jpg",
    imageAlt: "Chief Kefas Wungak Ropshik speaking with people outside the renovated JUTH Accident and Emergency Unit.",
  },
  {
    title: "Doctors' Welfare And Education Support",
    slug: "doctors-welfare-medical-education-support",
    category: "Healthcare / Education",
    status: "Professional support",
    location: "Jos University Teaching Hospital, Jos",
    period: "2025",
    summary:
      "Support for doctors, graduates, and medical welfare.",
    usefulFor: "Medical education and professional support",
    image: "/photos/projects/doctors-welfare-cover.jpg",
    imageAlt: "Kefas Ropshik with doctors during a healthcare support event.",
  },
  {
    title: "Kefiano Creative Hub",
    slug: "kefiano-creative-hub",
    category: "Youth / Innovation",
    status: "Active",
    location: "Jos, Plateau State",
    period: "2024",
    summary:
      "A Jos-based hub for skills, mentorship, and enterprise.",
    usefulFor: "Youth development and creative economy",
    image: "/photos/projects/creative-hub-cover.jpg",
    imageAlt: "Kefas Ropshik speaking in front of a Kefiano Creative Hub backdrop.",
  },
  {
    title: "Plateau Youth Skills Training",
    slug: "plateau-youth-creative-digital-skills-training",
    category: "Youth / Skills",
    status: "Completed cohort",
    location: "Plateau State",
    period: "2024",
    summary:
      "Creative and digital training for 119 Plateau youths.",
    usefulFor: "Youth skills and creative economy",
    image: "/photos/projects/youth-training-cover.jpg",
    imageAlt: "Participants gathered during a Kefiano Creative Hub training event.",
  },
  {
    title: "Widows Support Across Three LGAs",
    slug: "new-year-support-widows-shendam-pankshin-kanke",
    category: "Community Support",
    status: "Completed outreach",
    location: "Shendam, Pankshin, and Kanke LGAs",
    period: "January 2025",
    summary:
      "Food support for over 1,190 widows in three LGAs.",
    usefulFor: "Social support outreach",
    image: "/photos/projects/widows-support-cover.jpg",
    imageAlt: "Chief Kefas Ropshik with widows and orphans during a community outreach event in Jos.",
  },
  {
    title: "Birthday Outreach For Vulnerable Groups",
    slug: "birthday-outreach-widows-orphans-vulnerable-groups",
    category: "Community Support",
    status: "Completed outreach",
    location: "Jos, Plateau State",
    period: "December 2024",
    summary:
      "Food and startup support for vulnerable groups.",
    usefulFor: "Community welfare and social support",
    image: "/photos/projects/birthday-outreach-cover.jpg",
    imageAlt: "Chief Kefas Ropshik during a Plateau community support event covered by local media.",
  },
  {
    title: "Food Relief Outreach",
    slug: "rice-distribution-less-privileged-households",
    category: "Food Relief",
    status: "Recurring outreach",
    location: "Parts of Plateau State",
    period: "2023-2025",
    summary:
      "Recurring food relief for vulnerable households.",
    usefulFor: "Recurring relief work",
    image: "/photos/projects/food-relief-cover.jpg",
    imageAlt: "Kefas Ropshik during a community gathering used in outreach and programme media.",
  },
  {
    title: "Widows Entrepreneurship Support",
    slug: "entrepreneurship-support-for-widows",
    category: "Enterprise Support",
    status: "Enterprise support",
    location: "Plateau State",
    period: "2024-2025",
    summary:
      "Startup support and enterprise training.",
    usefulFor: "Small-business and household enterprise",
    image: "/photos/projects/enterprise-support-cover.jpg",
    imageAlt: "Chief Kefas Ropshik during a Plateau community support event tied to startup and livelihood support.",
  },
];

export { agendaAreas } from "./agenda.js";

export const pressItems = [
  {
    outlet: "JUTH",
    title: "Chief Kefiano renovates and commissions Accident and Emergency Unit",
    date: "2024",
    type: "Institutional acknowledgement",
    href: "https://juth.gov.ng/chief-kefiano-renovates-and-commissions-accident-and-emergency-unit-in-juth/",
  },
  {
    outlet: "Vanguard",
    title: "119 Plateau youths trained in diverse skills",
    date: "2024",
    type: "Youth training",
    href: "https://www.vanguardngr.com/2024/05/119-plateau-youths-trained-in-diverse-skills-for-self-employment/",
  },
  {
    outlet: "The Nation",
    title: "Kefas Ropshik rewards excellence, calls for improved doctors' welfare",
    date: "2025",
    type: "Healthcare / education",
    href: "https://thenationonlineng.net/kefas-ropshik-rewards-excellence-calls-for-improved-welfare-for-nigerian-doctors/",
  },
  {
    outlet: "Guardian",
    title: "Ropshik clinches Plateau PDP governorship ticket, vows one-term tenure",
    date: "2026",
    type: "Political news report",
    href: "https://guardian.ng/politics/ropshik-clinches-plateau-pdp-governorship-ticket-vows-to-serve-one-term/",
  },
  {
    outlet: "Premium Times",
    title: "Plateau PDP factions produce different governorship candidates",
    date: "2026",
    type: "Political news report",
    href: "https://www.premiumtimesng.com/news/more-news/883171-drama-unfolds-in-plateau-pdp-factions-different-governorship-candidates.html",
  },
];

export const featuredPressOutlets = [
  {
    outlet: "Vanguard",
    href: "https://www.vanguardngr.com/2024/05/119-plateau-youths-trained-in-diverse-skills-for-self-employment/",
    mark: "Vanguard",
  },
  {
    outlet: "Leadership",
    href: "https://leadership.ng/foundation-renovates-emergency-unit-of-juth/",
    mark: "Leadership",
  },
  {
    outlet: "BusinessDay",
    href: "https://businessday.ng/news/article/how-kefas-touches-lives-of-widows-orphans-boosts-businesses-in-plateau/",
    mark: "BusinessDay",
    logoSrc: "/press-logos/businessday.png",
    logoWidth: 257,
    logoHeight: 50,
  },
  {
    outlet: "National Accord",
    href: "https://www.nationalaccordnewspaper.com/kefas-ropshik-distributes-new-tear-gifts-to-over-1190-widows-in-plateau/",
    mark: "National Accord",
    logoSrc: "/press-logos/national-accord.jpg",
    logoWidth: 637,
    logoHeight: 109,
  },
  {
    outlet: "Techpression",
    href: "https://techpression.com/well-go-further-than-ai-and-empower-the-youths/",
    mark: "Techpression",
    logoSrc: "/press-logos/techpression.png",
    logoWidth: 1996,
    logoHeight: 489,
  },
  {
    outlet: "The Nation",
    href: "https://thenationonlineng.net/kefas-ropshik-rewards-excellence-calls-for-improved-welfare-for-nigerian-doctors/",
    mark: "The Nation",
  },
  {
    outlet: "Guardian",
    href: "https://guardian.ng/politics/ropshik-clinches-plateau-pdp-governorship-ticket-vows-to-serve-one-term/",
    mark: "Guardian",
  },
];

export const contactMethods = [
  {
    title: "Office",
    icon: Newspaper,
    text: "General enquiries, visits, and media requests.",
  },
  {
    title: "Contact",
    icon: Mail,
    text: "Community groups, partnerships, and direct messages.",
  },
];

export const affiliatedVentures = [
  {
    title: "Kefiano Autos",
    text: "Automotive business and dealership.",
    href: "https://kefianoautos.co/",
    cta: "Visit site",
  },
  {
    title: "Chillers by New Yorker",
    text: "Hospitality, leisure, and tourism venture in Jos.",
    href: "https://chillersbynewyorker.com.ng/",
    cta: "View venue",
  },
  {
    title: "Kefiano Global Foundation",
    text: "Foundation work across healthcare, outreach, and community support.",
    href: "https://www.facebook.com/kefianofoundation/",
    cta: "Open page",
  },
  {
    title: "Kefiano Creative Hub",
    text: "Creative and tech training for young people in Plateau.",
    href: "https://linktr.ee/kchub.ng",
    cta: "Explore hub",
  },
  {
    title: "Kefiano Farms",
    text: "Farming and agriculture venture.",
    href: "https://www.youtube.com/@KefianoFarms",
    cta: "View channel",
  },
];

export const publicServiceDetails = {
  healthcare: {
    title: "Healthcare",
    intro: "Healthcare support, facility upgrades, and stronger medical care.",
    summary:
      "This work includes the JUTH A&E renovation, support for doctors and graduates, and advocacy around better welfare for medical professionals.",
    emphasis: "Facility support, emergency care, and medical welfare.",
    image: "/photos/public-service/healthcare-cover.jpg",
    imageAlt: "Chief Kefas Wungak Ropshik speaking with people outside the renovated JUTH Accident and Emergency Unit.",
    relatedProjectSlugs: [
      "juth-accident-emergency-unit-renovation",
      "doctors-welfare-medical-education-support",
    ],
    articles: [
      {
        outlet: "JUTH",
        date: "November 2024",
        title: "Chief Kefiano renovates and commissions Accident and Emergency Unit",
        href: "https://juth.gov.ng/chief-kefiano-renovates-and-commissions-accident-and-emergency-unit-in-juth/",
        summary: "Official JUTH coverage of the renovated A&E unit and the commissioning ceremony.",
        quote: "second best of its kind in the country",
      },
      {
        outlet: "The Nation",
        date: "2025",
        title: "Kefas Ropshik rewards excellence, calls for improved doctors' welfare",
        href: "https://thenationonlineng.net/kefas-ropshik-rewards-excellence-calls-for-improved-welfare-for-nigerian-doctors/",
        summary: "Coverage of support for newly inducted doctors and public remarks on retaining medical talent.",
        quote: "Improved salaries and welfare packages are not luxuries",
      },
      {
        outlet: "Leadership",
        date: "2024",
        title: "Foundation Renovates Emergency Unit Of JUTH",
        href: "https://leadership.ng/foundation-renovates-emergency-unit-of-juth/",
        summary: "Reporting on the renovation and the pledge to support the first patients admitted after commissioning.",
      },
    ],
  },
  "youth-innovation": {
    title: "Youth & Innovation",
    intro: "Skills training and creative work that open clearer paths into employment.",
    summary:
      "The focus is on creative and digital skills, hub-based learning in Jos, and practical routes from training into paid work and enterprise.",
    emphasis: "Creative skills, digital readiness, and work pathways.",
    image: "/photos/public-service/youth-innovation-cover.jpg",
    imageAlt: "Youth participants posing with certificates during a Kefiano training and innovation programme.",
    relatedProjectSlugs: [
      "kefiano-creative-hub",
      "plateau-youth-creative-digital-skills-training",
    ],
    articles: [
      {
        outlet: "Vanguard",
        date: "May 2024",
        title: "119 Plateau youths trained in diverse skills for self-employment",
        href: "https://www.vanguardngr.com/2024/05/119-plateau-youths-trained-in-diverse-skills-for-self-employment/",
        summary: "Coverage of the 119-youth training cohort and its focus on practical creative skills.",
        quote: "a more prosperous future for the youths of Plateau State",
      },
      {
        outlet: "Techpression",
        date: "December 2024",
        title: "We'll go further than AI and empower the youths",
        href: "https://techpression.com/well-go-further-than-ai-and-empower-the-youths/",
        summary: "Interview coverage tied to the launch and goals of the Kefiano Creative Hub in Jos.",
      },
      {
        outlet: "Independent",
        date: "2024",
        title: "Kefiano trains 119 Plateau youths in creative industry",
        href: "https://independent.ng/kefiano-trains-119-plateau-youths-in-creative-industry/",
        summary: "Reporting on the two-week programme across videography, photography, data analysis, writing, and production.",
      },
    ],
  },
  "community-support": {
    title: "Community Support",
    intro: "Relief work, outreach, and direct support for vulnerable households across Plateau State.",
    summary:
      "This work includes food relief, New Year widows support across multiple LGAs, and recurring household outreach.",
    emphasis: "Food relief, widows support, and household assistance.",
    image: "/photos/public-service/community-support-cover.jpg",
    imageAlt: "Chief Kefas Wungak Ropshik handing a support package to a woman during a community outreach event.",
    relatedProjectSlugs: [
      "new-year-support-widows-shendam-pankshin-kanke",
      "birthday-outreach-widows-orphans-vulnerable-groups",
      "rice-distribution-less-privileged-households",
    ],
    articles: [
      {
        outlet: "National Accord",
        date: "January 2025",
        title: "Kefas Ropshik distributes New Year gifts to over 1,190 widows in Plateau",
        href: "https://www.nationalaccordnewspaper.com/kefas-ropshik-distributes-new-tear-gifts-to-over-1190-widows-in-plateau/",
        summary: "Coverage of widows support across Shendam, Pankshin, and Kanke LGAs.",
      },
      {
        outlet: "BusinessDay",
        date: "December 2024",
        title: "How Kefas touches lives of widows, orphans, boosts businesses in Plateau",
        href: "https://businessday.ng/news/article/how-kefas-touches-lives-of-widows-orphans-boosts-businesses-in-plateau/",
        summary: "Reporting on food support and startup assistance tied to wider household outreach.",
        quote: "25 widows were randomly selected to receive N200,000 each",
      },
      {
        outlet: "Leadership",
        date: "2025",
        title: "New Year: Philanthropist Ropshik Gives Widows N5m, Food Items",
        href: "https://leadership.ng/new-year-philanthropist-ropshik-gives-widows-n5m-food-items/",
        summary: "Additional reporting on widows support, food items, and startup funding.",
      },
    ],
  },
  "enterprise-support": {
    title: "Enterprise & Livelihood Support",
    intro: "Startup support, entrepreneurship training, and livelihood help tied to self-reliance in Plateau State.",
    summary:
      "This work focuses on startup support, entrepreneurship training, and practical livelihood help for people moving toward self-reliance.",
    emphasis: "Startup support, training, and livelihood pathways.",
    image: "/photos/public-service/enterprise-support-cover.jpg",
    imageAlt: "Chief Kefas Ropshik during a Plateau community support event tied to startup and livelihood support.",
    relatedProjectSlugs: [
      "entrepreneurship-support-for-widows",
      "new-year-support-widows-shendam-pankshin-kanke",
    ],
    articles: [
      {
        outlet: "BusinessDay",
        date: "December 2024",
        title: "How Kefas touches lives of widows, orphans, boosts businesses in Plateau",
        href: "https://businessday.ng/news/article/how-kefas-touches-lives-of-widows-orphans-boosts-businesses-in-plateau/",
        summary: "Coverage linking welfare support with startup capital for small businesses.",
        quote: "boosts businesses in Plateau",
      },
      {
        outlet: "Universal Reporters",
        date: "January 2025",
        title: "Kefiano celebrates New Year with widows, assured of entrepreneurship training",
        href: "https://universalreportersng.com/kefiano-celebrates-new-year-with-widows-assured-of-entrepreneurship-training/",
        summary: "Reporting on plans for vocational and entrepreneurship training for widows and orphans.",
      },
      {
        outlet: "Leadership",
        date: "2025",
        title: "New Year: Philanthropist Ropshik Gives Widows N5m, Food Items",
        href: "https://leadership.ng/new-year-philanthropist-ropshik-gives-widows-n5m-food-items/",
        summary: "Reporting on widows support that combined food relief with startup funding for small-scale enterprise activity.",
      },
    ],
  },
};
