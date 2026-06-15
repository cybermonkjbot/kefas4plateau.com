# Main Menu And Footer Plan

Prepared for: kefas4plateau.com  
Date: 2026-05-31  
Design basis: PDP identity cues, especially green, white, and red, applied in a restrained civic website style.

## Colour System

The PDP visual identity is commonly associated with green, white, and red. For the website, use green as the main trust/identity colour, red as a controlled accent, white as the clean content base, and dark neutral colours for readable text.

### Primary Palette

| Token | Hex | Use |
| --- | --- | --- |
| `--pdp-green` | `#008751` | Primary brand colour, active navigation, key buttons, footer top border |
| `--pdp-green-dark` | `#005F39` | Header text hover, dark footer surfaces, strong contrast areas |
| `--pdp-green-soft` | `#E6F4EE` | Subtle backgrounds, active menu rows, quiet section surfaces |
| `--pdp-red` | `#D71920` | Small accents, active underline, thin dividers |
| `--pdp-red-dark` | `#A30F16` | Hover state for red accents only |
| `--white` | `#FFFFFF` | Header, page background, footer text on dark green |
| `--off-white` | `#F7FAF8` | Footer lower strip, alternate sections |
| `--ink` | `#17231D` | Main text |
| `--muted` | `#647067` | Secondary text |
| `--border` | `#D9E5DE` | Dividers and card borders |

### Colour Usage Ratio

- 60% white/off-white
- 25% green and green-tinted surfaces
- 10% dark text/neutral structure
- 5% red accents

Red should never dominate the page. It should appear as a precision colour: small underline, icon dot, or thin stripe.

## Simplicity Rules

- Do not use pill-shaped navigation, badges, or decorative chips.
- Do not add eyebrow text above headings; make the heading carry the context.
- Avoid repeated calls to the same page in the same viewport.
- Use plain section headings and direct labels.
- Keep components purposeful: header, navigation, content, contact, and footer.

## Main Menu Goals

The main menu should feel official, calm, and easy to scan. The site is likely serving mixed audiences: citizens, journalists, stakeholders, party members, and people checking the candidate's background.

The navigation should answer five questions quickly:

- Who is he?
- What has he done?
- What does he stand for?
- What is current/newsworthy?
- How do people contact the team?

## Recommended Desktop Header

### Structure

Height: `76px`  
Position: sticky top  
Background: white with a thin green bottom border  
Max content width: `1200px` or `1280px`  
Layout: logo left, nav center/right, contact button far right

```text
┌──────────────────────────────────────────────────────────────────────────┐
│ [Kefas W. Ropshik / Kefiano]   Home About Public Service Projects News   │
│                                Agenda Gallery Contact        [Contact]   │
└──────────────────────────────────────────────────────────────────────────┘
```

### Desktop Header Layout

- Left: wordmark/logo lockup
- Middle/right: primary navigation links
- Far right: restrained button linking to Contact
- Optional: tiny PDP-colour accent line at the very top, `4px` high, split green/red or solid green

### Logo Lockup

Preferred text lockup:

```text
Chief Kefas W. Ropshik
Kefiano
```

If space is tight:

```text
Kefas Ropshik
```

Logo treatment:

- Text should be dark green or ink.
- Add a small vertical green-red mark beside the wordmark if no official logo is available.
- Do not place a large PDP umbrella in the header unless the client confirms official party/campaign branding usage.

## Main Menu Items

Recommended final menu:

1. Home
2. About
3. Public Service
4. Projects
5. Agenda
6. News
7. Gallery
8. Contact

### Menu Item Purpose

| Label | URL | Purpose |
| --- | --- | --- |
| Home | `/` | First impression, brief bio, highlights, latest updates |
| About | `/about` | Full biography, business background, foundation profile |
| Public Service | `/public-service` | Healthcare, youth, widows/orphans, community work |
| Projects | `/projects` | Structured project inventory and detail pages |
| Agenda | `/agenda` | Public issue themes: security, youth, economy, healthcare |
| News | `/news` | Press releases, media coverage, public updates |
| Gallery | `/gallery` | Photos from projects, engagements, and public events |
| Contact | `/contact` | Media/contact form and official details |

### Alternate Compact Menu

If the client wants a tighter header:

1. Home
2. About
3. Projects
4. Agenda
5. News
6. Contact

Put Gallery and Public Service inside footer/mega menu.

## Dropdown Plan

Use dropdowns only where they reduce clutter. Keep them simple, with no oversized marketing panels.

### Public Service Dropdown

```text
Public Service
- Healthcare
- Youth & Innovation
- Community Support
- Enterprise Support
```

### Agenda Dropdown

```text
Agenda
- Security & Peace
- Youth Empowerment
- Jobs & Enterprise
- Healthcare
- Agriculture & Industry
- Infrastructure
```

### News Dropdown

```text
News
- Latest Updates
- Press Coverage
- Speeches & Statements
```

## Active And Hover States

### Default Link

- Text: `--ink`
- Font weight: `600`
- Size: `14px` or `15px`
- Letter spacing: `0`

### Hover

- Text: `--pdp-green-dark`
- Underline: `2px` red line or green line
- Background: none on desktop links

### Active Page

Option A, best for desktop:

- Text: `--pdp-green-dark`
- Bottom border: `3px solid --pdp-red`

Option B, best for mobile:

- Background: `--pdp-green-soft`
- Text: `--pdp-green-dark`
- Left border: `3px solid --pdp-red`

## Header Button

Use one restrained button:

Label:

- Contact
- Media Enquiry
- Contact Team

Recommended default:

```text
Contact
```

Style:

- Background: `--pdp-green`
- Text: white
- Hover: `--pdp-green-dark`
- Radius: `6px`
- Height: `42px`
- Padding: `0 18px`

Avoid aggressive action labels in the main navigation.

## Mobile Header

Breakpoint: below `900px`

### Mobile Layout

```text
┌─────────────────────────────┐
│ Kefas Ropshik          [☰] │
└─────────────────────────────┘

Menu drawer:
Home
About
Public Service
Projects
Agenda
News
Gallery
Contact
```

### Mobile Drawer

- Drawer should slide from right or drop below header.
- Width: `min(88vw, 380px)` if side drawer.
- Background: white.
- Top border or drawer accent: `4px solid --pdp-green`.
- Active item uses green soft background and red left border.
- Contact button appears at the bottom of the drawer.
- Include small social/contact links at the bottom only if verified.

### Mobile Header Colours

- Header background: white
- Hamburger icon: `--pdp-green-dark`
- Top accent: `--pdp-green`
- Optional small red dot/accent near menu icon

## Footer Goals

The footer should feel like an official civic information hub, not a decorative afterthought. It should give users quick routes to biography, project records, issue themes, press, and contact details.

## Recommended Footer Layout

Desktop: 4 columns plus lower bar  
Tablet: 2 columns  
Mobile: stacked sections

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Green top stripe                                                     │
├──────────────────────────────────────────────────────────────────────┤
│ Brand/About        Explore           Public Service      Contact     │
│ Short profile      About             Healthcare          Address     │
│ Social links       Projects          Youth & Innovation  Email       │
│                    Agenda            Community Support   Phone       │
│                    News              Gallery             Socials     │
├──────────────────────────────────────────────────────────────────────┤
│ © 2026 ...      Privacy      Terms      Source/Verification note      │
└──────────────────────────────────────────────────────────────────────┘
```

## Footer Colour Plan

### Recommended Footer Variant

Top stripe:

- `6px solid --pdp-red` over a dark green footer, or
- Split stripe: 70% green, 20% white, 10% red

Main footer:

- Background: `--pdp-green-dark`
- Text: white
- Muted text: `#CFE3D8`
- Links: white
- Link hover: `#F8E6E7` or white with red underline
- Divider: rgba white at 16%

Lower footer:

- Background: `#003D25`
- Text: `#CFE3D8`

This gives the site a strong PDP identity while keeping readability high.

## Footer Content

### Column 1: Brand

Heading:

```text
Chief Kefas W. Ropshik
```

Subtext:

```text
Public profile, projects, and official updates connected to Chief Kefas Wungak Ropshik, popularly known as Kefiano.
```

Optional small identity line:

```text
Plateau State | Public Service | Community Development
```

### Column 2: Explore

Links:

- About
- Projects
- Public Service
- Agenda
- News
- Gallery

### Column 3: Public Service

Links:

- Healthcare
- Youth & Innovation
- Community Support
- Enterprise Support
- Security & Peace
- Agriculture & Industry

### Column 4: Contact

Items:

- Media enquiries
- Campaign office address, if confirmed
- Phone, if confirmed
- Email, if confirmed
- Facebook / X / Instagram / YouTube, if confirmed

Do not use unverified phone numbers or social handles.

## Lower Footer

Recommended lower footer text:

```text
© 2026 Kefas Wungak Ropshik. All rights reserved.
```

Optional links:

- Privacy Policy
- Terms
- Contact

Optional verification note:

```text
Project and press information should be verified against official campaign, foundation, and public-source records.
```

## Component-Level Layout Spec

### Header Component

Props:

```ts
type HeaderNavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

type HeaderProps = {
  navItems: HeaderNavItem[];
  currentPath: string;
  contactHref: string;
};
```

### Footer Component

Props:

```ts
type FooterLink = {
  label: string;
  href: string;
};

type FooterSection = {
  title: string;
  links: FooterLink[];
};

type FooterProps = {
  sections: FooterSection[];
  contact: {
    address?: string;
    phone?: string;
    email?: string;
  };
  socials?: FooterLink[];
};
```

## Suggested Navigation Data

```ts
export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Public Service",
    href: "/public-service",
    children: [
      { label: "Healthcare", href: "/public-service/healthcare" },
      { label: "Youth & Innovation", href: "/public-service/youth-innovation" },
      { label: "Community Support", href: "/public-service/community-support" },
      { label: "Enterprise Support", href: "/public-service/enterprise-support" }
    ]
  },
  { label: "Projects", href: "/projects" },
  {
    label: "Agenda",
    href: "/agenda",
    children: [
      { label: "Security & Peace", href: "/agenda/security-peace" },
      { label: "Youth Empowerment", href: "/agenda/youth-empowerment" },
      { label: "Jobs & Enterprise", href: "/agenda/jobs-enterprise" },
      { label: "Healthcare", href: "/agenda/healthcare" },
      { label: "Agriculture & Industry", href: "/agenda/agriculture-industry" }
    ]
  },
  { label: "News", href: "/news" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" }
];
```

## CSS Token Starter

```css
:root {
  --pdp-green: #008751;
  --pdp-green-dark: #005f39;
  --pdp-green-soft: #e6f4ee;
  --pdp-red: #d71920;
  --pdp-red-dark: #a30f16;
  --white: #ffffff;
  --off-white: #f7faf8;
  --ink: #17231d;
  --muted: #647067;
  --border: #d9e5de;
}
```

## Accessibility Notes

- Keep red accents decorative or secondary; do not rely on red alone for active state.
- Ensure all text on green backgrounds is white or very pale.
- Header links should have visible focus states.
- Mobile drawer should trap focus while open.
- Navigation buttons need `aria-expanded` for dropdowns.
- Footer links should have underline or clear hover state.

## Implementation Priority

1. Build static header with responsive menu.
2. Add active route state.
3. Add simple dropdowns for Public Service and Agenda.
4. Build footer with four-column desktop layout and stacked mobile layout.
5. Add verified contact/social data only after client confirmation.
6. Add source/verification note in footer or legal page if the site includes public claims.
