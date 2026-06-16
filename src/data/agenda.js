import {
  BriefcaseBusiness,
  HeartPulse,
  ShieldCheck,
  Sprout,
  UsersRound,
} from "lucide-react";

export const agendaAreas = [
  {
    slug: "security-peace",
    title: "Security & Peace",
    shortLabel: "Security",
    href: "/agenda/security-peace",
    icon: ShieldCheck,
    summary: "Safer communities, safer nightlife, and trusted lawful coordination.",
    focus: "Safety, peacebuilding, and response",
    priority: "Prevention and public confidence",
    storyHeadline: "Security should feel calm, visible, and close.",
    storyBody:
      "The aim is safer neighbourhoods, stronger coordination, and faster prevention so people can move, gather, and do business with confidence.",
    sceneAsset: "/photos/agenda/security-peace-scene.jpg",
    sceneAlt:
      "Kefas Ropshik during a public campaign filing moment representing leadership and public coordination.",
    palette: {
      bg: "#eef4f0",
      surface: "rgba(247, 252, 249, 0.74)",
      line: "rgba(16, 54, 37, 0.14)",
      ink: "#112b1f",
      muted: "#4a6055",
      accent: "#0f6a4f",
      accentSoft: "rgba(15, 106, 79, 0.14)",
      glow: "rgba(103, 180, 139, 0.18)",
      glowStrong: "rgba(14, 123, 91, 0.28)",
      scenePosition: "center center",
    },
    accentLayerAssets: [
      { label: "Police", x: "8%", y: "16%" },
      { label: "Civil Defence", x: "78%", y: "14%" },
      { label: "Community Safety", x: "70%", y: "76%" },
    ],
    highlights: ["Safer neighbourhoods", "Safer nightlife", "Community confidence"],
    detailSections: [
      {
        title: "Trusted coordination",
        body:
          "Security works best when agencies coordinate visibly, share information early, and keep people informed.",
      },
      {
        title: "Prevention before escalation",
        body:
          "The priority is to spot risks early, strengthen peacebuilding, and support fast lawful response.",
      },
      {
        title: "Confidence in public life",
        body:
          "Safe roads, markets, schools, and nightlife help businesses stay open longer and communities move with ease.",
      },
    ],
  },
  {
    slug: "youth-empowerment",
    title: "Youth Empowerment",
    shortLabel: "Youth",
    href: "/agenda/youth-empowerment",
    icon: UsersRound,
    summary: "Skills, mentorship, and income pathways for young people.",
    focus: "Skills, mentorship, and readiness",
    priority: "Skills that lead to income",
    storyHeadline: "Young people need useful skills and room to build.",
    storyBody:
      "The focus is practical learning that builds confidence, employability, and enterprise in classrooms and training hubs.",
    sceneAsset: "/photos/agenda/youth-empowerment-scene.jpg",
    sceneAlt:
      "Participants gathered during a Kefiano Creative Hub training event.",
    palette: {
      bg: "#f7f1e8",
      surface: "rgba(255, 251, 244, 0.78)",
      line: "rgba(96, 70, 39, 0.14)",
      ink: "#2b2012",
      muted: "#695747",
      accent: "#b96e1f",
      accentSoft: "rgba(185, 110, 31, 0.12)",
      glow: "rgba(234, 187, 123, 0.18)",
      glowStrong: "rgba(210, 144, 63, 0.26)",
      scenePosition: "center center",
    },
    accentLayerAssets: [
      { label: "Business Skills", x: "11%", y: "18%" },
      { label: "Mentorship", x: "72%", y: "18%" },
      { label: "Digital Tools", x: "67%", y: "78%" },
    ],
    highlights: ["Modern training", "Mentorship pathways", "Income-focused skills"],
    detailSections: [
      {
        title: "Practical classroom learning",
        body:
          "Training should feel current, applied, and useful, with business and digital confidence built in.",
      },
      {
        title: "Mentorship that stays close",
        body:
          "Young people move faster when they can learn from people already building and solving locally.",
      },
      {
        title: "Pathways to income",
        body:
          "The goal is not training alone. It is skills that become work, enterprise, or the next opportunity.",
      },
    ],
  },
  {
    slug: "jobs-enterprise",
    title: "Jobs, Enterprise & Tech",
    shortLabel: "Jobs",
    href: "/agenda/jobs-enterprise",
    icon: BriefcaseBusiness,
    summary: "Jobs, local production, and room for tech startups to grow.",
    focus: "Enterprise growth and tech opportunity",
    priority: "Support for startups, production, and jobs",
    storyHeadline: "More jobs come when enterprise and tech can grow.",
    storyBody:
      "The agenda is to back small businesses, tech startups, production, and markets with support that turns local talent into durable jobs.",
    sceneAsset: "/photos/agenda/jobs-enterprise-scene.jpg",
    sceneAlt:
      "Kefiano Autos storefront and vehicle image representing local enterprise and commerce.",
    palette: {
      bg: "#f3efe8",
      surface: "rgba(255, 252, 248, 0.78)",
      line: "rgba(65, 55, 44, 0.14)",
      ink: "#241d17",
      muted: "#62564b",
      accent: "#7e5537",
      accentSoft: "rgba(126, 85, 55, 0.12)",
      glow: "rgba(189, 146, 111, 0.18)",
      glowStrong: "rgba(140, 95, 60, 0.24)",
      scenePosition: "center center",
    },
    accentLayerAssets: [
      { label: "Small Business", x: "10%", y: "18%" },
      { label: "Production", x: "74%", y: "14%" },
      { label: "Logistics", x: "69%", y: "79%" },
    ],
    highlights: ["Startup growth", "Business support", "Visible job growth"],
    detailSections: [
      {
        title: "Local business momentum",
        body:
          "Growth should be visible in trading activity, workshops, storefronts, and service businesses that hire.",
      },
      {
        title: "Support that reaches builders",
        body:
          "Small businesses and tech founders need access, clarity, and practical support to build in Plateau.",
      },
      {
        title: "Technology that creates local advantage",
        body:
          "Plateau can become fertile ground for tech startups serving Nigeria's large population from right here at home.",
      },
    ],
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    shortLabel: "Health",
    href: "/agenda/healthcare",
    icon: HeartPulse,
    summary: "Better facilities, stronger staff support, and reliable care.",
    focus: "Facilities, staff support, and access",
    priority: "Better care access",
    storyHeadline: "Healthcare should feel prepared and closer to people.",
    storyBody:
      "The goal is stronger hospitals and clinics, better support for medical workers, and care families can count on.",
    sceneAsset: "/photos/agenda/healthcare-scene.jpg",
    sceneAlt:
      "Chief Kefas Wungak Ropshik speaking with people outside the renovated JUTH Accident and Emergency Unit.",
    palette: {
      bg: "#eef5f7",
      surface: "rgba(247, 252, 255, 0.8)",
      line: "rgba(36, 80, 92, 0.14)",
      ink: "#14313a",
      muted: "#4a6670",
      accent: "#1f7f98",
      accentSoft: "rgba(31, 127, 152, 0.12)",
      glow: "rgba(138, 208, 225, 0.18)",
      glowStrong: "rgba(72, 168, 190, 0.25)",
      scenePosition: "center center",
    },
    accentLayerAssets: [
      { label: "Doctors", x: "9%", y: "17%" },
      { label: "Facilities", x: "75%", y: "16%" },
      { label: "Care Access", x: "70%", y: "78%" },
    ],
    highlights: ["Stronger facilities", "Better staff support", "Trusted care access"],
    detailSections: [
      {
        title: "Facilities that work",
        body:
          "Hospitals and clinics need the equipment and systems that support good care without delay.",
      },
      {
        title: "Support for health workers",
        body:
          "Better care depends on stronger conditions, recognition, and support for the people delivering it.",
      },
      {
        title: "Care people can trust",
        body:
          "Families need to know the system can respond with dignity, clarity, and speed when care is urgent.",
      },
    ],
  },
  {
    slug: "agriculture-industry",
    title: "Agriculture & Industry",
    shortLabel: "Agriculture",
    href: "/agenda/agriculture-industry",
    icon: Sprout,
    summary: "Agro-processing, value chains, and industry that keep value local.",
    focus: "Processing, industry, and value chains",
    priority: "More value kept in Plateau",
    storyHeadline: "Plateau should grow, process, and keep more value at home.",
    storyBody:
      "That means moving beyond raw output into stronger processing, logistics, and value chains that widen prosperity.",
    sceneAsset: "/photos/agenda/agriculture-industry-scene.jpg",
    sceneAlt:
      "Kefiano Farms image representing agriculture and local production in Plateau State.",
    palette: {
      bg: "#eef0e5",
      surface: "rgba(250, 252, 245, 0.78)",
      line: "rgba(67, 83, 46, 0.14)",
      ink: "#223017",
      muted: "#5a6848",
      accent: "#5e8b2f",
      accentSoft: "rgba(94, 139, 47, 0.12)",
      glow: "rgba(174, 211, 121, 0.18)",
      glowStrong: "rgba(127, 175, 71, 0.24)",
      scenePosition: "center center",
    },
    accentLayerAssets: [
      { label: "Agro-processing", x: "11%", y: "17%" },
      { label: "Value Chains", x: "73%", y: "18%" },
      { label: "Local Industry", x: "66%", y: "79%" },
    ],
    highlights: ["Processing at home", "Stronger value chains", "Local prosperity"],
    detailSections: [
      {
        title: "From output to value",
        body:
          "Agriculture matters most when communities can process, package, move, and sell more of what they produce.",
      },
      {
        title: "Industry linked to production",
        body:
          "Light industry, storage, logistics, and processing connect farm output to a wider economy that can hire.",
      },
      {
        title: "Prosperity that stays local",
        body:
          "When Plateau keeps more of the chain, it keeps more jobs, expertise, and opportunity close to home.",
      },
    ],
  },
];

export const agendaAreaBySlug = Object.fromEntries(
  agendaAreas.map((area, index) => [
    area.slug,
    {
      ...area,
      index,
      nextSlug: agendaAreas[(index + 1) % agendaAreas.length].slug,
      previousSlug: agendaAreas[(index - 1 + agendaAreas.length) % agendaAreas.length].slug,
    },
  ]),
);
