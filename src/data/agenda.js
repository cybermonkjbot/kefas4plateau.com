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
    summary: "Safer communities through coordination, prevention, and trusted lawful support.",
    focus: "Community safety and peacebuilding",
    priority: "Prevention and lawful local support",
    storyHeadline: "Security should feel calm, visible, and close to the people it protects.",
    storyBody:
      "The aim is safer neighbourhoods, stronger coordination, and faster prevention, with communities, lawful state actors, and local intelligence working in step.",
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
    highlights: ["Safer neighbourhoods", "Faster coordination", "Community confidence"],
    detailSections: [
      {
        title: "Trusted coordination",
        body:
          "State security works best when agencies coordinate visibly, share information early, and keep people informed instead of leaving communities guessing.",
      },
      {
        title: "Prevention before escalation",
        body:
          "The priority is to spot risks early, strengthen peacebuilding, and support rapid lawful response so tensions do not become wider crises.",
      },
      {
        title: "Confidence in public life",
        body:
          "Safe roads, safe markets, safe schools, and safe neighbourhoods make everything else possible, from jobs to investment to everyday movement.",
      },
    ],
  },
  {
    slug: "youth-empowerment",
    title: "Youth Empowerment",
    shortLabel: "Youth",
    href: "/agenda/youth-empowerment",
    icon: UsersRound,
    summary: "Skills, mentorship, and enterprise pathways for young people.",
    focus: "Skills, mentorship, and enterprise readiness",
    priority: "Skills that lead to income",
    storyHeadline: "Young people need useful skills, real mentors, and room to build.",
    storyBody:
      "The focus is practical learning that links directly to confidence, employability, and enterprise, in classrooms, training hubs, and community-led programmes.",
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
          "Training should feel current, applied, and useful, with business thinking, collaboration, communication, and digital confidence built into the experience.",
      },
      {
        title: "Mentorship that stays close",
        body:
          "Young people move faster when they can learn from people already building businesses, solving problems, and navigating the realities of local growth.",
      },
      {
        title: "Pathways to income",
        body:
          "The goal is not training for training’s sake. It is skills that become work, enterprise, or stronger readiness for the next opportunity.",
      },
    ],
  },
  {
    slug: "jobs-enterprise",
    title: "Jobs & Enterprise",
    shortLabel: "Jobs",
    href: "/agenda/jobs-enterprise",
    icon: BriefcaseBusiness,
    summary: "Enterprise, jobs, and local production.",
    focus: "Local enterprise growth",
    priority: "Support for small businesses, production, and jobs",
    storyHeadline: "More jobs come when local enterprise can start, grow, and keep moving.",
    storyBody:
      "The agenda is to back small businesses, workshops, logistics, production, and markets with the kind of support that turns activity into durable employment.",
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
    highlights: ["Local production", "Business support", "Visible job growth"],
    detailSections: [
      {
        title: "Local business momentum",
        body:
          "Growth should be visible on the ground, in trading activity, workshops, storefronts, and service businesses that can hire more people over time.",
      },
      {
        title: "Support that reaches producers",
        body:
          "Small businesses need access, clarity, and practical support, not just speeches. The priority is to remove friction and help productive work scale.",
      },
      {
        title: "Jobs that stay in Plateau",
        body:
          "When enterprise and production expand locally, more value stays at home and more families see real economic movement in everyday life.",
      },
    ],
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    shortLabel: "Health",
    href: "/agenda/healthcare",
    icon: HeartPulse,
    summary: "Better facilities, stronger staff support, and more reliable care.",
    focus: "Better facilities and stronger medical support",
    priority: "Better care access",
    storyHeadline: "Healthcare should feel prepared, dignified, and closer to the people who need it.",
    storyBody:
      "The goal is stronger hospitals and clinics, better support for medical workers, and clearer confidence that care is available when families need it most.",
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
          "Hospitals and clinics need to feel ready, with environments, equipment, and systems that support good care rather than slow it down.",
      },
      {
        title: "Support for health workers",
        body:
          "Better care depends on the people delivering it. Stronger conditions, recognition, and professional support help staff serve with confidence.",
      },
      {
        title: "Care people can trust",
        body:
          "Families need to believe that when something urgent happens, the system can respond with dignity, clarity, and speed.",
      },
    ],
  },
  {
    slug: "agriculture-industry",
    title: "Agriculture & Industry",
    shortLabel: "Agriculture",
    href: "/agenda/agriculture-industry",
    icon: Sprout,
    summary: "Agro-processing, value chains, and industry that keep more value local.",
    focus: "Agro-processing and industrial development",
    priority: "More value kept in Plateau",
    storyHeadline: "Plateau should grow, process, produce, and keep more of its value at home.",
    storyBody:
      "That means moving beyond raw output alone, into stronger processing, light manufacturing, logistics, and value chains that turn production into wider prosperity.",
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
          "Agriculture matters most when communities can process, package, move, and sell more of what they produce, instead of watching value leave too early.",
      },
      {
        title: "Industry linked to production",
        body:
          "Light industry, storage, logistics, and processing create the bridge between farm output and a wider economy that can hire, retain, and reinvest.",
      },
      {
        title: "Prosperity that stays local",
        body:
          "When Plateau keeps more of the chain, it keeps more jobs, more expertise, and more opportunity close to the people building it.",
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
